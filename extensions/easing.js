/**
 * ease()
 * 
 * Adjusts the easing/transition-timing-function of each instance
 * 
 * Parameter:
 * -easing (string)
 */
 	
	shift.fn.ease = function(_easing){
		
		var easing, collection;
		
		collection = this.collection;
		easing = (_easing && typeof _easing === "string") ? _easing : "ease"; // Native browser default is "ease"
		
		$loop(collection,function(){
			this.style.transitionTimingFunction = easing;
		});
		
		return this;
	};
