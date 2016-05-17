/**
 * ShiftJS v1.1.0
 * https://github.com/dzervoudakes/ShiftJS
 * 
 * Copyright (c) 2015, 2016 Dan Zervoudakes
 * Released under the MIT license
 * https://github.com/dzervoudakes/ShiftJS/blob/master/LICENSE
 */

(function(w, d, resetAll) {
	
'use strict';

// TODO: ADD JSDoc-STYLE NOTES HERE AND ACROSS ALL MODULES
// TODO: TRY TO SHRINK DOWN ALL REPETITIVE .loop() CONTENTS AS A REUSABLE FUNCTION(S) TO STREAMLINE THE CODE BASE
	
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
	
	// Default properties
	priv.environment = {
		duration: '0.5s',
		easing: 'ease',
		delay: '0.5s',
		originX: '50%',
		originY: '50%'
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
				easingValue = priv.environment['easing']; // If no easing is defined, the default value will be "ease" unless redefined by the developer
		};
		
		// Override the default value if a cubic-bezier array is passed
		if (typeof value === 'object' && value.length === 4) easingValue = 'cubic-bezier(' + value[0] + ',' + value[1] + ',' + value[2] + ',' + value[3] + ')';
		
		return easingValue;
	};
	
	// Duration of each animation
	priv.timer = function(duration) {
		return (typeof duration === 'number') ? duration + 's' : priv.environment['duration'];
	};
	
	// Prototype shorthand
	shift.fn = Shift.prototype;

/**
 * animate()
 * 
 * Applies several CSS styles to the target DOM elements
 * 
 * Parameters:
 * -properties (object containing CSS key-value pairs)
 * -duration (optional... number in seconds, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.animate = function(properties, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof properties === 'object') {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'all ' + timer + ' ' + ease;
				for (var styles in properties) {
					this.style[styles] = properties[styles];
					if (styles === 'transform') this.style.webkitTransform = properties[styles];
				}
			});
			
			// Resets and completions...
			resetAll(this.collection, complete);
		}
		
		return this;
	};

/**
 * delay()
 * 
 * Adds a transition-delay to each instance
 * 
 * Parameter:
 * -delay (number in seconds, not a string)
 */
 	
	shift.fn.delay = function(delay) {
		
		priv.loop(this.collection, function() {
			this.style.transitionDelay = (typeof delay === 'number') ? delay + 's' : priv.environment['delay'];
		});
		
		return this;
	};

/**
 * fadeOut() / fadeIn()
 * 
 * Fades-in/out the target DOM elements
 * 
 * Parameter:
 * -duration (optional... number in seconds, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.fadeOut = function(duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		priv.loop(this.collection, function() {
			this.style.transition = 'all ' + timer + ' ' + ease;
			this.style.opacity = 0;
		});
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.fadeIn = function(duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		priv.loop(this.collection, function() {
			this.style.transition = 'all ' + timer + ' ' + ease;
			this.style.opacity = 1;
		});
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * origin()
 * 
 * Defines a transform-origin for applicable animations
 * 
 * Parameter:
 * -x (number; percentage)
 * -y (number; percentage)
 */
 	
	shift.fn.origin = function(x, y) {
		
		var origX = (typeof x === 'number' || x === 0) ? x + '%' : priv.environment['originX'];
		var origY = (typeof y === 'number' || y === 0) ? y + '%' : priv.environment['originY'];
		
		priv.loop(this.collection, function() {
			this.style.transformOrigin = origX + ' ' + origY;
			this.style.webkitTransformOrigin = origX + ' ' + origY;
		});
		
		return this;
	};

/**
 * rotate() / rotateX() / rotateY()
 * 
 * Rotates the target DOM elements to the specified x/y degree values
 * 
 * Parameters:
 * -degree (required... degrees as a number, not a string)
 * -duration (optional... seconds as a number, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.rotate = function(degree, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof degree === 'number' || degree === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'rotate(' + degree + 'deg)';
				this.style.webkitTransform = 'rotate(' + degree + 'deg)';
			});
			
		} else {
			throw new Error('Degree value for rotate() must be a valid number.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.rotateX = function(degree, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof degree === 'number' || degree === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'rotateX(' + degree + 'deg)';
				this.style.webkitTransform = 'rotateX(' + degree + 'deg)';
			});
			
		} else {
			throw new Error('Degree value for rotateX() must be a valid number.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.rotateY = function(degree, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof degree === 'number' || degree === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'rotateY(' + degree + 'deg)';
				this.style.webkitTransform = 'rotateY(' + degree + 'deg)';
			});
			
		} else {
			throw new Error('Degree value for rotateY() must be a valid number.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * scale() / scaleX() / scaleY()
 * 
 * Scales the target DOM elements to the specified x/y values
 * 
 * Parameters:
 * -values (required... number or array of numbers; scale multipliers)
 * -duration (optional... seconds as a number, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.scale = function(values, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof values === 'object' && values.length === 2) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'scale(' + values[0] + ',' + values[1] + ')';
				this.style.webkitTransform = 'scale(' + values[0] + ',' + values[1] + ')';
				
			});
			
		} else if (typeof values === 'number' || values === 0) { // If no array is passed, apply the same scale value to x and y
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'scale(' + values + ', ' + values + ')';
				this.style.webkitTransform = 'scale(' + values + ', ' + values + ')';
			});
			
		} else {
			throw new Error('The first argument for scale() must either be a number or an array of 2 numbers.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.scaleX = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'scaleX(' + value + ')';
				this.style.webkitTransform = 'scaleX(' + value + ')';
			});
			
		} else {
			throw new Error('scaleX() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.scaleY = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'scaleY(' + value + ')';
				this.style.webkitTransform = 'scaleY(' + value + ')';
			});
			
		} else {
			throw new Error('scaleY() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * set()
 * 
 * Sets CSS properties for the target DOM elements...
 * ...unlike animate(), this method only accepts one property at a time
 * 
 * Parameters:
 * -property (required; string)
 * -value (required; string)
 * -duration (optional... number in seconds, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.set = function(property, value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof property === 'string' && typeof value === 'string') {
			
			priv.loop(this.collection, function() {
				this.style.transition = property + ' ' + timer + ' ' + ease;
				this.style[property] = value;
				if (property === 'transform') {
					this.style.transition = '-webkit-transform' + ' ' + timer + ' ' + ease;
					this.style.webkitTransform = value;
				}
			});
			
		} else {
			throw new Error('"Property" and "value" parameters for set() must be strings.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * skew() / skewX() / skewY()
 * 
 * Skews the target DOM elements to the specified x/y values
 * 
 * Parameters:
 * -values (required... number or array of numbers; degrees)
 * -duration (optional... seconds as a number, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.skew = function(values, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof values === 'object' && values.length === 2) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'skew(' + values[0] + 'deg,' + values[1] + 'deg)';
				this.style.webkitTransform = 'skew(' + values[0] + 'deg,' + values[1] + 'deg)';
			});
			
		} else if (typeof values === 'number' || values === 0) { // If no array is passed, apply the same skew value to x and y
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'skew(' + values + 'deg, ' + values + 'deg)';
				this.style.webkitTransform = 'skew(' + values + 'deg, ' + values + 'deg)';
			});
			
		} else {
			throw new Error('The first argument for skew() must either be a number or an array of 2 numbers.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.skewX = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'skewX(' + value + 'deg)';
				this.style.webkitTransform = 'skewX(' + value + 'deg)';
			});
			
		} else {
			throw new Error('skewX() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.skewY = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'skewY(' + value + 'deg)';
				this.style.webkitTransform = 'skewY(' + value + 'deg)';
			});
			
		} else {
			throw new Error('skewY() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * translate() / translateX() / translateY()
 * 
 * Translates the target DOM elements to the specified x/y values
 * 
 * Parameters:
 * -values (required... string or array of strings; the 'px' or '%' x and y values)
 * -duration (optional... seconds as a number, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
 	// Note: as of the time this library was built, Safari still requires the -webkit- vendor prefix for transforms
 	//
	shift.fn.translate = function(values, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof values === 'object' && values.length === 2) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'translate(' + values[0] + ',' + values[1] + ')';
				this.style.webkitTransform = 'translate(' + values[0] + ',' + values[1] + ')';
			});
			
		} else if (typeof _values === 'string') { // If no array is passed, apply the same translate value to x and y
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'translate(' + values + ',' + values + ')';
				this.style.webkitTransform = 'translate(' + values + ',' + values + ')';
			});
			
		} else {
			throw new Error('The first argument for translate() must either be a string or an array of 2 strings ("px" or "%" values).');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.translateX = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'string') {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'translateX(' + value + ')';
				this.style.webkitTransform = 'translateX(' + value + ')';
			});
			
		} else {
			throw new Error('translateX() requires a string ("px" or "%") as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.translateY = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'string') {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'translateY(' + value + ')';
				this.style.webkitTransform = 'translateY(' + value + ')';
			});
			
		} else {
			throw new Error('translateY() requires a string ("px" or "%") as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

	return w.Shift = w.shift = shift;
 	
})(window, document, function(collection, complete) {
	
	var priv = {};
	
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
	
	// Global resets
	var reset = function() {
		priv.callback(collection, complete, reset);
	};
	
	collection[collection.length - 1].addEventListener('transitionend', reset, false);
	
});