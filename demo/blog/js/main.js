$(document).ready(function(){

	// Show post panel when user clicks on post snippet
	$(".post-trigger").click(function(e) {
		e.preventDefault();
		var home = $("#post-list");
		var panel = $(".panel");
		var filter = $("#filter-button");
		var back = $("#back-button");
		var search = $("#search");
		var share = $("#share-button");

		home.fadeOut(600, "linear");
		panel.addClass("panel-show").animate({
			left: "27%",
			opacity: 1
			}, 600, function() {
				panel.css({
					"position": "relative",
					"left": "0",
					"top": "0",
					"width": "100%"
			})
		});
		filter.fadeOut(300, "linear", function() {
			back.fadeIn(300, "linear");
		});
		search.fadeOut(300, "linear", function() {
			share.fadeIn(300, "linear");
		});
	});


	$("#back-button").click(function(e) {
		e.preventDefault();
		var home = $("#post-list");
		var panel = $(".panel");
		var filter = $("#filter-button");
		var back = $("#back-button");
		var search = $("#search");
		var share = $("#share-button");

		home.fadeIn(600,"linear");
		panel.css({
			"position": "fixed",
			"top": "60px",
			"width": "73%",
			"left": "27%"
		}).animate({
			left: "100%",
			opacity: 0
			}, 600, function() {
				
				panel.removeClass("panel-show");
				
			});
		back.fadeOut(300, "linear", function() {
			filter.fadeIn(300, "linear");
		});
		share.fadeOut(300, "linear", function() {
			search.fadeIn(300, "linear");
		});
	});



});