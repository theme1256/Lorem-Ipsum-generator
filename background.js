// Fetches data from preferences and sends it to the injected JS
function insertIpsum(e){
	chrome.storage.sync.get(["ipsum_type", "ipsum_amount"], function(d){
		if(d.ipsum_type.length == 0)
			type = "loremipsum";
		else
			type = d.ipsum_type;
		if(d.ipsum_amount.length == 0)
			amount = 5;
		else
			amount = d.ipsum_amount;

		chrome.storage.local.get(["ipsum_target", "ipsum_target_id", "ipsum_target_name", "ipsum_target_class"], function(d){
			generateIpsum(amount, type, function(r){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {
						action: "setIpsum",
						target: d.ipsum_target,
						target_id: d.ipsum_target_id,
						target_name: d.ipsum_target_name,
						target_class: d.ipsum_target_class,
						text: r
					}, function(response){});  
				});
			});
		});
	});
}

// Receive message from injected JS about the element that was clicked to invoke the context menu
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.action == "getSourceIpsum"){
		chrome.storage.local.set({'ipsum_target': request.target}, function(){});
		chrome.storage.local.set({'ipsum_target_id': request.target_id}, function(){});
		chrome.storage.local.set({'ipsum_target_name': request.target_name}, function(){});
		chrome.storage.local.set({'ipsum_target_class': request.target_class}, function(){});
		sendResponse(request);
	}
});


// Create an option in context menu
chrome.contextMenus.create({
	title: "Insert your Ipsum here", 
	contexts: [
		"editable"
	],
	onclick: insertIpsum
});


// Injects the JS
window.onload = onWindowLoad;
function onWindowLoad(){
	chrome.tabs.executeScript(null, {
        code: 'var config = ' + JSON.stringify(getKeywords)
    }, function(){
        chrome.tabs.executeScript(null, {file: 'ipsumJS.js'});
    });
}