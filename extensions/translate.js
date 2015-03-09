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
	shift.fn.translate = function(_values, _duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_values && typeof _values === "object" && _values.length === 2) {
			
			$shiftLoop(collection, function() {
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "translate(" + _values[0] + "px," + _values[1] + "px)";
				this.style.webkitTransform = "translate(" + _values[0] + "px," + _values[1] + "px)";
				
			});
			
		} else if (_values && typeof _values === "number" || _values === 0) { // If no array is passed, apply the same translate value to x and y
			
			$shiftLoop(collection, function() {
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "translate(" + _values + "px," + _values + "px)";
				this.style.webkitTransform = "translate(" + _values + "px," + _values + "px)";
				
			});
			
		} else {
			throw new Error("The first argument for translate() must either be a number or an array of 2 numbers.")
		}
		
		// Resets and completions...
		//
		callback = function() {
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.translateX = function(_value, _duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_value && typeof _value === "number" || _value === 0) {
			
			$shiftLoop(collection, function() {
				
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
		callback = function() {
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.translateY = function(_value, _duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = $easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		if (_value && typeof _value === "number" || _value === 0) {
			
			$shiftLoop(collection, function() {
				
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
		callback = function() {
			$shiftCallback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
