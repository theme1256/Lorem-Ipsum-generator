// Finds information about the element that was right-clicked to open the context menu and sends it to the background script
document.addEventListener("contextmenu", function(e){
	chrome.runtime.sendMessage({
		action: "getSourceIpsum",
		target: e.target.tagName,
		target_id: e.target.id,
		target_name: e.target.name,
		target_class: e.target.className
	}, function(response){
		console.log(response);
	});
});


// If the background script calls, insert the text into the element that was right-clickes to open the context menu
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.action == "setIpsum"){
		if(request.target.toLowerCase() == "input")
			var text = request.text.split("\n\n")[0];
		else
			var text = request.text;

		if(request.target_id.length > 0)
			document.getElementById(request.target_id).value = text;
		else if(request.target_name.length > 0)
			var els = document.getElementsByName(request.target_name)[0].value = text;
		else if(request.target_class.length > 0)
			document.getElementsByClassName(request.target_class).value = text;
		else
			document.getElementsByTagName(request.target)[0].value = text;

		sendResponse(request);
	}
});