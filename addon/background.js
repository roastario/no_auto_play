chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === "getCookie") {
            chrome.cookies.get({url: request.site, name: request.cookieName}, function (cookie) {
                // return the cookie to content context
                sendResponse({
                    cookieName: request.cookieName,
                    cookieValue: cookie && cookie.value,
                });
            });
        }
        return true;
    }
);