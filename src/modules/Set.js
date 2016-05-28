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
		reset(this.collection, complete);
		return this;
	};
