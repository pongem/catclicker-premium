

model = {
	cats: [],
	currentCat: {},
	init: function(){
		this.cats = [new Cat('pong','img/cat.jpg'), 
		new Cat('pong2','img/cat2.jpg'), 
		new Cat('pong3','img/cat.jpg')];
		this.currentCat = this.cats[0];
	},
	getAllCats: function(){
		return this.cats;
	},
	getCurrentCat: function(){
		return this.currentCat;
	},
	updateCurrentCatName: function(name){
		this.currentCat.catName = name;
	},
	updateCurrentCatUrl: function(url){
		this.currentCat.imgurl = url;
	},
	updateCurrentCatClicks: function(clicks){
		this.currentCat.clicks = clicks;
	}
};

octopus = {
	init: function(){
		model.init();
		viewCats.init();
		viewDisplay.init();
		viewAdmin.init();
	},
	imgClick: function(viewCat){
		viewCat.clicks++;
		viewDisplay.render();

	},
	getAllCats: function(){
		return model.getAllCats();
	},
	getCurrentCat: function(){
		return model.getCurrentCat();
	},
	setCurrentCat: function(viewCat){
		model.currentCat = viewCat;
		viewDisplay.render();
	},
	updateCurrentCatName: function(name){
		model.updateCurrentCatName(name);
	},
	updateCurrentCatUrl: function(url){
		model.updateCurrentCatUrl(url);
	},
	updateCurrentCatClicks: function(clicks){
		model.updateCurrentCatClicks(clicks);
	}

};

viewCats = {
	init: function() {
		this.render();
	},
	render: function() {
		var view = $('.cats');
		view.empty();

		var allCats = octopus.getAllCats();
		
		for (var i = 0; i < allCats.length; i++) {
			var htmlText = '';
			var cat = allCats[i];
			htmlText += '<div class="displayCat" id="';
			htmlText += cat.identity;
			htmlText += '">';
			htmlText += cat.catName;
			htmlText += '</div>';
			view.append(htmlText);

			var viewCat = $(".displayCat#"+cat.identity);
			viewCat.off('click');
			viewCat.click((function(copyOfCat){ return function(){
				octopus.setCurrentCat(copyOfCat);
			};})(cat));

		};
		

	}
};

viewDisplay = {
	init: function() {
		var cats = $('.cats');
		this.render();
	},
	render: function() {
		viewAdmin.clear();
		var vwDisplayClick = $('.dispClick');
		var vwDisplayImage = $('.dispImage');
		var cat = octopus.getCurrentCat();
		vwDisplayClick.text(cat.clicks + ' clicks');
		vwDisplayImage.attr('src', cat.imgurl);
		vwDisplayImage.attr('id', cat.identity);


		imgcat = $('.dispImage');
		imgcat.off('click');
		imgcat.click((function(copyOfCat){ return function(){
				octopus.imgClick(copyOfCat);
			};})(cat));
	}
};

viewAdmin = {
	init: function(){
		$(".btnEdit").click(function(){viewAdmin.render();});
		$(".btnCancel").click(function(){viewAdmin.clear();});
		$(".btnSubmit").click(function(){viewAdmin.save();});
	},
	render: function(){
		var name = $(".admin#name");
		var url = $(".admin#url");
		var click = $(".admin#click");
		var cat = octopus.getCurrentCat();
		name.val(cat.catName);
		url.val(cat.imgurl);
		click.val(cat.clicks);
		$('.admin').show();
	},
	clear: function(){
		$('.admin').hide();
	},
	save: function(){

		var name = $(".admin#name").val();
		var url = $(".admin#url").val();
		var clicks = $(".admin#click").val();

		if(octopus.getCurrentCat().catName != name )
			octopus.updateCurrentCatName(name);
		if(octopus.getCurrentCat().imgurl != url )
			octopus.updateCurrentCatUrl(url);
		if(octopus.getCurrentCat().clicks != clicks )
			octopus.updateCurrentCatClicks(clicks);
		$('.admin').hide();
		viewCats.render();
		viewDisplay.render();
	}
};


$(document).ready(function(){
	octopus.init();
});