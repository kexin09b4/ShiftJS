/**
 * ShiftJS v1.0.0
 * https://github.com/DanZiti/ShiftJS
 * 
 * Copyright (c) 2015 Dan Zervoudakes
 * Released under the MIT license
 * https://github.com/DanZiti/ShiftJS/blob/master/LICENSE
 * 
 * Stand-alone JavaScript library that triggers native CSS3 transition-based animations in modern browsers
 */
 	
 	// Constructor - gathers the set
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
	var $shiftLoop = function(_array, _callback){
		for (var i = 0; i < _array.length; i++){
			_callback.call(_array[i]);
		}
	};
	
	/**
	 * $shiftReset()
	 * To be used in all extensions after the transition has completed...
	 * Called in the $shiftCallback function below
	 */
	
	var $shiftReset = function(_array){
		for (var j = 0; j < _array.length; j++){
			_array[j].style.transition = "";
			_array[j].style.webkitTransition = "";
		}
	};
	
	/**
	 * $shiftCallback()
	 * To be used in all extensions after the transition has completed
	 * Leverages the $shiftReset function above
	 */
	
	var $shiftCallback = function(_array, _complete, _callback){
		
		// Reset all transitions after completion
		//
		$shiftReset(_array);
		
		if (_complete){
			setTimeout(function(){ // setTimeout necessary to let transitions reset properly
				_complete();
			}, 50);
		}
		
		// Necessary to prevent the transitionend event from firing too many times
		//
		_array[_array.length - 1].removeEventListener("transitionend", _callback, false);
		
	};
	
	/**
	 * Below are variables developers can reset themselves to better suit the needs of their site or application
	 * The variables are prefixed by "$" to reduce the possibility of interference with other variables or libraries
	 * Choices include:
	 * -duration
	 * -easing
	 * -delay
	 * -transform-origin (x and y values input separately)
	 */
	
	// Define default values
	//
	Shift.environment = {
		duration: "0.5s",
		easing: "ease",
		delay: "0.5s",
		originX: "50%",
		originY: "50%"
	};
	
	/**
	 * Shorthand variables to access the values above
	 * Note: $-prefixed variables are for use within the library only...
	 * If resetting default values, users will have to use the "Shift.environment" syntax
	 */
	
	var $shiftDuration, $shiftEasing, $shiftDelay, $shiftOriginX, $shiftOriginY;
	
	$shiftDuration = Shift.environment["duration"];
	$shiftEasing   = Shift.environment["easing"];
	$shiftDelay    = Shift.environment["delay"];
	$shiftOriginX  = Shift.environment["originX"];
	$shiftOriginY  = Shift.environment["originY"];
	
	/**
	 * Below is the easing funcion
	 * This function maps certain values to CSS3 easing values
	 * Choices include:
	 * -in
	 * -out
	 * -in-out
	 * -linear
	 * -snap
	 * -custom (applies cubic-bezier)
	 */
	
	var $easingMap = function(_value){
		
		var easingValue;
		
		switch (_value){
			case "ease":
				easingValue = "ease"; // Necessary to put this here in case developers change the default value
				break;
			case "in":
				easingValue = "ease-in";
				break;
			case "out":
				easingValue = "ease-out";
				break;
			case "in-out":
				easingValue = "ease-in-out";
				break;
			case "linear":
				easingValue = "linear";
				break;
			case "snap":
				easingValue = "cubic-bezier(0,1,.5,1)";
				break;
			default:
				easingValue = $shiftEasing; // If no easing is defined, the default value will be "ease" unless redefined by the developer
				break;
		};
		
		// Override the default value if a cubic-bezier array is passed
		//
		if (typeof _value === "object" && _value.length === 4){
			easingValue = "cubic-bezier(" + _value[0] + "," + _value[1] + "," + _value[2] + "," + _value[3] + ")";
		}
		
		return easingValue;
		
	};
	
	// Prototype shorthand for building new extensions
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
		
		// Apply the delay to all members of the collection
		//
		$shiftLoop(collection, function(){
			this.style.transitionDelay = timer;
		});
		
		return this;
	};

/**
 * fadeOut() / fadeIn()
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
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		$shiftLoop(collection, function(){
			this.style.transition = "all " + timer + " " + easing;
			this.style.opacity = 0;
		});
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	// fadeIn() assumes opacity < 1 before calling the method
	//
	shift.fn.fadeIn = function(_duration, _easing, _complete){
		
		var timer, callback, easing, collection;
		
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration;
		
		$shiftLoop(collection, function(){
			this.style.transition = "all " + timer + " " + easing;
			this.style.opacity = 1;
		});
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};

/**
 * origin()
 * 
 * Defines a transform-origin for applicable animations
 * 
 * Parameter:
 * -x (number; percentage)
 * -y (number; percentage)
 */
 	
 	// Note: as of the time this library was built, Safari still requires the -webkit- vendor prefix for transforms
 	//
	shift.fn.origin = function(_x, _y){
		
		var x, y, collection;
		
		collection = this.collection;
		x = (_x && typeof _x === "number" || _x === 0) ? _x + "%" : $shiftOriginX; // Default transform-originX is 50%
		y = (_y && typeof _y === "number" || _y === 0) ? _y + "%" : $shiftOriginY; // Default transform-originY is 50%
		
		// Apply transform-origin to all members of the collection
		//
		$shiftLoop(collection, function(){
			this.style.transformOrigin = x + " " + y;
			this.style.webkitTransformOrigin = x + " " + y;
		});
		
		return this;
	};

/**
 * rotate() / rotateX() / rotateY()
 * 
 * Rotates the target DOM elements to the specified x/y degree values
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
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_degree && typeof _degree === "number" || _degree === 0){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "rotate(" + _degree + "deg)";
				this.style.webkitTransform = "rotate(" + _degree + "deg)";
				
			});
			
		} else {
			throw new Error("Degree value for rotate() must be a valid number.");
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.rotateX = function(_degree, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_degree && typeof _degree === "number" || _degree === 0){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "rotateX(" + _degree + "deg)";
				this.style.webkitTransform = "rotateX(" + _degree + "deg)";
				
			});
			
		} else {
			throw new Error("Degree value for rotateX() must be a valid number.");
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.rotateY = function(_degree, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_degree && typeof _degree === "number" || _degree === 0){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "rotateY(" + _degree + "deg)";
				this.style.webkitTransform = "rotateY(" + _degree + "deg)";
				
			});
			
		} else {
			throw new Error("Degree value for rotateY() must be a valid number.");
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};

/**
 * scale() / scaleX() / scaleY()
 * 
 * Scales the target DOM elements to the specified x/y values
 * 
 * Parameters:
 * -values (required... number or array of numbers; scale multipliers)
 * -duration (optional... seconds as a number, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
 	// Note: as of the time this library was built, Safari still requires the -webkit- vendor prefix for transforms
 	//
	shift.fn.scale = function(_values, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_values && typeof _values === "object" && _values.length === 2){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "scale(" + _values[0] + "," + _values[1] + ")";
				this.style.webkitTransform = "scale(" + _values[0] + "," + _values[1] + ")";
				
			});
			
		} else if (_values && typeof _values === "number" || _values === 0){ // If no array is passed, apply the same scale value to x and y
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "scale(" + _values + ")";
				this.style.webkitTransform = "scale(" + _values + ")";
				
			});
			
		} else {
			throw new Error("The first argument for scale() must either be a number or an array of 2 numbers.")
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.scaleX = function(_value, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_value && typeof _value === "number" || _value === 0){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "scaleX(" + _value + ")";
				this.style.webkitTransform = "scaleX(" + _value + ")";
				
			});
			
		} else {
			throw new Error("scaleX() requires a number as its first argument.");
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.scaleY = function(_value, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_value && typeof _value === "number" || _value === 0){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "scaleY(" + _value + ")";
				this.style.webkitTransform = "scaleY(" + _value + ")";
				
			});
			
		} else {
			throw new Error("scaleY() requires a number as its first argument.");
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
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

/**
 * skew() / skewX() / skewY()
 * 
 * Skews the target DOM elements to the specified x/y values
 * 
 * Parameters:
 * -values (required... number or array of numbers; degrees)
 * -duration (optional... seconds as a number, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
 	// Note: as of the time this library was built, Safari still requires the -webkit- vendor prefix for transforms
 	//
	shift.fn.skew = function(_values, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_values && typeof _values === "object" && _values.length === 2){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "skew(" + _values[0] + "deg," + _values[1] + "deg)";
				this.style.webkitTransform = "skew(" + _values[0] + "deg," + _values[1] + "deg)";
				
			});
			
		} else if (_values && typeof _values === "number" || _values === 0){ // If no array is passed, apply the same skew value to x and y
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "skew(" + _values + "deg)";
				this.style.webkitTransform = "skew(" + _values + "deg)";
				
			});
			
		} else {
			throw new Error("The first argument for skew() must either be a number or an array of 2 numbers.")
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.skewX = function(_value, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_value && typeof _value === "number" || _value === 0){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "skewX(" + _value + "deg)";
				this.style.webkitTransform = "skewX(" + _value + "deg)";
				
			});
			
		} else {
			throw new Error("skewX() requires a number as its first argument.");
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.skewY = function(_value, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_value && typeof _value === "number" || _value === 0){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "skewY(" + _value + "deg)";
				this.style.webkitTransform = "skewY(" + _value + "deg)";
				
			});
			
		} else {
			throw new Error("skewY() requires a number as its first argument.");
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};

/**
 * translate() / translateX() / translateY()
 * 
 * Translates the target DOM elements to the specified x/y values
 * 
 * Parameters:
 * -values (required... number or array of numbers; pixels)
 * -duration (optional... seconds as a number, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
 	// Note: as of the time this library was built, Safari still requires the -webkit- vendor prefix for transforms
 	//
	shift.fn.translate = function(_values, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_values && typeof _values === "object" && _values.length === 2){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "translate(" + _values[0] + "px," + _values[1] + "px)";
				this.style.webkitTransform = "translate(" + _values[0] + "px," + _values[1] + "px)";
				
			});
			
		} else if (_values && typeof _values === "number" || _values === 0){ // If no array is passed, apply the same translate value to x and y
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "translate(" + _values + "px," + _values + "px)";
				this.style.webkitTransform = "translate(" + _values + "px" + _values + "px)";
				
			});
			
		} else {
			throw new Error("The first argument for translate() must either be a number or an array of 2 numbers.")
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.translateX = function(_value, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_value && typeof _value === "number" || _value === 0){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "translateX(" + _value + "px)";
				this.style.webkitTransform = "translateX(" + _value + "px)";
				
			});
			
		} else {
			throw new Error("translateX() requires a number as its first argument.");
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.translateY = function(_value, _duration, _easing, _complete){
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_value && typeof _value === "number" || _value === 0){
			
			$shiftLoop(collection, function(){
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "translateY(" + _value + "px)";
				this.style.webkitTransform = "translateY(" + _value + "px)";
				
			});
			
		} else {
			throw new Error("translateY() requires a number as its first argument.");
		}
		
		// Resets and completions...
		//
		callback = function(){
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
