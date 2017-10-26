chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method === "getSelection") {
        sendResponse({selection: window.getSelection().toString()});
        if (!document.getElementById("selectionShower")) {
            let div = document.createElement("div");
            div.id = 'selectionShower';
            div.style.position = 'fixed';
            div.style.top = '20px';
            div.style.right = '0';
            div.style.width = '300px';
            div.style.minHeight = '200px';
            div.style.height = "auto";
            div.style.backgroundColor = 'red';
            div.innerHTML = "<h1> You Have Selected! </h1> " +
                "<h5 id='selectedText'></h5>";
            div.style.zIndex = 100000;
            document.getElementsByTagName("body")[0].appendChild(div);
            let submitButton = document.createElement("button");
            submitButton.innerHTML = "Submit Insight!";
            submitButton.style.position = "absolute";
            submitButton.style.bottom = "5px";
            submitButton.style.right = "5px";
            submitButton.style.display = "block";
            div.appendChild(submitButton);
            submitButton.onclick = function () {
                "use strict";
                document.getElementById("selectionShower").style.visibility = "hidden";
            }
        }
        document.getElementById("selectionShower").style.visibility = "visible";
        document.getElementById("selectedText").innerHTML = window.getSelection().toString();
    }
    else
        sendResponse({}); // snub them.
});