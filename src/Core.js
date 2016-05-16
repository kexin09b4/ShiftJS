// TODO: ADD JSDoc-STYLE NOTES HERE AND ACROSS ALL MODULES
// TODO: TRY TO SHRINK DOWN ALL REPETITIVE .loop() CONTENTS AS A REUSABLE FUNCTION TO STREAMLINE THE CODE BASE
	
	// Primary constructor
	var Shift = function(selector, context) {
		
		var selectedElements, ctx, els, i, j;
		
		if (context) {
			ctx = document.querySelectorAll(context);
			selectedElements = [];
			for (i = 0; i < ctx.length; i++) {
				els = ctx[i].querySelectorAll(selector);
				for (j = 0; j < els.length; j++) {
					selectedElements.push(els[j]);
				}
			}
		} else {
			selectedElements = document.querySelectorAll(selector);
		}
		
		if (selectedElements.length > 0) {
			this.collection = selectedElements;
		} else {
			return [];
		}
	};

	var shift = function(selector, context) {
		return new Shift(selector, context);
	};

/**
 * Below are variables developers can reset themselves to better suit the needs of their site or application
 * Developers may access the "Shift.environment" object and change the default values as they see fit
 * Choices include:
 * -duration
 * -easing
 * -delay
 * -transform-origin (x and y)
 */
	
	// Default values
	Shift.environment = {
		duration: '0.5s',
		easing: 'ease',
		delay: '0.5s',
		originX: '50%',
		originY: '50%'
	};

/**
 * Private functions:
 * Used throughout the library
 */
	
	var priv = {};
	
	// Loop through each member of the collection throughout each extension
	priv.loop = function(array, callback) {
		for (var i = 0; i < array.length; i++) {
			callback.call(array[i]);
		}
		return this;
	};
	
	// Reset everything after transitioning
	priv.reset = function(array) {
		for (var i = 0; i < array.length; i++) {
			array[i].style.transition = '';
			array[i].style.webkitTransition = '';
		}
		return this;
	};
	
	// Called after all transtions end
	priv.callback = function(array, complete, callback) {
		this.reset(array);
		if (complete) {
			setTimeout(function() {
				complete();
			}, 50);
		}
		// Prevent transitionend event from firing too many times
		array[array.length - 1].removeEventListener('transitionend', callback, false);
		return this;
	};
	
	// Easing values
	priv.easingMap = function(value) {
		var easingValue;
		switch (value) {
			case 'ease':
				easingValue = 'ease';
				break;
			case 'in':
				easingValue = 'ease-in';
				break;
			case 'out':
				easingValue = 'ease-out';
				break;
			case 'in-out':
				easingValue = 'ease-in-out';
				break;
			case 'linear':
				easingValue = 'linear';
				break;
			case 'snap':
				easingValue = 'cubic-bezier(0, 1, 0.5, 1)';
				break;
			default:
				easingValue = Shift.environment['easing']; // If no easing is defined, the default value will be "ease" unless redefined by the developer
		};
		
		// Override the default value if a cubic-bezier array is passed
		if (typeof value === 'object' && value.length === 4) easingValue = 'cubic-bezier(' + value[0] + ',' + value[1] + ',' + value[2] + ',' + value[3] + ')';
		
		return easingValue;
	};
	
	// Duration of each animation
	priv.timer = function(duration) {
		return (typeof duration === 'number') ? duration + 's' : Shift.environment['duration'];
	};
	
	// Prototype shorthand
	shift.fn = Shift.prototype;
