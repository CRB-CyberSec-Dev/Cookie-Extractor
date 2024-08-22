# Cookie Extractor

![Logo](https://github.com/CRB-CyberSec-Dev/Cookie-Extractor/blob/main/Cookie%20Extractor/icons/icon48.png)

## Demo video link how this work
![Video](https://youtu.be/xdpbcb0kyBg?si=nErCcs4O4_rjeHW3)


## Overview

**Cookie Extractor** is a powerful Chrome extension designed to help developers and cybersecurity professionals easily extract cookies from a browser's developer tools, convert them into a JavaScript format, and send them to a server for storage or analysis. The extension is highly customizable and includes API support for remote storage.

## Features

- Extract cookies directly from the browser.
- Generate JavaScript code for cookies with just one click.
- Send extracted cookies to an API endpoint for further processing.
- User-friendly interface with a clean and modern design.
- Store API keys and URLs for easy reuse.
- Built-in support for session management.

## Setup and Usage

### Chrome Extension (Cookie Extractor)

1. **Install the Extension**:
   - Download the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/cookie-extractor/kpcbapkecfociooepjlifimlgjbpleop).
   
2. **Extract Cookies**:
   - Open the Chrome Developer Tools and navigate to the `Application` tab.
   - Use the **Cookie Extractor** extension to extract the cookies you need.

3. **Send Cookies to Server**:
   - Configure your API key and server URL in the extension.
   - Extracted cookies can be sent directly to the server for storage or processing.

### Server API (Cookie Storage)

The server API is a Node.js application that stores the cookies sent from the Cookie Extractor extension.

1. **Clone the Server Repository**:
   ```bash
   git clone https://github.com/CRB-CyberSec-Dev/Cookie-Extractor.git
   cd server-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure the Server**:
   - Create a `.env` file in the server root directory with your API key:
     ```
     API_KEY=your_default_api_key
     ```

4. **Run the Server**:
   ```bash
   node server.js
   ```

5. **API Documentation**:
   - Access the Swagger documentation at `http://localhost:3001/api-docs`.

## API Endpoints

### Cookie Extractor Extension

- **Issue New API Key**
  - **Endpoint**: `/issue-key`
  - **Method**: POST

- **Add Custom API Key**
  - **Endpoint**: `/add-key`
  - **Method**: POST

- **Save Extracted Cookies**
  - **Endpoint**: `/save`
  - **Method**: POST
  - **Headers**: 
    - `Content-Type: application/json`
    - `api-key: your_api_key`
  - **Body**: JSON object with an `output` field.

### Server API

- **Endpoint**: `/issue-key`
  - **Method**: POST
  - **Description**: Generates a new API key.

- **Endpoint**: `/add-key`
  - **Method**: POST
  - **Description**: Add a custom API key for validation.

- **Endpoint**: `/save`
  - **Method**: POST
  - **Headers**: 
    - `Content-Type: application/json`
    - `api-key: your_api_key`
  - **Description**: Saves the output data to a file.
  - **Body**: JSON object with an `output` field.

## Privacy and Security

- **Privacy Policy**: This extension and server application do not collect or store personally identifiable information. All data is handled securely with CORS and API key validation. You are responsible for managing and securing your API keys.
- **Origin Configuration**: The origin for CORS policies is set to `chrome-extension://kpcbapkecfociooepjlifimlgjbpleop`. in the listening node server.


## Download

You can download the Chrome extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/cookie-extractor/kpcbapkecfociooepjlifimlgjbpleop).

## Contributing

We welcome contributions! Please see our [GitHub repository](https://github.com/CRB-CyberSec-Dev) for more details.

## Credits

- **Logo**: [Flaticon](https://www.flaticon.com/free-icon/smile_8383513)

## Buy Me a Coffee

**BTC :- bc1q90c30lrgcclsd9pmyqpxjecyphg7y0f2grf74u**

<a href="#" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
