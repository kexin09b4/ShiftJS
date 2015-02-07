/**
 * NOTES TO COME HERE
 */
 	
	shift.fn.delay = function(_delay){
		
		var i, j, collection;
			
		collection = this.set;
		timer = (_delay && typeof _delay === "number") ? _delay + "s" : "0.5s";
	
		for (i = 0; i < collection.length; i++){
			collection[i].style.transitionDelay = _delay + "s";
		}
		
		// Reset transition-delays
		//
		collection[collection.length - 1].addEventListener("transitionend",function(){
			for (j = 0; j < collection.length; j++){
				collection[j].style.transitionDelay = "";
			}
		});
		
		return this;
	};
