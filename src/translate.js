/**
 * translate() / translateX() / translateY()
 * 
 * Translates the target DOM elements to the specified x/y values
 * 
 * Parameters:
 * -values (required... string or array of strings; the 'px' or '%' x and y values)
 * -duration (optional... seconds as a number, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
 	// Note: as of the time this library was built, Safari still requires the -webkit- vendor prefix for transforms
 	//
	shift.fn.translate = function(_values, _duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = Shift.easingMap(_easing); // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : Shift.environment["duration"]; // Default duration is half a second
		
		if (typeof _values === "object" && _values.length === 2) {
			
			Shift.loop(collection, function() {
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "translate(" + _values[0] + "," + _values[1] + ")";
				this.style.webkitTransform = "translate(" + _values[0] + "," + _values[1] + ")";
				
			});
			
		} else if (typeof _values === "string") { // If no array is passed, apply the same translate value to x and y
			
			Shift.loop(collection, function() {
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "translate(" + _values + "," + _values + ")";
				this.style.webkitTransform = "translate(" + _values + "," + _values + ")";
				
			});
			
		} else {
			throw new Error("The first argument for translate() must either be a string or an array of 2 strings ('px' or '%' values).")
		}
		
		// Resets and completions...
		//
		callback = function() {
			Shift.callback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.translateX = function(_value, _duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = Shift.easingMap(_easing); // Default easing is "ease"
		timer = (typeof _duration === "number") ? _duration + "s" : Shift.environment["duration"]; // Default duration is half a second
		
		if (typeof _value === "string") {
			
			Shift.loop(collection, function() {
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "translateX(" + _value + ")";
				this.style.webkitTransform = "translateX(" + _value + ")";
				
			});
			
		} else {
			throw new Error("translateX() requires a string ('px' or '%') as its first argument.");
		}
		
		// Resets and completions...
		//
		callback = function() {
			Shift.callback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.translateY = function(_value, _duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
			
		collection = this.collection;
		easing = Shift.easingMap(_easing); // Default easing is "ease"
		timer = (typeof _duration === "number") ? _duration + "s" : Shift.environment["duration"]; // Default duration is half a second
		
		if (typeof _value === "string") {
			
			Shift.loop(collection, function() {
				
				this.style.transition = "transform " + timer + " " + easing;
				this.style.webkitTransition = "-webkit-transform " + timer + " " + easing;
				
				this.style.transform = "translateY(" + _value + ")";
				this.style.webkitTransform = "translateY(" + _value + ")";
				
			});
			
		} else {
			throw new Error("translateY() requires a string ('px' or '%') as its first argument.");
		}
		
		// Resets and completions...
		//
		callback = function() {
			Shift.callback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
