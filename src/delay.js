/**
 * delay()
 * 
 * Adds a transition-delay to each instance
 * 
 * Parameter:
 * -delay (number in seconds, not a string)
 */
 	
	shift.fn.delay = function(_delay) {
		
		var timer, collection;
		
		collection = this.collection;
		timer = (typeof _delay === "number") ? _delay + "s" : Shift.environment["delay"]; // Default delay is half a second
		
		// Apply the delay to all members of the collection
		//
		Shift.loop(collection, function() {
			this.style.transitionDelay = timer;
		});
		
		return this;
	};
