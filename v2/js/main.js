$(document).ready(function(){

//active FitVids.js on videos
	$('.video').fitVids();

	$('#nav-toggle a').click(function(e) {
		e.preventDefault();
		var navItems = $('#nav-items');
		if (navItems.hasClass('active')) {
			navItems.removeClass('active');
		}
		else {
			navItems.addClass('active');
		}
	});

//animate switch between sections when user clicks on nav item
	$('.nav-block a').bind({
		"click": function(e) {
			//stop anchor from scrolling to corresponding element
			e.preventDefault();
			//get href attribute
			var target = $(this).attr('href');
			window.location.hash = target;
		},
		"page-switch": function(e) {
			//get viewport
			var viewport = $(".viewport");

			//select element we want to animate
			var main = $('.main').stop(true, true);
			
			//get href attribute
			var target = $(this).attr('href');
			
			//get current page
			var current = $('.block.active');
			
			//get target page
			var next = $('[data-block="'+target+'"]').addClass('active').removeClass('invisible');

			//get current nav item
			var currentNav = $('.nav-block.active');

			//get projects section
			var projects = $('#projects');

			//get hero bg image
			var hero = $('.hero');

			//get nav menu list
			var navMenu = $('#nav-items');

			//animate if current and next page are not the same, or if one page is currently loaded
			if (current.index() != next.index() && current.length) { 
				//add class "animating" to expand main div for animation
				main.addClass('animating');
				//if the current page is to the right of the target page, position current page back into viewport
				if (current.index() > next.index()) {
					main.css('left', '-100%');
				}
				//animate to 0 if the current page is to the right of target page, and animate to -100% if current page is to the left of target page
				main.animate({
					//left percentage is calculated from parent element
					'left': (current.index() > next.index() ? '0' : '-100%')
					}, 1000, 'easeInOutCirc',
					//callback function: reset main div to left: 0 and remove classes animating and active
					function() {
						main.css({
							left: '0'
						}).removeClass('animating');
						current.removeClass('active');
						viewport.removeClass('animating');
						hero.addClass('active');
				});
				viewport.addClass('animating');
				currentNav.removeClass('active');
				projects.removeClass('active');
				navMenu.removeClass('active');
				hero.removeClass('active');
				window.scrollTo(0,0);
			}
		}
	});

	$(window).hashchange(function() {
		if (window.location.hash == "") {
			$("#portfolio").removeClass('invisible').addClass('active');
			$('#nav-portfolio').addClass('active');
		}
		if (window.location.hash == "#about") {
			$("#about .hero").addClass('active');
			$('#nav-about').addClass('active');
		}
		if (window.location.hash == "#contact") {
			$("#contact .hero").addClass('active');
			$('#nav-contact').addClass('active');
		}
		if (window.location.hash != "") {
			$('.nav-block a[href="'+window.location.hash+'"]').trigger('page-switch').parent('.nav-block').addClass('active');
		}
	}); 
	$(window).hashchange();

//Projects section
	$('.tile-trigger').click(function(e) {
		e.preventDefault();
		var target = $(this).attr('href');
		var projectPanel = $('#projects').stop(true, true);
		var panel = $('[data-project="'+target+'"]');
		var viewport = $('.viewport');
		var hero = panel.children('.hero');
		projectPanel.addClass('animating').slideDown({
			duration: 1000,
			easing: 'easeInOutCirc',
			complete: function() {
				projectPanel.removeClass('animating');
				hero.addClass('active');
			}
		});
		panel.addClass('active');
		$('#tiles').fadeOut(1000, 'linear');
		
	});

	$('.panel-close').click(function(e) {
		e.preventDefault();
		var panel = $('.panel.active');
		var projectPanel = $('#projects').stop(true, true);
		var viewport = $('.viewport');
		var hero = $('.hero.active');
		projectPanel.addClass('animating').slideUp({
			duration: 1000,
			easing: 'easeInOutCirc',
			complete: function() {
				projectPanel.removeClass('animating');
				panel.removeClass('active');
			}
		});
		viewport.removeClass('active');
		hero.removeClass('active');
		$('#tiles').fadeIn(1000, 'linear');
	});
/* FIX NAV LOGO LINK ACTION
	$('#nav-brand a').click(function(e) {
		e.preventDefault();
		var panel = $('.panel.active');
		var projectPanel = $('#projects').stop(true, true);
		var viewport = $('.viewport');
		var hero = $('.hero.active');
		projectPanel.addClass('animating').slideUp({
			duration: 1000,
			easing: 'easeInOutCirc',
			complete: function() {
				projectPanel.removeClass('animating');
				panel.removeClass('active');
			}
		});
		viewport.removeClass('active');
		hero.removeClass('active');
		$('#tiles').fadeIn(1000, 'linear');
	});
*/
//If window is resized, do this:
	$(window).resize(function(){
		
	});

});