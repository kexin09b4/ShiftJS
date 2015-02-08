/**
 * NOTES TO COME HERE
 */
 	
	shift.fn.complete = function(_complete){
		
		var collection = this.set;
		
		var callback = function(){
			_complete();
			collection[collection.length - 1].removeEventListener("transitionend", callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback);
		
		return this;
	};
