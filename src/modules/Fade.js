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
		reset(this.collection, complete);
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
		reset(this.collection, complete);
		return this;
	};
