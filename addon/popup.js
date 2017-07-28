let requestPurge = function () {
    return function () {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                reject("timedout");
            }, 500);
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {}, function (response) {
                    resolve(response.success);
                })
            });
        });
    };
}();


function purgeClick(event) {
    requestPurge()
        .then(function (didPurge) {
            let source = event.target || event.srcElement;
            if (didPurge) {
                window.close();
            } else {
                source.classList.remove('purgingButton');
                source.classList.add('failedPurge');
                source.innerHTML = "Failed to Purge";
            }
        })
        .catch(function (rejectionReason) {
            console.log("rejected due to: " + rejectionReason);
        })
}

let button = document.getElementById("purge");
button.addEventListener("click", purgeClick);