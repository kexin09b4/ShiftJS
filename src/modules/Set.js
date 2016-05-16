/**
 * set()
 * 
 * Sets CSS properties for the target DOM elements...
 * ...unlike animate(), this method only accepts one property at a time
 * 
 * Parameters:
 * -property (required; string)
 * -value (required; string)
 * -duration (optional... number in seconds, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.set = function(property, value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof property === 'string' && typeof value === 'string') {
			
			priv.loop(this.collection, function() {
				this.style.transition = property + ' ' + timer + ' ' + ease;
				this.style[property] = value;
				if (property === 'transform') {
					this.style.transition = '-webkit-transform' + ' ' + timer + ' ' + ease;
					this.style.webkitTransform = value;
				}
			});
			
		} else {
			throw new Error('"Property" and "value" parameters for set() must be strings.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
