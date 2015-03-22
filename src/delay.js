/**
 * delay()
 * 
 * Adds a transition-delay to each instance
 * 
 * Parameter:
 * -delay (number in seconds, not a string)
 */
 	
	shift.fn.delay = function(_delay) {
		
		Shift.loop(this.collection, function() {
			this.style.transitionDelay = (typeof _delay === "number") ? _delay + "s" : Shift.environment["delay"]; // Default delay is "0.5s"
		});
		
		return this;
	};
