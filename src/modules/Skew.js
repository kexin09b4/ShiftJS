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
 	
	shift.fn.skew = function(values, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof values === 'object' && values.length === 2) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'skew(' + values[0] + 'deg,' + values[1] + 'deg)';
				this.style.webkitTransform = 'skew(' + values[0] + 'deg,' + values[1] + 'deg)';
			});
			
		} else if (typeof values === 'number' || values === 0) { // If no array is passed, apply the same skew value to x and y
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'skew(' + values + 'deg, ' + values + 'deg)';
				this.style.webkitTransform = 'skew(' + values + 'deg, ' + values + 'deg)';
			});
			
		} else {
			throw new Error('The first argument for skew() must either be a number or an array of 2 numbers.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.skewX = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'skewX(' + value + 'deg)';
				this.style.webkitTransform = 'skewX(' + value + 'deg)';
			});
			
		} else {
			throw new Error('skewX() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.skewY = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'number' || value === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'skewY(' + value + 'deg)';
				this.style.webkitTransform = 'skewY(' + value + 'deg)';
			});
			
		} else {
			throw new Error('skewY() requires a number as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
