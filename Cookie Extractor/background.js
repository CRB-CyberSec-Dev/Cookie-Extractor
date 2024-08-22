chrome.runtime.onInstalled.addListener(() => {
  console.log("Cookie Setter Extension Installed");
});

function setCookiesFromInput(inputText) {
  const lines = inputText.trim().split("\n");
  const cookies = [];
  const cookiesWithFormat = [];
  let cookiesJs = "";

  lines.forEach((line) => {
    // Split the line into individual elements using regex to handle multiple spaces/tabs
    const elements = line.trim().split(/\s+/);

    // console.log(line);
    // console.log(elements.length);
    // console.log(elements[0]);
    // console.log(elements[1]);
    // console.log(elements[2]);
    // console.log(elements[4]);
    // console.log(elements);

    if (elements.length >= 5) {
      const name = elements[0];
      let value = elements[1]; // Use 'let' to allow reassignment
      const domain = elements[2];
      const exp = elements[4];

      // console.log(name + value + domain + exp);

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      cookies.push({
        name: name, // Modify the name if needed
        value: value,
        domain: domain,
        expirationDate: exp === "Session" ? undefined : new Date(exp),
      });
    }
  });

  cookies.forEach((cookie) => {
    const formattedCookie = `{ name: "${cookie.name}", value: "${cookie.value}", domain: "${cookie.domain}", exp: "${cookie.expirationDate}" }`;
    cookiesWithFormat.push(formattedCookie);
  });


  cookiesJs = `const cookies = [
  ${cookiesWithFormat.join(",\n")}
];

cookies.forEach(cookie => {
    let expires = "";
    if (cookie.exp === "Session") {
        expires = "";  // Session cookie, no expiration
    } else {
        const expirationDate = new Date(cookie.exp);
        expires = "; expires=" + expirationDate.toUTCString();
    }
    document.cookie = \`\${cookie.name}=\${cookie.value}; path=/; domain=\${cookie.domain}\${expires}\`;
});`;

  console.log(cookiesJs);
  cookiesJsoutsidescope = cookiesJs;
}

function sendCookiesOverAPI(output, apikey, apiurl) {
  // const apiKey = 'YOUR_API_KEY';
  // const apiUrl = 'https://api.example.com/save';
  const apiKey = apikey;
  const apiUrl = apiurl;

  console.log(apiKey + apiUrl);

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({ output: output }),
  })
 .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      // You can add more logic here if needed
      chrome.runtime.sendMessage({ action: "apiResponse", status: "success", data: data });
    })
    .catch((error) => {
      console.error("Error:", error);
      chrome.runtime.sendMessage({ action: "apiResponse", status: "error", message: error.message });
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  console.log("Extension icon clicked");
  let restoredSession = false;

  if (message.action === "setCookiesFromInput") {
    setCookiesFromInput(message.inputText);
    sendResponse({ status: cookiesJsoutsidescope });
  } else if (message.action === "sendCookiesOverAPI") {
    sendCookiesOverAPI(message.inputText, message.apikey, message.apiurl);
  }else if (!restoredSession && message.action === "restSession") {
    // Retrieve data from session storage
    chrome.storage.session.get("sessionData", () => {
      sendResponse({
        status: "Session data set done",
        data: result.sessionData,
      });
      sessionData = result.sessionData;
      sendResponse({ status: "Session data sending to restore.", action: "restoreAPIURL", data: result.sessionData });
    });
    restoredSession = true;
  }else  if (message.action == "saveSession") {
    chrome.storage.session.set({ sessionData: message.data }, () => {
      console.log("Session data saved successfully");
      sendResponse({ status: "Session data saved" });
    });
    return true; // Keeps the message channel open for sendResponse
  } else if (message.action == "getSession") {
    chrome.storage.session.get("sessionData", (result) => {
      if (result.sessionData) {
        console.log("Session data retrieved", result.sessionData);
        sendResponse({ status: "Session data retrieved", data: result.sessionData });
      } else {
        console.log("No session data found");
        sendResponse({ status: "No session data found" });
      }
    });
    return true; // Keeps the message channel open for sendResponse
  }
});


// Listener for extension icon click
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked");

  // Retrieve session data when the extension icon is clicked
  chrome.storage.session.get("sessionData", (result) => {
    if (result.sessionData) {
      console.log("Session data retrieved", result.sessionData);
      // Here you can perform actions with the retrieved session data
      // For example, sending it to the content script
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: (sessionData) => {
          console.log("Session data in content script:", sessionData);
          // You can perform actions with sessionData here
        },
        args: [result.sessionData]
      });
    } else {
      console.log("No session data found");
    }
  });
});
