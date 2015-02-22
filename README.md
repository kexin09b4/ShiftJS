# ShiftJS

##### Stand-alone JavaScript library that triggers native CSS3 transition-based animations in modern browsers.

Documentation site and examples to come soon...

##### Browser Support:

* IE10+
* Firefox 34+
* Chrome 31+
* Safari 7.1+
* Opera 26+
* Mobile

##### Links to Necessary Build/Compiler Dependencies

* Node.js installation: https://github.com/joyent/node/wiki/installing-node.js-via-package-manager/
* Grunt.js install via npm: http://gruntjs.com/installing-grunt/
* grunt-contrib-concat: https://github.com/gruntjs/grunt-contrib-concat/
* grunt-contrib-uglify: https://github.com/gruntjs/grunt-contrib-uglify/

_In older browsers, some transform-based animations will not work if the browser does not natively support the feature. All other CSS changes will be applied normally albeit without a smooth CSS3 transition._

### Abbreviated Documentation

For full documentation/examples, navigate to the official site. (link will be provided above within the next few days/weeks)

##### Initialization

_Either method below will suffice..._

```
shift(_selector, [_context]);
var el = new Shift(_selector, [_context]);
```

##### animate()

_Transition several properties at once._

```
shift(_selector).animate({
	prop1: "value1",
	prop2: "value2",
	prop3: "value3"
}), _duration, _easing, _complete);
```

##### fadeOut()

_Fades-out a DOM element._

```
shift(_selector).fadeOut(_duration, _easing, _complete);
```

##### fadeIn()

_Fades-in a DOM element._

```
shift(_selector).fadeIn(_duration, _easing, _complete);
```

##### rotate()

_Defines a 2d rotation._

```
shift(_selector).rotate(_degrees, _easing, _complete);
```

##### rotateX()

_Defines a rotation along the X axis._

```
shift(_selector).rotateX(_degrees, _easing, _complete);
```

##### rotateY()

_Defines a rotation along the Y axis._

```
shift(_selector).rotateY(_degrees, _easing, _complete);
```

##### scale()

_Scales a DOM element. (proportional or non-proportional)_

```
shift(_selector).scale(_number, _duration, _easing, _complete); => proportional
shift(_selector).scale([_x, _y], _duration, _easing, _complete); => non-proportional
```

##### scaleX()

_Scales a DOM element's X value._

```
shift(_selector).scaleX(_number, _duration, _easing, _complete);
```

##### scaleY()

_Scales a DOM element's Y value._

```
shift(_selector).scaleY(_number, _duration, _easing, _complete);
```

##### set()

_Defines a transition: unlike animate(), this method transitions one property at a time._

```
shift(_selector).set(_property, _value, _duration, _easing, _complete);
```

##### skew()

_Skews a DOM element. (proportional or non-proportional)_

```
shift(_selector).skew(_number, _duration, _easing, _complete); => proportional
shift(_selector).skew([_x, _y], _duration, _easing, _complete); => non-proportional
```

##### skewX()

_Skews a DOM element's X value._

```
shift(_selector).skewX(_number, _duration, _easing, _complete);
```

##### skewY()

_Skew's a DOM element's Y value._

```
shift(_selector).skewY(_number, _duration, _easing, _complete);
```

##### translate()

_Defines a translation along the X and Y axis._

```
shift(_selector).translate(_number, _duration, _easing, _complete); => X === Y
shift(_selector).translate([_x, _y], _duration, _easing, _complete); => X !== Y
```

##### translateX()

_Defines a translation along the X axis._

```
shift(_selector).translateX(_number, _duration, _easing, _complete);
```

##### translateY()

_Defines a translation along the Y axis._

```
shift(_selector).translateY(_number, _duration, _easing, _complete);
```

##### delay()

_Applies a transition-delay to the current animation. If the number argument is omitted, the default delay value is "0.5"._

```
shift(_selector).fadeOut().delay(_number); => seconds, not milliseconds
```

##### origin()

_Alters the transform-origin of the current transform animation. The default transform-origin is "50%, 50%"._

```
shift(_selector).rotate(_number).origin(_number, _number); => each "_number" is the X and Y percentage value, respectively
```

##### Acceptable "_easing" Values

_Default easing value is "ease"..._

* "in"
* "out"
* "in-out"
* "linear"
* "snap"
* Custom - example below

```
shift(_selector).fadeOut(_duration, [0, 1, 0.5, 0]); => the easing array will be converted to a cubic-bezier curve
```

##### Notes on "_duration"

The duration parameter is always in _seconds_, not in milliseconds. If omitted, the default value is "0.5".

```
shift(_selector).fadeOut(); => defaults to 0.5-second transition
shift(_selector).fadeOut(2); => 2-second transition
```


##### Notes on "_complete"

The complete parameter comes in handy for more involved sequential animations. This parameter triggers a callback on "transitionend".

```
shift(_selector).set(_property, _value, _duration, _easing, function(){
	// do stuff here
});
```

##### Default Values and How to Alter Them

You may edit the default values of several transition/transform properties by accessing the "Shift.environment" object. Below are the existing defaults.

```
Shift.environment["duration"] = "0.5s";
Shift.environment["easing"] = "ease";
Shift.environment["delay"] = "0.5s";
Shift.environment["originX"] = "50%";
Shift.environment["originY"] = "50%";
```