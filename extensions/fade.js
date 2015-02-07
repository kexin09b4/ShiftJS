/**
 * NOTES TO COME HERE
 */
 	
	shift.fn.fadeOut = function(_duration){
		
		var i, j, timer, easing, callback, collection;
		
		collection = this.set;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s";
		
		for (i = 0; i < collection.length; i++){
					
			collection[i].style.transition = "all " + timer/* + easing*/; // NEED TO INCLUDE EASING HERE SOMEHOW
			collection[i].style.opacity = 0;
			
		}
		
		callback = function(){
			
			// Reset all transitions after completion
			//
			for (j = 0; j < collection.length; j++){
				collection[j].style.transition = "";
				collection[j].style.visibility = "hidden";
			}
			
			collection[collection.length - 1].removeEventListener("transitionend", callback);
		}
		
		collection[collection.length - 1].addEventListener("transitionend", callback);
		
		return this;
	};
	
	
	
	
	
	/*Shift.prototype.fadeIn = function(){
		
	};*/