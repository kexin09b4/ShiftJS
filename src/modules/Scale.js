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
