function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

var loaded = false;
var prv_url = '';
var prv_id;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type == "state") {
		loaded = request.options.loaded;
	}
});


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete') {
		cookie = getCookie("enable");
		var url = tab.url;
		if (prv_url == url && prv_id == tabId) return;
		//alert(cookie + " : " + loaded)
		if ((!loaded && is_real_website(url) && cookie == 'blocked') || (is_real_website(url) && cookie == 'all')) {
			var lite_url = "https://googleweblight.com/i?u=" + url;
			chrome.tabs.update(tab.id, { url: lite_url });
			prv_url = url;
			prv_id = tabId;
		}
		loaded = false;
	}
});

function is_real_website(url) {
	return url.startsWith("http") &&
		url.indexOf("googleweblight") == -1
}
