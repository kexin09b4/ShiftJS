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
 	
	shift.fn.fadeOut = function(_duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
		
		collection = this.collection;
		easing = Shift.easingMap(_easing); // Default easing is "ease"
		timer = Shift.timer(_duration); // Default duration is "0.5s"
		
		Shift.loop(collection, function() {
			this.style.transition = "all " + timer + " " + easing;
			this.style.opacity = 0;
		});
		
		// Resets and completions...
		//
		callback = function() {
			Shift.callback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	// fadeIn() assumes opacity < 1 before calling the method
	//
	shift.fn.fadeIn = function(_duration, _easing, _complete) {
		
		var timer, callback, easing, collection;
		
		collection = this.collection;
		easing = Shift.easingMap(_easing); // Default easing is "ease"
		timer = Shift.timer(_duration);
		
		Shift.loop(collection, function() {
			this.style.transition = "all " + timer + " " + easing;
			this.style.opacity = 1;
		});
		
		// Resets and completions...
		//
		callback = function() {
			Shift.callback(collection, _complete, callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
