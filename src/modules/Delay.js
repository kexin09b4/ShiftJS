/**
 * delay()
 * 
 * Adds a transition-delay to each instance
 * 
 * Parameter:
 * -delay (number in seconds, not a string)
 */
 	
	shift.fn.delay = function(delay) {
		
		priv.loop(this.collection, function() {
			this.style.transitionDelay = (typeof delay === 'number') ? delay + 's' : Shift.environment['delay'];
		});
		
		return this;
	};
