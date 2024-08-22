document.addEventListener('DOMContentLoaded', function() {

  function showModal(message) {
    modalMessage.textContent = message;
    validationModal.style.display = 'block';
  }

  document.getElementById("close").onclick = function () {
    validationModal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == validationModal) {
      validationModal.style.display = 'none';
    }
  };

  chrome.runtime.sendMessage({ action: "getSession" }, (response) => {
    console.log(response.status); // Should log "Session data retrieved" or "No session data found"
    console.log(response.data); // Should log the retrieved session data if any
    const data = response.data;
    document.getElementById("apikey").value = data.apikey;
    document.getElementById("apiurl").value = data.apiurl;
  });

  document.getElementById("setCookiesButton").addEventListener("click", () => {
    const inputText = document.getElementById("cookieInput").value;
    if(inputText === ''){
      showModal('Please enter cookie!');
    }else{
      chrome.runtime.sendMessage({ action: "setCookiesFromInput", inputText: inputText }, (response) => {
        document.getElementById("cookieOutput").value = response.status;
        const formCookie = response.status;
        navigator.clipboard.writeText(formCookie)
        .then(() => {
          showModal('Copied to clipboard!');
        })
        .catch(err => {
          showModal('Failed to copy: ' + err);
        });
      });
    }

  });



  document.getElementById("send").addEventListener("click", () => {
    const outputText = document.getElementById("cookieOutput").value;
    const apikey = document.getElementById("apikey").value;
    const apiurl = document.getElementById("apiurl").value;
    if(outputText == ""){
      showModal('Please genarate first');
    }else if(document.getElementById("apikey").value === ""){  
      showModal('Please enter API');  
    }else if(document.getElementById("apiurl").value ===""){
      showModal('Please enter URL');
    }else if(document.getElementById("apikey").value === "" && document.getElementById("apiurl").value ===""){
      showModal('Please enter API and URL');
    }else{
      chrome.runtime.sendMessage({ action: "sendCookiesOverAPI", inputText: outputText , apikey: apikey , apiurl: apiurl}, (response) => {
        showModal(response.status);
      });
    }
  })

  document.getElementById("saveConf").addEventListener("click", () => {
    const apikey = document.getElementById("apikey").value;
    const apiurl = document.getElementById("apiurl").value;
    if(document.getElementById("apikey").value === ""){   
      showModal('Please enter API'); 
    }else if(document.getElementById("apiurl").value ===""){
      showModal('Please enter URL');
    }else if(document.getElementById("apikey").value === "" && document.getElementById("apiurl").value ===""){
      showModal('Please enter API and URL');
    }else{
      chrome.runtime.sendMessage({ action: "saveSession", data: { apikey: apikey , apiurl: apiurl } }, (response) => {
        showModal(response.status);
      });
    }
  })


    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "apiResponse") {
        if (message.status === "success") {
          showModal("Data sent successfully!");
        } else {
          showModal(`Failed to send data: ${message.message}`);
        }
      }
    });

});

