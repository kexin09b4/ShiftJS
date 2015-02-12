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
				
				collection[collection.length - 1].removeEventListener("transitionend", callback, false);
			};
			
			collection[collection.length - 1].addEventListener("transitionend", callback, false);
			
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
		
		var callback, active, collection;
		
		active = true;
		collection = this.collection;
		
		callback = function(){ // The browser will throw a native error if the _complete parameter is not a function
			
			if (active){ // Prevents the event from firing too many times with method chaining
				
				// setTimeout block below is necessary to prevent completion event from firing too soon
				//
				setTimeout(function(){
					collection[collection.length - 1].removeEventListener("transitionend", callback, false); // NOT WORKING!!!!!
					_complete();
				}, 50);
				
				active = false;
			
			}
			
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
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
			
			collection[collection.length - 1].removeEventListener("transitionend", callback, false);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
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
			
			collection[collection.length - 1].removeEventListener("transitionend", callback, false);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};

/**
 * move()
 * 
 * Moves the target DOM elements to the specified left or top value
 * 
 * Parameters:
 * -direction (required; either "left" or "top")
 * -value (required; either pixels or percentages)
 * -duration (optional... in seconds as a number, not a string)
 */
 	
	shift.fn.move = function(_direction, _value, _duration){
		
		var timer, callback, collection;
			
		collection = this.collection;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s"; // Default duration is half a second
		
		if (_direction && _value && typeof _direction === "string" && typeof _value === "string"){
			
			if (_direction === "left" || _direction === "top"){
			
				$loop(collection,function(){
					this.style.transition = _direction + " " + timer;
					this.style[_direction] = _value;
				});
			
			} else {
				throw new Error("Acceptable direction values for move() are 'left' and 'top'.");
			}
		}
		
		callback = function(){
			
			// Reset all transitions after completion
			//
			$loop(collection,function(){
				this.style.transition = "";
			});
			
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
 */
 	
 	// Note: as of the time this library was built, Safari still requires the -webkit- vendor prefix for transforms
 	//
	shift.fn.rotate = function(_degree, _duration){
		
		var timer, callback, collection;
			
		collection = this.collection;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s"; // Default duration is half a second
		
		if (_degree && typeof _degree === "number"){
			
			$loop(collection,function(){
				
				this.style.transition = "transform " + timer;
				this.style.webkitTransition = "-webkit-transform " + timer;
				
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
 */
 	
	shift.fn.set = function(_property, _value, _duration){
		
		var timer, callback, collection;
			
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
		
		callback = function(){
			
			// Reset all transitions after completion
			//
			$loop(collection,function(){
				this.style.transition = "";
			});
			
			collection[collection.length - 1].removeEventListener("transitionend", callback, false);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
