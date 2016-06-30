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
		reset(this.collection, complete);
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
		reset(this.collection, complete);
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
		reset(this.collection, complete);
		return this;
	};
