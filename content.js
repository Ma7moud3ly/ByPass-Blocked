var loaded=true;
chrome.runtime.sendMessage({type: "state", options: { loaded:loaded}});
