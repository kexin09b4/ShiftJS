/**
 * complete()
 * 
 * Triggers a function after all transitions end
 * 
 * Parameter:
 * -complete (callback triggered after transitions)
 */
 	
	shift.fn.complete = function(_complete){
		
		var callback, active, collection;
		
		active = true;
		collection = this.collection;
		
		callback = function(){ // The browser will throw a native error if the _complete parameter is not a function
			
			if (active){ // Prevents the event from firing too many times with method chaining
				
				// setTimeout block below is necessary to prevent completion event from firing too soon
				//
				setTimeout(function(){
					collection[collection.length - 1].removeEventListener("transitionend", callback, false); // NOT WORKING!!!!!
					_complete();
				}, 50);
				
				active = false;
			
			}
			
		};
		
		collection[collection.length - 1].addEventListener("transitionend", callback, false);
		
		return this;
	};
