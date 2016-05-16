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
 	
	shift.fn.fadeOut = function(duration, easing, complete) {
		
		var ease = Shift.easingMap(easing);
		var timer = Shift.timer(duration);
		
		priv.loop(this.collection, function() {
			this.style.transition = 'all ' + timer + ' ' + ease;
			this.style.opacity = 0;
		});
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.fadeIn = function(duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		priv.loop(this.collection, function() {
			this.style.transition = 'all ' + timer + ' ' + ease;
			this.style.opacity = 1;
		});
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
