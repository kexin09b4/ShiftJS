# TransitionJS

##### Stand-alone JavaScript module that triggers native CSS3 transition-based animations in modern browsers.

This script is designed for simple CSS3 animations (no keyframes) and utilizes syntax similar to jQuery's "animate()" method.

This script does not require jQuery or any other JavaScript libraries to work.

##### Initialization:

```
var test = new Transition(_selector, [_context]);
```

* _selector above may refer to IDs, classNames or tagNames.

##### Calling the "transition()" Method:

```
test.transition(_properties, [_duration, _complete]);
```

* _properties = object containing user-defined style keys (required; accepts any valid, transitionable CSS properties)
* _duration = miliseconds (optional... if excluded, default duration is 500)
* _complete = callback executed after the animation completes (optional)

##### Example:

```
var test = new Transition("#testDiv");

test.transition({
	left: "500px",
	top: "200px",
	width: "150px",
	background: "#3399ff",
	transform: "rotate(30deg)",
	opacity: 0.2
}, 1.2, function(){
	// Completion function executed here
});
```

##### Easing

* To choose an easing value, simply include "easing" as a property in your object
* If omitted, the default value is "ease"

##### Example With Easing

```
test.transition({
	left: "500px",
	top: "200px",
	easing: "linear"
}, 0.9, complete);
```

##### Current Browser Support:

* IE10+
* Firefox 34+
* Chrome 31+
* Safari 7.1+
* Opera 26+

##### _Planned Expansions..._

* Working to include queue
* Will include built-in methods for specific transitions: fadeIn()/fadeOut(), rotate(), zoomIn()/zoomOut(), etc.