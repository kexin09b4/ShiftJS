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
	 * -transform-origin (x and y values input separately)
	 */
	
	// Define default values
	//
	Shift.environment = {
		"duration": "0.5s",
		"easing": "ease",
		"delay": "0.5s",
		"transform-origin-x": "50%",
		"transform-origin-y": "50%"
	};
	
	// Shorthand variables to access the values above
	//
	var $shiftDuration, $shiftEasing, $shiftDelay, $shiftOriginX, $shiftOriginY;
	
	$shiftDuration = Shift.environment["duration"];
	$shiftEasing   = Shift.environment["easing"];
	$shiftDelay    = Shift.environment["delay"];
	$shiftOriginX  = Shift.environment["transform-origin-x"];
	$shiftOriginY  = Shift.environment["transform-origin-y"];
