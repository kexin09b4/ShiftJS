/**
 * ShiftJS v1.0.3
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
	var Shift = function(_selector, _context) {
		
		var selectedElements, ctx, els, i, j;
		
		// Gather the set
		//
		if (_context) {
			
			ctx = document.querySelectorAll(_context);
			selectedElements = [];
			
			for (i = 0; i < ctx.length; i++) {
				
				els = ctx[i].querySelectorAll(_selector);
				
				for (j = 0; j < els.length; j++) {
					selectedElements.push(els[j]);
				}
			}
			
		} else {
			selectedElements = document.querySelectorAll(_selector);
		}
		
		if (selectedElements.length > 0) {
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
	Shift.loop = function(_array, _callback) {
		for (var i = 0; i < _array.length; i++) {
			_callback.call(_array[i]);
		}
	};
	
	/**
	 * Shift.reset()
	 * To be used in all extensions after the transition has completed...
	 * Called in the Shift.callback function below
	 */
	
	Shift.reset = function(_array) {
		for (var j = 0; j < _array.length; j++) {
			_array[j].style.transition = "";
			_array[j].style.webkitTransition = "";
		}
	};
	
	/**
	 * Shift.callback()
	 * To be used in all extensions after the transition has completed
	 * Leverages the Shift.reset function above
	 */
	
	Shift.callback = function(_array, _complete, _callback) {
		
		// Reset all transitions after completion
		//
		Shift.reset(_array);
		
		if (_complete) {
			setTimeout(function() { // setTimeout necessary to let transitions reset properly
				_complete();
			}, 50);
		}
		
		// Necessary to prevent the transitionend event from firing too many times
		//
		_array[_array.length - 1].removeEventListener("transitionend", _callback, false);
		
	};
	
	/**
	 * Below are variables developers can reset themselves to better suit the needs of their site or application
	 * Developers may access the "Shift.environment" object and change the default values as they see fit
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
	
	Shift.easingMap = function(_value) {
		
		var easingValue;
		
		switch (_value) {
			
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
				easingValue = "cubic-bezier(0, 1, 0.5, 1)";
				break;
				
			default:
				easingValue = Shift.environment["easing"]; // If no easing is defined, the default value will be "ease" unless redefined by the developer
				break;
		};
		
		// Override the default value if a cubic-bezier array is passed
		//
		if (typeof _value === "object" && _value.length === 4) {
			easingValue = "cubic-bezier(" + _value[0] + "," + _value[1] + "," + _value[2] + "," + _value[3] + ")";
		}
		
		return easingValue;
		
	};
	
	/**
	 * Below is the timing funcion
	 * This function determines the duration of each animation
	 * Default duration is specified in the "Shift.environment" object as "0.5s"
	 */
	 
	Shift.timer = function(_duration) {
		return (typeof _duration === "number") ? _duration + "s" : Shift.environment["duration"];
	};
	
	// Prototype shorthand for building new extensions
	//
	shift.fn = Shift.prototype;
