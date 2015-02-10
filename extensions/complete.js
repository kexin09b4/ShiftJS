/**
 * complete()
 * 
 * Triggers a function after all transitions end
 * 
 * Parameter:
 * -complete (callback triggered after transitions)
 */
 	
	shift.fn.complete = function(_complete){
		
		var callback, collection;
		
		collection = this.collection;
		
		callback = function(){
			_complete();
			collection[collection.length - 1].removeEventListener("transitionend", callback);
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback);
		
		return this;
	};
