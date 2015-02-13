/**
 * fadeIn() / fadeOut()
 * 
 * Fades-in/out the target DOM elements
 * 
 * Parameter:
 * -duration (optional... number in seconds, not a string)
 * -easing (optional... string)
 * -complete (optional... callback fired after transitionend)
 */
 	
	shift.fn.fadeOut = function(_duration, _easing, _complete){
		
		var timer, callback, easing, collection;
		
		collection = this.collection;
		easing = (_easing && typeof _easing === "string") ? _easing : $shiftEasing; // Default easing is "ease"
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : $shiftDuration; // Default duration is half a second
		
		$loop(collection,function(){
			this.style.transition = "all " + timer + " " + easing;
			this.style.opacity = 0;
		});
		
		callback = function(){
			
			// Reset all transitions after completion
			//
			$loop(collection,function(){
				this.style.transition = "";
				this.style.visibility = "hidden";
			});
			
			if (_complete){
				setTimeout(function(){ // setTimeout necessary to let transitions reset properly
					_complete();
				}, 50);
			}
			
			collection[collection.length - 1].removeEventListener("transitionend", callback, false);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
	
	shift.fn.fadeIn = function(_duration, _easing, _complete){
		
		var timer, callback, easing, collection;
		
		collection = this.collection;
		easing = (_easing && typeof _easing === "string") ? _easing : $shiftEasing;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s";
		
		$loop(collection,function(){
			this.style.visibility = "visible";
			this.style.transition = "all " + timer + " " + easing;
			this.style.opacity = 1;
		});
		
		callback = function(){
			
			// Reset all transitions after completion
			//
			$loop(collection,function(){
				this.style.transition = "";
			});
			
			if (_complete){
				_complete();
			}
			
			collection[collection.length - 1].removeEventListener("transitionend", callback, false);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
