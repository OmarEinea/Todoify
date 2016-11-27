// Todoify Extension Event Page
(function () {
	// Open a new tab when the extention is first installed
	chrome.runtime.onInstalled.addListener(function(details) {
		if (details && details.reason && details.reason == 'install')
		chrome.tabs.create({url: "newtab.html"});
	});

	// Open a new tab when the extention button is clicked
	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.create({url: "newtab.html"});
	});
})();
