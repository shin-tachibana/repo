/*!
 * myCanvas.js v1.4 b10
 * (c) 2020 Shinigami
 * Released under the MIT License.
 */
!function (global, factory) {
"use strict"
	if (typeof define === 'function' && define.amd)
		define(['myjs'], factory);
	else if (typeof module === 'object' && module.exports)
		module.exports = factory(require('myjs'));
	else if (typeof my === 'function') factory(my)
	else throw 'myCanvas.js: myJS NOT install!'
}(this, function (my) {
//escape
//unescape
var root = typeof window !== 'undefined' && window === window.window ? window : typeof device === 'object' && device.window;
"use strict";
var canvasPriv = undefined,
	rqAnimate = 
	root.requestAnimationFrame || 		root.webkitRequestAnimationFrame ||
	root.mozRequestAnimationFrame || 
	root.msRequestAnimationFrame || 
	root.oRequestAnimationFrame || 
	function (e) {
		root.setTimeout(e, 100/6)
	},
	def = Object.defineProperty,
	slice = [].slice, fx = my.fx,
	isTouch = typeof isTouch === 'undefined' ? !!fx.move.match(/touch/i) : isTouch,
	angleMode = 'degrees',
	isNumeric = my.isNumeric;
/* if get isTouch from myJS error then check my.fx.move */

function addPx (e) {
	return isNumeric(e) ? e + 'px' : e
}

function getTouchInfo(canvas, w, h, e) {
	var i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
	var rect = canvas.getBoundingClientRect();
	var sx = canvas.scrollWidth / w || 1;
	var sy = canvas.scrollHeight / h || 1;
	var touches = e.touches || e.changedTouches;
	var _touches = [], i = 0, length = touches.length, touch;
	while (i < length) {
		touch = touches[i++]
		_touches.push({
			x: (touch.clientX - rect.left) / sx,
			y: (touch.clientY - rect.top) / sy,
			winX: touch.clientX,
			winY: touch.clientY,
			id: touch.identifier
		})
	}
	return _touches
}

my(root).on([fx.start, fx.move, fx.end].join(' '), function (e) {
	try {
		touches = getTouchInfo(canvasPriv, canvasPriv.width, canvasPriv.height, e)
		root.prevent && e.preventDefault()
		root.stoppp && e.stopPropagation()
	} catch (e) {}
	
	isTouch && (root.interact = !!touches.length)
	/* if not touch then const touches.length = 0 */
var rect, sx, sy
if ( canvasPriv !== undefined ) {
	rect = canvasPriv.getBoundingClientRect();
	sx = canvasPriv.scrollWidth / canvasPriv.width || 1;
	sy = canvasPriv.scrollHeight / canvasPriv.height || 1;
}
else {
	rect = {left: 0, top: 0}
	sx = sy = 1
}
	
    mouseX = ((e.changedTouches || [e])[0].clientX - rect.left) / sx
    mouseY = ((e.changedTouches || [e])[0].clientY - rect.top) / sy

}, { passive: false })
/* if not touch enabled key */
isTouch || my(root).on([fx.start, fx.move].join(' '), function () {
	root.interact = true
})
.on(fx.end, function () {
	root.interact = false
})

/* add method "add" for [object CanvasGradient] */
typeof CanvasGradient !== 'undefined' && (CanvasGradient.prototype.add = function () {
    return this.addColorStop.apply(this, arguments), this
})
/* add methods for Image */
my.extend(Image.prototype, {
    load: function (e) {
        return (isFunc(e) ? 
        	my(this).load(e) : 
        	this.load()), this
    },
    error: function (e) {
        return my(this).on('error', e), this
    }
})

function crCanvas (w, h, append) {
	if ( isCanvas(canvasPriv) )
		return canvasPriv
	
	canvas = my('<canvas>').attr({
		width: w === undefined ? ww : w,
		height: h === undefined ? wh : h
	})
	.data('type', 'my.context2d')[0]
	
	if ( !append )
		my(canvas).appendTo('body')
	return canvas
}
function noCanvas (w, h) {
	return crCanvas(w, h, true)
}
function isCanvas(e) {
	return typeof e === 'object' && e + '' === '[object HTMLCanvasElement]'
}

/*
function setcolor (arr) {
var r = arr[0], g = arr[1], b = arr[2], a = arr[3];
	return isStrg(r) || isObj(r) ? r : isNum(r) && isNum(g) && isNum(b) ? (isNum(a) && !!a) ? 'rgba(' + [r, g, b, a].join(',') + ')' : 'rgb(' + [r, g, b].join(',') + ')' : isNum(r) ? 'rgb(' + [r, r, r].join(',') + ')' : r
}*/

function setcolor (arr) {
	var r = arr[0], g = arr[1], b = arr[2], a = arr[3];
/* if r === str */
	return Number.isNaN(r - 0) ? r :
arr.length === 4 ? 'rgba(' + [r, g, b, a].join(', ') + ')' : 
arr.length === 3 ? 'rgb(' + [r, g, b].join(', ') + ')' : 
!Number.isNaN(r - 0) ? 'rgb(' + [r, r, r].join(', ') + ')' : r
}
function getradi (v) {
    return /degrees/i.test(angleMode) ? v * pi/180 : v
}
function isStrg (e) {
    return typeof e === 'string' && Number.isNaN(e - 0)
}

function fontToArray () {
    var _font = font().split(' ')
    if (_font.length === 2)
    	return {
    	    size: _font[0],
    	    family: _font[1],
    	    weight: 'normal'
    	}
    if (_font.length === 3)
    	return {
    	    size: _font[1],
    	    family: _font[2],
    	    weight: _font[0].trim()
    	}
}

function fontSize (size) {
    var _font = fontToArray()
    if (size === undefined)
    	return _font.size;
    size = my.trim(addPx(size))
    font(_font.weight + ' ' + size + ' ' + _font.family)
    return size
}
function fontFamily (name) {
    var _font = fontToArray()
    if (name === undefined)
    	return _font.family;
    name = my.trim(name)
    font(_font.weight + ' ' +  _font.size + ' ' + name)
	return name
}
function fontWeight (type) {
    var _font = fontToArray()
    if (type === undefined)
    	return _font.weight;
    type = my.trim(type)
    font(type + ' ' +  _font.size + ' ' + _font.family)
	return type
}

function getDeg(e) {
    return e * 180 / pi
}

function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0
    this.z = z || 0
}

function calculateRemainder2D(xComponent, yComponent) {
  if (xComponent !== 0) {
    this.x = this.x % xComponent;
  }

  if (yComponent !== 0) {
    this.y = this.y % yComponent;
  }

  return this;
};

function calculateRemainder3D(xComponent, yComponent, zComponent) {
  if (xComponent !== 0) {
    this.x = this.x % xComponent;
  }

  if (yComponent !== 0) {
    this.y = this.y % yComponent;
  }

  if (zComponent !== 0) {
    this.z = this.z % zComponent;
  }

  return this;
};


Vector.prototype = {
set: function(x, y, z) {
  if ( x instanceof Vector ) {
    this.x = x.x || 0;
    this.y = x.y || 0;
    this.z = x.z || 0;
    return this;
  }

  if ( x instanceof Array ) {
    this.x = x[0] || 0;
    this.y = x[1] || 0;
    this.z = x[2] || 0;
    return this;
  }

  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  return this;
},
copy: function() {
  return new Vector([this.x, this.y, this.z])
},
add: function(x, y, z) {
  if ( x instanceof Vector ) {
    this.x += x.x || 0;
    this.y += x.y || 0;
    this.z += x.z || 0;
    return this;
  }

  if ( x instanceof Array ) {
    this.x += x[0] || 0;
    this.y += x[1] || 0;
    this.z += x[2] || 0;
    return this;
  }

  this.x += x || 0;
  this.y += y || 0;
  this.z += z || 0;
  return this;
},
rem: function(x, y, z) {
  if ( x instanceof Vector ) {
    if (Number.isFinite(x.x) && Number.isFinite(x.y) && Number.isFinite(x.z)) {
      var xComponent = parseFloat(x.x);
      var yComponent = parseFloat(x.y);
      var zComponent = parseFloat(x.z);
      calculateRemainder3D.call(this, xComponent, yComponent, zComponent);
    }
  } else if ( x instanceof Array ) {
    if (x.every(function (element) {
      return Number.isFinite(element);
    })) {
      if (x.length === 2) {
        calculateRemainder2D.call(this, x[0], x[1]);
      }

      if (x.length === 3) {
        calculateRemainder3D.call(this, x[0], x[1], x[2]);
      }
    }
  } else if (arguments.length === 1) {
    if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
      this.x = this.x % arguments[0];
      this.y = this.y % arguments[0];
      this.z = this.z % arguments[0];
      return this;
    }
  } else if (arguments.length === 2) {
    var vectorComponents = [].slice.call(arguments);

    if (vectorComponents.every(function (element) {
      return Number.isFinite(element);
    })) {
      if (vectorComponents.length === 2) {
        calculateRemainder2D.call(this, vectorComponents[0], vectorComponents[1]);
      }
    }
  } else if (arguments.length === 3) {
    var _vectorComponents = [].slice.call(arguments);

    if (_vectorComponents.every(function (element) {
      return Number.isFinite(element);
    })) {
      if (_vectorComponents.length === 3) {
        calculateRemainder3D.call(this, _vectorComponents[0], _vectorComponents[1], _vectorComponents[2]);
      }
    }
  }
},
sub: function(x, y, z) {
  if ( x instanceof Vector ) {
    this.x -= x.x || 0;
    this.y -= x.y || 0;
    this.z -= x.z || 0;
    return this;
  }

  if ( x instanceof Array ) {
    this.x -= x[0] || 0;
    this.y -= x[1] || 0;
    this.z -= x[2] || 0;
    return this;
  }

  this.x -= x || 0;
  this.y -= y || 0;
  this.z -= z || 0;
  return this;
},
mult: function (n) {
  if (!(typeof n === 'number' && isFinite(n))) {
    console.warn('mult:', 'n is undefined or not a finite number');
    return this;
  }

  this.x *= n;
  this.y *= n;
  this.z *= n;
  return this;
},
div: function(n) {
  if (!(typeof n === 'number' && isFinite(n))) {
    console.warn('div:', 'n is undefined or not a finite number');
    return this;
  }

  if (n === 0) {
    console.warn('div:', 'divide by 0');
    return this;
  }

  this.x /= n;
  this.y /= n;
  this.z /= n;
  return this;
},
mag: function() {
  return Math.sqrt(this.magSq());
},
magSq: function() {
  var x = this.x;
  var y = this.y;
  var z = this.z;
  return x * x + y * y + z * z;
},
dot: function(x, y, z) {
  if ( x instanceof Vector ) {
    return this.dot(x.x, x.y, x.z);
  }

  return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
},
cross: function(v) {
  var x = this.y * v.z - this.z * v.y;
  var y = this.z * v.x - this.x * v.z;
  var z = this.x * v.y - this.y * v.x;

  return new Vector([x, y, z]);
},
normalize: function() {
  var len = this.mag();
  if (len !== 0) this.mult(1 / len);
  return this;
},
limit: function(max) {
  var mSq = this.magSq();

  if (mSq > max * max) {
    this.div(Math.sqrt(mSq)) //normalize it
    .mult(max);
  }

  return this;
},
setMag: function(n) {
  return this.normalize().mult(n);
},
heading: function() {
  return getDeg(Math.atan2(this.y, this.x))
},
rotate: function(a) {
  var newHeading = getradi(this.heading() + a)
  var mag = this.mag();
  this.x = Math.cos(newHeading) * mag;
  this.y = Math.sin(newHeading) * mag;
  return this;
},
angleBetween: function(v) {
  var dotmagmag = this.dot(v) / (this.mag() * v.mag());
  var angle;
  angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
  angle = angle * Math.sign(this.cross(v).z || 1);

  return getDeg(angle)
},
lerp: function(x, y, z, amt) {
  if ( x instanceof Vector ) {
    return this.lerp(x.x, x.y, x.z, y);
  }

  this.x += (x - this.x) * amt || 0;
  this.y += (y - this.y) * amt || 0;
  this.z += (z - this.z) * amt || 0;
  return this;
},
reflect: function(surfaceNormal) {
  surfaceNormal.normalize();
  return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
},
array: function() {
  return [this.x || 0, this.y || 0, this.z || 0];
},
equals: function(x, y, z) {
  var a, b, c;

  if ( x instanceof Vector ) {
    a = x.x || 0;
    b = x.y || 0;
    c = x.z || 0;
  } else if ( x instanceof Array ) {
    a = x[0] || 0;
    b = x[1] || 0;
    c = x[2] || 0;
  } else {
    a = x || 0;
    b = y || 0;
    c = z || 0;
  }

  return this.x === a && this.y === b && this.z === c;
},
toString: function() {
    return "Vector: [" + this.array().join(", ") + "]"
}
}

function createVector(x, y, z) {
    return new Vector(x, y, z)
}


var transformProp = my.prefixCSS("transform")
var vnode = my("<div>").offset({
	left: -9999,
	top: -9999
})


function createMatrix(css) {
    vnode.css(transformProp, css)
    .appendTo(document.documentElement)
    var transfrm = vnode.css(transformProp)

	if ( transfrm == "none" )
		transfrm = "1, 0, 0, 1, 0, 0"
	transfrm = transfrm.replace(/matrix3d|matrix|\(|\)| /g, "").split(",").map(e => +e)
	vnode.remove()
	
	transfrm._isMatrix = true
	
	return transfrm
}

var fn = {
fontSize: fontSize,
fontFamily: fontFamily,
fontWeight: fontWeight,
loadImg: function (s) {
    var a = new Image()
    a.src = s
	return a
},
random: function (_1, _2) {
    if (arguments.length === 1)
		return isLikeArr(_1) ? _1[
			floor(rand(_1.length))
		] : rand(_1)

    if (arguments.length === 2)
		return _1 + rand(_2 - _1)
},
createCanvas: crCanvas,
noCanvas: noCanvas,
pie: function(x, y, r, d1, d2, a) {move(x, y),arc(x, y, r, d1, d2, a),to(x, y)},
line: function(c,t,e,i){move(c,t),to(e,i)},
arc:function(c,t,e,i,n,o){context2d.arc(c,t,e,getradi(i)-pi/2,getradi(n)-pi/2,o)},
ellipse:function(c,t,e,i,n,o,r){context2d.ellipse(c,t,e,i,getradi(n)-pi/2,getradi(o),deflt(r,!1))},
rotate: function(deg) {context2d.rotate(getradi(deg))},
stroke: function() {var c = setcolor(arguments); c === undefined || (context2d.strokeStyle = c); context2d.stroke()},
fill: function() {var c = setcolor(arguments); c === undefined || (context2d.fillStyle = c); context2d.fill()},
circle: function (x, y, r) {return context2d.arc(x, y, r, 0, pi * 2)},
square: function (x, y, m) {return rect(x, y, m, m)},
lineWidth: function(m) {m === undefined || (context2d.lineWidth = m); return context2d.lineWidth},
miterLimit: function (e) {
    return e === undefined ? context2d.miterLimit : (lineJoin('miter'), context2d.miterLimit = e)
},
timeout: function (t) {return setTimeout(arguments.callee.caller, t)},
loop: function (fn) {
	rqAnimate(
		typeof fn === 'function' ? fn : 
			arguments.callee.caller
	)
},
clear: function(x, y, w, h) {context2d.clearRect(x || 0, y || 0, w || cw, h || ch)},
shadowOffset: function ($x, $y) {
	if (arguments.length === 0)
	    return {
	    	x: context2d.shadowOffsetX,
			y: context2d.shadowOffsetY
	    }

	if ( isNumeric($x) )
		context2d.shadowOffsetX = $x
	if ( isNumeric($y) )
		context2d.shadowOffsetX = $y
},
measureText: function(t) {return context2d.measureText(t).width},
background: function (c) {
	begin()
		fill(setcolor(arguments))
		fillRect(0, 0, cw, ch)
	close()
},
angleMode: function (c) {
	if (/degrees|radians/i.test(c))
		angleMode = c.toLowerCase();
},
range: function ($start, $end, $step) {
    $step = $step || 1
    var arr = [];

    if ($end === undefined) 
        $end = $start,
        $start = 1;

    if ($start !== $end && (abs($end - $start) < abs($step)))
    	throw new Error('range(): step exceeds the specified range.');

    if ($end > $start) {
        $step < 0 && ($step *= -1)
        while ($start <= $end) {
            arr.push($start)
            $start += $step
        }
    }
    else {
        $step > 0 && ($step *= -1)
        while ($start >= $end) {
            arr.push($start)
            $start += $step
        }
    }
    
    return arr;
},
toDataURL: function () {
	return canvasPriv.toDataURL
		.apply(canvasPriv, arguments)
},
triange: function(a, b, c, d, e, f){
	begin()
		move(a || 0, b || 0)
		to(c || 0, d || 0)
		to(e || 0, f || 0)
	close()
}
}

my.each({
	quadratic: 'quadraticCurveTo',
	bezier: 'bezierCurveTo',
	save: 'save',
	restore: 'restore',
	begin: 'beginPath',
	close: 'closePath',
	move: 'moveTo',
	to: 'lineTo',
	fillText: 'fillText',
	strokeText: 'strokeText',
	fillRect: 'fillRect',
	strokeRect: 'strokeRect',
	rect: 'rect',
	translate: 'translate',
	scale: 'scale',
	clip: 'clip',
	arcTo: 'arcTo',
	isPoint: 'isPointInPath',
	createImageData: 'createImageData',
	getImageData: 'getImageData',
	putImageData: 'putImageData',
	drawImage: 'drawImage',
	createPattern: 'createPattern',
	createRadial: 'createRadialGradient',
	createLinear: 'createLinearGradient'
}, function (key, value) {
	fn[key] = function () {
		return context2d[value].apply(
			context2d,
			arguments
		)
	}
})
my.each("transform setTransform".split(" "), function (key, value) {
    fn[value] = function () {
        if ( arguments[0]._isMatrix )
			arguments = arguments[0]
		 context2d[value]
		.apply(context2d, arguments)
    }
})
fn.resetTransform = function () {
    return context2d.setTransform(1, 0, 0, 1, 0, 0)
}

my.each({
	font: 'font',
	textAlign: 'textAlign',
	lineJoin: 'lineJoin',
	textBaseline: 'textBaseline',
	lineCap: 'lineCap',
	globalAlpha: 'globalAlpha',
	globalOperation: 'globalCompositeOperation',
	shadowBlur: 'shadowBlur',
	shadowColor: 'shadowColor'
}, function (key, val) {
	fn[key] = function () {
		return arguments.length !== 0 ? context2d[val] = arguments[0] : context2d[val]
	}
})
my.each({
	vsin: 'sin',
	vcos: 'cos',
	vtan: 'tan',
	vcot: 'tan2',
	vasin: 'asin',
	vacos: 'acos',
	vatan: 'atan',
	vacot: 'atan2'
}, function (key, val) {
	fn[key] = val[0] === 'a' ?
		function (e) {
		    return getradi(Math[val](e))
		} : val === 'tan2' ?
		/* vcot */
		function (e) {
		    return 1 / Math.tan(getradi(e))
		} :
		function (e) {
	    	return Math[val](getradi(e))
		}
})
my.each(fn, function (key, val) {
	def(root, key, {
       configurable: true,
       value: val
	})
})
my.each ({
	prevent: false,
	stoppp: false,
	touches: [],
	mouseX: 0,
	mouseY: 0,
	ww: device.ww,
	wh: device.wh,
	context2d: undefined,
	interact: false,
	RectCheck: function (e, f) {
		return (
			(e.y >= f.y && e.y <= f.y + f.height) ||
			(e.y + e.height >= f.y && (e.y + e.height) <= (f.y + f.height))
		) && (
			(e.x >= f.x && e.x <= f.x + f.width) ||
			(e.x + e.width >= f.x && (e.x + e.width) <= (f.x + f.width))
		)
	},
	CircleCheck: function (e, f) {
		return hypot (f.x - e.x, f.y - e.y) < e.radius + f.radius
	},
	PointRectCheck: function (e, x, y) {
		return e.x < x && e.x + e.width > x && e.y < y && e.y + e.height > y
	},
	PointCircleCheck: function (e, x, y) {
		return hypot (x - e.x, y - e.y) < e.radius
	},
	getOffset: function (e) {
		return e.touches || [e]
	},
	getTouchInfo: function (e) {
		return getTouchInfo(canvasPriv, cw, ch, e)
	},
	center: {
		get x() {return cw / 2},
		set x(e) {cw = e * 2},
		get y() {return ch / 2},
		set y(e) {ch = e * 2}
	},
	sys: {
		get rmax() {return Math.max(cw, ch) / 2},
		get rmin() {return Math.min(cw, ch) / 2},
		get offX() {return my(canvasPriv).offset().left},
		set offX(e) {my(canvasPriv).offset({left: e})},
		get offY() {return my(canvasPriv).offset().top},
		set offY(e) {return my(canvasPriv).offset({top: e})}
	},
	createVector: createVector,
	createMatrix: createMatrix
}, function (key, val) {
    root[key] = val
})
def(root, 'canvas', {
	get: function () {
		return canvasPriv
	},
	set: function (e) {
		if ( isCanvas(e) )
			canvasPriv = e,
			this.context2d = e.getContext('2d')
	}
})

my.each ({
    cw: 'width',
    ch: 'height'
}, function (key, val) {
    def(root, key, {
    	get: function () {
			return isCanvas(canvasPriv) ? canvasPriv[val] : 0
    	},
    	set: function (d) {
        	if (isCanvas(canvasPriv))
        		canvasPriv[val] = d;
    	}
	})
})

my.ready(function () {
	var fnZ0JS;
	
	isCanvas(canvasPriv) || (canvas = my('canvas[data-type="my.context2d"]')[0])

	typeof honkai === 'function' && (crCanvas(), fnZ0JS = honkai)
	typeof setup === 'function' && setup()
	isFunc(fnZ0JS) && fnZ0JS(my)
	typeof draw === 'function' && !function _draw () {
		draw()
		rqAnimate(_draw)
	}()
})
})