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

function loadSite(url, _callback){
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
    req.onload = function(e){
    	var data = this.response;
    	var target = $("#hidden");
    	target.html(data);
    	_callback();
	};
    req.send();
}

chrome.runtime.onMessage.addListener(function(request, sender){
});

$(function(){
});

window.onload = onWindowLoad;
function onWindowLoad(){
}
