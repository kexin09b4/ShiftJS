# Shift.js

CSS3 Transitions and Transforms achieved through JavaScript.

Full documentation and examples: http://shiftjs.drzwebdev.com/

```
npm install shiftjs
```

##### Browser Support:

* IE10+
* Firefox 34+
* Chrome 31+
* Safari 7.1+
* Opera 26+
* Mobile

_In older browsers, some transform-based animations will not work if the browser does not natively support the feature. All other CSS changes will be applied normally albeit without a smooth CSS3 transition._

### Abbreviated Documentation

For full documentation/examples, navigate to the official site. (link provided above)

##### Initialization

_Either method below will suffice..._

```
shift(selector [, context]);
var el = new Shift(selector, [context]);
```

##### animate()

_Transition several properties at once._

```
shift(selector).animate({
	prop1: 'value1',
	prop2: 'value2',
	prop3: 'value3'
}), duration, easing, complete);
```

##### fadeOut()

_Fades-out a DOM element._

```
shift(selector).fadeOut(duration, easing, complete);
```

##### fadeIn()

_Fades-in a DOM element._

```
shift(selector).fadeIn(duration, easing, complete);
```

##### rotate()

_Defines a 2d rotation._

```
shift(selector).rotate(degrees, duration, easing, complete);
```

##### rotateX()

_Defines a rotation along the X axis._

```
shift(selector).rotateX(degrees, duration, easing, complete);
```

##### rotateY()

_Defines a rotation along the Y axis._

```
shift(selector).rotateY(degrees, duration, easing, complete);
```

##### scale()

_Scales a DOM element. (proportional or non-proportional)_

```
shift(selector).scale(number, duration, easing, complete); => proportional
shift(selector).scale([x, y], duration, easing, complete); => non-proportional
```

##### scaleX()

_Scales a DOM element's X value._

```
shift(selector).scaleX(number, duration, easing, complete);
```

##### scaleY()

_Scales a DOM element's Y value._

```
shift(selector).scaleY(number, duration, easing, complete);
```

##### set()

_Defines a transition: unlike animate(), this method transitions one property at a time._

```
shift(selector).set(property, value, duration, easing, complete);
```

##### skew()

_Skews a DOM element. (proportional or non-proportional)_

```
shift(selector).skew(number, duration, easing, complete); => proportional
shift(selector).skew([x, y], duration, easing, complete); => non-proportional
```

##### skewX()

_Skews a DOM element's X value._

```
shift(selector).skewX(number, duration, easing, complete);
```

##### skewY()

_Skew's a DOM element's Y value._

```
shift(selector).skewY(number, duration, easing, complete);
```

##### translate()

_Defines a translation along the X and Y axis._

```
shift(selector).translate(number, duration, easing, complete); => X === Y
shift(selector).translate([x, y], duration, easing, complete); => X !== Y
```

##### translateX()

_Defines a translation along the X axis._

```
shift(selector).translateX(number, duration, easing, complete);
```

##### translateY()

_Defines a translation along the Y axis._

```
shift(selector).translateY(number, duration, easing, complete);
```

##### delay()

_Applies a transition-delay to the current animation. If the number argument is omitted, the default delay value is "0.5"._

```
shift(selector).fadeOut().delay(number); => in seconds
```

##### origin()

_Alters the transform-origin of the current transform animation. The default transform-origin is "50%, 50%"._

```
shift(selector).rotate(number).origin(number, number); => each number argument for origin() is the X and Y percentage value, respectively
```

##### Acceptable "easing" Values

_Default easing value is "ease"..._

* "in"
* "out"
* "in-out"
* "linear"
* "snap"
* Custom - example below

```
shift(selector).fadeOut(duration, [0, 1, 0.5, 0]); => the easing array will be converted to a cubic-bezier curve
```

##### Notes on "duration"

The duration parameter is always in _seconds_, not in milliseconds. If omitted, the default value is 0.5.

```
shift(_selector).fadeOut(); => defaults to 0.5-second transition
shift(_selector).fadeOut(2); => 2-second transition
```


##### Notes on "complete"

The complete parameter comes in handy for more involved sequential animations. This parameter triggers a callback on transitionend.

```
shift(selector).set(property, value, duration, easing, function() {
	// do stuff here
});
```