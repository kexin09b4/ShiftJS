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
		
		if (_context){
			elem = document.querySelector(_context);
			selectedElements = elem.querySelectorAll(_selector);
		} else {
			selectedElements = document.querySelectorAll(_selector);
		}
		
		if (selectedElements.length > 0){
			this.init = selectedElements;
		} else {
			return [];
		}
		
		// The transition method
		//
		this.transition = function(_properties, _duration, _complete){
			
			var i, j, k, styles;
			
			var timer = (_duration) ? (_duration / 1000) + "s" : "0.5s"; // Default duration is half a second
			
			if (_properties && typeof _properties === "object"){
				
				var _collection = this.init;
				var properties = Object.keys(_properties);
				
				for (i = 0; i < _collection.length; i++){
					
					_collection[i].style.transitionDuration = timer;
					
					if (properties.length > 1){
						
						var transitionProperty = new String;
						
						for (j = 0; j < properties.length - 1; j++){
							transitionProperty += properties[j] + ", ";
						}
						
						transitionProperty += properties[properties.length - 1];
						_collection[i].style.transitionProperty = transitionProperty;
						
					} else {
						_collection[i].style.transitionProperty	= properties[0];
					}
					
					for (styles in _properties){
						_collection[i].style[styles] = _properties[styles];
					}
				}
				
				setTimeout(function(){ // "transitionend" event is proving unreliable with this script... for now...
					
					// Trigger callback on completion of the specified transitions
					//
					if (_complete){
						_complete();
					}
					
					// After transition, reset all transition properties and durations
					//
					for (k = 0; k < _collection.length; k++){
						_collection[k].style.transitionProperty = "";
						_collection[k].style.transitionDuration = "";
					}
					
				}, _duration);
				
			} else {
				throw new Error("Transition requires an object as its primary parameter with valid 'style' keys.");
			}
			
			return this;
		};
	};