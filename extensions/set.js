/**
 * set()
 * 
 * Sets CSS properties for the target DOM elements...
 * ...unlike animate(), this method only accepts one property at a time
 * 
 * Parameters:
 * -property (required; string)
 * -value (required; string)
 * -duration (optional... number in seconds, not a string)
 */
 	
	shift.fn.set = function(_property, _value, _duration){
		
		var timer, collection;
			
		collection = this.collection;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s"; // Default duration is half a second
		
		if (_property && _value && typeof _property === "string" && typeof _value === "string"){
			
			$loop(collection,function(){
				this.style.transition = _property + " " + timer;
				this.style[_property] = _value;
			});
			
		} else {
			throw new Error("'Property' and 'value' parameters for set() must be strings.");
		}
		
		// Reset transitions after completion
		//
		collection[collection.length - 1].addEventListener("transitionend",function(){
			$loop(collection,function(){
				this.style.transition = "";
			});
		});
		
		return this;
	};
