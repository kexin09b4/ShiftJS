/**
 * animate()
 * 
 * Applies several CSS styles to the target DOM elements
 * 
 * Parameters:
 * -properties (object containing CSS key-value pairs)
 * -duration (optional... number in seconds, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.animate = function(properties, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof properties === 'object') {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'all ' + timer + ' ' + ease;
				for (var styles in properties) {
					this.style[styles] = properties[styles];
					if (styles === 'transform') this.style.webkitTransform = properties[styles];
				}
			});
			
			// Resets and completions...
			resetAll(this.collection, complete);
		}
		
		return this;
	};
