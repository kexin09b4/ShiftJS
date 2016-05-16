/**
 * origin()
 * 
 * Defines a transform-origin for applicable animations
 * 
 * Parameter:
 * -x (number; percentage)
 * -y (number; percentage)
 */
 	
	shift.fn.origin = function(x, y) {
		
		var origX = (typeof x === 'number' || x === 0) ? x + '%' : Shift.environment['originX'];
		var origY = (typeof y === 'number' || y === 0) ? y + '%' : Shift.environment['originY'];
		
		priv.loop(this.collection, function() {
			this.style.transformOrigin = origX + ' ' + origY;
			this.style.webkitTransformOrigin = origX + ' ' + origY;
		});
		
		return this;
	};
