/**
 * Author stefanofranz
 */

let endpoint = '/service/rest/settings/purge';

function getCookie(cookieName) {
    "use strict";
    return new Promise((resolve, reject) => {
        window.setTimeout(function () {
            reject("timed out getting cookie");
        }, 200);
        chrome.runtime.sendMessage({
            action: 'getCookie',
            site: window.location.origin,
            cookieName: cookieName
        }, function (response) {
            "use strict";
            resolve(response);
        });
    });
}

function purgeSettings() {
    "use strict";
    return new Promise((resolve, reject) => {
        Promise.all([
            getCookie("auth_pubtkt"),
            getCookie("auth_tkt"),
            getCookie("byGraphRootId"),
            getCookie("byGraphRootType")
        ]).then(function (loadedCookies) {
            let cookieText = "";
            for (let cookie of loadedCookies) {
                let cookieName = cookie.cookieName;
                let cookieValue = cookie.cookieValue;
                cookieText = cookieText + cookieName + "=" + cookieValue + ";";
            }
            document.cookie = cookieText;
            fetch(endpoint, {
                method: "post",
                credentials: 'include'
            }).then(function (response) {
                resolve(true);
            }).catch(function (error) {
                resolve(false);
            });
        });
    });
}
if (document.title.indexOf("Byhiras") !== -1) {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        "use strict";
        purgeSettings().then(function (purged) {
            sendResponse({success: purged});
        });
        return true;
    });
}

