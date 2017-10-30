function registerObserver(target) {
    "use strict";
    let MAGIC_ELEMENT = document.createElement("video");
    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            switch (mutation.type) {
                case "childList":
                    for (let node of mutation.addedNodes) {
                        if (node.tagName === MAGIC_ELEMENT.tagName) {
                            console.log(node);
                            console.log(node.autoplay);
                            let oldOnPlay = node.onplay;
                            let curriedCallback = function (videoElement, onPlay) {
                                let invocationCount = 0;
                                "use strict";
                                return function (event) {
                                    if (invocationCount++ === 0 && !videoElement.paused) {
                                        window.setTimeout(function () {
                                            videoElement.pause();
                                        }, 100);
                                    } else {
                                        onPlay();
                                    }
                                }
                            }(node, oldOnPlay);
                            node.addEventListener("play", curriedCallback);
                        } else {
                        }

                    }
            }

        });
    });

// configuration of the observer:
    let config = {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    };
// pass in the target node, as well as the observer options
    observer.observe(target, config);
}

function captureFirstBodyElement(event) {
    "use strict";
    if (event.srcElement && event.srcElement.tagName === 'BODY') {
        console.log(event);
        registerObserver(event.srcElement);
        document.removeEventListener('DOMSubtreeModified', captureFirstBodyElement, false);
    }
}

document.addEventListener('DOMSubtreeModified', captureFirstBodyElement, false);

