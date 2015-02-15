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
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.set = function(_property, _value, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_property && _value && typeof _property === "string" && typeof _value === "string"){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = _property + " " + timer + " " + easing;
				this.style[_property] = _value;
				
				if (_property === "transform"){
					this.style.transition = "-webkit-transform" + " " + timer + " " + easing;
					this.style.webkitTransform = _value; // Takes care of transform vendor-prefixing automatically for the end user
				}
			});
			
		} else {
			throw new Error("'Property' and 'value' parameters for set() must be strings.");
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
