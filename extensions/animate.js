/**
 * NOTES TO COME HERE
 */
 	
	shift.fn.animate = function(_properties, _duration){
		
		var i, j, timer, styles, callback;
			
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s"; // Default duration is half a second
		
		if (_properties && typeof _properties === "object"){
			
			var collection = this.set;
			
			// Add all applicable styles to the element per user-definition
			//
			for (i = 0; i < collection.length; i++){
				
				collection[i].style.transition = "all " + timer;
				
				for (styles in _properties){
					collection[i].style[styles] = _properties[styles];
				}
			}
			
			// Trigger "complete" function parameter if applicable and reset all transition values
			//
			callback = function(){
				
				// Reset all transitions after completion
				//
				for (j = 0; j < collection.length; j++){
					collection[j].style.transition = "";
				}
				
				collection[collection.length - 1].removeEventListener("transitionend", callback);
			}
			
			// Triggered after all element transitions
			//
			collection[collection.length - 1].addEventListener("transitionend", callback);
			
		} else {
			throw new Error("Shift requires an object as its first parameter with valid 'style' keys.");
		}
		
		return this;
	};
