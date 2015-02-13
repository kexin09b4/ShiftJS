/**
 * animate()
 * 
 * Applies several CSS styles to the target DOM elements
 * 
 * Parameters:
 * -properties (object containing CSS key-value pairs)
 * -duration (optional... number in seconds, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.animate = function(_properties, _duration, _easing, _complete){
		
		var timer, styles, callback, easing, collection;
		
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_properties && typeof _properties === "object"){
			
			// Add all applicable styles to the element per user-definition
			//
			$loop(collection,function(){
				
				this.style.transition = "all " + timer + " " + easing;
				
				for (styles in _properties){
					this.style[styles] = _properties[styles];
				}
			});
			
			// Trigger "complete" function parameter if applicable and reset all transition values
			//
			callback = function(){
				
				// Reset all transitions after completion
				//
				$loop(collection,function(){
					this.style.transition = "";
				});
				
				if (_complete){
					setTimeout(function(){ // setTimeout necessary to let transitions reset properly
						_complete();
					}, 50);
				}
				
				collection[collection.length - 1].removeEventListener("transitionend", callback, false);
			};
			
			collection[collection.length - 1].addEventListener("transitionend", callback, false);
			
		}
		
		return this;
	};
