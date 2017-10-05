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
		else if(request.target_class.length > 0)
			document.getElementsByClassName(request.target_class).value = text;
		else if(request.target_name.length > 0)
			document.getElementsByName(request.target_name)[0].value = text;
		else
			document.getElementsByTagName(request.target)[0].value = text;

		sendResponse(request);
	}
});

document.addEventListener("keydown", function(e){
	var key = e.keyCode;
	var className = e.srcElement.className;
	var id = e.srcElement.id;
	var tag = e.srcElement.localName.toLowerCase();
	var name = e.srcElement.name;
	var type = e.srcElement.type;
	var content = "";

	if(key == 9){
		if(tag == "input"){
			console.log("input!");
			if(id.length > 0)
				content = document.getElementById(id).value;
			else if(className.length > 0)
				content = document.getElementsByClassName(className).value;
			else if(name.length > 0)
				content = document.getElementsByName(name)[0].value;
			else
				content = document.getElementsByTagName(type)[0].value;
			
			if(content.length > 0){
				var test = content.split("#");
				if(test.length > 2){
					// There might be something here
					for(var i = 0; i < test.length; i++){
						if(test[i].toLowerCase() == "ipsum"){
							chrome.runtime.sendMessage({
								action: "getIpsum"
							}, function(response){
								console.log(response);
								test[i] = response.text;
							});
						}
						if(i == test.length){
							if(id.length > 0)
								document.getElementById(id).value = test.join(" ");
							else if(className.length > 0)
								document.getElementsByClassName(className).value = test.join(" ");
							else if(name.length > 0)
								document.getElementsByName(name)[0].value = test.join(" ");
							else
								document.getElementsByTagName(type)[0].value = test.join(" ");
						}
					}
				} else{
					console.log("Not enough #'s");
				}
			} else{
				console.log("No content");
			}
		} else if(tag == "textarea"){
			console.log("textarea!");
			if(id.length > 0)
				content = document.getElementById(id).value;
			else if(className.length > 0)
				content = document.getElementsByClassName(className).value;
			else if(name.length > 0)
				content = document.getElementsByName(name)[0].value;
			else
				content = document.getElementsByTagName(type)[0].value;
			
			if(content.length > 0){
				var test = content.split("#");
				if(test.length > 2){
					e.preventDefault();
					// There might be something here
					for(var i = 0; i < test.length; i++){
						if(test[i].toLowerCase() == "ipsum"){
							chrome.runtime.sendMessage({
								action: "getIpsum"
							}, function(response){
								console.log(response);
								test[i] = response;
							});
						}
						if(i == test.length){
							if(id.length > 0)
								document.getElementById(id).value = test.join(" ");
							else if(className.length > 0)
								document.getElementsByClassName(className).value = test.join(" ");
							else if(name.length > 0)
								document.getElementsByName(name)[0].value = test.join(" ");
							else
								document.getElementsByTagName(type)[0].value = test.join(" ");
						}
					}
				} else{
					console.log("Not enough #'s");
				}
			} else{
				console.log("No content");
			}
		}
	}
});