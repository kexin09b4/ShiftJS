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
