/**
 * move()
 * 
 * Moves the target DOM elements to the specified left or top value
 * 
 * Parameters:
 * -direction (required; either "left" or "top")
 * -value (required; either pixels or percentages)
 * -duration (optional... in seconds as a number, not a string)
 */
 	
	shift.fn.move = function(_direction, _value, _duration){
		
		var timer, collection;
			
		collection = this.collection;
		timer = (_duration && typeof _duration === "number") ? _duration + "s" : "0.5s"; // Default duration is half a second
		
		if (_direction && _value && typeof _direction === "string" && typeof _value === "string"){
			
			if (_direction === "left" || _direction === "top"){
			
				$loop(collection,function(){
					this.style.transition = _direction + " " + timer;
					this.style[_direction] = _value;
				});
			
			} else {
				throw new Error("Acceptable direction values for move() are 'left' and 'top'.");
			}
		}
		
		// Reset transitions after completion
		//
		collection[collection.length - 1].addEventListener("transitionend",function(){
			$loop(collection,function(){
				this.style.transition = "";
			});
		});
		
		return this;
	};
