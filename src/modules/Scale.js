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
 	
	shift.fn.scale = function(values, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof values === 'object' && values.length === 2) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'scale(' + values[0] + ',' + values[1] + ')';
				this.style.webkitTransform = 'scale(' + values[0] + ',' + values[1] + ')';
				
			});
			
		} else if (typeof values === 'number' || values === 0) { // If no array is passed, apply the same scale value to x and y
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'scale(' + values + ', ' + values + ')';
				this.style.webkitTransform = 'scale(' + values + ', ' + values + ')';
			});
			
		} else {
			throw new Error('The first argument for scale() must either be a number or an array of 2 numbers.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.scaleX = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'scaleX(' + value + ')';
				this.style.webkitTransform = 'scaleX(' + value + ')';
			});
			
		} else {
			throw new Error('scaleX() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.scaleY = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'scaleY(' + value + ')';
				this.style.webkitTransform = 'scaleY(' + value + ')';
			});
			
		} else {
			throw new Error('scaleY() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
