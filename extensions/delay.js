/**
 * NOTES TO COME HERE
 */
 	
	Transition.prototype.delay = function(_delay){
		
		var i, j, collection;
		
		collection = this.set;
		
		if (_delay && typeof _delay === "number"){
			for (i = 0; i < collection.length; i++){
				collection[i].style.transitionDelay = _delay + "s";
				collection[i].style.webkitTransitionDelay = _delay + "s";
			}
		}
		
		// Reset transition-delays
		//
		collection[collection.length - 1].addEventListener("transitionend",function(){
			for (j = 0; j < collection.length; j++){
				collection[j].style.transitionDelay = "";
				collection[j].style.webkitTransitionDelay = "";
			}
		});
		
		return this;
	};