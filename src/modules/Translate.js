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
	shift.fn.translate = function(values, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof values === 'object' && values.length === 2) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'translate(' + values[0] + ',' + values[1] + ')';
				this.style.webkitTransform = 'translate(' + values[0] + ',' + values[1] + ')';
			});
			
		} else if (typeof _values === 'string') { // If no array is passed, apply the same translate value to x and y
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'translate(' + values + ',' + values + ')';
				this.style.webkitTransform = 'translate(' + values + ',' + values + ')';
			});
			
		} else {
			throw new Error('The first argument for translate() must either be a string or an array of 2 strings ("px" or "%" values).');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.translateX = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'string') {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'translateX(' + value + ')';
				this.style.webkitTransform = 'translateX(' + value + ')';
			});
			
		} else {
			throw new Error('translateX() requires a string ("px" or "%") as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.translateY = function(value, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof value === 'string') {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'translateY(' + value + ')';
				this.style.webkitTransform = 'translateY(' + value + ')';
			});
			
		} else {
			throw new Error('translateY() requires a string ("px" or "%") as its first argument.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
