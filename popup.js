String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

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

$(function(){
	$("#ipsum-create").click(function(e){
		e.preventDefault();
		$("#ipsum-loading").html('<i class="fa fa-spinner fa-spin"></i>');
		var amount = $("#ipsum-amount").val();
		var type = $("#ipsum-type").val();
		generateIpsum(amount, type, function(r){
			out(r);
		});
	});
	$("#ipsum-type").change(function(){
		var v = $(this).val();
		chrome.storage.sync.set({'ipsum_type': v}, function(){
		});
	});
	$("#ipsum-amount").change(function(){
		var v = $(this).val();
		chrome.storage.sync.set({'ipsum_amount': v}, function(){
		});
	});
});

window.onload = onWindowLoad;
function onWindowLoad(){
	chrome.storage.sync.get(["ipsum_type", "ipsum_amount"], function(d){
		if(d.ipsum_type.length > 0){
			$("#ipsum-type").val(d.ipsum_type);
		}
		if(d.ipsum_amount.length > 0){
			$("#ipsum-amount").val(d.ipsum_amount);
		}
	});
}
