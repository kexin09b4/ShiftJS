/**
 * TransitionJS
 * 
 * Stand-alone JavaScript module that triggers native CSS3 transition-based animations in modern browsers
 * 
 * Copyright (c) 2015 Dan Zervoudakes
 * Released under the MIT license
 */
 	
 	// Constructor
 	//
	var Transition = function(_selector, _context){
		
		var elem, selectedElements;
		
		// Gather the set
		//
		if (_context){
			elem = document.querySelector(_context);
			selectedElements = elem.querySelectorAll(_selector);
		} else {
			selectedElements = document.querySelectorAll(_selector);
		}
		
		if (selectedElements.length > 0){
			this.set = selectedElements;
		} else {
			return [];
		}
		
		// The transition method
		//
		this.transition = function(_properties, _duration, _complete){
			
			var i, j, timer, easing, styles;
			
			timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s"; // Default duration is half a second
			easing = (_properties.hasOwnProperty("easing")) ? " " + _properties["easing"] : ""; // Default browser easing is "ease"
			
			if (_properties && typeof _properties === "object"){
				
				var collection = this.set;
				
				// Add all applicable styles to the element per user-definition
				//
				for (i = 0; i < collection.length; i++){
					
					collection[i].style.transition = "all " + timer + easing;
					
					for (styles in _properties){
						if (styles != "easing"){
							collection[i].style[styles] = _properties[styles];
						}
					}
				}
				
				// Trigger "complete" function parameter if applicable and reset all transition values
				//
				var callback = function(){
					
					if (_duration && typeof _duration !== "number" && typeof _duration !== "string"){
						_duration();
					} else if (_complete){
						_complete();
					}
					
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
				throw new Error("Transition requires an object as its first parameter with valid 'style' keys.");
			}
			
			return this;
		};
	};