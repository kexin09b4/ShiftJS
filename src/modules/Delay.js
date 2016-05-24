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
