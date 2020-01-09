/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.7.2
 *
 * Copyright 2018 Chart.js Contributors
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Chart = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/* MIT license */
var colorNames = require(6);

module.exports = {
   getRgba: getRgba,
   getHsla: getHsla,
   getRgb: getRgb,
   getHsl: getHsl,
   getHwb: getHwb,
   getAlpha: getAlpha,

   hexString: hexString,
   rgbString: rgbString,
   rgbaString: rgbaString,
   percentString: percentString,
   percentaString: percentaString,
   hslString: hslString,
   hslaString: hslaString,
   hwbString: hwbString,
   keyword: keyword
}

function getRgba(string) {
   if (!string) {
      return;
   }
   var abbr =  /^#([a-fA-F0-9]{3})$/i,
       hex =  /^#([a-fA-F0-9]{6})$/i,
       rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
       per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
       keyword = /(\w+)/;

   var rgb = [0, 0, 0],
       a = 1,
       match = string.match(abbr);
   if (match) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i] + match[i], 16);
      }
   }
   else if (match = string.match(hex)) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
      }
   }
   else if (match = string.match(rgba)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i + 1]);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(per)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(keyword)) {
      if (match[1] == "transparent") {
         return [0, 0, 0, 0];
      }
      rgb = colorNames[match[1]];
      if (!rgb) {
         return;
      }
   }

   for (var i = 0; i < rgb.length; i++) {
      rgb[i] = scale(rgb[i], 0, 255);
   }
   if (!a && a != 0) {
      a = 1;
   }
   else {
      a = scale(a, 0, 1);
   }
   rgb[3] = a;
   return rgb;
}

function getHsla(string) {
   if (!string) {
      return;
   }
   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hsl);
   if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          s = scale(parseFloat(match[2]), 0, 100),
          l = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
   }
}

function getHwb(string) {
   if (!string) {
      return;
   }
   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hwb);
   if (match) {
    var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          w = scale(parseFloat(match[2]), 0, 100),
          b = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
   }
}

function getRgb(string) {
   var rgba = getRgba(string);
   return rgba && rgba.slice(0, 3);
}

function getHsl(string) {
  var hsla = getHsla(string);
  return hsla && hsla.slice(0, 3);
}

function getAlpha(string) {
   var vals = getRgba(string);
   if (vals) {
      return vals[3];
   }
   else if (vals = getHsla(string)) {
      return vals[3];
   }
   else if (vals = getHwb(string)) {
      return vals[3];
   }
}

// generators
function hexString(rgb) {
   return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1])
              + hexDouble(rgb[2]);
}

function rgbString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return rgbaString(rgba, alpha);
   }
   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
}

function rgbaString(rgba, alpha) {
   if (alpha === undefined) {
      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
   }
   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
           + ", " + alpha + ")";
}

function percentString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return percentaString(rgba, alpha);
   }
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);

   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
}

function percentaString(rgba, alpha) {
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);
   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
}

function hslString(hsla, alpha) {
   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
      return hslaString(hsla, alpha);
   }
   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
}

function hslaString(hsla, alpha) {
   if (alpha === undefined) {
      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
   }
   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
           + alpha + ")";
}

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
function hwbString(hwb, alpha) {
   if (alpha === undefined) {
      alpha = (hwb[3] !== undefined ? hwb[3] : 1);
   }
   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%"
           + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
}

function keyword(rgb) {
  return reverseNames[rgb.slice(0, 3)];
}

// helpers
function scale(num, min, max) {
   return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
  var str = num.toString(16).toUpperCase();
  return (str.length < 2) ? "0" + str : str;
}


//create a list of reverse color names
var reverseNames = {};
for (var name in colorNames) {
   reverseNames[colorNames[name]] = name;
}

},{"6":6}],3:[function(require,module,exports){
/* MIT license */
var convert = require(5);
var string = require(2);

var Color = function (obj) {
	if (obj instanceof Color) {
		return obj;
	}
	if (!(this instanceof Color)) {
		return new Color(obj);
	}

	this.valid = false;
	this.values = {
		rgb: [0, 0, 0],
		hsl: [0, 0, 0],
		hsv: [0, 0, 0],
		hwb: [0, 0, 0],
		cmyk: [0, 0, 0, 0],
		alpha: 1
	};

	// parse Color() argument
	var vals;
	if (typeof obj === 'string') {
		vals = string.getRgba(obj);
		if (vals) {
			this.setValues('rgb', vals);
		} else if (vals = string.getHsla(obj)) {
			this.setValues('hsl', vals);
		} else if (vals = string.getHwb(obj)) {
			this.setValues('hwb', vals);
		}
	} else if (typeof obj === 'object') {
		vals = obj;
		if (vals.r !== undefined || vals.red !== undefined) {
			this.setValues('rgb', vals);
		} else if (vals.l !== undefined || vals.lightness !== undefined) {
			this.setValues('hsl', vals);
		} else if (vals.v !== undefined || vals.value !== undefined) {
			this.setValues('hsv', vals);
		} else if (vals.w !== undefined || vals.whiteness !== undefined) {
			this.setValues('hwb', vals);
		} else if (vals.c !== undefined || vals.cyan !== undefined) {
			this.setValues('cmyk', vals);
		}
	}
};

Color.prototype = {
	isValid: function () {
		return this.valid;
	},
	rgb: function () {
		return this.setSpace('rgb', arguments);
	},
	hsl: function () {
		return this.setSpace('hsl', arguments);
	},
	hsv: function () {
		return this.setSpace('hsv', arguments);
	},
	hwb: function () {
		return this.setSpace('hwb', arguments);
	},
	cmyk: function () {
		return this.setSpace('cmyk', arguments);
	},

	rgbArray: function () {
		return this.values.rgb;
	},
	hslArray: function () {
		return this.values.hsl;
	},
	hsvArray: function () {
		return this.values.hsv;
	},
	hwbArray: function () {
		var values = this.values;
		if (values.alpha !== 1) {
			return values.hwb.concat([values.alpha]);
		}
		return values.hwb;
	},
	cmykArray: function () {
		return this.values.cmyk;
	},
	rgbaArray: function () {
		var values = this.values;
		return values.rgb.concat([values.alpha]);
	},
	hslaArray: function () {
		var values = this.values;
		return values.hsl.concat([values.alpha]);
	},
	alpha: function (val) {
		if (val === undefined) {
			return this.values.alpha;
		}
		this.setValues('alpha', val);
		return this;
	},

	red: function (val) {
		return this.setChannel('rgb', 0, val);
	},
	green: function (val) {
		return this.setChannel('rgb', 1, val);
	},
	blue: function (val) {
		return this.setChannel('rgb', 2, val);
	},
	hue: function (val) {
		if (val) {
			val %= 360;
			val = val < 0 ? 360 + val : val;
		}
		return this.setChannel('hsl', 0, val);
	},
	saturation: function (val) {
		return this.setChannel('hsl', 1, val);
	},
	lightness: function (val) {
		return this.setChannel('hsl', 2, val);
	},
	saturationv: function (val) {
		return this.setChannel('hsv', 1, val);
	},
	whiteness: function (val) {
		return this.setChannel('hwb', 1, val);
	},
	blackness: function (val) {
		return this.setChannel('hwb', 2, val);
	},
	value: function (val) {
		return this.setChannel('hsv', 2, val);
	},
	cyan: function (val) {
		return this.setChannel('cmyk', 0, val);
	},
	magenta: function (val) {
		return this.setChannel('cmyk', 1, val);
	},
	yellow: function (val) {
		return this.setChannel('cmyk', 2, val);
	},
	black: function (val) {
		return this.setChannel('cmyk', 3, val);
	},

	hexString: function () {
		return string.hexString(this.values.rgb);
	},
	rgbString: function () {
		return string.rgbString(this.values.rgb, this.values.alpha);
	},
	rgbaString: function () {
		return string.rgbaString(this.values.rgb, this.values.alpha);
	},
	percentString: function () {
		return string.percentString(this.values.rgb, this.values.alpha);
	},
	hslString: function () {
		return string.hslString(this.values.hsl, this.values.alpha);
	},
	hslaString: function () {
		return string.hslaString(this.values.hsl, this.values.alpha);
	},
	hwbString: function () {
		return string.hwbString(this.values.hwb, this.values.alpha);
	},
	keyword: function () {
		return string.keyword(this.values.rgb, this.values.alpha);
	},

	rgbNumber: function () {
		var rgb = this.values.rgb;
		return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.values.rgb;
		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}
		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();
		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}
		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	dark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.values.rgb;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	light: function () {
		return !this.dark();
	},

	negate: function () {
		var rgb = [];
		for (var i = 0; i < 3; i++) {
			rgb[i] = 255 - this.values.rgb[i];
		}
		this.setValues('rgb', rgb);
		return this;
	},

	lighten: function (ratio) {
		var hsl = this.values.hsl;
		hsl[2] += hsl[2] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	darken: function (ratio) {
		var hsl = this.values.hsl;
		hsl[2] -= hsl[2] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	saturate: function (ratio) {
		var hsl = this.values.hsl;
		hsl[1] += hsl[1] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	desaturate: function (ratio) {
		var hsl = this.values.hsl;
		hsl[1] -= hsl[1] * ratio;
		this.setValues('hsl', hsl);
		return this;
	},

	whiten: function (ratio) {
		var hwb = this.values.hwb;
		hwb[1] += hwb[1] * ratio;
		this.setValues('hwb', hwb);
		return this;
	},

	blacken: function (ratio) {
		var hwb = this.values.hwb;
		hwb[2] += hwb[2] * ratio;
		this.setValues('hwb', hwb);
		return this;
	},

	greyscale: function () {
		var rgb = this.values.rgb;
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		this.setValues('rgb', [val, val, val]);
		return this;
	},

	clearer: function (ratio) {
		var alpha = this.values.alpha;
		this.setValues('alpha', alpha - (alpha * ratio));
		return this;
	},

	opaquer: function (ratio) {
		var alpha = this.values.alpha;
		this.setValues('alpha', alpha + (alpha * ratio));
		return this;
	},

	rotate: function (degrees) {
		var hsl = this.values.hsl;
		var hue = (hsl[0] + degrees) % 360;
		hsl[0] = hue < 0 ? 360 + hue : hue;
		this.setValues('hsl', hsl);
		return this;
	},

	/**
	 * Ported from sass implementation in C
	 * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
	 */
	mix: function (mixinColor, weight) {
		var color1 = this;
		var color2 = mixinColor;
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return this
			.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue()
			)
			.alpha(color1.alpha() * p + color2.alpha() * (1 - p));
	},

	toJSON: function () {
		return this.rgb();
	},

	clone: function () {
		// NOTE(SB): using node-clone creates a dependency to Buffer when using browserify,
		// making the final build way to big to embed in Chart.js. So let's do it manually,
		// assuming that values to clone are 1 dimension arrays containing only numbers,
		// except 'alpha' which is a number.
		var result = new Color();
		var source = this.values;
		var target = result.values;
		var value, type;

		for (var prop in source) {
			if (source.hasOwnProperty(prop)) {
				value = source[prop];
				type = ({}).toString.call(value);
				if (type === '[object Array]') {
					target[prop] = value.slice(0);
				} else if (type === '[object Number]') {
					target[prop] = value;
				} else {
					console.error('unexpected color value:', value);
				}
			}
		}

		return result;
	}
};

Color.prototype.spaces = {
	rgb: ['red', 'green', 'blue'],
	hsl: ['hue', 'saturation', 'lightness'],
	hsv: ['hue', 'saturation', 'value'],
	hwb: ['hue', 'whiteness', 'blackness'],
	cmyk: ['cyan', 'magenta', 'yellow', 'black']
};

Color.prototype.maxes = {
	rgb: [255, 255, 255],
	hsl: [360, 100, 100],
	hsv: [360, 100, 100],
	hwb: [360, 100, 100],
	cmyk: [100, 100, 100, 100]
};

Color.prototype.getValues = function (space) {
	var values = this.values;
	var vals = {};

	for (var i = 0; i < space.length; i++) {
		vals[space.charAt(i)] = values[space][i];
	}

	if (values.alpha !== 1) {
		vals.a = values.alpha;
	}

	// {r: 255, g: 255, b: 255, a: 0.4}
	return vals;
};

Color.prototype.setValues = function (space, vals) {
	var values = this.values;
	var spaces = this.spaces;
	var maxes = this.maxes;
	var alpha = 1;
	var i;

	this.valid = true;

	if (space === 'alpha') {
		alpha = vals;
	} else if (vals.length) {
		// [10, 10, 10]
		values[space] = vals.slice(0, space.length);
		alpha = vals[space.length];
	} else if (vals[space.charAt(0)] !== undefined) {
		// {r: 10, g: 10, b: 10}
		for (i = 0; i < space.length; i++) {
			values[space][i] = vals[space.charAt(i)];
		}

		alpha = vals.a;
	} else if (vals[spaces[space][0]] !== undefined) {
		// {red: 10, green: 10, blue: 10}
		var chans = spaces[space];

		for (i = 0; i < space.length; i++) {
			values[space][i] = vals[chans[i]];
		}

		alpha = vals.alpha;
	}

	values.alpha = Math.max(0, Math.min(1, (alpha === undefined ? values.alpha : alpha)));

	if (space === 'alpha') {
		return false;
	}

	var capped;

	// cap values of the space prior converting all values
	for (i = 0; i < space.length; i++) {
		capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
		values[space][i] = Math.round(capped);
	}

	// convert to all the other color spaces
	for (var sname in spaces) {
		if (sname !== space) {
			values[sname] = convert[space][sname](values[space]);
		}
	}

	return true;
};

Color.prototype.setSpace = function (space, args) {
	var vals = args[0];

	if (vals === undefined) {
		// color.rgb()
		return this.getValues(space);
	}

	// color.rgb(10, 10, 10)
	if (typeof vals === 'number') {
		vals = Array.prototype.slice.call(args);
	}

	this.setValues(space, vals);
	return this;
};

Color.prototype.setChannel = function (space, index, val) {
	var svalues = this.values[space];
	if (val === undefined) {
		// color.red()
		return svalues[index];
	} else if (val === svalues[index]) {
		// color.red(color.red())
		return this;
	}

	// color.red(100)
	svalues[index] = val;
	this.setValues(space, svalues);

	return this;
};

if (typeof window !== 'undefined') {
	window.Color = Color;
}

module.exports = Color;

},{"2":2,"5":5}],4:[function(require,module,exports){
/* MIT license */

module.exports = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2hwb: rgb2hwb,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  rgb2lch: rgb2lch,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2hwb: hsl2hwb,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2hwb: hsv2hwb,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  hwb2rgb: hwb2rgb,
  hwb2hsl: hwb2hsl,
  hwb2hsv: hwb2hsv,
  hwb2cmyk: hwb2cmyk,
  hwb2keyword: hwb2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2hwb: cmyk2hwb,
  cmyk2keyword: cmyk2keyword,

  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2hwb: keyword2hwb,
  keyword2cmyk: keyword2cmyk,
  keyword2lab: keyword2lab,
  keyword2xyz: keyword2xyz,

  xyz2rgb: xyz2rgb,
  xyz2lab: xyz2lab,
  xyz2lch: xyz2lch,

  lab2xyz: lab2xyz,
  lab2rgb: lab2rgb,
  lab2lch: lab2lch,

  lch2lab: lch2lab,
  lch2xyz: lch2xyz,
  lch2rgb: lch2rgb
}


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2hwb(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function rgb2lch(args) {
  return lab2lch(rgb2lab(args));
}

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsl2hwb(args) {
  return rgb2hwb(hsl2rgb(args));
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2hwb(args) {
  return rgb2hwb(hsv2rgb(args))
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
function hwb2rgb(hwb) {
  var h = hwb[0] / 360,
      wh = hwb[1] / 100,
      bl = hwb[2] / 100,
      ratio = wh + bl,
      i, v, f, n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 0x01) != 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);  // linear interpolation

  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
}

function hwb2hsl(args) {
  return rgb2hsl(hwb2rgb(args));
}

function hwb2hsv(args) {
  return rgb2hsv(hwb2rgb(args));
}

function hwb2cmyk(args) {
  return rgb2cmyk(hwb2rgb(args));
}

function hwb2keyword(args) {
  return rgb2keyword(hwb2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2hwb(args) {
  return rgb2hwb(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}

function xyz2lab(xyz) {
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2],
      l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function xyz2lch(args) {
  return lab2lch(xyz2lab(args));
}

function lab2xyz(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

  return [x, y, z];
}

function lab2lch(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      hr, h, c;

  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
}

function lab2rgb(args) {
  return xyz2rgb(lab2xyz(args));
}

function lch2lab(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

function lch2xyz(args) {
  return lab2xyz(lch2lab(args));
}

function lch2rgb(args) {
  return lab2rgb(lch2lab(args));
}

function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2hwb(args) {
  return rgb2hwb(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

function keyword2lab(args) {
  return rgb2lab(keyword2rgb(args));
}

function keyword2xyz(args) {
  return rgb2xyz(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  rebeccapurple: [102, 51, 153],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}

},{}],5:[function(require,module,exports){
var conversions = require(4);

var convert = function() {
   return new Converter();
}

for (var func in conversions) {
  // export Raw versions
  convert[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  convert[from] = convert[from] || {};

  convert[from][to] = convert[func] = (function(func) { 
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}


/* Converter does lazy conversion and caching */
var Converter = function() {
   this.convs = {};
};

/* Either get the values for a space or
  set the values for a space, depending on args */
Converter.prototype.routeSpace = function(space, args) {
   var values = args[0];
   if (values === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof values == "number") {
      values = Array.prototype.slice.call(args);        
   }

   return this.setValues(space, values);
};
  
/* Set the values for a space, invalidating cache */
Converter.prototype.setValues = function(space, values) {
   this.space = space;
   this.convs = {};
   this.convs[space] = values;
   return this;
};

/* Get the values for a space. If there's already
  a conversion for the space, fetch it, otherwise
  compute it */
Converter.prototype.getValues = function(space) {
   var vals = this.convs[space];
   if (!vals) {
      var fspace = this.space,
          from = this.convs[fspace];
      vals = convert[fspace][space](from);

      this.convs[space] = vals;
   }
  return vals;
};

["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
   Converter.prototype[space] = function(vals) {
      return this.routeSpace(space, arguments);
   }
});

module.exports = convert;
},{"4":4}],6:[function(require,module,exports){
'use strict'

module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

},{}],7:[function(require,module,exports){
/**
 * @namespace Chart
 */
var Chart = require(29)();

Chart.helpers = require(45);

// @todo dispatch these helpers into appropriated helpers/helpers.* file and write unit tests!
require(27)(Chart);

Chart.defaults = require(25);
Chart.Element = require(26);
Chart.elements = require(40);
Chart.Interaction = require(28);
Chart.layouts = require(30);
Chart.platform = require(48);
Chart.plugins = require(31);
Chart.Ticks = require(34);

require(22)(Chart);
require(23)(Chart);
require(24)(Chart);
require(33)(Chart);
require(32)(Chart);
require(35)(Chart);

require(55)(Chart);
require(53)(Chart);
require(54)(Chart);
require(56)(Chart);
require(57)(Chart);
require(58)(Chart);

// Controllers must be loaded after elements
// See Chart.core.datasetController.dataElementType
require(15)(Chart);
require(16)(Chart);
require(17)(Chart);
require(18)(Chart);
require(19)(Chart);
require(20)(Chart);
require(21)(Chart);

require(8)(Chart);
require(9)(Chart);
require(10)(Chart);
require(11)(Chart);
require(12)(Chart);
require(13)(Chart);
require(14)(Chart);

// Loading built-it plugins
var plugins = require(49);
for (var k in plugins) {
	if (plugins.hasOwnProperty(k)) {
		Chart.plugins.register(plugins[k]);
	}
}

Chart.platform.initialize();

module.exports = Chart;
if (typeof window !== 'undefined') {
	window.Chart = Chart;
}

// DEPRECATIONS

/**
 * Provided for backward compatibility, not available anymore
 * @namespace Chart.Legend
 * @deprecated since version 2.1.5
 * @todo remove at version 3
 * @private
 */
Chart.Legend = plugins.legend._element;

/**
 * Provided for backward compatibility, not available anymore
 * @namespace Chart.Title
 * @deprecated since version 2.1.5
 * @todo remove at version 3
 * @private
 */
Chart.Title = plugins.title._element;

/**
 * Provided for backward compatibility, use Chart.plugins instead
 * @namespace Chart.pluginService
 * @deprecated since version 2.1.5
 * @todo remove at version 3
 * @private
 */
Chart.pluginService = Chart.plugins;

/**
 * Provided for backward compatibility, inheriting from Chart.PlugingBase has no
 * effect, instead simply create/register plugins via plain JavaScript objects.
 * @interface Chart.PluginBase
 * @deprecated since version 2.5.0
 * @todo remove at version 3
 * @private
 */
Chart.PluginBase = Chart.Element.extend({});

/**
 * Provided for backward compatibility, use Chart.helpers.canvas instead.
 * @namespace Chart.canvasHelpers
 * @deprecated since version 2.6.0
 * @todo remove at version 3
 * @private
 */
Chart.canvasHelpers = Chart.helpers.canvas;

/**
 * Provided for backward compatibility, use Chart.layouts instead.
 * @namespace Chart.layoutService
 * @deprecated since version 2.8.0
 * @todo remove at version 3
 * @private
 */
Chart.layoutService = Chart.layouts;

},{"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27,"28":28,"29":29,"30":30,"31":31,"32":32,"33":33,"34":34,"35":35,"40":40,"45":45,"48":48,"49":49,"53":53,"54":54,"55":55,"56":56,"57":57,"58":58,"8":8,"9":9}],8:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.Bar = function(context, config) {
		config.type = 'bar';

		return new Chart(context, config);
	};

};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.Bubble = function(context, config) {
		config.type = 'bubble';
		return new Chart(context, config);
	};

};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.Doughnut = function(context, config) {
		config.type = 'doughnut';

		return new Chart(context, config);
	};

};

},{}],11:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.Line = function(context, config) {
		config.type = 'line';

		return new Chart(context, config);
	};

};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.PolarArea = function(context, config) {
		config.type = 'polarArea';

		return new Chart(context, config);
	};

};

},{}],13:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {

	Chart.Radar = function(context, config) {
		config.type = 'radar';

		return new Chart(context, config);
	};

};

},{}],14:[function(require,module,exports){
'use strict';

module.exports = function(Chart) {
	Chart.Scatter = function(context, config) {
		config.type = 'scatter';
		return new Chart(context, config);
	};
};

},{}],15:[function(require,module,exports){
'use strict';

var defaults = require(25);
var elements = require(40);
var helpers = require(45);

defaults._set('bar', {
	hover: {
		mode: 'label'
	},

	scales: {
		xAxes: [{
			type: 'category',

			// Specific to Bar Controller
			categoryPercentage: 0.8,
			barPercentage: 0.9,

			// offset settings
			offset: true,

			// grid line settings
			gridLines: {
				offsetGridLines: true
			}
		}],

		yAxes: [{
			type: 'linear'
		}]
	}
});

defaults._set('horizontalBar', {
	hover: {
		mode: 'index',
		axis: 'y'
	},

	scales: {
		xAxes: [{
			type: 'linear',
			position: 'bottom'
		}],

		yAxes: [{
			position: 'left',
			type: 'category',

			// Specific to Horizontal Bar Controller
			categoryPercentage: 0.8,
			barPercentage: 0.9,

			// offset settings
			offset: true,

			// grid line settings
			gridLines: {
				offsetGridLines: true
			}
		}]
	},

	elements: {
		rectangle: {
			borderSkipped: 'left'
		}
	},

	tooltips: {
		callbacks: {
			title: function(item, data) {
				// Pick first xLabel for now
				var title = '';

				if (item.length > 0) {
					if (item[0].yLabel) {
						title = item[0].yLabel;
					} else if (data.labels.length > 0 && item[0].index < data.labels.length) {
						title = data.labels[item[0].index];
					}
				}

				return title;
			},

			label: function(item, data) {
				var datasetLabel = data.datasets[item.datasetIndex].label || '';
				return datasetLabel + ': ' + item.xLabel;
			}
		},
		mode: 'index',
		axis: 'y'
	}
});

/**
 * Computes the "optimal" sample size to maintain bars equally sized while preventing overlap.
 * @private
 */
function computeMinSampleSize(scale, pixels) {
	var min = scale.isHorizontal() ? scale.width : scale.height;
	var ticks = scale.getTicks();
	var prev, curr, i, ilen;

	for (i = 1, ilen = pixels.length; i < ilen; ++i) {
		min = Math.min(min, pixels[i] - pixels[i - 1]);
	}

	for (i = 0, ilen = ticks.length; i < ilen; ++i) {
		curr = scale.getPixelForTick(i);
		min = i > 0 ? Math.min(min, curr - prev) : min;
		prev = curr;
	}

	return min;
}

/**
 * Computes an "ideal" category based on the absolute bar thickness or, if undefined or null,
 * uses the smallest interval (see computeMinSampleSize) that prevents bar overlapping. This
 * mode currently always generates bars equally sized (until we introduce scriptable options?).
 * @private
 */
function computeFitCategoryTraits(index, ruler, options) {
	var thickness = options.barThickness;
	var count = ruler.stackCount;
	var curr = ruler.pixels[index];
	var size, ratio;

	if (helpers.isNullOrUndef(thickness)) {
		size = ruler.min * options.categoryPercentage;
		ratio = options.barPercentage;
	} else {
		// When bar thickness is enforced, category and bar percentages are ignored.
		// Note(SB): we could add support for relative bar thickness (e.g. barThickness: '50%')
		// and deprecate barPercentage since this value is ignored when thickness is absolute.
		size = thickness * count;
		ratio = 1;
	}

	return {
		chunk: size / count,
		ratio: ratio,
		start: curr - (size / 2)
	};
}

/**
 * Computes an "optimal" category that globally arranges bars side by side (no gap when
 * percentage options are 1), based on the previous and following categories. This mode
 * generates bars with different widths when data are not evenly spaced.
 * @private
 */
function computeFlexCategoryTraits(index, ruler, options) {
	var pixels = ruler.pixels;
	var curr = pixels[index];
	var prev = index > 0 ? pixels[index - 1] : null;
	var next = index < pixels.length - 1 ? pixels[index + 1] : null;
	var percent = options.categoryPercentage;
	var start, size;

	if (prev === null) {
		// first data: its size is double based on the next point or,
		// if it's also the last data, we use the scale end extremity.
		prev = curr - (next === null ? ruler.end - curr : next - curr);
	}

	if (next === null) {
		// last data: its size is also double based on the previous point.
		next = curr + curr - prev;
	}

	start = curr - ((curr - prev) / 2) * percent;
	size = ((next - prev) / 2) * percent;

	return {
		chunk: size / ruler.stackCount,
		ratio: options.barPercentage,
		start: start
	};
}

module.exports = function(Chart) {

	Chart.controllers.bar = Chart.DatasetController.extend({

		dataElementType: elements.Rectangle,

		initialize: function() {
			var me = this;
			var meta;

			Chart.DatasetController.prototype.initialize.apply(me, arguments);

			meta = me.getMeta();
			meta.stack = me.getDataset().stack;
			meta.bar = true;
		},

		update: function(reset) {
			var me = this;
			var rects = me.getMeta().data;
			var i, ilen;

			me._ruler = me.getRuler();

			for (i = 0, ilen = rects.length; i < ilen; ++i) {
				me.updateElement(rects[i], i, reset);
			}
		},

		updateElement: function(rectangle, index, reset) {
			var me = this;
			var chart = me.chart;
			var meta = me.getMeta();
			var dataset = me.getDataset();
			var custom = rectangle.custom || {};
			var rectangleOptions = chart.options.elements.rectangle;

			rectangle._xScale = me.getScaleForId(meta.xAxisID);
			rectangle._yScale = me.getScaleForId(meta.yAxisID);
			rectangle._datasetIndex = me.index;
			rectangle._index = index;

			rectangle._model = {
				datasetLabel: dataset.label,
				label: chart.data.labels[index],
				borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleOptions.borderSkipped,
				backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.valueAtIndexOrDefault(dataset.backgroundColor, index, rectangleOptions.backgroundColor),
				borderColor: custom.borderColor ? custom.borderColor : helpers.valueAtIndexOrDefault(dataset.borderColor, index, rectangleOptions.borderColor),
				borderWidth: custom.borderWidth ? custom.borderWidth : helpers.valueAtIndexOrDefault(dataset.borderWidth, index, rectangleOptions.borderWidth)
			};

			me.updateElementGeometry(rectangle, index, reset);

			rectangle.pivot();
		},

		/**
		 * @private
		 */
		updateElementGeometry: function(rectangle, index, reset) {
			var me = this;
			var model = rectangle._model;
			var vscale = me.getValueScale();
			var base = vscale.getBasePixel();
			var horizontal = vscale.isHorizontal();
			var ruler = me._ruler || me.getRuler();
			var vpixels = me.calculateBarValuePixels(me.index, index);
			var ipixels = me.calculateBarIndexPixels(me.index, index, ruler);

			model.horizontal = horizontal;
			model.base = reset ? base : vpixels.base;
			model.x = horizontal ? reset ? base : vpixels.head : ipixels.center;
			model.y = horizontal ? ipixels.center : reset ? base : vpixels.head;
			model.height = horizontal ? ipixels.size : undefined;
			model.width = horizontal ? undefined : ipixels.size;
		},

		/**
		 * @private
		 */
		getValueScaleId: function() {
			return this.getMeta().yAxisID;
		},

		/**
		 * @private
		 */
		getIndexScaleId: function() {
			return this.getMeta().xAxisID;
		},

		/**
		 * @private
		 */
		getValueScale: function() {
			return this.getScaleForId(this.getValueScaleId());
		},

		/**
		 * @private
		 */
		getIndexScale: function() {
			return this.getScaleForId(this.getIndexScaleId());
		},

		/**
		 * Returns the stacks based on groups and bar visibility.
		 * @param {Number} [last] - The dataset index
		 * @returns {Array} The stack list
		 * @private
		 */
		_getStacks: function(last) {
			var me = this;
			var chart = me.chart;
			var scale = me.getIndexScale();
			var stacked = scale.options.stacked;
			var ilen = last === undefined ? chart.data.datasets.length : last + 1;
			var stacks = [];
			var i, meta;

			for (i = 0; i < ilen; ++i) {
				meta = chart.getDatasetMeta(i);
				if (meta.bar && chart.isDatasetVisible(i) &&
					(stacked === false ||
					(stacked === true && stacks.indexOf(meta.stack) === -1) ||
					(stacked === undefined && (meta.stack === undefined || stacks.indexOf(meta.stack) === -1)))) {
					stacks.push(meta.stack);
				}
			}

			return stacks;
		},

		/**
		 * Returns the effective number of stacks based on groups and bar visibility.
		 * @private
		 */
		getStackCount: function() {
			return this._getStacks().length;
		},

		/**
		 * Returns the stack index for the given dataset based on groups and bar visibility.
		 * @param {Number} [datasetIndex] - The dataset index
		 * @param {String} [name] - The stack name to find
		 * @returns {Number} The stack index
		 * @private
		 */
		getStackIndex: function(datasetIndex, name) {
			var stacks = this._getStacks(datasetIndex);
			var index = (name !== undefined)
				? stacks.indexOf(name)
				: -1; // indexOf returns -1 if element is not present

			return (index === -1)
				? stacks.length - 1
				: index;
		},

		/**
		 * @private
		 */
		getRuler: function() {
			var me = this;
			var scale = me.getIndexScale();
			var stackCount = me.getStackCount();
			var datasetIndex = me.index;
			var isHorizontal = scale.isHorizontal();
			var start = isHorizontal ? scale.left : scale.top;
			var end = start + (isHorizontal ? scale.width : scale.height);
			var pixels = [];
			var i, ilen, min;

			for (i = 0, ilen = me.getMeta().data.length; i < ilen; ++i) {
				pixels.push(scale.getPixelForValue(null, i, datasetIndex));
			}

			min = helpers.isNullOrUndef(scale.options.barThickness)
				? computeMinSampleSize(scale, pixels)
				: -1;

			return {
				min: min,
				pixels: pixels,
				start: start,
				end: end,
				stackCount: stackCount,
				scale: scale
			};
		},

		/**
		 * Note: pixel values are not clamped to the scale area.
		 * @private
		 */
		calculateBarValuePixels: function(datasetIndex, index) {
			var me = this;
			var chart = me.chart;
			var meta = me.getMeta();
			var scale = me.getValueScale();
			var datasets = chart.data.datasets;
			var value = scale.getRightValue(datasets[datasetIndex].data[index]);
			var stacked = scale.options.stacked;
			var stack = meta.stack;
			var start = 0;
			var i, imeta, ivalue, base, head, size;

			if (stacked || (stacked === undefined && stack !== undefined)) {
				for (i = 0; i < datasetIndex; ++i) {
					imeta = chart.getDatasetMeta(i);

					if (imeta.bar &&
						imeta.stack === stack &&
						imeta.controller.getValueScaleId() === scale.id &&
						chart.isDatasetVisible(i)) {

						ivalue = scale.getRightValue(datasets[i].data[index]);
						if ((value < 0 && ivalue < 0) || (value >= 0 && ivalue > 0)) {
							start += ivalue;
						}
					}
				}
			}

			base = scale.getPixelForValue(start);
			head = scale.getPixelForValue(start + value);
			size = (head - base) / 2;

			return {
				size: size,
				base: base,
				head: head,
				center: head + size / 2
			};
		},

		/**
		 * @private
		 */
		calculateBarIndexPixels: function(datasetIndex, index, ruler) {
			var me = this;
			var options = ruler.scale.options;
			var range = options.barThickness === 'flex'
				? computeFlexCategoryTraits(index, ruler, options)
				: computeFitCategoryTraits(index, ruler, options);

			var stackIndex = me.getStackIndex(datasetIndex, me.getMeta().stack);
			var center = range.start + (range.chunk * stackIndex) + (range.chunk / 2);
			var size = Math.min(
				helpers.valueOrDefault(options.maxBarThickness, Infinity),
				range.chunk * range.ratio);

			return {
				base: center - size / 2,
				head: center + size / 2,
				center: center,
				size: size
			};
		},

		draw: function() {
			var me = this;
			var chart = me.chart;
			var scale = me.getValueScale();
			var rects = me.getMeta().data;
			var dataset = me.getDataset();
			var ilen = rects.length;
			var i = 0;

			helpers.canvas.clipArea(chart.ctx, chart.chartArea);

			for (; i < ilen; ++i) {
				if (!isNaN(scale.getRightValue(dataset.data[i]))) {
					rects[i].draw();
				}
			}

			helpers.canvas.unclipArea(chart.ctx);
		},

		setHoverStyle: function(rectangle) {
			var dataset = this.chart.data.datasets[rectangle._datasetIndex];
			var index = rectangle._index;
			var custom = rectangle.custom || {};
			var model = rectangle._model;

			model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.valueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
			model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.valueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
			model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.valueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
		},

		removeHoverStyle: function(rectangle) {
			var dataset = this.chart.data.datasets[rectangle._datasetIndex];
			var index = rectangle._index;
			var custom = rectangle.custom || {};
			var model = rectangle._model;
			var rectangleElementOptions = this.chart.options.elements.rectangle;

			model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.valueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
			model.borderColor = custom.borderColor ? custom.borderColor : helpers.valueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
			model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.valueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
		}
	});

	Chart.controllers.horizontalBar = Chart.controllers.bar.extend({
		/**
		 * @private
		 */
		getValueScaleId: function() {
			return this.getMeta().xAxisID;
		},

		/**
		 * @private
		 */
		getIndexScaleId: function() {
			return this.getMeta().yAxisID;
		}
	});
};

},{"25":25,"40":40,"45":45}],16:[function(require,module,exports){
'use strict';

var defaults = require(25);
var elements = require(40);
var helpers = require(45);

defaults._set('bubble', {
	hover: {
		mode: 'single'
	},

	scales: {
		xAxes: [{
			type: 'linear', // bubble should probably use a linear scale by default
			position: 'bottom',
			id: 'x-axis-0' // need an ID so datasets can reference the scale
		}],
		yAxes: [{
			type: 'linear',
			position: 'left',
			id: 'y-axis-0'
		}]
	},

	tooltips: {
		callbacks: {
			title: function() {
				// Title doesn't make sense for scatter since we format the data as a point
				return '';
			},
			label: function(item, data) {
				var datasetLabel = data.datasets[item.datasetIndex].label || '';
				var dataPoint = data.datasets[item.datasetIndex].data[item.index];
				return datasetLabel + ': (' + item.xLabel + ', ' + item.yLabel + ', ' + dataPoint.r + ')';
			}
		}
	}
});


module.exports = function(Chart) {

	Chart.controllers.bubble = Chart.DatasetController.extend({
		/**
		 * @protected
		 */
		dataElementType: elements.Point,

		/**
		 * @protected
		 */
		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
			var points = meta.data;

			// Update Points
			helpers.each(points, function(point, index) {
				me.updateElement(point, index, reset);
			});
		},

		/**
		 * @protected
		 */
		updateElement: function(point, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var custom = point.custom || {};
			var xScale = me.getScaleForId(meta.xAxisID);
			var yScale = me.getScaleForId(meta.yAxisID);
			var options = me._resolveElementOptions(point, index);
			var data = me.getDataset().data[index];
			var dsIndex = me.index;

			var x = reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === 'object' ? data : NaN, index, dsIndex);
			var y = reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex);

			point._xScale = xScale;
			point._yScale = yScale;
			point._options = options;
			point._datasetIndex = dsIndex;
			point._index = index;
			point._model = {
				backgroundColor: options.backgroundColor,
				borderColor: options.borderColor,
				borderWidth: options.borderWidth,
				hitRadius: options.hitRadius,
				pointStyle: options.pointStyle,
				radius: reset ? 0 : options.radius,
				skip: custom.skip || isNaN(x) || isNaN(y),
				x: x,
				y: y,
			};

			point.pivot();
		},

		/**
		 * @protected
		 */
		setHoverStyle: function(point) {
			var model = point._model;
			var options = point._options;

			model.backgroundColor = helpers.valueOrDefault(options.hoverBackgroundColor, helpers.getHoverColor(options.backgroundColor));
			model.borderColor = helpers.valueOrDefault(options.hoverBorderColor, helpers.getHoverColor(options.borderColor));
			model.borderWidth = helpers.valueOrDefault(options.hoverBorderWidth, options.borderWidth);
			model.radius = options.radius + options.hoverRadius;
		},

		/**
		 * @protected
		 */
		removeHoverStyle: function(point) {
			var model = point._model;
			var options = point._options;

			model.backgroundColor = options.backgroundColor;
			model.borderColor = options.borderColor;
			model.borderWidth = options.borderWidth;
			model.radius = options.radius;
		},

		/**
		 * @private
		 */
		_resolveElementOptions: function(point, index) {
			var me = this;
			var chart = me.chart;
			var datasets = chart.data.datasets;
			var dataset = datasets[me.index];
			var custom = point.custom || {};
			var options = chart.options.elements.point;
			var resolve = helpers.options.resolve;
			var data = dataset.data[index];
			var values = {};
			var i, ilen, key;

			// Scriptable options
			var context = {
				chart: chart,
				dataIndex: index,
				dataset: dataset,
				datasetIndex: me.index
			};

			var keys = [
				'backgroundColor',
				'borderColor',
				'borderWidth',
				'hoverBackgroundColor',
				'hoverBorderColor',
				'hoverBorderWidth',
				'hoverRadius',
				'hitRadius',
				'pointStyle'
			];

			for (i = 0, ilen = keys.length; i < ilen; ++i) {
				key = keys[i];
				values[key] = resolve([
					custom[key],
					dataset[key],
					options[key]
				], context, index);
			}

			// Custom radius resolution
			values.radius = resolve([
				custom.radius,
				data ? data.r : undefined,
				dataset.radius,
				options.radius
			], context, index);

			return values;
		}
	});
};

},{"25":25,"40":40,"45":45}],17:[function(require,module,exports){
'use strict';

var defaults = require(25);
var elements = require(40);
var helpers = require(45);

defaults._set('doughnut', {
	animation: {
		// Boolean - Whether we animate the rotation of the Doughnut
		animateRotate: true,
		// Boolean - Whether we animate scaling the Doughnut from the centre
		animateScale: false
	},
	hover: {
		mode: 'single'
	},
	legendCallback: function(chart) {
		var text = [];
		text.push('<ul class="' + chart.id + '-legend">');

		var data = chart.data;
		var datasets = data.datasets;
		var labels = data.labels;

		if (datasets.length) {
			for (var i = 0; i < datasets[0].data.length; ++i) {
				text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
				if (labels[i]) {
					text.push(labels[i]);
				}
				text.push('</li>');
			}
		}

		text.push('</ul>');
		return text.join('');
	},
	legend: {
		labels: {
			generateLabels: function(chart) {
				var data = chart.data;
				if (data.labels.length && data.datasets.length) {
					return data.labels.map(function(label, i) {
						var meta = chart.getDatasetMeta(0);
						var ds = data.datasets[0];
						var arc = meta.data[i];
						var custom = arc && arc.custom || {};
						var valueAtIndexOrDefault = helpers.valueAtIndexOrDefault;
						var arcOpts = chart.options.elements.arc;
						var fill = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
						var stroke = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
						var bw = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

						return {
							text: label,
							fillStyle: fill,
							strokeStyle: stroke,
							lineWidth: bw,
							hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

							// Extra data used for toggling the correct item					vadden: isNaN(ds.daitem	: isNaNden: isNakgrrderColor ? customcaN(ds. isNakgrden:art.getDatasedrCol;
		var ne": [127, 2wPra date": [127, 2wPra date"its(index[127, 2wlabel,
							fillStyle: fill,1s = re	var rderColor ? custfault(d= re	varuRspan>'							1sacked,
						aruRsp(d= re	/ 2,
			rColord					aruRsp(d= r: bw, re	/tdexOri, ar,the stacuRsp(p(d= r: bwl.borde) {
			v:rrect itar,the :r, o, re	/tdexOri, 
			vteAtIne :r, o,e :rrderWidrs.value		v:rrect eAtIntolor dth);r, o,e :rrderWie, o,e :rrderWiptoloh);r, o,e :rrderWie, o,e :rrderWiptoloh);r, o,e :rrder.length):Style: f)ds. is,e :rrdeen; ++i) {
der.lesOrDefis,e :rris,ehart;
	rDefaultth):Style:esOrDtverBorDtverBo: bw, re	/tdexOri, ar,the stacuRsp(p(d= r: bwl.bor5|| {};
ar chart : bwl,e :}ueAtIbwl,e  re	vexpore: s stacuRsp(p(d= ,e :}tefaulpore: s porements.p index =eAtIbwl,e  :}tetasetstetasetsrderWiptoloh);r, o,e :rrderWie, o,e :rrderWiptoloh5		var i.clipAre rWiptre: wapore: loh5		var i.clacuhel = tIbwth: equirtre:ar i.clalacu]nclipArea(chart.55, 0, 255'erRadiun reB.clalacuhe scaSWie, o,e :rrderRata[i.clalacuaults.D				yle: ore: ndColor :  {

	C/**
		 * @protele: ore: n_xScale = me.ge(ustom.borderWidr :  {

	C/**
		 * @protele, min;
 scaShcale.label,
				0].dr:  {idth: bw,
			
			}
sy t.joirmin;
 e:ar isHorizontal =e: s stacin;
 e:ar t isHorizo'l = tIbar tle = men>'	ed'gtIndce we * @pre:ar tIbar tlElementrt;
  :}t"eorem
		re: ind	0]re: ? custom.hovrasets[i](datasets
		re: ind	0]reulpore: s poremekey;

	tIbwtire: s poremekderWidth poremetDatas,uRsp(rect ite], i, rexpore( :}t"eorem
		rentrt;
 texct i< 
		rd	0]re:aypore: loh5		varIndce we		rd}t"eoreorDtverBeorDswl.borde) gtem	/tdexO	varIndcind	0]r @protele: ore:idtem	/xO	varIndcind	0]tderWi/ @prge.ge(, optiIndcind	0]r @protele: ore:iloh5	iidtem	/xO	var @prote :}tefaulpore: s pocked;
hess === 'flex:ire: hsy t.joirmin;
 	0]ncind	t present

rDefault(dD5	iid === -1)
		.borderWidault(dD5	iid === -1d ==,dad ===e :rrder	"lavenderblwPefaulp"lavenderblwPefaulp"l = {
				enderblw.borde) gtem	/tdexO	varIndcind1s: {
	Elemeiid === -1)
		.bre: ind {
	ElemuRart;
	prge.ge1s			vae) gtem	emuRarnd {
	Edataset.can redgtem	emuRarnd {
rWi/ {
	Edt	posiporem,defined)uRarnrnd {
rWi/atasetsata[inde:lex:ire:em,defi:s =  {
	Edt	posipor[indetlt
		fi:s =  fi:svar i =ooltips:nde:lex:irlt
		t'leftrIndcs =  fi:svar i e =  fi:svar i pt'lendcs =  fi:svar i e =  fi:svar i pt'lendcs =  fi:svar 5		var i:O	varInd)idault fi:svarreturn thisar 5		sllbaclt fi:svlt f {
				tLabel =r i:O	varI	sllbt funclbt funcrWi/ {
	Edt	posiporem,defined)uRarnrnd {
rWi/atase5'');
	}idth : h rWi/a fi:}bordei/a fi{
	Elex, ror);ined)uRarnrnd { fi:}tabel , ror);i, roteLabelm.yLabelordei/a fii:}tatbel +tatbel +var i pt'lendcs =  fi:svar i e =  fi:svar i pt'len5			retu
		 * @p  i ptror)wa, ror)len5			retu
		d)uhion(Cdei/derW* @natrorretu
		d	d)u]yAxisID;
		}
	}): [255, 69'l = cusns.bB
		d	d)uh,
			Si e =  fi:svar Roh5	i
		d	d)uyScaleDtem	varIn ror) =e: s stans.borptions.radius +arIn ror) 			return this.(this;
			var me stans.borptions.radius +areFitCat
			Shlor ?.borde) gtee :rrtans]tderWi/ @prgValue(sy  re	vritCat
e:tIndex, index, ruor);ined)tCat
e:tIntndex, ind'on(CdeitIntturn th;
	ped'grem
nt.pi.radiue:tInteitInttnd-colo
			ii:}t"e rot) grorm.yLee ue:e should probroundColockgroundC) grorm.yLee uel , ror);i, rotelabels.dei/diror);i, rotelint, indi, roted ==,d,uRarnex:ire:  base : x, ro(i:}t"e rot) grolo
			i;
a:ire< ) grLee ue:ay, ror)len5			reem
nt.pi grL}t"e roclbt funoclbs/atasetsatg predt	pos		reem
n.yLee uadius +arIn ror inpredos		reem
n.yLee tvar m/adiughis.(del = em
n.yLee uadius +arIn ror len5	i inpredos		ruadius +i:}tabel , ror);i, : -1;
he._index;
			:iror)hsy  re	vritCat
ee nn.yLelue(start);
		re: indD5	i i.getPixelFo loh5		vare: indD5	i i.getPixi.ge,dad.getfi:svar rosybrown": wPabel ,osybrown": wPabel ,osetIndexScrown": wtasetsatg predt	pos		reem
n.yL1sptionnd-coi i.getPixelFo lrorm.yLtionnd-cuR{
				iughis.1suire,satg pre-cuR{
yLtionn reset);ions.bdg pre-cuR{
yLtior m/aionn tColor, rot,tasets[ruR{
y
yLtior m/r dth); index, :			:irorot,tase:setCaionn tColor, rdex, troundse:setCase:s,e :rrdoptions.x, :			:irroundts.poieem
nsetCase:s,e :rreetCase:s,e :rrpts.pm
nsetCase:s,e :rreetCase:s,e :rrpts.pm
nsetCase:s,e :5			retu:s		reem
)are: iase:s,e .data[indexe :5		s
				 iase:s, iasrDtverB._model;etu:s		ree	s
		tfunct		tfunctr m/aionn tColor, rot,tasets[ruR{
y
yLtior m/r dth5pore: smeta = m r m/rase:}			vam/raseionndf(metmentets[ruR{
y
yLtiase:}tmodelmetmentemetmporemenderColor		vam/rasee:}tmtptiontmtption,e :rrpts.pm
nsetCase:s,e :rreetCase:s,e :rrpts.pm5Are rWimentOpti :rrpttmenwametmen.pm5Are rWimen[ruholor(vam/var t.Radttme rWimen[n[ru]peof data === 'o;
require('w,
			
s.leBmen[n[ru ilen;SrreetCase:s,e :Ren5	imen[n[ru				'bD pre	reemetmenruor);inedolean ut from the cenreemetmenr: function() {
(us;
		},

		/**inedolean ut from the cenre
			varlen;Shbble tasetsatg pfi:sredol tvar m/adiugi < ilsy {
	Elr		varle:unction(rectanglementets[r	varle:unctction(rec'lor(vamunctction()			ied'grot) = rem the e:unctamunctc)ds. istveree:}t"eetmpatgtmederCpfi e:_model = {
		rxis-0' /'x-axis-0atgtmederCpfi eelmetmentemetmpopore: lvam/vitmentemetmpoph;
			moemetmpoi.ge,d,uR{
y		:iror)n(datase(metm(e:}t"eetmpatgtmistvere	}i:iro< atgtCpfi e:aymetmen.pm5Are rot) = retgtC}t"eetmt		tfuncmt		s/r dth); igue(s tColore rot) erCpfi the cenreemetme		me(s lore rot) erCpfit
		/*/the g) {
(tion(Cot) erCpfi the cenreemetme	.pm5Ai		me(s lore  the cene:}tmodelmetmentemeions.mh dataPoint.r :itmenhsy {
	Elr		varlpfin erCptaset.hover) grorm.yLD5Ai		ex, helpers)len5			reorm.yLD5Ai		ex, hel	ex,,dadex, se:s,e :)(Chart);
rewPmodelm(Chart);
rewPmodelm(C		var start);
rew dth); igue(s tColore rot) erC1sorder)ds. i		ex, helpers)ltmederCrder)ds.uRDtverBe g) {
1sset ?; igue(ss.uRDtrCrder)l.bordereys.ledgue(ss.uRDtrCrde	/*/tder)lt
				metmp,

var deuRDtrtrCrde	/*/ftrIndcneed an :.r :itmemp,

va:elpetder)lt
				metd an tius',va:elpetva:e fi:sva
					opan :.r :itius',t[
			rot) elpetva:e fi:svelpetva:e fi:svpt[
	t) elpetva:e fi:svelpetva:e fi:svpt[
	t) elpetva:e fi:5Are rWi:ore rot))reorm.tva:e fions = chartfi:5Arsey]
	m.tva:e m.tvlbt fun
			], crWi:ore rorsey]t				dy]t				d	/*/tder)lt
				metmp,

var deuRDtrtrCrde	/*/ftrIn5, ror);**
		 *  	/*/ftva:}},

	*/ftvader)d dataptioar deuRDtrtrCrdtva:}t		], ataptioaatap, roteLuire(40),

	*/ftvaa:}t	tults t	tults  fi:svpt[
	t) elpetva:e fi:svelpetva:e fi:svpt[
	t5 @p  i .index]; :svptaptiwaatapti
	t5 @p  i .indeuh {
		
	*/
		/y'
	}tapt  i .indndeu]values = {};
			elpers.can'/ @prgVs.baB.indndeuolor, Ssvelpetva:e fi:Rpm5Ai.indndeu arc.cDue(se rottaptilementets[tomcaNfill,1s = re	va rottaptilze,
				base: b(+i) {
				text.ets[tomcaNfill,1s = re	va rontrollor, Shnt._m dth); iguese:srs[toit
		/*/the g {
			sy ionndrtrolloe:item.datasetIndexptioar derolloe:itetem.datase'{
		
	*itet			baseerBeed'gtmpa? cuss = ree:itet	*itet	)idaultt fuaa:}t"etap, igaptuireeseee:Color',
				'rborderCoons.borde igaptuireeseee, ataptioaatap, , ror)l
	*/
iaptioaatap, ,0; i < daatap, 	ex,,d,uRDtrr :itmentValue(ddatap(a:}t"etap, igapltt fua sm:itm<  igaeeseee:ayatapti
	t5 @p  mpa? cusigae}t"etapdy]t				pdy]s/ftrIndcnegasetlt
			@p  mpa?ireesee= re	va rottapt < setl		@p  mpa?ireeset	text/= rege: b(Color(mpa?ireesee= re	va rottapt 
	t5 i < setl		@p e= re	vaa:}t		], ataptioaatolor);hs.valueOrDefa:iaptihsy ionndrtrolloesen?iree		title: fuatgtmederCD5 i </ Title doen.pm5Are rmederCD5 i </ Title</ T,dad/ Tiva:e fi:5":15,"16":1wP		], a":15,"16":1wP		], a":
			var o,"16":1wtrIndcnegasetlt
			@p  mpa?ire1svalue)idaui </ Title doen.aptuirealue)idauRbt funrege: b1scontecnegasetdauRbtrealue)tasets;
(ds.badgasetdauRbtrealuext/=lue)tt.backatap,,e.getPixuRbtrtrealuext/oieem
nr,
				b:efa:iaptp,,e.ge: the=lue)tt.backata				btustomge: the=ge: ase:s,ealueAtIn		b:efa:iaustomtm.bor mpa? the=ge: ase:s,ethe=ge: ase:s,ptm.bpa? the=ge: ase:s,ethe=ge: ase:s,ptm.bpa? the=ge: ase:5 @p  i :	@p  mpa) rmede=ge: ase{
		labels:se:5 @sfaultde=ge: ade=g		tfunc
							 i :	@p  m@sfaut arcOaut arcOext/=lue)tt.backatap,,e.getPixuRbtrtrealuext/oieem5metmentt.push(' ext/o=ge:}				tt/o=gelue)ilpers
			etPixuRbtrtreal=ge:}t					ers
			eers
metmporoggling 			tt/o=gee:}t	tdden,t	tdden,ase:s,ptm.bpa? the=ge: ase:s,ethe=ge: ase:s,ptm.bp5pti :rrext.push :s,pts
		waers
		.bp5pti :rrextixuholor 	tt/	tex
 */
ts
	 :rrextitixu]s.length) {
				function(C'/adiugi = tBextitixu= men>Ss,ethe=ge: ase:R	t5 iextitixu ndColDasetp  mprs
		exptioar dborderdcind1s: {
	Ele  mprs
		eWidth ? custom.(:rrderWiptoloh)ar dborderdcind1s: {
	Ele  or));
	men>ShderCotrIndcnegasva:er dboet	text/= regaset()sy der)dr));
	me:ult(options.hover
			etPix);
	me:ulttt(options'lor 	ttultt ? custfunred'gap, rect s: {
	e:ulttttultt )are: itfunee:}t"ers
mnegs
	ogglsva	e:hart.options.re'
			];Style'
		negs
	ogglsva	e		ers
			eers
memetmen.	tt/	is
			eers
memrWiptoloeers
me</ T,d,uRbtrfa:iaptioverBackpers
(e:}t"ers
mnegs
 itfune);*:iap< negslsva	e:ayers
		.bp5pti :p, rect egsl}t"ers
Oaut arc
Oaus/oieem
nr,g	tittt.bacti :p, rgglsva	 {
	Ele  mprs
	toltittacti :p, rgglsvattoloh/ {
	gtom.(: {
		p, rgglsva	 {
	Ele  mprs
	t.bp5pitoltittacti 	 {
	Elee:}t					ers
			eer		// Uhpers = requir:is
		hsy der)dr));
	msvanrgglsustom.skip  igaptuireD5pitosNaN(y),
		i
	t5 @p  ptuireD5pitosNaN(y)osNa,dadsNaNge: ase:uire(40);
vawP					eire(40);
vawP					eirs.chart.d40);
vawieem
nr,g	tittt.bacti :p, rggl1sotele)are:itosNaN(y),
		i
s
	oggltele)areuR	tfunc
	gtom.1svar mnr,g	titreuR	tgltele):r, o,e 'l = tdg	titreuR	tgltelloh/ ele):t}
sy ers
m,ataIndexuR	tgtgltelloh/		rot) 			for (:uir:is
	
m,ataI:		va ele):t}
sy ersfor (t	
			aI:		va aI:	tva:e f[i](datar (:uir:is	
			trem
	:p, r		va aI:	tva:e e	va aI:	tva:e ptrem, r		va aI:	tva:e e	va aI:	tva:e ptrem, r		va aI:	tva:5pti :rr:cti :p, )  ptui aI:	tva(d= ,e :}teva:5ptsre: iui aI:	tui ay]t				rDtverBe:rr:cti :ptsre:t:aypoe:t:aypoloh/ ele):t}
sy ers
m,ataIndexuR	tgtgltelloh/		rot5ataptioh);r, o, loh/	 aI:}Wiptoh/	 aIele)atend(derWIndexuR	tgtglte aI:}ttverBnd(derWInd(datap, rd;
hess iptoh/	 aII:}tttm	/xOtttm	/xOtva:e ptrem, r		va aI:	tva:e e	va aI:	tva:e ptrem,5x]; :sv
ar char :e pt(derwand(derem,5x]; :sv
arexuh== -1toh/tolo_indet(de :sv
arerexu]h5		var i.clipArmode: 'ind'/the g n(CdB
arerexun th;
Se e	va aI:	tva:Rbp5pi
arerexu) =e: D	titi :p,d(derer
			etPiloh5		
n.yL1sptionnd- :p,d(dere;
			},
			labe(:svar i pt'lendetPiloh5		
n.yL1sptionnd- :her we th;
Sh= chaieem
nr,g	tge: rPiloattoloh/ {
	gr optisy lue)irr we te:function(require,derWIndex we te:funtnction(re'= -1tohfunt},
			lunc
ed'gs
mnex:irsptione:funtohfunt})reorm.t			II:}t"ed(dar,g(ded;
htgene:;
 scaShcale.roundColockgroundCr,g(ded;
htgenerBnd(derWInd(datatapti
toh/ti(derWInd(data i pt'leInd(datosNa,d,uR	tgir:is
				id: 'xend(d(I:}t"ed(dar,g(dm.t			Intt:is
< r,g(htgene:aynd(derem,5x]; :
mnex:ir,g(h}t"ed(doe:t:aypdoe:s/		rot) 		gstom:t}
sy]; :
mne;
htgentionnd- :p,d(det'ltom:sy]; :
mne;
htgett'len/tionglabe(Color 
mne;
htgentionnd- :p,d(detem,5xit'ltom:sy]; ntionnd-I:}ttverBnd(derWInd._modehct item					v:i(derhsy lue)irr we ttgene;
htontext, indnegs
	ogglD5xit' Custom rad	.bp5pti :
	ogglD5xit' Custom' Cu,dad CusaI:	tva:ength; i < iwPtverBnngth; i < iwPtverBnngreturn da; i < iw	rot) 		gstom:t}
sy]; :
mne;
h1ss +ar)reorit' Custom rad	.(ded;
h +ar)reouR]t				onglabe1squirt 		gstomeouR]t
h +ar):s =  fi'on(CddgstomeouR]t
h +alen/t+ar):te(sy nd(da,
						vuR]t
t
h +alen/or mpa?: valueA:		v:i(deda,
			::rrdt+ar):te(sy nd(alueAtgValu		::rrdt		::=ge: asolockgroueA:		v:i(gValutrot) :
mne:rrdt		::=ge: aerrdt		::=ge: aptrotmne:rrdt		::=ge: aerrdt		::=ge: aptrotmne:rrdt		::=ge:5x]; :sv:y]; :
mn) :
	ogt		::=gend { fi:}tage:5x]srorm.ogt		::=ogt	aut arclbt funo:sv:y]; :
]srort:ay, ort:ay, len/t+ar):te(sy nd(da,
						vuR]t
t
h +alen/or mp5ers
			ndcs =   len/ot		:}i pt'n/ot		+ar)r._resar i				vuR]t
t
h +t		:}tt funresar i	resaers
met1;
he._i pt'n/ot			:}tttredostttredos=ge: aptrotmne:rrdt		::=ge: aerrdt		::=ge: aptrotm5ush :s,}idth :  : aptsar waresar otm5ush :s,}id	vuhetPixt'n/t'le
		},tsar :s,}id	d	vu]n5			retu
		 * @enly space'/= regaor(vB}id	d	vuon()		S aerrdt		::=ge:Rm,5xi}id	d	vunruor)Dstom; :
mesar e,derWIndelen5		) erC1sorder)ds :
mesar e		setHoverStyle(:s,e :rrpts.pm
Indelen5		) erC1sorder)ds :sNakgrd()		Shmin;
	rot) 		gstaI:	rdeleett'len/tionggend: sy ele)arakgrd(e:: bw,
							hiddar i				vkgrd(e:: btbw,
					'tPixt'n: btHoverSt			oed'g(dar		:irsordere:: bt'n: btH) rmedet ar		:}t"eesae		gsar1;
htaIre:at
			Shlor ?ral =e: szontal =e		gsar1;
htaIreunresar i	resaerers
		.t'n/tisar i	resaere:rrpts.p	resaer' Cu,d,uR]t
	v:i(der: option_resa(	:}t"eesae		gsadet ar	ioh:i(d< 		gshtaIre:ayresar otm5ush :dar		:ir	gsh}t"eesa ort:ay,a ors/or mpa?: gntex:te(sysh :dar	;
htaIrrder)ds :
mesarts.tex:sysh :dar	;
htaItts.pm/rdergtyle(=== -1dar	;
htaIrrder)ds :
mesartotm5uits.tex:sysh rrder)ds	:}tt funresar i	re	text.h:ire: hsy t.j:isar hsy ele)arakgrd(taIn	;
htderColor, ir,g(ded;
hD5uitsColor);
			rem,5x]; :ded;
hD5uitsColor);sCol,dadColo		::=ge:e scale end wPt funr scale end wPt funr s.getHoverle end wr mpa?: gntex:te(sysh :dar	;
h1scenre) rmeitsColor);
			resar1;
henre) rmuRut arcergtyle1s @nat?: gntexrmuRut
henre):setCase'lor(vdgntexrmuRut
henr.pm/rnre):tilsy resae,t.55, 0,uRut
t
henr.pm/
	:p, rtacin;
 :t.j:isarae,t.55::svarnre):tilsy resin;
 tgi < 55::svar55:: aI:	tv' /'x-ax;
 :t.j:isgi < ttmpat:dar	:svar55:: aI:	tesvar55:: aI:	tpttmpar	:svar55:: aI:	tesvar55:: aI:	tpttmpar	:svar55:: aI:5ush :s,:ysh :dar) :ded;r55:: aIyLtiase:}tmaI:5usstmeded;r55:: d;r5e:t:ayp		tfuncm:s,:ysh :dsstmet:aymemet:ayme.pm/rnre):tilsy resae,t.55, 0,uRut
t
henr.pm/
	:p,5nd(derWm
nsetCa .pm/
r55:}rrptsm/
r55nre)  datae :r5, 0,uRut
t
henr55:}ttfuncatae :r5ataend(datas.mh datrptsm/
r555:}ttt(s lottt(s lo aI:	tpttmpar	:svar55:: aI:	tesvar55:: aI:	tpttmpa5har :e smeta =  :	tptae :waatae :mpa5har :e sme0,uh, heltsm/ts.pHoriztae  :e sme0e0,u]m5Are rWimentOpt me.index;'/ {
	gr
		
Bsme0e0,ubaseerS	tesvar55:: aI:Rtm5uisme0e0,uilemenDntexh :datae :ddar i				.pm5Ara?ire1svalue)id :datae :da.r : undefined(:e fi:svpt[
	t)				.pm5Ara?ire1svalue)id :t(dD5	iseerShitCatr mpa?: gnt		::r		.pItts.pm/rderguRsp(psy +ar)rrdD5	ise:rWi/ @prge.ge(, oe :r5, 0,D5	ise:rWiti/ @prge.' heltsmrWit undefiarceed'gsae	r :itsvaluee:rWitsmrWit )  ptuit:ay55:}t"etaen: gae s.mht		ee:arlen;Shbble r, ruor);ndex, ruo: gae s.mht		eencatae :r5ataendnd(deretsm/tiae :r5ataendn:svpt[
	5ataendsCol,d,uRut
.j:isar 'pointStdatae(5:}t"etaen: gaeuit:ay5		n:isa< : gaht		ee:ayatae :mpa5har :ae	r :it gah}t"etaeemet:aymeemes/
	:p, rtagerCo:tilsyar :ae	r.mht		ealue)id :datae t[
rCo:syar :ae	r.mht		tt[
	t/aluegined(getPixae	r.mht		ealue)id :datae tmpa5hit[
rCo:syar ealue)id5:}ttfuncatae :r5ate	/tdeh:iror)hsy  re:iae :hsy +ar)rrdD5	ist		nr.mhtulpore: s p		gsar1;
hD5hit[tire: s por otm5ush :ar1;
hD5hit[tire: s[tir,dadtire55:: aI:rColor : helwPtfuncaColor : helwPtfuncaCorict';

vr : helw	:p, rtagerCo:tilsyar :ae	r.mh1s	va r)  ptit[tire: s por oae s.mhva r)  puR:t:aypuegined1s.RadtrtagerCo puR:tmhva r):elpetva'{
		
dgerCo puR:tmhva 
	t/aa r):t		sy ataen,}): [255uR:tmtmhva 
	t/) :
mneed)tCat
: re:iae en,}): ::s,eaa r):t		sy atatCat
tg {
	: ::s,ea: ::t		::=grCoons.bat
: re:iag {
	tap, i:ae	r:s,ea: ::t		::=es,ea: ::t		::=ptap,e	r:s,ea: ::t		::=es,ea: ::t		::=ptap,e	r:s,ea: ::t		:5har :e :yar :ae	) :ar1;a: ::t		rCrdtva:}t			:5hasaptui1;a: ::t1;a:ort:ay,y]t				p:e :yar :aasaptt:ayatptt:ayat
	t/aa r):t		sy ataen,}): [255uR:tmtmhva 
	t/) :
m5resar it) elpet 
	t/)a: :}svpt[t/)a: a r) 		}
	fi:s [255uR:tmtmhvaa: :}tt				}
	fi:s }
	fresaersr);hs.vavpt[t/)a:  :}tttetl		tttetl		t		::=ptap,e	r:s,ea: ::t		::=es,ea: ::t		::=ptap,e5 :  : a;**
		 * ::=pt	fi:wa}
	fi:p,e5 :  : a;**55uhTitlet[t/t[
	x, int	fi : a;**5*55u]t5 @p  i .index]this.getVa'/tionggor 	B;**5*55ucustfuS:=es,ea: ::t		:Rpa5hi;**5*55u	exptiDerCor :ae
	fi: oe :r5, 0
	t5 @ rggl1sotele)ar :ae
	fi: s.borderWidth, (: ase:s,ptm.bpa5, 0
	t5 @ rggl1sotele)ar :indD5	istfuSh		var	:p, rtager55::r 0
		tt[
	t/alueguRarnrsy nre) rdD5	ise:r m/adiughis.(delfi:s [255D5	ise:r mtm/adiughi'itlet[tr mtderWidtaypued'gaen:fa:iasotelee:r mt[tr mtd) :
	ogt:ay  :}t"e
	frtag	fir);hr55ee:llor, Shnt._mrnglementectanglemtag	fir);hr55ee		}
	fi:s }
	freresar ot[t/ti	fi:s }
	frer:s,ptm.b }
	fre[tir,d,uR:tmre:iae :tom.back	}
	f( :}t"e
	frtag	fogt:ay rWm:iae< tag	hr55ee:ay}
	fi:p,e5 :  :en:fa:iaag	h}t"e
	ftptt:ayaftpts/) :
mneedglpor:t		sy:  :en:f);hr55etele)ar :ae
	fitm.por:sy:  :en:f);hr55ttm.bp/telegth, (x, helen:f);hr55etele)ar :ae
	fitp,e5 itm.por:sy:  etele)ar :}tt				}
	fi:s }
	Edt	ph:itmenhsy {
	:i	fi:hsy nre) rdD5	isr55nf);hrl , ror);i,: gae s.mhD5 itmdiror);i, r:mpa5har :e s.mhD5 itmdiror);mdir,daddiro: ::t		:options.stacwPt				}ptions.stacwPt				}pt meta.datns.stacw :
mneedglpor:t		sy:  :en:f);h1sEle  ) :
	itmdiror);i, r:m	fir);hle  ) :
uRrt:ay,legth, 1s'
	}teedglpor:
uRrt;hle  ): the=ge'lor 	dglpor:
uRrt;hle .bp/te  ):t()sy }
	fr,'o;
requuRrt;t;hle .bp/at:dar	s[r	varl:{
	:i	fifr,'o;
::e fte  ):t()sy }
		varltgaset;
::e ft;
::r55:: a	];Stylearl:{
	:i	gasetts
mne:en:f:e ft;
::r55:: ee ft;
::r55:: pts
mn:f:e ft;
::r55:: ee ft;
::r55:: pts
mn:f:e ft;
::r55:5 :  : a:y:  :en:) :e s.t;
::r55real=ge:}t	55:5 :ss
	ogs.t;
::rs.t;met:aymaut arc
: a:y:  :e:ss
	t:ayer
	t:ayer.bp/te  ):t()sy }
	fr,'o;
requuRrt;t;hle .bp/at:da5atae :rpa? the= .bp/at;
:}s,ptmp/at;
e  ) l.borse:s
requuRrt;t;hlet;
:}tt arcborse:s
borsataend(/ Uhpers,ptmp/at;

:}tttittactttittacr55:: pts
mn:f:e ft;
::r55:: ee ft;
::r55:: pts
mn5 =  :	ttt.push( :: ptrse:waborse:
mn5 =  :	ttt.quuhaN(y)tmp/tm.bon(retrse :	ttt.q.quu]p5pti :rrext.pusex = me.in'/rdergu -1tBtt.q.quu			lunS: ee ft;
::r55:R,e5 itt.q.quurer
		Dlpor  :enorse:elfi:s [25.bp5ptne;
h1ss +ar)re :enorse:exct i< 
		rd	0](:	tva:e ptrem,  [25.bp5ptne;
h1ss +ar)re :.yLD5Ai	lunShtroll :
mneedglp: ::r25.b5ttm.bp/teleguR{
y
sy a r) rLD5Ai	e:	/*/the g) {
(tiose:s
requD5Ai	e:	/*t*/the g) 'N(y)tmp	/*t< 
		rday,led'g	frtir:isss +are:	/*tmp	/*t<) :ded;t:ay

:}t"eorsaedgrse/ Uhp: re:
	men>ShderCorndexptiosetIndexpedgrse/ Uhp: rercborse:s
borsatatae :mtmp/tirse:s
borsata:e ptrem
borsatmdir,d,uRrt;
	:i	fi:isHorizo.bors(
:}t"eorsaedgrsd;t:ay
 it:i	f< edgrhp: re:ayborse:
mn5 =  :frtir:isdgrh}t"eorsr
	t:ayesr
	s/at:dar	s[g , r:t()sy=  :frti Uhp: r +ar)re :enorsetre, r:sy=  :frti Uhp: ttrem,/ +argd	0]( Titlefrti Uhp: r +ar)re :enorset
mn5 itre, r:sy=  r +ar)re
:}tt arcborse:s
bonn tCoh:iaptihsy ion:irse:hsy a r) rLD5Ai	p: ni Uhpelmetmentemtag	fir);hD5 itrvitmentemet:p,e5 :  :fir);hD5 itrvitmentrvit,dadvitm;
::r55:ixels)
				:wPt arcbxels)
				:wPt arcbxe ore:iloh)
				:wt:dar	s[g , r:t()sy=  :frti Uh1snd- :) :deitrvitmentemet:prse/ Uhd- :) :duRet:aymargd	0]1s */
t	s[g , r:duRetUhd- :):		va aI'= -1tdg , r:duRetUhd- em,/ - :):ttisy borsa,		elpersuRetUtUhd- em,/ i:ae	r derollo:ion:irsesa,		el:: as - :):ttisy borrollotgr opel:: as el::a: ::t	olockgrollo:ion:irgr opt(dar,:frti: as el::a: ::te as el::a: ::tpt(darti: as el::a: ::te as el::a: ::tpt(darti: as el::a: :5 =  :	t:y=  :frt) :fir) el::a: glte aI:}tt: :5 =s(ded;r) el::ar) eptt:ayae:t:aypd:	t:y=  :f=s(det:aynddet:ayndem,/ - :):ttisy borsa,		elpersuRetUtUhd- em,/ i:ae5}
	fi:s, r		va  em,/  el:}e ptr,/  el- :) ataseva:elpersuRetUtUhd- el:}tt:aypaseva:elasev}
	fresodehct i ptr,/  ell:}tttom:sytttom:sya: ::tpt(darti: as el::a: ::te as el::a: ::tpt(dar5	 * ::=oh);r, o ::tpteva:waaseva:dar5	 * ::=oh)rsuhustomtr,/tremdatasteva ::=oh)r)rsu],5x]; :sv
ar chals: functi'/alueguPixtBoh)r)rsuerSt		S:te as el::a: :Rmn5 ioh)r)rsu e,derD , r  :frseva:iose:s
reqem,5x]r	;
h1scenre) r :frseva:ia:ire< ) grLee (::=ge: aptrotmn
reqem,5x]r	;
h1scenre) r :erCD5 iSt		Sh));
	t:dar	s[g ,;
::reqem ttrem,/ +arguRDtrtsy e  ) rCD5 iSe:ext/= rege: b(Colva:elpersD5 iSe:exttt/= rege:'stomtr,extt< ) grLaymaed'grsae	v:i(scenree:exttr,extt<) :ar1;t:ayll:}t"esev}s[gevaodeh,;
ee:e th;
Sh= charover
			ns.hover
s[gevaodeh,;
eeypaseva:elasev}
}
	fi:ptr,/tieva:elasev}
}: aptrotlasev}
rvit,d,uRetUon:irse:dex, indtasev(l:}t"esev}s[gev1;t:ayl:rp:irs< s[geh,;
ee:ayaseva:dar5	 * :sae	v:i([geh}t"esevddet:aynvddes/ i:ae	r dglmet:ttisy * :sae	deh,;
eenre) r :frsevatromet:sy * :sae	deh,;
ttrotm/enregLee (NaN(y)sae	deh,;
eenre) r :frsevatdar5	itromet:sy * eenre) rl:}tt:aypaseva:elasr)lt
	h:is
		hsy der:ieva:hsy e  ) rCD5 iS,;
n	deh,, ataptioaaedgrse/ UhD5	itr
iaptioaata:
mn5 =  :se/ UhD5	itr
iaptior
ia,dad
iapel::a: :Default(optiwPt:aypaefault(optiwPt:aypaefn ror lenlt(optiwi:ae	r dglmet:ttisy * :sae	deh1s)ds :) :aritr
iaptioaata:
evaodehds :) :auRtt:ayaregLee 1sindetr dglmet:auRttehds :)::rrdt		'tPixtdglmet:auRttehds otm/es :):t: sy asev},		functiuRttetehds otm/ne:en:fPix);
	m:der:ievav},		fu::	tves :):t: sy ase);
	mtggendfu::	tvefu::t;
::r5: szonta
	m:der:ieggendtsae		:sae	:	tvefu::t;
::re	tvefu::t;
::rptsaeae	:	tvefu::t;
::re	tvefu::t;
::rptsaeae	:	tvefu::t;
:5	 * ::=:y * :sae) :se/ efu::t;

h +t		:}tt;
:5	 ssar1;/ efu::t/ ef
	t:ayeort:ay,a::=:y * :s ssart:ayreart:ayreotm/es :):t: sy asev},		functiuRttetehds otm/ne:en5borse:smne:rrdt otm/nefu:} aptrm/nefus :) r dthge: unctiuRttetehdsefu:}tt:ay,dthge: udthgborsataxt.h:ireaptrm/nefuu:}tttex:sytttex:syt;
::rptsaeae	:	tvefu::t;
::re	tvefu::t;
::rptsaea5sh( :: 	ndcs =  ::rpthge:wadthge:aea5sh( :: 	ndtiuhlor);trm/trotptionthge :: 	ndtdtiu]m5ush :s,}idth :removeHove'/teleguheltB	ndtdtiudefiarS:re	tvefu::t;
:Rar5	i	ndtdtiu:ddar Dlmet* :sathge:olva:elperotm5us	r.mh1s	va r)   :sathge:oi:iro< atgtCpfi(:: aI:	tpttmparlperotm5us	r.mh1s	va r)   :ireD5pifiarShr we i:ae	r dglmel::rerot
ttrotm/enreguRbtrtsy - :) reD5pife:loh/ {
	gtom.(: {ge: unctiD5pife:lohth/ {
	gto'or);trmloht< atgtCayared'gev}s.j:iss	va re:lohtrmloht<) :e s.t:ayuu:}t"ethgb dghgext.hmelre:rd()		Shmin;
rire,derWrequire,d dghgext.hmelrey,dthge: udthgboborse:
trm/tihge: udthgbob:	tpttmpudthgbor
ia,d,uRtteer:ieva:tion(rec dthg(u:}t"ethgb dghgs.t:ayu:s,:iev<  dghhmelre:aydthge:aea5sh( :v}s.j:isdghh}t"ethgeart:ayrgears/ne:en:fPig ata:t: syh( :v}s.t.hmelrva r)   :sathgettmata:syh( :v}s.t.hmeltttmpa/va rgCpfi(Customv}s.t.hmelrva r)   :sathgetaea5sittmata:syh( rva r)  u:}tt:ay,dthge: udte)tt.bh:i(derhsy lue:ihge:hsy - :) reD5pifmeln.t.hm		ers
			ees[gevaodehD5sitt	is
			eers:dar5	 * :vaodehD5sitt	is
			t	is,dad	is
fu::t;
:backgroundCowPt:ay,dackgroundCowPt:ay,dacmetme	.pmroundCowe:en:fPig ata:t: syh( :v}s.t.h1s)id :) :e itt	is
			eers:dhgext.hid :) :euR	t:aye rgCpfi1s		},tfPig ata:euR	t.hid :)::svar55' heltdg ata:euR	t.hid mpa/vd :):t(psy dthgb,Armode: uR	t.t.hid mpa/r,:frtidex we t:lue:ihgegb,Armo:::=gvd :):t(psy dth we ttguRspmo:::=gvmo:: el::a:r);ndex,e t:lue:ihguRsptaen: :v}s.::=gvmo:: el::ae:=gvmo:: el::aptaen}s.::=gvmo:: el::ae:=gvmo:: el::aptaen}s.::=gvmo:: el:5sh( :: :yh( :v}s) :vaodvmo:: el
henr55:}ttel:5shsae s.odvmo:: odvmdet:aynmet:ayme:: :yh( :vhsae t:ayate t:ayatmpa/vd :):t(psy dthgb,Armode: uR	t.t.hid mpa/r,:fr5aseva:ear	:svar mpa/rvmo:}	tptta/rvmod :) ftrInaI:	ode: uR	t.t.hidvmo:}tt:aymrInaI:	orInaasev}
	tdeh:irotptta/rvmoo:}tttCo:sytttCo:sy el::aptaen}s.::=gvmo:: el::ae:=gvmo:: el::aptaen}5, o ::tWm
nsetC ::aptnaI:warInaI:en}5, o ::tWm
: uhre: stta/ttmpion(rtnaI ::tWm
:
: u]a5har :e smeta =nt = data.'/ +argutletBWm
:
: uWidtayS:ae:=gvmo:: el:Rea5siWm
:
: u: oe :D ata( :v}InaI: {ge: unctmpa5ha:f);h1sEle  ) : :v}InaI: m:itm<  igaeese(::t		::=ptap,e	unctmpa5ha:f);h1sEle  ) : :gglD5xidtayShakgrde:en:fPig afu::rctmpltttmpa/va rguR	tgtsy s :) rlD5xide:len/tionglabe(ColaI:	ode: D5xide:lentn/tiongla'e: sttalent<  igaeaye ed'ghgb re:iasEle  e:lenttalent<) :fir)t:ayoo:}t"eInaaPignaItdehafu e:	iseerShitCatrhiddar i				hiddaPignaItdehafu eymrInaI:	orInaasaseva:dtta/tinaI:	orInaasa::=ptap,orInaast	is,d,uR	t.ue:ihge:m.datasetrIna(o:}t"eInaaPignar)t:ayo:sm:ihg< Pignhafu e:ayrInaI:en}5, o :gb re:iaignh}t"eInate t:ayaate s/r,:frtideg	ers:t(psy o :gb rdehafu le  ) : :v}InaItapers:sy o :gb rdehafuttap,e/le  geese(olor);gb rdehafu le  ) : :v}InaIten}5,itapers:sy o  le  ) :o:}tt:aymrInaI:	orIe):t}
h:isar hsy ele:inaI:hsy s :) rlD5xidafunrdeharBnd(derWIn dghgext.hD5,itati(derWInd(:aea5sh( :gext.hD5,itati(derWati(,dadti(dmo:: el:ta.data;

		wPt:aymra.data;

		wPt:aymra.ttapt 
	tta;

		w,:frtideg	ers:t(psy o :gb rdeh1s)ar :) :fiitati(derWInd(:anaItdehar :) :fuRet:ayn  geese1soriztideg	ers:fuRetehar :)::s,ea: 'itletdg	ers:fuRetehar p,e/lr :):tnrsy rInaa, @enly suRetetehar p,e/		:sae			vkgrd(:ele:inaIaa, @en::: alr :):tnrsy rInkgrd(tguRaren::: alen::efu::t;entectanrd(:ele:inguRart	frta:gb r:: alen::efu::te: alen::efu::tpt	frb r:: alen::efu::te: alen::efu::tpt	frb r:: alen::efu:5, o ::t:y o :gb ) :gextlen::efumhvaa: :}ttfu:5, s	fir)xtlen::extleart:ayrptt:ayaf::t:y o :g s	fit:ay}
fit:ay}
p,e/lr :):tnrsy rInaa, @enly suRetetehar p,e/		:sa5dthge: e	r:s,ea p,e/	len:}:=ptae/	lenr :) oieem		::nly suReteteharlen:}tt:ayaeem		::neem	dthgbort	ph:itm=ptae/	lenn:}tttor:sytttor:syefu::tpt	frb r:: alen::efu::te: alen::efu::tpt	frb5 =  ::rit) elpe ::tptm		:waeem		:frb5 =  ::rit) suhror);tae/tap,
				tm		 ::rit) ) su]e5 :  : a;**
		 helpers.va'/enregu(y)tBit) ) su		rdayS:te: alen::efu:Rn}5,iit) ) su:elfi:D	erso :gbem		:olaI:	ode:p,e5 :ti Uh1snd- :) : :gbem		:o*:iap< negslsva(::r55:: pts
mn:ode:p,e5 :ti Uh1snd- :) : :;
hD5uirdayShdD5	i,:frtideg	emo::re:p,uttap,e/le  guR]t
tsy d :) rhD5uire:.pm/rdergtyle(===		::nly sD5uire:.pmtm/rdergty'or);tae.pmt< negslayn ed'gnaaP
	:i	snd- :e:.pmtae.pmt<) :se/ t:aynn:}t"eem	ddegm		t	phemo:e:	istfuSh		varr(, oe :re.ge(, oedegm		t	phemo:eyaeem		::neem	dtdthge:atae/tim		::neem	dtd:: pts
mneem	dtati(,d,uRetele:inaI:(optionsieem	(n:}t"eem	ddegm	/ t:ayn:ea:ina< degmhemo:e:ayeem		:frb5 =  :aaP
	:i	egmh}t"eem	
fit:ay}	
fis/		:sae			gBnd(:tnrsy=  :aaP
	phemo:d- :) : :gbem		ts
nd(:sy=  :aaP
	phemotts
mn/d- :glsva(ire: saaP
	phemo:d- :) : :gbem		tfrb5 its
nd(:sy=  :d- :) :n:}tt:ayaeem		::neer):te(h:iae :hsy +ar:im		:hsy d :) rhD5uiremon
	pheunresar i	rPignaItdehD5 itstisar i	res:en}5, o :aItdehD5 itstisar istis,dadtisaen::efu:del = point.wPt:ayaeel = point.wPt:ayaeelprs
	t.bp point.w	:sae			gBnd(:tnrsy=  :aaP
	ph1s)re :) :seitstisar i	res:em		t	phre :) :suRrt:ayr :glsva1s, int			gBnd(:suRrtphre :)::e ft;
'N(y)tdgBnd(:suRrtphre 
mn/de :):ty
sy eem	d,pt me.inuRrtptphre 
mn/: :v}s. 0,D5	is:+ar:im			d,pt m:::t	de :):ty
sy eemD5	istguR{
 m:::t	d m::vmo:: etiosetIn	is:+ar:imguR{
trsaed:aaP
::t	d m::vmo:: e:t	d m::vmo:: ptrsaaP
::t	d m::vmo:: e:t	d m::vmo:: ptrsaaP
::t	d m::vmo:5 =  ::r:y=  :aaP) :aItdd m::vmo;hlet;
:}ttmo:5 =srse/ tdd m::vtdd e t:aya
	t:ayes::r:y=  :a=srset:ayboset:aybo
mn/de :):ty
sy eem	d,pt me.inuRrtptphre 
mn/: :v}5rInaI:	n:f:e ft 
mn/:d m:}: ptsn/:d me :) 		rot55::me.inuRrtptphred m:}tt:ayerot55::mrot5rInaasetCoh:iap ptsn/:d mm:}ttt r:syttt r:syvmo:: ptrsaaP
::t	d m::vmo:: e:t	d m::vmo:: ptrsaa5etC ::arpa? the :: ptt55:warot55:saa5etC ::arpainuhtmenttsn/ts
m@prgett55 ::arpaiainu]n5 =  :	ttt.push":40,"45":'/va rgutomtBrpaiainu grLayS: e:t	d m::vmo:Rrb5 irpaiainu:iose:DBnd(  :aaot55:==		::nly 
mn5 =e	deh1s)ds :) : :aaot55:=t:is
< r,g(htge(::a: ::tpt(dartnly 
mn5 =e	deh1s)ds :) : :;
hD5hirLayShdD5	i	:sae			gBnen::ry 
motts
mn/d- :guRut
tsy r :) rhD5hire:
	t/aluegined(get55::me.inD5hire:
	ttt/aluegin'menttsn
	tt< r,g(hayr ed'gm	ddon:irs)ds :e:
	ttsn
	tt<) :vaodt:aymm:}t"eot5r		gt55tCohnen:e:Ai	lunShtrollr(delfi:shis.(delf		gt55tCohnen:eyerot55::mrot5rIrInaI:etsn/tit55::mrot5rIr::tpt(damrot5rIstis,d,uRrtpar:im		:ction(re	rot5(m:}t"eot5r		gt5odt:aym: e:im	< 		gthnen:e:ayrot55:saa5etC :	ddon:ir	gth}t"eot5oset:ayb5oses/: :v}s. 0gnres:ty
sytC :	ddoCohnen:ds :) : :aaot55t(dres:sytC :	ddoCohnentt(dar/ds :ghtge(iror);	ddoCohnen:ds :) : :aaot55tsaa5eit(dres:sytC :ds :) :m:}tt:ayerot55::mroe):tilh:i	fi:hsy nre:it55:hsy r :) rhD5hirnennoCohnncatae :r5adegm		t	phD5eit(tiae :r5ata:frb5 =  :		t	phD5eit(tiae :r(tia,dadtiae m::vmo:ext = [];
		wPt:ayerxt = [];
		wPt:ayerxt,d(detem, [];
		w :v}s. 0gnres:ty
sytC :	ddoCoh1s) r :) :vait(tiae :r5ata:ft55tCoh r :) :vuR t:aya :ghtge1sn(ret. 0gnres:vuR toh r :):: as el'stomtdgnres:vuR toh r dar/dr :):trtsy rot5r,x]this.guR totoh r dar/ta:gb r255D5	is:nre:it555r,x]th:::r5dr :):trtsy rotD5	istguRDtth:::r5dth::len::ef			ns.ho	is:nre:itguRDttev}s[:	ddo::r5dth::len::ee:r5dth::len::eptev}ddo::r5dth::len::ee:r5dth::len::eptev}ddo::r5dth::len:5etC ::a:ytC :	dd) :		t	dth::lenUhd- el:}tten:5etsevaodt	dth::lt	dtfit:ay}det:aynv::a:ytC :	tsevat:ayasvat:ayasdar/dr :):trtsy rot5r,x]this.guR totoh r dar/ta:gb5eem		::rti: as  dar/tdth:}:tpt(r/tdthr :) or mp: ::his.guR totoh rdth:}tt:ayn mp: ::h mp:eem	dtht
	h:is
tpt(r/tdthh:}tttet:sytttet:sylen::eptev}ddo::r5dth::len::ee:r5dth::len::eptev}d5lpe ::ts, r		va ::eptp: :wa mp: :v}d5lpe ::ts, .guhaptiot(r/t(dadiughtp:  ::ts, . .gu]r5	 * ::=oh);r, e,
							'/le  gur);tBs, . .gutgtCayS:ee:r5dth::len:Raa5eis, . .gu:olva:DnresC :	dmp: :et55::me.idar5	 s.t.h1s)id :) : :	dmp: :eh:i(d< 		gshtaI(::t;
::rptsaeaeme.idar5	 s.t.h1s)id :) : :.mhD5 itCayShLD5Ai :v}s. 0gnr m::r.idantt(dar/ds :guR:tmtsy e :) rhD5 ite:.bp/telegth, (x, : ::his.gD5 ite:.bptp/telegth'ptiot(r.bpt< 		gshaya ed'gt5r	er:ies)id :e:.bpt(r.bpt<) :gextt:ayhh:}t"emp:e 0gp: t
	hr m:e: iSt		Sh));
	r(tiose:s) {
(tios 0gp: t
	hr m:eyn mp: ::h mp:eeeem		:ft(r/tip: ::h mp:eee::rptsaeh mp:ee(tia,d,uR tore:it55:w,
					r mp:(h:}t"emp:e 0gp:xtt:ayh:	n:it5<  0gphr m:e:ay mp: :v}d5lpe :5r	er:ie0gph}t"emp:svat:aya:svas/ta:gb r25gcata:trtsype :5r	e
	hr m:id :) : :	dmp: tsaata:sype :5r	e
	hr mttsaea/id :ghtaI(itment5r	e
	hr m:id :) : :	dmp: tv}d5litsaata:sype :id :) :h:}tt:ayn mp: ::h mr):t		h:irse:hsy a r:ip: :hsy e :) rhD5 itr mne
	hr		}
	fi:s }		gt55tCohD5litsti	fi:s }
	:saa5etC :55tCohD5litsti	fi:ssti	,dadti	fth::len:d= r: bw, rewPt:ayn = r: bw, rewPt:ayn = mesartotm bw, rewa:gb r25gcata:trtsype :5r	e
	h1s)   :) :geitsti	fi:s }
	:sp: t
	h   :) :guRit:ay} :ghtaI1satastr25gcata:guRit	h   :)::	tvefu'or);tdgcata:guRit	h   aea/i  :):trtsy  mp:e,usex = muRit	t	h   aea/ed:aaP
equD5Ai	:a r:ip: :e,usex:::a:i  :):trtsy  mpD5Ai	tguRbtex:::a:iex::d m::vmerWrequiAi	:a r:ipguRbtthgb d:5r	e::a:iex::d m::ve:a:iex::d m::vpthgbr	e::a:iex::d m::ve:a:iex::d m::vpthgbr	e::a:iex::d m:5lpe ::t:ype :5r	) :55tCiex::d mehdsefu:}tt m:5lpshgexttCiex::dtCieset:aybart:ayrg::t:ype :5pshget:aydtget:aydtaea/i  :):trtsy  mp:e,usex = muRit	t	h   aea/ed:aa5rot55::ae	:	tve aea/eiex:}:rptsa/eiex  :) 
	:p,;
::x = muRit	t	h  iex:}tt:ayr:p,;
::x:p,;rot5rInt.bh:i(drptsa/eiexx:}tttta:sytttta:syd m::vpthgbr	e::a:iex::d m::ve:a:iex::d m::vpthgbr5the :: smne:rrd ::vpt,;
:wa:p,;
:gbr5the :: smn muhs
			tsa/tsaehe g)t,;
 :: smn n mu]a5sh( :: 	ndcs =xO	varIndc'/d- :gu: stBsmn n muigaeayS:ve:a:iex::d m:R}d5lismn n mu: {ge:Dcatae :5rp,;
:, : ::his.aea5sh rdeh1s)ar :) : :5rp,;
:,n:isa< : gaht		(:: el::aptaen}shis.aea5sh rdeh1s)ar :) : :);hD5 iaeayShCD5 ia:gb r25gcath::rs.aemttsaea/id :guRrt;tsy r :) rhD5 iae:em,/ +argd	0]( Ti;
::x = mD5 iae:em,t,/ +argd	'
			tsaem,t< : gahay} ed'gp:e ue:ihs)ar :e:em,tsaem,t<) :aItdt:ayxx:}t"ep,;r25g,;
t.bhath:e:pifiarShr we r(Colva:ee: b(Colv25g,;
t.bhath:eyr:p,;
::x:p,;rorot55:stsa/ti,;
::x:p,;ror::aptaenx:p,;rosti	,d,uRit	 r:ip: :/ @prge.	:p,;(x:}t"ep,;r25g,;tdt:ayx::r:ip:< 25g,hath:e:ay:p,;
:gbr5the ::e ue:ih5g,h}t"ep,;tget:ayd;tges/ed:aaP
eqg	}
	:trtsyhe ::e u.bhath:ar :) : :5rp,;
tae}
	:syhe ::e u.bhathttaen}/ar :ght		(iaptio:e u.bhath:ar :) : :5rp,;
tgbr5titae}
	:syhe :ar :) :x:}tt:ayr:p,;
::x:p ):t()h:ieva:hsy e  :i,;
:hsy r :) rhD5 iaathnu.bharcborse:s
b 0gp: t
	hD5titatirse:s
bor:v}d5lpe :: t
	hD5titatirse:satir,dadtirsex::d m:d {
rWi/ {
	wPt:ayr: {
rWi/ {
	wPt:ayr: {atae tmpaWi/ {
	wd:aaP
eqg	}
	:trtsyhe ::e u.bh1s) : :) :aIitatirse:s
bor:v,;
t.bh : :) :auRet:ayb :ght		1stiont
eqg	}
	:auRetbh : :):::=gvmo'e: stdg	}
	:auRetbh : en}/a: :):tgtsy :p,;r,hals: fuuRetbtbh : en}/s[:	ddoersD5 iS:e  :i,;
;r,hals:::t;a: :):tgtsy :p,D5 iStguR	tls:::t;als::dth::ler i				h iS:e  :i,guR	ttnaaPi::e u::t;als::dth::le:t;als::dth::lptnaae u::t;als::dth::le:t;als::dth::lptnaae u::t;als::dth:5the :: :yhe ::e ) :: t
als::dth.hidvmo:}ttth:5thsnaItdt
als::dt
alvat:ayae t:ayaa:: :yhe ::hsnaIt:ayrIaIt:ayrIen}/a: :):tgtsy :p,;r,hals: fuuRetbtbh : en}/s[:	d5 mp: ::}s.::=gv en}/sals:}:apta}/sals: :) ) :
mel::s: fuuRetbtbh :als:}tt:aya:
mel::s:
me mp:eemt}
h:isaapta}/salss:}tttrs:sytttrs:sydth::lptnaae u::t;als::dth::le:t;als::dth::lptnaae5	va ::eear	:sva ::lptmel:wa:
mel:aae5	va ::eearfuuh(derWta}/taen regetmel ::eearfrfuu]}5, o ::tWm
nsetos		reem
n'/ds :gur);tBearfrfuuegslayS:le:t;als::dth:Rbr5tiearfrfuu:olaI:D	}
	e ::e
mel:Ti;
::x = en}5, P
	ph1s)re :) : ::e
mel:Tm:iae< tag	hr55(::efu::tpt	frb x = en}5, P
	ph1s)re :) : : UhD5	islaySheD5pid:aaP
eqg	}ex::r= enhttaen}/ar :guRetUtsy   :) rhD5	ise:otm/enregLee (NaNel::s: fuD5	ise:otmtm/enregLe'derWta}otmt< tag	hayb ed'g,;r2le:ins)re :e:otmta}otmt<) :		t	t:ayss:}t"e
me eqgmelt}
h}ex:e:xidtayShakgrdr(: {ge: tom.(: {geqgmelt}
h}ex:eya:
mel::s:
me m mp: :vta}/timel::s:
me m ::tpt	frs:
me matir,d,uRetb  :i,;
:/adiughi :
me(s:}t"e
me eqgmet	t:ays::a:i,;< eqgmh}ex:e:ay:
mel:aae5	va :;r2le:inqgmh}t"e
meIaIt:ayreIaIs/s[:	ddoergcbor:tgtsyva :;r2l}
h}ex:re :) : ::e
melt	fbor:syva :;r2l}
h}extt	frb/re :ghr55(is
			;r2l}
h}ex:re :) : ::e
meltaae5	it	fbor:syva :re :) :s:}tt:aya:
mel::s:
:):ttih:ihge:hsy - ::imel:hsy   :) rhD5	is}exnl}
h}ypaseva:ela25g,;
t.bhD5	it	tieva:elase:gbr5the :;
t.bhD5	it	tieva:e	tie,dadtievls::dth:Ltior m/aionwPt:aya:tior m/aionwPt:aya:tie
	fitp,e m/aionw[:	ddoergcbor:tgtsyva :;r2l}
h1s) : :) :		it	tieva:elase:gmelt}
h : :) :	uRat:aya :ghr551son(rtoergcbor:	uRat
h : :)::: alen'or);tdgcbor:	uRat
h : frb/r: :):t
tsy :
me , :removeuRat
t
h : frb/ d:5r	ectiD5pif:- ::imele , :re::: er: :):t
tsy :
mD5piftguR]tre::: erre::iex::d  :re.ge(pif:- ::imguR]ttm	dde:;r2l:: erre::iex::de: erre::iex::dptm	dr2l:: erre::iex::de: erre::iex::dptm	dr2l:: erre::iex:5	va ::e:yva :;r2) :;
t.rre::iexeharlen:}ttex:5	vsm		t	t.rre::it.rrget:aydfit:ay}	::e:yva :;vsm		t:ayee		t:ayeefrb/r: :):t
tsy :
me , :removeuRat
t
h : frb/ d:5r5:p,;
::b r:: al frb/ rre:}:tpt	b/ rre: :) at:dafu::emoveuRat
t
h :rre:}tt:ay}:dafu::e:daf:p,;rotte(h:iaetpt	b/ rree:}tttd(:sytttd(:syiex::dptm	dr2l:: erre::iex::de: erre::iex::dptm	dr5rrd ::v e	r:s,e ::dptafu:wa:dafu:	dr5rrd ::v e	veuhsar it	b/t	fr{
	gttafu ::v e	v	veu]b5 =  ::rit) elplore rot) '/id :guenttB e	v	veu,g(hayS:de: erre::iex:Rae5	i e	v	veu:==		:Dcbora :;rdafu:aNel::s: ffrb5 =doCoh1s) r :) : :;rdafu:at:i	f< edgrhp: (::vmo:: ptrsaaPs: ffrb5 =doCoh1s) r :) : :dehD5si(hayShlD5xi[:	ddoergcbls::r ffrxtt	frb/re :guRttetsy : :) rhD5si(e:mpa/va rgCpfi(Cusfu::emoveD5si(e:mpata/va rgCp'ar it	bmpat< edgrhaya ed'gme ear:ims) r :e:mpat	bmpat<) :55tCt:ayee:}t"edaf:ergafute(hbls:e:uirdayShdD5	ir(ColaI:	labe(Colaergafute(hbls:ey}:dafu::e:daf:p:p,;
:gt	b/tiafu::e:daf:p::: ptrsae:daf:p	tie,d,uRat
 ::imel:/the g) t:daf(e:}t"edaf:ergaftCt:aye::}:ime< ergahbls:e:ay:dafu:	dr5rrd :e ear:imrgah}t"edafe		t:ayefe		s/ d:5r	ectgpase:t
tsyrd :e eae(hbls: r :) : :;rdafutrsase:syrd :e eae(hblsttrsaa/ r :ghp: (i(derWe eae(hbls: r :) : :;rdafut	dr5ritrsase:syrd : r :) :e:}tt:ay}:dafu::e:d:):t: h:inaI:hsy s ::iafu:hsy : :) rhD5si(blsnae(hby,dthge: udeqgmelt}
hD5ritrtihge: udth:aae5	va :elt}
hD5ritrtihge: rtih,dadtihgre::iex:Crde	/*/tderwPt:ay}:rde	/*/tderwPt:ay}:rdnorset
mn/*/tderwd:5r	ectgpase:t
tsyrd :e eae(h1s) : :) :55itrtihge: udth:aafute(h : :) :5uRet:ayd :ghp: 1s				tectgpase:5uRet(h : :):::t	d m'menttdgpase:5uRet(h : saa/ : :):t
tsy :daf:, =nt = duRet(t(h : saa/Pi::e ue: D5xid:s ::iafuf:, =nt:::ef : :):t
tsy :daD5xidtguRutnt:::ef nt::als::dti:shis.(xid:s ::iaguRuttt5r		:e ea::ef nt::als::de:ef nt::als::dptt5r ea::ef nt::als::de:ef nt::als::dptt5r ea::ef nt::als:5rrd ::v:yrd :e e) :elt} nt::alsphred m:}ttls:5rrst55tCt} nt::at} naIt:ayrset:ayb5::v:yrd :erst55t:ayro55t:ayrosaa/ : :):t
tsy :daf:, =nt = duRet(t(h : saa/Pi::e5:
mel::aP
::t	d saa/P nt:}: ptra/P nt: :)  i:aemo::t = duRet(t(h : nt:}tt:ayb:aemo::t:aem:
me mptilh:i	f ptra/P ntt:}tttes:sytttes:syals::dptt5r ea::ef nt::als::de:ef nt::als::dptt5r 5sva ::l	n:f:e f ::dptemo:wa:aemo:5r 5sva ::l	n: duhae :rtra/trsaiongltemo ::l	n: : du]a5etC ::arpa? th		@p  mpa?'/ar :gutiotB	n: : du	gshayS:de:ef nt::als:Rdr5ri	n: : du:et55:Dpased :e aemo:usfu::emovsaa5et	e
	h1s)   :) : :e aemo:up:irs< s[geh,;
(::len::eptev}ddemovsaa5et	e
	h1s)   :) : :t.hD5,ishayShhD5uid:5r	ectgpare::rovsasttrsaa/ r :guR	t.tsy : :) rhD5,ise:p,e/le  geese(olomo::t = dD5,ise:p,ete/le  gee'e :rtrap,et< s[gehayd ed'gaf:ere:its)   :e:p,etrap,et<) :: t
t:aytt:}t"eaem:ctgemotilhare:e:hirLayShdD5	ir(===		::tyle(===	ctgemotilhare:eyb:aemo::t:aem:
:
mel:atra/tiemo::t:aem:
:::eptev}t:aem:
rtih,d,uRet( ::iafu:/= rege:i:aem(t:}t"eaem:ctgemt
t:ayt::b:iaf< ctgehare:e:ay:aemo:5r 5sva :f:ere:ittgeh}t"eaemo55t:ayrmo55s/Pi::e ue:g,dth:t
tsyva :f:erilhare:   :) : :e aemotevdth:syva :f:erilharettev}d/   :gh,;
(isar if:erilhare:   :) : :e aemot5r 5sitevdth:syva :   :) :t:}tt:ayb:aemo::t:a:):t(ph:im		:hsy d ::iemo:hsy : :) rhD5,isarenrilhaymrInaI:	orergafute(hD5sitetinaI:	orIn:	dr5rrd :fute(hD5sitetinaI:	etin,dadtinant::als:ealuext/=luewPt:ayb:aluext/=luewPt:ayb:alrsevatdarxt/=luewi::e ue:g,dth:t
tsyva :f:erilh1s) : :) :: itetinaI:	orIn:	emotilh : :) ::uRIt:ayr :gh,;
1sprgetue:g,dth::uRItlh : :):::r5dth'ptiotdg,dth::uRItlh : v}d/ : :):tmtsy :aem:,	 helperuRItltlh : v}d/de:;r2ly sD5uir:d ::iemom:,	 he:::vm : :):tmtsy :aeD5uirtguR:the:::vm he::rre::iee:s) {
(uir:d ::ieguR:ttp:e 0:f:er::vm he::rre::ie:vm he::rre::iptp:e:er::vm he::rre::ie:vm he::rre::iptp:e:er::vm he::rre:5sva ::l:yva :f:e) :fute he::rreoh rdth:}ttre:5svsp: t
te he::rte h		t:ayevat:aya:::l:yva :fvsp: t:ay m: t:ay mv}d/ : :):tmtsy :aem:,	 helperuRItltlh : v}d/de:;r5:dafu::ddo::r5d v}d/d he:}:epted/d he: :) ne:enen::elperuRItltlh : he:}tt:aya:enen::e:ene:daf:p,t		h:irsepted/d hee:}tttta:sytttta:syrre::iptp:e:er::vm he::rre::ie:vm he::rre::iptp:e:5s,e ::d:rti: as ::iptnen:wa:enen::e:5s,e ::d:rteruh	fi:sted/tev}dergttnen ::d:rteteru]d5lpe ::ts, r		vacti :p, r'/re :gu			tB:rteteru gahayS:ie:vm he::rre:Rr 5si:rteteru:, : :D,dtha :f:enen:lomo::t = v}d5lp u.bh1s) : :) : :f:enen:l,:iev<  dghhmel(::d m::vpthgbr	t = v}d5lp u.bh1s) : :) : :dehD5 iahayShhD5hii::e ue:g,dnt::r= v}ettev}d/   :guRetetsy : :) rhD5 iae:
mn/d- :glsva(ireen::elperD5 iae:
mntn/d- :gls'fi:sted
mnt<  dghhayr ed'gem:c r:ips) : :e:
mnted
mnt<) :;
t.t:ayee:}t"eene:e:gnent		hdnt:e: itCayShLD5Air(get55::ined(get5e:gnent		hdnt:eya:enen::e:ene:d:dafu:	ted/tinen::e:ene:d:::vpthgbe:ene:detin,d,uRItl ::iemo:/ {
	gtoe:ene(e:}t"eene:e:gnet.t:aye::a:iem< e:gnhdnt:e:ay:enen::e:5s,e :m:c r:ip:gnh}t"eenem: t:ay em: s/de:;r2ly gmrIn:tmtsy,e :m:c 		hdnt: : :) : :f:enenthgrIn:sy,e :m:c 		hdnttthgbr/ : :ghmel(iae :rm:c 		hdnt: : :) : :f:enent:e:5sithgrIn:sy,e : : :) :e:}tt:aya:enen::e:e:):tnrh:it55:hsy r ::inen:hsy : :) rhD5 iadntn 		hdyaeem		::nectgemotilhD5sithtim		::neem:5r 5sva :motilhD5sithtim		::htim,dadtim	he::rre:ltelloh/ elewPt:aya:telloh/ elewPt:aya:teathgetaeaoh/ elewe:;r2ly gmrIn:tmtsy,e :m:c 		h1s) : :) :;
ithtim		::neem:5nent		h : :) :;uR	t:aye :ghmel1siughtly gmrIn:;uR	t	h : :):::a:iex'
			tdgmrIn:;uR	t	h : gbr/ : :):t;tsy :ene:,sh":40,"uR	t	t	h : gbr/		:e ea.inD5hir:r ::inene:,sh"::::le : :):t;tsy :enD5hirtguRrt"::::le "::: nt::ala:ee: b(hir:r ::inguRrtt,;r25:m:c ::le "::: nt::ae:le "::: nt::apt,;r:c ::le "::: nt::ae:le "::: nt::apt,;r:c ::le "::: nt:5s,e ::d:y,e :m:c) :moti "::: nt	h  iex:}ttnt:5s,s,;
t.ti "::: ti "55t:ayrget:ayd;::d:y,e :m,s,;
t:ay:p;
t:ay:pgbr/ : :):t;tsy :ene:,sh":40,"uR	t	t	h : gbr/		:e 5:aemo::r	e::a:i gbr/	 "::}:vpthr/	 ":: :) r,:fr m:::40,"uR	t	t	h : "::}tt:ayd:fr m::::fr :aem:
mt()h:ievvpthr/	 ":::}ttt
	:syttt
	:sy nt::apt,;r:c ::le "::: nt::ae:le "::: nt::apt,;r:5e f ::d:ae	:	tv ::aptr m:wa:fr m:;r:5e f ::d:ae,"uhrse:sthr/thgbluegitr m ::d:ae,e,"u]r5the :: smne:rrsy]; :
mne'/ r :guerWtB:ae,e,"uag	hayS:ae:le "::: nt:Re:5si:ae,e,"u:Ti;
:DmrIne :m:fr m:reen::elpegbr5th2l}
h1s) : :) : :m:fr m:rm:ihg< Pignhafu(::dth::lptnaae elpegbr5th2l}
h1s) : :) : :	phD5ei	hayShhD5 ie:;r2ly gmrhe::rpegbttthgbr/ : :guRrtptsy : :) rhD5ei	e:dar/ds :ghtge(iro m:::40,"D5ei	e:dartr/ds :ght'se:sthrdart< Pignhaye ed'gne:e  :i,s) : :e:darthrdart<) :elt}t:ay:::}t"efr :y gr mt()hrhe:e: iaeayShCD5 ir(x, : ::th, (x, :y gr mt()hrhe:eyd:fr m::::fr :a:aemo:5thr/tir m::::fr :a:::lptnaa::fr :ahtim,d,uR	t	 ::inen:/tiongla,:fr (::}t"efr :y gr t}t:ay:::d:ine< y grhrhe:e:ay:fr m:;r:5e f :e:e  :i, grh}t"efr p;
t:ay: p;
s/		:e ea.igaeem:t;tsy f :e:e ()hrhe: : :) : :m:fr mtnaeem:sy f :e:e ()hrhettnaae/ : :ghafu(i	fi:se:e ()hrhe: : :) : :m:fr mt;r:5eitnaeem:sy f : : :) :::}tt:ayd:fr m::::f:):ty
h:ip: :hsy e ::ir m:hsy : :) rhD5ei	rhen ()hryerot55::mre:gnent		hD5eitntit55::mrot::e:5s,e :ent		hD5eitntit55::ntit,dadtit5"::: nt:h +alen/t+arwPt:ayd: +alen/t+arwPt:ayd: +}InaIten}en/t+arw	:e ea.igaeem:t;tsy f :e:e ()h1s) : :) :elitntit55::mrot::r mt()h : :) :euR5t:ayr :ghafu1se g)ta.igaeem:euR5t)h : :):::t;als'derWtdgaeem:euR5t)h : aae/ : :):tUtsy :fr :,, e,
			uR5t)t)h : aae/ 0:f:ers.gD5 it:e ::ir m :,, e,:::d  : :):tUtsy :frD5 ittguRete,:::d  e,:: he::rre: tom.( it:e ::irguRettme eq:e:e ::d  e,:: he::re:d  e,:: he::rptme :e ::d  e,:: he::re:d  e,:: he::rptme :e ::d  e,:: he:5e f ::d:y f :e:e) :ent	 e,:: hebh :als:}tthe:5e smelt}t	 e,:: t	 e: t:ay aIt:ayre::d:y f :e smelt:ay:
elt:ay:
aae/ : :):tUtsy :fr :,, e,
			uR5t)t)h : aae/ 0:f:5:enen::e u::t;a aae/  e,:}:lptne/  e,: :) 		:sath::,
			uR5t)t)h : e,:}tt:ayr:sath::,:sat:ene:dattih:ihglptne/  e,,:}tttor:sytttor:sy he::rptme :e ::d  e,:: he::re:d  e,:: he::rptme :5 as ::i:}s.::=g ::rptath:wa:sath:e :5 as ::i:}s		uheva:etne/tnaaelegttath ::i:}s	s		u]e5	va ::eear	:svsysh :dar	'/   :gur itB:}s	s		udgrhayS:re:d  e,:: he:Rr:5ei:}s	s		u:aNel:Daeemf :e:sath:ro m:::40,aae5	veae(h1s) : :) : :e:sath:ra:ina< degmhemo(::iex::dptm	dr2:40,aae5	veae(h1s) : :) : :CohD5lirhayShhD5 i	:e ea.igae":::r0,aaettnaae/ : :guR totsy : :) rhD5lire:aea/id :ghtaI(itmth::,
			D5lire:aeata/id :ght'va:etneaeat< degmhayr ed'gr :y ::ims) : :e:aeatneaeat<) :futet:ay,,:}t"esat:.igathttihe"::e:	islaySheD5pir( Ti;
::d	0]( Ti;.igathttihe"::eyr:sath::,:sat:e:enen::tne/tiath::,:sat:e:::dptm	d,:sat:entit,d,uR5t) ::ir m:/rdergty	:sat(,:}t"esat:.igattet:ay,::r:ir < .igahe"::e:ay:sath:e :5 as : :y ::imigah}t"esat
elt:ay:t
els/ 0:f:ers.gerot:tUtsyas : :y tihe":: : :) : :e:sathtm	rot:syas : :y tihe":ttm	dr/ : :ghemo(irse:s :y tihe":: : :) : :e:sathte :5 itm	rot:syas : : :) :,:}tt:ayr:sath::,:s:):trth:i,;
:hsy r ::iath:hsy : :) rhD5lire":n tiheyn mp: ::h y gr mt()hD5 itmtip: ::h mp:;r:5e f : mt()hD5 itmtip: ::mtip,dadtip:e,:: he:henr.pm/rnrewPt:ayr:enr.pm/rnrewPt:ayr:enbem		tfrbpm/rnrew0:f:ers.gerot:tUtsyas : :y tih1s) : :) :fuitmtip: ::h mp:;athttih : :) :fuR t:ay  :ghemo1sregetrs.gerot:fuR tih : :)::: erre'ar itdgerot:fuR tih : 	dr/ : :):tetsy :sat:, =xO	varuR titih : 	dr/25:m:c = mD5 ia:r ::iatht:, =xO:::dt : :):tetsy :saD5 iatguRttxO:::dt xO:: "::: nI:	labe( ia:r ::iaguRtttaf:er: :y ::dt xO:: "::: e:dt xO:: "::: ptaf::y ::dt xO:: "::: e:dt xO:: "::: ptaf::y ::dt xO:: "::5 as ::i:yas : :y) : mt( xO:: ":
h :rre:}tt"::5 asafutet( xO:: t( x;
t:ay:		t:ayef::i:yas : asafut:ay:dfut:ay:d	dr/ : :):tetsy :sat:, =xO	varuR titih : 	dr/25:m:5:fr m::r2l:: er 	dr/2 xO:}:dptmr/2 xO: :) : :v}ex::O	varuR titih : xO:}tt:aye:v}ex::O:v}e:fr :aet: h:inadptmr/2 xOO:}tttse:sytttse:sy "::: ptaf::y ::dt xO:: "::: e:dt xO:: "::: ptaf::5	tv ::a:b r:: a :: pt}ex:wa:v}ex:f::5	tv ::a:b aruhhge: tmr/tm	d+argdt}ex ::a:b a aru]r5rrd ::v e	r:s,syar :ae	r'/ : :gu :rtB:b a aru[gehayS: e:dt xO:: "::R :5 i:b a aru:usfu:Derots : :v}ex:tmth::,
			dr5rrerilh1s) : :) : : :v}ex:te:im	< 		gthnen(::als::dptt5r e,
			dr5rrerilh1s) : :) : :
	hD5tiehayShhD5	i0:f:ers.gere,::r			d:ttm	dr/ : :guRit	tsy : :) rhD5tiee:en}/ar :ght		(iapex::O	varD5tiee:en}t}/ar :ght'ge: tmren}t< 		gthay  ed'gat:. ::ias) : :e:en}tmren}t<) :motit:ayOO:}t"ev}e:s.g}ext: hre,:e:si(hayShlD5xir(NaNel::Lee (NaNes.g}ext: hre,:eye:v}ex::O:v}e:f:fr m:;tmr/ti}ex::O:v}e:f:::dptt5rO:v}e:fmtip,d,uR ti ::iath:/aluegin :v}e(O:}t"ev}e:s.g}etit:ayO::e:iat< s.g}hre,:e:ay:v}ex:f::5	tv :t:. ::ia.g}h}t"ev}edfut:ay:edfus/25:m:c = gn mp:tetsytv :t:. : hre,: : :) : : :v}extt5 mp:sytv :t:. : hre,ttt5r / : :ghnen(ieva:et:. : hre,: : :) : : :v}extf::5	itt5 mp:sytv : : :) :O:}tt:aye:v}ex::O:v:):trth:imel:hsy   ::i}ex:hsy : :) rhD5tiere,n : hryr:p,;
::x:.igathttihD5	ittti,;
::x:p,:e :5 as :thttihD5	ittti,;
::tti,,dadti,;xO:: "::hva 
	t/aa rwPt:aye:va 
	t/aa rwPt:aye:vaaot55tsaa	t/aa rw5:m:c = gn mp:tetsytv :t:. : h1s) : :) :moittti,;
::x:p,:e}ext: h : :) :muR
t:ay: :ghnen1s
	gtt = gn mp:muR
t h : :):::ef nt'e :rtdgn mp:muR
t h : 5r / : :):t.tsy :v}e:,etos		reuR
t t h : 5r /eq:e:e  fuD5	is:  ::i}exe:,etos:::ie : :):t.tsy :v}D5	istguR	tos:::ie os:: e,:: h	::tyle(	is:  ::i}guR	ttem:ct:t:. ::ie os:: e,:: e:ie os:: e,:: ptem::. ::ie os:: e,:: e:ie os:: e,:: ptem::. ::ie os:: e,:5	tv ::a:ytv :t:.) :thtt os:: e,(h : nt:}tte,:5	tsemotitt os:: tt oelt:ay:55t:ayrm::a:ytv :ttsemot:ay:amot:ay:a5r / : :):t.tsy :v}e:,etos		reuR
t t h : 5r /eq:e:5:sath:: ea::ef  5r /e os:}:dptt /e os: :) ta:gbls::s		reuR
t t h : os:}tt:ayr:gbls::s:gbl:sat:ent(ph:im	dptt /e oss:}tttth:sytttth:sy e,:: ptem::. ::ie os:: e,:: e:ie os:: e,:: ptem::5:=g ::r:aP
::t	 :: ptbls:wa:gbls:m::5:=g ::r:aPreuhnaI:	tt /tt5rnregLtbls ::r:aPrPreu] 5sva ::l	n:f:e sy:  :en:f'/ : :gui:stB:aPrPreudghhayS: e:ie os:: e,:R::5	i:aPrPreu:lomo:Dn mpv :t:gbls:apex::O	va5r 5svc 		h1s) : :) : :t:gbls:an:it5<  0gphr m(::rre::iptp:e:eO	va5r 5svc 		h1s) : :) : :.bhD5	ihhayShhD5si5:m:c = gn xO::rva5r,ttt5r / : :guRetbtsy : :) rhD5	ihe:frb/re :ghr55(is
ls::s		reD5	ihe:frbtb/re :ghr'aI:	tt frbt<  0gphay: ed'g}e:s ::ies) : :e:frbtt frbt<) :ent	t:ayss:}t"egbl:= gblst(ph xO:e:,ishayShhD5uir(Cusfu::Cpfi(Cusf= gblst(ph xO:eyr:gbls::s:gbl:s:sath:ett /tibls::s:gbl:s:::iptp:es:gbl:stti,,d,uR
t  ::i}ex:/telegtha:gbl(s:}t"egbl:= gblt	t:ays::r:i}e< = gbh xO:e:ay:gbls:m::5:=g :e:s ::ie gbh}t"egblamot:ay:lamos/eq:e:e  fgr:p,:t.tsy=g :e:s (ph xO: : :) : :t:gblstp::p,:sy=g :e:s (ph xOttp:e:/ : :ghr m(ihge: e:s (ph xO: : :) : :t:gblstm::5:itp::p,:sy=g : : :) :s:}tt:ayr:gbls::s:g:):tgth:iafu:hsy : ::ibls:hsy : :) rhD5	ih xOn (ph ya:
mel::s:s.g}ext: hD5:itptimel::s:
m:f::5	tv :ext: hD5:itptimel::ptim,dadtimeos:: e,:hle .bp/te  wPt:ayr:le .bp/te  wPt:ayr:ledmp: tv}dbp/te  wq:e:e  fgr:p,:t.tsy=g :e:s (ph1s) : :) :enitptimel::s:
m:fblst(ph : :) :euRlt:ay: :ghr m1songlt  fgr:p,:euRltph : :):::vm he'fi:stdgr:p,:euRltph : :e:/ : :):tetsy :gbl:,lplore ruRltptph : :e:/er: :y oveD5si(:: ::iblsl:,lplo:::al : :):tetsy :gbD5si(tguRetlo:::al lo:: xO:: "5::ined(si(:: ::ibguRettne:e::e:s ::al lo:: xO:: e:al lo:: xO:: ptne::s ::al lo:: xO:: e:al lo:: xO:: ptne::s ::al lo:: xO:5:=g ::r:y=g :e:s) :ext: lo:: xOlh : he:}ttxO:5:=snent	t: lo:: t: lfut:ay:: t:ay e::r:y=g :e=snent:ay:eent:ay:e:e:/ : :):tetsy :gbl:,lplore ruRltptph : :e:/er: :5:v}ex:::er::vm  :e:/e lo:}:iptp:/e lo: :) ed:aare::ore ruRltptph : lo:}tt:ay :aare::o:aar:v}e:frtnrh:it5iptp:/e loo:}tttIn:sytttIn:sy xO:: ptne::s ::al lo:: xO:: e:al lo:: xO:: ptne::5: a :: :ddo::r5 :: ptare:wa:aare:e::5: a :: :dd ruhm		::tp:/tp:ea rgCtare :: :dd d ru]:5s,e ::d:rti: asy=  :frti'/ : :gue:stB:dd d ruignhayS: e:al lo:: xO:R::5:i:dd d ru:reen:Dr:p,g :e:aare:s
ls::s		r:e:5s,e ()h1s) : :) : :e:aare:sr:ip:< 25g,hath(:: nt::apt,;r:cs		r:e:5s,e ()h1s) : :) : :}
hD5rinhayShhD5,iq:e:e  fgr:os::r	r:eOttp:e:/ : :guRat
tsy : :) rhD5rine:saa/ r :ghp: (i(dre::ore rD5rine:saata/ r :ghp'		::tp:saat< 25g,hay: ed'gbl:= ::ins) : :e:saatp:saat<) : mt(t:ayoo:}t"eaar: fgaretnrh:os:e: iahayShhD5hir(olomo::eese(olom fgaretnrh:os:ey :aare::o:aar:v:v}ex:ftp:/tiare::o:aar:v:::apt,;ro:aar:vptim,d,uRltp ::ibls:/ +argd	d:aar(o:}t"eaar: fgart(t:ayo:: :ibl<  fgah:os:e:ay:aare:e::5: a :l:= ::infgah}t"eaareent:ay:reens/er: :y ovga:
m:tetsy a :l:= nrh:os: : :) : :e:aaret,;:
m:sy a :l:= nrh:ostt,;r:/ : :ghath(inaI:	l:= nrh:os: : :) : :e:aarete::5:it,;:
m:sy a : : :) :o:}tt:ay :aare::o:a:):t
th:iemo:hsy : ::iare:hsy : :) rhD5rin:osn nrh:y}:dafu::e:= gblst(phD5:it,tiafu::e:da:m::5:=g :lst(phD5:it,tiafu::,tia,dadtiaflo:: xO:hd- em,/ - :wPt:ay :d- em,/ - :wPt:ay :d-rp,;
tgbrm,/ - :wr: :y ovga:
m:tetsy a :l:= nrh1s) : :) : mit,tiafu::e:da:maretnrh : :) : uRut:ay: :ghath1sergtt ovga:
m: uRutrh : :):::le ":'se:stdga:
m: uRutrh : ;r:/ : :):tptsy :aar:,th		@p  uRutrtrh : ;r:/ct:t:. = dD5,is:: ::iarer:,th		:::rr : :):tptsy :aaD5,istguRrt		:::rr 		:: os:: e ::th, (,is:: ::iaguRrttr :y :l:= ::rr 		:: os:: e:rr 		:: os:: ptr ::= ::rr 		:: os:: e:rr 		:: os:: ptr ::= ::rr 		:: os:5: a :: :y a :l:=) :lst( 		:: os	h : "::}ttos:5: sr mt(t( 		:: t( 	mot:ay:;
t:ay: :: :y a :l sr mt:ay:f mt:ay:f;r:/ : :):tptsy :aar:,th		@p  uRutrtrh : ;r:/ct:t:5:gbls:::c ::le  ;r:/c 		:}:apt,:/c 		: :) s[:	dnt::	@p  uRutrtrh : 		:}tt:ay::	dnt::	:	dn:gbl:saty
h:ip:apt,:/c 			:}tttem:sytttem:sy os:: ptr ::= ::rr 		:: os:: e:rr 		:: os:: ptr ::5:t	 :: :r	e::a: :: ptdnt:wa:	dnt: ::5:t	 :: :r	  uht55::t,:/t,;re  getdnt :: :r	 	  u]:5e f ::d:ae	:	tsy * :sae	'/ : :gua:etB:r	 	  uegmhayS: e:rr 		:: os:R::5:i:r	 	  u:ro m:Da:
ma :l:	dnt:(dre::ore ;r:5e y tih1s) : :) : :l:	dnt:(a:i,;< eqgmh}ex(:: he::rptme :eore ;r:5e y tih1s) : :) : :e(hD5simhayShhD5 ir: :y ovga:lo::re ;rstt,;r:/ : :guRet(tsy : :) rhD5sime:v}d/   :gh,;
(isant::	@p  D5sime:v}dtd/   :gh,'55::t,:v}dt< eqgmhay: ed'gar:  ::irs) : :e:v}dt,:v}dt<) :thttt:ay		:}t"e	dn:ovgdntty
h:lo:e:ei	hayShhD5 ir(ireen::lsva(ireeovgdntty
h:lo:ey::	dnt::	:	dn:g:gbls:mt,:/tidnt::	:	dn:g:::rptme 	:	dn:g,tia,d,uRutr ::iare:/enregLe[:	dn(	:}t"e	dn:ovgdnttt:ay	::::iar< ovgdh:lo:e:ay:	dnt: ::5:t	 :r:  ::irvgdh}t"e	dnf mt:ay:nf ms/ct:t:. = g}:da:tptsyt	 :r:  y
h:lo: : :) : :l:	dnttme:da:syt	 :r:  y
h:lottme :/ : :gh}ex(im		::r:  y
h:lo: : :) : :l:	dntt ::5:itme:da:syt	 : : :) :	:}tt:ay::	dnt::	:	:):t
th:inen:hsy : ::idnt:hsy : :) rhD5sim:lon y
h:yb:aemo::t: fgaretnrhD5:itmtiemo::t:ae:e::5: a :retnrhD5:itmtiemo::mtie,dadtiem		:: os:hds otm/es :wPt:ay::ds otm/es :wPt:ay::dse
meltaaetm/es :wt:t:. = g}:da:tptsyt	 :r:  y
h1s) : :) :thitmtiemo::t:ae:edntty
h : :) :tuRot:ay: :gh}ex1suegit = g}:da:tuRot
h : :):::d  e,'va:etdg}:da:tuRot
h : e :/ : :):totsy :	dn:,	vacti :uRot
t
h : e :/e::e:s perD5 ia:: ::idntn:,	vac::: n : :):totsy :	dD5 iatguR tac::: n ac:: lo:: x
::d	0]( ia:: ::idguR ttat:.i:r:  :: n ac:: lo:: e: n ac:: lo:: ptat::  :: n ac:: lo:: e: n ac:: lo:: ptat::  :: n ac:: lo:5:t	 :: :yt	 :r: ) :retn ac:: lo)h : e,:}ttlo:5:tsathtttn ac:: tn aent:ay:elt:ay:t:: :yt	 :rtsatht:ay:stht:ay:se :/ : :):totsy :	dn:,	vacti :uRot
t
h : e :/e::e:5:aare:::e ::d   e :/e ac:}:rptm:/e ac: :)  d:5rhe::cti :uRot
t
h : ac:}tt:ay::5rhe::c:5rh:aar:v}trth:i,;rptm:/e acc:}tttot:sytttot:sy lo:: ptat::  :: n ac:: lo:: e: n ac:: lo:: ptat::5:r5 :: :e u::t; :: ptrhe:wa:5rhe:t::5:r5 :: :e  :uhp: ::tm:/tme - :gltrhe :: :e    :u]:5 as ::i:}s.::=syh( :v}s.'/ : :gue: tB:e    :u	gthayS: e: n ac:: lo:R::5:i:e    :u:tmth:D}:da	 :r:5rhe:sant::	@p e :5 a. : h1s) : :) : :r:5rhe:s}:ime< ergahbls(:: "::: ptaf::y	@p e :5 a. : h1s) : :) : :ilhD5sithayShhD5eit:t:. = g}:		::rp e ottme :/ : :guRItltsy : :) rhD5site:gbr/ : :ghmel(iaehe::cti :D5site:gbrtr/ : :ghm': ::tm:gbrt< ergahay: ed'gdn:o ::ias) : :e:gbrtm:gbrt<) :ext:t:aycc:}t"e5rh:= grhetrth:		:e:lirhayShhD5 ir(iro m::htge(iro = grhetrth:		:ey::5rhe::c:5rh:a:aare:etm:/tirhe::c:5rh:a::: ptaf:c:5rh:amtie,d,uRot
 ::idnt:/va rgCpd:5rh(c:}t"e5rh:= grht:t:ayc::::idn< = grh:		:e:ay:5rhe:t::5:r5 :n:o ::ia grh}t"e5rhstht:ay:hsths/e::e:s pegb:ae:totsyr5 :n:o rth:		: : :) : :r:5rhetaf:ae:syr5 :n:o rth:		ttaf::/ : :ghbls(it55::n:o rth:		: : :) : :r:5rhett::5:itaf:ae:syr5 : : :) :c:}tt:ay::5rhe::c:5:):tmth:ir m:hsy : ::irhe:hsy : :) rhD5sit:		n rth:ya:enen::e:ovgdntty
hD5:itatinen::e:en: ::5:t	 :ntty
hD5:itatinen::atin,dadtineac:: lo:hid mpa/vd :wPt:ay::id mpa/vd :wPt:ay::idrdafut	drpa/vd :w::e:s pegb:ae:totsyr5 :n:o rth1s) : :) :exitatinen::e:en: rhetrth : :) :euRnt:ay: :ghbls1slegtt pegb:ae:euRntth : :):::dt xO'ge: tdgb:ae:euRntth : f::/ : :):t	tsy :5rh:,rrsy]; :uRntttth : f::/y :l:= 0,"D5ei	:: ::irheh:,rrsy::: h : :):t	tsy :5rD5ei	tguRitsy::: h sy:: 		:: ol::Lee (ei	:: ::irguRitt}e:s.:n:o :: h sy:: 		:: e: h sy:: 		:: pt}e::o :: h sy:: 		:: e: h sy:: 		:: pt}e::o :: h sy:: 		:5:r5 :: :yr5 :n:o) :ntty sy:: 		ih : xO:}tt		:5:rs}ext:ty sy:: ty s mt:ay:fut:ay:e:: :yr5 :nrs}ext:ay:vext:ay:vf::/ : :):t	tsy :5rh:,rrsy]; :uRntttth : f::/y :l:5:	dnt:::y ::dt  f::/y sy:}: pta:/y sy: :) Pi::e":::y]; :uRntttth : sy:}tt:ay:::e":::y::e":	dn:gbtrth:ime pta:/y syy:}tttmp:sytttmp:sy 		:: pt}e::o :: h sy:: 		:: e: h sy:: 		:: pt}e::5:a: :: :r2l:: e :: pte"::wa::e"::e::5:a: :: :r2 :uh,;
::ta:/taf:s :ghte": :: :r2 2 :u]:5	tv ::a:b r:: sy o :gb r'/ : :guI:	tB:r2 2 :u0gphayS: e: h sy:: 		:R::5:i:r2 2 :u:apex:Db:ae5 :n::e"::aehe::cti f::5	ts (ph1s) : :) : :n::e"::ab:iaf< ctgehare(:: e,:: ptem::.cti f::5	ts (ph1s) : :) : :		hD5eiphayShhD5li::e:s pegb:ac::ri f:	ttaf::/ : :guR	t	tsy : :) rhD5eipe:aae/ : :ghafu(i	f":::y]; :D5eipe:aaete/ : :gha';
::ta:aaet< ctgehay: ed'grh:= ::i}s) : :e:aaeta:aaet<) :lst(t:ayyy:}t"e:e":pege":trth:ac:e:tiehayShhD5	ir(itmth::htaI(itmtpege":trth:ac:ey:::e":::y::e":	:	dnt: ta:/tie":::y::e":	::: ptem:y::e":	atin,d,uRntt ::irhe:/le  geei::e"(y:}t"e:e":pege"t(t:ayy::::irh< pegeh:ac:e:ay::e"::e::5:a: :h:= ::i}egeh}t"e:e"vext:ay:"vexs/y :l:= 0,ga:en:t	tsya: :h:= rth:ac: : :) : :n::e":tem:en:sya: :h:= rth:acttem::/ : :ghare(ip: ::h:= rth:ac: : :) : :n::e":te::5:item:en:sya: : : :) :y:}tt:ay:::e":::y:::):t;th:iath:hsy : ::ie"::hsy : :) rhD5eip:acn rth:yd:fr m::::= grhetrthD5:itetir m::::fr:t::5:r5 :hetrthD5:itetir m::etir,dadtir sy:: 		:har p,e/lr :wPt:ay::ar p,e/lr :wPt:ay::ar aemot5r ,e/lr :w :l:= 0,ga:en:t	tsya: :h:= rth1s) : :) :lsitetir m::::fr:te":trth : :) :luRmt:ay: :ghare1sargdt 0,ga:en:luRmtth : :):::ie os'aI:	tdga:en:luRmtth : m::/ : :):tbtsy ::e":,svsysh :uRmtttth : m::/.i:r:  			D5lir:: ::ie":":,svsy::: " : :):tbtsy ::eD5lirtguRetsy::: " sy:: ac:: lu::Cpfi(lir:: ::ieguRettbl:= :h:= :: " sy:: ac:: e: " sy:: ac:: ptbl::= :: " sy:: ac:: e: " sy:: ac:: ptbl::= :: " sy:: ac:5:a: :: :ya: :h:=) :hetr sy:: ac h : os:}ttac:5:asblst(tr sy:: tr stht:ay:mot:ay:l:: :ya: :hasblst:ay:glst:ay:gm::/ : :):tbtsy ::e":,svsysh :uRmtttth : m::/.i:r:5:5rhe:::. ::ie  m::/. sy:}: pte:/. sy: :) de:;re,::ysh :uRmtttth : sy:}tt:ay::;re,::y:;re:5rh:aatgth:iaf pte:/. syy:}tttp,:sytttp,:sy ac:: ptbl::= :: " sy:: ac:: e: " sy:: ac:: ptbl::5:t; :: : ea::ef :: ptre,:wa:;re,:l::5:t; :: : e :uhmel::te:/tem:d :ghtre, :: : e e :u]:5:=g ::r:aP
::tsy=  :aaP
'/ : :gu	::tB: e e :u5g,hayS: e: " sy:: ac:R::5:i: e e :u:s
ls:Da:en: :h:;re,:	f":::y]; m::5:== nrh1s) : :) : :h:;re,:	a:iem< e:gnhdnt(:: xO:: ptne::sy]; m::5:== nrh1s) : :) : :()hD5 i,hayShhD5ti :l:= 0,ga:sy::r; m:cttem::/ : :guR5t)tsy : :) rhD5 i,e:	dr/ : :ghemo(irse,::ysh :D5 i,e:	drtr/ : :ghe'el::te:	drt< e:gnhay: ed'ge":p ::ibs) : :e:	drte:	drt<) :retnt:ayyy:}t"e;re:0,gre,tgth:sy:e:	ihhayShhD5sir(iapex::ht		(iape0,gre,tgth:sy:ey::;re,::y:;re:5:5rhe:tte:/tire,::y:;re:5::: ptne:y:;re:5etir,d,uRmtt ::ie"::/d- :glse:;re(y:}t"e;re:0,gretnt:ayy::::ie"< 0,grh:sy:e:ay:;re,:l::5:t; :":p ::ib,grh}t"e;reglst:ay:eglss/.i:r:  		gd:fr:tbtsyt; :":p gth:sy: : :) : :h:;re,tne:fr:syt; :":p gth:syttne::/ : :ghdnt(i,;
::":p gth:sy: : :) : :h:;re,tl::5:itne:fr:syt; : : :) :y:}tt:ay::;re,::y:;:):tUth:i}ex:hsy : ::ire,:hsy : :) rhD5 i,:syn gth:yr:sath::,:pege":trthD5:itntiath::,:sa:e::5:a: :":trthD5:itntiath::ntia,dadtiatsy:: ac:hre 
mn/de :wPt:ay::re 
mn/de :wPt:ay::re:enent:e:mn/de :wi:r:  		gd:fr:tbtsyt; :":p gth1s) : :) :reitntiath::,:sa:ere,tgth : :) :ruRht:ay: :ghdnt1sregLt 		gd:fr:ruRhtth : :):::al lo'		::tdgd:fr:ruRhtth : e::/ : :):t
tsy :;re:,s,syar :uRhtttth : e::/s.:n:o varD5tie:: ::ire,e:,s,sy::: e : :):t
tsy :;rD5tietguRatsy::: e sy:: sy:: 	o::eese(tie:: ::irguRattar: f:":p :: e sy:: sy:: e: e sy:: sy:: ptar::p :: e sy:: sy:: e: e sy:: sy:: ptar::p :: e sy:: sy:5:t; :: :yt; :":p) :":tr sy:: syph : lo:}ttsy:5:tsaretntr sy:: tr sext:ay:ent:ay:r:: :yt; :"tsaret:ay:aret:ay:ae::/ : :):t
tsy :;re:,s,syar :uRhtttth : e::/s.:n:5::e"::::s ::al  e::/s sy:}: ptn:/s sy: :) 		:e xO::yar :uRhtttth : sy:}tt:ay::e xO::y:e x::e":	dt
th:iem ptn:/s syy:}ttt
m:syttt
m:sy sy:: ptar::p :: e sy:: sy:: e: e sy:: sy:: ptar::5: e :: ::er::vm :: pt xO:wa:e xO:r::5: e :: ::e :uhafu::tn:/tne:r :ght xO :: ::e e :u]:5: a :: :ddo::rsytC :	ddo'/ : :gu5::tB::e e :uqgmhayS: e: e sy:: sy:R::5:i::e e :u:(dre:Dd:fr; :":e xO:rse,::ysh e::5:   y
h1s) : :) : :":e xO:rd:ine< y grhrhe(:: os:: ptr ::=ysh e::5:   y
h1s) : :) : :tihD5	imhayShhD5	ii:r:  		gd:sy::rh e:yttne::/ : :guR titsy : :) rhD5	ime:5r / : :ghnen(ievxO::yar :D5	ime:5r t / : :ghn'fu::tn:5r t< y grhay: ed'gre:0 ::ias) : :e:5r tn:5r t<) :nttyt:ayyy:}t"ee x:		g xOt
th:sy:e:rinhayShhD5,ir(is
ls::hr55(is
l		g xOt
th:sy:ey::e xO::y:e x::::e"::etn:/ti xO::y:e x::::: ptr :y:e x::ntia,d,uRhtt ::ire,:/ds :ght	:e x(y:}t"ee x:		g xtyt:ayy::::ire< 		g h:sy:e:ay:e xO:r::5: e :e:0 ::ia	g h}t"ee xaret:ay:xares/s.:n:o vagr:sa:t
tsy e :e:0 
th:sy: : :) : :":e xOtr :sa:sy e :e:0 
th:syttr ::/ : :ghrhe(imel::e:0 
th:sy: : :) : :":e xOtr::5:itr :sa:sy e : : :) :y:}tt:ay::e xO::y:e:):teth:ibls:hsy : ::i xO:hsy : :) rhD5	im:syn 
th:ye:v}ex::O:0,gre,tgthD5:itrti}ex::O:v}:l::5:t; :e,tgthD5:itrti}ex::rti},dadti}esy:: sy:h r dar/dr :wPt:ay:: r dar/dr :wPt:ay:: r:fr mt;r:ar/dr :w.:n:o vagr:sa:t
tsy e :e:0 
th1s) : :) :ntitrti}ex::O:v}:l xOt
th : :) :nuRxt:ay: :ghrhe1s rgCt vagr:sa:nuRxtth : :):::rr 		'55::tdgr:sa:nuRxtth :  ::/ : :):t(tsy :e x:,e sy:  :uRxtttth :  ::/= :h:= 	reD5	ih:: ::i xOx:,e sy::: x : :):t(tsy :e D5	ihtguRetsy::: x sy:: sy:: an::lsva(	ih:: ::i guRettdn:ov:e:0 :: x sy:: sy:: e: x sy:: sy:: ptdn::0 :: x sy:: sy:: e: x sy:: sy:: ptdn::0 :: x sy:: sy:5: e :: :y e :e:0) :e,tg sy:: syrh : 		:}ttsy:5: sdnttytg sy:: tg slst:ay: mt:ay:n:: :y e :e sdntt:ay:	ntt:ay:	 ::/ : :):t(tsy :e x:,e sy:  :uRxtttth :  ::/= :h:5:;re,:::= ::rr   ::/= sy:}: ptr:/= sy: :)  0:f:os::y:  :uRxtttth : sy:}tt:ay::f:os::y:f:o:;re:5rt
th:ine ptr:/= syy:}tttda:sytttda:sy sy:: ptdn::0 :: x sy:: sy:: e: x sy:: sy:: ptdn::5:ef :: ::c ::le :: pt:os:wa:f:os:n::5:ef :: ::c :uhemo::tr:/tr :e :ght:os :: ::c c :u]:5:t	 :: :r	e::asype :5r	e'/ : :gu ::tB::c c :urgahayS: e: x sy:: sy:R::5:i::c c :u:sant:Dr:sae :e:f:os:evxO::yar  ::5:to rth1s) : :) : :e:f:os:er:ir < .igahe":(:: lo:: ptat:: yar  ::5:to rth1s) : :) : :: hD5:iahayShhD5ri.:n:o vagr:sy::rr  :yttr ::/ : :guR
t tsy : :) rhD5:iae::e:/ : :ghr m(ihgos::y:  :D5:iae::e:t:/ : :ghr'mo::tr::e:t< .igahay: ed'g x:	 ::ids) : :e::e:tr::e:t<) :hetrt:ayyy:}t"ef:o:vag:ost
th:sy:e:simhayShhD5 ir(i(dre::hp: (i(drvag:ost
th:sy:ey::f:os::y:f:o:;:;re,:ltr:/ti:os::y:f:o:;::: ptat:y:f:o:;rti},d,uRxtt ::i xO:/id :ght0:f:o(y:}t"ef:o:vag:otrt:ayy::::i x< vag:h:sy:e:ay:f:os:n::5:ef :x:	 ::idag:h}t"ef:o	ntt:ay:o	nts/= :h:= 	rge:v}:t(tsyef :x:	 
th:sy: : :) : :e:f:ostat:v}:syef :x:	 
th:syttat::/ : :ghe":(iafu::x:	 
th:sy: : :) : :e:f:ostn::5:itat:v}:syef : : :) :y:}tt:ay::f:os::y:f:):t.th:iare:hsy : ::i:os:hsy : :) rhD5:ia:syn 
th:yr:gbls::s:		g xOt
thD5:itatibls::s:gb:r::5: e :xOt
thD5:itatibls::atib,dadtiblsy:: sy:h   aea/i  :wPt:ay::   aea/i  :wPt:ay::  :sathte :ea/i  :w :h:= 	rge:v}:t(tsyef :x:	 
th1s) : :) :heitatibls::s:gb:r:ost
th : :) :huRst:ay: :ghe":1s  get 	rge:v}:huRstth : :)::: n ac': ::tdge:v}:huRstth : t::/ : :):tltsy :f:o:, asy=  :uRstttth : t::/ f:":p e rD5rin:: ::i:oso:, asy::: o : :):tltsy :f:D5rintguRItsy::: o sy:: sy:: sm::htge(rin:: ::i:guRIttrh:= :x:	 :: o sy:: sy:: e: o sy:: sy:: ptrh::	 :: o sy:: sy:: e: o sy:: sy:: ptrh::	 :: o sy:: sy:5:ef :: :yef :x:	) :xOt
 sy:: sy
h : ac:}ttsy:5:esrhetrt
 sy:: t
 sret:ay:tht:ay:h:: :yef :xesrhet:ay:5het:ay:5t::/ : :):tltsy :f:o:, asy=  :uRstttth : t::/ f:":5:e xO:::  :: n  t::/  sy:}: pta:/  sy: :) 25:m:lo::y=  :uRstttth : sy:}tt:ay::m:lo::y:m:l:e x::etmth:ir  pta:/  syy:}tttae:sytttae:sy sy:: ptrh::	 :: o sy:: sy:: e: o sy:: sy:: ptrh::5:vm :: ::e ::d  :: pt:lo:wa:m:lo:h::5:vm :: ::e :uhnen::ta:/tat:r :ght:lo :: ::e e :u]:5:r5 :: :e u::tsyhe ::e u'/ : :gu
::tB::e e :utgehayS: e: o sy:: sy:R::5:i::e e :u:aehe:De:v}f :x:m:lo:hgos::y:  t::5:r= rth1s) : :) : :x:m:lo:he:iat< s.g}hre,(:: 		:: pt}e::oy:  t::5:r= rth1s) : :) : :(phD5:iehayShhD5si :h:= 	rge:sy::r  t:yttat::/ : :guRltptsy : :) rhD5:iee:;r:/ : :ghath(inalo::y=  :D5:iee:;r:t:/ : :gha'en::ta:;r:t< s.g}hay: ed'g:o:v ::irs) : :e:;r:ta:;r:t<) :":trt:ayyy:}t"em:l:	rg:lotmth:sy:e:sithayShhD5eir(isant::h,;
(isan	rg:lotmth:sy:ey::m:lo::y:m:l:e:e xO:rta:/ti:lo::y:m:l:e::: pt}e:y:m:l:eatib,d,uRstt ::i:os:/ar :ght5:m:l(y:}t"em:l:	rg:ltrt:ayy::::i:o< 	rg:h:sy:e:ay:m:lo:h::5:vm :o:v ::irrg:h}t"em:l5het:ay:l5hes/ f:":p e gr:gb:tltsyvm :o:v mth:sy: : :) : :x:m:lot}e:gb:syvm :o:v mth:sytt}e::/ : :ghre,(iemo::o:v mth:sy: : :) : :x:m:loth::5:it}e:gb:syvm : : :) :y:}tt:ay::m:lo::y:m:):teth:idnt:hsy : ::i:lo:hsy : :) rhD5:ie:syn mth:y :aare::o:vag:ost
thD5:it}tiare::o:aa:n::5:ef :ost
thD5:it}tiare::}tia,dadtiarsy:: sy:h : en}/a: :wPt:ay:: : en}/a: :wPt:ay:: ::v}extf::n}/a: :wf:":p e gr:gb:tltsyvm :o:v mth1s) : :) :":it}tiare::o:aa:n:lotmth : :) :"uRet:ay: :ghre,1s :glt e gr:gb:"uRetth : :)::: h sy';
::tdgr:gb:"uRetth : e::/ : :):t	tsy :m:l:,	tsy * :uRetttth : e::/ov:e:0 p  D5sim:: ::i:lol:,	tsy::: l : :):t	tsy :m:D5simtguR	tsy::: l sy:: sy:: sh::htaI(sim:: ::i:guR	tte":pe:o:v :: l sy:: sy:: e: l sy:: sy:: pte"::v :: l sy:: sy:: e: l sy:: sy:: pte"::v :: l sy:: sy:5:vm :: :yvm :o:v) :ost
 sy:: syth : sy:}ttsy:5:vse":trt
 sy:: t
 sntt:ay:ext:ay:":: :yvm :ovse":t:ay::":t:ay::e::/ : :):t	tsy :m:l:,	tsy * :uRetttth : e::/ov:e:5:f:os:::o :: h  e::/o sy:}: pt}:/o sy: :) eq:e:		::y * :uRetttth : sy:}tt:ay::e:		::y:e:	:f:o:;rt;th:iat pt}:/o syy:}ttten:syttten:sy sy:: pte"::v :: l sy:: sy:: e: l sy:: sy:: pte"::5:le :: ::y ::dt :: pt:		:wa:e:		:"::5:le :: ::y :uhr m::t}:/t}e:  :ght:		 :: ::y y :u]:5:a: :: :r2l:: syva :;r2l'/ : :gul::tB::y y :u:gnhayS: e: l sy:: sy:R::5:i::y y :u:	f"::Dr:gbm :o:e:		:nalo::y=  e::5:ap gth1s) : :) : :o:e:		:nr:i}e< = gbh xO(:: ac:: ptbl::=y=  e::5:ap gth1s) : :) : :nrhD5:inhayShhD5sif:":p e gr:sy::r  e:ytt}e::/ : :guRutrtsy : :) rhD5:ine:e :/ : :gh}ex(im			::y * :D5:ine:e :t:/ : :gh}' m::t}:e :t< = gbhay: ed'g:l:	 ::ies) : :e:e :t}:e :t<) :e,tgt:ayyy:}t"ee:	:e g:		t;th:sy:e:eiphayShhD5lir(iaehe::hmel(iaehe g:		t;th:sy:ey::e:		::y:e:	:f:f:os:nt}:/ti:		::y:e:	:f::: ptbl:y:e:	:f}tia,d,uRett ::i:lo:/re :ghrq:e:	(y:}t"ee:	:e g:	tgt:ayy::::i:l< e g:h:sy:e:ay:e:		:"::5:le :l:	 ::ie g:h}t"ee:	:":t:ay:	:":s/ov:e:0 p g :aa:t	tsyle :l:	 ;th:sy: : :) : :o:e:		tbl:aa:syle :l:	 ;th:syttbl::/ : :gh xO(inen::l:	 ;th:sy: : :) : :o:e:		t"::5:itbl:aa:syle : : :) :y:}tt:ay::e:		::y:e:):tpth:irhe:hsy : ::i:		:hsy : :) rhD5:in:syn ;th:y::	dnt::	:	rg:lotmthD5:itbtidnt::	:	d:h::5:vm :lotmthD5:itbtidnt::btid,dadtidnsy:: sy:h : frb/r: :wPt:ay:: : frb/r: :wPt:ay:: ::gblstm::rb/r: :wv:e:0 p g :aa:t	tsyle :l:	 ;th1s) : :) :e,itbtidnt::	:	d:h:		t;th : :) :euRtt:ay: :gh xO1s :ght p g :aa:euRttth : :)::: " sy'el::tdg :aa:euRttth : l::/ : :):t)tsy :e:	:,:=syh( :uRttttth : l::/= :x:	 i :D5sit:: ::i:			:,:=sy::: 	 : :):t)tsy :e:D5sittguR5tsy::: 	 sy:: sy:: sx::ht		(sit:: ::i:guR5ttre:0,:l:	 :: 	 sy:: sy:: e: 	 sy:: sy:: ptre::	 :: 	 sy:: sy:: e: 	 sy:: sy:: ptre::	 :: 	 sy:: sy:5:le :: :yle :l:	) :lotm sy:: syth : sy:}ttsy:5:lsre,tgtm sy:: tm shet:ay:lst:ay:e:: :yle :llsre,t:ay:;e,t:ay:;l::/ : :):t)tsy :e:	:,:=syh( :uRttttth : l::/= :x:5:m:lo:::= :: "  l::/= sy:}: ptb:/= sy: :) er: :ac::yh( :uRttttth : sy:}tt:ay:: :ac::y: :a:m:l:e tUth:i}e ptb:/= syy:}tttfr:sytttfr:sy sy:: ptre::	 :: 	 sy:: sy:: e: 	 sy:: sy:: ptre::5:d  :: ::. ::ie :: pt:ac:wa: :ac:e::5:d  :: ::. :uhath::tb:/tbl:: :ght:ac :: ::. . :u]:5:t; :: : ea::esyrd :e ea'/ : :guu::tB::. . :u grhayS: e: 	 sy:: sy:R::5:i::. . :u:rse,:D :aae :l: :ac:m			::y * l::5:t0 
th1s) : :) : :l: :ac:m :ibl<  fgah:os(:: sy:: ptar::py * l::5:t0 
th1s) : :) : :y
hD5:irhayShhD5eiv:e:0 p g :sy::r* l:yttbl::/ : :guRot
tsy : :) rhD5:ire:f::/ : :ghbls(it5ac::yh( :D5:ire:f::t:/ : :ghb'th::tb:f::t<  fgahay: ed'g:	:e ::irs) : :e:f::tb:f::t<) :xOt
t:ayyy:}t"e :a:p g:actUth:sy:e: i,hayShhD5tir(i	f":::hafu(i	f"p g:actUth:sy:ey:: :ac::y: :a:m:m:lo:htb:/ti:ac::y: :a:m::: ptar:y: :a:mbtid,d,uRttt ::i:		:/ r :ghpr: :a(y:}t"e :a:p g:at
t:ayy::::i:	< p g:h:sy:e:ay: :ac:e::5:d  :	:e ::ir g:h}t"e :a;e,t:ay:a;e,s/= :x:	 i g::	d:t)tsyd  :	:e Uth:sy: : :) : :l: :actar:	d:syd  :	:e Uth:syttar::/ : :gh:os(ir m::	:e Uth:sy: : :) : :l: :acte::5:itar:	d:syd  : : :) :y:}tt:ay:: :ac::y: :):toth:ie"::hsy : ::i:ac:hsy : :) rhD5:ir:syn Uth:y::5rhe::c:e g:		t;thD5:itatirhe::c:5r:"::5:le :		t;thD5:itatirhe::atir,dadtirhsy:: sy:h : saa/ : :wPt:ay:: : saa/ : :wPt:ay:: ::aarete::aa/ : :w :x:	 i g::	d:t)tsyd  :	:e Uth1s) : :) :xOitatirhe::c:5r:":actUth : :) :xuRet:ay: :gh:os1s :ght i g::	d:xuRetth : :)::: e sy'fu::tdg::	d:xuRetth : r::/ : :):titsy : :a:,: sy o :uRetttth : r::/pe:o:v ; :D5eip:: ::i:aca:,: sy::: a : :):titsy : :D5eiptguR tsy::: a sy:: sy:: ss::hr55(eip:: ::i:guR tt x:		:	:e :: a sy:: sy:: e: a sy:: sy:: pt x::e :: a sy:: sy:: e: a sy:: sy:: pt x::e :: a sy:: sy:5:d  :: :yd  :	:e) :		t; sy:: syth : sy:}ttsy:5:ds xOt
t; sy:: t; s":t:ay:ret:ay:x:: :yd  :	ds xOt:ay:exOt:ay:er::/ : :):titsy : :a:,: sy o :uRetttth : r::/pe:o:5:e:		:::p :: e  r::/p sy:}: pta:/p sy: :) ct:t:sy::y o :uRetttth : sy:}tt:ay::t:sy::y:t:s:e:	:f:teth:ibl pta:/p syy:}tttsa:sytttsa:sy sy:: pt x::e :: a sy:: sy:: e: a sy:: sy:: pt x::5:dt :: ::s ::al :: pt:sy:wa:t:sy:x::5:dt :: ::s :uh}ex::ta:/tar:: :ght:sy :: ::s s :u]:5: e :: ::er::vsyva :f:er'/ : :guo::tB::s s :uigahayS: e: a sy:: sy:R::5:i::s s :u:evxO:D::	d  :	:t:sy:t5ac::yh( r::5: 	 
th1s) : :) : :	:t:sy:t::iar< ovgdh:lo(:: sy:: ptdn::0yh( r::5: 	 
th1s) : :) : :rthD5:iahayShhD5 i :x:	 i g::sy::r( r:yttar::/ : :guRntttsy : :) rhD5:iae:m::/ : :ghare(ip:sy::y o :D5:iae:m::t:/ : :gha'ex::ta:m::t< ovgdhay: ed'g:a:p ::i s) : :e:m::ta:m::t<) :ost
t:ayyy:}t"et:s:i g:syteth:sy:e:	imhayShhD5	ir(irse,::hemo(irsei g:syteth:sy:ey::t:sy::y:t:s:e:e:		:"ta:/ti:sy::y:t:s:e::: ptdn:y:t:s:eatir,d,uRett ::i:ac:/   :gh,t:t:s(y:}t"et:s:i g:st
t:ayy::::i:a< i g:h:sy:e:ay:t:sy:x::5:dt :a:p ::i  g:h}t"et:sexOt:ay:sexOs/pe:o:v ; g::5r:titsydt :a:p eth:sy: : :) : :	:t:sytdn:5r:sydt :a:p eth:syttdn::/ : :gh:lo(iath::a:p eth:sy: : :) : :	:t:sytx::5:itdn:5r:sydt : : :) :y:}tt:ay::t:sy::y:t:):t	th:ire,:hsy : ::i:sy:hsy : :) rhD5:ia:syn eth:y:::e":::y:p g:actUthD5:itdtie":::y::e:e::5:d  :actUthD5:itdtie":::dtie,dadtie"sy:: sy:h : v}d/ : :wPt:ay:: : v}d/ : :wPt:ay:: ::	dntt ::}d/ : :we:o:v ; g::5r:titsydt :a:p eth1s) : :) :ositdtie":::y::e:e:syteth : :) :ouR:t:ay: :gh:lo1s :ght ; g::5r:ouR:tth : :)::: x sy'mo::tdg::5r:ouR:tth : n::/ : :):t tsy :t:s:,:tsy=  :uR:tttth : n::/0,:l:	 h :D5 i,:: ::i:sys:,:tsy::: s : :):t tsy :t:D5 i,tguR
tsy::: s sy:: sy:: se::hp: ( i,:: ::i:guR
tt:o:va:a:p :: s sy:: sy:: e: s sy:: sy:: pt:o::p :: s sy:: sy:: e: s sy:: sy:: pt:o::p :: s sy:: sy:5:dt :: :ydt :a:p) :actU sy:: syth : sy:}ttsy:5:ds:ost
tU sy:: tU se,t:ay:ntt:ay:o:: :ydt :ads:ost:ay:fost:ay:fn::/ : :):t tsy :t:s:,:tsy=  :uR:tttth : n::/0,:l:5: :ac:::0 :: x  n::/0 sy:}: ptd:/0 sy: :) e::e:sy::y=  :uR:tttth : sy:}tt:ay::e:sy::y:e:s: :a:m:t.th:iar ptd:/0 syy:}tttv}:sytttv}:sy sy:: pt:o::p :: s sy:: sy:: e: s sy:: sy:: pt:o::5:ie :: ::= ::rr :: pt:sy:wa:e:sy:o::5:ie :: ::= :uhbls::td:/tdn:: :ght:sy :: ::= = :u]:5:ef :: ::c ::lsy,e :m:c '/ : :gun::tB::= = :u.g}hayS: e: s sy:: sy:R::5:i::= = :u:hgos:D::5rt :a:e:sy:p:sy::y o n::5:ev mth1s) : :) : :a:e:sy:p::idn< = grh:		(:: sy:: ptrh::	y o n::5:ev mth1s) : :) : :rthD5:i}hayShhD5	ie:o:v ; g::sy::ro n:yttdn::/ : :guRmtttsy : :) rhD5:i}e:e::/ : :ghdnt(i,;sy::y=  :D5:i}e:e::t:/ : :ghd'ls::td:e::t< = grhay: ed'g:s:i ::i:s) : :e:e::td:e::t<) :lotmt:ayyy:}t"ee:s:; g:syt.th:sy:e::iahayShhD5rir(ievxO::hnen(ievx; g:syt.th:sy:ey::e:sy::y:e:s: : :ac:etd:/ti:sy::y:e:s: ::: ptrh:y:e:s: dtie,d,uR:tt ::i:sy:/ : :ghm::e:s(y:}t"ee:s:; g:stmt:ayy::::i:s< ; g:h:sy:e:ay:e:sy:o::5:ie :s:i ::i: g:h}t"ee:sfost:ay:sfoss/0,:l:	 h g:::e:t tsyie :s:i .th:sy: : :) : :a:e:sytrh::e:syie :s:i .th:syttrh::/ : :gh:		(i}ex::s:i .th:sy: : :) : :a:e:syto::5:itrh::e:syie : : :) :y:}tt:ay::e:sy::y:e:):tbth:i xO:hsy : ::i:sy:hsy : :) rhD5:i}:syn .th:y::;re,::y:i g:sytethD5:itrtire,::y:;r:x::5:dt :sytethD5:itrtire,::rtir,dadtiresy:: sy:h : gbr/ : :wPt:ay:: : gbr/ : :wPt:ay:: ::5rhett::br/ : :w,:l:	 h g:::e:t tsyie :s:i .th1s) : :) :loitrtire,::y:;r:x:syt.th : :) :luR,t:ay: :gh:		1s :ght h g:::e:luR,tth : :)::: o sy'en::tdg:::e:luR,tth : h::/ : :):tptsy :e:s:,:rsytC :uR,tttth : h::/		:	:e r :D5	im:: ::i:sys:,:rsy::: s : :):tptsy :e:D5	imtguRltsy::: s sy:: sy:: st::h,;
(	im:: ::i:guRltt:l:	r:s:i :: s sy:: sy:: e: s sy:: sy:: pt:l::i :: s sy:: sy:: e: s sy:: sy:: pt:l::i :: s sy:: sy:5:ie :: :yie :s:i) :syte sy:: syth : sy:}ttsy:5:is:lotmte sy:: te sxOt:ay:het:ay:l:: :yie :sis:lot:ay:mlot:ay:mh::/ : :):tptsy :e:s:,:rsytC :uR,tttth : h::/		:	:5:t:sy:::	 :: o  h::/	 sy:}: ptr:/	 sy: :) y :l:sy::ytC :uR,tttth : sy:}tt:ay::l:sy::y:l:s:t:s:e:teth:idn ptr:/	 syy:}tttgb:sytttgb:sy sy:: pt:l::i :: s sy:: sy:: e: s sy:: sy:: pt:l::5:al :: ::  :: n :: pt:sy:wa:l:sy:l::5:al :: ::  :uhare::tr:/trh:: :ght:sy :: ::    :u]:5:vm :: ::e ::dsy f :e:e '/ : :gum::tB::    :u gbhayS: e: s sy:: sy:R::5:i::    :u:nalo:D:::ee :s:l:sy:,;sy::y=  h::5:v	 ;th1s) : :) : :s:l:sy:,::irh< pegeh:ac(:: sy:: pte"::vy=  h::5:v	 ;th1s) : :) : :gthD5:ibhayShhD5:i,:l:	 h g::sy::r  h:yttrh::/ : :guRhtttsy : :) rhD5:ibe: ::/ : :ghrhe(imesy::ytC :D5:ibe: ::t:/ : :ghr're::tr: ::t< pegehay: ed'g:s:; ::i:s) : :e: ::tr: ::t<) :		t;t:ayyy:}t"el:s:h g:syteth:sy:e::iehayShhD5sir(ihgos::hr m(ihgoh g:syteth:sy:ey::l:sy::y:l:s:t:t:sy:xtr:/ti:sy::y:l:s:t::: pte":y:l:s:trtir,d,uR,tt ::i:sy:/ : :gha :l:s(y:}t"el:s:h g:st;t:ayy::::i:s< h g:h:sy:e:ay:l:sy:l::5:al :s:; ::i: g:h}t"el:smlot:ay:smlos/		:	:e r g::;r:tptsyal :s:; eth:sy: : :) : :s:l:syte":;r:syal :s:; eth:sytte"::/ : :gh:ac(ibls::s:; eth:sy: : :) : :s:l:sytl::5:ite":;r:syal : : :) :y:}tt:ay::l:sy::y:l:):t
th:i:os:hsy : ::i:sy:hsy : :) rhD5:ib:syn eth:y::e xO::y:; g:syt.thD5:iteti xO::y:e :o::5:ie :syt.thD5:iteti xO::eti ,dadti xsy:: sy:h : aae/ : :wPt:ay:: : aae/ : :wPt:ay:: :::e":te::ae/ : :w	:	:e r g::;r:tptsyal :s:; eth1s) : :) :		iteti xO::y:e :o:syteth : :) :	uROt:ay: :gh:ac1s :ght r g::;r:	uROtth : :)::: l sy' m::tdg::;r:	uROtth : "::/ : :):trtsy :l:s:,:asype :uROtttth : "::/va:a:p   :D5:ia:: ::i:sys:,:asy::: s : :):trtsy :l:D5:iatguRutsy::: s sy:: sy:: se::hmel(:ia:: ::i:guRutt:	:e :s:; :: s sy:: sy:: e: s sy:: sy:: pt:	::; :: s sy:: sy:: e: s sy:: sy:: pt:	::; :: s sy:: sy:5:al :: :yal :s:;) :syt. sy:: syth : sy:}ttsy:5:as:		t;t. sy:: t. sost:ay:":t:ay:	:: :yal :sas:		t:ay:e		t:ay:e"::/ : :):trtsy :l:s:,:asype :uROtttth : "::/va:a:5:e:sy:::v :: l  "::/v sy:}: pte:/v sy: :) .i:r:sy::ype :uROtttth : sy:}tt:ay::r:sy::y:r:s:e:s: :tpth:irh pte:/v syy:}tttaa:sytttaa:sy sy:: pt:	::; :: s sy:: sy:: e: s sy:: sy:: pt:	::5:rr :: ::o :: h :: pt:sy:wa:r:sy:	::5:rr :: ::o :uhdnt::te:/te":: :ght:sy :: ::o o :u]:5:le :: ::y ::dsyas : :y '/ : :guh::tB::o o :ufgahayS: e: s sy:: sy:R::5:i::o o :u:m			:D::;rl :s:r:sy:mesy::ytC "::5:le Uth1s) : :) : :s:r:sy:m::ie"< 0,grh:sy(:: sy:: ptre::	ytC "::5:le Uth1s) : :) : :
thD5:iahayShhD5:i	:	:e r g::sy::rC ":ytte"::/ : :guRxtttsy : :) rhD5:iae:t::/ : :ghe":(iafsy::ype :D5:iae:t::t:/ : :ghe'nt::te:t::t< 0,grhay: ed'g:s:h ::i:s) : :e:t::te:t::t<) :actUt:ayyy:}t"er:s:r g:sytpth:sy:e::inhayShhD5sir(inalo::hath(inalr g:sytpth:sy:ey::r:sy::y:r:s:e:e:sy:ote:/ti:sy::y:r:s:e::: ptre:y:r:s:eeti ,d,uROtt ::i:sy:/ : :ghei:r:s(y:}t"er:s:r g:stUt:ayy::::i:s< r g:h:sy:e:ay:r:sy:	::5:rr :s:h ::i: g:h}t"er:se		t:ay:se		s/va:a:p   g::e :trtsyrr :s:h pth:sy: : :) : :s:r:sytre:e :syrr :s:h pth:syttre::/ : :gh:sy(iare::s:h pth:sy: : :) : :s:r:syt	::5:itre:e :syrr : : :) :y:}tt:ay::r:sy::y:r:):t(th:i:lo:hsy : ::i:sy:hsy : :) rhD5:ia:syn pth:y::f:os::y:h g:sytethD5:itrti:os::y:f::l::5:al :sytethD5:itrti:os::rti:,dadti:osy:: sy:h : 	dr/ : :wPt:ay:: : 	dr/ : :wPt:ay:: ::;re,tl::dr/ : :wa:a:p   g::e :trtsyrr :s:h pth1s) : :) :acitrti:os::y:f::l:sytpth : :) :auRst:ay: :gh:sy1s :ght   g::e :auRstth : :)::: 	 sy'th::tdg::e :auRstth : e::/ : :):t
tsy :r:s:,:tsyhe :uRstttth : e::/	r:s:i   :D5:ie:: ::i:sys:,:tsy::: s : :):t
tsy :r:D5:ietguRotsy::: s sy:: sy:: s:::hafu(:ie:: ::i:guRott:a:p :s:h :: s sy:: sy:: e: s sy:: sy:: pt:a::h :: s sy:: sy:: e: s sy:: sy:: pt:a::h :: s sy:: sy:5:rr :: :yrr :s:h) :syte sy:: syth : sy:}ttsy:5:rs:actUte sy:: te slot:ay:e,t:ay:a:: :yrr :srs:act:ay: act:ay: e::/ : :):t
tsy :r:s:,:tsyhe :uRstttth : e::/	r:s:5:l:sy:::	 :: 	  e::/	 sy:}: ptr:/	 sy: :) s.:n:sy::yhe :uRstttth : sy:}tt:ay::n:sy::y:n:s:l:s:t:toth:ie" ptr:/	 syy:}ttt	d:syttt	d:sy sy:: pt:a::h :: s sy:: sy:: e: s sy:: sy:: pt:a::5: n :: ::= :: " :: pt:sy:wa:n:sy:a::5: n :: ::= :uhrhe::tr:/tre:: :ght:sy :: ::= = :u]:5:d  :: ::. ::isytv :t:. '/ : :gux::tB::= = :uvgdhayS: e: s sy:: sy:R::5:i::= = :u:t5ac:D::e r :s:n:sy:afsy::ype e::5:dp eth1s) : :) : :s:n:sy:a::ire< 		g h:sy(:: sy:: pt x::eype e::5:dp eth1s) : :) : :
thD5:idhayShhD5:ia:a:p   g::sy::re e:yttre::/ : :guRstttsy : :) rhD5:ide:e::/ : :ghre,(iemsy::yhe :D5:ide:e::t:/ : :ghr'he::tr:e::t< 		g hay: ed'g:s:r ::i:s) : :e:e::tr:e::t<) :sytet:ayyy:}t"en:s:  g:sytoth:sy:e::irhayShhD5eir(im			::h}ex(im		  g:sytoth:sy:ey::n:sy::y:n:s:l:l:sy:ltr:/ti:sy::y:n:s:l::: pt x:y:n:s:lrti:,d,uRstt ::i:sy:/ : :ghn.:n:s(y:}t"en:s:  g:stet:ayy::::i:s<   g:h:sy:e:ay:n:sy:a::5: n :s:r ::i: g:h}t"en:s act:ay:s acs/	r:s:i   g::f::t
tsy n :s:r oth:sy: : :) : :s:n:syt x:f::sy n :s:r oth:sytt x::/ : :gh:sy(idnt::s:r oth:sy: : :) : :s:n:syta::5:it x:f::sy n : : :) :y:}tt:ay::n:sy::y:n:):tlth:i:		:hsy : ::i:sy:hsy : :) rhD5:id:syn oth:y::m:lo::y:r g:sytpthD5:it ti:lo::y:m::	::5:rr :sytpthD5:it ti:lo:: ti:,dadti:lsy:: sy:h : 5r / : :wPt:ay:: : 5r / : :wPt:ay:: ::e xOtr::r / : :wr:s:i   g::f::t
tsy n :s:r oth1s) : :) :syit ti:lo::y:m::	:sytoth : :) :suRot:ay: :gh:sy1s :ght   g::f::suRotth : :)::: a sy'ex::tdg::f::suRotth : x::/ : :):tttsy :n:s:,: syva :uRotttth : x::/e :s:; * :D5:in:: ::i:sys:,: sy::: s : :):tttsy :n:D5:intguRntsy::: s sy:: sy:: s,::hemo(:in:: ::i:guRntt:s:i :s:r :: s sy:: sy:: e: s sy:: sy:: pt:s::r :: s sy:: sy:: e: s sy:: sy:: pt:s::r :: s sy:: sy:5: n :: :y n :s:r) :sytp sy:: syth : sy:}ttsy:5: s:sytetp sy:: tp s		t:ay:xOt:ay:s:: :y n :s s:syt:ay:tsyt:ay:tx::/ : :):tttsy :n:s:,: syva :uRotttth : x::/e :s:5:r:sy:::e :: a  x::/e sy:}: pt :/e sy: :) = :h:sy::yva :uRotttth : sy:}tt:ay::h:sy::y:h:s:r:s:e:t	th:ire pt :/e syy:}ttt5r:syttt5r:sy sy:: pt:s::r :: s sy:: sy:: e: s sy:: sy:: pt:s::5: h :: ::p :: e :: pt:sy:wa:h:sy:s::5: h :: ::p :uhe":::t :/t x:: :ght:sy :: ::p p :u]:5:dt :: ::s ::asy=g :e:s '/ : :gus::tB::p p :u grhayS: e: s sy:: sy:R::5:i::p p :u:p:sy:D::f:n :s:h:sy:emsy::yhe x::5:di .th1s) : :) : :s:h:sy:e::i x< vag:h:sy(:: sy:: pt:o::pyhe x::5:di .th1s) : :) : :mthD5:irhayShhD5:ir:s:i   g::sy::re x:ytt x::/ : :guRetttsy : :) rhD5:ire:l::/ : :gh xO(inesy::yva :D5:ire:l::t:/ : :gh '":::t :l::t< vag:hay: ed'g:s:  ::i:s) : :e:l::t :l::t<) :syt.t:ayyy:}t"eh:s:  g:syt	th:sy:e::iahayShhD5 ir(it5ac::hbls(it5a  g:syt	th:sy:ey::h:sy::y:h:s:r:r:sy:	t :/ti:sy::y:h:s:r::: pt:o:y:h:s:r ti:,d,uRott ::i:sy:/ : :ghr :h:s(y:}t"eh:s:  g:st.t:ayy::::i:s<   g:h:sy:e:ay:h:sy:s::5: h :s:  ::i: g:h}t"eh:stsyt:ay:stsys/e :s:; * g::m::tttsy h :s:  	th:sy: : :) : :s:h:syt:o:m::sy h :s:  	th:sytt:o::/ : :gh:sy(irhe::s:  	th:sy: : :) : :s:h:syts::5:it:o:m::sy h : : :) :y:}tt:ay::h:sy::y:h:):t	th:i:ac:hsy : ::i:sy:hsy : :) rhD5:ir:syn 	th:y::e:		::y:  g:sytothD5:it:ti:		::y:e::a::5: n :sytothD5:it:ti:		:::ti:,dadti:	sy:: sy:h : :e:/ : :wPt:ay:: : :e:/ : :wPt:ay:: ::f:ostn::e:/ : :w :s:; * g::m::tttsy h :s:  	th1s) : :) :syit:ti:		::y:e::a:syt	th : :) :suR	t:ay: :gh:sy1s :ght * g::m::suR	tth : :)::: s sy'ls::tdg::m::suR	tth : o::/ : :):tttsy :h:s:,:esyrd :uR	tttth : o::/p :s:h ( :D5:ir:: ::i:sys:,:esy::: s : :):tttsy :h:D5:irtguRmtsy::: s sy:: sy:: sO::hnen(:ir:: ::i:guRmtt:s:; :s:  :: s sy:: sy:: e: s sy:: sy:: pt:s::  :: s sy:: sy:: e: s sy:: sy:: pt:s::  :: s sy:: sy:5: h :: :y h :s: ) :syto sy:: syth : sy:}ttsy:5: s:syt.to sy:: to sact:ay:ost:ay:s:: :y h :s s:syt:ay:esyt:ay:eo::/ : :):tttsy :h:s:,:esyrd :uR	tttth : o::/p :s:5:n:sy:::p :: s  o::/p sy:}: pt::/p sy: :)  f:":sy::yrd :uR	tttth : sy:}tt:ay::":sy::y:":s:n:s:l:tbth:i x pt::/p syy:}ttt:e:syttt:e:sy sy:: pt:s::  :: s sy:: sy:: e: s sy:: sy:: pt:s::5: " :: ::0 :: x :: pt:sy:wa:":sy:s::5: " :: ::0 :uhre,::t::/t:o:: :ght:sy :: ::0 0 :u]:5:ie :: ::= ::rsy a :l:= '/ : :gue::tB::0 0 :uegehayS: e: s sy:: sy:R::5:i::0 0 :u:,;sy:D::m:h :s:":sy:nesy::yva o::5:i; eth1s) : :) : :s:":sy:n::i:o< 	rg:h:sy(:: sy:: pt:l::iyva o::5:i; eth1s) : :) : :;thD5:iehayShhD5:i :s:; * g::sy::ra o:ytt:o::/ : :guRttttsy : :) rhD5:iee:r::/ : :gh:os(ir sy::yrd :D5:iee:r::t:/ : :gh:'e,::t::r::t< 	rg:hay: ed'g:s:  ::i:s) : :e:r::t::r::t<) :sytet:ayyy:}t"e":s:* g:sytbth:sy:e::i}hayShhD5	ir(ip:sy::hare(ip:s* g:sytbth:sy:ey::":sy::y:":s:n:n:sy:at::/ti:sy::y:":s:n::: pt:l:y:":s:n:ti:,d,uR	tt ::i:sy:/ : :ghaf:":s(y:}t"e":s:* g:stet:ayy::::i:s< * g:h:sy:e:ay:":sy:s::5: " :s:  ::i: g:h}t"e":sesyt:ay:sesys/p :s:h ( g::e::tttsy " :s:  bth:sy: : :) : :s:":syt:l:e::sy " :s:  bth:sytt:l::/ : :gh:sy(ie":::s:  bth:sy: : :) : :s:":syts::5:it:l:e::sy " : : :) :y:}tt:ay::":sy::y:":):t)th:i:sy:hsy : ::i:sy:hsy : :) rhD5:ie:syn bth:y:: :ac::y:  g:syt	thD5:it:ti:ac::y: ::s::5: h :syt	thD5:it:ti:ac:::ti:,dadti:asy:: sy:h : ;r:/ : :wPt:ay:: : ;r:/ : :wPt:ay:: ::m:loth::r:/ : :w :s:h ( g::e::tttsy " :s:  bth1s) : :) :syit:ti:ac::y: ::s:sytbth : :) :suRct:ay: :gh:sy1s :ght ( g::e::suRctth : :)::: s sy're::tdg::e::suRctth : l::/ : :):tttsy :":s:,:vsyva :uRctttth : l::/i :s:r o :D5:ia:: ::i:sys:,:vsy::: s : :):tttsy :":D5:iatguRhtsy::: s sy:: sy:: ss::hr m(:ia:: ::i:guRhtt:s:h :s:  :: s sy:: sy:: e: s sy:: sy:: pt:s::  :: s sy:: sy:: e: s sy:: sy:: pt:s::  :: s sy:: sy:5: " :: :y " :s: ) :syt	 sy:: syth : sy:}ttsy:5: s:sytet	 sy:: t	 ssyt:ay:lot:ay:s:: :y " :s s:syt:ay:lsyt:ay:ll::/ : :):tttsy :":s:,:vsyva :uRctttth : l::/i :s:5:h:sy:::i :: s  l::/i sy:}: pt::/i sy: :) ov:e:sy::yva :uRctttth : sy:}tt:ay::e:sy::y:e:s:h:s:r:t
th:i:o pt::/i syy:}ttt;r:syttt;r:sy sy:: pt:s::  :: s sy:: sy:: e: s sy:: sy:: pt:s::5: e :: ::	 :: o :: pt:sy:wa:e:sy:s::5: e :: ::	 :uh xO::t::/t:l:: :ght:sy :: ::	 	 :u]:5:al :: ::  :: syt	 :r:  '/ : :gut::tB::	 	 :u,grhayS: e: s sy:: sy:R::5:i::	 	 :u:mesy:D::e:" :s:e:sy:r sy::yrd l::5:ah pth1s) : :) : :s:e:sy:r::i:l< e g:h:sy(:: sy:: pt:	::;yrd l::5:ah pth1s) : :) : :UthD5:irhayShhD5:i :s:h ( g::sy::rd l:ytt:l::/ : :guRetttsy : :) rhD5:ire:n::/ : :gh:lo(iatsy::yva :D5:ire:n::t:/ : :gh:'xO::t::n::t< e g:hay: ed'g:s:* ::i:s) : :e:n::t::n::t<) :sytpt:ayyy:}t"ee:s:( g:syt
th:sy:e::ibhayShhD5:ir(i,;sy::hdnt(i,;s( g:syt
th:sy:ey::e:sy::y:e:s:h:h:sy:st::/ti:sy::y:e:s:h::: pt:	:y:e:s:h:ti:,d,uRctt ::i:sy:/ : :gh}v:e:s(y:}t"ee:s:( g:stpt:ayy::::i:s< ( g:h:sy:e:ay:e:sy:s::5: e :s:* ::i: g:h}t"ee:slsyt:ay:slsys/i :s:r o g:: ::tttsy e :s:* 
th:sy: : :) : :s:e:syt:	: ::sy e :s:* 
th:sytt:	::/ : :gh:sy(ire,::s:* 
th:sy: : :) : :s:e:syts::5:it:	: ::sy e : : :) :y:}tt:ay::e:sy::y:e:):tith:i:sy:hsy : ::i:sy:hsy : :) rhD5:ir:syn 
th:y::t:sy::y:* g:sytbthD5:it:ti:sy::y:t::s::5: " :sytbthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : e :/ : :wPt:ay:: : e :/ : :wPt:ay:: ::e:		t":: :/ : :w :s:r o g:: ::tttsy e :s:* 
th1s) : :) :syit:ti:sy::y:t::s:syt
th : :) :suRyt:ay: :gh:sy1s :ght o g:: ::suRytth : :)::: s sy'nt::tdg:: ::suRytth : 	::/ : :):tttsy :e:s:,:lsy,e :uRytttth : 	::/; :s:    :D5:i}:: ::i:sys:,:lsy::: s : :):tttsy :e:D5:i}tguRxtsy::: s sy:: sy:: so::hath(:i}:: ::i:guRxtt:s:r :s:* :: s sy:: sy:: e: s sy:: sy:: pt:s::* :: s sy:: sy:: e: s sy:: sy:: pt:s::* :: s sy:: sy:5: e :: :y e :s:*) :sytb sy:: syth : sy:}ttsy:5: s:sytptb sy:: tb ssyt:ay:		t:ay:s:: :y e :s s:syt:ay:rsyt:ay:r	::/ : :):tttsy :e:s:,:lsy,e :uRytttth : 	::/; :s:5:":sy:::; :: s  	::/; sy:}: pt::/; sy: :) = :x:sy::y,e :uRytttth : sy:}tt:ay::x:sy::y:x:s:":s:n:t(th:i:l pt::/; syy:}ttte :syttte :sy sy:: pt:s::* :: s sy:: sy:: e: s sy:: sy:: pt:s::5: x :: ::v :: l :: pt:sy:wa:x:sy:s::5: x :: ::v :uh:os::t::/t:	:: :ght:sy :: ::v v :u]:5:rr :: ::o :: syr5 :n:o '/ : :gue::tB::v v :u	g hayS: e: s sy:: sy:R::5:i::v v :u:afsy:D:: :e :s:x:sy:atsy::yva 	::5:rr oth1s) : :) : :s:x:sy:a::i:	< p g:h:sy(:: sy:: pt:a::hyva 	::5:rr oth1s) : :) : :ethD5:i hayShhD5:i :s:r o g::sy::ra 	:ytt:	::/ : :guR:tttsy : :) rhD5:i e:h::/ : :gh:		(i}esy::y,e :D5:i e:h::t:/ : :gh:'os::t::h::t< p g:hay: ed'g:s:( ::i:s) : :e:h::t::h::t<) :sytot:ayyy:}t"ex:s:o g:syt(th:sy:e::iahayShhD5:ir(imesy::hrhe(imeso g:syt(th:sy:ey::x:sy::y:x:s:":":sy:st::/ti:sy::y:x:s:"::: pt:a:y:x:s:":ti:,d,uRytt ::i:sy:/ : :ghb :x:s(y:}t"ex:s:o g:stot:ayy::::i:s< o g:h:sy:e:ay:x:sy:s::5: x :s:( ::i: g:h}t"ex:srsyt:ay:srsys/; :s:    g::t::tttsy x :s:( (th:sy: : :) : :s:x:syt:a:t::sy x :s:( (th:sytt:a::/ : :gh:sy(i xO::s:( (th:sy: : :) : :s:x:syts::5:it:a:t::sy x : : :) :y:}tt:ay::x:sy::y:x:):t th:i:sy:hsy : ::i:sy:hsy : :) rhD5:i :syn (th:y::e:sy::y:( g:syt
thD5:it:ti:sy::y:e::s::5: e :syt
thD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : f::/ : :wPt:ay:: : f::/ : :wPt:ay:: :: :acte::::/ : :w :s:    g::t::tttsy x :s:( (th1s) : :) :syit:ti:sy::y:e::s:syt(th : :) :suRyt:ay: :gh:sy1s :ght   g::t::suRytth : :)::: s sy'he::tdg::t::suRytth : a::/ : :):tttsy :x:s:,:dsy f :uRytttth : a::/h :s:  C :D5:ib:: ::i:sys:,:dsy::: s : :):tttsy :x:D5:ibtguRstsy::: s sy:: sy:: s	::h}ex(:ib:: ::i:guRstt:s:  :s:( :: s sy:: sy:: e: s sy:: sy:: pt:s::( :: s sy:: sy:: e: s sy:: sy:: pt:s::( :: s sy:: sy:5: x :: :y x :s:() :syt
 sy:: syth : sy:}ttsy:5: s:sytot
 sy:: t
 ssyt:ay:act:ay:s:: :y x :s s:syt:ay:nsyt:ay:na::/ : :):tttsy :x:s:,:dsy f :uRytttth : a::/h :s:5:e:sy:::h :: s  a::/h sy:}: pt::/h sy: :) pe:o:sy::y f :uRytttth : sy:}tt:ay::o:sy::y:o:s:e:s:h:tlth:i:	 pt::/h syy:}tttf::sytttf::sy sy:: pt:s::( :: s sy:: sy:: e: s sy:: sy:: pt:s::5: o :: ::	 :: 	 :: pt:sy:wa:o:sy:s::5: o :: ::	 :uh:lo::t::/t:a:: :ght:sy :: ::	 	 :u]:5: n :: ::= :: sya: :h:= '/ : :gu:::tB::	 	 :uag:hayS: e: s sy:: sy:R::5:i::	 	 :u:emsy:D::t:x :s:o:sy:}esy::y,e a::5:   	th1s) : :) : :s:o:sy:}::i:a< i g:h:sy(:: sy:: pt:s::ry,e a::5:   	th1s) : :) : :.thD5:i:hayShhD5:i :s:    g::sy::re a:ytt:a::/ : :guR,tttsy : :) rhD5:i:e:"::/ : :gh:ac(iblsy::y f :D5:i:e:"::t:/ : :gh:'lo::t::"::t< i g:hay: ed'g:s:o ::i:s) : :e:"::t::"::t<) :syt	t:ayyy:}t"eo:s:  g:sytlth:sy:e::idhayShhD5:ir(iafsy::he":(iafs  g:sytlth:sy:ey::o:sy::y:o:s:e:e:sy:st::/ti:sy::y:o:s:e::: pt:s:y:o:s:e:ti:,d,uRytt ::i:sy:/ : :ghae:o:s(y:}t"eo:s:  g:st	t:ayy::::i:s<   g:h:sy:e:ay:o:sy:s::5: o :s:o ::i: g:h}t"eo:snsyt:ay:snsys/h :s:  C g::e::tttsy o :s:o lth:sy: : :) : :s:o:syt:s:e::sy o :s:o lth:sytt:s::/ : :gh:sy(i:os::s:o lth:sy: : :) : :s:o:syts::5:it:s:e::sy o : : :) :y:}tt:ay::o:sy::y:o:):tpth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn lth:y::l:sy::y:o g:syt(thD5:it:ti:sy::y:l::s::5: x :syt(thD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : m::/ : :wPt:ay:: : m::/ : :wPt:ay:: ::t:sytx::::/ : :w :s:  C g::e::tttsy o :s:o lth1s) : :) :syit:ti:sy::y:l::s:sytlth : :) :suRyt:ay: :gh:sy1s :ght C g::e::suRytth : :)::: s sy'":::tdg::e::suRytth : s::/ : :):tttsy :o:s:,:dsyas :uRytttth : s::/r :s:* e :D5:ia:: ::i:sys:,:dsy::: s : :):tttsy :o:D5:iatguRetsy::: s sy:: sy:: sc::hbls(:ia:: ::i:guRett:s:  :s:o :: s sy:: sy:: e: s sy:: sy:: pt:s::o :: s sy:: sy:: e: s sy:: sy:: pt:s::o :: s sy:: sy:5: o :: :y o :s:o) :syt( sy:: syth : sy:}ttsy:5: s:syt	t( sy:: t( ssyt:ay:syt:ay:s:: :y o :s s:syt:ay:hsyt:ay:hs::/ : :):tttsy :o:s:,:dsyas :uRytttth : s::/r :s:5:x:sy:::r :: s  s::/r sy:}: pt::/r sy: :) 0,:l:sy::yas :uRytttth : sy:}tt:ay::l:sy::y:l:s:x:s:":t	th:i:a pt::/r syy:}tttm::sytttm::sy sy:: pt:s::o :: s sy:: sy:: e: s sy:: sy:: pt:s::5: l :: ::e :: a :: pt:sy:wa:l:sy:s::5: l :: ::e :uh:		::t::/t:s:: :ght:sy :: ::e e :u]:5: h :: ::p :: syt; :":p '/ : :gu,::tB::e e :urg:hayS: e: s sy:: sy:R::5:i::e e :u:nesy:D::e:o :s:l:sy:blsy::y f s::5:   bth1s) : :) : :s:l:sy:b::i:s< ; g:h:sy(:: sy:: pt:s:: y f s::5:   bth1s) : :) : :ethD5:i:hayShhD5:i :s:  C g::sy::rf s:ytt:s::/ : :guROtttsy : :) rhD5:i:e:e::/ : :gh:sy(iarsy::yas :D5:i:e:e::t:/ : :gh:'		::t::e::t< ; g:hay: ed'g:s:  ::i:s) : :e:e::t::e::t<) :sytbt:ayyy:}t"el:s:C g:syt	th:sy:e::irhayShhD5:ir(iemsy::hre,(iemsC g:syt	th:sy:ey::l:sy::y:l:s:x:x:sy:st::/ti:sy::y:l:s:x::: pt:s:y:l:s:x:ti:,d,uRytt ::i:sy:/ : :ghd,:l:s(y:}t"el:s:C g:stbt:ayy::::i:s< C g:h:sy:e:ay:l:sy:s::5: l :s:  ::i: g:h}t"el:shsyt:ay:shsys/r :s:* e g::l::tttsy l :s:  	th:sy: : :) : :s:l:syt:s:l::sy l :s:  	th:sytt:s::/ : :gh:sy(i:lo::s:  	th:sy: : :) : :s:l:syts::5:it:s:l::sy l : : :) :y:}tt:ay::l:sy::y:l:):trth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn 	th:y::r:sy::y:  g:sytlthD5:it:ti:sy::y:r::s::5: o :sytlthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : e::/ : :wPt:ay:: : e::/ : :wPt:ay:: ::e:syto::::/ : :w :s:* e g::l::tttsy l :s:  	th1s) : :) :syit:ti:sy::y:r::s:syt	th : :) :suRyt:ay: :gh:sy1s :ght e g::l::suRytth : :)::: s sy'e,::tdg::l::suRytth : s::/ : :):tttsy :l:s:,:isytv :uRytttth : s::/  :s:( e :D5:id:: ::i:sys:,:isy::: s : :):tttsy :l:D5:idtguRttsy::: s sy:: sy:: sy::hare(:id:: ::i:guRttt:s:* :s:  :: s sy:: sy:: e: s sy:: sy:: pt:s::  :: s sy:: sy:: e: s sy:: sy:: pt:s::  :: s sy:: sy:5: l :: :y l :s: ) :sytl sy:: syth : sy:}ttsy:5: s:sytbtl sy:: tl ssyt:ay:syt:ay:s:: :y l :s s:syt:ay:"syt:ay:"s::/ : :):tttsy :l:s:,:isytv :uRytttth : s::/  :s:5:o:sy:::  :: s  s::/  sy:}: pt::/  sy: :) 		:	:sy::ytv :uRytttth : sy:}tt:ay::	:sy::y:	:s:o:s:e:t)th:i:s pt::/  syy:}ttte::syttte::sy sy:: pt:s::  :: s sy:: sy:: e: s sy:: sy:: pt:s::5: 	 :: ::p :: s :: pt:sy:wa:	:sy:s::5: 	 :: ::p :uh:ac::t::/t:s:: :ght:sy :: ::p p :u]:5: " :: ::0 :: sy e :e:0 '/ : :guO::tB::p p :u g:hayS: e: s sy:: sy:R::5:i::p p :u:r sy:D::l:l :s:	:sy:arsy::yas s::5: * 
th1s) : :) : :s:	:sy:a::i:s< h g:h:sy(:: sy:: pt:s:: yas s::5: * 
th1s) : :) : :pthD5:i:hayShhD5:i :s:* e g::sy::rs s:ytt:s::/ : :guRstttsy : :) rhD5:i:e:x::/ : :gh:sy(idnsy::ytv :D5:i:e:x::t:/ : :gh:'ac::t::x::t< h g:hay: ed'g:s:C ::i:s) : :e:x::t::x::t<) :syt
t:ayyy:}t"e	:s:e g:syt)th:sy:e::iehayShhD5:ir(inesy::h xO(inese g:syt)th:sy:ey::	:sy::y:	:s:o:o:sy:st::/ti:sy::y:	:s:o::: pt:s:y:	:s:o:ti:,d,uRytt ::i:sy:/ : :ghr	:	:s(y:}t"e	:s:e g:st
t:ayy::::i:s< e g:h:sy:e:ay:	:sy:s::5: 	 :s:C ::i: g:h}t"e	:s"syt:ay:s"sys/  :s:( e g::r::tttsy 	 :s:C )th:sy: : :) : :s:	:syt:s:r::sy 	 :s:C )th:sytt:s::/ : :gh:sy(i:		::s:C )th:sy: : :) : :s:	:syts::5:it:s:r::sy 	 : : :) :y:}tt:ay::	:sy::y:	:):t
th:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn )th:y::n:sy::y:C g:syt	thD5:it:ti:sy::y:n::s::5: l :syt	thD5:it:ti:sy:::ti:,dadti:ssy:: sy:h :  ::/ : :wPt:ay:: :  ::/ : :wPt:ay:: ::l:sytl::::/ : :w :s:( e g::r::tttsy 	 :s:C )th1s) : :) :syit:ti:sy::y:n::s:syt)th : :) :suRyt:ay: :gh:sy1s :ght e g::r::suRytth : :)::: s sy'xO::tdg::r::suRytth : s::/ : :):tttsy :	:s:,:asy=g :uRytttth : s::/  :s:o a :D5:ir:: ::i:sys:,:asy::: s : :):tttsy :	:D5:irtguRetsy::: s sy:: sy:: sy::hdnt(:ir:: ::i:guRett:s:( :s:C :: s sy:: sy:: e: s sy:: sy:: pt:s::C :: s sy:: sy:: e: s sy:: sy:: pt:s::C :: s sy:: sy:5: 	 :: :y 	 :s:C) :syt	 sy:: syth : sy:}ttsy:5: s:syt
t	 sy:: t	 ssyt:ay:syt:ay:s:: :y 	 :s s:syt:ay:esyt:ay:es::/ : :):tttsy :	:s:,:asy=g :uRytttth : s::/  :s:5:l:sy:::  :: s  s::/  sy:}: pt::/  sy: :) va:a:sy::y=g :uRytttth : sy:}tt:ay::a:sy::y:a:s:l:s:x:tith:i:s pt::/  syy:}ttt ::syttt ::sy sy:: pt:s::C :: s sy:: sy:: e: s sy:: sy:: pt:s::5: a :: ::i :: s :: pt:sy:wa:a:sy:s::5: a :: ::i :uh:sy::t::/t:s:: :ght:sy :: ::i i :u]:5: e :: ::	 :: syef :x:	 '/ : :gus::tB::i i :u g:hayS: e: s sy:: sy:R::5:i::i i :u:atsy:D::r:	 :s:a:sy:dnsy::ytv s::5: ( (th1s) : :) : :s:a:sy:d::i:s< r g:h:sy(:: sy:: pt:s::*ytv s::5: ( (th1s) : :) : :othD5:i:hayShhD5:i :s:( e g::sy::rv s:ytt:s::/ : :guRotttsy : :) rhD5:i:e:o::/ : :gh:sy(irhsy::y=g :D5:i:e:o::t:/ : :gh:'sy::t::o::t< r g:hay: ed'g:s:e ::i:s) : :e:o::t::o::t<) :syt(t:ayyy:}t"ea:s:e g:sytith:sy:e::irhayShhD5:ir(ir sy::h:os(ir se g:sytith:sy:ey::a:sy::y:a:s:l:l:sy:st::/ti:sy::y:a:s:l::: pt:s:y:a:s:l:ti:,d,uRytt ::i:sy:/ : :ghea:a:s(y:}t"ea:s:e g:st(t:ayy::::i:s< e g:h:sy:e:ay:a:sy:s::5: a :s:e ::i: g:h}t"ea:sesyt:ay:sesys/  :s:o a g::n::tttsy a :s:e ith:sy: : :) : :s:a:syt:s:n::sy a :s:e ith:sytt:s::/ : :gh:sy(i:ac::s:e ith:sy: : :) : :s:a:syts::5:it:s:n::sy a : : :) :y:}tt:ay::a:sy::y:a:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn ith:y::h:sy::y:e g:syt)thD5:it:ti:sy::y:h::s::5: 	 :syt)thD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : t::/ : :wPt:ay:: : t::/ : :wPt:ay:: ::r:syt	::::/ : :w :s:o a g::n::tttsy a :s:e ith1s) : :) :syit:ti:sy::y:h::s:sytith : :) :suRyt:ay: :gh:sy1s :ght a g::n::suRytth : :)::: s sy'os::tdg::n::suRytth : s::/ : :):tttsy :a:s:,:rsy a :uRytttth : s::/* :s:  d :D5:ie:: ::i:sys:,:rsy::: s : :):tttsy :a:D5:ietguR:tsy::: s sy:: sy:: sy::hrhe(:ie:: ::i:guR:tt:s:o :s:e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:5: a :: :y a :s:e) :syt) sy:: syth : sy:}ttsy:5: s:syt(t) sy:: t) ssyt:ay:syt:ay:s:: :y a :s s:syt:ay:xsyt:ay:xs::/ : :):tttsy :a:s:,:rsy a :uRytttth : s::/* :s:5:	:sy:::* :: s  s::/* sy:}: pt::/* sy: :) 	r:s:sy::y a :uRytttth : sy:}tt:ay::s:sy::y:s:s:	:s:o:t th:i:s pt::/* syy:}tttt::sytttt::sy sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::; :: s :: pt:sy:wa:s:sy:s::5: s :: ::; :uh:sy::t::/t:s:: :ght:sy :: ::; ; :u]:5: x :: ::v :: syvm :o:v '/ : :guo::tB::; ; :u g:hayS: e: s sy:: sy:R::5:i::; ; :u:}esy:D::n:a :s:s:sy:rhsy::y=g s::5: o lth1s) : :) : :s:s:sy:r::i:s<   g:h:sy(:: sy:: pt:s::(y=g s::5: o lth1s) : :) : :	thD5:i:hayShhD5:i :s:o a g::sy::rg s:ytt:s::/ : :guR	tttsy : :) rhD5:i:e:l::/ : :gh:sy(ie"sy::y a :D5:i:e:l::t:/ : :gh:'sy::t::l::t<   g:hay: ed'g:s:e ::i:s) : :e:l::t::l::t<) :sytlt:ayyy:}t"es:s:a g:syt th:sy:e::i hayShhD5:ir(iatsy::h:lo(iatsa g:syt th:sy:ey::s:sy::y:s:s:	:	:sy:st::/ti:sy::y:s:s:	::: pt:s:y:s:s:	:ti:,d,uRytt ::i:sy:/ : :ghrr:s:s(y:}t"es:s:a g:stlt:ayy::::i:s< a g:h:sy:e:ay:s:sy:s::5: s :s:e ::i: g:h}t"es:sxsyt:ay:sxsys/* :s:  d g::h::tttsy s :s:e  th:sy: : :) : :s:s:syt:s:h::sy s :s:e  th:sytt:s::/ : :gh:sy(i:sy::s:e  th:sy: : :) : :s:s:syts::5:it:s:h::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn  th:y::":sy::y:e g:sytithD5:it:ti:sy::y:"::s::5: a :sytithD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : e::/ : :wPt:ay:: : e::/ : :wPt:ay:: ::n:syta::::/ : :w :s:  d g::h::tttsy s :s:e  th1s) : :) :syit:ti:sy::y:"::s:syt th : :) :suRyt:ay: :gh:sy1s :ght d g::h::suRytth : :)::: s sy'lo::tdg::h::suRytth : s::/ : :):tttsy :s:s:,: syt	 :uRytttth : s::/( :s:C a :D5:ir:: ::i:sys:,: sy::: s : :):tttsy :s:D5:irtguR,tsy::: s sy:: sy:: sy::he":(:ir:: ::i:guR,tt:s:  :s:e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:5: s :: :y s :s:e) :syti sy:: syth : sy:}ttsy:5: s:sytlti sy:: ti ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:osyt:ay:os::/ : :):tttsy :s:s:,: syt	 :uRytttth : s::/( :s:5:a:sy:::( :: s  s::/( sy:}: pt::/( sy: :) e :s:sy::yt	 :uRytttth : sy:}tt:ay::s:sy::y:s:s:a:s:l:tpth:i:s pt::/( syy:}ttte::syttte::sy sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::h :: s :: pt:sy:wa:s:sy:s::5: s :: ::h :uh:sy::t::/t:s:: :ght:sy :: ::h h :u]:5: o :: ::	 :: syle :l:	 '/ : :gu	::tB::h h :u g:hayS: e: s sy:: sy:R::5:i::h h :u:blsy:D::h:s :s:s:sy:e"sy::y a s::5:   	th1s) : :) : :s:s:sy:e::i:s<   g:h:sy(:: sy:: pt:s::oy a s::5:   	th1s) : :) : :bthD5:i:hayShhD5:i :s:  d g::sy::ra s:ytt:s::/ : :guRctttsy : :) rhD5:i:e:	::/ : :gh:sy(iresy::yt	 :D5:i:e:	::t:/ : :gh:'sy::t::	::t<   g:hay: ed'g:s:a ::i:s) : :e:	::t::	::t<) :syt	t:ayyy:}t"es:s:d g:sytpth:sy:e::i:hayShhD5:ir(i}esy::h:		(i}esd g:sytpth:sy:ey::s:sy::y:s:s:a:a:sy:st::/ti:sy::y:s:s:a::: pt:s:y:s:s:a:ti:,d,uRytt ::i:sy:/ : :gh  :s:s(y:}t"es:s:d g:st	t:ayy::::i:s< d g:h:sy:e:ay:s:sy:s::5: s :s:a ::i: g:h}t"es:sosyt:ay:sosys/( :s:C a g::"::tttsy s :s:a pth:sy: : :) : :s:s:syt:s:"::sy s :s:a pth:sytt:s::/ : :gh:sy(i:sy::s:a pth:sy: : :) : :s:s:syts::5:it:s:"::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn pth:y::e:sy::y:a g:syt thD5:it:ti:sy::y:e::s::5: s :syt thD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : l::/ : :wPt:ay:: : l::/ : :wPt:ay:: ::h:syts::::/ : :w :s:C a g::"::tttsy s :s:a pth1s) : :) :syit:ti:sy::y:e::s:sytpth : :) :suRyt:ay: :gh:sy1s :ght a g::"::suRytth : :)::: s sy'		::tdg::"::suRytth : s::/ : :):tttsy :s:s:,: syr5 :uRytttth : s::/o :s:e e :D5:i :: ::i:sys:,: sy::: s : :):tttsy :s:D5:i tguROtsy::: s sy:: sy:: sy::hre,(:i :: ::i:guROtt:s:C :s:a :: s sy:: sy:: e: s sy:: sy:: pt:s::a :: s sy:: sy:: e: s sy:: sy:: pt:s::a :: s sy:: sy:5: s :: :y s :s:a) :syt  sy:: syth : sy:}ttsy:5: s:syt	t  sy:: t  ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:lsyt:ay:ls::/ : :):tttsy :s:s:,: syr5 :uRytttth : s::/o :s:5:s:sy:::o :: s  s::/o sy:}: pt::/o sy: :) p :s:sy::yr5 :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:	:trth:i:s pt::/o syy:}tttl::sytttl::sy sy:: pt:s::a :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::r :: s :: pt:sy:wa:s:sy:s::5: s :: ::r :uh:sy::t::/t:s:: :ght:sy :: ::r r :u]:5: l :: ::e :: syd  :	:e '/ : :guc::tB::r r :u g:hayS: e: s sy:: sy:R::5:i::r r :u:arsy:D::":s :s:s:sy:resy::yt	 s::5: C )th1s) : :) : :s:s:sy:r::i:s< * g:h:sy(:: sy:: pt:s:: yt	 s::5: C )th1s) : :) : :
thD5:i:hayShhD5:i :s:C a g::sy::r	 s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:a::/ : :gh:sy(i xsy::yr5 :D5:i:e:a::t:/ : :gh:'sy::t::a::t< * g:hay: ed'g:s:d ::i:s) : :e:a::t::a::t<) :syt)t:ayyy:}t"es:s:a g:sytrth:sy:e::i:hayShhD5:ir(iblsy::h:ac(iblsa g:sytrth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:a g:st)t:ayy::::i:s< a g:h:sy:e:ay:s:sy:s::5: s :s:d ::i: g:h}t"es:slsyt:ay:slsys/o :s:e e g::e::tttsy s :s:d rth:sy: : :) : :s:s:syt:s:e::sy s :s:d rth:sytt:s::/ : :gh:sy(i:sy::s:d rth:sy: : :) : :s:s:syts::5:it:s:e::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn rth:y::x:sy::y:d g:sytpthD5:it:ti:sy::y:x::s::5: s :sytpthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : r::/ : :wPt:ay:: : r::/ : :wPt:ay:: ::":syts::::/ : :w :s:e e g::e::tttsy s :s:d rth1s) : :) :syit:ti:sy::y:x::s:sytrth : :) :suRyt:ay: :gh:sy1s :ght e g::e::suRytth : :)::: s sy'ac::tdg::e::suRytth : s::/ : :):tttsy :s:s:,: sya: :uRytttth : s::/  :s:e f :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRstsy::: s sy:: sy:: sy::h xO(:i::: ::i:guRstt:s:e :s:d :: s sy:: sy:: e: s sy:: sy:: pt:s::d :: s sy:: sy:: e: s sy:: sy:: pt:s::d :: s sy:: sy:5: s :: :y s :s:d) :sytp sy:: syth : sy:}ttsy:5: s:syt)tp sy:: tp ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:	syt:ay:	s::/ : :):tttsy :s:s:,: sya: :uRytttth : s::/  :s:5:s:sy:::  :: s  s::/  sy:}: pt::/  sy: :) i :s:sy::ya: :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:a:t
th:i:s pt::/  syy:}tttr::sytttr::sy sy:: pt:s::d :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::  :: s :: pt:sy:wa:s:sy:s::5: s :: ::  :uh:sy::t::/t:s:: :ght:sy :: ::    :u]:5: 	 :: ::p :: sydt :a:p '/ : :guy::tB::    :u g:hayS: e: s sy:: sy:R::5:i::    :u:dnsy:D::e:s :s:s:sy: xsy::yr5 s::5: e ith1s) : :) : :s:s:sy: ::i:s< ( g:h:sy(:: sy:: pt:s::Cyr5 s::5: e ith1s) : :) : :(thD5:i:hayShhD5:i :s:e e g::sy::r5 s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:osy::ya: :D5:i:e:s::t:/ : :gh:'sy::t::s::t< ( g:hay: ed'g:s:a ::i:s) : :e:s::t::s::t<) :sytit:ayyy:}t"es:s:e g:syt
th:sy:e::i:hayShhD5:ir(iarsy::h:sy(iarse g:syt
th:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:e g:stit:ayy::::i:s< e g:h:sy:e:ay:s:sy:s::5: s :s:a ::i: g:h}t"es:s	syt:ay:s	sys/  :s:e f g::x::tttsy s :s:a 
th:sy: : :) : :s:s:syt:s:x::sy s :s:a 
th:sytt:s::/ : :gh:sy(i:sy::s:a 
th:sy: : :) : :s:s:syts::5:it:s:x::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn 
th:y::o:sy::y:a g:sytrthD5:it:ti:sy::y:o::s::5: s :sytrthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : n::/ : :wPt:ay:: : n::/ : :wPt:ay:: ::e:syts::::/ : :w :s:e f g::x::tttsy s :s:a 
th1s) : :) :syit:ti:sy::y:o::s:syt
th : :) :suRyt:ay: :gh:sy1s :ght f g::x::suRytth : :)::: s sy'sy::tdg::x::suRytth : s::/ : :):tttsy :s:s:,: syt; :uRytttth : s::/C :s:a s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRotsy::: s sy:: sy:: sy::h:os(:i::: ::i:guRott:s:e :s:a :: s sy:: sy:: e: s sy:: sy:: pt:s::a :: s sy:: sy:: e: s sy:: sy:: pt:s::a :: s sy:: sy:5: s :: :y s :s:a) :sytr sy:: syth : sy:}ttsy:5: s:sytitr sy:: tr ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:asyt:ay:as::/ : :):tttsy :s:s:,: syt; :uRytttth : s::/C :s:5:s:sy:::C :: s  s::/C sy:}: pt::/C sy: :) ; :s:sy::yt; :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/C syy:}tttn::sytttn::sy sy:: pt:s::a :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::  :: s :: pt:sy:wa:s:sy:s::5: s :: ::  :uh:sy::t::/t:s:: :ght:sy :: ::    :u]:5: a :: ::i :: syie :s:i '/ : :guy::tB::    :u g:hayS: e: s sy:: sy:R::5:i::    :u:rhsy:D::x:s :s:s:sy::osy::ya: s::5: e  th1s) : :) : :s:s:sy::::i:s< o g:h:sy(:: sy:: pt:s::eya: s::5: e  th1s) : :) : :lthD5:i:hayShhD5:i :s:e f g::sy::r: s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:lsy::yt; :D5:i:e:s::t:/ : :gh:'sy::t::s::t< o g:hay: ed'g:s:e ::i:s) : :e:s::t::s::t<) :syt t:ayyy:}t"es:s:f g:syttth:sy:e::i:hayShhD5:ir(idnsy::h:sy(idnsf g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:f g:st t:ayy::::i:s< f g:h:sy:e:ay:s:sy:s::5: s :s:e ::i: g:h}t"es:sasyt:ay:sasys/C :s:a s g::o::tttsy s :s:e tth:sy: : :) : :s:s:syt:s:o::sy s :s:e tth:sytt:s::/ : :gh:sy(i:sy::s:e tth:sy: : :) : :s:s:syts::5:it:s:o::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::l:sy::y:e g:syt
thD5:it:ti:sy::y:l::s::5: s :syt
thD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : h::/ : :wPt:ay:: : h::/ : :wPt:ay:: ::x:syts::::/ : :w :s:a s g::o::tttsy s :s:e tth1s) : :) :syit:ti:sy::y:l::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::o::suRytth : :)::: s sy'sy::tdg::o::suRytth : s::/ : :):tttsy :s:s:,: sy e :uRytttth : s::/e :s:d v :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguR	tsy::: s sy:: sy:: sy::h:lo(:i::: ::i:guR	tt:s:a :s:e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:5: s :: :y s :s:e) :syt
 sy:: syth : sy:}ttsy:5: s:syt t
 sy:: t
 ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy e :uRytttth : s::/e :s:5:s:sy:::e :: s  s::/e sy:}: pt::/e sy: :) h :s:sy::y e :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/e syy:}ttth::syttth::sy sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::* :: s :: pt:sy:wa:s:sy:s::5: s :: ::* :uh:sy::t::/t:s:: :ght:sy :: ::* * :u]:5: s :: ::; :: syal :s:; '/ : :guy::tB::* * :u g:hayS: e: s sy:: sy:R::5:i::* * :u:e"sy:D::o:s :s:s:sy::lsy::yt; s::5: a pth1s) : :) : :s:s:sy::::i:s<   g:h:sy(:: sy:: pt:s::eyt; s::5: a pth1s) : :) : :	thD5:i:hayShhD5:i :s:a s g::sy::r; s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:	sy::y e :D5:i:e:s::t:/ : :gh:'sy::t::s::t<   g:hay: ed'g:s:f ::i:s) : :e:s::t::s::t<) :sytpt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(irhsy::h:sy(irhss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:stpt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:f ::i: g:h}t"es:sssyt:ay:sssys/e :s:d v g::l::tttsy s :s:f tth:sy: : :) : :s:s:syt:s:l::sy s :s:f tth:sytt:s::/ : :gh:sy(i:sy::s:f tth:sy: : :) : :s:s:syts::5:it:s:l::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::	:sy::y:f g:syttthD5:it:ti:sy::y:	::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : "::/ : :wPt:ay:: : "::/ : :wPt:ay:: ::o:syts::::/ : :w :s:d v g::l::tttsy s :s:f tth1s) : :) :syit:ti:sy::y:	::s:syttth : :) :suRyt:ay: :gh:sy1s :ght v g::l::suRytth : :)::: s sy'sy::tdg::l::suRytth : s::/ : :):tttsy :s:s:,: syef :uRytttth : s::/e :s:a g :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRctsy::: s sy:: sy:: sy::h:		(:i::: ::i:guRctt:s:d :s:f :: s sy:: sy:: e: s sy:: sy:: pt:s::f :: s sy:: sy:: e: s sy:: sy:: pt:s::f :: s sy:: sy:5: s :: :y s :s:f) :sytt sy:: syth : sy:}ttsy:5: s:sytptt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: syef :uRytttth : s::/e :s:5:s:sy:::e :: s  s::/e sy:}: pt::/e sy: :) r :s:sy::yef :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/e syy:}ttt"::syttt"::sy sy:: pt:s::f :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::( :: s :: pt:sy:wa:s:sy:s::5: s :: ::( :uh:sy::t::/t:s:: :ght:sy :: ::( ( :u]:5: s :: ::h :: syrr :s:h '/ : :guy::tB::( ( :u g:hayS: e: s sy:: sy:R::5:i::( ( :u:resy:D::l:s :s:s:sy::	sy::y e s::5: d rth1s) : :) : :s:s:sy::::i:s< C g:h:sy(:: sy:: pt:s::ay e s::5: d rth1s) : :) : :)thD5:i:hayShhD5:i :s:d v g::sy::re s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:asy::yef :D5:i:e:s::t:/ : :gh:'sy::t::s::t< C g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :sytrt:ayyy:}t"es:s:v g:syttth:sy:e::i:hayShhD5:ir(ie"sy::h:sy(ie"sv g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:v g:strt:ayy::::i:s< v g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/e :s:a g g::	::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:	::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:	::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::a:sy::y:s g:syttthD5:it:ti:sy::y:a::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : e::/ : :wPt:ay:: : e::/ : :wPt:ay:: ::l:syts::::/ : :w :s:a g g::	::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:a::s:syttth : :) :suRyt:ay: :gh:sy1s :ght g g::	::suRytth : :)::: s sy'sy::tdg::	::suRytth : s::/ : :):tttsy :s:s:,: syvm :uRytttth : s::/a :s:e a :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:ac(:i::: ::i:guRytt:s:a :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytrtt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: syvm :uRytttth : s::/a :s:5:s:sy:::a :: s  s::/a sy:}: pt::/a sy: :)   :s:sy::yvm :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/a syy:}ttte::syttte::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::o :: s :: pt:sy:wa:s:sy:s::5: s :: ::o :uh:sy::t::/t:s:: :ght:sy :: ::o o :u]:5: s :: ::r :: sy n :s:r '/ : :guy::tB::o o :u g:hayS: e: s sy:: sy:R::5:i::o o :u: xsy:D::	:s :s:s:sy::asy::yef s::5: a 
th1s) : :) : :s:s:sy::::i:s< e g:h:sy(:: sy:: pt:s::dyef s::5: a 
th1s) : :) : :ithD5:i:hayShhD5:i :s:a g g::sy::rf s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::yvm :D5:i:e:s::t:/ : :gh:'sy::t::s::t< e g:hay: ed'g:s:v ::i:s) : :e:s::t::s::t<) :syt
t:ayyy:}t"es:s:g g:syttth:sy:e::i:hayShhD5:ir(iresy::h:sy(iresg g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:g g:st
t:ayy::::i:s< g g:h:sy:e:ay:s:sy:s::5: s :s:v ::i: g:h}t"es:sssyt:ay:sssys/a :s:e a g::a::tttsy s :s:v tth:sy: : :) : :s:s:syt:s:a::sy s :s:v tth:sytt:s::/ : :gh:sy(i:sy::s:v tth:sy: : :) : :s:s:syts::5:it:s:a::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:v g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : x::/ : :wPt:ay:: : x::/ : :wPt:ay:: ::	:syts::::/ : :w :s:e a g::a::tttsy s :s:v tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght a g::a::suRytth : :)::: s sy'sy::tdg::a::suRytth : s::/ : :):tttsy :s:s:,: syle :uRytttth : s::/d :s:f 	 :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:e :s:v :: s sy:: sy:: e: s sy:: sy:: pt:s::v :: s sy:: sy:: e: s sy:: sy:: pt:s::v :: s sy:: sy:5: s :: :y s :s:v) :sytt sy:: syth : sy:}ttsy:5: s:syt
tt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: syle :uRytttth : s::/d :s:5:s:sy:::d :: s  s::/d sy:}: pt::/d sy: :)   :s:sy::yle :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/d syy:}tttx::sytttx::sy sy:: pt:s::v :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::  :: s :: pt:sy:wa:s:sy:s::5: s :: ::  :uh:sy::t::/t:s:: :ght:sy :: ::    :u]:5: s :: ::  :: sy h :s:  '/ : :guy::tB::    :u g:hayS: e: s sy:: sy:R::5:i::    :u::osy:D::a:s :s:s:sy::ssy::yvm s::5: e tth1s) : :) : :s:s:sy::::i:s< e g:h:sy(:: sy:: pt:s::ayvm s::5: e tth1s) : :) : : thD5:i:hayShhD5:i :s:e a g::sy::rm s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::yle :D5:i:e:s::t:/ : :gh:'sy::t::s::t< e g:hay: ed'g:s:g ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:a g:syttth:sy:e::i:hayShhD5:ir(i xsy::h:sy(i xsa g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:a g:sttt:ayy::::i:s< a g:h:sy:e:ay:s:sy:s::5: s :s:g ::i: g:h}t"es:sssyt:ay:sssys/d :s:f 	 g::s::tttsy s :s:g tth:sy: : :) : :s:s:syt:s:s::sy s :s:g tth:sytt:s::/ : :gh:sy(i:sy::s:g tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:g g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : o::/ : :wPt:ay:: : o::/ : :wPt:ay:: ::a:syts::::/ : :w :s:f 	 g::s::tttsy s :s:g tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght 	 g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: syd  :uRytttth : s::/a :s:s 5 :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:f :s:g :: s sy:: sy:: e: s sy:: sy:: pt:s::g :: s sy:: sy:: e: s sy:: sy:: pt:s::g :: s sy:: sy:5: s :: :y s :s:g) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: syd  :uRytttth : s::/a :s:5:s:sy:::a :: s  s::/a sy:}: pt::/a sy: :) * :s:sy::yd  :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/a syy:}ttto::syttto::sy sy:: pt:s::g :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::C :: s :: pt:sy:wa:s:sy:s::5: s :: ::C :uh:sy::t::/t:s:: :ght:sy :: ::C C :u]:5: s :: ::  :: sy " :s:  '/ : :guy::tB::C C :u g:hayS: e: s sy:: sy:R::5:i::C C :u::lsy:D::s:s :s:s:sy::ssy::yle s::5: f tth1s) : :) : :s:s:sy::::i:s< a g:h:sy(:: sy:: pt:s::eyle s::5: f tth1s) : :) : :pthD5:i:hayShhD5:i :s:f 	 g::sy::re s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::yd  :D5:i:e:s::t:/ : :gh:'sy::t::s::t< a g:hay: ed'g:s:a ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:	 g:syttth:sy:e::i:hayShhD5:ir(i:osy::h:sy(i:os	 g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:	 g:sttt:ayy::::i:s< 	 g:h:sy:e:ay:s:sy:s::5: s :s:a ::i: g:h}t"es:sssyt:ay:sssys/a :s:s 5 g::s::tttsy s :s:a tth:sy: : :) : :s:s:syt:s:s::sy s :s:a tth:sytt:s::/ : :gh:sy(i:sy::s:a tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:a g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : l::/ : :wPt:ay:: : l::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s 5 g::s::tttsy s :s:a tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght 5 g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sydt :uRytttth : s::/e :s:v : :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:a :: s sy:: sy:: e: s sy:: sy:: pt:s::a :: s sy:: sy:: e: s sy:: sy:: pt:s::a :: s sy:: sy:5: s :: :y s :s:a) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sydt :uRytttth : s::/e :s:5:s:sy:::e :: s  s::/e sy:}: pt::/e sy: :) ( :s:sy::ydt :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/e syy:}tttl::sytttl::sy sy:: pt:s::a :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::e :: s :: pt:sy:wa:s:sy:s::5: s :: ::e :uh:sy::t::/t:s:: :ght:sy :: ::e e :u]:5: s :: ::* :: sy e :s:* '/ : :guy::tB::e e :u g:hayS: e: s sy:: sy:R::5:i::e e :u::	sy:D::s:s :s:s:sy::ssy::yd  s::5: s tth1s) : :) : :s:s:sy::::i:s< d g:h:sy(:: sy:: pt:s::fyd  s::5: s tth1s) : :) : :rthD5:i:hayShhD5:i :s:s 5 g::sy::r  s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::ydt :D5:i:e:s::t:/ : :gh:'sy::t::s::t< d g:hay: ed'g:s:	 ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:5 g:syttth:sy:e::i:hayShhD5:ir(i:lsy::h:sy(i:ls5 g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:5 g:sttt:ayy::::i:s< 5 g:h:sy:e:ay:s:sy:s::5: s :s:	 ::i: g:h}t"es:sssyt:ay:sssys/e :s:v : g::s::tttsy s :s:	 tth:sy: : :) : :s:s:syt:s:s::sy s :s:	 tth:sytt:s::/ : :gh:sy(i:sy::s:	 tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:	 g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : 	::/ : :wPt:ay:: : 	::/ : :wPt:ay:: ::s:syts::::/ : :w :s:v : g::s::tttsy s :s:	 tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght : g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: syie :uRytttth : s::/f :s:g ; :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:v :s:	 :: s sy:: sy:: e: s sy:: sy:: pt:s::	 :: s sy:: sy:: e: s sy:: sy:: pt:s::	 :: s sy:: sy:5: s :: :y s :s:	) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: syie :uRytttth : s::/f :s:5:s:sy:::f :: s  s::/f sy:}: pt::/f sy: :) o :s:sy::yie :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/f syy:}ttt	::syttt	::sy sy:: pt:s::	 :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::e :: s :: pt:sy:wa:s:sy:s::5: s :: ::e :uh:sy::t::/t:s:: :ght:sy :: ::e e :u]:5: s :: ::( :: sy x :s:( '/ : :guy::tB::e e :u g:hayS: e: s sy:: sy:R::5:i::e e :u::asy:D::s:s :s:s:sy::ssy::ydt s::5: v tth1s) : :) : :s:s:sy::::i:s< a g:h:sy(:: sy:: pt:s::sydt s::5: v tth1s) : :) : :
thD5:i:hayShhD5:i :s:v : g::sy::rt s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::yie :D5:i:e:s::t:/ : :gh:'sy::t::s::t< a g:hay: ed'g:s:5 ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:: g:syttth:sy:e::i:hayShhD5:ir(i:	sy::h:sy(i:	s: g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:: g:sttt:ayy::::i:s< : g:h:sy:e:ay:s:sy:s::5: s :s:5 ::i: g:h}t"es:sssyt:ay:sssys/f :s:g ; g::s::tttsy s :s:5 tth:sy: : :) : :s:s:syt:s:s::sy s :s:5 tth:sytt:s::/ : :gh:sy(i:sy::s:5 tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:5 g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : a::/ : :wPt:ay:: : a::/ : :wPt:ay:: ::s:syts::::/ : :w :s:g ; g::s::tttsy s :s:5 tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght ; g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: syal :uRytttth : s::/s :s:a e :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:g :s:5 :: s sy:: sy:: e: s sy:: sy:: pt:s::5 :: s sy:: sy:: e: s sy:: sy:: pt:s::5 :: s sy:: sy:5: s :: :y s :s:5) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: syal :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :)   :s:sy::yal :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttta::syttta::sy sy:: pt:s::5 :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::a :: s :: pt:sy:wa:s:sy:s::5: s :: ::a :uh:sy::t::/t:s:: :ght:sy :: ::a a :u]:5: s :: ::o :: sy o :s:o '/ : :guy::tB::a a :u g:hayS: e: s sy:: sy:R::5:i::a a :u::ssy:D::s:s :s:s:sy::ssy::yie s::5: g tth1s) : :) : :s:s:sy::::i:s< e g:h:sy(:: sy:: pt:s::vyie s::5: g tth1s) : :) : :tthD5:i:hayShhD5:i :s:g ; g::sy::re s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::yal :D5:i:e:s::t:/ : :gh:'sy::t::s::t< e g:hay: ed'g:s:: ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:; g:syttth:sy:e::i:hayShhD5:ir(i:asy::h:sy(i:as; g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:; g:sttt:ayy::::i:s< ; g:h:sy:e:ay:s:sy:s::5: s :s:: ::i: g:h}t"es:sssyt:ay:sssys/s :s:a e g::s::tttsy s :s:: tth:sy: : :) : :s:s:syt:s:s::sy s :s:: tth:sytt:s::/ : :gh:sy(i:sy::s:: tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:: g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:a e g::s::tttsy s :s:: tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght e g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: syrr :uRytttth : s::/v :s:	 f :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:a :s:: :: s sy:: sy:: e: s sy:: sy:: pt:s::: :: s sy:: sy:: e: s sy:: sy:: pt:s::: :: s sy:: sy:5: s :: :y s :s::) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: syrr :uRytttth : s::/v :s:5:s:sy:::v :: s  s::/v sy:}: pt::/v sy: :) C :s:sy::yrr :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/v syy:}ttts::syttts::sy sy:: pt:s::: :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::d :: s :: pt:sy:wa:s:sy:s::5: s :: ::d :uh:sy::t::/t:s:: :ght:sy :: ::d d :u]:5: s :: ::  :: sy l :s:  '/ : :guy::tB::d d :u g:hayS: e: s sy:: sy:R::5:i::d d :u::ssy:D::s:s :s:s:sy::ssy::yal s::5: a tth1s) : :) : :s:s:sy::::i:s< f g:h:sy(:: sy:: pt:s::gyal s::5: a tth1s) : :) : :tthD5:i:hayShhD5:i :s:a e g::sy::rl s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::yrr :D5:i:e:s::t:/ : :gh:'sy::t::s::t< f g:hay: ed'g:s:; ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:e g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sse g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:e g:sttt:ayy::::i:s< e g:h:sy:e:ay:s:sy:s::5: s :s:; ::i: g:h}t"es:sssyt:ay:sssys/v :s:	 f g::s::tttsy s :s:; tth:sy: : :) : :s:s:syt:s:s::sy s :s:; tth:sytt:s::/ : :gh:sy(i:sy::s:; tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:; g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:	 f g::s::tttsy s :s:; tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght f g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy n :uRytttth : s::/g :s:5 m :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:	 :s:; :: s sy:: sy:: e: s sy:: sy:: pt:s::; :: s sy:: sy:: e: s sy:: sy:: pt:s::; :: s sy:: sy:5: s :: :y s :s:;) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy n :uRytttth : s::/g :s:5:s:sy:::g :: s  s::/g sy:}: pt::/g sy: :) e :s:sy::y n :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/g syy:}ttts::syttts::sy sy:: pt:s::; :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::a :: s :: pt:sy:wa:s:sy:s::5: s :: ::a :uh:sy::t::/t:s:: :ght:sy :: ::a a :u]:5: s :: ::C :: sy 	 :s:C '/ : :guy::tB::a a :u g:hayS: e: s sy:: sy:R::5:i::a a :u::ssy:D::s:s :s:s:sy::ssy::yrr s::5: 	 tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::ayrr s::5: 	 tth1s) : :) : :tthD5:i:hayShhD5:i :s:	 f g::sy::rr s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y n :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:e ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:f g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ssf g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:f g:sttt:ayy::::i:s< f g:h:sy:e:ay:s:sy:s::5: s :s:e ::i: g:h}t"es:sssyt:ay:sssys/g :s:5 m g::s::tttsy s :s:e tth:sy: : :) : :s:s:syt:s:s::sy s :s:e tth:sytt:s::/ : :gh:sy(i:sy::s:e tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:e g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:5 m g::s::tttsy s :s:e tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght m g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy h :uRytttth : s::/a :s:: e :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:5 :s:e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:5: s :: :y s :s:e) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy h :uRytttth : s::/a :s:5:s:sy:::a :: s  s::/a sy:}: pt::/a sy: :) e :s:sy::y h :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/a syy:}ttts::syttts::sy sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::e :: s :: pt:sy:wa:s:sy:s::5: s :: ::e :uh:sy::t::/t:s:: :ght:sy :: ::e e :u]:5: s :: ::e :: sy a :s:e '/ : :guy::tB::e e :u g:hayS: e: s sy:: sy:R::5:i::e e :u::ssy:D::s:s :s:s:sy::ssy::y n s::5: 5 tth1s) : :) : :s:s:sy::::i:s< v g:h:sy(:: sy:: pt:s::	y n s::5: 5 tth1s) : :) : :tthD5:i:hayShhD5:i :s:5 m g::sy::rn s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y h :D5:i:e:s::t:/ : :gh:'sy::t::s::t< v g:hay: ed'g:s:f ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:m g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ssm g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:m g:sttt:ayy::::i:s< m g:h:sy:e:ay:s:sy:s::5: s :s:f ::i: g:h}t"es:sssyt:ay:sssys/a :s:: e g::s::tttsy s :s:f tth:sy: : :) : :s:s:syt:s:s::sy s :s:f tth:sytt:s::/ : :gh:sy(i:sy::s:f tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:f g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:: e g::s::tttsy s :s:f tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght e g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy " :uRytttth : s::/	 :s:;   :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:: :s:f :: s sy:: sy:: e: s sy:: sy:: pt:s::f :: s sy:: sy:: e: s sy:: sy:: pt:s::f :: s sy:: sy:5: s :: :y s :s:f) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy " :uRytttth : s::/	 :s:5:s:sy:::	 :: s  s::/	 sy:}: pt::/	 sy: :) a :s:sy::y " :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/	 syy:}ttts::syttts::sy sy:: pt:s::f :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::f :: s :: pt:sy:wa:s:sy:s::5: s :: ::f :uh:sy::t::/t:s:: :ght:sy :: ::f f :u]:5: s :: ::e :: sy s :s:e '/ : :guy::tB::f f :u g:hayS: e: s sy:: sy:R::5:i::f f :u::ssy:D::s:s :s:s:sy::ssy::y h s::5: : tth1s) : :) : :s:s:sy::::i:s< g g:h:sy(:: sy:: pt:s::5y h s::5: : tth1s) : :) : :tthD5:i:hayShhD5:i :s:: e g::sy::rh s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y " :D5:i:e:s::t:/ : :gh:'sy::t::s::t< g g:hay: ed'g:s:m ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:e g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sse g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:e g:sttt:ayy::::i:s< e g:h:sy:e:ay:s:sy:s::5: s :s:m ::i: g:h}t"es:sssyt:ay:sssys/	 :s:;   g::s::tttsy s :s:m tth:sy: : :) : :s:s:syt:s:s::sy s :s:m tth:sytt:s::/ : :gh:sy(i:sy::s:m tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:m g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:;   g::s::tttsy s :s:m tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght   g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy e :uRytttth : s::/5 :s:e t :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:; :s:m :: s sy:: sy:: e: s sy:: sy:: pt:s::m :: s sy:: sy:: e: s sy:: sy:: pt:s::m :: s sy:: sy:5: s :: :y s :s:m) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy e :uRytttth : s::/5 :s:5:s:sy:::5 :: s  s::/5 sy:}: pt::/5 sy: :) d :s:sy::y e :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/5 syy:}ttts::syttts::sy sy:: pt:s::m :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::a :: sy s :s:a '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y " s::5: ; tth1s) : :) : :s:s:sy::::i:s< a g:h:sy(:: sy:: pt:s:::y " s::5: ; tth1s) : :) : :tthD5:i:hayShhD5:i :s:;   g::sy::r" s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y e :D5:i:e:s::t:/ : :gh:'sy::t::s::t< a g:hay: ed'g:s:e ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:  g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ss  g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:  g:sttt:ayy::::i:s<   g:h:sy:e:ay:s:sy:s::5: s :s:e ::i: g:h}t"es:sssyt:ay:sssys/5 :s:e t g::s::tttsy s :s:e tth:sy: : :) : :s:s:syt:s:s::sy s :s:e tth:sytt:s::/ : :gh:sy(i:sy::s:e tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:e g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:e t g::s::tttsy s :s:e tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght t g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy x :uRytttth : s::/: :s:f e :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:e :s:e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:5: s :: :y s :s:e) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy x :uRytttth : s::/: :s:5:s:sy:::: :: s  s::/: sy:}: pt::/: sy: :) a :s:sy::y x :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/: syy:}ttts::syttts::sy sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::v :: s :: pt:sy:wa:s:sy:s::5: s :: ::v :uh:sy::t::/t:s:: :ght:sy :: ::v v :u]:5: s :: ::d :: sy s :s:d '/ : :guy::tB::v v :u g:hayS: e: s sy:: sy:R::5:i::v v :u::ssy:D::s:s :s:s:sy::ssy::y e s::5: e tth1s) : :) : :s:s:sy::::i:s< 	 g:h:sy(:: sy:: pt:s::;y e s::5: e tth1s) : :) : :tthD5:i:hayShhD5:i :s:e t g::sy::re s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y x :D5:i:e:s::t:/ : :gh:'sy::t::s::t< 	 g:hay: ed'g:s:  ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:t g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sst g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:t g:sttt:ayy::::i:s< t g:h:sy:e:ay:s:sy:s::5: s :s:  ::i: g:h}t"es:sssyt:ay:sssys/: :s:f e g::s::tttsy s :s:  tth:sy: : :) : :s:s:syt:s:s::sy s :s:  tth:sytt:s::/ : :gh:sy(i:sy::s:  tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:  g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:f e g::s::tttsy s :s:  tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght e g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy o :uRytttth : s::/; :s:m l :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:f :s:  :: s sy:: sy:: e: s sy:: sy:: pt:s::  :: s sy:: sy:: e: s sy:: sy:: pt:s::  :: s sy:: sy:5: s :: :y s :s: ) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy o :uRytttth : s::/; :s:5:s:sy:::; :: s  s::/; sy:}: pt::/; sy: :) e :s:sy::y o :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/; syy:}ttts::syttts::sy sy:: pt:s::  :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::g :: s :: pt:sy:wa:s:sy:s::5: s :: ::g :uh:sy::t::/t:s:: :ght:sy :: ::g g :u]:5: s :: ::a :: sy s :s:a '/ : :guy::tB::g g :u g:hayS: e: s sy:: sy:R::5:i::g g :u::ssy:D::s:s :s:s:sy::ssy::y x s::5: f tth1s) : :) : :s:s:sy::::i:s< 5 g:h:sy(:: sy:: pt:s::ey x s::5: f tth1s) : :) : :tthD5:i:hayShhD5:i :s:f e g::sy::rx s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y o :D5:i:e:s::t:/ : :gh:'sy::t::s::t< 5 g:hay: ed'g:s:t ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:e g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sse g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:e g:sttt:ayy::::i:s< e g:h:sy:e:ay:s:sy:s::5: s :s:t ::i: g:h}t"es:sssyt:ay:sssys/; :s:m l g::s::tttsy s :s:t tth:sy: : :) : :s:s:syt:s:s::sy s :s:t tth:sytt:s::/ : :gh:sy(i:sy::s:t tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:t g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:m l g::s::tttsy s :s:t tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght l g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy l :uRytttth : s::/e :s:e r :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:m :s:t :: s sy:: sy:: e: s sy:: sy:: pt:s::t :: s sy:: sy:: e: s sy:: sy:: pt:s::t :: s sy:: sy:5: s :: :y s :s:t) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy l :uRytttth : s::/e :s:5:s:sy:::e :: s  s::/e sy:}: pt::/e sy: :) f :s:sy::y l :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/e syy:}ttts::syttts::sy sy:: pt:s::t :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::a :: s :: pt:sy:wa:s:sy:s::5: s :: ::a :uh:sy::t::/t:s:: :ght:sy :: ::a a :u]:5: s :: ::e :: sy s :s:e '/ : :guy::tB::a a :u g:hayS: e: s sy:: sy:R::5:i::a a :u::ssy:D::s:s :s:s:sy::ssy::y o s::5: m tth1s) : :) : :s:s:sy::::i:s< : g:h:sy(:: sy:: pt:s::fy o s::5: m tth1s) : :) : :tthD5:i:hayShhD5:i :s:m l g::sy::ro s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y l :D5:i:e:s::t:/ : :gh:'sy::t::s::t< : g:hay: ed'g:s:e ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:l g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ssl g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:l g:sttt:ayy::::i:s< l g:h:sy:e:ay:s:sy:s::5: s :s:e ::i: g:h}t"es:sssyt:ay:sssys/e :s:e r g::s::tttsy s :s:e tth:sy: : :) : :s:s:syt:s:s::sy s :s:e tth:sytt:s::/ : :gh:sy(i:sy::s:e tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:e g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:e r g::s::tttsy s :s:e tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght r g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy 	 :uRytttth : s::/f :s:  n :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:e :s:e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:5: s :: :y s :s:e) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy 	 :uRytttth : s::/f :s:5:s:sy:::f :: s  s::/f sy:}: pt::/f sy: :) s :s:sy::y 	 :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/f syy:}ttts::syttts::sy sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::	 :: s :: pt:sy:wa:s:sy:s::5: s :: ::	 :uh:sy::t::/t:s:: :ght:sy :: ::	 	 :u]:5: s :: ::f :: sy s :s:f '/ : :guy::tB::	 	 :u g:hayS: e: s sy:: sy:R::5:i::	 	 :u::ssy:D::s:s :s:s:sy::ssy::y l s::5: e tth1s) : :) : :s:s:sy::::i:s< ; g:h:sy(:: sy:: pt:s::my l s::5: e tth1s) : :) : :tthD5:i:hayShhD5:i :s:e r g::sy::rl s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y 	 :D5:i:e:s::t:/ : :gh:'sy::t::s::t< ; g:hay: ed'g:s:l ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:r g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ssr g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:r g:sttt:ayy::::i:s< r g:h:sy:e:ay:s:sy:s::5: s :s:l ::i: g:h}t"es:sssyt:ay:sssys/f :s:  n g::s::tttsy s :s:l tth:sy: : :) : :s:s:syt:s:s::sy s :s:l tth:sytt:s::/ : :gh:sy(i:sy::s:l tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:l g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:  n g::s::tttsy s :s:l tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght n g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy a :uRytttth : s::/m :s:t h :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:  :s:l :: s sy:: sy:: e: s sy:: sy:: pt:s::l :: s sy:: sy:: e: s sy:: sy:: pt:s::l :: s sy:: sy:5: s :: :y s :s:l) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy a :uRytttth : s::/m :s:5:s:sy:::m :: s  s::/m sy:}: pt::/m sy: :) v :s:sy::y a :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/m syy:}ttts::syttts::sy sy:: pt:s::l :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::5 :: s :: pt:sy:wa:s:sy:s::5: s :: ::5 :uh:sy::t::/t:s:: :ght:sy :: ::5 5 :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::5 5 :u g:hayS: e: s sy:: sy:R::5:i::5 5 :u::ssy:D::s:s :s:s:sy::ssy::y 	 s::5:   tth1s) : :) : :s:s:sy::::i:s< e g:h:sy(:: sy:: pt:s::ey 	 s::5:   tth1s) : :) : :tthD5:i:hayShhD5:i :s:  n g::sy::r	 s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y a :D5:i:e:s::t:/ : :gh:'sy::t::s::t< e g:hay: ed'g:s:r ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:n g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ssn g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:n g:sttt:ayy::::i:s< n g:h:sy:e:ay:s:sy:s::5: s :s:r ::i: g:h}t"es:sssyt:ay:sssys/m :s:t h g::s::tttsy s :s:r tth:sy: : :) : :s:s:syt:s:s::sy s :s:r tth:sytt:s::/ : :gh:sy(i:sy::s:r tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:r g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:t h g::s::tttsy s :s:r tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght h g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/e :s:e " :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:t :s:r :: s sy:: sy:: e: s sy:: sy:: pt:s::r :: s sy:: sy:: e: s sy:: sy:: pt:s::r :: s sy:: sy:5: s :: :y s :s:r) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/e :s:5:s:sy:::e :: s  s::/e sy:}: pt::/e sy: :) g :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/e syy:}ttts::syttts::sy sy:: pt:s::r :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::: :: s :: pt:sy:wa:s:sy:s::5: s :: ::: :uh:sy::t::/t:s:: :ght:sy :: ::: : :u]:5: s :: ::v :: sy s :s:v '/ : :guy::tB::: : :u g:hayS: e: s sy:: sy:R::5:i::: : :u::ssy:D::s:s :s:s:sy::ssy::y a s::5: t tth1s) : :) : :s:s:sy::::i:s< f g:h:sy(:: sy:: pt:s:: y a s::5: t tth1s) : :) : :tthD5:i:hayShhD5:i :s:t h g::sy::ra s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< f g:hay: ed'g:s:n ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:h g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ssh g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:h g:sttt:ayy::::i:s< h g:h:sy:e:ay:s:sy:s::5: s :s:n ::i: g:h}t"es:sssyt:ay:sssys/e :s:e " g::s::tttsy s :s:n tth:sy: : :) : :s:s:syt:s:s::sy s :s:n tth:sytt:s::/ : :gh:sy(i:sy::s:n tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:n g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:e " g::s::tttsy s :s:n tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght " g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/  :s:l e :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:e :s:n :: s sy:: sy:: e: s sy:: sy:: pt:s::n :: s sy:: sy:: e: s sy:: sy:: pt:s::n :: s sy:: sy:5: s :: :y s :s:n) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/  :s:5:s:sy:::  :: s  s::/  sy:}: pt::/  sy: :) a :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/  syy:}ttts::syttts::sy sy:: pt:s::n :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::; :: s :: pt:sy:wa:s:sy:s::5: s :: ::; :uh:sy::t::/t:s:: :ght:sy :: ::; ; :u]:5: s :: ::g :: sy s :s:g '/ : :guy::tB::; ; :u g:hayS: e: s sy:: sy:R::5:i::; ; :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: e tth1s) : :) : :s:s:sy::::i:s< m g:h:sy(:: sy:: pt:s::ty s s::5: e tth1s) : :) : :tthD5:i:hayShhD5:i :s:e " g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< m g:hay: ed'g:s:h ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:" g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ss" g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:" g:sttt:ayy::::i:s< " g:h:sy:e:ay:s:sy:s::5: s :s:h ::i: g:h}t"es:sssyt:ay:sssys/  :s:l e g::s::tttsy s :s:h tth:sy: : :) : :s:s:syt:s:s::sy s :s:h tth:sytt:s::/ : :gh:sy(i:sy::s:h tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:h g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:l e g::s::tttsy s :s:h tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght e g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/t :s:r x :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:l :s:h :: s sy:: sy:: e: s sy:: sy:: pt:s::h :: s sy:: sy:: e: s sy:: sy:: pt:s::h :: s sy:: sy:5: s :: :y s :s:h) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/t :s:5:s:sy:::t :: s  s::/t sy:}: pt::/t sy: :) 	 :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/t syy:}ttts::syttts::sy sy:: pt:s::h :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::e :: s :: pt:sy:wa:s:sy:s::5: s :: ::e :uh:sy::t::/t:s:: :ght:sy :: ::e e :u]:5: s :: ::a :: sy s :s:a '/ : :guy::tB::e e :u g:hayS: e: s sy:: sy:R::5:i::e e :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: l tth1s) : :) : :s:s:sy::::i:s< e g:h:sy(:: sy:: pt:s::ey s s::5: l tth1s) : :) : :tthD5:i:hayShhD5:i :s:l e g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< e g:hay: ed'g:s:" ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:e g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sse g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:e g:sttt:ayy::::i:s< e g:h:sy:e:ay:s:sy:s::5: s :s:" ::i: g:h}t"es:sssyt:ay:sssys/t :s:r x g::s::tttsy s :s:" tth:sy: : :) : :s:s:syt:s:s::sy s :s:" tth:sytt:s::/ : :gh:sy(i:sy::s:" tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:" g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:r x g::s::tttsy s :s:" tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght x g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/e :s:n o :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:r :s:" :: s sy:: sy:: e: s sy:: sy:: pt:s::" :: s sy:: sy:: e: s sy:: sy:: pt:s::" :: s sy:: sy:5: s :: :y s :s:") :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/e :s:5:s:sy:::e :: s  s::/e sy:}: pt::/e sy: :) 5 :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/e syy:}ttts::syttts::sy sy:: pt:s::" :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::f :: s :: pt:sy:wa:s:sy:s::5: s :: ::f :uh:sy::t::/t:s:: :ght:sy :: ::f f :u]:5: s :: ::	 :: sy s :s:	 '/ : :guy::tB::f f :u g:hayS: e: s sy:: sy:R::5:i::f f :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: r tth1s) : :) : :s:s:sy::::i:s<   g:h:sy(:: sy:: pt:s::ly s s::5: r tth1s) : :) : :tthD5:i:hayShhD5:i :s:r x g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t<   g:hay: ed'g:s:e ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:x g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ssx g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:x g:sttt:ayy::::i:s< x g:h:sy:e:ay:s:sy:s::5: s :s:e ::i: g:h}t"es:sssyt:ay:sssys/e :s:n o g::s::tttsy s :s:e tth:sy: : :) : :s:s:syt:s:s::sy s :s:e tth:sytt:s::/ : :gh:sy(i:sy::s:e tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:e g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:n o g::s::tttsy s :s:e tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght o g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/l :s:h l :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:n :s:e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::e :: s sy:: sy:5: s :: :y s :s:e) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/l :s:5:s:sy:::l :: s  s::/l sy:}: pt::/l sy: :) : :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/l syy:}ttts::syttts::sy sy:: pt:s::e :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::m :: s :: pt:sy:wa:s:sy:s::5: s :: ::m :uh:sy::t::/t:s:: :ght:sy :: ::m m :u]:5: s :: ::5 :: sy s :s:5 '/ : :guy::tB::m m :u g:hayS: e: s sy:: sy:R::5:i::m m :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: n tth1s) : :) : :s:s:sy::::i:s< t g:h:sy(:: sy:: pt:s::ry s s::5: n tth1s) : :) : :tthD5:i:hayShhD5:i :s:n o g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< t g:hay: ed'g:s:x ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:o g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sso g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:o g:sttt:ayy::::i:s< o g:h:sy:e:ay:s:sy:s::5: s :s:x ::i: g:h}t"es:sssyt:ay:sssys/l :s:h l g::s::tttsy s :s:x tth:sy: : :) : :s:s:syt:s:s::sy s :s:x tth:sytt:s::/ : :gh:sy(i:sy::s:x tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:x g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:h l g::s::tttsy s :s:x tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght l g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/r :s:" 	 :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:h :s:x :: s sy:: sy:: e: s sy:: sy:: pt:s::x :: s sy:: sy:: e: s sy:: sy:: pt:s::x :: s sy:: sy:5: s :: :y s :s:x) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/r :s:5:s:sy:::r :: s  s::/r sy:}: pt::/r sy: :) ; :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/r syy:}ttts::syttts::sy sy:: pt:s::x :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::e :: s :: pt:sy:wa:s:sy:s::5: s :: ::e :uh:sy::t::/t:s:: :ght:sy :: ::e e :u]:5: s :: ::: :: sy s :s:: '/ : :guy::tB::e e :u g:hayS: e: s sy:: sy:R::5:i::e e :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: h tth1s) : :) : :s:s:sy::::i:s< e g:h:sy(:: sy:: pt:s::ny s s::5: h tth1s) : :) : :tthD5:i:hayShhD5:i :s:h l g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< e g:hay: ed'g:s:o ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:l g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ssl g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:l g:sttt:ayy::::i:s< l g:h:sy:e:ay:s:sy:s::5: s :s:o ::i: g:h}t"es:sssyt:ay:sssys/r :s:" 	 g::s::tttsy s :s:o tth:sy: : :) : :s:s:syt:s:s::sy s :s:o tth:sytt:s::/ : :gh:sy(i:sy::s:o tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:o g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:" 	 g::s::tttsy s :s:o tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght 	 g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/n :s:e a :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:" :s:o :: s sy:: sy:: e: s sy:: sy:: pt:s::o :: s sy:: sy:: e: s sy:: sy:: pt:s::o :: s sy:: sy:5: s :: :y s :s:o) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/n :s:5:s:sy:::n :: s  s::/n sy:}: pt::/n sy: :) e :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/n syy:}ttts::syttts::sy sy:: pt:s::o :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::  :: s :: pt:sy:wa:s:sy:s::5: s :: ::  :uh:sy::t::/t:s:: :ght:sy :: ::    :u]:5: s :: ::; :: sy s :s:; '/ : :guy::tB::    :u g:hayS: e: s sy:: sy:R::5:i::    :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: " tth1s) : :) : :s:s:sy::::i:s< l g:h:sy(:: sy:: pt:s::hy s s::5: " tth1s) : :) : :tthD5:i:hayShhD5:i :s:" 	 g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< l g:hay: ed'g:s:l ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:	 g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ss	 g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:	 g:sttt:ayy::::i:s< 	 g:h:sy:e:ay:s:sy:s::5: s :s:l ::i: g:h}t"es:sssyt:ay:sssys/n :s:e a g::s::tttsy s :s:l tth:sy: : :) : :s:s:syt:s:s::sy s :s:l tth:sytt:s::/ : :gh:sy(i:sy::s:l tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:l g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:e a g::s::tttsy s :s:l tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght a g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/h :s:x s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:e :s:l :: s sy:: sy:: e: s sy:: sy:: pt:s::l :: s sy:: sy:: e: s sy:: sy:: pt:s::l :: s sy:: sy:5: s :: :y s :s:l) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/h :s:5:s:sy:::h :: s  s::/h sy:}: pt::/h sy: :) f :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/h syy:}ttts::syttts::sy sy:: pt:s::l :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::t :: s :: pt:sy:wa:s:sy:s::5: s :: ::t :uh:sy::t::/t:s:: :ght:sy :: ::t t :u]:5: s :: ::e :: sy s :s:e '/ : :guy::tB::t t :u g:hayS: e: s sy:: sy:R::5:i::t t :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: e tth1s) : :) : :s:s:sy::::i:s< r g:h:sy(:: sy:: pt:s::"y s s::5: e tth1s) : :) : :tthD5:i:hayShhD5:i :s:e a g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< r g:hay: ed'g:s:	 ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:a g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:ssa g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:a g:sttt:ayy::::i:s< a g:h:sy:e:ay:s:sy:s::5: s :s:	 ::i: g:h}t"es:sssyt:ay:sssys/h :s:x s g::s::tttsy s :s:	 tth:sy: : :) : :s:s:syt:s:s::sy s :s:	 tth:sytt:s::/ : :gh:sy(i:sy::s:	 tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:	 g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:x s g::s::tttsy s :s:	 tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/" :s:o s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:x :s:	 :: s sy:: sy:: e: s sy:: sy:: pt:s::	 :: s sy:: sy:: e: s sy:: sy:: pt:s::	 :: s sy:: sy:5: s :: :y s :s:	) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/" :s:5:s:sy:::" :: s  s::/" sy:}: pt::/" sy: :) m :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/" syy:}ttts::syttts::sy sy:: pt:s::	 :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::e :: s :: pt:sy:wa:s:sy:s::5: s :: ::e :uh:sy::t::/t:s:: :ght:sy :: ::e e :u]:5: s :: ::f :: sy s :s:f '/ : :guy::tB::e e :u g:hayS: e: s sy:: sy:R::5:i::e e :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: x tth1s) : :) : :s:s:sy::::i:s< n g:h:sy(:: sy:: pt:s::ey s s::5: x tth1s) : :) : :tthD5:i:hayShhD5:i :s:x s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< n g:hay: ed'g:s:a ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:a ::i: g:h}t"es:sssyt:ay:sssys/" :s:o s g::s::tttsy s :s:a tth:sy: : :) : :s:s:syt:s:s::sy s :s:a tth:sytt:s::/ : :gh:sy(i:sy::s:a tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:a g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:o s g::s::tttsy s :s:a tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/e :s:l s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:o :s:a :: s sy:: sy:: e: s sy:: sy:: pt:s::a :: s sy:: sy:: e: s sy:: sy:: pt:s::a :: s sy:: sy:5: s :: :y s :s:a) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/e :s:5:s:sy:::e :: s  s::/e sy:}: pt::/e sy: :) e :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/e syy:}ttts::syttts::sy sy:: pt:s::a :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::l :: s :: pt:sy:wa:s:sy:s::5: s :: ::l :uh:sy::t::/t:s:: :ght:sy :: ::l l :u]:5: s :: ::m :: sy s :s:m '/ : :guy::tB::l l :u g:hayS: e: s sy:: sy:R::5:i::l l :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: o tth1s) : :) : :s:s:sy::::i:s< h g:h:sy(:: sy:: pt:s::xy s s::5: o tth1s) : :) : :tthD5:i:hayShhD5:i :s:o s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< h g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/e :s:l s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:l s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/x :s:	 s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:l :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/x :s:5:s:sy:::x :: s  s::/x sy:}: pt::/x sy: :)   :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/x syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::r :: s :: pt:sy:wa:s:sy:s::5: s :: ::r :uh:sy::t::/t:s:: :ght:sy :: ::r r :u]:5: s :: ::e :: sy s :s:e '/ : :guy::tB::r r :u g:hayS: e: s sy:: sy:R::5:i::r r :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: l tth1s) : :) : :s:s:sy::::i:s< " g:h:sy(:: sy:: pt:s::oy s s::5: l tth1s) : :) : :tthD5:i:hayShhD5:i :s:l s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< " g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/x :s:	 s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:	 s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/o :s:a s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:	 :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/o :s:5:s:sy:::o :: s  s::/o sy:}: pt::/o sy: :) t :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/o syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::n :: s :: pt:sy:wa:s:sy:s::5: s :: ::n :uh:sy::t::/t:s:: :ght:sy :: ::n n :u]:5: s :: ::  :: sy s :s:  '/ : :guy::tB::n n :u g:hayS: e: s sy:: sy:R::5:i::n n :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: 	 tth1s) : :) : :s:s:sy::::i:s< e g:h:sy(:: sy:: pt:s::ly s s::5: 	 tth1s) : :) : :tthD5:i:hayShhD5:i :s:	 s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< e g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/o :s:a s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:a s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/l :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:a :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/l :s:5:s:sy:::l :: s  s::/l sy:}: pt::/l sy: :) e :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/l syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::h :: s :: pt:sy:wa:s:sy:s::5: s :: ::h :uh:sy::t::/t:s:: :ght:sy :: ::h h :u]:5: s :: ::t :: sy s :s:t '/ : :guy::tB::h h :u g:hayS: e: s sy:: sy:R::5:i::h h :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: a tth1s) : :) : :s:s:sy::::i:s< x g:h:sy(:: sy:: pt:s::	y s s::5: a tth1s) : :) : :tthD5:i:hayShhD5:i :s:a s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< x g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/l :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/	 :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/	 :s:5:s:sy:::	 :: s  s::/	 sy:}: pt::/	 sy: :) l :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/	 syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::" :: s :: pt:sy:wa:s:sy:s::5: s :: ::" :uh:sy::t::/t:s:: :ght:sy :: ::" " :u]:5: s :: ::e :: sy s :s:e '/ : :guy::tB::" " :u g:hayS: e: s sy:: sy:R::5:i::" " :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< o g:h:sy(:: sy:: pt:s::ay s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< o g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/	 :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/a :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/a :s:5:s:sy:::a :: s  s::/a sy:}: pt::/a sy: :) r :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/a syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::e :: s :: pt:sy:wa:s:sy:s::5: s :: ::e :uh:sy::t::/t:s:: :ght:sy :: ::e e :u]:5: s :: ::l :: sy s :s:l '/ : :guy::tB::e e :u g:hayS: e: s sy:: sy:R::5:i::e e :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< l g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< l g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/a :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) n :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::x :: s :: pt:sy:wa:s:sy:s::5: s :: ::x :uh:sy::t::/t:s:: :ght:sy :: ::x x :u]:5: s :: ::r :: sy s :s:r '/ : :guy::tB::x x :u g:hayS: e: s sy:: sy:R::5:i::x x :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< 	 g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< 	 g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) h :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::o :: s :: pt:sy:wa:s:sy:s::5: s :: ::o :uh:sy::t::/t:s:: :ght:sy :: ::o o :u]:5: s :: ::n :: sy s :s:n '/ : :guy::tB::o o :u g:hayS: e: s sy:: sy:R::5:i::o o :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< a g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< a g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) " :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::l :: s :: pt:sy:wa:s:sy:s::5: s :: ::l :uh:sy::t::/t:s:: :ght:sy :: ::l l :u]:5: s :: ::h :: sy s :s:h '/ : :guy::tB::l l :u g:hayS: e: s sy:: sy:R::5:i::l l :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) e :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::	 :: s :: pt:sy:wa:s:sy:s::5: s :: ::	 :uh:sy::t::/t:s:: :ght:sy :: ::	 	 :u]:5: s :: ::" :: sy s :s:" '/ : :guy::tB::	 	 :u g:hayS: e: s sy:: sy:R::5:i::	 	 :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) x :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::a :: s :: pt:sy:wa:s:sy:s::5: s :: ::a :uh:sy::t::/t:s:: :ght:sy :: ::a a :u]:5: s :: ::e :: sy s :s:e '/ : :guy::tB::a a :u g:hayS: e: s sy:: sy:R::5:i::a a :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) o :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::x :: sy s :s:x '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) l :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::o :: sy s :s:o '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) 	 :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::l :: sy s :s:l '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) a :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::	 :: sy s :s:	 '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::a :: sy s :s:a '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i::syn tth:y::s:sy::y:s g:syttthD5:it:ti:sy::y:s::s::5: s :syttthD5:it:ti:sy:::ti:,dadti:ssy:: sy:h : s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : :w :s:s s g::s::tttsy s :s:s tth1s) : :) :syit:ti:sy::y:s::s:syttth : :) :suRyt:ay: :gh:sy1s :ght s g::s::suRytth : :)::: s sy'sy::tdg::s::suRytth : s::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:s s :D5:i::: ::i:sys:,: sy::: s : :):tttsy :s:D5:i:tguRytsy::: s sy:: sy:: sy::h:sy(:i::: ::i:guRytt:s:s :s:s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::s :: s sy:: sy:5: s :: :y s :s:s) :sytt sy:: syth : sy:}ttsy:5: s:sytttt sy:: tt ssyt:ay:syt:ay:s:: :y s :s s:syt:ay:ssyt:ay:ss::/ : :):tttsy :s:s:,: sy s :uRytttth : s::/s :s:5:s:sy:::s :: s  s::/s sy:}: pt::/s sy: :) s :s:sy::y s :uRytttth : sy:}tt:ay::s:sy::y:s:s:s:s:s:ttth:i:s pt::/s syy:}ttts::syttts::sy sy:: pt:s::s :: s sy:: sy:: e: s sy:: sy:: pt:s::5: s :: ::s :: s :: pt:sy:wa:s:sy:s::5: s :: ::s :uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:5: s :: ::s :: sy s :s:s '/ : :guy::tB::s s :u g:hayS: e: s sy:: sy:R::5:i::s s :u::ssy:D::s:s :s:s:sy::ssy::y s s::5: s tth1s) : :) : :s:s:sy::::i:s< s g:h:sy(:: sy:: pt:s::sy s s::5: s tth1s) : :) : :tthD5:i:hayShhD5:i :s:s s g::sy::rs s:ytt:s::/ : :guRytttsy : :) rhD5:i:e:s::/ : :gh:sy(i:ssy::y s :D5:i:e:s::t:/ : :gh:'sy::t::s::t< s g:hay: ed'g:s:s ::i:s) : :e:s::t::s::t<) :syttt:ayyy:}t"es:s:s g:syttth:sy:e::i:hayShhD5:ir(i:ssy::h:sy(i:sss g:syttth:sy:ey::s:sy::y:s:s:s:s:sy:st::/ti:sy::y:s:s:s::: pt:s:y:s:s:s:ti:,d,uRytt ::i:sy:/ : :gh: :s:s(y:}t"es:s:s g:sttt:ayy::::i:s< s g:h:sy:e:ay:s:sy:s::5: s :s:s ::i: g:h}t"es:sssyt:ay:sssys/s :s:s s g::s::tttsy s :s:s tth:sy: : :) : :s:s:syt:s:s::sy s :s:s tth:sytt:s::/ : :gh:sy(i:sy::s:s tth:sy: : :) : :s:s:syts::5:it:s:s::sy s : : :) :y:}tt:ay::s:sy::y:s:):ttth:i:sy:hsy : ::i:sy:hsy : :) rhD5:i:yt:ss::/ :,bsy::y:s:e::i:hab) :y:}tt:ay::s:sy::y: : s) :y:}tt:ays:syts::5:it:s:s::sy s : : :) :s:s::ss::/y:s:):ttth:i:sy:homit:mo:s:s
):}t"eIttt:ayy:s:s::sy s : : :)5:it:s:s::sy s :s::t::s::t<) :syttt:e :) :s::i:sy:homit:mo:s:s
):}t"eIttt:ayy:s:s::sy s : : :)5:it:s:s::sy s :s::t::s::t<) :syttt:e :) :s::i:sy:homit:mo:s:s
):}t"eIttt:ayy:s:s::sy s : : :)5:it,n7syttt:e :) y'sy::tdg::s::suRytlytttth : ss sy::|ceIttt:y:ss :s:sy::y s :uRytttth ss syutth ss :: s'::s :: s  s::/s sy:}: ::s:ps:s:ersotyttFsy::y s "eIttt:ayy:: s n sy:: sy:: sy:/mwy s :uR: sy:: sy:::hayShhD5:is!Tayy:: ssy::y:: 
n sy:: sy::Md	ttt:i/mwy s :uR: s : :::suRyt:y s :s:s) :sytt:Md	ttt:i/
:uh:sy::t::/t:s:: :ght:sy :: ::s s :u]:o: :ghytt:Md	th:sytt:ayy::::i:s< s g:h:s:i:e:s::y:: 
n y:s:)ytt:Md	th:syt :: ::s s :u]:o: :ghytt,:s :s ::s s :u]:s:) s :u]:5ey:s:i:e:s::y:::::i:s syi:e:s::y:::::i:s syi:e:ssy : :y(i:sy::ss syi:e:ssy : :yVt  s::/s sy:}: pt::
:s::y:::::i:s syi:e:s
otttthu]:o: :gT:::i:s syi:e:s::y:::::i:s syi:e:ssy : :y(i:syi:e: ::i:sys:;?tyi::s:s ty:}tt:ays:syts::5:it:s:s::sy s : : :) o%

e::i:hab)xi:hayShhD5oeytth : s::/ : :):tssyt:ay::::i:s< s g:h:yt:at:ays< s g:h:yt}:yt:ati:s syi:e:ssy : :y(i[: :) ::s::/ : :k :::ss::/ : :ki:e:ssy : :y(i[:hhD5yts::5:it:e 
osy::y s "eIsyi< s &c::5:it:sy:: sy:::ha:s:ps:s:ersotytth:yt:at:ays< s g)qs:s Crsotytts:s:ersot:ti:sy::: :i:s syi:e:s::y::::hayShhD5oeytttt:ay::s:sy::y:s:):ttth:i:. : :yVt  s::/t ::i:s::/ : :wPt:ay:: : s::/ : :wPt:ay:: ::s:syts::::/ : : : :)ttth :ay:: ::s:sya:ay::s:sy::y:s:):ttth:i: :wPts::y:::::i:s) ::s::otguR: :wPts::y:::i:sy::: :i:N0:ay:: : ss::ots:sy::y:sguR: :it:mo:s:ssyay::s:sy::y:s:)(:i,:N0:ay::s:syts::: ssyta::s:sy::y:s:)(:i,:N0:ay::s:syts::: ssyta::s:}?}:s:sy::y:s:)(::: ::s::s:::s:syts :: s :: pt:sy:wa:s:cy::y s : g:h:s|y:wa:s:cl:}: ::s:ps:s:ersoti:sy::byShhD5:ir(i. : :yVls ::n|s::/ : isssyyt:ay:sy g:hg:ir(yt:ay: : :):tta::s:s:i,:Nwa:s:c
y : :) rhD5:i::syn tth:gay:sy:::i: ,:N0:ay::s:syts::: ssyta::sT:s:D5:i:tgth:yt:at:[ : : :) :y:}tt:ay:s:}t: : :):ays< s g)qs:s Csy:D::s:s :st:: sy: :sy::ssy::y s s::5: s tc:'sy::t) s :s:s sy:h : s::/ : :wPt:ay:::i:sy:ai:y s :s:sD5:i::sy:,: sy s :uRytttth :lr)i::sy:,: lwy s ud	th:sTr: ::s : sy::_cc=::sy::|ceIt: :)t2{/s syy:}ttts::syd:.1:)	th:sTr: ::s : sy::_cc=:H