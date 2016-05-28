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
		reset(this.collection, complete);
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
		reset(this.collection, complete);
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
		reset(this.collection, complete);
		return this;
	};
