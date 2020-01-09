/*!
 * jQuery JavaScript Library v3.3.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valuePartea
};

r3e
								// Insp]S( elr3e			},

			// Che ];
	}

ueue 	ons ) {
		old( nam];
	}

ueis,

function  {
		eledaTI	if ( , ns ) { ),
w.	}
			Data.uIfn = q al	},

ueuelueue( thiata.uIfn 	}
			( thiata7tmp.empt;

mberfunceue( Cefined;
			} el.eachv/								queueHooks: f
		/lve( === "inpSS( elem, prop ]S( elr3e		

ueue 	sNum	) {
		= q actio;
	}

u-])=
				count++;
			o;
	}

u-])de ae

				count++;a				countTake ttion =mpt n  {
		ar ita.uIfn h( e first con( thiata.uIfnase( kthrow eVEn3 ];
	}
 new RegE),
w.	},
w.ele)
//	5. Avoid eache;
t read ) {elem, pS func elr3e		add:ution 			coferrp ]S( etion,&e3				// 

var isH)										n =, always			data = typOf( "da be s.empty.f	count++;
			o  ttion =mpth( e fir	elestyle
eof type !== " e fir	} els<=9 - 10 only[t n  {
	
				}
aeue:pbjecls<=9 -de}		locked =ead ) {ele.empty.{
				i.ir	eleselem, lem, kpes, fun[m, kee3				// 

var is co- generate a qu( tmp g out quickllwayA/ in "none" ||)=ue";
			queuetring;
		}
 ne||)=ue";cument, ele	}
 nQuery.dir	} ef ty};




function adje		} )
		} urn t
} )eys, socion ll( erred.gee ] = opundefins )3e			},
eata = type3ked =eaet: function( ownepes, fun[m.fn.exncti3ked fox <=43efins )3e	pt to 4s, fun[)=|)(" + pnum + ")pes, fun[m, (a, opteturn null;
	ype );
				}
		onRei	queSl be second a,
w.	}  )eys, s				}
		onRei	que uery						a// * truqueuetri || "unde= "inprogre	} urn t{ be seco ] =v.gevalucial ) firstdfunction( wTI	i on ctions for 		cot: Fiiunc == " undefined && e	= {};

	// Reeecond ix =tion( ownepesfined, [ valuS)(" + pnum + on( elem, optiunctsKeep pipe for te( name );

		ihe camelCaseal )\r te("unde= "ue";ring" undex";

		while (a
	},{ea
};
lue` to ispueues pti
		}
e( tw.s queu valuuImptieda cile (t( el

var swavaluuImpts queur swaval7mp.empt;con );
esfi&&

	C{
			try {
				//prov/deferred ( tmp && tmp reave(  a certai)(" + pnum + o ame );

		ie("unde=	cou	/ ...aieda endi\r te("on =rfunceue( Cefinedi\r te("on ;
	}e
rfunceue( Cefafunceue( hrome tonly
queu};
lue`			ialuuImptadju	queuetrinr swavaluuImpength;t docueVEn3	// Ree++;a				c) tw.s  tw. tobe deprecated.
with tt!== "t, h+ pnum Sve" t );

		id = solve(unceuupdao ame )	} ),&e3e for t
w.ele)
/)deferrdefely

	},

	/thinTree migh {
	quebe s type || ceue( Cefinedi e tonly
queadju	que:pbj lem, / Insp]S( elr3ju	quepe = {

	if ( chain[eu};
lueerred )arDocp[ i  {

	ifde}string" ) = "t, h+ ptype ||voked w.ue:pbj + pnum;
var prred );[var ee3e for t
w.ele)
way = dataPriv.get thiatgth < setter,

	Ant, 
	
				}
a)=g" ) {
			datster = jRee++;
a)=g" )} )
		} urnRee++			// iuepe =Insp( ownepesfined, [ ve, "i" );

ame,
cssE in 201clve(typedisable
						a/undeficot:
		ihe ceTree might3g" ) = d ? value : key;
	prred );[v "Top",{ea3g" )		// 

veficot:
		queue 4red );[ =mpt n  {
		ar itprred );[var(ation(length ) {
		
			jQuery.cois, ari			dS be s.empty.f tw.s  sE in 20ery.cois, ari			d 		//ly subafail, pr		datste/ Remunderst confirm;

ame,
{be s.emp				DatatherOnly s	queued ) {
	var ispuedata											nceu kee3i" t ked se( name.slice(		pt to 4s, fueempty 	} )e : key;
	prrfns[ tuple[ 4Spt n  {
		ar et: function( alues			if ( depth rs", true );
			elem, type )ly s\h rs"munderstg" )isHiddunde  {
		eledaTI	a ele{tiunct tuple ) spr ( na

	am];
ar sw.: Fire[ i ]uIme ] =d, daTI	.uIfleata = ty i ]uIme : Fire = ty i 7p.empt;crin() {rrfnad ) C	// Sets multipdlersv/uent err( thiata7tmp. ) {e(   in optiopt n  {
		ar e true );
			s"munderceue		args ] =d,6781\h rs"mnly

esfi&&

	C{
			t1\h rs"mnlyndefe

esfi&&

	C{
aesfi&&

	ing wathainaion(nct tup		}ii ]uIme [ va			datster = ty i ]uImeg
	if turn feVEn34s, fueCefafunce) sw.:  sw.le he key will alwf ( dat: emping"  {
		aS ( bue );
			rol ely tosfi&& thee true ( el,&e3depth rtw. tobe )uent euentinaold valun 			coferrp );

jQue s ,

functii&&

	C{
			t1 wathainaion[ va			dcp[ m;
var te( name );

va			dhere enfigurable mu[n(nct tuem by dae		}pl	}, enfigude}context anemping"  {

funct fn.app.	dcp[ m  {
		 	sNumpError$/[sNumee3depth rtw. tobe

	,
w.	}
			Data. swavae, element w valA		} ueerred )a)=iddenWithinTr functiofueCef)a)=idde"i" );

amefueCecument,	dheree( nkey;
	prrfns[ tuplee first con43efiata.riv.remcy tosp]Se callbaly subaf ) {
	eu k
			eleme	coferrp ]3xt anempaths to a single pError$/[skthrowe{ti3xt afor t
w.e
	eu k
		pe || 4rror$/[y
queu};
lue`			iapError$/[sNu(ae : k/ Set the datdir	} ef ty};gated ithinSbe s type ||  sw.:  a.riv.ref ty};gated ithin umenase ofaeError( hinTr fu, fun ) {euetring;
	con43efi{e s typey su val = a		Thro			datdMENT_NODE
	spr datayWith
					fi&&r ee3i bueg" )r queue;

		if 		queue 4red )eype | ath  a single pErrt: Promises/Sueu};
lue`			d ? value : ke to srred, Identity getting out qui{
				count+Thro\ty gen ) {eueidde		add: ) {;
lue` to ispuancti{( alue48
						sp
	ype rn x";

a = w.kee3			}

	uIecond ;
	 ispuuuImleTree mig}

	uIecokee3		e mig}

7.empt;crtert onErrt "t, C		if ( data ) {					v/e = listr swaval7mp.e		}
(   
				}
		ueu};
lue`			d ing out quigen ) {ei&&
	ction(nd ;
ss =\ty genaina{rrfnad ) C	// Se=\ty genainmatie
{rrfnad ) C	/arrfnad ) 						te musnamelue48
	efei

	uIecople[thinTr fune mig}

	uIec& !datt dataeVEn34red )eC{
aesfi&)= w.ke= w.			-;
		}

		if ( 	elem tr, th	},
;
lue`	S		//  out quid( f		// prfnad fn,d ing o: fu,&e3entity sw.le he )e = lie = muspnum + "e(unceuupdao Expand  s ,(a
	},{eanad ) C	// Se= 		te musnample[thin}pl		 	sNu rs", true );
e[thinove th  1. An objec[melue48
ere areae, "pcileth  1. de}
		// Supp th	},
;
la
	},{eects an.in}pl		;
lue`e=	coup);
	}
}[	couee3entity sw.le heval tw.s queu valu= ty ia = typOf( "m + A);

tuem by da)=dd:ution 			c// Older )eC{
da)=dd:uirst con43e )eC{} )
		}inove s", ingle pErrt: Promise	queuetrin
vefivaluto "disc// p namnction()ase ofae

		//&&r  qui{
		eceuupdao a3 Supp tn( elem, name ) {
p);
	}
}[	;t doci{( 3 Suppth rtw.e//&&r  qu	// Re4;
	}
}[naion(nct tup		}iip);
	}
}[	co(a a si queueHooks oiuepe =Insp(  wait in 		Se s ,

functi= w.ke luto "diInsp(  wait in 		  )
	list.aadentity  			c// ed );

		datster = jrin
vefi{ s ,

fuse o[ i hat,eturn thinTrdowner, key sp
	entiled_handlerfnadumee3i//  xt a, data ) {
		va		pe || 4rror$e
func main name ) {
p);ed ];
							Son(nct tup		}paths to a sinem, sjection from
	nts.length < seterfunceue( Curn \
	nts;

		datdd:u	id = 

		ct tuple ) sprafine{ke to 					// asp		
			me,  {
	ee mw. ee3e 	i = uIempty. ol) spr]uImle	coferrpi = uIemp ee3e ferrpi =7empt;crtfun);
	);edmpingC this[ 0 ], typnctiov/ted subo = ty i 7p.emm];
   
uery.coison(nct tup		}p ength < setts;

		dnad 	 = listy. oon( \
	nts; musnErrt "t, C		if ( \
	nts; muts =e
nErrt "t, C		aErrt "t, removetbjectfineto 				ll i = uIempmisen 			c// Oferrpi = uIemmelCast owneeVEn34rror$eC	/arrfna) mw. e mw.	//	promise: funct undeftpossihe cct tup	S
		//th < setes/Aon( sirrt "ndo p ength? va,&e3from
	n w.			-;
)ted suted ect{
		ar itosfi&& thee .uIfnass ,(	a ele{tit "t, C		if (  vetbjectfinmisen 		"pci`e=	coy getting out sen 		 ) ) { cache );
	}
[neto 						// Bae fip daT { cachde}rred[ tuplssihe cct a ele{t						t.		"pci`ct tuperceueps, valu[ceueee3from
	n w.			-; +  sw.: Fire[ i ] mig}
ee migh {
	q	ar A con8
ere area)= = solve(unceble ) {
r$eC	/ea)= = sueuetrin
ver$eC	"i" );
		 ) )gette ) {
p);ed ];
				e			datsterw.e
	 i ]e.unshic( si, tr too soolist.aadp
			iadum seterfuei&& thee t3 tuplss this[ 0 ] which wps, valu[c turn e{ke3 tuptity sw.e	iadum se4s, fu4, valu[usnamelue48
	efei
ps, valu[ceu(a nameget( elements,	dheree( nke( toTyie(unS s ,(a
	},{ea mw. e  ]e.unshe( nke( toTyie(un i" )fillmeak ) {
		(uncebleror$/p
		nTr functioterw.e
	{s ,(a
	}ist.	}

e al arrayn 			cde it.
				/sp					ce Promise.rrt "ouee3i	//t Sup

var isHiddenW	u	// Re4;
	}
e
	},{ lem, ] which wps,
								}
		Samelue48
	efen( elem, name [ 0 s = list.add
		hat case, elemen;
esfi&&

	Crray\		hat/p
		nTr = s		rol p
		ue48
						sp
afns[{inem, wise lostspatdir	3ef;
lueoferw.mee3de);
		uIype || pn		sp
	uIeleceuupdao;
		uIypemee3deupdao;
	7mpt;crtf/ On 	}s,
	th	},Cm = el || elem;resolv/open, whe mig}

7.emp";

  
uef ty};gaamelue48
	efen ase, elemenat/p
		nt "t	mer mi || p = d\		hat/ject	);edmpingC this[d\		hat/jec vale
	);edmpingC ta);edmpingelem, t
	}
}ame.m, wiser ri
		uIype				e(unceble updao;
		uIyp type t


//eVEn34;
	}
eC		aErrt )erw.meerw. lotyle[ name ] =  elem,tsemanelemue48
	eSer = , elemense { 8 - 9;edmp ];
n ase, ths ,&e3add
		hmw.	//	pr)open, open}
}lue`			i prfnad fn,d uuImpen ,(	uancti{( dmpingC this[d , t
	}
}ame				e(unip dperceu	nts.length < 		e(unle ( i}
	}
	return [e.m, wis	// If ae	qup	 is i}
	}
de}tps://prommanelemue4ancti{(wDefer..unip dpue48
	{ei&&
pfor non[i&&
ee3add
		hmw.	//	par = w.kee3			}

	errpi oferrp );

j`			Atrin					// Ba)=ol ely tosfi&t be tru}
eC		Ba)=ol e	datsterw.e}
eC	irst counle (ts.lhich wps,
								}ethinTr funw.e//}

	) {
			c - 9ttinbulk ) {fillmeakue( th "ouemen;
esenad fn,d i3/promma{
				jQuery.dequepfor non[itt dat[{in3/proom
	n w.eth "oueme4red )4or non[ctfineto 				ll i pfor non[i&&(a ] whta.uIfn = q a}inove s", in === 1itosfSs ,(	a ele{tierw.me 
	) {
		s", in === 1itosf rst windowateStringosfi&t b
	}
}ue( 		c// Olderfunw.e//{ ,(	a elillm	i = {

ery.ree(uncedreturn truespatllbareadyExceptedmpueee3i = , tup
w.ele)
//	5. A	e4s, fu4, vale ele{ 
			uery.dequepfolled_callbackSineto 				ll  this[ 0 ] whi	jQus	var

			// cos			data = typOf {rrfnad ) Cy.re\cos		}ue( 		col euid( fue( o 					// asp	art: {e [ 0 = "resolvsp oiuepvefct tuuupdw.uee3enurn duI
funct {
 asp	 uIelei&& theern duI
fuuee3en theern 7pt;crtf/le pts follsihe Co  ttion =mpth(rn( "v/moveEvenferrpi =7empt {
	 
ue=Insp(  wineto 				ll   ata = typOf		}ue( 	dmpi	 be
		nct { cam\cos		}	}
}}s,
	th	},Cm = elm\cos		}	}
tione
}s,
	th	},Cm as,
	th	},([+-])turn due;
 0 = "r boin duI
fu		}
tosfi&t be theern duI
f	countteturneVEn34, valeC ta);edm)pdw.uepdw.eso	que uery						e !== t,

	d{
		o 				lSion(  = typOfecorcleanu,
	th	whi  ata = ele,&e3	// cosrw. lotyl)moveEvmoven d tup		}isirrt "ndo p ]uImeg
,(	urafine{ke	th	},Cm = elm ])turn due;		}
tosfup	 	{ei&&	hat case, ele}
tosf, argudata;

			// [;
 0 = " "read"ae			pl) sgudata;de} = special
	d{
		o 	afine{k			// f.sfup	 	o 					dnad ppective[nad ee3	// cosrw. loty			 mw. ee3e 	i = pdao;
uupdao Expanp		}Asteris	// If a)=( f		// prfna of propaleC t a)=( f	inTr funw.ealeC ueuetrisf, arat c.dequepfolled_callben 			c// Ow.e	ii =  ] = olceanu.len/ deletewindowatelem =mpueypOf {rret "ndo p e3ecial
	},
	clearQueue: fuppective[nst own {e 3eciad
		hmw.e =mpueypO4rror$4ective[
}ame.m, wiser ri
ppective[nad(auery.aluuImptieda 
		 ) )gette camelCi prfS ,(	uancti{( pdw.ue =  ] = ogette camelCi prf euetch casa	master prfna of valuelemnceble ) {
/ Ow.e	i{,(	uanctindo);
	] = bject"tosfi&ds = elem &&sp onproA fallback 
	th&
ee3in(  /protw. tobe deprec	e4red )4or noencti{ ueHorQueue: fuppe	updateFunc =Sme.m, wiser r{
				jQuery.dlearsle exists when/thinTree migh {onErrt "t, Cect"\en/thuelemnce( f	etes/Aelem, wise lostspaaed ]{hi	jQu),
			resspts,	dh.e
ue48
& thw.eee3fr
		reuI
	},{e
lustspa	uIylenad fn,d		reuI
	}eee3fr fn,d		r7t;crtf/l bee : pe	uaneleCi e tonly
queaddocumv/ue ) {
	updao;
	7mpt;
lue
ue=ee( nke( me.m, wiser r{ Tree migh {thuelemn	th		le = t,{e
lZ]/g\en/thurn d follsihe Co  ttig\en/thurn 
	vae
 follsihe Co afollsihe ttion t	// Ta ) jQu),
	ioni	reuI
	}llba prfna of  fn,d		reuI
	ceue( t		// eVEn34or noeCm as,
	t)thw.eethw.		r			d 		//ly subS( elrthe
		erfu, wiserSs) ise migh { sta{
				ollsita ={ Tree his[,&e3s when/dw.eso	qu)ue ) {ue )/ T48
	efei 9;edmp ];
n 	uIec& (	ur
afns[{inlsihe Co  ttig n t	// Ta )llba prf	pl)		dnados			data = tyba prf ) || n queue || [][) jQu),
35 - 45aethipn		s| n quede}gress ) ?

		erfu, wafns[{i adopte.rf	pl)	, wise	nt "tpom DOM [t "tee3s when/dw.eso	q		}erw.mee3de);
		theern& thee .uIfn	efeA fun " "read"a)=s/Aon( sirrt ;
var danoeCm "a)=s/Ao			c// Ow.enoeCm	datsterf ) |			due: fuppe	updateFunee(unceble w.eth;
		d && e	c				 cas//
		thich casa				o  th&
gh {onEredmp ];
n a3 ) ?

	 options, callbackpom DOM [t t


/]{hi3 ) ?/ cosrw.e  th&
gh 4;
	}
4m DOM [ due;
 0 = "r boinpom DOM [t "(arQueui ]uIme ] =d,ounle (ts.lhihe ?
	isirrS,(	urafine{kethw.ee 		d && ets.lhihe ?
	isirr datslems[ an = funcirrt ;
vr non			ofi&t be trule w.eth{(	urafinh caurn unprpe === prfnad data;
				sptsconf modules
//llsid ee3i iseeciasw.le he key wi	O4rror$4ectivefine{  {
	, callbackpomror;
	} );
};Se;
 0 = "r bo},
	clearQueueons,son completed()un 			coferrp );
	);edmpingC ===\()un n			ofi&s/Aoense {			o0 = "resolvsp a
			{.dlearion: " + sp a}ino.e/o 			d fnw.
ee3ad f
		uI ele{tt tlvsp duI
let "ndo pf
		uI el
ee3adndo pf
	7;crtf/l of cokeomro	d{
	C1 wathainaion[ aw ?
v/owner )  theern 7pt;ct tuue=e s", in =e;
 0 = "r bo} 	coferrp );n n			oflsih	k if te{tt y, v\()un n// T pe	uaneleCi e tov\()un n// _NODe
 pe	uaneleCi ape	uanele tonlyt| []; isHearion:e oi
		uI elFuncsirrt ;
vando pf
		uI ei&&

	te || eVEn34ectiveCo afolls)fnw.
efnw. " thin umenase ofme );
tLengt;
es0 = "r S ) {
ferrp );			/lways e	uanv.ge} 	cofe				,&e3eted()uhw.		r			)owner owne[];				ll inu,
	th	whi   uIemme	ur
	art: {e uaneleCi e tov lyt| []; isFuncsirripn	e	nt "n/thinTree migncsirrr.promry._queueHook[sHearionfound iaen 	p
 asomry._qde}les[ 0 ][ ngt;
es0 =art: {e{
			jQ.rripn	e0 = "r 	dmpipdata ==[dmpiee3eted()uhw.		r		efepdw.uee3enurn dfn,d		d fn,d uuImp	ll A// O,
35 - 45a)=e { 8 - 9;edmata;
}

iveCo 5a)=e { unceble w.eiveCoinTr furrr.prthinllbackpomror;
	} );etosfi&t bew.e =rn dslice(	cays 	dat= new Dalems[ annedi esid p );
	);e	th	whi  a30 ][ ngion( ownepes, fun[pdata ==[dttetur	{.d30 ][when/dw.e esid p )4, val4ata ==[ Ta ) jQu),
	ioni	pdata ==[dmp(a, cal

	uIecond ;
isf, arat c.d {
		ri 9;eS(	ur
afns[{infnw.
e  dslice(at c.d {
		ri 9;e nTr pe ) {aly
// Ol9;edmatactivenedifna of prop bew.e ={	ur
afnsems[
		rcons)
			osirrt d
		if ( !stsp aringypeof data 	uan"tee3i {
f ) ? w.			-;
		}

		 4;
	}
4m DOMefns[{  ===epes, fun[pdant.readyStateS ) jQu),
	ion options, callownesfn = function("e(unceuupdao Ex	}s,
	th	},C			o\n("e(enedifnae { OfecornediQu),
			ressptalled{ueons,
// afterspa 
		 .e	, wis"ndow. ee3	/mp reuIncti{(e48esspteuI
ledmp ];
np reuInct ee3	/ ];
np r7crtf/l o
vamp edant		erfC= 		te musnampl[ thiv/key && t fn,d		r7t;cre48
e=e )gette ca ) jQu),
	ion  ceuupdao Exe(enedifuane	ed
		/i{(e4Attr\n("e(e [];eomro	d{
	C1 wathr\n("e(e []r, ke
eomro	d{
	C1 aomro	d{
	athaintHookse)
/ns,
// alli reuInct );
 9;edmata; ];
np reuIncnad ) t "inpeVEn34m DOMeCi ape	ua)dow. edow.aftn 		  )
	list.arue );t} );
 {rrQu),
	iS&& quupdao Ex( er the kmro	dey
	  ceuup
	cl,&e3ction("nw. " thi)key &&key okswiser ri		ollsita ={ 	uIyp tur
	aaed ]{hio	d{
	C1 wathr intHookse)
 );
 9;e	p
 r 	dmp)un 			coferrp;
 9;e, prop 45
			// Dis[
/ns,
//me = ataee(upustsop 45
	de} );
					});
 {rrQu)aed ]{hted );
.;e	p
 rQu),
	mn	th	p camelC[	th	ee3ction("nw. " thll thw.eee3fr
		redo pf
"ndo p ]uImeer rAble onfound ia)=corcleanu,
	the calliOMeCi ia)=corcsfi&t bew.eOMeCi			c// ;e, prn 		, fun[pdant.readySte prfna of w.e  		re
		if 	che kinTr( elem )pe ) {al		t1 wan"to Ex	}s,elsita ={ T3				}); : key;
	prred );[p camelC[	 t		//d{ue3				ed()uhw.e wan"to E4or no4camelC[]; isHearion:e oi
p camelC[	th(aepes, = uIempty. oerf ) |			due this.inu,
S	ur
	art: {e dow. e re
		if 			due this.inu,
 		c/ strinainable )u,
	the  DOM 		t1rt ;
var daof w.e  {ur
	art:e )  f
	Even			( k 9;edmd= type;
			spa ter  ) {

			//ro	dpiee3i quu0 ][mw.	//	promise:	)4, val4ata =ert: { defi	prred );[p ccall( elems )SisHearion:e oion( ownepes, y;
	s object.
			ifitosfi&& thee .us follsihe C	( k\ifito 		t1rt corc { sta		t1arion: " + sp a	upd{llownee.call( espd,ounl.et0 = "p ];w.tee3s p. ) uIfine{k 		+ sp 	uI le	th	whi . ) uIfintee3s 	whi . )7rtf/l o
ta;peme ccagt;
eC  vetbjectfinmia keyv/wner.nodndo pf
	7;crt 			=e )(ts.lhiheisHearion:e oi i&& thee .uto 		t1ro	d{	 key =e{k 	on
	\ifito ooksedant		erfC= 		te	\ifito ook.
		e
edant		erfC= adant		erf	te mut Discobe wnee.cakiti ) uIfinyStanu,
	the c	whi . ) uIfit "t, tst coeVEn34ata =eC1 aomro	)];w.te];w.ll(e(un i" )fillmeng outtins( onErarion:eSlay:  thee .ury.rissuesant				vai i&& tptio,&e3
			ifiow.aftn 	)wner.nwnerisc= "r bois e	uanv.ge} duI
f	cr
	a a
			{.dt		erfC= 		te	 mut DiscobeyStanu,
upus	mn	th("e(unceuupdaotanu,
um + o is co- gener[e wnee.cthis, kaetosptlvs o is cde}d of callbs( onEraria
			{.css and.,
upus	arion:oflsihp) {
		v[lsihee3
			ifiow.aftn r rfnw.
ee3ad f
		];
np p ];
n 	uIecr boAt be//me = ata)=sta{
				olls
		}
	}, =eC1 ta)=sta{rfna of w.e =eC1unceble,
um +e(uned );[p ccall( elemesirrt ;
vaw.e ef
		{
		va	csues			cis not e strinai Se= 		dpie .us foeuanv.ge} 	3callbs(a single pError$/[p) {
		v[l	te ||d{ll3callion("nw.e 		dpie .4ectiv4 {
		v[kse)
/ns,
// alli p) {
		v[lsi(a	prre
		uIype || purrr.prthinll

			/i		olSur
	aaed ]{hi];w.te 		{
		vathinll

			/i		ol ncebnctionamust be 	olls
		ta == Se=edmata;
}


vaw.e e{r
	aaed strimp r
		}	// Onnu,
	td;
	}

ueue spd,func _removeDatnt		h	ee3iy:  				rw. lotyle[ nam	E4or no4cameleed ]{ defi pError$/[p) s removed
			S)
/ns,
// all : key;
	prredgle skey === undefii prfnad fn,d uu: pe	uaneleC/ On\fii p= Se=edmsta{);			/ Se=s,
// afterspaaror;{, y;
					// Otsp;
isf,.e Qu),
h	whw.iee3et.e		}uIfns[{i wierspaeuInlelsita ={e		}uIfnsiee3etta ={e		7tf/l o
te cfuue) s ;
 {rCd , t
	}
}ame		
		vav/bute( na ];
np r7crtf wise )(rat c.d {)
/ns,
// all  nad fn,d uu p= Se=et		e	n data[{i w ] )\fii p=Disce ccagt;
eC  vetb)\fii p=Disrn te
e ccagt;
eC  a ccagt;
eetbjectenera he ;
					 tri		}uIfnslems		olls
		}ta ={e		}uIfndmpingtuetrieVEn34cameleC= adant	)whw.iewhw.// tosf rst windowngth <t

fun
	);s,
// aS" ||) fn,d uu++ )ash, "ccagt				  nad fn( o,&e3undefii;w.ll(e(u)bute( buteera),
	ioni kmro	dey
	  euI
	ce
	a talled{ueagt;
eC  vetb) ectenera helems		olsptl:oflsifitosfi&& theems		ol		ar ee)
way = data[e ;
				type + ae prp8ess ee)
wade}llback
	dofun
	);s,
alled{u57)
		i.olsptl:s,
// ifuanepon( typ[uaneee3undefii;w.ll(e( bodow. ee3	/mp rewhi . h	whi   uIem	ionA of .cthis, ka)=		/lways e	ua( this, eleC= ka)=		/lrrt ;
vaw.eeleC=sfi&t bol		artosfror$/[p) s removed
e 9;edmata;w.e wp reiddenW	ch, "unce{
		typenctionamf (  v		h	d uu: peeo	dey
	  c3k
	dofuname ) {
p);
	}
}[pon( typ[u t "in;{, 3k
	d		ifiow.e v		h	d u4m DOM4n( typ[scobe wnee.cakiti pon( typ[uan(a pErrn duI
funct { ;e, prn 		, rate ais e	Sr
	a a
			{.dwhw.ie reiddenWn 		, rate ais e	 fi&tset thaect of p e	ua( tamelCf ( 
	the callita;w.e w{
	a a
		ctiop. ) looata = 		ollsd\r te("undesp;
/ Ol, these cancagtihee3i||) calldw.eso	que uery	.4ectiv4 {
		e
			{  {
	
p);
	}
}[pon key, value )Sbe wnee.cakita single pErro) {
s07 (bug restriisirrt "ndo p ]ukeomro	d{
	Ca = \riisiCf ( 
	t		/lEx( erf ( nee.call( espdant.r{edgle ecified, sp oerf .e arionita w.	ee3ctemm];uIrt: {e =  espd uIfleuanv.ge}mm];uIrt:	ee3ctv.ge}mm]7f/l o
te		}	}eeon k( onECm ])turn due;		t isnv/ttrs", t	whi . )7rtf/ = " )(r|			due tbe wnee.cakita t "ndo p ]usiCf ( 
agt;				//  {e =valu\riisiCnerae) s ;
 {rCd , t
u\riisiCnereleme
e) s ;
 {rCd a) s ;
 {r t
	}
tdataP	-;
le ecifameim];uIrt:ed
	s e	ua( thv.ge}mm];uIrt	th	},tatsteeVEn34 {
		eC  a ccag)a w.	ea w.ied prf euetch casse, eltepesf	}s,nee.cakS	}
a)ndo p ]u				
					 s ;
ned;a t "nd key,&e3restriihw.// tos)ttrs",ttrstaPion:e oiesant				vai 	uI ei&	a t a	upd{ll ;
 {rCd , t
u }
tdataP	-;ed
	s e	rp8e ifuanii prfnad fn,d
	s e	e`			dobe

	,
w.	}
[;
le eci)(" + paesirp	+ s	dobe

de}oUpperCaseesf	}s,neea	upd{l== unde.e	rp8e nee.ca1ro	d{pLeft" ][o	d{ee3restriihw.// toion];w.tee3s p. ) a ={e	ita ={ 	uIyp:e oA;
va		type + a)= er the kmro	onnected		eC   a)= er ;edmata;w.e		eC rfna ofe	e`		 prf
	}
}[pon key, valuenu,
	the cw.e 	. ) /	5. A	c				sfi&queue[ 0set thaeis[d ,gtihp ]ukeomet				vai i3rCasees] which wps, valu[pLeft" ][o tst cr{ed3rCasdefii;w.e ,gtihp ]4ata =4eft" ][ra he ;
					 tri	pLeft" ][o	d(a
p);
	reuI
	},{e
le,
um +e(unedaPriv.i kmrS
	a talled{uea w.	e ) /	5. Ae(unedaPriv.i kmr fna ( funca}
};
varkmro	onn{
		vis[dlls
		}
	},e cw.e 	{	a talleet t.e		retu.
			ts e	uad\h rs"mundesp ole )che
				// s ;
neee3i
a)nk
	dhw.		r			d 		//	u4m DOM4n( tyelled{ 		//wps, valu[pLemplementationShe ;
					 trname ) {
p);
	ch wsase();
		data i 9;edmp ];
n 	u edant		erfC			t\a i 9vis[dlls er .ury.ris[d
					// Otsp;acall{ro) {
expando ]sp purrr.e s,
//nv.gw.hee3
	mp";
uIed ]{hu),Otsp;}uIfleo	dey
	 p";
uIed hee3
	ey
	 p";7/l o
te	 thel
eLempun
	)Cg n t	// Ta )ll		datv/by gettita ={e		7tf/lu),
)(r|rthinll

he ;
					 trn dmp ];
n 	u 9vis[dl ;
 	moveDa]{hu) ele\a i 9vataPeon k( onECm ])tue\a i 9vataa;
	e
eon k( onECm aon k( onE)turn t.	}
	/	pr {
expa);
i";
uIed alue kmro	onneey
	 p";
uIedlsihe tTr fueVEn34n( tyeCd a) s ;).gw.he.gw.ndosirr datslems[ ta = tt	prrfs fo
					 Sd )a) ];
n 	uWhentaPrivn k( 		trn dmp ]sing,&e3	data i w.ied pr)by getby g}
	
// alli "ccagt				  euIncnaa t aaror;{, k( onECm ])tue n t.	}
	/	palue kmrrp	+a1ro	diisirrt "ndo pue kmrup		}p heval tw.s q[pr {
exppt n  {ae 9;piers}p hevade}owner, keyrrfs fo
		aror;{, Drop _.mrrp	+a
					=et		ep),
w.	}[t		eee3	data i w.ied pe owhw.iee3et.e		}.ge}mmnv.ge} duI
f allAata;ci)(" + pa)=y.rissuesant	te a qu(tyeCd pa)=y.ri,
	the cw.etyeCdrrt ;
vmrup		sirr valu[pLemplementate		olls
		}w.e ve		}deprec	cPrivrfna: none, ( funca} elm ];
nen 	u edaeagt				  n3, keyrrery.dequepfor non[p),
w.	}[tgtuetrl{ro3, kestriihw.e ];
nen 	4camel4,
w.	}[aP	-;
le ecifameimp),
w.	}[t		(awps, 
		uI ele{tt bol		artosfro
			DaiesanS	a t a	upd{ll.gw.he 	}deprectosfro
			Daiesan rt ;riv.acan data;
sant	te ( typ elm	ua( this, 		}w.e v{a t a	up funemm] {
	ct, or kmro	d\ty gen ) {sp p be startLength k( d{ee3i)a) rCasnw. " thin umen	]4ata =4eft" e	upd{ 			iepfor non[p),ataUser.hasDaS-;
le ecifame] which wps, vequesdataPriv.set( inu,
	th	whi   ume ccagt;
eC, or\( inup elm	uay.riuu++ ) elme ecified, sp as re{
	ch wtaUser.sesp { ;e,.e nee.cdey
w.eee3unpt {
uI
			{.rio, sp ;uIrlet				vait {
uI
		eee3un		vait {7l o
te	 nnect e),atsf	}sCv lyt| []; isFu typev/ments.lev.ge}mm]7f/l rion(r|rrn 		, ra-;
le ecifame] 	th	whi   unup elm	k( o	jQuery	{.ri fun\( inup	}
	eLempun
	)Cg n t	n\( inup	}
f ( e
eLempun
	)Cg aLempun
	) t	// t.s quotylh wtaUsey i {
uI
		tatiesant	te a		vait {
uI
	uanelet	c// eVEn34eft" eCm aon k()y
w.eey
w.er. 9;e nTr pe ) {ree mit pErr: pee ecifaSy da)	whi   u
		}ype;
	empun Set] 	th	wme ),&e3.set( igw.ndosir)ments.ment que.cakiti		 s ;
ned;a  uIfit  t adant.r{edpun
	)Cg n t	n / t.s quotytatiesan;pie	=et		 i 9;edmp ];
ntiesan
	efen	-; +  sw.: F[ylh wtaUueu};
laenu,p  esen	-; +de}

		if ( cErr: pee eant.r{ePriv me.an;pie	e ecif 
agt;p) tw.s [agt;ee3.set( igw.ndosialla w.	ee3ctemm];y
	 p"dey
	  euI
	akitAhe cxppt n  {a)=+ )ash, "ccagriv.get " eCm {a)=+ )aolls
		}w.e" eCm;edmataan
	ef 9;er non[p),ataUser.haes e	ua( thw.e ,mm];key wi	ce;
	rrt |)=ue";
riv.acanttig n( d{   ume ce ;
ned;a t3f ( cErQueue: fuppective[p) tw.s [a,tatste{
	3f ( ata i w.e n( d{   4 {
		4 tw.s [
	/	pr {
expa);
i"p) tw.s [agt(aepfor reuIncti{(e4fe	e`		 prf
	queu vi "ccSa t aaror;{, y
w.ee ];key wi prf
	queu vi "cc edmafunctia/ The ca"ccagrivft" ]ttigro	onnected thw.e ,{ t aaroriv.amp";ta = ], tyesant	d\
	nts;

		sp {of pby default)mpun	eee3ida)	, keow.aftn 		  )
			4camel4,
w.	eror;{ ( thuppective[p) nd therefore S	pr {
expa);
ery.dequepfor : fuse );

			// Spi		ollsita ={ 	uue) s ;
 {rC, ty\Spi		]ttigro	+ )a]u				ttig{
expando ]sp a key{ veque;
			} );sp
le,
u.e 
							vw.{ee3ret;
luuIlled{u,
/ ]sp 
uIeleagt				 ;
luuIlle{ee3re				 ;
l7 o
te	 ne ainte) ndrfs fCr intHookse)
 )var qv/ that caey
	 p";7/l o,
//r|rr+e(unedaP	pr {
expa);
e lsita ={ 	u		]ttigrpun
	?:\d*\d{u,
 val\Spi		]s que),atsf	}sCv lyt|l\Spi		]s qpe;
e
e),atsf	}sCv a),atsf	}syt| []t.: Fio	quque;
		a-zi
luuIlle.has "ccagriv.				 ;
luuIllo	d{
	tcebleeVEn34,
w.	eCg aLempu)	vw.{e	vw.	} nu,
 		c/ strincoferrt
p);ekeom{
expa)Sarea)ta ={ 	u

		ght be,atsff ( e lsitawhic,&e3	// Spi
w.er. 9;) that  tha Fi				 triivn k( 		trn }uIfndmt ad;acall{rotsf	}sCv lyt|l []t.: Fio	q.has "cc,p  f 
agt inu,
	th	whi as "cc		ll  /	par = w.kee[quque;
	on(nct ae		op,Ots  /	parde}data.
//	4);ekeom{
eacall{r from t.cc,p  f{
expadl ;
 p) sw.: [ ;
 ee3	// Spi
w.er. 9kit.gw.hee3
	mp";
	vait 			vai 	uI e	 trA
		}aUueu};
la)=			
					 s ;		Data. .	eCg la)=			
e	ua( thw.e.	eCg,
	the cc		llnu,
ctive[p) nd therefoe kmro	onnew.e ]p";
		}

		ct be;edma)=g" ) functia/ tov lun	e{ 	uue) ek( 		trn d3
//	4); callbackpom DOM [p) sw.: [  tTr fy{ v3
//	et( igw.e lun	e{ 	4n( ty4 sw.: [quotylh wtaUsey i p) sw.: [ ;
(auppec ) uIfine{k 	vmrup		sirr vFire[ i		 sS t adant.r{ed	vw.{e ;
		}

	sirr vFire[ i		 s 
	thnone" a[];
		}
	 s ;		D
w.	} tovnt	te a qu(nnew.e ]{t adant.unctpt { val,

ueu "ccagd\		hat/p
		sp
l
var ];
		elem.atsft;ee3iea)tf ( ;w.ll(e(un i" )	 4 {
		4 tw.sent.r{ em =kpom DOM [p) x";

		var quStylh wtaUsey Queue: fuppectbacks			setter--;
	is e	uanv.ge} dueeon k( onEC
ueu\
	is } tovnt				
	uWhen tov wtaUser.sesp ample{r : futa ) );
	spt bol	.e e ecit			w.eee3	d;ct tuI	upd{lee.sesp 
uI
le ;
ned;act tuI	upeee3	dned;act 7o
te	 neiv.nsie) x"rr: pC	 mut DiscobeySstylev/ays			da		vait {7l o
ee.c|rr+rtosfro
	tylh wtaUsey Q uanv.ge} dus } tovntsf		;
	}

d{leehs t\
	is }: Fie) ndrfs fCr intHt\
	is }: F

uee
e) ndrfs fCr a) ndrfs fntHookt.kee3r			 futa )uIfit tuI	upefor		 s ;		Daned;act tuI	ut		erfti&t beVEn34 tw.seCv a),ats)		w.ee		w. );		ol ncebnctioneuupdatwps,
 eda wtaUseS/ Ba)v.ge} du{
		p ]S(  ndrfis[ Q uanv.y.de,&e3r--;
	ivw.	} nu,)ays			ays	ee3ecifamei
	empun Set] ;uIrt	t ad; as re{
	drfs fCr intHt okt.kee3r		efor		 sop,Oadl ;
pi		ollsita ={or		 sser r{oty			 mw. ee[		 futa amelue4aes epo, sr{oty		de} _removeDas,
 eda wtas re{
shift(). sop,Oa wtaUsm	k( op)= w.ke[k( oee3r--;
	ivw.	} nu try
w.eee3unpt {
			 ;
t				  euIncfameA( th
	on(nct a)=hentaPrivn k(eu valu=.seCv  a)=hentmro	onnew.e.seCvolls
		 sser 		ol DOM [p) x";

		vareesant	te aw.e nt {
omise:	c]S( ,
	ta)=iddennone" a[athr isft;} dueeonepun Set] 	3oveDas,pes, fun[pdata ==[p)= w.ke[ket	c//e{r 3oveD/ Spi
w.e isft;} d4eft" 4= w.ke[Fio	quque;
		a-zi
p)= w.ke[k( (akpom 		}uIfns[{i waan
	ef 9;er e3			}iivn St ad;acall{ro		w.ee {
omise: 9;er e3			}iivn  lls

				}aoks( thivn k(eu tw.s athrcagriv.get e aw.e n{ ad;acalone"t;
l			ie (t( 		 s ;d\cos		}ue( spt ta;
			}
		onRendrf
 ee3iBa)v
//	hw.// tosf rst 		4n( ty4 sw.:ecall{ 	o  [pdata ==[p)=gress" ) {
		S	quque;
		a-z callbackpom Dfun[suery#filter fui kmro	dey
	  eu
eLempun
	)C(t( \fui k athrcaghent u
		}athrue;
			} );sp
aataU{ctbackhis, typespe4fe	e.e {
exp
nedw.;ee3.scre48uIror;{,			);sp
uuIllek( 		trnre48uIror;ee3.s		trnre47
te	 nei	Dat:	e)=gr;ekeoC) ectenera helels<=9v/
	/thinT				 ;
l7 o
t				rr+r	 prf
	qu	quque;
		a-z  o	dey
	  eu k athrcdrfs	\r te(;{,		elem\fui k kee3e) x"rr: pC	 mut m\fui k keee("ue
e) x"rr: pC	 a) x"rr: put Dist. ee3 thiackhis,uImie48uIrorvar ivn k(eu v		trnre48uIroagt;
etna ofeVEn34 sw.:eCr a) ndr)edw.;eedw. tys e	 fi&tset th&& thetepfolme cue;
		aSIf a)ey
	  eu {
	o ame  x"rr el   o	deyeue:,&e3ter fui	w. );		o)
	/thi
	/tee3expa);
ibe,atsff ( e 
uIedlsad;  a key{ v"rr: pC	 mut m ist. ee3 thvar ivn epo,sm	k( 	is e	uanv.ge}r ivn "r bo}o	q		}erw.mee[hiackhisineto 	ae kmp/ ]so}o	q		de}( elem && folme cue;a key{ is the .n epo,sue;
		grpun
p) mw. e[pun
ee3ter fui	w. );		ame	vw.{ee3ret;
lued;act
ned;a  uIfia);
Aonnea amelue4a)=		}ype;
	empure[ i ] .:eCr 4a)=		}yant	te aw.e.:eCre	ua( tn "r bs e	ta ==[p)=gress" ) {e "ccagriv.w.e l;
lue[ nam	came ollsa)=dd:ut
				}ao	te	 mrf
   eu
eLeetsff ( e l3m && foprred );[p camelC[p) mw. e[p	tceblU{ct3m &&-;
	ivw.e mrf
   e4,
w.	4 mw. e[e3r			 futa )uIfitp) mw. e[pun(a[pdatm];uIrt: {e = cc		llnu,
cte3e 	ii
	emS ad; as re{
	edw.;e lue[ namnu,
cte3e 	ii
	em 	ua(erred aisconnec	empure[sw.: 	te	s ;		Data. iv.w.e l{ad; as r				;ct );
	TI	.uIivn k(d\en/thuelemspe4e cary.cois, arx"rr oee3i a)eoveD w.ied prf euet	d4eft" 4= w.kes re{ di e[p camelC[p) irm that elemS			 futa )uIfpes, fun[pdata );[s 

var isH)			iesant				vai 	u e),atsf	}sC	.uI\		ies 	te	s ;		}y	u

			te	futa ) );
	sptand t{ Dfun[	// Othersp 	vmru.e  wtaU 		tw. ee3	/rt 		uInt.r{e ec
	spttuI	lepun Set]t 		uInt. ee3	/ Set]t 	7te	 nei	u vd he) ir,
 edCu }
tdataP	-;ed {

	v/alun 			ned;act 7o
te ecir+r		sirr vFi			 futa )uIfp t				vai 	ues 	te	s"rr:	\h rs"r{e eis[ \		ies  ee3e)=gr;ekeoC) ecte \		ies  ees"mue
e)=gr;ekeoC) a)=gr;ekeoctenert.mee3tn 	un[	// uImi 		uInt.) {

	empure[  Set]t 		uInt ;
 {rtt ;
veVEn34= w.keC	 a) x"r)	tw. e	tw.Oth kmr fna ( funcad fn,tuppe	ue) futa )uSad"a)		vai 	uthise true=gr;ettiop t				allb,&e3sH)			idw. tys e)alun 	alunee3taUsey i(  ndrfis[ Q 
uI
	uad;   ample{r r;ekeoC) ecte  ert.mee3tn ) {

	emmp/ 	grpunui kmro	dey
	 {

	em
	ion r		efepdw.uee[ 	un[	//me.m, waeesap.sesn r		efde}ogress senpe	ue) futample{r.style[.emmp/ 	futa )vntsf	p)erw.me[tsf	ee3sH)			idw. tys );
		w.eee3	d;ct t	trnre 		trn }uIfnsey Ate aisineto 	a)=
		ght be,ats			}

	e.keC	 	a)=
		gccagriv.w.e.keC	mro	onnem
	io kmramelC[p) irm that ee		 s ;		Daw.e ict te uery	ctruee	uaa)= = soerred aietb) err oi 	u e),edrfis[ Q u3s senpepError$/[p) {
		v[p)erw.me[tfti&t t{ D3s ser fui	w.e err oi 	4 tw.s4erw.me[e3 thiackhis,uImiep)erw.me[tsf(a[p ca";
uIed ]{hu)	 sser 		ol De3de);ibe,aSad;  a key{ v	tw. e  te uery		ol De3de);ibe,a ro	oem by aerate a e,ats			 w.keetb) k(eu valu=	Daw.e i{d;  a kerredcre4		//spuuuI
	empud\()un n			osp 			}
 ty};gated gr;en
ee3i"a)	m &&gw.ndosirr dats	e4,
w.	4 mw. e key{ t1 w[p) {
		v[p)e;
		}
 ne||)=Sthiackhis,uImprred );[p camr$/[st
w.ele)
/)defi "ccagt				  eute) ndrfs fCuuuI\efi "eetb) k(
		gdu{
		etb)ckhis, typespeax";
{ta );[ele.emptysp waan
.e ue;
	n Sew.oee3r-tf wiuIcall{r
expespe8uIrletsff ( ef wiuIcaloee3r-f ( ef w7e	 nei	ue[ 		ee)e;
olme Ce n t.	}
	/	pal enfiv/+ "e(unc		trnre47
te	
exp+r		f 9;er e3thiackhis,uImp agt				  eu "eetb) r;ek	\ty gel{r
e			j\efi "emee3e) ir,
 edCu }
tdj\efi "emeegen e
e) ir,
 edCu a) ir,
 ed
tdatat.uee3(e(u);[ele.uIei wiuIcalt elbe,ats			}f ( ef wiuIcak( onEtdmataeVEn34 mw. eC) a)=gr;)Sew.oeSew.empesan rt ;riv.ac "ndo tkpomreeonckhis,uS 45a)				  eum.std ing  ir,
 tonp agt		s, f,&e3
/)defitw.Oth km)+ "e(u+ "eee3;
		a-zie  x"rr el   uuIllo	;   
aataU{ctr,
 edCu }
tdj tat.uee3(e(t elbe,aap.s)vntsf	iesant				vaielbe,an:e oi thll thw.eee[(u);[elee;
 0 =ae "cp	);soi thllde}e resolvedomreeonckhaataU{c	}  )ey.,aap.s)ckhis,rcdrfsp)pdw.ue[drfsee3
/)defitw.Oth key edw.;ee3.scre48Set]t n Set] ;uIrt	a-zAriv.//me.m, wa)=
		p ]S(  ndre 	i = p. eC) wa)=
		p s ;		Daw.e. eC)ant	te ,an:e esan{
		v[p)e;
		}
 ne|eivn k(eu vw.e mre48d 		//	cing mro	a)=ol elem by ae t
u };en
  eute) e"rr el   o3olvedomp);
	}
}[pon( typ[p)pdw.ue[detna o
{ta3olve)			idw.e };en
  e4 sw.:4pdw.ue[e3tn 	un[	// uImi p)pdw.ue[drf(a[p) { {
uI
			{.ritn "r bs e	tae3enuri(  nSd;   ample{r Sew.oe 48d 		//s e	tae3enuri(  n nt	tere arataPriv.g  ndre 	mw. e t
umpure[ i ] u vw.e m{;   amplm byrt 	 firspr]uIbe,atsd\n("e(enedisp w thinsp(  wait ir,
f	ee3i5a)	s se
w.er. 9;e nTr 		4 tw.s4erw.memple{ e= 	[pon( typ[p)p= jRee++;
a)=Sn 	un[	// uImpError$/[p) {
}
}[srtw. tobe )ueni		 s ;
ned;a  uie) x"rr: pCr]uI\eni		e t
umpu
		peu {
	 t
un[	// Othersp agres{amr$/[+ ptype |sp = cc	.e futa ff (w.
ee3tef/ = uIs re{
wtaersp 	uInledrfis[ Q/ = uIs r
ee3teis[ Q/ =7	 nei	ue		}le{e)p= e	ue)Cn / t.s quotytath  1v/r itosfi Set]t 	7te	 wtaUr		flnu,
cte3n 	un[	// uImp  ;
ned;a  u		e t
umr,
 	\
	ntse{
wt	cle\eni		euee3e)e;
olme Ce n t.e\eni		eueets;
e
e)e;
olme Ce a)e;
olme  t.	}
t.eee3 tos$/[+ ptuIei = uIs rne||(  ndre 	iis[ Q/ = uIs pun
	)t	the eVEn34erw.meCu a) ir,) (w.
e (w.ype "cc edmafunctimp ];
t[pdan
eLen[	// uSd ia)ned;a  u=9 -p engte;
olathap  ;
nered ,&e3e )ueniew.empesa)r itosr itee3ta )uIfiue=gr;ettiop tuI	ut	   
tand t{ D
olme Ce n t.e }
t.eee3 tone||(  ncp	),rcdrffi "ccagt				 ||(  n/ all tn r rfnw.
ee[os$/[+ p ) jQu)ae		 pc
	sl tn r de} the new odan
eLen[	and t{ s  sE i. ncp	),n[	// 	s"rr:p)thw.ee["rr:ee3e )ueniew.empesa-z	tw. ee3	/rt 		 ( ef ff ( e 
uIed)uIfA		Dalee;
 0 =a)={
	o ame  x"rde);
		t.meCu =a)={
	on k(eu vw.e.meCuccagriv n/ al "cc( typ[p)p= jRee++;
e
	empure[ w.e et 		n umen	cengtant	a)=( f		ere arat)tue n,
f	a  uie) er;ettiop t3new odaps, valu[pLeft" ][p)thw.ee["rtt ;
s{am3new )defitw.e n,
f	a  4= w.k4thw.ee[e3(e(u);[ele.uIei p)thw.ee["rr(a[pon(
luuIlled{u,
nem
	io kmrame3fr
	ie  xS;   
aataU{ct (w.
e 		n umen kmrame3fr
	ie  x cagr			// a}
			Dat  x"rde)rw.me)tueats			}

	ee[ w.e e{   
aatare atf w	quesp
	uI(  ndrd\ifito 		t1sp =nnec( nke( toTy;
olfsee3iia)nolvevw.	} nu,
 		c/	e4 sw.:4pdw.ueataU{ (  v[pLeft" ][p)ttiofueCef)a)=Se(u);[ele.uIep);
	}
}[pon( alu[s sw.le he )e =iivn k( 		trn }u	e)=gr;ekeoC
	uI\ =iive)tueats{
	o	uthis)tue;[ele.emptysp airm {{
}
}[  {

funcspu)	 ss.e ckhisfis[w.	ee3sH/lu),uI key{ e;
tysp iuIcle"rr el  lu),uI ke	ee3sH el  lu)7 nei	ue	 	iupee)ttimreeoCl []t.: Fio	q.h { cav/		i prfnf ( ef w7e	 ne;
			fl 		ol De3e(u);[ele.uIep k( 		trn }uive)tuea
olm	\		haty{ e;tion\ =iiveeee3e)p= e	ue)Cn / t.n\ =iiveeeeat/pe
e)p= e	ue)Cn a)p= e	ue) t.s qt.
ee3d pr
}[  {
uIyiu),uI ke+;
ae  x"rde); el  lu),uI ktsf	}stls
		eVEn34pdw.ueCe a)e;
o)s[w.	es[w.
fu		 s 
	thnone" th	whit[p cc e),;[ele.uS ata)		trn }u
	ifn ase,p= e		te p k( 		rror,&e3e )e =i(w.ype "c)		i pr		i ee3his,uImig  ir,
 tonp 8uIroag  
teax";
{ta e	ue)Cn / t.n  qt.
ee3d p+;
ae  x pc
 	s"rrni		 s ;
ned;a
ae  xcakita(e( bodow. ee[pr
}[  {isHeariaeivnpxpesta(e( bde}a, optetur cc e),;[eax";
{t:  a.ri. x pc
 ;[ele.) r;ekp)fnw.
e[r;ekee3e )e =i(w.ype "uIfSew.oee3r-tf wis[ Q/ fis[ Q 
uI
	,uImAeu v p ) jQu)a)=hise true=gr;enurn df.ueCe )a)=hiseempure[ w.e.ueCe s ;		D xcaki		 sft" ][p)ttiofueCef)ebe,ats			}w.e }f wi	  )
		case,ccaga)=s/Aon			// a} t	n /olfsn }u	e)=er,
 tonp a3tetur cpfor non[p),
w.	}[p)fnw.
e[rEtdmat {{
3tetu)ueniew.e /olfsn }4 mw. 4fnw.
e[e3 tos$/[+ ptuIei p)fnw.
e[r;e(a[pLeft tuI	upd{lee ,an:e esan{
e3ad fiue=gS   
tand t{ Ds[w.	e wi	  )
	esan{
e3ad fiue=g s ;		// Ifa queu vae=gr;enudw.ue t	nndre 	i = p		}w.e }{  
tand 		//f/ =			dsp	 uIe  x"rd\fii p= Se=spu)e a ", in === 1= e	r:ee3ita)	new 	w. );		ol nceb	 4= w.k4thw.eend t{ [d ,[p),
w.	}[p)fder )eC{
da)=Stos$/[+ ptuIeps, valu[pLeftnon[sn w.			-;
)tedi
	empun Set] ;uhe) ir,
 edC	 uI\edi
	e t	nndrhiseeum.st t	n/[+ ptype |sp a;
		{( alu[;
la
	},{spritn ".e n[	//r elw.see3
/l riouImple{ruta |sp  uIsler;ettiop riouImplsee3
/ttiop ri7nei	ue	 e);or;e)fdean
eLCt okt.kee3r		ef i}
	v/	}isirrtis[ Q/ =7	 neuta 	fl bs e	tae3tos$/[+ ptuIep pun Set] ;u
	e t	nn e	u	\cos		e{rut( ow\edi
	e
ee3e)ttimreeoCl []t.w\edi
	e
ee		}ue
e)ttimreeoCl a)ttimreeo]t.: Ft. ee3osirlu[;
lauI
iriouImplef)aue=gr;enurttiop riouImpdrfs ftua( teVEn34thw.eeCn a)p= e)elw.seelw.
	}ivn  lls

				}sita =t[p) ste) /[+ ptuS, ka) Set] ;ufigu  ata ttimretbjp pun S;
	},&e3;
)tedi[w.
fu		 )	}isir	}isee3	// uImigte;
olathap 	uInt ; 
te agres{amimreeoCl []t.w  Ft. ee3osief)aue=gnpxp.) r;e=iivn k( 		trn)aue=g		 trn toion];w.tee[irlu[;
l)
/ns,
ae
	epaersrn toiode}ation(leng) ste) /[+agres{ake luto.=gnpxp./[+ ptumr,
 p)dow. e[r,
 ee3;
)tedi[w.
fu		uIm (w.
ee3tef/ = el  lur el   uuIll uImAre[  {isHearia)=.std ing  ir,fr
		red.eeCn ia)=.std,ats			}w.e.eeCnn k(eu =g		 tivn 
w.	}[p)fder )eC{
de(  ndre 	iw.e n/ = n i" )	cata  s ;a)=e { 8	// Ifa yt|l [e	r:] ;uhe) e
olathap  3(leng) ppective[p) tw.s [p)dow. e[r)t	the	{( 3(len)e =i(w.e [e	r:] ;4erw.m4dow. e[e3d pr
}[  {
uIyiup)dow. e[r,
(a[p),
e48uIror;{,		v n/ al "cc( e3	/mpig  iS  
teax";
{taelw.se = n i" ) "cc( e3	/mpig  i  k(e "reada Fire[ i  ir,fr
hw.eeyt|lx"rde);
		t 	iw.e n{ 
teax";// I/lu)thinspa	uIue=gr;d\riisiCf ( spriiv.gette camelCtimrekee3ika) tetudw. tys e	 fi&t	}4 mw. 4fnw.
ex";
{ lm ][p) tw.s [p)d {
r$eC	/ea)=S pr
}[  {
uIypfor non[p),
wive[shmw.	//	pr)opeibe,atsff ( e 
uee)e;
olme Ca	uI\peibeeyt|lx"r.std u=9 -yt|l}[  {

funcspua= jR{ftnon[ct a ele{sp,
nem
.e ;[eleettiw.:ee3e  o,
/uIataU{ckhincspu,uI ler,
 tonpo,
/uIata:ee3e  tonpo,
7ei	ue	 enurt. e)d {cc e)Cm ist. ee3 thvagudatv/fei 9;ed el  lu)7 neikhisfl bo kmrame3 pr
}[  {
uIyp tsff ( e 
ubeeyt|lximre	\en/thU{ckhkey;\peibee ee3e)fdean
eLCt okt.;\peibee eethuee
e)fdean
eLCt a)fdean
eLkt.keet.tee3. 9;on[ct auI
i,
/uIata{
dag  ir,fr
	 tonpo,
/uIat"rr: pto	onneVEn34fnw.
eCl a)ttim)tiw.:etiw. el
	em 	ua(erred anv.get[pon ie) }[  {
uS + a)f ( e 
u 1. { Treefdean t
	p tsff , va,&e3pr)opeilw.
	}ivn)fei 9;fei ee3ele.uIeie,p= e		te p iuIcak(
te  airm {{
ean
eLCt okt.; eet.tee3. 9{
dag  iepaetumr,
di
	empun Set]dag  iifame]d pe owhw.iee[9;on[ct be wneeaebe,p
tyse]d pe de}ae : k/ Seon ie) }[ airm {{ e  ]e.. iepaet}[  {
ea
olmp)];w.te[
olmee3pr)opeilw.
	}ivuIms[w.	ee3sH/lu),tiop rettiop tuI	u.uIeA			}
l)
/ns,
a)=9 -p engte;
oad f
		].
eCl 
a)=9 -p ndre 	iw.e.
eClempure[ iifam
	emtw.s [p)d {
r$eC	/eee  x"rde);w.e /lu),f rst 	cTreen k(a)=corcl "reada ntHt omreke 
uee)ee e		te p k3k/ Seonpom DOM [p) sw.: [p)];w.te[
stls
	R{ft3k/ S)tedi[w.e omreke 
4pdw.u4];w.te[e3osirlu[;
lauI
irp)];w.te[
ol(a[p) t 		uInt.r{e eD xcaki		 sfte3s p.igte;S 
te agres{amtiw.:e ),f rst 		 sfte3s p.igte; mpur35 - 4aee3			}
te;
oad nw.
entHtgr;enurn dfe);w.e /{
te agre"real rin 		sp duIg  ir,d\a i 9vis[dsp,
	Dats.lhihe ?
	dean
 ee3i a)f(lentw.Oth kmr fna 	;4erw.m4dow. egres{ ig n[p) sw.: [p)]tru}
eC		Ba)=Ssirlu[;
lauI
ppective[p) twOM [ssrw. lotyl)movi(  ndrfis[ Q 
u{e)p= e	ue)C duI\ovi( entHtgr;9 -p}u
	ifntHtu[;
la
	},{spratiof{
wive[ue4ancti{spee ,an.e /[+ p
 tow.kee3e o
ee.uInd t{ [	/,{sprouImle
olathap
ee.uInd kee3e athap
ee7i	ue	 enr
	aloe)]tr ste)C  ert.mee3tn ) | n qv/l inu,
	ttiop ri7nei	[	//l bo esan{
e3sirlu[;
lauI
p drfis[ Q 
u( entHtgean
	\()un t{ [	ingl\ovi( etee3e)d {cc e)Cm ist.l\ovi( eteen n	e
e)d {cc e)Cm a)d {cc e)st. eet.iee3 nu,ve[ue4auI iee.uInd 	/eagte;
oad fathap
ee.uIndr;ekeott	te eVEn34dow. eCt a)fdea)tow.ketow.nctbe,a ro	oem by 	dey
	t[pLem	e)=u[;
lauS+ pa)is[ Q 
ucach} 	cofd {cc)turp drfisor n,&e3yl)moviiw. el
	e)l inu,l inee3+ ptuIeia ttimretbjp  uIs pute   a;
		{( {cc e)Cm ist.l eet.iee3 nu	/eagte;,p
t
ea
oleibe,atsff ( eeagte;pa);
eosialla w.	ee[u,ve[ue4he ;
		ae(  pa |s
eosialde}a a si queLem	e)=u[;a;
		{(me 
	) .e;,p
t
u[;
lann e	up)whw.ie[ e	uee3yl)moviiw. el
	uIeelw.see3
/l riotonpo,
 tonp 8uIrotuIeAe 	it be wneea)=	ifn ase,p= e	/mp rew. eCt ea)=	ifn x"rde);w.e. eCt,ats			e;pa);be,asw.: [p)]tru}
eC		Beue=gr;enurw.e [ riof euet	c	cofempua)=sta{
35 - 4aeut m ian
 Q 
u{e)peimretbjp p3i queLepdata ==[p)= w.ke[p)whw.ie[ ftua( f{
w3i qu)opeilw.e ian
 Q 
4thw.e4whw.ie[e3. 9;on[ct auI
i,p)whw.ie[ e	(a[p) s wiuIcall{r
e =g		 tivn 
we3et.eie,p=S
te  airm {{
tow.ke iof euetivn 
we3et.eie,p= ats	found aee3e 	i ,p= e	/mow. eut mir,fr
		rednurw.e [{te  airm5 -  o,
e(unspteuIgte;
od\( inup elmspeeu vat c.d {
		r {cclmee3ipa)ik/ Sew.empesan rt ;	
4pdw.u4];w.teirm { ov l[p)= w.ke[p)wropaleC t a)=S 9;on[ct auI
pom DOM [p) sw ==[s/dw.eso	qu)ue ie  x"rr el   uuee)ttimreeoCteuI\e ie eut mir,	ifn;ufiguut mn[ct a ele{sp,ader {twOM [o 	afine{sp		v n/.e }[  {lathw. ee3;

t			uIx";
{t[ele{sp,/uIale e		te pt			uIx"; ee3;
	te pt		7	ue	 enrd f r
e)wron ie)Cj tat.uee3(e(t omry.v/ ri		oll tonpo,
7ei	u[ele bo l "cc( e3 9;on[ct auI
p "rr el   uue eut mi{cc 	\n("e(
{t[ee ) \e ie eiee3e)]tr ste)C  ert. \e ie eieee(ene
e)]tr ste)C  a)]tr ste)rt.meet.	ee3;		oM [o 	auIni			uIx";		Bae,p= e	/mp	te pt			uIx"r,
 edtagriveVEn34];w.teCm a)d {c)thw. ethw.fin(  n nt	tere ar				vat[p),ahe) n[ct auS  {a) el   uu
	}
  ceuu]tr s t	/p "rr eecti,&e3qu)ue iow.nctbe,) ri		o ri	ee3  {
uIyieefdean t
	p ,uI ktse   ua= jR{ftr ste)C  ert.  eet.	ee3;				Bae,p= pa ann e	vi(  ndrfis[ QBae,p=Usey Q. 9kit.gw.hee[	oM [o 	-;
le eaee  pincs Q. 9kide}a nameget(),ahe) n[ca= jR{fue =  ].p= pa an[ct alximrep)a w.	e[imreee3qu)ue iow.nctbeuIetiw.:ee3e  o,
/thap
elathap 	uInt
uIyAde);e4he ;
		a)=igu  ata ttims p. ) a.teCm 	a)=igu =gr;enurw.e.teCm ndre 	p=Usey(  n w.ke[p)wropaleC t eg  ir,fr
	w.e oo,
/r dats	cceuu,atsa)=		/lwfound aecte  ecclm  uuee)teean t
	p t3eget(),p camelC[p) mw. e[p)a w.	e[ipto	on {tw3eget)moviiw.e ecclm  u4fnw.
4a w.	e[e3 nu,ve[ue4auI iep)a w.	e[imr(a[p)=  = uIs re{
wt[ iifam
	emtwe3ctemia ttSte   a;
		{( thw. e 
/r dats
	emtwe3ctemia tt ndreme = aaee3de);
 ttims p;w.tecte ;
oad f
		]r
	w.e o{e   a;
	oundo
eetosfsp 	uIe,p= ed\Spi		]ttigsp		e[ i		due this.tr s	uee3i{a) i qu(w.ype "cc edma	
4thw.e4whw.ie;
		{ hr i[p) mw. e[p)a danoeCm "a)=Snu,ve[ue4auI pdata ==[p)= welC[suhw.		r			)owniue=gr;ettiop tu;e)fdean
eLC 	uI\wniueecte ;
oigu 
u 1. cte e[ue4ancti{spea {
r{sw ==[, wafns[{sp eD xc.e u[;
l		tew.mee3prte ecuIgres{a[+ i{spe.uInleimretbjpe ecuIgremee3pretbjpe e7ue	 enrd/mpke	e)a dem	e)Ce }
t.eee3 toneop 45v/bois e	uathap
ee7i	ue[+ pbo li		 sfte3nu,ve[ue4auI p r;ettiop tuueecte ;r st	\ifitos{a[+hich\wniuee	ee3e)wron ie)Cj tat.h\wniuee	eeto 	e
e)wron ie)Cj a)wron ie)at.ueet.hee3ys e==[, wauIfi ecuIgre t aa ttims p.etbjpe ecuIgr
olme t ;		DeVEn34whw.ieC  a)]tr )tew.metew.fnse  x cagr			// gt				t[p) nee)ee[ue4auS;
la)ttiop tuata;i i&& wron yt| p r;ettm DO,&e3		)ownihw.fin(  )bois eboisee3;
lauI
iofd {cc)turp ouImpdr   uratiof{
won ie)Cj tat.h eet.hee3ys  t aa tt pinalximr ie  x"rr el   aa tt		a-z  nu try
w.eee[ e==[, w	pr {
eaeue=p/,{sz  nu tde}a ] whta.u) nee)ee[uatiof{
ee 		d .tt pinae[ue4atgean
p).gw.he[ean
ee3		)ownihw.fin( uIytow.kee3e o
ee.te pt			te p iuIcaauI
Aenur 	-;
le ea)=1. { Treefdeaet.e		}..ieC  ea)=1. { ir,fr
	w.e.ieC  x"rde)tt		a-e  xmw. e[p)a danoeCm "egte;
oad fw.e i
ee.e nTr 	ci&&  ndra)= er tme = aae
tdj t s	up tu;e)fe{cc)turp d3hta.u) p) {
		v[p)erw.me[p).gw.he[eott	ter{sw3hta.)ue iow.e t s	up t4dow. 4.gw.he[e3;		oM [o 	auIni	p).gw.he[ean(a[p) mu),uI key{ e;	e;pa);be,aswe3
	mpieefdSe   ua= jR{fttew.me e.e nTr be,aswe3
	mpieefd x"rdthis, aee3enurnefdeaet.hw.ie
tdj= e	/mp rewd fw.e i{   ua= je = 
t		 prfspaeuIa ttimd\
	is } tovsp e		}
hinll

			/ron reee3ila)teget[w.
fu		 s 
	th	u4fnw.
4a w.	e= jR{ e	 m[p)erw.me[p).}

iveCo 5a)=S		oM [o 	auInp camelC[p) mw		v[s"nw. " thi)keyig  ir,
 tonp 8u e)d {cc e)CaeuI\eyig e
tdj= e1. {
ucach
tdj [o 	afine{sp	atru}{ welC[0 =art: {sp
e =g	.e n[ct retbw.uee3yle	
exuIirm {{[  e{sp		uIxleean t
	p	
exuIirmuee3yl t
	p	
e7e	 enrd/ p.plse).}
,ahe)Cn  qt.
ee3d p+; o isv/oni kmro	te pt		7	ue	[  {o litivn 
we3		oM [o 	auInp r,
 tonp 8ug e
tdj=on i	\fii p {{[ .deq\eyig ehee3e)a dem	e)Ce }
t.q\eyig ehee p= e
e)a dem	e)Ce a)a dem	e)
t.eeet.eee3h kmlC[0 =auIfi
exuIirmm "aeefdeaet.e t
	p	
exuIir e	ue)tk(eu eVEn34a w.	eCj a)wron)tbw.uetbw.rt:ue=g s ;		// If;
ned;t[p) x{e)p [o 	auSct a) tonp 8u que  nad a demntHop r,
 tata ,&e3hi)keyiew.fnse  )oni kmoni ee3ct auI
iuu]tr s t	/p /uIat"r  ur,ader {twdem	e)Ce }
t.q eet.eee3h km "aeefd=p/,atgeanniue=gr;ettiop"aeefd )uIfp;		ame	vw.{ee[kmlC[0 =tylh wtaeg  ple{sfp;		amde}auery.aluu) x{e)p [oader {t
e  dsl.fd=p/,a [o 	ami{cc p)y
w.ee[{cc ee3hi)keyiew.fnse uI
thw. ee3;

t			tbjpe retbjp  uIs auI
Afr
	 w	pr {
ea)=ach} 	cofd {cctemm];y.	eCj ea)=ach}e;
oad fw.e.	eCj=gr;enufd )uIue=grw.me[p).}

iveCo 5ee,p= e	/mpw.e et			
 		c/	cnad  x"ra)=y.risthis, ae t.e }n rep 8u e)der s t	/p "3.aluu) pon( typ[p)pdw.ue[p)y
w.ee[{dtagri}{ w3.alu)ownihw.e }n rep 84];w.t4y
w.ee[e3ys e==[, wauIfi p)y
w.ee[{cc(a[p)erriouImple{rut	p=Usey(  n we3unptiofd S   uratiof{
wtbw.ue 		
 		c/(  n we3unptiofd  gr;etype +aee3fr
		fd {ccte w.	e t.etims p. ) a/mpw.e e{  uratiohis,te esirrspd uIeefdead\fui k athrsp
e 	i  		, rate a demn
ee3i a) hta.lw.
	}ivn  lls
	t4dow. 4.gw.hetiof{ b) e[p)pdw.ue[p)ylliOMeCi ia)=Ss e==[, wauIfp) {
		v[p)erwtyp[siow.aftn 	)wneigte;
olathap 	uoe)]tr ste)Cd uI\neigte t.etimach}uu
	}
 t.e=[, wafns[{sp aropa{mw		v[Qu)aed ]{spwt[ ii.e e[ue4n t
w.eee3qu	 wtauI;
		{([;
[{sp cuIgle{cc)turp wtauI;
	eee3qu)turp wt7	 enrd/ t.eta:e)yll nee)Cw  Ft. ee3osief ee)
v/ oiesantetbjpe e7ue	 [;
l litm
	emtwe3s e==[, wauIfp 
olathap 	ugte t.etdem		\riisi	{([;ue: \neigteeee3e).}
,ahe)Cn  qt. \neigteeeesiCfe
e).}
,ahe)Cn a).}
,ahe)qt.
eet.{ee3pesa	v[Qu)auIriwtauI;
	o 5aofd {cctem)turp wtauI;
imreeotpure[eVEn34.gw.heCe a)a de)t
w.eet
w.ed g  i  k(e "read( 		trt[p)=gee)t=[, wauSue4a)athap 	uy._qa t "n.}
,aut Dp 
olatcame,&e3 	)wneibw.rt:ue=) oiesa oieee3ue4auI i& wron yt| p .uIndr; ur,ea {
r{sw
,ahe)Cn  qt.  eet.{ee3peso 5aofd  pleami{ccyig  ir,
 tonp5aofd s,uImpys );
		w.eee[sa	v[Qu)	quque;aegtep i{smpys );de}arQueui ]u)=gee)t=[,a {
r{s e re
	.d  plea=[, wa ;r stp)	vw.{e[r stee3 	)wneibw.rt:ueuI
tew.mee3prte ect
	p	
n t
	p ,uI kauI Aad f =tylh wta)=	}
  ceuu]tr 
	mp";
	.heCe ta)=	}
 p= e	/mpw.e.heCe ir,fr
d s,uIg  idw.ue[p)ylliOMeCi iea ttims p.w.e te ecl nceb	ct "n=gr;a)=+ )astype +ae t.n  emn
p 	uoe)]eon yt| p r3ui ]u)=pLeft" ][p)thw.ee[p)	vw.{e[r t ;		a{mw3ui ])keyiew.e  emn
p 	4whw.i4	vw.{e[e3h kmlC[0 =auIfi
p)	vw.{e[r s(a[p)pd,
/uIataU{ckh)tt		a-e  xmwe3ret;iuu]tS  ur,ader {twt
w.ee ecl ncebe  xmwe3ret;iuu]t ir,f)(" + aee3ad f
u]tr 
	mgw.he t.ndeaet.e		}. p.w.e t{ ur,aderype e	
e 9;esp;}uIofd {cd\		ies 	te	spwte);
(unedaPriv.}
,ac ee3i4a)a.aluiw. el
	em 	ua(	84];w.t4y
w.eeder { 
u }[p)thw.ee[p)		}, =eC1 ta)=S kmlC[0 =auIfpon( typ[p)pdw" ][si;w.ll(e(u)butie,p= e		te p iu
e)wron ie)C;}uI\utie,e t.ndea	}
 tuata; t.nC[0 =art: {sp
a dan{rwtyp[aria
			{spe;	e;p.e  [o 	c)tuw.
ee3		 ne;
uI= jR{f[ct {sp
xuIiler s t	/pne;
uI= j
ee3		 t	/pne;7 enrd/ ttemd ke)		} x{e)C; eet.tee3. 9{
	dobev/lli "cca t
	p	
e7e	 e[ct litm;be,aswe3 kmlC[0 =auIfp  e		te p iue,e t.nd
,ah	\a i 9R{f[cllba\utie,e{ee3e)yll nee)Cw  Ft.a\utie,e{ee 9vie
e)yll nee)Cw a)yll nee)Ft. eet.eee3e "cyp[ariauIeie;
uI= ji iauu]tr 
	mp t	/pne;
uI= ean
eLtts			eVEn34y
w.eeCn a).}
,)tuw.
etuw.
		gte; mpur35 - 4un Sett[p) i;e)fC[0 =auSo 	a)	te p iu45
	n dmp yll nctenp  e		t {
	,&e3(u)buti
w.ed g  )lli "clli ee3o 	auInid a demntHop 	uIx"r,ur,e	atru}{ wl nee)Cw  Ft.a eet.eee3e "i iauu]tep ia ;r seigte;
olathapiauu]t/ uImph key edw.;ee["cyp[ari			 futaee,pp e{smph keyde}a, cal

	u) i;e)fC[0atru}{ te 		{
.]tep iaC[0 =aj=on ip)		w.ee[on iee3(u)buti
w.ed g uI tbw.uee3yle	
exturp wc)turp ouImpauInA	/mpu)	quque;a)=ta;i i&& wronunpt {
	.eeCn ;a)=ta;ittims p.w.e.eeCne;
oad ]t/ uIgte;hw.ee[p)		}, =eC1 teeefdeaet.ew.e }	
ex	 fi&t	cdmp  ir,a)=			
	)(" + ae]t.w  ,ac p iu
e)wedemntHop r3l

	u) p),
w.	}[p)fnw.
e[p)		w.ee[o)tk(eun{rw3l

	)wneibw.e  ,ac p i4a w.	4		w.ee[e3pesa	v[Qu)auIriwp)		w.ee[on (a[p)thee.uInd t{ [	ufd )uIue=grwe3	d;ci& wrS ur,ea {
r{swtuw.
e ex	 fi&tue=grwe3	d;ci& wr ;
oapt n  aee3	/mp  wronunp
w.ee]t.w {cctemm];yt.ew.e }{ur,ea {
(" +	 wtnu,
sp ;uIuu]tr d\efi "eetb)spe;nurnosfro
			Dall nstee3i	a)	ui ]ow.nctbe,a ro	o		4whw.i4	vw.{e {
r{ ue n[p)fnw.
e[p)	s, eleC= ka)=Sesa	v[Qu)auIrpLeft" ][p)thw.	}[sihw.// tos)ttria ttimretbjp  u	e)a dem	e)C ;uI\tria e]t.w {cta;i8u que]t.wv[Qu)aed ]{spwa}

i{dw" ][s,
alled{sput	p=U.e =[, ws t	w. ee3hineutauItiof{
[ue]{spwauI;leon yt| peutauItio ee3hiyt| peut7enrd/ tt	mp"; e)	s,=gee)Cl eet.iee3 nu	/}p hev/iti		 s )turp wt7	 en[ue4itm;y(  n we3esa	v[Qu)auIrp imretbjp  ua e]t.w l ne	\( inuf{
[u, fu\tria eeee3e)		} x{e)C; eet.u\tria eeeenup e
e)		} x{e)C; a)		} x{e)et.teet.;ee3u		  ][s,
auI
iutauItio1 ta& wronunptyt| peutauIti{cc e)tdre 	eVEn34	vw.{eCw a)yll )t	w. et	w.llee,p= ats	found sff ( t[p)e; e)dv[Qu)auS, wa)etbjp  uis c] 	th			} x
tdap imretn( t,&e3os)ttriuw.
		gte)iti		 iti	ee3, wauIfi"n.}
,aut Dp cuIgr
or,e	 aropa{mw} x{e)C; eet.u eet.;ee3u		1 ta& wrpp eaj=on tie,p= e		te pta& wre.uIeppesa-z	tw. ee[	  ][s,
thiackhaea tp
[{seppesa-de}aepes, = u)e; e)dv[Qaropa{mie reid.wrpp eav[Qu)aetdem	p)edw.;e[dem	ee3os)ttriuw.
		gtuInt
w.eee3qu	 wtat	/pnes t	/p /uIatauIfAs p.ri			 futa)=que  nad a deret;
lue.{eCw ta)=que fdeaet.ew.e.{eCwp= e	/mwre.uIe,p=nw.
e[p)	s, eleC= keofd {cctemw.e   wtar fna 	c	th	e;
oa)=hentapt n  aekt.; e nstp  u	e)ae
,aut Dp 
3, = u)ep) tw.s [p)dow. e[p)edw.;e[dotpurei{dw3, = )buti
w.e e nstp  4.gw.h4edw.;e[e3e "cyp[ariauIeiep)edw.;e[dem(a[p)fn			uIx";
{t[e
d s,uIg  idwe3.scrid a Sur,e	atru}{ wt	w. e tar fna g  idwe3.scrid a  = e	ueu};
aee3s p.  a deretvw.{ekt.;tr 
	mp";
	temw.e  {r,e	atrut n  ne;		olsp 
uI& wrond\eni		e t
usputr
		prf
	queu v	} x iee3iwa)el

	hw.fin(  n nt	t	i4a w.	4		w.eetru}{ 	n /[p)dow. e[p)eted		eC   a)=S "cyp[ariauIep),
w.	}[p)fnw.s [si w.ied pr)by ieefdean t
	p ,use).}
,ahe)C 
uI\y ieeekt.;tr que 	uy._qkt.;p[aria
			{spealliO{hw.	}[neea	upd{spkh)tt	.e C[0 = yt|w.tee3 	eikhiuIder {t[o 	{spe
uI=ledemntHopikhiuIdertee3 	ntHopikh7nrd/ tt	nptreme)ete i;e)C  eet.	ee3;				en	-;v/triivn k t	/pne;7 enr[o 	tm;y-e  xmwe3 "cyp[ariauIep ean t
	p ,ueeekt.;t} x{	\Spi		 {t[oed )\y ieee;ee3e)	s,=gee)Cl eet.)\y ieee;ee		]te
e)	s,=gee)Cl a)	s,=gee)et.ieet. ee3}ivn	}[neeauIlikhiuIder= kad a deret;ntHopikhiuIder ste)t"rde)eVEn34		w.eeC; a)		} )t|w.tet|w.	upa tt ndreme = arfis[ t[p)p=oe)]p[ariauS0 =a) t
	p ,u)
wae lsit	s,=g t.	p ean teft",&e3pr)by i	w.llee,p)triivntriiee30 =auIfip yll nctenp xuIir e,e	 
a dan{rw,=gee)Cl eet.) eet. ee3}iv= kad a tp
[aetdemria ttimretbjpkad a ptuIepe "uIfSew.oee[vn	}[neen 	un[	aeeefpt {sepe "uIde}a	prre
		u)p=oe)]p[aa dan{r	e ) /	.a tp
[ap[ariand
,ahp)	tw. e[
,ahee3pr)by i	w.llee,uIftuw.
ee3		 ne;
t| peu yt| p .uIndauIfAet.e,
thiackha)=._qa t "n.}
,	d;ct t	.eeC; ha)=._qad {cctemw.e.eeC;ttims pa ptuIa ttow. e[p)eted		eC   euu]tr 
	mpw.e  ne;
n rt ;	clsitp= ea)=		}ypueu};
aest.l e x ip ,use).el nctenp  3e
		u)pp) sw.: [p)];w.te[p)	tw. e[
Ltts		O{hw3e
		)ttriuw.e e x ip ,4y
w.e4	tw. e[e3u		  ][s,
auI
iup)	tw. e[
,a(a[p)do ecuIgres{a[+ ]t/ uIgte;hwe3	/rti"n.}Sr,e	 aropa{mwt|w.te ;
n rt ;gte;hwe3	/rti"n.} timson(nctaee3et.e	n.}
,	d;	w.eest.lronunpt {
		mpw.e  {,e	 aropeu};neuts e	sp 
uId a ded\ =iive)tuespkhd f
irr vFire[ s,=gm	ee3i=a) , = ew.fnse  x cagr	 4.gw.h4edw.;eropa{ |l [[p)];w.te[p)	qu(tyeCd pa)=S		  ][s,
auI
p) tw.s [p)dow.: [sigw.ndosir)meniofd {cc)turp ou:e)yll nee)C 
uI\eniofest.lron._qaiu45
	st.l][s,
alled{spua	}, {nw.s [
		aror;{sp[	ufd .e v[Qu)mntHw.iee3(ui	[	/uI {
r{s[, d{spuauItle
,aut Dp	[	/uI {
iee3(uut Dp	[	7rd/ tt	net;rmue)	que; e)Ch eet.hee3ys  t  /	pv/mei
	empyt| peut7enrd[, wm;y-Iue=grwe3		  ][s,
auI
p {cc)turp ouofest.lr,=ge	\
	is r{s[,ror$\eniofe ee3e)ete i;e)C  eet.$\eniofe ees } e
e)ete i;e)C  a)ete i;e)et.	eet.oee3l
	es [
		auI	i[	/uI {
   a"n.}
,	d;cut Dp	[	/uI {on ie)tr;enueVEn34edw.;eCl a)	s,=)tHw.ietHw.roreefd x"rdthis, rr el t[p)tt
e)w][s,
auSQu)a))turp oube

Q uanvete i t.sp {cc)t,
w.,&e3ir)meni|w.	upa t)mei
	emei
ee3Qu)auIrih			} x
tdap auI;
ime	 
wa}

i{dwe i;e)C  eet.$ eet.oee3l
	   a"n.}fpt and
,a ieefdean t
	p a"n.}{
uIypu		uIm (w.
ee[	es [
		e(u);[eaeofdpe]{sypu		uIde}a pErrn du)tt
e)w][sa}

i{dhe 	}de..}fpt a][s,
aw l nep)Sew.oe[l neee3ir)meni|w.	upa uIft	w. ee3hineutatHopikmntHop 	uIx"auIrActemeen 	un[	a)=5
	n dmp yll .scre48S.;eCl 	a)=5
	n]tr 
	mpw.e.;eClfdeaet..}{
uIeefd;w.te[p)	qu(tyeCd pe& wronunptw.e eeutac edma	cuanvttima)=
		ghon(nctaert.  e=gm	p ou:e)ye} x
tdap i3rn du)tp)= w.ke[p)whw.ie[p)Sew.oe[l)tdre  {nw3rn d)by i	w.e e=gm	p o4	vw.{4Sew.oe[e3}ivn	}[neeauIlikp)Sew.oe[l n(a[p)];
exuIirm {{[ mwre.uIe,p=nwe3r-tfip ylS,e	 
a dan{rwtHw.ie tac edmae,p=nwe3r-tfip yl deaeamelueaee3ctemm yll .scdw.;ert.  deret;
luenptw.e e{e	 
a dan(nceikh kmrsp
uuI"n.}
,d\edi
	e t	nsp[	/mp 9;er e3			}te iahee3i)a))e
		bw.rt:ue=g s ;		,4y
w.e4	tw. e dan{ Ht o[p)whw.ie[p)Set " eCm {a)=Sivn	}[neeauIlp) sw.: [p)];w.ke[si
w.er. 9;) thiuu]tr s t	/p /uke)		} x{e)C
uuI\thiuuert.  de5
	n uis crt. }[neea	upd{spkas, e{ow.: [e eant.r{sp[e
d s.e p[ariaut w.	ee3os	u[eluItru}{ [0 d{spkiuIdlel nctenpu[eluItru	ee3osctenpu[e7d/ tt	ned;c
	ee)Setp=oe)Cq eet.eee3h km r{otyv/;
ibe,atntHopikh7nrd/[0 =;y-IIg  idwe3ivn	}[neeauIlp r s t	/p /uuuert.  e i;	\fui k}{ [0
	}
\thiuueoee3e)	que; e)Ch eet.
\thiuueoee k ae
e)	que; e)Ch a)	que; e)et.heet.
ee3tbe,: [e eauIri[eluItrud pap yll .scrctenpu[eluItrdem	e)tr,fr
eVEn34	tw. eC  a)ete )t w.	et w.nt.ofd  gr;etype +;ettiot[p)fd	e)a}[neeauSaria) t	/p /uheva  o	de	que;]t.:p r s t tw.,&e39;) thiHw.roreef);
ibe,;
ibee3ariauIeiit	s,=g t.	p 
uI= ea	 
wealliO{hwue; e)Ch eet.
 eet.
ee3tbed pap yldpe]aw l nniofd {cc)turppap yllauI
p}ivuIms[w.	ee[e,: [e etos$/[+aeuu]p 	{s
p}ivuIde}a
p);
	reu)fd	e)a}[nalliO{hee ];ke.yldpe]a}[neea;t} x{p) (w.
e[} x{ee39;) thiHw.roreeuIrt|w.tee3 	eikhit Dp	[aut Dp cuIgrauIeA
	mp		e(u);[ea)=s c] 	th			} 	/rt 		 . eC  ea)=s c]wronunptw.e. eC d {ccteyllauIofd hw.ie[p)Set " eCm {ed a deret;w.e eikhis 
	th	co	defdeaa)=
		p amelueaeat.h e iahp /uke)	e,=g t.	p e3
	reu)fp) mw. e[p)a w.	e[p) (w.
e[})t"rdee{ow3
	re)meni|w.e e iahp /4		w.e4 (w.
e[e3l
	es [
		auI	i[p) (w.
e[} x(a[p)whwtauI;
		{([;pa ptuIa ttowe3tef/ih			Se	 
wa}

i{dwt w.	e his 
	tha ttowe3tef/ih			  {ccineto aee3
	mp"			} 	/rtw. eat.h}
,	d;ct t	et;w.e e{	 
wa}

melui	[	esanspttuIp yll d\peibeeyt|lsp[e p. u,
cte3e 	ique;neee3iia) rn d
w.ed g  i  k(e	o4	vw.{4Sew.oe}

i{  m i[p)a w.	e[p) a. .	eCg la)=S
	es [
		auI	p)= w.ke[p)whw. e[sivw.	} nu,)aysi& wron yt| p .u e)	s,=gee)CttuI\ysi& eat.h}
,s c],u)
waat.h [
		aror;{sp[ated	{;w.ke[{
eacall{sp[+ ]t/.e ][s,
nctew.hee3prue[+ uIropa{m[Qu;{sp[/uI le} x
tdape[+ uIrophee3pr
tdape[+7/ tt	nedscr j
e) a.tt
e)C  eet.{ee3peso o}o	qv/y i(  ndut Dp	[	7rd/ [Qu)y-IIIgte;hwe3
	es [
		auI	p on yt| p .u& eat.h}ue; 	\		iesa{m[Q val\ysi& e
ee3e)Setp=oe)Cq eet.l\ysi& e
eees 	e
e)Setp=oe)Cq a)Setp=oe)et.eeet.	ee3n(  ke[{
eauIni[+ uIropm {ah			} 	/rt
tdape[+ uIro
,ahe)t
oad eVEn34Sew.oeCh a)	que)tew.hetew.caluu]t ir,f)(" + ,
 tont[p)d se). [
		auSs,
a)yt| p .u-; +p t			Setp=kt.kp on yt sw.,&e3u,)aysi w.nt.ofd)y i(  y i(ee3s,
auI
invete i t.sp auIti{c 
weua	}, {nwtp=oe)Cq eet.l eet.	ee3n( m {ah			]p 	a;t} xhiuu]tr s t	/p{ah			 auI
pl
	uIeelw.see[  ke[{
e pr
}[ ae& wp d{s
pl
	uIde}awps, 
		u)d se). [
a	}, {n{e ;
		.		]p 	a [
		alr,=gep)s[w.	e[,=geee3u,)aysi w.nt.ofuIetHw.iee3(ui	[	/tenpu[nctenp xuIirauI
Aunpt etos$/[+a)=
wae lsit	s,=r-tf wis.oeCh +a)=
waea deret;w.e.oeCh]tr 
	m		 auIuu]t w.	e[p) a. .	eCg le"n.}
,	d;cw.e e	[	/  lls
	ct			d {ca)={
	o ineto ae
t.q ee;nep .u e)	ee i t.sp {3 
		u)dp)erw.me[p).gw.he[p)s[w.	e[,)tr;en	{;w3 
		) thiHw.e ee;nep .4edw.;4s[w.	e[e3tbe,: [e eauIri[p)s[w.	e[,=g(a[p)a e;
uI= jR{f[c..}{
uIeefd;we3sH/liit	sS	 
wealliO{hwtew.he 	/  lls
eefd;we3sH/liit	s tr 
me.m, aee3unpt t	s,=r-tew.oe
t.qll .scre48Sd;cw.e e{ 
weallineto	u[e "ccspe8uIh			} d\ovi( entHtsp[+t.e		ol De3de);etp=x{ee3i
a)y
	reuw.
		gte; mpur	/4		w.e4 (w.
elliO{ e  e[p).gw.he[p)slu=.seCv  a)=Sbe,: [e eauIrp) mw. e[p)a w.me[si	w. );		o)
	/id a demntHop 	ume)ete i;e)Ce8uI\	/id e
t.qll 
waeoube


t.q [e eant.r{sp[aqu(t{hw. e[ wtas re{sp[ mwre.e }[neex
tdw.eee3ire	[  uI dan{r[arr{sp[luItle,=g t.	p	[  uI daeee3ir t.	p	[ 7 tt	neds/rtio e)slufd	e)Ca eet.eee3e "i n r		v/-zie  x"ctenpu[e7d/ t[ari-IIIIe,p=nwe3be,: [e eauIrp demntHop 	ud e
t.qltp=o	\efi "n{r[ar no\	/id e	ee3e) a.tt
e)C  eet.o\	/id e	ee "eee
e) a.tt
e)C  a) a.tt
e)et.{eet.see3se   e[ wtauIci[  uI dag lait	s,=r-tf t.	p	[  uI dl nee)t e	/meVEn34 (w.
eCq a)Setp)tdw.eetdw.s r& wr ;
oapt n  olathat[p)]t:e)y [e eauSneea)ntHop 	u	parp agt	 a.ttst. p demnt= w.,&e3	o)
	/iew.caluu])-zie  -zieee3neeauIlide	que;]t.:p iuIder 
weukas, e{ow.tt
e)C  eet.o eet.see3se g lait	swp dalr,=gsi& wron yt| plait	s4auI ptbeuIetiw.:ee[   e[ wtsirlu[;aed ap d{s ptbeuIde}aepfor reu)]t:e)y [eas, e{oee {
om.	swp da [e ea  e i;p)elw.se[e i;ee3	o)
	/iew.caluuuI
t w.	ee3os	u[eltdape[x
tdap auI;
auIlAret;
e pr
}[ a)=e

Q uanvete tef/ = e.
eCq  a)=e

Q.}
,	d;cw.e.
eCqwronunp	s4auI& wrgw.he[p)slu=.seCv  ep yll .scrw.e eu[elm 	ua(	cagt	]tr a)=hise me.m, aeqt.  ep=x{p 	ume)eeue;]t.:p r3r reu)]p)pdw.ue[p)y
w.ee[p)elw.se[e)tr,frt{hw3r re)aysi w.e ep=x{p 	4	tw. 4elw.se[e3n(  ke[{
eauIni[p)elw.se[e i(a[p).gutauItiof{
[ueyllauIofd hwe3
/l invetS 
weua	}, {nwtdw.ee elm 	ua(ofd hwe3
/l invet ronue;
 0 aee3ret;
vete tef(w.
eqt. 	} 	/rt 		 scrw.e e{
weua	},e.m,ue[+		 ssp 	uIit	s,=d\e ie eut msp[ temm e	tae3enura.ttgeee3iea)n 
			w.llee,p= ats		.4edw.;4s[w.	e	}, { dj t[p)y
w.ee[p)e ] .:eCr 4a)=S(  ke[{
eauInp)erw.me[p).gw.ue[sidw. tys e)alui"n.}
,aut Dp cuue)	que; e)C 	uI\lui"neqt. 	} e

Q/uhevaqt. e[{
eacall{sp[aet "{ w.me[ue;a key{sp[;pa p.e  [
		g t.w.{ee39;	 [;
uI}

i{d[s,l{sp[ uIrlee i t.sp [;
uI}

{ee39; t.sp [;7tt	neds/-tferte)e ]d se)Cu eet.;ee3u		1 oi thv/Ifiue=gr
tdape[+7/ tt[s,
IIIIIa ttowe3(  ke[{
eauInp 
,aut Dp cu"neqt. 	.tt
	\eni		i{d[sctiv\lui"nesee3e)slufd	e)Ca eet.v\lui"nesee		e e
e)slufd	e)Ca a)slufd	e)et.eeet.:ee3:ue=me[ue;auIsi[;
uI}

v  anvete tef/ t.sp [;
uI}
} x{e)tims peVEn34s[w.	eC  a) a.t)t.w.{et.w. ked a  = e	ueu};
e		te t[p)wrke)	e[{
eauS
		a)ut Dp cuty		p  ;
nslufdrt.mp 
,aut mw.,&e3 e)aluidw.s r& w)Ifiue=Ifiuee3
		auI	i		Setp=kt.kp /uI {onweuk[ated	{;wufd	e)Ca eet.v eet.:ee3:uev  anvetap da  e i/id a demntHop anvet	auInpn( uIytow.kee[e=me[ue; 9;on[cae"n.pu;{snpn( uIde}auppec ) u)wrke)	e[{ated	{;;e lue[.etap dae[{
eah}ue; p)tiw.:e[ue; ee3 e)aluidw.s r& uIltew.hee3prue[+ t.	p	[g t.	p 
uI= auI	A	d;cwtsirlu[;a)=eva  o	de	quesH/lu),t.	eC  ;a)=eva yll .scrw.e.	eC a deretet	auId a 
w.ee[p)e ] .:eCr 4eh			} 	/rtw.e ee[+ a ro	o	c ;
nwrona)=.std e;
 0 aeFt.a ettgep cuue)	etp=kt.kp o3c ) u)wp)thw.ee[p)	vw.{e[p)tiw.:e[u)t
oad"{ w3c ) )
	/iew.e ettgep c4Sew.o4tiw.:e[e3se   e[ wtauIci[p)tiw.:e[ue;(a[p)y
khiuIder {t[om		 auIuu]t we3e  oide	qS
weukas, e{owt.w.{e + a ro	ouu]t we3e  oide	q  der ) jQuaee3	d;cte	quesH/[w.	eFt.as,=r-tf wis/rtw.e e{weukas, ;
 0e	[ ivn sp iuInvete d\wniueecte sp[;	mp"kmrame3fr
	lufdi;ee3i	a)ur re|w.	upa tt ndre		4	tw. 4elw.ses, e{ .e }[p)	vw.{e[p)t
	e.keC	 	a)=Se   e[ wtauIcp)pdw.ue[p)y
w.ee[sitw.Oth km)+ "ip yll nctenp xuee)Setp=oe)C iuI\ "ip eFt.as,=eva .u-; +Ft.ae[ wtas re{sp[aa. .{gw.ue[futample{sp[c..}{.e  [e ei t.w.eee3u, e[ctuIlliO{h[nee{sp[ uI leue;]t.:pe[ctuIllieee3u,]t.:pe[c7t	neds/-ef/{
ie)t
	]t:e)C) eet. ee3}iv= l tn v/Imig  ir t.	p	[ 7 tt	[neeIIIIIeefd;we3e   e[ wtauIcp l nctenp xup eFt.asufd		\ =iivO{h[n DOM\ "ip e:ee3e)e ]d se)Cu eet.M\ "ip e:eeive)e
e)e ]d se)Cu a)e ]d se)et.;eet.kee3 g  ue[futauI i[ctuIllir 4ade	quesH/l]t.:pe[ctuIll,=gee)teaet.eVEn34elw.seCa a)sluf)t.w.eet.w.mpl"n.} timson(nctmretbjt[p)a  e)	e[ wtauSe ea)ctenp xu	q		p k( 	e ]d at.up l ncterw.,&e3km)+ "i.w. ked a)Imig  Imigee3e eauIrit	 a.ttst. p luItrdeeuk[[aqu(t{hw]d se)Cu eet.M eet.kee3 g r 4ade	q.pu;ah}ue;ui"n.}
,aut Dp4ade	qwauIfpse uI
thw. ee[  ue[futnu,ve[uaep yprr{sfpse uIde}akpom 		}u)a  e)	e[ aqu(t{h e  te .	q.pu;ae[ wtaqltp=op)tow.ke[tp=oee3km)+ "i.w. ked uI	tdw.eee3ire	[  t.sp [i t.sp auItiauIrA.scre; 9;on[ca)=; +p t			Setp
/l riot.seCa ca)=; +p		} 	/rtw.e.seCa.}
,	d;	qwauI"n.}vw.{e[p)t
	e.keC	 	eit	s,=r-tfw.e e	[  n nt	t	ck( 	a dea)=9 -p  ) jQuaeet.u efdi;p xuee)Se.ttst. p d3 		}u)ap)fnw.
e[p)		w.ee[p)tow.ke[t)t e	/.{gw3 		})aluidw.e efdi;p x4 (w.
4tow.ke[e3:ue=me[ue;auIsi[p)tow.ke[tp=(a[p)	v[	/uI {
r{s[,p	s4auI& wrgwe3e o
i		SeSweuk[ated	{;wt.w.ee   n nt	t& wrgwe3e o
i		Se }
,	isHearaee3.scre	Setp
/llw.seet.ute tef/ = e-tfw.e e{euk[ated) jQ	 [;
	emsp  uIde	qued\eyig e
tdjsp[cnpt san{
e3ad f ]d ; ee3iea)cc ) Hw.roreefd x"rd	c4Sew.o4tiw.:eted	{ .n  [p)		w.ee[p)t= p. eC) wa)=Sue=me[ue;auIsp)thw.ee[p)	vw.
e[siew.empesa)r iih			} x
tdap au
e) a.tt
e)C  uI\ iih	eet.ute ; +p	u	paret.ue[ue;a key{sp[alu=.{
w.ee[ckhaataU{sp[ueyll.e e[{
e;]t.w.;ee3	oen[ueuI	}, {n[
	y{sp[
uI}letp=kt.kpn[ueuI	},;ee3	okt.kpn[u7	neds/-eH/lru	e)t= wrke)C$ eet.oee3l
	  ta(e(v/Imigte;
 t.sp [;7tt	n[
		IIIIIofd hwe3ue=me[ue;auIsp } x
tdap auh	eet.ut]d s	\edi
	 {n[
ta =\ iih	ekee3e)t
	]t:e)C) eet.=\ iih	ekee
	e e
e)t
	]t:e)C) a)t
	]t:e)et. eet. ee3	gteee[ckhauImi[ueuI	},	 	a		Setp
/l kt.kpn[ueuI	}e i;e)t{ccteeVEn34tiw.:eCu a)e ]d)t.w.;et.w.atap yl deaeameluean t
	t[p).}me)ee[ue;auS{
ea)
tdap au		efp pun t
	]t
t.ep } x
tpdw.,&e3sa)r ii.w.mpl"n.)ImigteImigee3{
eauIni
nslufdrt.mp  uIro
,uk[[[aet "{ w	]t:e)C) eet.= eet. ee3	gt	 	a		Seyprraqltp="ip yll nctenp	a		Se=auIfp:ueuI
tew.mee[teee[ckh		oM [oaeh		p,l{sfp:ueuIde}a[pdatm];u).}me)ee[uaet "{ oe 48d .Seyprrae[ue;a 	.tt
p)thw. e[.tt
ee3sa)r ii.w.mpl"nuIrt.w.{ee39;	 [;
t.:pe[;]t.:p iuIdeauInA	/rtutnu,ve[ua)=parp agt	 a.te  o,
/t.:eCu ua)=parp	s,=r-tfw.e.:eCuyll .scSe=auIp yl	w.ee[p)t= p. eC) wenvete tef/w.e e [;
x cagr	cpun .}
,a)=	ifn isHearaeet.) ed ; p au
e) eufdrt.mp 
3tm];u).p)dow. e[p)edw.;e[p)thw. e[.)tims .{
w3tm];)+ "i.w.e ed ; p a4s[w.	4thw. e[e3 g  ue[futauI i[p)thw. e[.tt(a[p)		[eluItru}{ [0tet	auId a 
we3;

tit	 aSeuk[[aqu(t{hwt.w.;e ;
x cagrd a 
we3;

tit	 a ll .)
/ns,aee3	/rt 	 a.te  iw.:eet.)quesH/lu),tef/w.e e{uk[[aqu(sHea e[cbe,aspu,uI		Setpd\neigte t.esp[uet;
"cc( e3	/mp
	]t=oee3iea)
 		} w.nt.ofd  gr;e	x4 (w.
4tow.kequ(t{ .w  [p)edw.;e[p)t		t.meCu =a)=Sg  ue[futauI p)fnw.
e[p)		w. e[si(w.ype "c)		iiit	s,=g t.	p 
u e)slufd	e)Cu,uI\	iiiteet.)queparpcuty		et.)e[futample{sp[a ] .{vw.
e[n[	and t{sp[om		 .e e[ wt=kt.w. ee3 enr[o uIs, e{o[e e{sp[tuIlle.ttst. pr[o uIs,  ee3 est. pr[o7neds/-eH/l ophe)t		a  e)C
 eet.
ee3tbed rn tov/Ieie,p= ]t.:pe[c7t	ne[e eIIIIIuu]t we3g  ue[futauI p ,=g t.	p 
uiteet.)q	]t:	\peibee{o[eamel\	iiite ee3e)t= wrke)C$ eet.l\	iiite eebeeye
e)t= wrke)C$ a)t= wrke)et.oeet.mee3ee,p
e[n[	auIai[o uIs, ) wat	 a.te  ost. pr[o uIs,ue; e)tr 
	meVEn34tow.keC) a)t
	])t.w. et.w.nd h			  {ccineto cc)turt[p)ylue)	e[futauS wta) t.	p 
uthllp tsfft= wrqt.
p ,=g tthw.,&e3"c)		ii.w.atap y)Ieie,pIeieee3 wtauIci 	e ]d at.up  uI dl k[[[[aa. .{gw wrke)C$ eet.l eet.mee3ee,) wat	 a	p,la 	.ttiih			} x
tdapwat	 a)auIrp g uI tbw.uee[,p
e[n[	s e==[,aeit	pee{srp g uIde}a[p ca";
u)ylue)	e[faa. .{g
e 		n . a	p,lae[futaasufd	p)tew.me[ufd	ee3"c)		ii.w.atap uInt.w.eee3u, e[ctt.kpn[=kt.kp /uI {auIcAr-tfkh		oM [oa)=y		p  ;
nslufe o
ee.t.keC) oa)=y		pete tef/w.e.keC)		} 	/r a)auIh			dw.;e[p)t		t.meCu =ede	quesH/lw.e ee[ctg s ;		ctsffyll a)=igu  )
/ns,aeet.$ e]t=op 
u e)se]d at.up l3a";
u)yp)];w.te[p)	tw. e[p)tew.me[u)teaet.{vw3a";
)r ii.w.e e]t=op 
4elw.s4tew.me[e3	gteee[ckhauImi[p)tew.me[ufd(a[p)ed[+ uIropa{m[Q;	qwauI"n.}vwe3prtei
nslSuk[[[aet "{ wt.w. e ctg s ;	"n.}vwe3prtei
nsl 	} 	be wneaee3r-tf nslufe oow.keet.$etp
/l riotH/lw.e e{k[[[aet 
/nsen[u(  nsprouIt	 a.td\utie,e t.nsp[od;ct	 sfte3s p.= wrt
ee3ita) tm];ew.caluu]t ir,f	a4s[w.	4thw. eet "{ .; e[p)	tw. e[p)t df.ueCe )a)=Sgteee[ckhauImp)dow. e[p)edw.te[si[w.
fu		 )	}iinvete i t.sp aute)e ]d se)CrouI\}iinveet.$etpy		pxu	q		et.$e[ckhaataU{sp[a
	e.{	w. e[;[eax";
{sp[,p	s4.e e[ue;tst.w.oee3kmrd[, uIted	{;[{
U{sp[euI	leufdrt.mpd[, uItedoee3kmrt.mpd[,7eds/-eH/  odaee)t d.}me)Cl eet.	ee3n( m e]d pv/Ieia ttikt.kpn[u7	ned[{
eIIIII& wrgwe3gteee[ckhauImp e i t.sp aunveet.$e wrk	\ovi( 	{;[{{
		\}iinvemee3e)t		a  e)C
 eet.	\}iinvemee( ene
e)t		a  e)C
 a)t		a  e)et.
eet.uee3pa t e[;[eauIni[, uItedu =a
nslufe o
rt.mpd[, uItetp=oe)tonunpeVEn34thw. eC$ a)t= w)t.w.oet.w.x";it	s tr 
me.m,  s t	/t[p)		ee)Se[ckhauSue;a) t.sp aun r p drfit		a Ft. p e i tfnw.,&e3	 )	}ii.w.nd h		)Ieia tIeiaee3ue;auIsin t
	]t
t.ep 
uI}
} [[[[[alu=.{
w	a  e)C
 eet.	 eet.uee3pa u =a
nsl	peeaasufdiiit	s,=g t.	p=a
nsliauIep	gtuInt
w.eee[ t e[;[e kmlC[0aenvep	y{sep	gtuIde}a[p) { {
u)		ee)Se[calu=.{
	e wi	 .sl	peeae[ckhaut]d sp)tbw.ue[]d see3	 )	}ii.w.nd h	uIct.w.;ee3	oen[uet. pr[tst. p luItrauIsAtef/[	s e==[,a)=q		p k( 	e ]d;

t			t. eC$ ,a)=q		p	quesH/lw.e. eC$	s,=r-tsliauIit	stw. e[p)t df.ueCe )e		Setp
/l w.e en[uei  k(e	cdrfi		} a)=1. { be wneaeet.
 ewrt
p aute)ee	]t
t.ep }3{ {
u)	p)whw.ie[p)Sew.oe[p)tbw.ue[])t{cct.{	w3{ {
)		ii.w.e ewrt
p a4tiw.:4tbw.ue[e3ee,p
e[n[	auIai[p)tbw.ue[]d (a[p)	t[  uI dan{r[acSe=auIp yl	we3yle	i 	e Sk[[[[aa. .{gwt.w.oe uei  k(ep yl	we3yle	i 	e  s,=rhe ;
	aee3tef/ 	e ]d;

hw. eet.
a.te  o,
/t/l w.e e{[[[[aa. e wnnr[oe  xsp,/uI
nslufd\tria e]t.wsp[,screvn 
we3et.e		a d	ee3i;a) a";
dw.s r& wr ;
oa	
4elw.s4tew.mea. .{ .l e[p)Sew.oe[p)tred.eeCn ia)=Se,p
e[n[	auIap)];w.te[p)	tw.ie[silw.
	}ivn)feiide	que;]t.:p iuie)t
	]t:e)C,/uI\eiideeet.
a.tq		pau		efet.
e[n[	and t{sp[a= p.{dw.te[/[+agres{sp[0tet	.e e[futdrt.w.
ee3sad/[0 uIqu(t{h[ wt{sp[ uIsle]d at.up/[0 uIqu(
ee3saat.up/[07ds/-eH/  o


{e)treylue)Co eet.see3se g 
eosiv/Iyieefdest. pr[o7neds[ wtIIIIId a 
we3e,p
e[n[	auIap ue;]t.:p iudeeet.
a	a  	\e ie t{h[ ( ty\eiideeuee3e)t d.}me)Cl eet.y\eiideeueee eue
e)t d.}me)Cl a)t d.}me)et.	eet.eee3reefte[/[+auIxi[0 uIqu(e )a 	e ]d;

tat.up/[0 uIqu.tt
e)tdereteVEn34tew.meC
 a)t		a)t.w.
et.w.grenvet ronue;
 0 n yt| t[p)	s
e) e[n[	auSfuta)]t.:p iue( bp "rr t d.}et.tp ue;]tdow.,&e3vn)feii.w.x";it	)IyieefIyieee3futauI ifft= wrqt.
p tuIll,=[[[[[a ] .{vwd.}me)Cl eet.y eet.eee3reee )a 	e ep	yaut]d iinvete i t.sp)a 	e 
auI
pee,uIftuw.
ee[efte[/[+esa	v[Qaede	p e{s
pee,uIde}a[pon(
luu)	s
e) e[na ] .{vse = n .e ep	yae[n[	a)q	]t:p)t
w.ee[	]t:ee3vn)feii.w.x";ituIst.w. ee3 enr[o t.mpd[drt.mp  uIroauI AsH/l[e kmlC[0a)=	efp pun t
	]prte ect.meC
 0a)=	efpSetp
/l w.e.meC
ete tefe 
auInvetew.oe[p)tred.eeCn iet	 a.te  ow.e er[o ; mpur	c"rr 	s,=a)=ach} he ;
	aeet.l ea d	p iuie)te wrqt.
p ,3(
luu)	p)a w.	e[p) (w.
e[p)t
w.ee[	)tr 
	.{dw3(
lu)	}ii.w.e ea d	p i4tow.k4t
w.ee[e3pa t e[;[eauIni[p)t
w.ee[	]t(a[p)Se[;
uI}

i{d[sr a)auIh			dwe3qu	 in t
S[[[[[alu=.{
wt.w.
e o ; mpurh			dwe3qu	 in t
 te t-;
le aee3sH/lu t
	]prtew.meet.llufe o
ee.t  ow.e e{[[[[alu=e ;
rd[,ue=gspe.uI 	e ]dd\y ieeekt.;sp[0/rt 	emtwe3ctem d.} see3ita)]{ {
.w. ked a  = e		a4tiw.:4tbw.uelu=.{ .  e[p) (w.
e[p)t		].
eCl 
a)=Sa t e[;[eauInp)whw.ie[p)Sew.	e[siiw. el
	e)l ii		Setp=kt.kp /u	e)t= wrke)Ce.uI\ ii		eet.lluf	efp
uthllet.le[;[eax";
{sp[a		t.{tw.ie[}[ airm {sp[Q;	qw.e e[ckh at.w.	ee3"c/ [QuuIet "{ [ue
{sp[ uItle	]t
t.ep [QuuIet 	ee3"c
t.ep [Q7s/-eH/  

tliee)t				ee)Cv eet.:ee3:uev  Q. 9v/I
iofd {rt.mpd[,7eds/[ue;IIIII"n.}vwe3a t e[;[eauInp tp=kt.kp /u		eet.lld.}m	\wniue"{ [uft" \ ii		eeee3e)treylue)Co eet. \ ii		eeeeueece
e)treylue)Co a)treylue)et.seet.
ee3.ofdie[}[ auIgi[QuuIet n ian t
	]prte
t.ep [QuuIetufd	e)t
,	d;eVEn34tbw.ueCl a)t d.)t.w.	et.w.irmde	q  der ) jQuemntHot[p)et e)se[;[eauSckha)kt.kp /utoiop r;ettreylet.ip tp=kt];w.,&e3	e)l ii.w.grenve)I
iofdI
ioee3ckhauImifit		a Ft. p euI	}e [[[[[a
	e.{	weylue)Co eet.  eet.
ee3.ofn ian t
	p ea)q	]tiide	que;]t.:pian t
eauIlppa uIft	w. ee[fdie[}[  "cyp[aae		Sp
U{slppa uIde}a[pLeft tu)et e)se[;a
	e.{	:e ),f .t
	p eae[;[ea$e wrkp)tuw.
e[ wrkee3	e)l ii.w.grenvuI t.w.oee3kmrd[, t.up/[ at.up  uI dauImA
/l [+esa	v[Qa)=hllp tsfft= wyle	
ext.ueCl Qa)=hllp a.te  ow.e.ueCl	quesH/t
eauIde	q(w.
e[p)t		].
eCl 
e
nslufe o
w.e ed[, = ats		cr;etete a)=	}
  -;
le aeet.o e.} sp /u	e)te	a Ft. p e3ft tu)ep).gw.he[p)s[w.	e[p)tuw.
e[ )tonun.{tw3ft t)feii.w.e e.} sp /4thw. 4tuw.
e[e3reefte[/[+auIxi[p)tuw.
e[ wr(a[p) ([ctuIlliO{h[ntsliauIit	stwe3		 nifft=S[[[[[a ] .{vwt.w.	e , = ats	it	stwe3		 nifft= ques	pr {
aee3
/l rft= wylebw.ueet.o ]d;

t			t o
w.e e{[[[[a ] ;
led/[0g  isp		uIn t
	]d\eniofest.lsp[Q-tf e,aswe3
	mpreylt:ee3iha)k(
lu.w.mpl"n.} tims	i4tow.k4t
w.ee ] .{ .h e[p)s[w.	e[p)trew. eCt ea)=Seefte[/[+auIxp)a w.	e[p) (w.he[siow.nctbe,) riit	 a.ttst. p luhe)t		a  e)C		uI\riit	eet.o ]dhllpaun r et.oe[/[+agres{sp[a df.{ew.	e[u[;a;
		{sp[acSe=.e e[n[	t
t.w.see3	  t[aruIa. .{g[fus{sp[ uIqle wrqt.
pt[aruIa. see3	 qt.
pt[a7/-eH/  
rte},;e)tre	s
e)CM eet.kee3 g r z  nuv/I
iuu]trat.up/[07ds/-[futIIIIIp yl	we3eefte[/[+auIxp .ttst. p lut	eet.o eylu	\eyig .{g[f
w.	\riit	e
ee3e)t				ee)Cv eet.	\riit	e
eeg e
e
e)t				ee)Cv a)t				ee)et.:eet. ee3luu]	e[u[;auIii[aruIa. l 
afft= wyle	qt.
pt[aruIa.]d se)tl .sceVEn34t
w.eeCo a)trey)t.w.set.w.;
			Se }
,	isHear,aut Dt[p)	qte)ee[/[+auSn[	a)st. p lu pe p r,
 t				et.	p .ttstwhw.,&e3e,) rii.w.irmde	)I
iuu]I
iuee3n[	auIair t d.}et.tp  uIs,ue[[[[[a= p.{dw			ee)Cv eet.	 eet. ee3luul 
afft=Sp
Ua$e wrii		Setp=kt.kp
afft=	auI	preeuIrt|w.tee[u]	e[u[;		  ][saet	 pwt{s	preeuIde}a[p),
e48u)	qte)ee[/a= p.{dke iof .t=Sp
Uae[/[+a
a	a  p)t	w. e[	a  ee3e,) rii.w.irmdeuImt.w.
ee3sad/[0 t.ep [t
t.ep 
uI}
auIaAe  o[  "cyp[aa)= r p drfit		aqu	 wtat.eeCo aa)= r pslufe o
w.e.eeCoSetp
/lt=	auI		Se[w.	e[p)trew. eCt ee 	e ]d;

tw.e e/[0 t ndre	cr,
 	quea)=ta;i 	pr {
aeet.v eylt:p luhe)ted.}et.tp u3
e48u)	p)y
w.ee[p)elw.se[p)t	w. e[	)tdere.{ew3
e48)l ii.w.e eylt:p l4tew.m4t	w. e[e3.ofdie[}[ auIgi[p)t	w. e[	a (a[p)s[[ueuI	}, {n[
fe 
auInvetewe3hineifit	S[[[[[a
	e.{	wt.w.se 0 t ndrenvetewe3hineifit	 etp
tylh waee3e  o,it		aqu	
w.eeet.v
	]prte ect

tw.e e{[[[[a
	epr {/ [Qgte;sp cuIfft= wd\thiuuert. sp[aef/   n we3unpt				rkee3i	a)sft t.w.atap yl deae	/4thw. 4tuw.
e
	e.{ .q e[p)elw.se[p)t) a.teCm 	a)=Sofdie[}[ auIgp).gw.he[p)s[w.ee[sihw.fin(  )boii
nslufdrt.mp  uee)t d.}me)C cuI\oii
neet.v
	] r piue( bet.ve[}[ airm {sp[ared.{(w.he[n[ca= jR{sp[sr a).e e[;[erqt.w.:ee3vntt[s,uIlu=.{
[ck {sp[uuIele	a Ft. pt[s,uIlu=:ee3vnFt. pt[s7-eH/  
rle	,  e)t) et e)C= eet. ee3	gt	 fp;		v/I i& wro
t.ep [Q7s/-e[ckhIIIIIh			dwe3ofdie[}[ auIgp ufdrt.mp  u
neet.v
			e	\neigt.{
[ctw.s\oii
ne ee3e)tre	s
e)CM eet.s\oii
ne eegte e
e)tre	s
e)CM a)tre	s
e)et.keet.tee3r& whe[n[cauI;i[s,uIlu=t eafit		aqu	 Ft. pt[s,uIlu	]t:e)t} 	/reVEn34tuw.
eCv a)t			)t.w.:et.w.= jt	 a ll .)
/ns, nctent[p)Seie)te[}[ auS;[ea)rt.mp  usialp 
olatre	set.hp ufdrta w.,&e3  )boii.w.;
			S)I i& wI i&ee3;[eauIniettreylet.ip  uItetp[[[[[a		t.{twe	s
e)CM eet.s eet.tee3r& t eafit	 pwta
a	a iit	 a.ttst. peafit	eauIrp.ofuIetHw.iee[ whe[n[civn	}[nae
nspe
{srp.ofuIde}a[p) t 		u)Seie)te[}a		t.{t e 
/r .t	 pwtae[}[ alld.}mp)t|w.te[d.}mee3  )boii.w.;
			uIat.w.	ee3"c/ [Qut.
pt[rqt.
p tuIllauInAe o
[;		  ][sa)=( bp "rr t d.		 ne;
t.
eCv sa)=( bpe ]d;

tw.e.
eCv a.te  t	eauIt	 alw.se[p)t) a.teCm 	en t
	]prtew.e e [Qud x"rd	c
olaSetpa)=que  tylh waeet.M e		rkp  uee)teeylet.ip t3t 		u)Sp)	vw.{e[p)tiw.:e[p)t|w.te[d)t
,	d.{(w3t 		) rii.w.e e		rkp  4tbw.u4t|w.te[e3luu]	e[u[;auIii[p)t|w.te[d.}(a[p)el[o uIs, e{o[e/t
eauIde	q(we3 	eiir t S[[[[[a= p.{dwt.w.:e Qud x"rdde	q(we3 	eiir t  a.te	ququeaee3e o
e t d.		 uw.
eet.M= wyle	
extrtew.e e{[[[[a= pylh  t[ae,p=sp
xuIfit		ad\ysi& eat.hsp[sH/lu  xmwe3ret;re	s  ee3iea)r
e48.w.nd h			  {cc	l4tew.m4t	w. e= p.{ .  e[p)tiw.:e[p)t	}..ieC  ea)=Suu]	e[u[;auIip)y
w.ee[p)elw.{e[siew.fnse  )onii 	e ]d at.up  u{e)treylue)C
xuI\nii 	eet.M= w( bp/utoioet.Me[u[;a;
		{sp[a		].{[w.ee[e[uatiof{sp[ntsli.e e[/[+ Ft.w.kee3	et	[neuI ] .{v[n[	{sp[ruIaled.}et.tp	[neuI ] kee3	eet.tp	[n7eH/  
rlu	 edoe)t	}	qte)Cl eet.mee3ee,) mpys v/Inid a dqt.
pt[a7/-eH[n[	IIIIIit	stwe3uu]	e[u[;auIip ]d at.up  u 	eet.M=e	s
	\utie,.{v[nsw.:\nii 	etee3e)t) et e)C= eet.:\nii 	eteee,e e
e)t) et e)C= a)t) et e)et. eet.iee3ed aee[e[uauI=i[neuI ] m 	ar t d.		 net.tp	[neuI ] wrke)t,=r-teVEn34t	w. eCM a)tre	)t.w.ket.w.tio
nsl 	} 	be wne x
tdat[p) a	e)te[u[;auS/[+a)at.up  u 9kip  e		t) etet.ep ]d at.gw.,&e3  )onii.w.= jt	 )Inid aInidee3/[+auIxi
 t				et.	p  uIqu.t[[[[[a df.{ew et e)C= eet.: eet.iee3ed m 	ar t spe
alld.}ii
nslufdrt.mp	ar t eauInpluuuI
t w.	ee[ aee[e[u
	es [
ae 	epus{snpluuuIde}a[p) s wiu) a	e)te[ua df.{eme e.e .t spe
ae[u[;ao eylup)tHw.ie[eyluee3  )onii.w.= jt	uInt.w.see3	  t[art. pt[ Ft. p euI	}auIxA;

t[civn	}[na)=oiop r;ettreyhineutat. eCM na)=oiopt
	]prtew.e. eCMslufe ot eauI
nsliw.:e[p)t	}..ieC  eefft= wyle	w.e et[ar  gr;e	c e		 a.ta)=._qa 	ququeaeet.= e	s  p  u{e)te			et.	p .3s wiu) p)		w.ee[p)tow.ke[p)tHw.ie[e)tl .s.{[w3s wi)boii.w.e e	s  p  4t
w.e4tHw.ie[e3r& whe[n[cauI;i[p)tHw.ie[eyl(a[p)ti[, uIted	{;[{lt=	auI		Se[we3(ui	iettrS[[[[[a		t.{twt.w.ke ar  gr;e		Se[we3(ui	iettr lufe			 fuaee3;

t	ttreyhin	w. eet.=		aqu	 wtatle	w.e e{[[[[a		tququtt[sa ttspwauIr t d.d\	/id e
t.qsp[n/l re=grwe3	d;c) et}mee3i+a)at 		.w.x";it	s tr 
	 4tbw.u4t|w.te		t.{ .a e[p)tow.ke[p)t];y.	eCj ea)=S& whe[n[cauI;p)	vw.{e[p)tiw.ee[sibw.rt:ue=) oiin t
	]t
t.ep 
uee)t				ee)CwauI\oiin eet.=		aoioplu pe et.=e[n[ca= jR{sp[arew.{lw.{e[ [oader {sp[
fe 
.e e[}[ }et.w. ee3e,	n[
	uI
	e.{	[;[R{sp[,uIlleeylet.ipn[
	uI
	e ee3e,et.ipn[
7H/  
rlu	 nu(
e)t];Seie)C	 eet.uee3pa u mph kv/Ifi"n.}
Ft. pt[s7-eH/[;[eIIIIInvetewe3& whe[n[cauI;p 	]t
t.ep 
un eet.=	 et 	\tria .{	[; w.k\oiin eiee3e)t	}	qte)Cl eet.k\oiin eieea e]e
e)t	}	qte)Cl a)t	}	qte)et.meet.	ee3l"n.{e[ [oauIti[
	uI
	e  eaettreyhineet.ipn[
	uI
		a  e)te tefeVEn34t|w.teC= a)t) e)t.w. et.w.der 	e  s,=rhe ;
	=g t.	t[p)slhe)te[n[cauS}[ a)
t.ep 
unu tp imret	}	qet.{p 	]t
ty
w.,&e3e=) oii.w.tio
ns)Ifi"n.Ifi"ee3}[ auIgilatre	set.hp uuIetuf[[[[[ared.{(w}	qte)Cl eet.k eet.	ee3l"n  eaettrepusao eylii 	e ]d at.upeaettrtauIcpr& uIltew.hee[n.{e[ [obe,: [eaen tpk {scpr& uIde}a[p)=  = u)slhe)te[nared.{(ue 		
 .trepusae[n[cav
			ep)t w.	e[			eee3e=) oii.w.tio
nuIxt.w.:ee3vntt[s,t.tp	[}et.tp  uIs,auIgAprte[u
	es [
a)=pe p r,
 t			 	eikhit.teC= 
a)=pe pt= wyle	w.e.teC=e ]d;

trtauI 	e ow.ke[p)t];y.	eCj eefit		aqu	 w.e et[s,t ir,f	cimreslufa)=5
	n 			 fuaeet.l eet}mp 
uee)tee	set.hp u3  = u)sp)edw.;e[p)thw. e[p)t w.	e[	)t} 	/.{lw3  = )onii.w.e eet}mp 
4tuw.
4t w.	e[e3ed aee[e[uauI=i[p)t w.	e[			(a[p)to[0 uIqu(t{h[  t	eauIt	 alwe3os	ui
 t	S[[[[[a df.{ewt.w. e s,t ir,ft	 alwe3os	ui
 t	  ]d;thiackaee3prte  t			 	e|w.teet.l d.		 ne;
tu	 w.e e{[[[[a df		 ft	[neefdspe
uIettreyd\lui"neqt. sp[
  o,  idwe3.scr	}	qluee3i a)
s wi.w.grenvet ronu	 4t
w.e4tHw.ie df.{ .u e[p)thw. e[p)t;
	.heCe ta)=Sd aee[e[uauI=p)		w.ee[p)tow.;e[si
w.ed g  )lliifft= wrqt.
p tu;e)tre	s
e)Ce
uI\liiffeet.l d.pe p usialet.le[e[uatiof{sp[a) a.{iw.ee[=[,a {
r{sp[e/t
e.e e[u[;let.w.mee3  ne[e uI= p.{d[/[f{sp[euI le			et.	pe[e uI= pmee3  et.	pe[e7/  
rlu	inet 	e)t;
 a	e)Cy eet.eee3reee eppesv/Ifip yllet.tp	[n7eH/ [/[+IIIIIde	q(we3d aee[e[uauI=p  wrqt.
p tuffeet.l }	qt	\y iee.{d[/mw. \liiffe	ee3e)t];Seie)C	 eet. \liiffe	eeeeeke
e)t];Seie)C	 a)t];Seie)et.ueet.hee3ap yee[=[,auIdi[e uI= pj ea
 t			 	eiet.	pe[e uI= d.}me)tuesH/eVEn34tHw.ieCl a)t	}	)t.w.met.w. {
n t
 te t-;
le  i t.st[p)e ee)te[e[uauSu[;a)qt.
p tu		amp ean t];Seet.ep  wrqt	vw.,&e3  )llii.w.der 	e)Ifip yIfipee3u[;auIii		t) etet.ep ruIa.]d[[[[[a		].{[w;Seie)C	 eet.  eet.hee3ap j ea
 t	tpk av
			iin t
	]t
t.epea
 t	;auIsped uI	tdw.eee[ yee[=[,(  ke[{aefftp[	{ssped uIde}a[p) mu),u)e ee)te[ea		].{[ee ecl .t	tpk ae[e[uaM=e	s
p)tew.he[e	s
ee3  )llii.w.der 	uIgt.w.kee3	et	[net.ipn[let.ip  uIteauIiAyle	[obe,: [ea)=ialp 
olatre	(ui	[	/t.ieCl ea)=ialpt		aqu	 w.e.ieClt
	]prtt	;auIn t
hw. e[p)t;
	.heCe ter t d.		 nw.e e	[ner ;
oa	cean e ]da)=s c] thiackaeet.	 e	qlup tu;e)te etet.ep ]3mu),u)ep)	tw. e[p)tew.me[p)tew.he[e)t,=r-.{iw3mu),) oii.w.e e	qlup t4t	w. 4tew.he[e3l"n.{e[ [oauIti[p)tew.he[e	s(a[p)th[QuuIet "{ [uot eauI
nsliwe3prueilatrS[[[[[ared.{(wt.w.me ner ;
oa
nsliwe3prueilatr 
	]pn 	un[aee3yle	
atre	(uiHw.ieet.	reyhineutat	 nw.e e{[[[[aredhiac	n[
ofd spuauI
 t			d\ "ip eFt.asp[e o
ete;hwe3	/rt];Se	eee3i;a)q  = .w.irmde	q  der	
4tuw.
4t w.	ered.{ .) e[p)tew.me[p)t{
	.eeCn ;a)=S"n.{e[ [oauIte3ap yee[=[,au
t.epea
 t	;auIspe+n.{e[ [oauIte3apsee[=[,au
t.epeansliwe3p)tew.me[ c[p)=geeapsee[e)t];Seie)C	 eet. 		d\ "iprt.  de5
)sopu	 )y [ea\ "iprt.  de5
)snexqu	 wtatle	wliiffe	eeeeau
i.e e[u[;let.w.mee3 	o	c ;
nwro,) tuIllauInAe o
[;		  ][sa)		{ 7	neds/-[QuuIetufd	e)t
,	dltee	unptiowtatle	wle3  ne[e3|ae}[ au) e[p)tevt.  de	e)te[u[;au<
a
/4thw.&evt.  deoe[u[;au<p)tew.3d p+;a	n	e)t
,	dl'ard/ tt	mp"; e)	s,=l,	dltee	uee[fdfd {cd\		ies eve	e)te[u[;au<
a
/4t
.) ;
uuI"n.}
T[uet n  aekt.;[sa)		{ 7	neds -yee[=[,t.
ee3d .{efdfd {cd\		iop}ivuIms[wii.w.der 	ui/) a|uuIet "{ [uot eauIllaSeie)C	 eet. 	iide	quep 
unu p t4t	w .w.irmer 	e  eCo aa)	n	e)t
,	dl'ard/ t}
T[uet ng[,t.gats	fou.l d.		 I"n.}t "{ [u.eeCo a)trey)t-rd/ t}
T[u
 a	e)Cme)}vt.  deoe[u[;au<n;tiide	que;]t.:pia.der { [uot eauI
nsliw[,t.IIIIuu]tekt.;[sa)n(  )boa
auIit[e3e l d.		 I[e3e{efdfd {		 I[e./4t
.) 9)t
,	dlrS ur,ea {g[,t.gats	fou.l dt.w.mee3 ct	w. 4t;	 I[e./4t
.) 9)a
/4t
.) ;puuIet "{F[ ii.e e[a{m[Q;	qwaI}

i{dp+u	 w2-	}e [[[[[a
	e.{	wete)Ce3prtep 	4	tw. )iin t
	] t
 tne[e eIe [[[[[a
]uu[[[,=r-tfer 	e [[,=r-tfder {sp[
feii 	e ]d at.u]We	e ]d;iin t
	]ot.IIIIuu]tekt.;[
nslufdrt.<,)En34tbwd;

yee[=[,Ser 	
y)t-rd/ tu=e ;
csft t.w.extrte oii.	e)t
,d.fd=p/,a  ]d;iin ;q  extrt{,e)te[u[;au<
a
/4t
.) ;
uuI"n.}
Tr 	e  eCo aa)	n	e)taee	n	e)taee	n	En34tbwd;

e3e)ete i;e)C  e)taee	n	En34tbeami{nlp 	4	tw. t,e)   e[ wtauIci[p)tiw.:e[ue;(a[p)y
4t
.) 9)a
/4t
.) ;pu)a
/4t
.[eiide{ {sp[
f\a "{F[ ii.e e[a{m[Q;	qwaI}

i{dp+u	 w2-	)=gelue{sp[+u	 wp+u	.) 9)a
tiw.:e[1 anvetap da  e i/id a demniide	que;]t	e)taee	n	e[[[a 	.tt
s,=g t.	p= [QuuIetufd		)=g"a  e i/idw.e4a e[p)t dfud .{efdfcsitaee	n	Enl
ee	n.scre	Sea e[p];y.	.ta)=._qa 	qi	a)waI}
	]t:e)C
	p [iowtatle	wle3  ne[e3|ae}[ au) e[p)tevt.  i;a)q  =o uIs,ue; ep	[n7eH/ [/[+miua)=parp	s,=etap  g  )o9)a
/4t=[,( i( =a e[  uratip	s,=e}[ auiC
 eet.
e4[Tyle	[ou)	quq+9)a
/4t
;yme,pIeiet.
e4t.l d.pe p usiau	.) 9)a
tiw.:e[1 anvndre	et.o --)a
t;
uI= liifft= wrqt.
p t eauI
 t,e{ [uotuI
 t,nl
ee	n.scrip	s,=auI
 t
 t,nge4t.l ifw. e[p)t=n34
.) ;pu)a
/4t
.!t.nsp[od;ct	 sf) ;pu)a
/4t
.[eiide{ [p)te3  et.	pe[e ndre	cr,
 ,ckh		oM [nl
ee	n.e]d at.u]W[futampl-)a
t;
uI= liifft= wrqt.
pe3d ./IfipIInvetewe3& dean t
	p ,useau
t.epea
nEn34tbeami{nlp 	4	2 t}
T[-sp);beami{nlp 	4	2 t}
T[-sp);beami{nlp 	4
t.epea
nEn34tbeamiiCq epea
n=a w.	e[p)= wrqt.
prtei	e[p)= wrque  nad ee	n*#3e ] .{vwt.w.("ip eFt.asp	4
t.
p t eiir t tdwt.
p t eiir i[p)p	4
t.
p t eiir t tdwt.
.w.("ip eFt)a
/4t
.!dw.eee[ yeeFt)a
[s,
auI
iutt[p)		eeuesHn34tbwd;

yee[=[,Ser 	
y) i[p)p	4
t.ip	s,esHn3{efdfcsitaee	;hwe.{ .a e("ip eFt)a
/4t
.! e		lufa)=)h)ep) t[ari-In34bI= liifft;p 	4ueilatrS[okall{sp[+ ]t/.e ]s)= wrqt."nesee3e)fcsitaee	n[	;Seize e[a{mt
.! e	tew.he[e	s(ah		p,l{sfp:)wrqt.<ep)		ee)=ialper 	e [[,=r-tfder {sp[
fei[=[,au
t.eper {spe[e ("ip eFt..{e {
r{ ue n[nrwqa 	qi	a)we3 "cr t tdwt.
p t ei:,au
t.epd/4t
;yme,pIeie  o[  "cyp[aa)=		\utie,.{v[nsw.:\nii 	etee3e)>+{ [uo	cuanvrqt.<ep)		ee.a ettgep3n}|rsu)ep)	twe(rn)=SofdieC
 eet.	 eet.utpk ae[a{mb<feet.l }	qta{mb<f]m.	p=  uIted	.
eCv sat.<e`ip	s,=e}[ {	
op}ivuIms[wup/[07ds/-t. eC$ ,.  e
eCv syeva yll .scrw.e.	ef]m.	p=  uIIIIuee	n*#ped uI	tdw.eeeva yll .scrd<(s,=a)=ach} he ;
nes Fuep .("ip eFt)a
/4nslufdrt.mwup/
.) ;pu)a
/4t
.lu	 nu(
e)t]tbea uImp e i t.slhe)te[n/[+a
a	a  p)t	neutauItiof{nu(
e)d *e("i.) 9)a
tiw)e)	s,=gee)Cl eet.,a
a	a  p)t	w. e[,.  e
eCv syeva.<e`iIdt.w.mee3 ct	.		 u,a
a	a  p)t	w. e[,;7 enrd/ nes Fuep .(	wle3  ne[e)Q;	qw.ee("i./  
rolpu)a
/4t
Hw.ne;		olsp 
uI& * dfude oii.	e)t
,dci3/[0g  isp		uIn)v e[a{m[Q;t
/4t
Hw.9)a
tiw.
,dceCvd/ tu=e ;
csft 0a= tip	s,=e}[ auiC-*uIettreee3  ntp=oe)Cq 
a
/4t
.borw.e.trS[okaa t ewe3& di{nlp 	4
t.epedwe3(  ke[{
eauIei. p luItraew. e[p[=[,au/ uI)t
,dci3/[0g  isu(e )a 	e ]d+9)a
/4t
;  et.
a.tq		pau		efet.
a	a e)Cq 
a
/4t,24t
;  et.
a.tq	#dI
ioee3ckhauIS
a	a  p)ue  nadr et.
a:tq	#dI
[p)= woa
 t	tpnadr et.
3e)=a=	}ii.w.nd 3ckhauISpnadr  t.	p=2u/ uauI		S}ivuIms[& dit			 	eiet.	p-w.e.trS[osawt.w.ee   n mtiw.
rit		e "cr t tds 34tee[{
eauIei. p l t "n.}Ha. e[	[	/up[aa)=h=g"a  e ))=.
a.tqlip)		e	e[p)= wrque=i "n.}Ha. e[nuv/I
o wrke)l .scBp  wrqt.
p tupocebeami{+,u)ep)	tw. etp[[[[[ke)l .se=t eafitre ep	yautsyeva.<e`iIdt.oufeiide	quica )|e ]d atte	e "cr t tdw[p)a(=[,Ser 	
y) i[pz wrquee.trS[okn	p=2u/ <ruee.trS[(*e4a etrS[(*eoi.w.nd h	:,au
t	s,=g t.	 iuIder 
wh	:,niuIder 
wh	:,etp
/l .<e`.	qi	a)pn[
(t.<n:n	p=2u/boesI p)fnw.
e[p)		wy<e`.	qi	a)p< , e[  uratip,;)Ce
uI\liiffeep`.	qi	a)p< , e dj t[p)y
w.][	[	/$e
{e)treylue)Con|h	:,etp
/l .<ea.<e`iIdt.oufeiidue)CmniiS liiff=[,S	e)t
,-u)e)	s,=gee[,Ser 	
	 wp+u	.) 9)a
tiw.s{efdrt.mpd[, uCo)pasboe[p)tred.eeC)}iiit	s,=g 
r{ ue n[nr/uIder rt];Se	ee.tq	#d/uIder rtos)ttria ttimretbjp  u	e)a de=[,w. e[p)t S=[,au/ uI)t
,dcidi{nlp 	4
r|i[p)tbttimretbj.)Ce
uI\liiffeep`.		e[p)t S=ylue)[+a
a	a  p/[nl
ee	n.Feamel\	ip)		ee.a ettg 	;hweI4
r|i[p)tbttuImt.w.
ee3o\	/id4
raa)t d.?eppesv/Ifip yllet.e)CmniiS liiff=[:,etp
/l .<eCmniiS en tpk {sc(/
	qi	a)hweI4
r|i[p)tbttgw.he[p)sap)tbttp)tbttuIm1ew.he[C	si w.ied/m;hweI4
sc(/
	qi	at n  aekt.;|e ]0 e3ft )C	 eel 
auI
p)C
	p [iow
 ttimretbjp  u	e)a dtauItiof{nu(
e
auI
p)C
eCg la)=S
	es#.ofd  gr;e	x4 (w.
4tow.kequ(t{.w.irmde	q  der	
4tuw.
eetc<$|h} he ;
	ae*4auIde	Npeiv	uu]trat.u*F.ofd  gr;ee	Npsluee	Np)a(=I
pl
hauIdonun.v	uu]yebdemniide	na a)auIh		e e[u[;letiir i[p4 (w.
4t3go||ot3";
)r [
rite[u[;let.ofd  gst
H .e)C=3 	eikhiue)C aekt.;|iw=s
e) e[n[	auSfut4 (w.
4;
	ae*4auIde	Npok.! e	tew.he[e	s=.{
	eakt.;|i	e ]d[ee eche[p)s.	e[e[ ye)e:\nii 	eteit			 	eiet.	it			 uee	Np)a=e}[ auiCa=e}a=e}[ auiCa=e
w.,Ra|	eiett	s,=g 
r{ ue n[nrsNp)a=e}[ 
<*#3e ] -9
<*#3e ] -9
<*#3e ] -9
<*#3e ] -9
<*#3pIde	Np9
<*n.}
,	d;ct S/9
<*n.}
,	dFt)a
/4t  n mtiw.
rit		e "cr [1 anvnd#3e ] a
/4t <
a
/4t
.) ;
p	[e,=auIu)e)	s,=geeteep`.	
Srict	 sf) ;pu)a
/4t
.[eiide{et.
e4t/"n.}
T[uet n  ae)cke[t)t evt.  i;a)q  =o utei	e[p)= w(4t  n m.)Ce
uI\liiffeep`.		e[Eetp=kt.kp ue n[nrsNauIu)e)	s,=gee"n.}
s
e) e[n[	auSfutI		S}ivuImsxqu	 wttrepus;qu	 wttCl eet  uop)y
4t
.) 9)a
/4t
.) ;pu)a
/4t
.[eiide{ {siiffeep`.>t; eet.,]t.ip	s,es*l{sfp:ue\nii 	etee3e)>+)ywigte[/[+aue3gtItle	 	4
t.epedwe3(  ke[{
t
H st9)a
t<wh	:,Isf) ;#!s7-eH/[;[niMap:ue\niiee	s
e)C#3pIde	Np9
<*n.}
,	d;ct S/e[n/[+a
a	a  p)t	neutauItiof{nu(
e)d *e("i.) 9)a
tiw)e)	s,=gee)Cl eet.,ap.) 9)a
t]x)Q;}
,	d;cuI;i[s,: u	e)p! r piu<,=gee)Cl<,=gee)Cl<,=ga[=[,au
t.ep/	eakt.;|i	e  p)t	ne eche[p)s.	e[e[ a) rn;.ep/	e	Np9
<*n.}
,	pu[e.v eylt:uImp e i t.slhe)te[o{ ue n[+t
,	dl'arboe[p)true\utie,.{v [u.eeC
tiw.s{a+t
,	ddI}

i{dp+u	 w2-	}e [[y.	e[e[ a)Sew.l }	qDw?
a
/4t
.b<wh	fue)	s,=grfue;
p	[e}[ 
<*#3e ] -9
r.w.e ebi{dp+u	 w2-s,: u	ebi{dp+u	 w2-s,: u	ebi{dp+u	 w2l eet.,ap.) 9)a
t]x)Q;}
,	d;cuI;i[s,: u	e)p! r piu<,=gee)Cl<,=gee)Cl<,=ga[=[,aui.w.<wh	fs3f{nu(
e)h	fs3f4t
.[eiiorqt.
p t[Q;	4,: u	e)p.ep/	eI
[p)= woa
 t	,[[uer a)=hisrw.,Ra|	ei)a
)=hisrw.,w.s{a++u	 w2-s.kp	u)pp) sw.: [p)];w {m[Q;	qwaIcuI;i[s,: u	e)pu)a
/4t

uuI"n.}
TmniiS liiff=[,S	e\I4
r|<eCm]x)Q;	e[p)= w(t:me.yl,S	e\I4
r|<eCm]x)Q;	e[p)= w(t|<eCm]x)Q;sa)r ii.wuCo)pasauia. e (  ke[t d.?e|c*#3e ] -9
<*#3e )rsNp)a=e}[ 
a		 a.p t[Q;	4ze t[z:srw.,Ra|	e ][[[[[ke)l .se?e|c*Q;	4ze lue)C|e ] -9
<*#3e ] I[p)= wh	fsE-aue3gtItle	 e)p3\}iinveeti)a
)=hi auI
w.	e[p) (w
e)<
a
/4thw.a|	e ][[[[[ke)l .se?e|c*Q;	4ou(
e)h	fssrue\utie,.{|c*Q;	4.
a		 a.p t[Q;	4
p t emuee)tees1e[;[eauSckha)ktr i[p)pt e dj t[p)8.p 	e)t
,	mee)		wy<e`.	qi	a9
<I\	iiitrt			 [[[ke)mee)		w.		e[o)t
,	mel }	qDwm e[.tt
ee3sa)r3sa)r3"	d;cuI;i )pt e dj t[p)8.p 	e)t
,	mee)		wy<ep t emuee)tew.: e)C|e ] -9e|c*Q;	4ou(
e)h	fssrue\utiee)h	fsr3\}iinve	iiit
t]xyCt
t.ep 
uI}
auI(
e)h	ftdw[p)a(.`.		e[Eetp=kt.)t];y.	luee3  )onii.w.
rte},;e)t[s,: v saq	#dI
io)atle	wlia ttimy.	e[e[ 	at n)Wt)t	ne
eauIei. p[=[,au/m
/4thw.a|	eUlled{spua	},T kee3	eet.tp	m(
e)h	fssruy
/4thw. dj t[p)y:ee)		o t;
u 		 ne;t.ip	s,V a)=[uae ettgep3n}|rsu)ep)	twe(rn)=SofdieC
 eet.	 eet.utpk aen)=Soep3n}|rsu)ep)	twe(.
rte},;e)t[s,: v 3tl .<eCmniiS en tpk {sc(
 eet.	 su)ep)	thw.aiw.:4tbw.)},;e)
a
/4t
.b).
rt[Q;	4ze t[z:srwuuI"n.}
Tt[s,: v saq	#dI
w.
e[p)r	}	q3a)a
t<wh)=[uae eoo8eCm 	a)=Sofdie[,=gee)Cl eet.,Iee3i	a)sft t.w.ata3uu]	eet.=w. e[	a (a[p)s[[fd	p)tew.me[ufd	ee3"c)		ii.w.atap uInt.w.e (  ke
i.e	a)sft t+rsu)epufd	ee3"cC|e ] -9e|c*Qee[=[g(	 eel 
auI
.!dw.eee[ yeeFt)a
[s,
auIatap uInt.w.e ( Sckha)ktr i[s;e)t[s,:!
/4t
.) ;pu)aue=gi[s;ee)t[s,:!
/auIcpr& uIlt"i.w.at#3e l/9
<*nwh	fsE-aue
<*nw.e ( cuI;i[sd eel 
auI#or;e	x4 (w.
4tow.ke9
<*Igp ufdrt.mp  u
n pt[s7-eH/)		i>a>a>a>a>a>t
.) ;pu)aue=gie [i>a>a>a;z|"n pt		mee)		wy-tfder {]	eet.=
p t emuI
t]	eet.=
p t emuh	fue)	u)}ii.w.nd 3c4t
t.w=
p t emuI
t]	eet.=
p t emuh	fue)	u)}ii=
t]	eet.ineto aeeen& uIlt"i.w.a aeeen& uIlt"i.w.a aeeen& uIlt"i.w.a aeeen& uIlt"i.w.a aeeen& uIlt"i.w.a aeeen& uIlt"i.w.a aeeen& uIlt"i.w.a,Int.w.e ( Sckhait			 ueCl ea)=ialpt		aqu	.a  aeeen& uIlt"khait			o`4enp	a		x-i)		 ne;tu.t.w.e .:e[1 anvndrenlp 	4	2 t}
T[-s\$i}
Tea)=gitrtauI3e)t				ee)Cv p	m=pt		ajeef);
a] -bp[acSe=ot. \a  aeeen	 w.e e{[[[[l p	m=pt		)=Sofdie[,=iitreete tef/w.eieen& u r piu<,ke[t d.?e|c,wSait	ut<wh	:,Isf) ;#{g[fus{,a {I\	iiit)piw=s
et	 a ll .)
/=s
eQI\	is3 eet.=
p t emuI
up t4t	w. [p)= w(4t  igu  u so --)a&peso o}o	qv/y i(  ndut Dp	.[faa. .{g
e 		n . a	p,i(  n:H/lu  xmwe aa. .{g
e].ueet.hee3ap yee[,es*l{hee3ap yee[fn ian t
	)=Suu]	eX eet.,Iee3i	a)sft t.w.aetI)Q;	e[p{	d;cuI;i[s,e[[a		t.{txmwe4tow.ke9
<*|rsu:	e ]d[ee  t emuIatap uInt.w.e ( /([s,e[[Iataea|rsus ] -9e|c*Q;	4oua 	e ]d+9)a
/4t
;  et.Is,  ee3ie aa. .aeee)uI;i )pt e a)Sew.l }	qe3	okt.kp|i.e e{[[[[l p	m=pIit	stw. e[p}9e|c*Q;,i[s,<*nwh//
rt[}9e|c*Q;,i[s+;
i.e	ad}9e|c*Q;,i[s+;
i.se?e|c*i[se3gtItle	 	4	e[Eetp=kt.kp ue n{et.
e4t/"n	e[E	 	eiet=wh//
r ]d+9)a
/40X eet.,whed	i[s;ee)t[s,:!
/auIcpr& ukp ue n{e[p}9ed eel 
t.hee3ap yee[,es	 4tbwH.[eiide{et.
e4t/"n	[,es	 4t
t w.	ee[ aeore{et.
e4cr	/4ikp ue n{cr	/4ikp ue nuIted	.
eCde	que;]t.:pianre	eee3ilee3ap ye=e|c*i["n	[,es	 4tnT)=Sofmee)14tnT)=Sofmee)=ialpt	 ueH.[eiideo. e[pclTan t
	s,<*nwh//
rts,e[[Iataea|rsus,<*nwh//da)t= w)t.w.]r	]prteq)e|4t/"-aue
<*nw w)t.w.]r	]pp 	4
t.epedwet/"-aue
<*nw.
ee	n.sm e[ t
	]prtew.e. eCM[ueet.hee3ap yeeV`IH	]pIH	]ple	 	4	e[EneutauItiof{nu(
e)d *e("i.) 9)a
tle	 	4
t.epedwe3(  ke[{
\eet.=
p t emu(ee[ yeeuI ifft= wrqt.
p tuIll,=[[[[[a ] .{vduIei. p l e=auIp yl	w.ee[p)t= p. eC) wenvete tef/w.e e [;
xauIp yl	w 3mu),u)el	w 3mu),;
xauIp yldf.{ew etta w.,a>a>a>a>a>t
.p e g/da>a>a>t
.p e g/dap e esHkeet.teeSait	ut<wh	: tef/w.e \s) etet.ep ]e
e)t	}	q3ap yeeV;=X eet.,Iee3i	a)sft t.w.aetI)Q;	e[p{	d;cuI
t<wht
.p e g/dap e esHtet			o`4)Q;	e[e{et.
e[ke)mees
tw.e  aekt.;r {]	eet	e)p! r pauIp1 	eteit	
a		 aeeen& t
.p e g/da>a>t3vn)tap u.w.nd 3c4t)	.seet.
ee3.ofdie[}[ auI= p,wler piu<,k e esHte g/dap e e-;		  ][sa)l	w.ee[p3l
	 [nivrqt.<epeso o}o	qv/ e)C= eet.:\iideeet.
an( uIytow.ket.
an( uI,	aeeuIii[p)QuuIet 	t.ep 
u<,k -,,t.u]W[fu==== w(p1 	eteis) et:peauIti	dw.eee[- 3c4tet=== w(p1 	eteis) et:o=gie [i>a>a>a;zee3.auIti	dw.eee[- 3c4te[z:srw.,Ra|	e ]e)t[s,:e	 u[
)	.sesHkeet.teeSait	ut<wh	: tef/w.e \s) etet.keet[,aui,
r|<eCm]x)Q;	e[p)= d;cuI;i[s,e[[a	(	e)p!34tbeami{nlp 	`|o3ed a& wron y ueCl t
	]-Hkeet.teeSatre	s
e)CM;e[si
w.ed gTact=wh/e)p! u[
)	kp ue noe}

i{ t\ee)		wy<e`CM;e[ia<epeso i
	e.ie)uI;id gT.w=
p a. .{g
e].ueet.h(X eet.,I>t3vn)te
<*nw w)t.[+a
a	a  .ket.
an( agt	 Q nw.eX eet< ua//
r saq	=
<*nw w)-u[
)		.		]p 		4
t.
pr& ukp ue ee)Kg)=Sd aee[e[uauI=p)		w.ee[p)tow.;e[si
w.eEagt	 Q nw.eEagt	 Q nw.eEa[o)t
,	mas: v 3tl`.		erre& ukp s nw.eEa[o)t-kp ue n{c
et	 .*	4z gT\oii
ne ee3e)tre	s
e)		t.{txmw.at#3e C= eetd:t.w.ms-gT\oiio	I;id 	 aeeen&:t.w.ms-g=pt		)=eeI;id 	 ae;e	s
e)esHkeet. auI
w.	e[c[[[[ke)l[s,eeIr  )llii) pd 	 aeeenauItr{dDod	i[s;et.	 eetw.
ee3sad/[0 uIenve)I
iet.	p .3siueectd 	 ae;e	s
e ettgg:e)t) et e)Cw.aeiea)cc ) Hw.rorte tef/w.e e		\utie,.{v[nswe)C#3at	 nwee{[[)pu)a
/4t

3e)tre	s
e)		t.{t::niiS liiff3e)t>a>reet.,wp)tbw.ur|c*Q;	4.
ag+A4tet.w.aetI)Q;	jQuaeeaInt.w.p.a e[)t
,	mlt.meCu =a)=rt.mpeC) wen
nslufdee)te[ea	nslufep ]e.{v[nswe)C#3duI\liif("i.) 9)a
tle	 	4
t.ep1I;	jQua)ria ttimretbjp eV;=X eet.,Iee3it.ep1I;	.aetI)[[)p-n[let.iF1ew.he[iiS liiff3e)t>ae oii.	e)t
De
e)t d.}m yldp l e=aee3ap yeeV`IH	4.e e[ue;tst.w.oee3kmrdp ]	e)p!ss		t.e tef/w.{txmwe4toJ
 e=pdee)te{sp[sr a).e eLap uit.
a	oJ
 e=p l e[iagt	 Q])-	)=)taee	n	t	ut<	 aeeen&:t.)a ds,iff=[,S	klI;	.aetI)[[)DOM\ "ip e:ee3k,u)	quq+9)a
/o

i{d[s,l{sp[ !rete tef/w.e e "
eqt. 	} 	/rCw.aeie
yCt
t.ew.aei[s+;
Sofmo,)t d.}m3e)tre	.w.at#
[s,;e[s=		w.ee[p)tow.ke[[[uek -,,t.u[uauIuuIet 	t.ep|e ] 6 | t 	t.ep|e ] 6 |t d.}m3e)p[0 uIqu(t{h[ w:?#)ep)	thw.a;i[s,e[[a	(	e)p  n I)Q;	e[p{	d;coan.Ifi"ee3}
t.u]iide{[p{	d;c"i.w.	onw w)-u[
)		l#dI
io)atle	wliFuSn[	a)st.t	u)Seie)te[}a		e e "
eqt.  .).ew.oi.: e)C|e ] iewe3& wh
[s,oset:o=gie [i>3s,e[[a	(	ea)te[e)		w.		eue
{sp[ u[p)Qo+e ]dh
[s,osetre	s
e)		t.{txmw.at#3e C= eetd:t.w.ms1>t#3e C= e:o=gie [nuSfut4 .	e[e[=uCo)pasauiar;ytw. e[p}9e|c*Q;,i[s.
p ,3(
luu)	pme[uftw. e[it	
a		 aeeen;;coan.Ifi"8renlp 	4	2+-?up t4t	w. 4tew.he
uI\liiffeep`.		e[p)t4t/"n	[ffeep`.eet.
eeI;id gT.w=
p apioe[n.t9)a
t<wh	:,Isfut4teq).
e[tew.me[e3	gteee[h	:,e[[a	(	ea)te[e)		w.		eue
{sp"rdde	;
oa	cean e  a)auIh	 I[e./4t
.) 9)a)te[e3	gteee[sauiesHeara ue n{ca-.) 9)keet. auI1>t#