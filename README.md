# Cookie Extractor

![Logo](https://github.com/CRB-CyberSec-Dev/Cookie-Extractor/blob/main/logo.png)

## Overview

Cookie Extractor is a Chrome extension designed to help developers easily extract, manage, and export cookies from any website. This tool simplifies the process of handling cookies by allowing you to generate JavaScript code that can be used in your development projects. Whether you're working on web security, testing, or development, Cookie Extractor is a handy utility to have in your toolbox.

## Features

- Extract cookies directly from the browser.
- Generate JavaScript code for cookies with just one click.
- Send extracted cookies to an API endpoint for further processing.
- User-friendly interface with a clean and modern design.
- Store API keys and URLs for easy reuse.
- Built-in support for session management.

## Installation

You can download Cookie Extractor from the [Chrome Web Store](https://chromewebstore.google.com/detail/cookie-extractor/kpcbapkecfociooepjlifimlgjbpleop).

Alternatively, you can install it manually:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/CRB-CyberSec-Dev/Cookie-Extractor.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top-right corner.
4. Click on "Load unpacked" and select the `Cookie-Extractor` directory.

## Usage

1. After installing the extension, click on the Cookie Extractor icon in your Chrome toolbar.
2. Enter the API key and API URL in the provided fields.
3. Paste the cookies you want to extract into the input box.
4. Click "Generate JS Format" to create the JavaScript code.
5. Use the "Send" button to send the generated code to the specified API endpoint.
6. The session data can be managed through the extension's session management feature.

## Example

```javascript
const cookies = [
  { name: "session_id", value: "abc123", domain: ".example.com", expires: "2024-12-31T23:59:59.000Z" }
];

cookies.forEach(cookie => {
  let expires = "";
  if (cookie.expires === "Session") {
    expires = "";  // Session cookie, no expiration
  } else {
    const expirationDate = new Date(cookie.expires);
    expires = "; expires=" + expirationDate.toUTCString();
  }
  document.cookie = `${cookie.name}=${cookie.value}; path=/; domain=${cookie.domain}${expires}`;
});
```

## Contributing

We welcome contributions from the community. If you'd like to contribute to this project, please fork the repository and create a pull request with your changes. Make sure to follow the existing coding style and add tests for your changes.

## Credits

- Logo credit: [Smile icon by Freepik - Flaticon](https://www.flaticon.com/free-icon/smile_8383513)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For more information, visit the [GitHub Repository](https://github.com/CRB-CyberSec-Dev/Cookie-Extractor) or contact us via [email@example.com](mailto:email@example.com).

### Explanation:

- **Installation Section**: Added the link to download the extension directly from the Chrome Web Store.
  
