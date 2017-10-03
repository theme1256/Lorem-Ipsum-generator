String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

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

function loadSiteGet(url, _callback){
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.onload = function(e){
		var data = this.response;
		_callback($.parseHTML(data));
	};
	req.send();
}

function loadSitePost(url, _callback, data){
	var req = new XMLHttpRequest();
	req.open("POST", url, true);
	req.onload = function(e){
		var data = this.response;
		_callback($.parseHTML(data));
	};
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(data);
}

function out(text){
	// Write text to textarea
	$("#ipsum-out").text(text);

	// Save to clipboard
	document.getElementById("ipsum-out").select();
	document.execCommand("Copy", false, null);
	if(document.selection){
		document.selection.empty();
	} else if(window.getSelection){
		window.getSelection().removeAllRanges();
	}

	// Remove spinner
	$("#ipsum-loading").html("");
}

function clean(text){
	var tmp = text;
	// Remove different HTML tags
	tmp = tmp.replaceAll("\n", "");
	tmp = tmp.replaceAll("  ", " ");
	tmp = tmp.replaceAll("<p>", "");
	tmp = tmp.replaceAll("<code>", "");
	tmp = tmp.replaceAll("</code>", "");

	// Create double line break after each paragraph
	tmp = tmp.replaceAll("</p>", "\n\n");

	// Trim spaces
	var a = tmp.split("\n\n");
	var b = [];
	for(var i = 0; i < a.length; i++){
		b.push(a[i].trim());
	}

	// Remove ending double linebreak and return
	return b.join("\n\n").replace(/\n\n$/, "");
}

chrome.runtime.onMessage.addListener(function(request, sender){
});

$(function(){
	$("#ipsum-create").click(function(e){
		e.preventDefault();
		var amount = $("#ipsum-amount").val();
		var type = $("#ipsum-type").val();
		var target = $("#hidden");
		$("#ipsum-loading").html('<i class="fa fa-spinner fa-spin"></i>');
		if(type == "loremipsum"){
			loadSitePost("http://www.lipsum.com/feed/html", function(data){
				target.html(data[16]);
				var ipsum = target.find("#lipsum").html();
				out(clean(ipsum));
				target.html("");
			}, "amount="+amount+"&what=paras&start=yes");
		} else if(type == "trumpipsum"){
			loadSiteGet("http://trumpipsum.net/?paras="+amount+"&type=make-it-great", function(data){
				target.html(data[100]);
				var ipsum = target.find(".anyipsum-output").html();
				out(clean(ipsum));
				target.html("");
			});
		}
	});
	$("#ipsum-type").change(function(){
		var v = $(this).val();
		console.log(v);
		chrome.storage.sync.set({'ipsum_type': v}, function() {
			// Notify that we saved.
			console.log('Settings saved');
		});
	});
	$("#ipsum-amount").change(function(){
		var v = $(this).val();
		console.log(v);
		chrome.storage.sync.set({'ipsum_amount': v}, function() {
			// Notify that we saved.
			console.log('Settings saved');
		});
	});
});

window.onload = onWindowLoad;
function onWindowLoad(){
	chrome.storage.sync.get(["ipsum_type", "ipsum_amount"], function(d){
		console.log(d);
		if(d.ipsum_type.length > 0){
			$("#ipsum-type").val(d.ipsum_type);
		}
		if(d.ipsum_amount.length > 0){
			$("#ipsum-amount").val(d.ipsum_amount);
		}
	})
}
