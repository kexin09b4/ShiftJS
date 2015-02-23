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
				
				this.style.transform = "scale(" + _values + ", " + _values + ")";
				this.style.webkitTransform = "scale(" + _values + ", " + _values + ")";
				
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
