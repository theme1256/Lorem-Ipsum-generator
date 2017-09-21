function getCurrentTabUrl(callback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(queryInfo, function(tabs){
		var tab = tabs[0];
		callback(tab.url);
	});
}

function download(file){
	chrome.downloads.download({
		url: file
	});
}

chrome.runtime.onMessage.addListener(function(request, sender){
});

$(function(){
});

window.onload = onWindowLoad;
function onWindowLoad(){
}
