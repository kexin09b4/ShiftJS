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
				var self = this;
				var props = Object.keys(properties);
				props.forEach(function(prop) {
					self.style[prop] = properties[prop];
				});
			});
			reset(this.collection, complete);
		}
		return this;
	};
