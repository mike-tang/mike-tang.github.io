var panelRight = $('#aside'),
	panelTrigger = $('#aside-trigger'),
	body = $('body'),
	main = $('#main'),
	overlay = $('#body-overlay'),
	projectNavPrev = $('#project-nav-prev'),
	projectNavNext = $('#project-nav-next'),
	showcase = $('#showcase'),
	projectList = $('.tile-trigger'),
	projectWrap = $('#project-wrap'),
	projectLoader = $('#project-loader'),
	project,
	projectCurrent,
	projectCurrentTile,
	projectPrev,
	projectNext,
	prevNavContent = $('#prev-title, #prev-subtitle'),
	prevTitle = $('#prev-title'),
	prevSubtitle = $('#prev-subtitle'),
	prevThumb = $('#prev-thumb'),
	nextNavContent = $('#next-title, #next-subtitle'),
	nextTitle = $('#next-title'),
	nextSubtitle = $('#next-subtitle'),
	nextThumb = $('#next-thumb');

$(document).ready(function(){

// FADE IN TILES
//$('.tile img').addClass('animated fadeInUp');

// PUSH MENU
    panelTrigger.add(overlay).click(function(e) {
    	e.preventDefault();
    	$(this).add(panelTrigger).add(overlay).add(panelRight).toggleClass('active');
    	body.toggleClass('show-time');
    	main.add(projectNavPrev).add(projectNavNext).toggleClass('push-left');
    });

// SHOWCASE TRANSITION

	$('#nav-logo a').click(function(e) {
		e.preventDefault();
		history.pushState("", document.title, window.location.pathname);
		projectWrap.fadeOut(500, 'linear');
		showcase.delay(500).fadeIn(500,'linear');
	});

	$('.tile-trigger').click(function() {
		// Identify the requested project
		var href = $(this).attr('href'),
			projectTarget = href.substring(1) + ".html";

		showcase.fadeOut(500, 'linear');
		projectWrap.delay(500).fadeIn(500,'linear');
		projectLoader.load( "projects/" + projectTarget);

		//projectCurrent = window.location.hash;
		projectCurrentTile = $('a[href= "'+href+'"] ').parent('.tile');
		if ($('[href="'+href+'"]').index('.tile-trigger') === (projectList.length - 1)) {
			// PREVIOUS
			projectPrev = projectCurrentTile.prev('.tile').children('.tile-trigger').attr('href');
			// NEXT
			projectNext = $('.tile-trigger:first').attr('href');
			
		}
		else if ($('[href="'+href+'"]').index('.tile-trigger') === 0) {
			// PREVIOUS
			projectPrev = $('.tile-trigger:last').attr('href');
			// NEXT
			projectNext = projectCurrentTile.next('.tile').children('.tile-trigger').attr('href');
		}
		else {
			// PREVIOUS
			projectPrev = projectCurrentTile.prev('.tile').children('.tile-trigger').attr('href');
			// NEXT
			projectNext = projectCurrentTile.next('.tile').children('.tile-trigger').attr('href');	
		}
		
		prevTitle.load( 'projects/' + projectPrev.substring(1) + '.html', function(result) {
			prevTitle.html($(result).find('#project-title').text());
			prevSubtitle.html($(result).find('#project-subtitle').text());
		});
		nextTitle.load( 'projects/' + projectNext.substring(1) + '.html', function(result) {
			nextTitle.html($(result).find('#project-title').text());
			nextSubtitle.html($(result).find('#project-subtitle').text());
		});

		projectNavPrev.children('.prev').attr('href', projectPrev);
		projectNavNext.children('.next').attr('href', projectNext);
	});

// PROJECT NAVIGATION TRANSITION
	$('#project-nav-prev a').click(function() {
		
		//save previousProject in a variable before the switch takes place
		var previousProject = projectPrev.substring(1);
		projectLoader.fadeOut(500, 'linear').queue(function() {
			$(this).load( 'projects/' + previousProject + '.html').dequeue();
			window.scrollTo(0,0);
		}).fadeIn(500, 'linear');

		//fade in content for the previous nav arrow
		//projectPrev loads the project previous to the now current one, which was just loaded
		prevNavContent.fadeOut(500, 'linear').queue(function() {
			$(this).load( 'projects/' + projectPrev.substring(1) + '.html', function(result) {
				prevTitle.html($(result).find('#project-title').text());
				prevSubtitle.html($(result).find('#project-subtitle').text());

			}).dequeue();
		}).fadeIn(500, 'linear');

		//fade in content for the next nav arrow
		nextNavContent.fadeOut(500, 'linear').queue(function() {
			$(this).load( 'projects/' + projectNext.substring(1) + '.html', function(result) {
				nextTitle.html($(result).find('#project-title').text());
				nextSubtitle.html($(result).find('#project-subtitle').text());
			}).dequeue();
		}).fadeIn(500, 'linear');
	});

	$('#project-nav-next a').click(function() {
		//save previousProject in a variable before the switch takes place
		var nextProject = projectNext.substring(1);
		projectLoader.fadeOut(500, 'linear').queue(function() {
			$(this).load( 'projects/' + nextProject + '.html').dequeue();
			window.scrollTo(0,0);
		}).fadeIn(500, 'linear');

		nextNavContent.fadeOut(500, 'linear').queue(function() {
			$(this).load( 'projects/' + projectNext.substring(1) + '.html', function(result) {
				nextTitle.html($(result).find('#project-title').text());
				nextSubtitle.html($(result).find('#project-subtitle').text());
			}).dequeue();
		}).fadeIn(500, 'linear');

		prevNavContent.fadeOut(500, 'linear').queue(function() {
			$(this).load( 'projects/' + projectPrev.substring(1) + '.html', function(result) {
				prevTitle.html($(result).find('#project-title').text());
				prevSubtitle.html($(result).find('#project-subtitle').text());
			}).dequeue();
		}).fadeIn(500, 'linear');
	});

// CHECK URL FOR HASH BEFORE LOADING ANYTHING
	if (window.location.hash != "") {
		projectCurrent = window.location.hash;
		projectCurrentTile = $('a[href= "'+projectCurrent+'"] ').parent('.tile');
		if ($('[href="'+projectCurrent+'"]').index('.tile-trigger') === (projectList.length - 1)) {
			// PREVIOUS
			projectPrev = projectCurrentTile.prev('.tile').children('.tile-trigger').attr('href');
			// NEXT
			projectNext = $('.tile-trigger:first').attr('href');
			
		}
		else if ($('[href="'+projectCurrent+'"]').index('.tile-trigger') === 0) {
			// PREVIOUS
			projectPrev = $('.tile-trigger:last').attr('href');
			// NEXT
			projectNext = projectCurrentTile.next('.tile').children('.tile-trigger').attr('href');
		}
		else {
			// PREVIOUS
			projectPrev = projectCurrentTile.prev('.tile').children('.tile-trigger').attr('href');
			// NEXT
			projectNext = projectCurrentTile.next('.tile').children('.tile-trigger').attr('href');	
		}
		
		showcase.hide();
		projectWrap.show();
		projectLoader.load( "projects/" + projectCurrent.substring(1) + ".html");


		prevTitle.load( 'projects/' + projectPrev.substring(1) + '.html', function(result) {
			prevTitle.html($(result).find('#project-title').text());
			prevSubtitle.html($(result).find('#project-subtitle').text());
		});
		nextTitle.load( 'projects/' + projectNext.substring(1) + '.html', function(result) {
			nextTitle.html($(result).find('#project-title').text());
			nextSubtitle.html($(result).find('#project-subtitle').text());
		});

		projectNavPrev.children('.prev').attr('href', projectPrev);
		projectNavNext.children('.next').attr('href', projectNext);
	}


// HASH CHANGE
	$(window).hashchange(function() {
		if (window.location.hash == "") {
			projectWrap.fadeOut(500,'linear');
			showcase.delay(500).fadeIn(500, 'linear');
		}
		if (window.location.hash != "") {
			projectCurrent = window.location.hash;
			projectCurrentTile = $('a[href= "'+projectCurrent+'"] ').parent('.tile');

			if ($('[href="'+projectCurrent+'"]').index('.tile-trigger') === (projectList.length - 1)) {
				// PREVIOUS
				projectPrev = projectCurrentTile.prev('.tile').children('.tile-trigger').attr('href');
				// NEXT
				projectNext = $('.tile-trigger:first').attr('href');
			}
			else if ($('[href="'+projectCurrent+'"]').index('.tile-trigger') === 0) {
				// PREVIOUS
				projectPrev = $('.tile-trigger:last').attr('href');
				// NEXT
				projectNext = projectCurrentTile.next('.tile').children('.tile-trigger').attr('href');
			}
			else {
				// PREVIOUS
				projectPrev = projectCurrentTile.prev('.tile').children('.tile-trigger').attr('href');
				// NEXT
				projectNext = projectCurrentTile.next('.tile').children('.tile-trigger').attr('href');	
			}
			
			//project = $('.project[data-project="' + projectCurrent.substring(1) + '"]');

			// change href of PREV and NEXT buttons
			$('#project-nav-prev').children('.prev').attr('href', projectPrev);
			$('#project-nav-next').children('.next').attr('href', projectNext);
			
			
			
		}
	}); 
	$(window).hashchange();


//If window is resized, do this:
	$(window).resize(function(){
		
	});

});