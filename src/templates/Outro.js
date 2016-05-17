	return w.Shift = w.shift = shift;
 	
})(window, document, function(collection, complete) {
	
	var priv = {};
	
	// Reset everything after transitioning
	priv.reset = function(array) {
		for (var i = 0; i < array.length; i++) {
			array[i].style.transition = '';
			array[i].style.webkitTransition = '';
		}
		return this;
	};
	
	// Called after all transtions end
	priv.callback = function(array, complete, callback) {
		this.reset(array);
		if (complete) {
			setTimeout(function() {
				complete();
			}, 50);
		}
		// Prevent transitionend event from firing too many times
		array[array.length - 1].removeEventListener('transitionend', callback, false);
		return this;
	};
	
	// Global resets
	var reset = function() {
		priv.callback(collection, complete, reset);
	};
	
	collection[collection.length - 1].addEventListener('transitionend', reset, false);
	
});