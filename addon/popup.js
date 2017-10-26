chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.method === "showSelection") {
            document.getElementById("outputBox").value = request.selection;
        }
    }
);