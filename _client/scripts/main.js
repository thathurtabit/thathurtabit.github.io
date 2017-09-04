(function(window, undefined) {
	/*jshint undef:false*/
	'use strict';

	// Require
	//var FULLTILT = require('fulltilt');
	//var GyroNorm = require('gyronorm');

	// Vars 
	var a = document.getElementById('a');
	var b = document.getElementById('b');
	var g = document.getElementById('g');

	// ==================================
	// Helper Functions

	// Round up numbers to 2 decimal places
	var roundUpDec = (value, decimals) => Number(Math.round(value+'e'+decimals)+'e-'+decimals);

	// Converts from degrees to percent.
	var degreeToPercent = (degrees) => (degrees / 360 * 100);

	// Args
	// var args = {
	// 	frequency:50,					// ( How often the object sends the values - milliseconds )
	// 	gravityNormalized:true,			// ( If the gravity related values to be normalized )
	// 	orientationBase:GyroNorm.GAME,		// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
	// 	decimalCount:2,					// ( How many digits after the decimal point will there be in the return values )
	// 	logger:null,					// ( Function to be called to log messages from gyronorm.js )
	// 	screenAdjusted:false			// ( If set to true it will return screen adjusted values. )
	// };

	/*
	// Create new GyroNorm object
	var gn = new GyroNorm();

	gn.init(args).then(function(){
	  gn.start(function(data){

	    // Process:
	    // data.do.alpha	( deviceorientation event alpha value )
	    // data.do.beta		( deviceorientation event beta value )
	    // data.do.gamma	( deviceorientation event gamma value )
	    // data.do.absolute	( deviceorientation event absolute value )

	    // data.dm.x		( devicemotion event acceleration x value )
	    // data.dm.y		( devicemotion event acceleration y value )
	    // data.dm.z		( devicemotion event acceleration z value )

	    // data.dm.gx		( devicemotion event accelerationIncludingGravity x value )
	    // data.dm.gy		( devicemotion event accelerationIncludingGravity y value )
	    // data.dm.gz		( devicemotion event accelerationIncludingGravity z value )

	    // data.dm.alpha	( devicemotion event rotationRate alpha value )
	    // data.dm.beta		( devicemotion event rotationRate beta value )
	    // data.dm.gamma	( devicemotion event rotationRate gamma value )


	    // Spit out the info
			// Make sure it's on the page
			if (typeof a !== 'undefined') {
		  	a.innerHTML = 'Alpha: ' + data.do.alpha + '%';
			}
			if (typeof b !== 'undefined') {
		  	b.innerHTML = 'Beta: ' + data.do.beta;
			}
			if (typeof g !== 'undefined') {
		  	g.innerHTML = 'Gamma: ' + data.do.gamma;				  
		 	}


	  });
	}).catch(function(){
	  // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device

	  a.innerHTML = 'Seems your device doesn\'t include deviceorientation :('; 

	});

	*/

	// If it exists, great, if not, just make it an empty object
	var DeviceOrientation = DeviceOrientation || {};


	DeviceOrientation = function() {

		function init() {

				
				// ==================
				// DEVICE ORIENTATION

				window.addEventListener('deviceorientation', function(event) {

					// Vars
					var deviceDirectionPercent = degreeToPercent(roundUpDec(event.alpha, 2));

					// Make sure it's on the page
					if (typeof a !== 'undefined') {
				  	a.innerHTML = 'Alpha: ' + event.alpha + ' -- ' + deviceDirectionPercent + '%';
					}
					if (typeof b !== 'undefined') {
				  	b.innerHTML = 'Beta: ' + event.beta;
					}
					if (typeof g !== 'undefined') {
				  	g.innerHTML = 'Gamma: ' + event.gamma;				  
				 	}
				});

		}

		init();
	};

	new DeviceOrientation();

})(window);

(function(window, undefined) {
	/*jshint undef:false*/
	'use strict';

	var LazyFonts = LazyFonts || {};

	LazyFonts = function() {

		function init() {
			var lato = document.createElement('link');
            lato.rel = 'stylesheet';
            lato.href = 'https://fonts.googleapis.com/css?family=Lato:300,900';
			document.head.appendChild(lato);
		}

		init();
	};

	new LazyFonts();

})(window);

(function(window, undefined) {
	/*jshint undef:false*/
	'use strict';

	document.body.classList.remove('no-js');
	document.body.classList.add('js');

})(window);

(function(window, undefined) {
	/*jshint undef:false*/
	'use strict';

	// Require
	var Barba = require('barba.js');
	var ImagesLoaded = require('imagesLoaded');
	
	// =========================================
	// Vars
	var body = document.getElementsByTagName('body')[0];
	var cssTransitionTime = 200;
	var transitionWrapper = document.getElementsByClassName('o-journey-inner')[0];
	
	// =========================================
	// Settings
	// rename wrappers
	Barba.Pjax.Dom.wrapperId = 'o-journey-outer';
	Barba.Pjax.Dom.containerClass = 'o-journey-inner';

	// Define barba transition length
	Barba.transitionLength = 200;

	// =========================================
	// Helper functions (move to module.exports?)
	function loaderReady() {
		new ImagesLoaded( body, { background: true }, function( ) {

			setTimeout(function(){
				body.classList.remove('loading');
				transitionWrapper.classList.add('show');
				console.log('Images are loaded');

			}, cssTransitionTime);

		});
	}


	// =========================================
	// Starter functions - trigger on page ready
	loaderReady();


	var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // Trigger loader icon
    body.classList.add('loading');

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
	      .all([this.newContainerLoading, this.fadeOut()])
	      .then(this.fadeIn.bind(this));
	  },

	  fadeOut: function() {
	    /**
	     * this.oldContainer is the HTMLElement of the old Container
	     */


			   this.oldContainer.classList.add('hide');
			   this.oldContainer.classList.remove('show');

			   // Fulfill promise after CSS transition is complete
			   return new Promise(function(resolve) {
		        setTimeout(resolve, cssTransitionTime);
		    });

	    
	  },

	  fadeIn: function() {
	    /**
	     * this.newContainer is the HTMLElement of the new Container
	     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
	     * Please note, newContainer is available just after newContainerLoading is resolved!
	     */

	    var _this = this;
	    //var $el = this.newContainer

	    //this.oldContainer.classList.add('hide');
	    this.oldContainer.style.visibility = 'hidden';
	    this.oldContainer.style.height='0';
	    this.newContainer.style.visibility = 'visible';
	    this.newContainer.classList.remove('hide');
	    this.newContainer.classList.add('show');

	    document.body.scrollTop = 0;

	    loaderReady();


	    setTimeout(function(){ 
				_this.done();
	    }, cssTransitionTime);

	  }
	});

	/**
	 * Next step, you have to tell Barba to use the new Transition
	 */

	Barba.Pjax.getTransition = function() {
	  /**
	   * Here you can use your own logic!
	   * For example you can use different Transition based on the current page or link...
	   */

	  return FadeTransition;
	};


Barba.Pjax.start();

})(window);

//# sourceMappingURL=main.js.map
