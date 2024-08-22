require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors({
    origin: 'chrome-extension://kpcbapkecfociooepjlifimlgjbpleop'
}));


// Handle preflight requests
app.options('*', cors({
    origin: 'chrome-extension://kpcbapkecfociooepjlifimlgjbpleop'
}));


// In-memory store for API keys (for demonstration purposes)
const apiKeys = {};

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to issue a new API key
app.post('/issue-key', (req, res) => {
  const newApiKey = uuidv4();
  apiKeys[newApiKey] = true;  // Store the key (this should be a more secure storage in production)
  res.json({ apiKey: newApiKey });
});

// Endpoint to add a custom API key
app.post('/add-key', (req, res) => {
  const { apiKey } = req.body;
  if (apiKey) {
    apiKeys[apiKey] = true;  // Store the custom key
    res.json({ message: 'API key added successfully' });
  } else {
    res.status(400).json({ message: 'Invalid API key' });
  }
});

// Middleware to validate API key
const validateApiKey = (req, res, next) => {
  const apiKey = req.header('api-key');
  if (apiKeys[apiKey]) {
    next();
  } else if(apiKey && apiKey === process.env.API_KEY){
    next();
  }
  else
  {
    res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }
};

// Protected endpoint to handle POST requests and save output to a file
app.post('/save', validateApiKey, (req, res) => {
  const { output } = req.body;
  console.log('Received output:', output);

  // Generate a unique filename
  const filename = `output_${Date.now()}.txt`;

  // Save the output to a file
  fs.writeFile(filename, output, (err) => {
    if (err) {
      console.error('Error saving output:', err);
      return res.status(500).json({ message: 'Error saving output' });
    }
    res.json({ message: 'Output saved successfully', filename });
  });
});

// Serve API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
