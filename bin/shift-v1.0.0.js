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
		
		var selectedElements, ctx, els, i, j;
		
		// Gather the set
		//
		if (_context){
			
			ctx = document.querySelectorAll(_context);
			selectedElements = [];
			
			for (i = 0; i < ctx.length; i++){
				
				els = ctx[i].querySelectorAll(_selector);
				
				for (j = 0; j < els.length; j++){
					selectedElements.push(els[j]);
				}
			}
			
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
	var shift = function(_selector, _context){
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
	 * Below are variables developers can reset themselves to better suit the needs of their site or application.
	 * The variables are prefixed by "$" to reduce the possibility of interference with other variables or libraries.
	 * Choices include:
	 * -duration
	 * -easing
	 * -delay
	 */
	
	Shift.environment = {
		"duration": "0.5s",
		"easing": "ease",
		"delay": "0.5s"
	};
	
	var $shiftDuration, $shiftEasing, $shiftDelay;
	
	$shiftDuration = Shift.environment["duration"];
	$shiftEasing = Shift.environment["easing"];
	$shiftDelay = Shift.environment["delay"];
	
	
	
	
	
	
	
	
	
	
	

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
		easing = (_easing && typeof _easing === "string") ? _easing : $shiftEasing; // Default easing is "ease"
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
		timer = (_delay && typeof _delay === "number") ? _delay + "s" : $shiftDelay; // Default delay is half a second
	
		$loop(collection,function(){
			this.style.transitionDelay = timer;
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
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.fadeOut = function(_duration, _easing, _complete){
		
		var timer, callback, easing, collection;
		
		collection = this.collection;
		easing = (_easing && typeof _easing === "string") ? _easing : $shiftEasing; // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		$loop(collection,function(){
			this.style.transition = "all " + timer + " " + easing;
			this.style.opacity = 0;
		});
		
		callback = function(){
			
			// Reset all transitions after completion
			//
			$loop(collection,function(){
				this.style.transition = "";
				this.style.visibility = "hidden";
			});
			
			if (_complete){
				setTimeout(function(){ // setTimeout necessary to let transitions reset properly
					_complete();
				}, 50);
			}
			
			collection[collection.length - 1].removeEventListener("transitionend", callback, false);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.fadeIn = function(_duration, _easing, _complete){
		
		var timer, callback, easing, collection;
		
		collection = this.collection;
		easing = (_easing && typeof _easing === "string") ? _easing : $shiftEasing;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s";
		
		$loop(collection,function(){
			this.style.visibility = "visible";
			this.style.transition = "all " + timer + " " + easing;
			this.style.opacity = 1;
		});
		
		callback = function(){
			
			// Reset all transitions after completion
			//
			$loop(collection,function(){
				this.style.transition = "";
			});
			
			if (_complete){
				_complete();
			}
			
			collection[collection.length - 1].removeEventListener("transitionend", callback, false);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};

/**
 * rotate()
 * 
 * Rotates the target DOM elements to the specified degree value
 * 
 * Parameters:
 * -degree (required... degrees as a number, not a string)
 * -duration (optional... seconds as a number, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
 	// Note: as of the time this library was built, Safari still requires the -webkit- vendor prefix for transforms
 	//
	shift.fn.rotate = function(_degree, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = (_easing && typeof _easing === "string") ? _easing : $shiftEasing; // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_degree && typeof _degree === "number"){
			
			$loop(collection,function(){
				
				this.style.transition = "transform " + timer;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "rotate(" + _degree + "deg)";
				this.style.webkitTransform = "rotate(" + _degree + "deg)";
				
			});
			
		} else {
			throw new Error("Degree value for rotate() must be a valid number.");
		}
		
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
		
		return this;
	};
	
	/* rotate3d, rotateX, rotateY, rotateZ to go here */
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
		easing = (_easing && typeof _easing === "string") ? _easing : $shiftEasing; // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_property && _value && typeof _property === "string" && typeof _value === "string"){
			
			$loop(collection,function(){
				this.style.transition = _property + " " + timer + " " + easing;
				this.style[_property] = _value;
			});
			
		} else {
			throw new Error("'Property' and 'value' parameters for set() must be strings.");
		}
		
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
		
		return this;
	};
