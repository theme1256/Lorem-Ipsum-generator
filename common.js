String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

// Strips the string from different html tags and adds linebreaks after each paragraph
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

// Functions to fetch data from sites using POST and GET
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


// Fetch the right ipsum
function generateIpsum(amount, type, _return){
	var target = $("#hidden");
	if(type == "loremipsum"){
		loadSitePost("http://www.lipsum.com/feed/html", function(data){
			target.html(data[16]);
			var ipsum = target.find("#lipsum").html();
			target.html("");
			_return(clean(ipsum));
		}, "amount="+amount+"&what=paras&start=yes");
	} else if(type == "trumpipsum"){
		loadSiteGet("http://trumpipsum.net/?paras="+amount+"&type=make-it-great", function(data){
			target.html(data[100]);
			var ipsum = target.find(".anyipsum-output").html();
			target.html("");
			_return(clean(ipsum));
		});
	} else if(type == "loremfuckingipsum"){
		loadSitePost("http://loremfuckingipsum.com/text.php", function(data){
			target.html(data[20]);
			var ipsum = target.find("#text-to-copy").html();
			target.html("");
			_return(clean(ipsum));
		}, "number-copy="+amount+"&copy=Paragraphs");
	} else if(type == "coffeeipsum"){
		loadSitePost("http://coffeeipsum.com/", function(data){
			target.html(data[5].innerHTML.replaceAll("<script", "<code").replaceAll("/script>", "/code>").replaceAll("<iframe", "<code").replaceAll("/iframe>", "/code>"));
			var ipsum = target.find("#tbCopy1").val();
			_return(ipsum);
		}, "ScriptManager1=upIpsum%7ClbGenIpsum&__EVENTTARGET=lbGenIpsum&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUKMTEwNTA3NTAwMmRkHanO2mttY4qbsDw1aUM6Fxxo2fvwSMLfs%2B6SLNHjh%2Bk%3D&__VIEWSTATEGENERATOR=CA0B0334&__EVENTVALIDATION=%2FwEdAAhkgYAXqKuOtMXhmrZrIJklOwusCvugYaHCVIdJGFx5wQPfUKwML5F89RbmmgXsHgdrIHOpintv4a7OxKiN%2B4lXIQ2vPVDDVUlWOH1JOEy5EZjVKYmGFnjWX7PVM9lma0%2Fqc64K%2BPprGJ1ZJxp452qqGppHg87bdIXHF%2BHGdXyS6uwG8uX4G%2FWRU%2FBUnjU3cF0qDGqpmEGh1gi5WX9lz4ih&hfPage=0&hfLastValue=0&tbCopy1=&tbCopy2=&paraNum="+amount+"&paraSize=Normal&__ASYNCPOST=true&");
	} else if(type == "samuellipsum"){
		var ipsum = samuellipsum(amount);
		_return(ipsum);
	}
}


// Some ipsums run locally, the following functions are these
function samuellipsum(b){
	var ipsum = new Array(10);
	ipsum[1] = "Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.";
	ipsum[2] = "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.";
	ipsum[3] = "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.";
	ipsum[4] = "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.";
	ipsum[5] = "Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.";
	ipsum[6] = "Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.";
	ipsum[7] = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man.";
	ipsum[8] = "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?";
	ipsum[9] = "Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit. ";
	ipsum[10] = "My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?";
	var min_num = 1;
	var max_num = 10;
	var diff = max_num - min_num + 1;
	var a = "";
	for(var i = 0; i < b; i++){
		rnd_number = Math.floor(Math.random() * diff + min_num);
		a += ipsum[rnd_number];
		a += "\n\n";
	}
	return a.replace(/\n\n$/, "");
}