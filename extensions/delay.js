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
		timer = (_delay && typeof _delay === "number") ? _delay + "s" : "0.5s"; // Default duration is half a second
	
		$loop(collection,function(){
			this.style.transitionDelay = _delay + "s";
		});
		
		// Reset transition-delays
		//
		collection[collection.length - 1].addEventListener("transitionend",function(){
			$loop(collection,function(){
				this.style.transitionDelay = "";
			});
		});
		
		return this;
	};
