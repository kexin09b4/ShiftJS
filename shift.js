/**
 * Shift.js
 * 
 * Stand-alone JavaScript module that triggers native CSS3 transition-based animations in modern browsers
 * 
 * Copyright (c) 2015 Dan Zervoudakes
 * Released under the MIT license
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
			this.set = selectedElements;
		} else {
			return [];
		}
		
	};
	
	var shift = function(_selector, _context) {
		return new Shift(_selector, _context);
	};
	
	shift.fn = Shift.prototype;