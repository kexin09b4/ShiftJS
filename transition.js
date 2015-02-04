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
			
			var i, j, k, styles;
			
			var timer = (_duration) ? (_duration / 1000) + "s" : "0.5s"; // Default duration is half a second
			
			if (_properties && typeof _properties === "object"){
				
				var _collection = this.set;
				
				// Add all applicable styles to the element per user-definition
				//
				for (i = 0; i < _collection.length; i++){
					
					_collection[i].style.transition = "all " + timer;
					
					for (styles in _properties){
						_collection[i].style[styles] = _properties[styles];
					}
				}
				
				// Trigger "complete" function parameter if applicable and reset all transition values
				//
				var _callback = function(){
					if (_complete){
						_complete();
					}
					_collection[_collection.length - 1].removeEventListener("transitionend", _callback);
				}
				
				// Triggered after all element transitions
				//
				_collection[_collection.length - 1].addEventListener("transitionend", _callback);
				
			} else {
				throw new Error("Transition requires an object as its primary parameter with valid 'style' keys.");
			}
			
			return this;
		};
	};
