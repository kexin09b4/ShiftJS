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
		// Resets and completions...
		resetAll(this.collection, complete);
		return this;
	};
