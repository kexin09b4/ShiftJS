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
			$shiftLoop(collection, function(){
				
				this.style.transition = "all " + timer + " " + easing;
				
				for (styles in _properties){
					
					this.style[styles] = _properties[styles];
					
					if (styles === "transform"){
						this.style.webkitTransform = _properties[styles]; // Takes care of transform vendor-prefixing automatically for the end user
					}
				}
				
			});
			
			// Resets and completions...
			//
			callback = function(){
				$shiftCallback(collection, _complete, callback);
			};
			
			collection[collection.length - 1].addEventListener("transitionend", callback, false);
			
		}
		
		return this;
	};
