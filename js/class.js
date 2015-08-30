
var globalNextCatIdentity = 0;

var Cat = function(name, imgurl) {
	this.catName = name;
	this.clicks = 0;
	this.imgurl = imgurl;
	this.identity = globalNextCatIdentity;
	globalNextCatIdentity++;
};

