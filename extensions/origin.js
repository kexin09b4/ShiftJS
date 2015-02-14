/**
 * origin()
 * 
 * Defines a transform-origin to applicable animations
 * 
 * Parameter:
 * -x (number; percentage)
 * -y (number; percentage)
 */
 	
 	// Note: as of the time this library was built, Safari still requires the -webkit- vendor prefix for transforms
 	//
	shift.fn.origin = function(_x, _y){
		
		var x, y, collection;
		
		collection = this.collection;
		x = (_x && typeof _x === "number" || _x === 0) ? _x + "%" : $shiftOriginX; // Default transform-originX is 50%
		y = (_y && typeof _y === "number" || _y === 0) ? _y + "%" : $shiftOriginY; // Default transform-originY is 50%
		
		// Apply transform-origin to all members of the collection
		//
		$shiftLoop(collection, function(){
			this.style.transformOrigin = x + " " + y;
			this.style.webkitTransformOrigin = x + " " + y;
		});
		
		return this;
	};
