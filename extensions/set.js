/**
 * NOTES TO COME HERE
 */
 	
	shift.fn.set = function(_property, _value, _duration){
		
		var i, j, collection, timer;
			
		collection = this.collection;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s";
		
		if (_property && _value && typeof _property === "string" && typeof _value === "string"){
			for (i = 0; i < collection.length; i++){
				collection[i].style.transition = _property + " " + timer;
				collection[i].style[_property] = _value;
			}
		}
		
		// Reset transitions after completion
		//
		collection[collection.length - 1].addEventListener("transitionend",function(){
			for (j = 0; j < collection.length; j++){
				collection[j].style.transition = "";
			}
		});
		
		return this;
	};
