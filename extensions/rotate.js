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
