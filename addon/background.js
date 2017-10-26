function requestSelected() {
    "use strict";
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, function (response) {
            chrome.runtime.sendMessage({method: "showSelection", selection: response.selection});
        });
    });
}

chrome.contextMenus.create({
    title: "Select Insight",
    contexts: ["selection"],  // ContextType
    onclick: requestSelected // A callback function
});