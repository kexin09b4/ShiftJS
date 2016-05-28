	return w.Shift = w.shift = shift;
 	
})(window, document, function(collection, complete) {
	
	var priv = {};
	
	// Reset everything after transitioning
	priv.reset = function(nodeList) {
		[].forEach.call(nodeList, function(item) {
			item.style.transition = '';
			item.style.webkitTransition = '';
		});
		return this;
	};
	
	// Called after all transtions end
	priv.callback = function(nodeList, complete, callback) {
		this.reset(nodeList);
		if (complete) {
			setTimeout(function() {
				complete();
			}, 50);
		}
		// Prevent transitionend event from firing too many times
		nodeList[nodeList.length - 1].removeEventListener('transitionend', callback, false);
		return this;
	};
	
	// Global resets
	var reset = function() {
		priv.callback(collection, complete, reset);
	};
	
	return collection[collection.length - 1].addEventListener('transitionend', reset, false);
	
});