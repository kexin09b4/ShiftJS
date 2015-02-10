/**
 * Shift.js v1.0.0
 * https://github.com/DanZiti/ShiftJS
 * 
 * Copyright (c) 2015 Dan Zervoudakes
 * Released under the MIT license
 * https://github.com/DanZiti/ShiftJS/blob/master/LICENSE
 * 
 * Stand-alone JavaScript library that triggers native CSS3 transition-based animations in modern browsers
 */
 	
 	// Constructor
 	//
	var Shift = function(_selector, _context){
		
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
			this.collection = selectedElements;
		} else {
			return [];
		}
		
	};
	
	// Shorthand method for the results above
	//
	var shift = function(_selector, _context) {
		return new Shift(_selector, _context);
	};
	
	// Loop through each member of the collection throughout each extension
	//
	var $loop = function(_array, _callback){
		for (var i = 0; i < _array.length; i++){
			_callback.call(_array[i]);
		}
	};
	
	// Prototype shorthand
	//
	shift.fn = Shift.prototype;

/**
 * animate()
 * 
 * Applies several CSS styles to the target DOM elements
 * 
 * Parameters:
 * -properties (object containing CSS key-value pairs)
 * -duration (optional... number in seconds, not a string)
 */
 	
	shift.fn.animate = function(_properties, _duration){
		
		var timer, styles, callback, collection;
		
		collection = this.collection;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s"; // Default duration is half a second
		
		if (_properties && typeof _properties === "object"){
			
			// Add all applicable styles to the element per user-definition
			//
			$loop(collection,function(){
				
				this.style.transition = "all " + timer;
				
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
				
				collection[collection.length - 1].removeEventListener("transitionend", callback);
			};
			
			collection[collection.length - 1].addEventListener("transitionend", callback);
			
		}
		
		return this;
	};

/**
 * complete()
 * 
 * Triggers a function after all transitions end
 * 
 * Parameter:
 * -complete (callback triggered after transitions)
 */
 	
	shift.fn.complete = function(_complete){
		
		var callback, collection;
		
		collection = this.collection;
		
		callback = function(){
			_complete();
			collection[collection.length - 1].removeEventListener("transitionend", callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback);
		
		return this;
	};

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

/**
 * ease()
 * 
 * Adjusts the easing/transition-timing-function of each instance
 * 
 * Parameter:
 * -easing (string)
 */
 	
	shift.fn.ease = function(_easing){
		
		var easing, collection;
		
		collection = this.collection;
		easing = (_easing && typeof _easing === "string") ? _easing : "ease"; // Native browser default is "ease"
		
		$loop(collection,function(){
			this.style.transitionTimingFunction = easing;
		});
		
		return this;
	};

/**
 * fadeIn() / fadeOut()
 * 
 * Fades-in/out the target DOM elements
 * 
 * Parameter:
 * -duration (optional... number in seconds, not a string)
 */
 	
	shift.fn.fadeOut = function(_duration){
		
		var timer, callback, collection;
		
		collection = this.collection;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s"; // Default duration is half a second
		
		$loop(collection,function(){
			this.style.transition = "all " + timer;
			this.style.opacity = 0;
		});
		
		callback = function(){
			
			// Reset all transitions after completion
			//
			$loop(collection,function(){
				this.style.transition = "";
				this.style.visibility = "hidden";
			});
			
			collection[collection.length - 1].removeEventListener("transitionend", callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback);
		
		return this;
	};
	
	shift.fn.fadeIn = function(_duration){
		
		var timer, callback, collection;
		
		collection = this.collection;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s";
		
		$loop(collection,function(){
			this.style.visibility = "visible";
			this.style.transition = "all " + timer;
			this.style.opacity = 1;
		});
		
		callback = function(){
			
			// Reset all transitions after completion
			//
			$loop(collection,function(){
				this.style.transition = "";
			});
			
			collection[collection.length - 1].removeEventListener("transitionend", callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback);
		
		return this;
	};

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
