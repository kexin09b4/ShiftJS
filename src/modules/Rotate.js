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
 	
	shift.fn.rotate = function(degree, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof degree === 'number' || degree === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'rotate(' + degree + 'deg)';
				this.style.webkitTransform = 'rotate(' + degree + 'deg)';
			});
			
		} else {
			throw new Error('Degree value for rotate() must be a valid number.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.rotateX = function(degree, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof degree === 'number' || degree === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'rotateX(' + degree + 'deg)';
				this.style.webkitTransform = 'rotateX(' + degree + 'deg)';
			});
			
		} else {
			throw new Error('Degree value for rotateX() must be a valid number.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
	
	shift.fn.rotateY = function(degree, duration, easing, complete) {
		
		var ease = priv.easingMap(easing);
		var timer = priv.timer(duration);
		
		if (typeof degree === 'number' || degree === 0) {
			
			priv.loop(this.collection, function() {
				this.style.transition = 'transform ' + timer + ' ' + ease;
				this.style.webkitTransition = '-webkit-transform ' + timer + ' ' + ease;
				this.style.transform = 'rotateY(' + degree + 'deg)';
				this.style.webkitTransform = 'rotateY(' + degree + 'deg)';
			});
			
		} else {
			throw new Error('Degree value for rotateY() must be a valid number.');
		}
		
		// Resets and completions...
		resetAll(this.collection, complete);
		
		return this;
	};
