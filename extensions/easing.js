/**
 * NOTES TO COME HERE
 */
 	
	shift.fn.ease = function(_easing){
		
		var i, collection;
		
		collection = this.set;
		_easing = (_easing && typeof _easing === "string") ? _easing : ""; // Native default is "ease"
		
		for (i = 0; i < collection.length; i++){
			collection[i].style.transitionTimingFunction = _easing;
		}
		
		return this;
	};
