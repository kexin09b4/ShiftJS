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
	shift.fn.skew = function(_values, _duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = Shift.easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : Shift.environment["duration"]; // Default duration is half a second
		
		if (_values && typeof _values === "object" && _values.length === 2) {
			
			Shift.loop(collection, function() {
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "skew(" + _values[0] + "deg," + _values[1] + "deg)";
				this.style.webkitTransform = "skew(" + _values[0] + "deg," + _values[1] + "deg)";
				
			});
			
		} else if (_values && typeof _values === "number" || _values === 0) { // If no array is passed, apply the same skew value to x and y
			
			Shift.loop(collection, function() {
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "skew(" + _values + "deg, " + _values + "deg)";
				this.style.webkitTransform = "skew(" + _values + "deg, " + _values + "deg)";
				
			});
			
		} else {
			throw new Error("The first argument for skew() must either be a number or an array of 2 numbers.")
		}
		
		// Resets and completions...
		//
		callback = function() {
			Shift.callback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.skewX = function(_value, _duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = Shift.easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : Shift.environment["duration"]; // Default duration is half a second
		
		if (_value && typeof _value === "number" || _value === 0) {
			
			Shift.loop(collection, function() {
				
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
		callback = function() {
			Shift.callback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.skewY = function(_value, _duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = Shift.easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : Shift.environment["duration"]; // Default duration is half a second
		
		if (_value && typeof _value === "number" || _value === 0) {
			
			Shift.loop(collection, function() {
				
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
		callback = function() {
			Shift.callback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
