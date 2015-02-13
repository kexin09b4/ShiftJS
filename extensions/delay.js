/**
 * delay()
 * 
 * Adds a transition-delay to each instance
 * 
 * Parameter:
 * -delay (number in seconds, not a string)
 */
 	
	shift.fn.delay = function(_delay){
		
		var timer, collection;
		
		collection = this.collection;
		timer = (_delay && typeof _delay === "number") ? _delay + "s" : $shiftDelay; // Default delay is half a second
	
		$loop(collection,function(){
			this.style.transitionDelay = timer;
		});
		
		return this;
	};
