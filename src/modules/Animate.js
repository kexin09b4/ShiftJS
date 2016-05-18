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
