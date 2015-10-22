$(document).ready(function(){

//Flexslider Options	
	$('.flexslider').flexslider({
		animation: "slide",
		easing: Modernizr.touch ? "swing" : "easeInOutExpo",
		useCSS: false,
		slideshow: false,
		touch: true,
		directionNav: false,
		manualControls: ".flex-nav li a",
		animationSpeed: 500,
		animationLoop: false,
		smoothHeight: true,
		keyboard: false
	});

//set splash height to (window height - navbar height)
	$('#splash').height($(window).height() - $('#navbar').outerHeight());
	
//hide splash screen when user clicks on nav item
	$('.block-nav' ).click(function(){
		$('#splash, #brand').slideUp({
			duration: 1000,
			easing: 'easeInOutCirc'
		});
		$('#nav-logo').delay(1250).fadeIn(250);
		
		//If the nav-list is already floating right, don't fade it out
		if (!$('#nav-list').hasClass('float-right')) {
			$('#nav-list').fadeOut(500).delay(750).queue(function(next){
				$(this).addClass('float-right');
				next();
			}).fadeIn(250);
		}
		$('#curtain').delay(500).fadeTo('slow', 0.9);
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});
	
	

//show splash screen when user clicks on logo
	$('#nav-logo').click(function(){
		$('#splash, #brand').slideDown({
			duration: 1000,
			easing: 'easeInOutCirc'
		});
		$(this).fadeOut(500);
		$('#nav-list').fadeOut(500).delay(750).queue(function(next){
			$(this).removeClass('float-right');
			next();
		}).fadeIn(500);
	});

//hide logo in navbar on load
	$('#nav-logo').hide();

//switch between sections when user clicks on nav item
	$('.block-nav a').bind({
		"click": function(e) {
			//stop anchor from scrolling to corresponding element
			e.preventDefault();
			//get href attribute
			var target = $(this).attr('href');
			window.location.hash = target;
		},
		"page-switch": function(e) {
			//select element we want to animate
			var main = $('#main').stop(true, true);
			
			//get href attribute
			var target = $(this).attr('href');
			
			//get current page
			var current = $('.block.active');
			
			//get target page
			var next = $('[data-block="'+target+'"]').addClass('active').removeClass('invisible');

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
				})
			}
		}
	});

	$(window).hashchange(function() {
		if (window.location.hash != "") {
			$('.block-nav a[href="'+window.location.hash+'"]').trigger('page-switch');
		}
	}); 
	$(window).hashchange();
	
	
//If window is resized, do this:
	$(window).resize(function(){
		//Auto-adjust height of splash and navbar
		$('#splash').css({
			height: $(window).height() - $('#navbar').outerHeight()
		});
	});

//Three.js Particles
	var container;
	var camera, scene, renderer, particle;
	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	init();
	animate();

	function init() {

		container = document.createElement( 'div' );
		container.setAttribute("id", "particles");
		document.getElementById("splash").appendChild( container );

		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
		camera.position.z = 1000;

		scene = new THREE.Scene();

		var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture( generateSprite() ), blending: THREE.AdditiveBlending } );

		for ( var i = 0; i < 1000; i++ ) {

			particle = new THREE.Particle( material );

			initParticle( particle, i * 10 );

			scene.add( particle );
		}

		renderer = new THREE.CanvasRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.sortElements = false;
		renderer.setClearColor( 0x000000, 1 );
		container.appendChild( renderer.domElement );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );

		//

		window.addEventListener( 'resize', onWindowResize, false );

	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function generateSprite() {

		var canvas = document.createElement( 'canvas' );
		canvas.width = 16;
		canvas.height = 16;

		var context = canvas.getContext( '2d' );
		var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
		gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
		gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
		gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
		gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

		context.fillStyle = gradient;
		context.fillRect( 0, 0, canvas.width, canvas.height );

		return canvas;

	}

	function initParticle( particle, delay ) {

		var particle = this instanceof THREE.Particle ? this : particle;
		var delay = delay !== undefined ? delay : 0;

		particle.position.x = 0;
		particle.position.y = 0;
		particle.position.z = 0;
		particle.scale.x = particle.scale.y = Math.random() * 3 + 1;

		new TWEEN.Tween( particle )
			.delay( delay )
			.to( {}, 50000 )
			.onComplete( initParticle )
			.start();

		new TWEEN.Tween( particle.position )
			.delay( delay )
			.to( { x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 2000 }, 50000 )
			.start();

		new TWEEN.Tween( particle.scale )
			.delay( delay )
			.to( { x: 0, y: 0 }, 50000 )
			.start();

	}

	function onDocumentMouseMove( event ) {

		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	
	function onDocumentTouchStart( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;

		}

	}

	function onDocumentTouchMove( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;

		}

	}

	//

	function animate() {

		requestAnimationFrame( animate );
		render();

	}

	function render() {

		TWEEN.update();

		camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
		camera.lookAt( scene.position );

		renderer.render( scene, camera );

	}

}); //end document(ready)

