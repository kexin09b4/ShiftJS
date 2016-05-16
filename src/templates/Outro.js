	return w.Shift = w.shift = shift;
 	
})(window, document, function(collection, complete) {
	
	// Global resets
	var reset = function() {
		priv.callback(collection, complete, reset);
	};
	
	collection[collection.length - 1].addEventListener('transitionend', reset, false);
	
});