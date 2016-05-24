/**
 * ShiftJS v1.1.1
 * https://github.com/dzervoudakes/ShiftJS
 * 
 * Copyright (c) 2015, 2016 Dan Zervoudakes
 * Released under the MIT license
 * https://github.com/dzervoudakes/ShiftJS/blob/master/LICENSE
 */

(function(w, d, resetAll) {
	
'use strict';

/**
 * Library core: constructor, prototype, private functions
 * @param {string|object} selector
 * @param {string} context - optional
 * @returns {array} Shift.collection
 */

	var Shift = function(selector, context) {
		
		var selectedElements, ctx, els, i, j;
		
		if (context) {
			ctx = d.querySelectorAll(context);
			selectedElements = [];
			for (i = 0; i < ctx.length; i++) {
				els = ctx[i].querySelectorAll(selector);
				for (j = 0; j < els.length; j++) {
					selectedElements.push(els[j]);
				}
			}
		} else {
			selectedElements = d.querySelectorAll(selector);
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

	shift.fn = Shift.prototype;

/**
 * Private functions:
 * Used throughout the library
 */

	var priv = {};

	// Loop through each member of the collection throughout each module
	priv.loop = function(array, callback) {
		for (var i = 0; i < array.length; i++) {
			callback.call(array[i]);
		}
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
				easingValue = priv.environment['easing'];
		};
		
		// Override the default value if a cubic-bezier array is passed
		if (typeof value === 'object' && value.length === 4) easingValue = 'cubic-bezier(' + value[0] + ',' + value[1] + ',' + value[2] + ',' + value[3] + ')';
		
		return easingValue;
	};

	// Duration of each animation
	priv.timer = function(duration) {
		return typeof duration === 'number' ? duration + 's' : priv.environment['duration'];
	};

	// Multiple-value transforms
	priv.multipleValueTransform = function(target, func, timer, ease, val1, val2, deg) {
		target.style.transition = 'transform ' + timer + ' ' + ease;
		target.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
		target.style.transform = func + '(' + val1 + deg ? 'deg' : '' + ',' + val2 + deg ? 'deg' : '' + ')';
		target.style.webkitTransform = func + '(' + val1 + deg ? 'deg' : '' + ',' + val2 + deg ? 'deg' : '' + ')';
	};

	// Single-value transforms
	priv.singleValueTransform = function(target, func, timer, ease, val, deg) {
		target.style.transition = 'transform ' + timer + ' ' + ease;
		target.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
		target.style.transform = func + '(' + val + deg ? 'deg' : '' + ')';
		target.style.webkitTransform = func + '(' + val + deg ? 'deg' : '' + ')';
	};

/**
 * Animate CSS properties of the target element(s)
 * @param {object} properties
 * @param {number} duration
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
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
 * Delay a triggered animation
 * @param {number} delay - in seconds
 * @returns {object} current instance of Shift
 */

	shift.fn.delay = function(delay) {
		priv.loop(this.collection, function() {
			this.style.transitionDelay = typeof delay === 'number' ? delay + 's' : priv.environment['delay'];
		});
		return this;
	};

/**
 * Fade-out visible element(s)
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
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

/**
 * Fade-in hidden element(s)
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

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
 * Define transform-origin for transform-based animations
 * @param {number} x - percent
 * @param {number} y - percent
 * @returns {object} current instance of Shift
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
 * Rotate element(s)
 * @param {number} value
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.rotate = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			priv.loop(this.collection, function() {
				priv.singleValueTransform(this, 'rotate', timer, ease, value, true);
			});
		} else {
			throw new Error('Degree value for rotate() must be a valid number.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Rotate element(s) along the X axis
 * @param {number} value
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.rotateX = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			priv.loop(this.collection, function() {
				priv.singleValueTransform(this, 'rotateX', timer, ease, value, true);
			});
		} else {
			throw new Error('Degree value for rotateX() must be a valid number.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Rotate element(s) along the Y axis
 * @param {number} value
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.rotateY = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			priv.loop(this.collection, function() {
				priv.singleValueTransform(this, 'rotateY', timer, ease, value, true);
			});
		} else {
			throw new Error('Degree value for rotateY() must be a valid number.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Scale element(s)
 * @param {array|number} values
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.scale = function(values, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (Array.isArray(values) && values.length === 2) {
			priv.loop(this.collection, function() {
				priv.multipleValueTransform(this, 'scale', timer, ease, values[0], values[1]);
			});
		} else if (typeof values === 'number' || values === 0) {
			priv.loop(this.collection, function() {
				priv.multipleValueTransform(this, 'scale', timer, ease, values, values);
			});
		} else {
			throw new Error('The first argument for scale() must either be a number or an array of 2 numbers.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Scale element(s) along the X axis
 * @param {number} value
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.scaleX = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			priv.loop(this.collection, function() {
				priv.singleValueTransform(this, 'scaleX', timer, ease, value);
			});
		} else {
			throw new Error('scaleX() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Scale element(s) along the Y axis
 * @param {number} value
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.scaleY = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			priv.loop(this.collection, function() {
				priv.singleValueTransform(this, 'scaleY', timer, ease, value);
			});
		} else {
			throw new Error('scaleY() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Set a single CSS property
 * @param {string} property
 * @param {string} value
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
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
 * Skew element(s)
 * @param {array|number} values
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.skew = function(values, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (Array.isArray(values) && values.length === 2) {
			priv.loop(this.collection, function() {
				priv.multipleValueTransform(this, 'skew', timer, ease, values[0], values[1], true);
			});
		} else if (typeof values === 'number' || values === 0) {
			priv.loop(this.collection, function() {
				priv.multipleValueTransform(this, 'skew', timer, ease, values, values, true);
			});
		} else {
			throw new Error('The first argument for skew() must either be a number or an array of 2 numbers.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Skew element(s) along the X axis
 * @param {number} value
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.skewX = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			priv.loop(this.collection, function() {
				priv.singleValueTransform(this, 'skewX', timer, ease, value, true);
			});
		} else {
			throw new Error('skewX() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Skew element(s) along the Y axis
 * @param {number} value
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.skewY = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			priv.loop(this.collection, function() {
				priv.singleValueTransform(this, 'skewY', timer, ease, value, true);
			});
		} else {
			throw new Error('skewY() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Translate element(s)
 * @param {array|string} values
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.translate = function(values, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (Array.isArray(values) && values.length === 2) {
			priv.loop(this.collection, function() {
				priv.multipleValueTransform(this, 'translate', timer, ease, values[0], values[1]);
			});
		} else if (typeof values === 'string') {
			priv.loop(this.collection, function() {
				priv.multipleValueTransform(this, 'translate', timer, ease, values, values);
			});
		} else {
			throw new Error('The first argument for translate() must either be a string or an array of 2 strings ("number + px" or "number + %" values).');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Translate element(s) along the X axis
 * @param {string} value
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.translateX = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'string') {
			priv.loop(this.collection, function() {
				priv.singleValueTransform(this, 'translateX', timer, ease, value);
			});
		} else {
			throw new Error('translateX() requires a string ("number + px" or "number + %") as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};

/**
 * Translate element(s) along the Y axis
 * @param {string} value
 * @param {number} duration - in seconds
 * @param {string} easing
 * @param {function} complete
 * @returns {object} current instance of Shift
 */

	shift.fn.translateY = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'string') {
			priv.loop(this.collection, function() {
				priv.singleValueTransform(this, 'translateY', timer, ease, value);
			});
		} else {
			throw new Error('translateY() requires a string ("number + px" or "number + %") as its first argument.');
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
	
	return collection[collection.length - 1].addEventListener('transitionend', reset, false);
	
});