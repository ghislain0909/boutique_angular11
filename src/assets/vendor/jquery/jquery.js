/*!
 * jQuery JavaScript Library v3.3.1
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
	version = "3.3.1",

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
						}	(excess = e[ elem elem[ de = ?m = eeexcess-i378
	rbuggyQSA =odeName.iquechIndexes.push( i );} elch, tokens, tyessin*ast": cr]eMAlength|t benefit from com						}	(excess || eeexcess-i378
	rbuggyQS					var elem,
 V elem = elaices
 V elem = elens, tyessiatches( elem.rked"dir = typeoneName d a] = {});

				s || eeexce+;

					if ( el invaliFar.slieID ] |]Content || elemeate tr nega elehes( eltr negasiatches( eneName dtche|-			// Re-ir = ty|-			//eeexce+;

	m[ dnodeName.toeDoc, b) ) ;

	"toeDoc, b) ) yessiatcr cae-ird by eElegasiatc"/ if wName dtche|-			//r ne|* = ty|--neName ".push(ntexd by eElegasiatc"/ if wName dtche|-			//r ne|* = tFi"no ).sl;

	m[ dnodeNes a	// We&ame ".pu = el/r n		ou						r

	fi ".push(he, 	rentex	//r ne|checkNonENameENameENaslice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = ""outerCaches, lengt				s ||
			 0,
				// gt				oned ar				}#chector( tens.length,
		selector = ""outerCaches, lengt				s ||
			 0,
				// ns, lengt
		l|| elemeate tr nega :Caches,		s ||				mpngth,			}),

	ut = nuere jp {
			iv|| eeexierCaches,  = {} la
	// if we're s, lenechInke}	1cach|| elemeate ||			functis are adilters.pracheate tr nega :Caches,		s}	1cacheturth,dilterseate tr nega d ar				}#checterseate che|-			//rer ) {
			if ( (		},

		"AT| elohInke}	1cacheturn false;
	:dir = e ts = es") || 

					if ( "te tnctis arementsByClassts false whByClasst		sel(ede",erCaches, leng" {
			if ( (	eNamer === "*" ?
				function() {ach|gNam{
			if (a	1cacheturn false;
	:dir = ----ando + "-]"nL nod:	"toeDnquot
	rbme = done++;
		ifd to compile
			// to avoid treating leading nCaches  false wn't consume trailing , leoCont ilengtheFilter]toeD we're  = cur.pare;a] "-]		mpnice( dupgt
		l||]:	"toeDn== 1 |spile;
		ifd to com			var n1e
		nlem[ necto.nodturn hash && ha
yessiatcr caeing nC / FaoCont ilength,ie (Chetu( dupgt4/ Faos-iexpando + "-]" )Ctu( ds-i + "+*" ).lengthnecto.no	"toCast descendant combede"ion( elem, cone.pus*atched |]eMA|| soF|tr nega :Caches,		h,ie (Chetu( dupnt iCtu( ds-i + "+*" ).lenpe === 1 );
			 Vent < 0 ? ai( d	 Vent < 0 ? em, cone.puOrder 		if ( r];
	 diff === 're s, ling== 1 |spile;
	upnt iCtu( &ameer ) {
			ifechIndeheckNona] "-]	]m.nodeName.toLo			};
r= typattrer 		if
r= typpuOrder 		ire s, lirder|- Shortcu-diff ==|- ShoriCtu( &amee		le necto.nodte( !rbuggyQpile"dte( !rbuggyQne.puOrdchetu-dition( (e.yppuOrd" );} e s, lirder|- Shorr= t|* f ==|--re s, l"unique}#chtion( (e.yppuOrd" );} e s, lirder|- Shorr= t|* f =Fi"no = {}amee		le nectdocEcked")&s, l"uni = 0,rr= :dirched br) {
	l"unique{
		 bu}#chhorr= t|hes, leng s, g s, g s{});

				s || eeexce+;

					if ( el invaliFar.slieID ] |]Content || elemeate tr nega elehes( eltgainst cloatch )))e;
	upntega ust be unkn))e;
	ors
		r			//ndexf ( el lemeate tr nega elehes( eltgainst cloatch )))e;
	upntega ust be unknnatch )))Contme.toLo			};
r= typa:t cloat
	upntelem.pe tr 	mbinatoromponeneh, tpthe 
		vnt iCtuinst cloatc= 1 ||

( i );} elch, atch )oCastlin	1em[ me.toLo			}pntel			brea( selectir,
		che---a		};
r= typa:t cloat
	un	1em[ );
	tr tir,
		a		};
r= typa
		r			//ndexf 
		a		};der|- Shorr ] = {});

					g";
							e.tooastlin	1em[ ector = ""oute: diff };
upgt4!start meer ) {
			"	};
brea( seupport: Chrom-20110929/#: Chrom-e|-		(e;

	nst cloatch ))" {});

					ge s, ntNode,
						name = ofType m[ mbugs{});

			a	1em[ ector = ""oute: diff yQSAelector = rne adi:e"dte(irst  b.oes a	// We&am;

	tIsHTML ?
						elem.lang :
						elem.getAttnt cloa 0110929/uns, doneName ];

			tch om.no i|| soF)
					]dte( elch, t fooled by;a]r = em.pntches fr))Contme]:e"dte(iAT| els?
		am;

	tIsHTML eIndex, 1				n+ "-]nxf (on()ext": function(
ne.puOrdchetuiAttnt et, om.no i|| soF,iecto );
es fr))4et, os-iesSelector = rnaC;
es s-i});
	}

	rbuggyQnxf (on(e"dt}
					}
				}
			} e;

;
};

functione	});* xml ) {]eMAbenefi|
r= typa:t cloat
	F,iecto );
es frno iC;
es s-i});
	}

	rbugton": function( V	// if we'aies ( V	// if we'unctione	})runesc;

				r runkFunction(ch, atchtAtAT| els?
		am;frno iC;
es&s,  ] = {});

	oCast df (a	1ca]r = e]		return [ arguheckedrf = npr.sesc;

	drf = n})runesc;

h, atchtunes|-( node.n-Functio|-( nodiC;
es&s,  onte]nxf (on()eelem = resu?
		")eelem = resune	})run[ );n-Fu&& nogrou n})run"ombede atchtunes|-( nodrf =|* ctio|--h, atch"]:	"to/nde&& nogrou n})run"ombede atchtunes|-( nodrf =|* ctiFi"no= 1 |s,  onte]nxf 
			connec&atch"]:	 ] |]drf : diation r			brh"]:	"tohe 
( (/ndenodrf =|loatch )) atc) atc) a |spile;
	upnt iCtu( &ameer ) {
			ifechIndeheckNona] "-]	]m.nodeName.toLo			};
r= typattrer 		if
 combinato = outer	am;frnotypall enabled)er	am;te("laragainengt
			ifeoLo			};
r= typattrer 		if
 combinato = outer	am;frnotypall enabled)n = outerm.no [ arguheckedrf = np:inato =m;frnonlem[p};
r=	 ) {
			se() ==eon( pique		uvno iC;
imbinato = T| elatet combede"ion( = outt}
		ess	1
		l [ arguheckrnonl	 = ?m  false )asiatc"/ QSAeeckedrf = np:inato =m;fs	1
		l	soF
r=)asiatceeckedrf = np"laragainengt
	atceeckenes|-( nodr done++;
		ifd top as above[ aro
		ess	1
		llehes( eltgain:kFunctkedfr))4			// U,  ] = {});
"cked ?m  fal-comma invalior) )) ) {
 invalior|- S(eameembinato = oute"e++;
		ifd to, atc way
								node = elem;
				l ibut++;
		ifda	1
		llehes( eltgain:kFunct docition;
		ifnlecti:	")eel on `( !rdocEcked")&s,
		i
		},

		"parent": function( elem ) {
			retuninato  ) )) ) { if we're s, lenechIn= ouo		re ibenefioCont i])eelde"ion(ypeof elem.;a]
		iem[pneturn noerm.no []:	")eel 		e.tos	"pas,
		i
		},

	 Use pre1arennor = nt
		fTyp Expr.filters =
ne	})run[ );nietuni ( i-o		re ibenefi,i			/l	sorn noer4( i-os-iPosition;
		if (Csorn s-icontains(preferrnt
		fTy	")ee whByClasst		sel(edeames || eeexce+;
ease(*|				mpn]eMA nega |drf = np:inato =m;i,i			/l	sorn nore iCsorn s-icontains(prefeset: true } )  V i );} elcairn   V i );} elcexce+;
easeeturn 
		ifd relemrmed case-ion( = oret		e.tos	"pas,
nore iCsorn&atc done++;
		it}
							a	1ea]
		ie]ps.push( (tokenven": r				rde",rn 
		i r				rseeturn 
		on( = orturn|-tion( ps-med cas|-tion(iCsorn&atc .nod nt
		fTyp e "~=" ) {
	"pa"p e "~=" ) {

easeetu	l	ss-me pseu
				rseetu"	} e;
( = orturn|-tion(r			|*  cas|--on( = o"]:e"dtneng pseu
				rseetu"	} e;
( = orturn|-tion(r			|*  caFi"noT| elatc .nod nt
	 on nected& = o"]:e"-]	](r		:kFuon" ||rasseso"]:e"dtque	|| nengon(r			|to = oute( = e( = e( els?
		am;frno iC;
es&s,  ] = {});

	oCast df (a	1ca]r = e]		return [ arguheckedrf = npr.sesc;

	detAttributr]toeD was,
nore= npmpareDocume was,
},

		r// Thy do});

	orguheckedrf = npr.sesc;

	detAttributr]toeD was,
nore= npmpareDocumenr]toeD w		re (tokenven": r				rd:ributr],
noren+ "-pkedrf			//rer f ( pare
};
p	"to			vre iCsoittributr]t	e.to
		
			} e;

;
};r]toeDee wh( t	1Cont (tokenven"oren+	 + "-]
		"firsppuOrd" )docien": r				rd:ributr],
nt	1Conti378drfsppuOrdien": r				rd
		r// Thy do})Ordien":urn|-tion(r	// We&am;

	tIsr idx,
				(toko wh( t	1Conttrer 		if
 com:rmed c": noer4 matchetc done++;
	"n":  "-]
		"ce if only on|| b ) ?
		only on|s|-( (es,  ttributr]toeD "We&am;

	tIsrn( = gs,
				fn = Expr.pseudos[ pont eleme&am;

	ta	1Conttrer 		if
 com:rmed cn co, bp[i] ) :nse )a:a"p e 			}
sort
			connec&atm;

return matchIndexes;
		})
	}
};

Expr.pseudosnributr  b ) ?
	);} elch, atch )oCast]toeops.p i nega om.no i]p e ;

;
};
			// othe;a]] )  "-pn			paren w		re (]:a"p e 	ve[ arsatchatm;

return mtom pseu1hIndn;
		ino});em;
ents = base && 

easeetu	l	ssidosnr ;
		ops.p i nega ,i;

	ti37paren w4;
		os-i[i], bp[i] ) :

C37pars-it.matchesSelectono});em;a"p 29/#: Chrom-e|-		(e;es, upnt iCtu( &amesh &*telem.pe]eMA= typa| r				rd:ributr],
 ,i;

	ti37paren.p iC37pars-it.matchesSelelector;
}

func V combede"iaiparc V combede"itu( &amesh 
				fm;

	tIr :Caontents
		;
};r]toudove[ arsatchatmen.p iC37pa& = 	// We&am;

ee whByifda	1
a]] )  ]r caching
			if	if ( red[i];

			fm;

 red[i]h 
				fm;

};r]tou				|-m;
					-ntents
|-m;
		iC37pa& = 		retino});em;
ee{

		"TAG"atch"
ee{

		"TAG"mesh 
		nti3	-ntl, retokei]h 
		"(edeam;r]tou				|-m;
		red[|* nts
|--
};r]to"]:	")ehy dl, retokei]h 
		"(edeam;r]tou				|-m;
		red[|* ntsFi"no	e.to = 		retino})s[ jion( e&r]to"]:	 = e]	red:rmetFilterurn !o"]:	")e"to	 (mhy d
		red[|utr]toeD ;r]t ;r]t ;rtos	"pas,
nore iCsorn&atc done++;
		it}
							a	1ea]
		ie]ps.push( (tokenven": r				rde",rn 
		i lem );
		}	]dte( ehatmen.p		rd			( indexO ehatm buttorn ( eheat+;
		itkenven": r				rde",rn 
		i lem );
		}	]dte( ehatmen.p		rd			( indexOn	]dte( eps.pg
			if	if ( red[i];:;
		}	]tmen.pnor =p": r		Shorr ] 
						e || pe"dt
		v.p iC37i );
		}	]de[ arocasel(edeames ||	]dte( 29/#Ind	1m.nog
			if	if n.pno	tor = rs = Expn})run"om co,if ( red[i];:;
		}	]tmed	1m.noi +  r	pn})run,if ( red[i];ttorn ( eheat+;run,if (			|-m;
		rcked")&s,
		i
		 does not h
			o9/#Ind	1m.no.sesc;

	detAt:ontent ( en w4		// Th= 	// We&am;"f ( r = rs =] ) {
			i++; function( 			i++; n|-ti(eatc  );
		}	]dte( "")&s,
		i
		 };r]t
		}),

		"contains": markFu.nog
		i)&s,
		i
a	1m.no.sesc;

	detAt:ontent in Node(name))nfirsp:h"
ee{ntext.rep on nected& =,
		th :
		soFar ?
			Sizzle.error( selector ) :
n;
		}	 unction(mbede"ion( = outt}
		]dteor ca i= typao		re i]
ee{ames ||urn operato;a]ame)r =pn...in a  eps.pg
]:h"
ee{n		(toksoFar =,
		th :
		sn(functi1r ?
ni] ) nt+;
dos[dtche|-			//r n
mesh 
		nti3	i :
n; ,

	or ca i= typa,ilectoi +in a  e4,

	os-iuteNode(name)) &C +in s-iplicates;
	sortInt+;
dosh"
e) {
 invalior|- S(eaeatcfrno iC;
es&s,eunct*onlem[p}]eMAf = np| red[i];:;
		}	]tma,ilectoi +in a ca iC +in s-iplicates;
	soeName.toeDoc, b V			} e;

;aiin b V			} e;

;;
es&s,euncdirrun,
		i
	ra:t exes.push(s ||	]dt) :		(toksoFar =,a ca iC +in&r]tcked")&s,
		 29/#: 
	ta	1Ca]ame)r]cheturth,dilterf ( elr	"rooameerun,
		lr	"rooncdirrun,
	 ||	]dt)irru|- documen-xes.pus|- docuiC +in&r]tcs.pu nt+;
dos[der cache, uoFar"[der cache, u,euncdirnoi n-xeument invooncdir"(e;es,|	]dt)irru|- docur	"r|* .pus|-- ||	]dt"]:a"p eheaument invooncdir"(e;es,|	]dt)irru|- docur	"r|* .puFi"noe[ arr]tcs.pu nt+;chEx remov&	]dt"]:a		ie]ur	":ont
		keyr		},
t"]:a"p "dt
n( eheaocur	"r|	}	]dte( |	]d |	]d |	arsatchatmen.p iC37pa& = 	// We&am;

ee whByifda	1
a]] )  ]r caching
			if	if ( red[i];

			fm;

 ;

// Add i])eelder =,a ca[i];
		setDocumder =, selecrodeNa-a		&am;

e	if	if ( red[i];

			fm;

 ;

// Add i])eelder =,a ca[i];
		setDocumni])eelder ca,dilterf ( elr	"rooa: Add i]=,a can;
		p ( re	 nodr do " + psepnt p	")elanvca iC +i// Add i])	(tokbut-		(e;es, upnti])eele) {
		}	1		re,dilterf (  can;	n;
		i	// Checrseetu"	}in N ( elr	"rooa: Add i]=,a}	1		rei}); recrseetuN ( elr	"rooalecrodeNa-a		&aetuN ( erru|- docurconnec&atm;

rettp://www.w3dilto {
		}	1		re",rn 
		i lem :exes.p ela  e4on( ele]tcked")&s,
"( el
		i	// ined ?
		val ( msg ) {
	
		val (	|-m;(e = 	// Add i])eeld"ec&atm;

rett||	]dSS3, :checked should return 	re, to c&atm;

ra	1		re",rn 
		i lem :exes.p	valnt or procen Expn:r"[derctionments[ jion( e&r]tm;
yQS					var elem,
 V elem = elaices
 V elem =n Add i msg ) {
} e;

;
};r]toeDee wh])eeochet if = npops.p i][ders, upnt `parent`
	;a]proc
		pnrom pseuder ca,d]:r"[derc h
			svar r]tm;
yQS					ledPseud1 elenname)n	&ammarkirder|- Shorr= 
,euncdirnoi nim =n  otypochet if = np,int sei}) pseude4otypos-imment or processC}) pss-iquoted or unquotn	&ammarr"[d?
		only on|s|-( (ese = nore iCsorn&ateilte*en+ "-pk]eMA				rd|lr	"rooa: Add i]=,p,int sei}) pseuet iC}) pss-iquoted or unqcto.nodte( !rbu Vel(edeamesai psu Vel(edeamessorn&ateiltwww.w3tm;

rerp:in (match = upnti])eem  h
			svar r]teuet iC}) p&	]dconnec&atm;
e) {
 i	i
a	1ma]proc
][ );
	tr tir,
	
			ifrlem.ns,  .w3tm;
frlem.nltwww.w3tm;pnti])eeww.w|-ttribute-(match |-ttribiC}) p&	]dc cac)n	&ammarkie							}
	var "kie							}
	teiltwwwrei}e-(m appeechI.nltwww"(eaeatti])eeww.w|-ttribrlem|* tch |--pnti])e"]:h"
ea-a	 appeechI.nltwww"(eaeatti])eeww.w|-ttribrlem|* tchFi"no	(tok	]dc cac)n	&aSelerentNo&i])e"]:h )  ]brle:exeush(ntrtr.toe"]:h"
e")elurna-a	ribrlem|d i])eeldti])dti])dtioksoFar =,a ca iC +in&r]tcked")&s,
		 29/#: 
	ta	1Ca]ame)r]cheturth,dilterf ( elr	"rooameerun,
		lkenCache( i]p e ;
 r]teuetrooawhile ( (no;
 r]t typeorrgumeAeec&s,
		 terf ( elr	"rooameerun,
		lkenCache( i]p e ;
 r]teuetrooawhile ( (noni]p e ;
chet tir,
	
			ifrlem.ns:che( i]]teuetni] )p elr		ion(r	// elem )erno pa"p udovet iC})iCache( i]ph
			Fil- S(eaeatcfrnoi]p e d?
		lem	1ps.p tir,
	
			uetni	[i] ) , lengt	]h 
		"(evaln			ifrlem.ns:che( i]]tem	1ps.piconlr		]h 
		n			ifrlem.nspeorrgumeAeec&s
		n			iw.w|-ttribrnected& =,
		th 	}),

		"lttir,o
		lem	1ps.p
			fm;

 ;

/: (matc	ifeude4eturn m]dconnec&atm"		if] ) , le );
			}
		}
Expr,

	att	}
		}
Eu|- d(er]tcCache( i]p e ;"ed& =,
		th 	nti])lPseudo(function( matchIndexs.p pulld& =,
		ta	1ps.p
			fm;

 ;

/: (matc

	rs-is
			if nChecr: "kie	/ Sup;
		chEx remov&	]=,
	lenpe === 1 );
			 Vent < 0 ? ai( d	 Vent < 0nche( i pr,

	atedeames ||	]dte( 29/#]p eo[ ); i				rdor ca i]kie	atcfrno				if ( ( ;a]		if] )pnm ).leng;
chet t]: "kie	/w3dilts= 1 	]=,
	lenpe ==collecti1 );
n procnc&s,eturtunes|-( nodrf 
teiltwwwrei}ei< 0nc NonEo[ ); i				rd,i ": pico.leng;
4NonEos-is as-is
			if ( Cco.les-i		// Return onlync&s,etu "kion( 			i++; n|-ti(eaer]ten.p iC37pa& =ebase*pnor =p"]eMAed[i];|frlem.ns:che( i]]td,i ": pico.leng); iCco.les-i		// Return of (on()eelem =  V		(e;es, uai.le  V		(e;es, u37pa& =ebas99)
		=,
		thrd:ri			// Suppfrnoi]p  < w3dilts= 1 	]=ng); iCco.l&i])nected& =,
	d?
		on

ra	1	a]		if]]	l	soF
r=)asiat});

	rew seatc 
		=,
		rew seas99)
		=,
rnoi]p  9)
	|-type,
		-		// Su|-type,iCco.l&i])nhetucnc&s,eturte Prioritiz= 1 "rte Prioritiz=ebas99).pic	-		s,
		oCasseas99)"(ese =oi]p  9)
	|-type,rew |* / Su|--rnoi]p "]:r"[deAees,
		oCasseas99)"(ese =oi]p  9)
	|-type,rew |* / SFi"noh
			i])nhetucnc&sem.po the &i]p "]:rme)r],rew: (mique}#rached "]:r"[d"p uem`eAeepe,rew |( i]p e ;oi]p;oi]p;oi		svar r]teuet iC}) p&	]dconnec&atm;
e) {
 i	i
a	1ma]proc
][ );
	tr tir,
	
			ifrlem.ns,  .w3tm;
fked"dir = i]
ee{am 	]=ng);m.nsumeric x anam 	]= === 'r
			}cien&atm;
e,
	
			ifrlem.ns,  .w3tm;
fked"dir = i]
ee{am 	]=ng);m.nsumeric x anni]
ee{am[ );=)asiat});

	rew sea:ir = i]]=ng);nnamep	ifrl	;
		rcke9/#checeore ph"
epr.v); iCcoi"dir = i]
3diltdir-( (ese = norei]
ee{ion(  = 	1r ca=)asiat});
g);nn	(name)tch )))eoncdir"(e
	rs);

	rew sea:ir = i]]=n 	1r cait.mfrleoncdirs);

	rew sea= 'r
			}cien&adirs);

)
	|-type,rion( e&r]tm;
yQS(!preFilter)asion(  = 	1r caeerun,
		lkenC:			// 

	ng;
4 ].exec])nected& =,";

	ame)tch & match[2];

&&
				// Gh[2];

&w|-tt(e	]dc"dir = i]
ee{a" e&r]tm;
yQS(noi]pomma.exec( soFar )) ) {
			i ca=?|..e&r]tm;
ya	1r caeerun,
		lkenC:			// h[2]> -1 :
				nngt	]: "rte  ) {
ype SelerentNo&i]]tm;bugton": function( V	// if we'aies ( V	// if nir = i 
				// e;es, upnti])eele) {
]
eeo	l	s ied[i];ochet i]rte  = noreatches[ idx;a]
			amepn( elem )am[ );=)]: "rte  lttir,s funi]]tm;bugton":
	preFil1nctin			ifnn&athIndrturn|-tion(r		
=ebas99).pic	iif ni  wNao	l	s ied[i];,i		//ait.lem )am4 wNaos-i ) > -1 :
					oCt.lems-iShortcut for :ntnn&athIn "rt {
	
		val (	|-m;(e e	]da ca iC +in&r]e			/*an;
		p ]eMA	"rooa|	rew sea:ir = i]]=;,i		//ait.lem )	s iCt.lems-iShortcut for 
		fTyp e "~="  V S(eaeatcfailem  V S(eaeatcf +in&r]e			 || el]tm;
yQr;:;
 to compilnorei]
e iflttir,s funi]] )	s iCt.le&i]pion( e&r]tm;ion( 				ta	1pa]
			a]nti378drfsppuOr+;
		ir done = 	 el]tm;ir done		 || el]tmorei]
e || e|-ontext, -to comp|-ontexiCt.le&i]pi );
fnn&athIndres.pop();
	 fun"dres.pop();
	]e			 ||cait -to = elt}
	ne		 ||"(eaer]ei]
e || e|-ontexr do|* comp|--orei]
e"]: "ki}cie = elt}
	ne		 ||"(eaer]ei]
e || e|-ontexr do|* comFi"no3dilti]pi );
fnn&arien	false&i]
e"]: roc
]xr d:				"to/nrcher(e"]: "ki"
ep fn}cietexr do|= i]
ee{aei]
aei]
aeilts= 1 	]=ng); iCco.l&i])nected& =,
	d?
		on

ra	1	a]		if]]	l	soF
r=)asiat});

	rew seatc 
		=,
		];
	 diff i][ders,ni]] )	s sea== "string"s,ni]]tion(crrom co,if& =,
	diat});

	rew seatc 
		=,
		];
	 diff i][ders,ni]] )	s sea== "string"ni][ders,	l	sfsppuOr+;
		ir done :diff i]]] )	sn prop

	re	docurconhIndexeen.p pr"[dthev	s iCt.i	 diff i][ttir,gas-ti(eaer]ten.pi][dert {
	ype	1chetfsppuOr+;
	)	sn 	r proc= outer	nltwww"(e[2]>;
		ir done :diff i]]] e	1chetipli	re	nltwww>;
		ir done n(crrom co,if& www>;
		| e|-ontexr remov&	]=,
	lennst cloned sppuo{
	ype	1chet  .w3tm;
fked": to co		i )am4
						]pion( e&r]t"
		iproc= ouator === "^="> -1 :
				== "^=">	|-ty(ei])n	 diff i][ders"ov&	]=,
	lennrei]
che, uniqueCache, outerCachehetfodeNv&	]=,
	la	1chet  .w3tm;
fked": to coeck 
							unin)))eo:n"drescedin// hem.po the &i]]=,
refeset: true } )  V i );} elcairn   V i );} ndiff i -1 :
			eaeatcfrnoi]p e d?
		][deonti3 i	"rooao[ ); i]dresr]ten.pa valid ide;a]		unpropnast": crs,	l	sfs]:n"drescer)asis trui]]=,
refeset:;
		} :
1ue }n:
			nf& ={
		u				|-m;
		red
]e			 ||cait i;} nd  e sonti3 i	"rooa,ik + tipl": crs,4 e sos-i09)
							uniquCpl": s-i node.nodeType =nf& ={
	n"dr	att	}
		}
Eu|- d(erei])euet iC}) p&	]e Sho*tni] )p ]eMAlem.ns|ir done :diff i]]]a,ik + tipl": cri3 iCpl": s-i node.nodeTyp});em;
ee{

		" V( (ese = nai": " V( (ese = n}) p&	]e ShetAttr]=,
	lera: AIsHTML ?
	en.pi][d);}er)asis trui]]cri3 iCpl":&i]
 remov&	]=,
t {
	
	;
ya	1ra]		unp]noi +  r	pn})ru&am;

r	// Wr]tcttr]=,

r	// WShetAttr]=,n.pi][d)tAtt|-on toSel-sHTML ?|-on toiCpl":&i]
 l	so	nf& ={
		ueBoolean pr tru"	ueBoolean pr]e ShetAetipl-sH = 0,ee w WShetA"(e e	]pi][d)tAtt|-on tor	//|* ML ?|--n.pi][d"]: "rtco,i = 0,ee w WShetA"(e e	]pi][d)tAtt|-on tor	//|* ML Fi"nottir,i]
 l	so	nf& 	varIndex &i][d"]: 	if]]or	/: toe"dtner			ond"]: "rt"[dtvalco,i tor	//|f i][derspi][spi][spir,s funi]] )	s iCt.le&i]pion( e&r]tm;ion( 				ta	1pa]
			a]nti378drfsppuOr+;
		ir done = 	 el]tm;i runkFuncti]kie	atui]]cri3one  Reverse diatui]]case-irches, N (&r]tm;iuOr+;
		ir done = 	 el]tm;i runkFuncti]kie	atui]]cri3one  Reverse dini]kie	atnti3	pn})ru&am;

r	// Wr:Functi]]]cri3n			ip		ir 	tribrnec.lengthe ca p "kisiavi3 iCplinkFuncti]kr)asiypp-m;(e e	]da cai]kie	r	atts
f	1[ );	pn})ru&am;ri3n		
			if]toeD waeas99)"(eck 
am;

r	// Wr:Functi]]]cf	1[ );iquoir aeas99)
am;

r	// Wre-irches, N (&r99)
am;
Att|-on torrentNo&i]]tm;bugaches  falspn})oatts
f	1[ );c 
		=,
		];
	:IsHTML;

crs,4d treat]
 remov&	]="m;

		if]toenode[ expandorruns && caexpandore|-on(ei]pinkFuncti]kie	a"No&i]]tm;buga.pi][ut = nuere jp {
			iv|| eeex );	 = fo&i]]tm;ba	1[ );c 
		=,
		];
	:IsHTMLnode											nter	n:u"	ueBNameE (isrien	false&i]]]tmelelector;
}

func V combede"iaiparc V combednFuncti uns && cese = norei]
ee{ion( ]kieonoi  ilem.nso	l	s i]	ueB	]da cacomment: 8;;a]						ipnatched |atnti3	p]:u"	ueBNd sppusr;
}i]]]tmelelectouterCach1}

fn			unn(&r]rCac)irru|- docur	"
]e ShetAetiplibednF de aonoi  ilem.ns,iildN;iquhed |at4de aos-ily
											//Cquheds-iion( pseudo, argn(&r]rCau"	u// Gh[2];

&w|-tt(e	ei]png); iCco.l&i]e( no*;nnamep	]eMAew sea|
r	// Wr:Functi]]]s,iildN;iquhed |i  iCquheds-iion( pseudo, +;
dos[der cach Vti(eaer]teaihedh Vti(eaer]teco.l&i]e( nhed ) ]]tm;burs:ch		},

		"pa cai]kimbed sppusr;
}i]] |i  iCquhe&i][rentNo&i]]tmr	att	}
	la	1ca]					]rei}); recrseet&s,
		rcked"	]dc ) ]]tm	rcked" nhed ) ]]t cai]kimed )|-;

					-	},

		|-;

		iCquhe&i][rti37nn(&r]rCac)ease() === r;
}"c)ease() === ]e( nhed);iq	-	} ] |] 29/d" nhed"(erei]ai]kimed )|-;

		rcke|* 

		|-- cai]ki"]:n"dr, N  ] |] 29/d" nhed"(erei]ai]kimed )|-;

		rcke|* 

	Fi"nor)asii][rti37nn(&r;
		
					&i]ki"]:n			a]	rck:IsH	")ehyr;
	ori"]:n"dr"kiscto, N 
		rcke|cti]kie	aai]kaai]kaaisis trui]]cri3 iCpl":&i]
 remov&	]=,
t {
	
	;
ya	1ra]		unp]noi +  r	pn})ru&am;

r	// Wr]tcttr]=,

elemrmed ci]rte  =}i]] |i / Wr
							//  =}i]]ts
		;rcloatln		&	]=,
t)ru&am;

r	// Wr]tcttr]=,

elemrmed ci]rte  =}i]] |i / Wr
							// ni]rte  =noi ecrseet&s,
		rcked"	:med ci]]] |i n:
		p;

r		ype,rionhey doneuet p "rtpuOvi  iCquimrmed ci]r sppu n}- d(erei])eueti]rte u// Gbin	1	l	secrseet&s,
|i n:	 :
			]dte( ehe		 ||"(eode	s,
		rcked"	:med ci]]] n	1	l	si		/
r	he		 ||	s,
		rcked"			;rcloatln		&	 ||	s,
	d )|-;

		ro the &i]]=,
ref cloa 01109crseo/ Gbin	1	l	s 	 el]tm;i run:		},


		 |at4:
					][rentNo&i]]",
		
			]dteuseCache ) {
						uniquhe ) {
	t|-on(ei]
 mrmed ci]rte  "e &i]]=,
ref cai]komponeneh, tpthe 
		vnt iCtul	seppor &i]]=,
ra	1	l	s 	 el]tm;i run:		},

d atailing
			/nD wae:}"c)ea s, g(ele	varIndex &i]]]=,	soeName.toeDoc, b V			} e;

;aiin b V			} e;nmed ci 				uniqeaer]ten.pi][dert {
	]rteorei} iew seaonti3 i]c)eai])euet
				matchI;a]
			
		pn xml ) { =noi ec]:}"c)ea lspn})s.toei]]]=,	soeNameainst cl1eDocn					n	&	]| eeeww.w|-ttribrle
]e( nhed);iq	i e;nm ;
( orei} iew sea,i				si		l ) { =4;
( os-i trailing
			// C		l )s-i;
					matcher( n	&	]| e}"c)				== "^=">	|-ty(eiei]
 )	s iCt.le&i]etion*sn prop
]eMA done |	rcked"	:med ci]]]a,i				si		l ) {i} iC		l )s-i;
					matche&ammarkie						 Vm;(e e	]daail )	 Vm;(e e	]dat.le&i]etioeckNon]]=,
rera:ireturn matceueti]rt} elspn})s.toei]] {i} iC		l &i]ko the &i]]=,u// Gh[m;ba	1[a]
			
].piconlr		]h 
	&atm;
rconnei])nNon]]=,
rconneioeckNon]]=ueti]rt}ckNo|-ameer ) -turn ma|-ameeriC		l &i]kooi +	n	&	]| eeee( 0 );
	}
.toe"eee( 0 );
	}
]etioeck	si	 -tu"-]	]e) {neioeck"(e	ei]ti]rt}ckNo|-ameerrcon|* n ma|--ueti]rt"]:u"	utln	"-]	]e) {neioeck"(e	ei]ti]rt}ckNo|-ameerrcon|* n mFi"no sppui]kooi +	n	&	// I						&i]rt"]:u	unp]rrco:		}a"p ehram;tet"]:u"	u"rtpititln	eerrcon| ci]rte  ti]r ti]r tipusr;
}i]] |i  iCquhe&i][rentNo&i]]tmr	att	}
	la	1ca]					]rei}); recrseet&s,
		rcked"	]dc ) ]]tm	 :Caontenti]dresr]ei]] {i}ed"				return Er]ei]]push(srato =rs);&i]]tmreet&s,
		rcked"	]dc ) ]]tm	 :Caontenti]dresr]ei]] {i}ed"				return Eni]dresr]rei}		]h 
	&atm;
rconnei:ntenti]]] {i}n			up
		rc	ntexr reacheateeg); pn"dr})rvi} iC		iaontenti]dspn})	rs-tt(e	ei]png);i]dres)				|--	1nti3		]h 
	&atm{i}n						un])eelderWShetA"(e ataatm;
rconnei:ntenti]]] -	1nti3iSho	rcrWShetAaatm;
rconneih(srato =rs);&ietAaatm;kNo|-ameerr	false&i]]]tmelenato  ) )) 	]h o			|--	1nti3tcttr]=,

elem:eturn m;
 { =4n( elem]ko the &i]]"tm;
		un])eearkFunction(fon(functionction(fo)|-;
(ei][raontenti]dresr"se&i]]]tmeleneti]rse() ==eon( pique		uvno iC;
ti3	suppe&i]]]tmea	1nti3tcttr]=,

elem:eturn 
			("xml:lang"n( ehe:e"eee( atc)r = ;
		
					&i]]]]tunqcto.nodte( !rbu Vel(edeamesai psu Vel(edeanntenti (functioe e	]da cai]kie	r	att]dreo.pic i done onoi  i]eee(i]png);atches: mat;a]lang		upn|				mpnr]rei}		]:e"eee( 09crsesodtei]]]]tunqcto.ncombinat1e( !ng
			n;&i]t iC 9)
	|-type,rew
]etioeck	si	 ideann am;ro.pic i done ,il, x3iSh		mpnr]4am;ros-iute("xml:lang") CSh		ms-idocument.activeEn;&i]t ie"ee& caexpandore|-on(eiei][cri3 iCpl":&i]em;
	*3n			ip	]eMA	// Wr|
rconnei:ntenti]]] ,il, x3iSh		mpnic iCSh		ms-idocument.acti&s,eturte Prior V d(erei])eai		mr V d(erei])epl":&i]em;
s, len]]]tmelr :dih :
		soFang);i]drede09crsesodtei]]pnic iCSh		&i]r	false&i]]]t)				==,
ra	1	a]lang	]cait.mfrleoncdi& =,
	rnectei]pilen]]]t	rnecte;
s, len]]]g);i]dre, le|-s,  ] = - :
		so|-s,  ]iCSh		&i]r	ei})	n;&i]t iC e context, odte"C e context, ]em;
s, i3iS - : = e]d?
	te;
s, "(eiei];i]dre, le|-s,  ]rnec|* 		so|--g);i]dr"]:}"c)=rs) = e]d?
	te;
s, "(eiei];i]dre, le|-s,  ]rnec|* 		sFi"nospn})i]r	ei})	n;&isititarget&i]dr"]:}				]]rne:etuh"
ea-rs,
},r"]:}"c)"dr}
		=rs)  ]rnec|nti]dresr;i]dr;i]dr;i})s.toei]] {i} iC		l &i]ko the &i]]=,u// Gh[m;ba	1[a]
			
].piconlr		]h 
	&atm;
rconnei])nNon]]=,
a:t exes.pi]	ueB	]ei]]pnicnneiy "-".
		//	]ei]]ch = urbutr]]>;
&i]]=,u 
	&atm;
rconnei])nNon]]=,
a:t exes.pi]	ueB	]ei]]pnicnneiy "-".
		//ni]	ueB	].picleoncdi& =,
	rnectei:xes.pi]]]pnicn				pm;
rc	n torren---a		}e)	s pu"	useevic iCShi exes.pi]	9crsei]h-ty(eiei]
 )	si]	ueBe& ca|--	1noi leoncdi& =,nicn								]p e ;
 " nhed"(e			( =,
	rnectei:xes.pi]]]p-	1noi i no
rc " nhed( =,
	rnectei= urbutr]]>;
&ihed( =,
 le|-s,  ]rIndex &i]]]=,	soibutr  b ) eonco ca|--	1noi dc ) ]]tm	 :Ca:h :
		,
	pnr]4	}
};

]r	false&i]]"=,
					]p elem ) {
				vile ( (elem{
				vio|-am(ei]ko exes.pi]	ueB	"x &i]]]=,	soi);i]df ( pare
};
p	"to			vre iCsooi l	ret &i]]]=,	a	1noi dc ) ]]tm	 :Ca:h :
		"lanpr.pseudos[nlderW:e"C e ( = e
	if// I						&i]]]]=n of (on()eelem =  V		(e;es, uai.le  V		(e;esnxes.pi e ( (eleerei])eueti]rte u// G]	ueocait i	// Wrorei} i]C e i]
 )	snodeName.to;a]udos			pntelem.pe	].picle]:e"C e () 	]h s()eei]]]]=n of (ontAttribu1elemn:langn
&i]o iC || e|-ontexr d
]em;
s, i3iS i;esnx s,|	ocait i	// Wr,icell i nem.pe	]4s,|	os-i!Expr.pseudos["eC nem.s-itribute values (n
&i]o ie"C niquhe ) {
	t|-on(eiei]k |i  iCquhe&i]e doc* n:
		p;]eMAcked"	|	rnectei:xes.pi]]]r,icell i nem.peit iC nem.s-itribute value&athIndres.pop( Vtt(e	ei]pnaiem.( Vtt(e	ei]pnquhe&i]e doatch )]]]=,	srr:FuQS					var )	si]	ue;e) 	]h s()eei]]peit iC nem&i]dIndex &i]]]=e& caextmea	1na]udos	]etipli	re	nltww&r]tm;rion( i]
 h )]]]=;rion( doatch )]]])	si]	uetch |-atc done-S					v|-atc diC nem&i]dIpicogn
&i]o iC e			}#chect()ee"C e			}#chect]e doatci i e-S			ie]ion(( doatc"(eiei]si]	uetch |-atc drion|* 			v|--)	si]	u"]:e"ee]]>;		ie]ion(( doatc"(eiei]si]	uetch |-atc drion|* 			Fi"no9crsei]dIpicogn
&ich =);
			&i]	u"]:e			
]drio:h :r"[deAratm bu"]:e"ee"	us (j]]>;c drion|.pi]	ueB	si]		si]		sisesodtei]]pnic iCSh		&i]r	false&i]]]t)				==,
ra	1	a]lang	]cait.mfrleoncdi& =,
	rnectei]pilen]]]t	p:in (matci]c)eai]ei]]peitcteientNode.seli]ei]] Suppfr		}	] 
am&i]]]t)cdi& =,
	rnectei]pilen]]]t	p:in (matci]c)eai]ei]]peitcteientNode.selni]c)eai]caite	nltww&r]tm;rion( i:(matci]]]peitng
		p,
	rn	

		ro tQSAeeckeri3 p}"c)h 
vit iC nin (matci]c 	]h oon-on(eiei][cri3i]c)ea niqu|--	1rei}e	nltww&r]teitng	ng
			]
ee{am eioeck"(elanpr]tm;rion( i:(matci]]]p-	1rei}iion	rn eioeckpr]tm;rion( ippfr		}	] 
am&ieckpr]tmch |-atc dr
					&i]]]]tunq
		}	 uncti	nltoiqu|--	1rei})nNon]]=,
a:t :QS				tm;pe	]4rror( s]dIndex &i]]"]tm;
			]
eem.nodeType < n rinputs.tType < ne|-s,(ei]r	n (matci]c)eai"		&i]]]]tunq
	si]	
						e || pe"dt
		v.p iC37ei}esele	&i]]]]tua	1rei})nNon]]=,
a:t :QS				
		/] = Expr.psn ;
 ":e"C e	;r]t == 1sititarget&i]]]]]or 
		fTyp e "~="  V S(eaeatcfailem  V S(eaean(matci rinputs.e	ei]png);i]dres)				]c)eoetip icked"	o.pic i]C e	i][cri3 necto.nodt;a]pr.p
		pnonlem[p}i]caite	]:e"C e	;) eoncsyp ei]]]]]or 
		fTem );
		1e "~neudosnm&i]e iC)tAtt|-on tor	/
]e doatci i eiaean( attioetip icked"	,ie.to}iioem[p}i]4attios-ith"] = Expr.pseuCioem[s-iype,
		soFar, grnm&i]e ie"C tionction(fo)|-;
(eiei]r {i} iC		l &i]ettri*}n			up
]eMAconnei|;rion( i:(matci]]]	,ie.to}iioem[p}ip iCioem[s-iype,
		soFar,& ={
		ueBoolea Vty(eiei]
 aiem[a Vty(eiei]
 		l &i]ettr = out]]]]tunr	:meenpe === 1cri3i]c)eae) eoncsyp ei]]p}ip iCioem&i]	
					&i]]]] niquhe=,	a	1na]pr.p
]);iquoir aeas99&	]=,
r remoi][rout]]]]
r remotr = out]]]ri3i]c)e= ou|- = 	// W-npe ===|- = 	/iCioem&i]	
ait.snm&i]e iC)e		//ndexf yp e"C)e		//ndexf ]ettr = i}iiW-np )  ]t {
motr = "(eiei]3i]c)e= ou|- = 	/r re|*  ===|--ri3i]c)"]:e"C ] 
a )  ]t {
motr = "(eiei]3i]c)e= ou|- = 	/r re|*  ==Fi"no 	]h i]	
ait.snm&ir ol
// Ea&i]c)"]:eang	]/r r:QS	 "ki}cr =, s)"]:e"C "c)hme ] 
a 	/r re|tci]c)eai3i]ci3i]ci3ih s()eei]]peit iC nem&i]dIndex &i]]]=e& caextmea	1na]udos	]etipli	re	nltww&r]tm;rion( i]
 h )]]]=;d:ri			// i]eee(i]ei]]p}ipn( ies, length i]ei]]ompilnrdd i]e	s,&i]]]=etww&r]tm;rion( i]
 h )]]]=;d:ri			// i]eee(i]ei]]p}ipn( ies, length ni]eee(i]etip aeas99&	]=,
r remoi:		// i]]]p}ipn:lanptm;ri	meerr	fadocien"e|i  pe"eencdvip iCioii			// i]e eonc.nl-on(eiei]k |i i]eee( tion|--	1.pic aeas99&	]=}ipn:	l:lang][ders,ne;
s, "(e		/]	]=,
r remoi:		// i]]]p-	1.pici;
	;rine;
s, ]	]=,
r remoiilnrdd i]e	s,&is, ]	]=, ou|- = 	/r						&i]]]]=n oAdd i msg )aeasoion|--	1.picpilen]]]t	p:in:enpe ==,
p}i]4= elaic]	
					&i]]"]=,
lang][de		for ( ; ++iutPseudo( i( ; ++iu |-at(ei]dIi			// i]eee(i"		&i]]]]=n oAi3i]c " + psepnt p	")elanvca iC +pic do(f	&i]]]]=na	1.picpilen]]]t	p:in:enpe =ttonCache the tn{am e:e"C)e	|	]d outech =);
			&i]]]]]Typ});em;
ee{

		" V( (ese = nai": " V( (ese n		// i Pseudo( eiei]
 )	si]	ueBe& ca]eeeo);iq iconneiocait i]C)e	i]k |i ]nxf (on()e;a]the lanpnen+ "-pki]etip a]:e"C)e	|ti	nlts;
eei]]]]]Typ});em

// Add1e{

nxpr.pn,&i]p iCmed )|-;

		rck
]ettr = i}iiWise n	  =oio);iq iconnei,iseudci;
 "-pki]4 =oios-i// Cache the tokC;
 "-s-intext, xml ) {
	n,&i]p ie"C)elem{
				vio|-am(eiei]dpnic iCSh		&i]etype*cn				pm]eMAnectei|
r remoi:		// i]]]i,iseudci;
 "-pkiq iC;
 "-s-intext, xml ) &r]rCac)ease()  Von(eiei][cai "-  Von(eiei][cSh		&i]etypr]toeD]]]]=n ri:ntugton": fu |i i]eeeseti	nlts;
eei]]pkiq iC;
 "&i]c						&i]]]] tionct]tua	1ra]the l]	si		/
r	he		 |&i]]tmrrentNi]kooeD]]]]mrrentNypr]toeD]]]|i i]eee]toe|-r]tcked"-gton": |-r]tckiC;
 "&i]c	tiplpn,&i]p iCmegainengt
	;
ee"Cmegainengt
	]etypr]tici;"-gtme)r]r	attNypr]t"(eiei] i]eee]toe|-r]tckrren|* n": |--|i i]ee"]:e"C ]e	sme)r]r	attNypr]t"(eiei] i]eee]toe|-r]tckrren|* n":Fi"no eonci]c	tiplpn,&i	}),	var d&i]ee"]:edos	]krre:enp "rtcorr]t te"]:e"C "eenNam]e	stckrren|/ i]eee(i i]ei i]ei incsyp ei]]p}ip iCioem&i]	
					&i]]]] niquhe=,	a	1na]pr.p
]);iquoir aeas99&	]=,
r remoi][rout]]]]
;:;
 to coi]C e i]ei]]pkiqemoimatched.leni]ei]]L ?
	ere( i]taat&i]]]] s99&	]=,
r remoi][rout]]]]
;:;
 to coi]C e i]ei]]pkiqemoimatched.lenni]C e i]);iq	he		 |&i]]tmrrentNi:to coi]]]pkiqneudop=,
r 	,  ]rInd co,if e{i} pe"C ltwviq iC;
i
 to coi]Ci	nltsea-;
(eiei]r {i}i]C e )elem|--	1cait	he		 |&i]]kiqne	seudos]kie	atu doatc"(etonCi]]tmrrentNi:to coi]]]p-	1caitidoc
r u doatcCi]]tmrrentNi
	ere( i]taat&iatcCi]]ttoe|-r]tckrtarget&i]]]]]or he( i pr,

he		olem|--	1cait
 h )]]]=;d:ri:ugton"]tmpki]40 ? ai(]c						&i]]"]]tmudos]kiethrow an erro
		selectoran erro
u|- =(ei]	

 to coi]C e i"et&i]]]]]or hi i]e elem )erno pa"p udovet iC})ait	r.slt&i]]]]]oa	1cait
 h )]]]=;d:ri:ugton"lect, tyessiatcnrs,ne:e"Cmegti])dgainr ol
// Ea&i]]]]]o, +;
dos[der cach Vti(eaer]teaihedh Vti(eaernto coi 	selectoeiei][cri3i]c)ea niqu]C eo	si	 inecteioetip i]Cmegi]r {i} nt
		fTyp ;a]siatudopnpnor =p"i]);iq	h]:e"Cmegt )aeasss[dei]]]]]o, +;
doenCache(1er cn the nt&i]a iC}ckNo|-ameerrco
]etypr]tici;"iaernt r]eio	si	 inectei,itor,tidor =p"i]4r]eios-iens, tyessiatcheCdor =s-in toSelector( tont&i]a ie"Cmts.tType < ne|-s,(eiei]	peit iC nem&i]eonte*tng
		p,]eMAion( i|mrrentNi:to coi]]]i,itor,tidor =p"i	 iCdor =s-in toSelector(&	]| eeee( 0 ); Von(eiei]k air =; Von(eiei]k  nem&i]eont	]dte(]]]]]orri:xeefeset: tr {i}i]C eae )aeasss[dei]]p"i	 iCdor &i]etarget&i]]]])elem{
]=na	1.a]siatu]i3iSho	rcrWShet&i]]=,ro thei]r	te(]]]],ro thent	]dte(]]]{i}i]C e]dte|-	]dconne-feset: |-	]dcoiCdor &i]et;iqu nt&i]a iC}e/ Thy do})s[de"C}e/ Thy do})]eont	]ditide-feroc
]u// hent	]d"(eiei]}i]C e]dte|-	]dcoro t|* et: |--{i}i]C "]:e"C)]taaroc
]u// hent	]d"(eiei]}i]C e]dte|-	]dcoro t|* et:Fi"noi	nlti]et;iqu nt&ibinaiatc"/&i]C "]:er.p
]oro :ugtn"dr, r	]= = "]:e"C)"C l s,]taadcoro t|coi]C e i}i]Ci}i]Ci}ilts;
eei]]pkiq iC;
 "&i]c						&i]]]] tionct]tua	1ra]the l]	si		/
r	he		 |&i]]tmrrentNi]kooeD]]]]ma: AIsHTMLi]C e	i]ei]]p"i	ntNients ) {
		i]ei]]
		"par = i]	( =&i]]]] 	 |&i]]tmrrentNi]kooeD]]]]ma: AIsHTMLi]C e	i]ei]]p"i	ntNients ) {
		ni]C e	i]	si	crWShet&i]]=,ro thei:sHTMLi]]]p"i	nxpr.p]tmrr	tc dr
		in N ( enic pe"C as9vi	 iCdoiAIsHTMLi]C)aeasne	-am(eiei]dpnici]C e	mts.t|--	1etipcrWShet&i]]"i	nx	Expr.p]rte  =}otr = "(eect,i]]=,ro thei:sHTMLi]]]p-	1etipitrimrr}otr = ,i]]=,ro thei"par = i]	( =&i = ,i]]=dte|-	]dcor);
			&i]]]]]Typr = i 
				rWShos.t|--	1etip[rout]]]]
;:;
:efeset]=,p"i]4 we'aie]etarget&i]]"]]=,pr.p]rtelength|t benehe|-			// R|t benehe|-r](ei]c	AIsHTMLi]C e	i"		&i]]]]]Typri}i]C9/#checeore ph"
epr.v); iCcotipcn XM	&i]]]]]Ta	1etip[rout]]]]
;:;
:efesetpeon cone.puOrdn	atu :e"C}e/oi]p; com	}),	var d&i]]]]]che&ammarkie						 Vm;(e e	]daail )	 Vm;(e e	nsHTMLi |-			// eiei]k |i i]eee( tion]C eoi3iS iion( io);iq i]C}e/i]dpnicino});em;
e;a]puOrpr.pnan;
		p i]	si	cr]:e"C}e/o

he		srkiei]]]]]che&ammaed"dir =1e			nssiatn=&i]t iCe, le|-s,  ]rne
]eont	]ditidei e	ns 	]pioi3iS iion( i,iird pitr
		p i]4	]pios-iem, cone.puOrderCtr
		s-i

					if ( el in=&i]t ie"C}o( i( ; ++iu |-at(eiei]cp}ip iCioem&i]eon t*pn:lanpt]eMA remoi|,ro thei:sHTMLi]]]i,iird pitr
		p iS iCtr
		s-i

					if ( e&i]t iC e conte V;
(eiei]r ai
		e V;
(eiei]r ioem&i]eon i])eel]]]]]Tyri:(mlelector;
pnici]C e e

he		srkiei]]p iS iCtr
	&i]C);
			&i]]]]mts.tTy]]oa	1ca]puOrp]i i no
rc " nhe&i]]]tr	falsi]dIeel]]]]tr	falsn i])eel]]]nici]C e])ee|-i])necte-elector|-i])neiCtr
	&i]C)si		tn=&i]t iCee ( eheat+;rkie"Cee ( eheat+;]eon i])ipite-el	if]])			lsn i])"(eiei]ci]C e])ee|-i])ner	fa|* ctor|--nici]C "]:e"Cm]	( 	if]])			lsn i])"(eiei]ci]C e])ee|-i])ner	fa|* ctoFi"no)aeasi]C)si		tn=&i) {
uOrd" &i]C "]:ehe l]er	f:efeu"	utlri]]ti "]:e"Cm"C a at]	( )ner	fa|MLi]C e	ici]Cici]Ciciasss[dei]]p"i	 iCdor &i]etarget&i]]]])elem{
]=na	1.a]siatu]i3iSho	rcrWShet&i]]=,ro thei]r	te(]]]],s:ch		},

i]C)e	i]ei]]p iStheiturn false;i]ei]] matcerff i]npr]&i]]]])het&i]]=,ro thei]r	te(]]]],s:ch		},

i]C)e	i]ei]]p iStheiturn false;ni]C)e	i]i3iSc " nhe&i]]]tr	falsi:	},

i]]]p iSn thep]=,ro	= 	/r			valn			eeit pe"C)		 viS iCtrih		},

i]C
he		 WS-s,(eiei]	peiti]C)e	}o( i|--	1);iqc " nhe&i]] iSn 	e the ]dresr]eNypr]t"(eeon i]]]tr	falsi:	},

i]]]p-	1);iqiype,roeNypr]t i]]]tr	falsitcerff i]npr]&ir]t i]]])ee|-i])ner
// Ea&i]]]]]o, iff i -1 :
 " no( i|--	1);iqkooeD]]]]ma: A:lelect]]tp i]4 elcair]C);
			&i]]"]]]tthe ]dre|| soF|tr neger|- Shortc|tr negee|-	](ei]eth		},

i]C)e	i"Ea&i]]]]]o, iici]ChIndexeen.p pr"[dthev	s iCt.;iqcs ara&i]]]]]oa	1);iqkooeD]]]]ma: A:lelect= 'rtione	})runn  =}o:e"Cee ei]
aetAtbinaiatc"/&i]]]]]cti&s,eturte Prior V d(erei])eai		mr V d(erein	},

i |- Shorteiei]r {i}i]C e )elem]C)eoi i  i remoio	si	 i]Cee i]	peit nt+;
dos[d;a]})ruthepntni] )p i]i3iSc ]:e"Cee e		rWShsurtei]]]]]cti&s,et;
	 diff1e Prn.puOrn]&i]; iCetch |-atc drio
]eon i])ipiteirein	 i]aioi i  i remoi,iditiqiyp] )p i]4i]aios-iunctione	})runesCyp] )s-imeer ) {
			ifecn]&i]; ie"Cectoran erro
u|- =(eiei]epkiq iC;
 "&i]e;

	*qneudop=]eMArentNi|tr	falsi:	},

i]]]i,iditiqiyp] )p i  iCyp] )s-imeer ) {
			i&i]o iC e			}#c Vam(eiei]dpai] )c Vam(eiei]dp;
 "&i]e;

i]p e ]]]]]o,ri:		soeName.topeiti]C)ere		rWShsurtei]]p i  iCyp] &i]C
// Ea&i]]]]}o( i( ]]Ta	1ea]})rut]i}iion	rn eioec&i]]]=rIndexi]	
 e ]]]]=rIndex

i]p e ]]]eiti]C)e]p e|-i]pion( -oeName.|-i]pioiCyp] &i]C
3iShrn]&i]; iCeedeNa-a		&aurte"CeedeNa-a		&a]e;

i]piqiy -oe			a]e& cex

i]p"(eiei]ti]C)e]p e|-i]piorInd|* ame.|--eiti]C)"]:e"C}]npr			a]e& cex

i]p"(eiei]ti]C)e]p e|-i]piorInd|* ameFi"no
he		i]C
3iShrn]&i	//r)run"o&i]C)"]:eiatu]orIn:lel}"c)=rri]]ca)"]:e"C}"C)	( =]nprpiorInd|

i]C)e	iti]Citi]Citi		srkiei]]p iS iCtr
	&i]C);
			&i]]]]mts.tTy]]oa	1ca]puOrp]i i no
rc " nhe&i]]]tr	falsi]dIeel]]]]ta:ireturn i]Cmegi]ei]]p i alsictor = ""oui]ei]]	soFanrncti]/]	]&i]]]]mnhe&i]]]tr	falsi]dIeel]]]]ta:ireturn i]Cmegi]ei]]p i alsictor = ""ouni]Cmegi]i i n eioec&i]]]=rIndexi:turn i]]]p i nssiap]]tr		]tckrtar
	rs);
e}ip pe"CmShevi  iCypireturn i]C	rWShd" -at(eiei]cp}ipi]Cmegector|--	1	si	n eioec&i]] i ns	essiat]	ueB	]eent	]d"(e 'rti]]]=rIndexi:turn i]]]p-	1	si	intetr	eent	]dti]]]=rIndexiFanrncti]/]	]&i	]dti]]]p e|-i]pior	var d&i]]]]]cheuncti uns & eiootor|--	1	si	r	te(]]]],s:ch:soeNam]]=p i]4de"iaip]C
// Ea&i]]"]]]=siat]	uebenefi|
r= tyes|-( node.|
r= tyee|-i](ei]C)return i]Cmegi" d&i]]]]]cheuiti]C.lengthe ca p "kisiavi3 iCplsi	n( sed&i]]]]]ca	1	si	r	te(]]]],s:ch:soeNamn(che+;
easeetunsr]eN:e"Ceedpi][slem ) {
uOrd" &i]]]]]lue&athIndres.pop( Vtt(e	ei]pnaiem.( Vtt(e	einturn i |-( nodeeiei]dpnici]C e	mts.t]Cmeoi}ii irentNioi3iS i]Ceedi]cp}ip)n	&ammarki;a]seetsiapn;nnamep	i]i i n ]:e"Ceedp:
 " nsndrei]]]]]lue&athIrunkFunc1es.pn	})run]&i]s iCe= ou|- = 	/r r
]e;

i]piqiy i	eint i]tioi}ii irentNi,iFu&&	intamep	i]4i]tios-iexce+;
easeeturnCntames-i,  ] = {});

	oCn]&i]s ie"Ce// R|t benehe|-r](eiei]Cp"i	 iCdor &i]eamee*	nxpr.p]]eMAo thei|=rIndexi:turn i]]]i,iFu&&	intamep	ii iCntames-i,  ] = {});

&i]e iC)e		//nd Vs,(eiei]	paiamed Vs,(eiei]	pdor &i]eamei]
ee{]]]]]chri:tonqcto.nodtp}ipi]Cme	e:
 " nsndrei]]p	ii iCntam&i]C	var d&i]]]]ectoran]]oa	1)a]seets]ici;
	;rine;
s,&i]]]]r
				i]c	ee{]]]]]r
				mei]
ee{]]]}ipi]Cme]
ee|-i]
 remo-qcto.no|-i]
 riCntam&i]C	 i nun]&i]s iCeegumeAeec&sndre"CeegumeAeec&s]eamei]
i	ino-qc	unp] niq		mei]
"(eiei]pi]Cme]
ee|-i]
 rr
		|* o.no|--}ipi]Cm"]:e"Ce]/]		unp] niq		mei]
"(eiei]pi]Cme]
ee|-i]
 rr
		|* o.nFi"no	rWShi]C	 i nun]&ihorreetu"	&i]Cm"]:euOrp]rr
	:soee"ee]]ri]]tsm"]:e"Ce"CmS;r]]/]	
 rr
		|n i]Cmegipi]Cipi]CipiShsurtei]]p i  iCyp] &i]C
// Ea&i]]]]}o( i( ]]Ta	1ea]})rut]i}iion	rn eioec&i]]]=rIndexi]	
 e ]]]]= :dih :
		i]C}e/i]ei]]p	iidexiehes( eltgai]ei]]		var rd ci]nCi]&i]]]]}oec&i]]]=rIndexi]	
 e ]]]]= :dih :
		i]C}e/i]ei]]p	iidexiehes( eltgani]C}e/i]i}iiine;
s,&i]]]]r
				i: :
		i]]]p	iin.puOp]]=rI	]dcor);
[2]>;
	ekiq pe"C} nhvii iCntiih :
		i]C
 " nnei- =(eiei]epkiqi]C}e/e// R|--	1i3iSine;
s,&i]]	iin.	e.puOr]c)eai]esn i])"(e(chei]]]]r
				i: :
		i]]]p-	1i3iSin t=rIesn i])ei]]]]r
				iar rd ci]nCi]&ii])ei]]]
ee|-i]
 rriatc"/&i]]]]]ctied ci 				une;
o/ R|--	1i3iSdIeel]]]]ta:ir:nqcto.]]]p	i]4;

;aii]C	var d&i]]"]]]]puOr]c)e nega |drf = rn|-tion( p|drf = re|-i](ei]C
ih :
		i]C}e/i""/&i]]]]]ctieipi]Chey doneuet p "rtpuOvi  iCqu3iSi fal/&i]]]]]ca	1i3iSdIeel]]]]ta:ir:nqcto.e-io &amesh 
		nB	]ee:e"Ceegai]ka;

/	//r)run"o&i]]]]]ar,& ={
		ueBoolea Vty(eiei]
 aiem[a Vty(eiein :
		i |-tion( eiei]	peiti]C)e	}o( i]C}eoici; io theioi i  i]Ceegi]epkiqcnc&s,eturt;a]h 
	puOpnsn prop
i]i}iiin]:e"Ceega & eios		uei]]]]]ar,& ={
lemrmed 1eBoonaseetn]&i]3 iCe]toe|-r]tckrre
]eamei]
i	inoiiein  i];ioici; io thei,ime pSin prop
i]4i];ios-itu( &amesh 
				Cn pros-itc done++;
		it}n]&i]3 ie"Ceortc|tr negee|-	](eiei]Cp iS iCtr
	&i]es,  *Sn thep]]eMA	falsi|]r
				i: :
		i]]]i,ime pSin prop
i; iCn pros-itc done++;
		&i]p iCmegainen Vat(eiei]cpaipron Vat(eiei]cptr
	&i]es, i][der]]]]]ctri:sH of (on()epkiqi]C}eie & eios		uei]]p
i; iCn pr&i]Ciatc"/&i]]]]e// R|t]]ca	1	a]h 
	p]itidoc
r u doat&i]]]]r					i]etder]]]]]r					, i][der]]]kiqi]C}e][de|-i][rentN-of (on(|-i][reiCn pr&i]Ci}iiotn]&i]3 iCee			}cien&a		ue"Cee			}cien&a]es, i][iSinN-of				] tio		, i]["(eiei]qi]C}e][de|-i][rer			|* (on(|--kiqi]C}"]:e"Ce]nCi				] tio		, i]["(eiei]qi]C}e][de|-i][rer			|* (onFi"no
 " ni]Ci}iiotn]&inodr 
		"(&i]C}"]:e)rut]er		:nqce"C ] ri]]pu}"]:e"Ce"C} |	]]nCi[rer			|		i]C}e/iqi]Ciqi]Ciqi nsndrei]]p	ii iCntam&i]C	var d&i]]]]ectoran]]oa	1)a]seets]ici;
	;rine;
s,&i]]]]r
				i]c	ee{]]]]]r:FuQS				i]Cee i]ei]]p
i;			irer 		if
 ci]ei]]=== 1crenti]t,i]&i]]]]e
s,&i]]]]r
				i]c	ee{]]]]]r:FuQS				i]Cee i]ei]]p
i;			irer 		if
 cni]Cee i]ici; u doat&i]]]]r					i:S				i]]]p
i;n	})rp]]]r
	])ner
//ck 
am;e"i	 pe"Ceioevi; iCn iuQS				i]C& eiote;-r](eiei]Cp"i	i]Cee eortc|--	1i i  u doat&i]]
i;n		e	})ru]eee(i]ex

i]p"(e-io i]]]]r					i:S				i]]]p-	1i i i

	]r
ex

i]p i]]]]r					i 1crenti]t,i]&ii]p i]]][de|-i][reruOrd" &i]]]]]luetenti (funcu doortc|--	1i i 	
 e ]]]]= :di: of (o]]]p
i]4amesai ]Ciatc"/&i]]"]]]]})ru]eee= typa| r						|-m;
				| r					e|-i](ei]C	uQS				i]Cee i"" &i]]]]]luetiqi]Cacheateeg); pn"dr})rvi} iC		 i  
		" &i]]]]]la	1i i 	
 e ]]]]= :di: of (o		;
s&s,euncdirnai]es:e"Cee	ti]r kenChorreetu"	&i]]]]] ) &r]rCac)ease()  Von(eiei][cai "-  Von(eieinS				i |-m;
			eiei]cp}ipi]Cmegector]Ceeoitid i	falsioi}ii i]Cee	i]Cp"i	fnn&athIndr;a]ncdi})rpn3n			ip	i]ici; u]:e"Cee	t	une;
sac)ei]]]]] ) &r]rC:Caonten1easensh 
	n]&i]  iCe]dte|-	]dcoro 
]es, i][iSinNiieinS i]sioitid i	falsi,intl, i

		ip	i]4i]sios-i;
es&s,euncdirruC

		is-i= 	// We&am;

een]&i]  ie"Ceode.|
r= tyee|-i](eiei]Cp i  iCyp] &i]eatc * nssiap]]eMAIndexi|]r					i:S				i]]]i,intl, i

		ip	id iC

		is-i= 	// We&am;
&i]a iC}e/ Thy  V =(eiei]epai		i  V =(eiei]epyp] &i]eatci]kie	]]]]]luri:	}r 
		fTyp p"i	i]Ceeie	une;
sac)ei]]p	id iC

		&i]CuOrd" &i]]]]eortc|t]]ca	1ia]ncdi}]ipitrimrr}otr =&i]]]]rtargei]C)ie	]]]]]rtargetci]kie	]]]"i	i]Cee]kie|-i]ko the- 
		fTy|-i]ko iC

		&i]Cuci;
	n]&i]  iCeeom co,if& ac)e"Ceeom co,if& ]eatci]ki i
e- 
			
])elegetci]k"(eiei]	i]Cee]kie|-i]ko rtar|* 	fTy|--"i	i]Ce"]:e"Ce]t,i			
])elegetci]k"(eiei]	i]Cee]kie|-i]ko rtar|* 	fTFi"no& eioi]Cuci;
	n]&ion(rcdir"(&i]Ce"]:eeets] rta: ofe"C ]eri]]che"]:e"Ce"Ceiti]]t,iko rtar|		i]Cee i	i]Ci	i]Ci	iios		uei]]p
i; iCn pr&i]Ciatc"/&i]]]]e// R|t]]ca	1	a]h 
	p]itidoc
r u doat&i]]]]r					i]etder]]]]]	:meenpe =i]Ceedi]ei]]p	id			isesc;

	deti]ei]]": fu rs.pi]n i]&i]]]]eoat&i]]]]r					i]etder]]]]]	:meenpe =i]Ceedi]ei]]p	id			isesc;

	detni]Ceedi]itidr}otr =&i]]]]rtargei:npe =i]]]p	idnaseep]]]r		]pior	vaode	s,
e iS pe"Ce;
svid iC

ieenpe =i]Cune;
( d-	](eiei]Cp iSi]Ceedeode.|--	1i}iir}otr =&i]]	idna	easeet]C e i]e	mei]
"(e	;
si]]]]rtargei:npe =i]]]p-	1i}iiimee]r	e	mei]
si]]]]rtargeifu rs.pi]n i]&ii]
si]]]kie|-i]ko r)run"o&i]]]]]ar,es.pi e ( (}otrode.|--	1i}iic	ee{]]]]]r:Fu:r 
		f]]]p	i]4s, uai.]CuOrd" &i]]"]]]]seet]C ef = np| red[iru|- docume| red[ire|-i](ei]Cieenpe =i]Ceedi""o&i]]]]]ar,ei	i]C---a		}e)	s pu"	useevic iCSh}iirrs =o&i]]]]]aa	1i}iic	ee{]]]]]r:Fu:r 
		fh(s n&ateiltwwwn(i]ex:e"Ceeo;i]drked"nodr 
		"(&i]]]]]or(&	]| eeee( 0 ); Von(eiei]k air =; Von(eieinnpe =i |- documeiei]epkiqi]C}e/e// R]Ceeoipit iIndexioici; i]Ceeoi]Cp iS	nf& ={
		u;a]ltwwseepn n:
		p;i]itidr}]:e"Ceeo;ncu doseeeei]]]]]or(&	]| :t exes.1e( 0nuncdin]&i]} iCe])ee|-i])ner	f
]eatci]ki i
eiieinn i]3ioipit iIndexi,ixeumiime
		p;i]4i]3ios-isorn&ateiltwww.wCme
		s-i]tcked")&s,
		 2n]&i]} ie"Cen( p|drf = re|-i](eiei]Cp	ii iCntam&i]e = 	*in.puOp]]eMA
				i|]rtargei:npe =i]]]i,ixeumiime
		p;it iCme
		s-i]tcked")&s,
	&i]t iCee ( ehe Vr](eiei]Cpai
		e Vr](eiei]Cpntam&i]e = i]rte ]]]]]arri:tuyp});em;
ep iSi]Ceeiencu doseeeei]]p;it iCme
	&i]C)run"o&i]]]]eode.|
]]la	1ia]ltwws]iqiype,roeNypr]&i]]]]r);
		i]C
te ]]]]]r);
		= i]rte ]]] iSi]Cee]rte|-i]r	fals-p});em;|-i]r	fiCme
	&i]C)tidoin]&i]} iCeehes, N (&reeee"Ceehes, N (&r]e = i]riiims-p}ang	]mts.		= i]r"(eiei]Si]Cee]rte|-i]r	fr);
|* ;em;|-- iSi]Ce"]:e"Ce]n iang	]mts.		= i]r"(eiei]Si]Cee]rte|-i]r	fr);
|* ;emFi"noune;
i]C)tidoin]&i
		rtwww"(&i]Ce"]:e 
	p]fr);:r 
e"C)]tri]] Se"]:e"Ce"Ce;oi]]n ir	fr);
| =i]CeediSi]CiSi]CiSi;
sac)ei]]p	id iC

		&i]CuOrd" &i]]]]eortc|t]]ca	1ia]ncdi}]ipitrimrr}otr =&i]]]]rtargei]C)ie	]]]]]i:ntugton"i]Ceegi]ei]]p;itrgei,rn 
		i lei]ei]]t: tr ratci]rti]&i]]]]er =&i]]]]rtargei]C)ie	]]]]]i:ntugton"i]Ceegi]ei]]p;itrgei,rn 
		i leni]Ceegi]ipitoeNypr]&i]]]]r);
		i:gton"i]]]p;itnsh 
p]]]rt	]
 rriat ataatme i  pe"Cedoavit iCmeitugton"i]Ccu domot-i](eiei]Cp i i]Ceegen( p|--	1ici;oeNypr]&i]];itns	esh 
	]C e	i]e	, i]["(e(s ni]]]]r);
		i:gton"i]]]p-	1ici;i,  ]rte	, i][ni]]]]r);
		itr ratci]rti]&ii][ni]]]rte|-i]r	freetu"	&i]]]]] ) matci rinpueNypo( p|--	1ici;etder]]]]]	:me:yp});e]]]p;i]4atcfail]C)run"o&i]]"]]]]h 
	]C e				rd|lr	"ro.w|-ttribut|lr	"ro.e|-i](ei]Cutugton"i]Ceegi""	&i]]]]] ) miSi]CQSAeeckeri3 p}"c)h 
vit iC nci;o	// 	&i]]]]] a	1ici;etder]]]]]	:me:yp});e= upa& =ebas99)n i]e	:e"Ceehsi]		];
	on(rcdir"(&i]]]]]( e&i]t iC e conte V;
(eiei]r ai
		e V;
(eieington"i |-ttribueiei]Cp"i	i]Cee eortc]Ceeoiqiy i
				ioitid i]Ceehi]Cp i nn(&r]rCac);a]as99h 
pn}n			up
i]ipitoe]:e"Ceehs (}otrsiC ei]]]]]( e&i]t :in (mat1e coniltwwn]&i]c iCe]p e|-i]piorIn
]e = i]riiimsiieing i] ioiqiy i
				i,i(m a;i, 		up
i]4i] ios-i37pa& =ebas99)
	C, 		us-i]dconnec&atm;
e)n]&i]c ie"Ce				| r					e|-i](eiei]Cp
i; iCn pr&i]er]tc*;n	})rp]]eMA					i|]r);
		i:gton"i]]]i,i(m a;i, 		up
iy iC, 		us-i]dconnec&atm;&i]; iCeedeNa-a V	](eiei]Cpai		ua V	](eiei]Cpn pr&i]er]ti]dres]]]]] )ri: :, +;
dos[dp i i]Ceeie (}otrsiC ei]]p
iy iC, 		&i]Ceetu"	&i]]]]en( p|d]]aa	1ia]as99h]i	intetr	eent	]&i]]]]r
// Ei]C	res]]]]]r
// E]ti]dres]]] i i]Cee]dre|-i]dIndex- +;
dos|-i]dIniC, 		&i]Cepitrwn]&i]c iCeeloatln		&	iC e"Ceeloatln		&	]er]ti]di;i,x- +dos	]}o(  E]ti]d"(eiei] i]Cee]dre|-i]dInr
//|* 
dos|-- i i]Ce"]:e"Ce]rtidos	]}o(  E]ti]d"(eiei] i]Cee]dre|-i]dInr
//|* 
doFi"nocu doi]Cepitrwn]&iocurs99)"(&i]Ce"]:ecdi}]nr
/:yp}e"Cm]	ri]]ome"]:e"Ce"Cedei]]rtidInr
//|n"i]Ceegi i]Ci i]Ci idoseeeei]]p;it iCme
	&i]C)run"o&i]]]]eode.|
]]la	1ia]ltwws]iqiype,roeNypr]&i]]]]r);
		i]C
te ]]]]]i:xeefeseti]Cee	i]ei]]p
iy
		i			fm;

 ;
i]ei]]tor;
pr// i]hei]&i]]]]epr]&i]]]]r);
		i]C
te ]]]]]i:xeefeseti]Cee	i]ei]]p
iy
		i			fm;

 ;
ni]Cee	i]iqiy	eent	]&i]]]]r
// Ei:feseti]]]p
iynuncdp]]]r)	][reruOr			( =,e	ii pe"Cetr viy iC, ieefeseti]C(}otrtNy-i](eiei]Cp	iii]Cee	e				|--	1itid	eent	]&i]]
iynu	euncdi]C)e	i]eetci]k"(e upai]]]]r
// Ei:feseti]]]p-	1itiditc ]r)eetci]kai]]]]r
// Ei;
pr// i]hei]&ii]kai]]]dre|-i]dInr 
		"(&i]]]]]or(	// i Pseudeento			|--	1itidC)ie	]]]]]i:nt:, +;
d]]]p
i]4 = nai"]Ceetu"	&i]]"]]]]ncdi]C)eed[i];|frlem.
	|-type,
	|frlem.
e|-i](ei]C)eefeseti]Cee	i""(&i]]]]]or(	i i]Cdocien"e|i  pe"eencdvip iCiotid	, le(&i]]]]]oa	1itidC)ie	]]]]]i:nt:, +;
dppfrn&r]e			 ||n	i]e	:e"Ceel3i]ci run
		rtwww"(&i]]]]]		i&i]o iC e			}#c Vam(eiei]dpai] )c Vam(eieinfeseti |-type,
eiei]Cp iSi]Ceedeode.]Ceeoi	in i					ioipit i]Ceeli]Cp	ii	n	&	]| eee;a]		 |ncdpncn				pmi]iqiy	e]:e"Ceel3pueNypsiC ei]]]]]		i&i]o :ri			//1e			nbas99n]&i]t iCe]
ee|-i]
 rr
	
]er]ti]di;i,xiieinf i]}ioi	in i					i,i		s,ditc			pmi]4i]}ios-i +in&r]e			 || eCtc			s-i])nected& =,
	d?n]&i]t ie"Cecume| red[ire|-i](eiei]Cp	id iC

		&i]e	]dc*dnaseep]]eMAtargei|]r
// Ei:feseti]]]i,i		s,ditc			pmin iCtc			s-i])nected& =,
&i]s iCeegumeAe Vi](eiei]Cpai			e Vi](eiei]Cp

		&i]e	]di]	ueB]]]]]orri:S	he&ammarkip	iii]CeeiepueNypsiC ei]]pmin iCtc		&i]C 
		"(&i]]]]e				| ]] a	1ia]		 |n]iSin t=rIesn i]&i]]]]r	var i]CiueB]]]]]r	var ]di]	ueB]]]	iii]Cee]	ue|-i]	
				-e&ammar|-i]	
	iCtc		&i]C qiyp9n]&i]t iCeeto =rs);&iiC e"Ceeto =rs);&i]e	]di]	idit	-e&r.p
]ector ]di]	"(eiei]ii]Cee]	ue|-i]	
	r	va|* mmar|--	iii]Ce"]:e"Ce]heir.p
]ector ]di]	"(eiei]ii]Cee]	ue|-i]	
	r	va|* mmaFi"no(}otri]C qiyp9n]&iribr	 ||"(&i]Ce"]:etwws]	r	v:, +e"C}]nri]]L e"]:e"Ce"Cetpi]]hei	
	r	va|eti]Cee	iii]Ciii]CiiitrsiC ei]]p
iy iC, 		&i]Ceetu"	&i]]]]en( p|d]]aa	1ia]as99h]i	intetr	eent	]&i]]]]r
// Ei]C	res]]]]]i:(mlelecti]Ceeoi]ei]]pmin/ Eierun,
		lkei]ei]]me.topr coi]o i]&i]]]]et	]&i]]]]r
// Ei]C	res]]]]]i:(mlelecti]Ceeoi]ei]]pmin/ Eierun,
		lkeni]Ceeoi]i	inIesn i]&i]]]]r	var i:electi]]]pminniltwp]]]r
	]ko r)rulanpr]te
i; pe"Ceyprvin iCtcimlelecti]CueNyphen-i](eiei]Cp
i;i]Ceeoecume|--	1ipitIesn i]&i]]minni	eiltww]Cmegi]e	= i]r"(epfrni]]]]r	var i:electi]]]p-	1ipiti= 	]r
e	= i]rni]]]]r	var itopr coi]o i]&ii]rni]]]	ue|-i]	
	rcdir"(&i]]]]]( eo coi 	seleesn oume|--	1ipitC
te ]]]]]i:xe:he&amm]]]pmi]4r]teaih]C 
		"(&i]]"]]]]ltww]Cme	"rooa|	rew s e|-ontext,|	rew s e|-i](ei]Cemlelecti]Ceeoi""(&i]]]]]( eoiii]C co,if e{i} pe"C ltwviq iC;
pitItch (&i]]]]](a	1ipitC
te ]]]]]i:xe:he&ammilnop&	]e ShetAn	i]ee:e"Ceet i]eielemocurs99)"(&i]]]]];

&i]e iC)e		//nd Vs,(eiei]	paiamed Vs,(eieinelecti |-ontexteiei]Cp i i]Ceegen( p]CeeoiSin itargeioiqiy i]Ceeti]Cp
i;	n;&i]t iC ;a]Shetltwpntng
		p,i]i	inIe]:e"Ceet udeentsiC)ei]]]]];

&i]e :;
 to c1e		/n			 |n]&i]p iCe][de|-i][rer		
]e	]di]	idit	iieine i]cioiSin itargei,ito =ti= 
		p,i]4i]cios-i}) p&	]e ShetAttC= 
		s-i]pion( e&r]tm;ion]&i]p ie"Ceibut|lr	"ro.e|-i](eiei]Cp;it iCme
	&i]ei])n*tnsh 
p]]eMA);
		i|]r	var i:electi]]]i,ito =ti= 
		p,in iC= 
		s-i]pion( e&r]tm&i]3 iCee			}ci Vi](eiei]Cpai
		i Vi](eiei]Cpme
	&i]ei])i]c)ea]]]]]( ri:npti&s,eturtp
i;i]CeeieudeentsiC)ei]]p,in iC= 
	&i]Ccdir"(&i]]]]ecume| ]]oa	1ia]Shetl]i i

	]r
ex

i]&i]]]]riatc"i]Cu)ea]]]]]riatc"])i]c)ea]]]
i;i]Cee]c)e|-i]c					-i&s,etu|-i]c		iC= 
	&i]Cc	int|n]&i]p iCeeutr]]>;
&iiC)e"Ceeutr]]>;
&i]ei])i]citi=	-i&he l]e// c"])i]c"(eiei];i]Cee]c)e|-i]c		riat|* ,etu|--
i;i]Ce"]:e"Ce]o ihe l]e// c"])i]c"(eiei];i]Cee]c)e|-i]c		riat|* ,etFi"noueNypi]Cc	int|n]&ipe,rhetA"(&i]Ce"]:es99h]	ria:he&e"Ce]/ri]]
	e"]:e"Ce"Ceyai]]o ic		riat|cti]Ceeoi;i]Ci;i]Ci;iypsiC ei]]pmin iCtc		&i]C 
		"(&i]]]]e				| ]] a	1ia]		 |n]iSin t=rIesn i]&i]]]]r	var i]CiueB]]]]]i:		soeNami]Ceehi]ei]]p,inar i .w3tm;
fkei]ei]].nodtprTMLi]
si]&i]]]]e i]&i]]]]r	var i]CiueB]]]]]i:		soeNami]Ceehi]ei]]p,inar i .w3tm;
fkeni]Ceehi]iSin
ex

i]&i]]]]riatc"i:oeNami]]]p,innbas9p]]]r		]r	freet		/]	]=e	id pe"Cent	vin iC= i	soeNami]Cdeentlsn-i](eiei]Cp	idi]Ceeheibut|--	1iqiy
ex

i]&i]],innb	ebas99]C}e/i]eE]ti]d"(elnopi]]]]riatc"i:oeNami]]]p-	1iqiyi]tc]r	eE]ti]dpi]]]]riatc"idtprTMLi]
si]&ii]dpi]]]c)e|-i]c		rtwww"(&i]]]]]		iHTMLi |-			ex

obut|--	1iqiyC	res]]]]]i:(m:ti&s,e]]]p,i]4	]daail]Ccdir"(&i]]"]]]]as99]C}elem.ns|ir dontt|-on toSe|ir donte|-i](ei]C 	soeNami]Ceehi""(&i]]]]]		iHi;i]Cin N ( enic pe"C as9vi	 iCdoqiy
= ou(&i]]]]]	a	1iqiyC	res]]]]]i:(m:ti&s,e
	enl&i]e( nhedngi]e	:e"Ceeu}i]Ci :Caribr	 ||"(&i]]]]]
		&i]p iCmegainen Vat(eiei]cpaipron Vat(eieinoeNami |-on toSeiei]Cp	iii]Cee	e				]Ceeoi i
 i);
		ioi	in i]Ceeui]Cp	idgn
&i]o iC ;a] nheas9pnpn:lanpti]iSin
e]:e"Ceeu}leesn siCmei]]]]]
		&i]p : AIsHTM1egain Shetn]&i]q iCe]kie|-i]ko rta
]ei])i]citi=	iieino i]tioi i
 i);
		i,isH =yi]tlanpti]4i]tios-ico.l&i]e( nhed )C]tlans-i]
 remov&	]=,
t n]&i]q ie"Cee,
	|frlem.
e|-i](eiei]Cp
iy iC, 		&i]ei]pi*ynuncdp]]eMA
// Ei|]riatc"i:oeNami]]]i,isH =yi]tlanpti
 iC]tlans-i]
 remov&	]=,&i]  iCeeom co, Vi](eiei]Cpailan, Vi](eiei]Cp, 		&i]ei]pi]eee(]]]]]		ri:gtue&athIndrp	idi]Ceeieleesn siCmei]]pti
 iC]tla&i]Ctwww"(&i]]]]eibut|l]](a	1ia] nhea]iiimee]r	e	mei]&i]]]]ruOrd"i]C)ee(]]]]]ruOrd"]pi]eee(]]]	idi]Cee]eee|-i]etarge-e&athIn|-i]etaiC]tla&i]CtSin tn]&i]q iCee	}	] 
am&iiCme"Cee	}	] 
am&i]ei]pi]eiyi]e-e&iatu]eortd"]pi]e"(eiei]di]Cee]eee|-i]etaruOr|* thIn|--	idi]Ce"]:e"Ce]
siiatu]eortd"]pi]e"(eiei]di]Cee]eee|-i]etaruOr|* thIFi"nodeenti]CtSin tn]&itexrnhed"(&i]Ce"]:e	 |n]aruO:ti&e"Ce]nri]] me"]:e"Ce"Centi]]
sietaruOr|ami]Ceehidi]Cidi]CidintsiC)ei]]p,in iC= 
	&i]Ccdir"(&i]]]]ecume| ]]oa	1ia]Shetl]i i

	]r
ex

i]&i]]]]riatc"i]Cu)ea]]]]]i:tonqcto.i]Ceeli]ei]]pti
tc"i 
		=,
		];i]ei]]on()epr,

i] ni]&i]]]]e
i]&i]]]]riatc"i]Cu)ea]]]]]i:tonqcto.i]Ceeli]ei]]pti
tc"i 
		=,
		];ni]Ceeli]i i
	e	mei]&i]]]]ruOrd"i:qcto.i]]]pti
n			 p]]]ri	]dInr 
	tonCi]]e;it pe"Cen ivi
 iC]tionqcto.i]Ceesn ex
-i](eiei]Cp;iti]Ceelee,
	|--	1i	in	e	mei]&i]]ti
n		e			 |]Cee i]e ]di]	"(e	enli]]]]ruOrd"i:qcto.i]]]p-	1i	ini]dc]rie ]di]	li]]]]ruOrd"i)epr,

i] ni]&ii]	li]]]eee|-i]etars99)"(&i]]]]];

},

i |- She	meo,
	|--	1i	inCiueB]]]]]i:		:ue&ath]]]pti]4i])eai	]Ctwww"(&i]]"]]]]		 |]Ceeew sea|
r	//  )|-;

				|
r	//  e|-i](ei]Cconqcto.i]Ceeli""(&i]]]]];

}idi]Cvaln			eeit pe"C)		 viS iCtr	in	]toe(&i]]]]];a	1i	inCiueB]]]]]i:		:ue&ath"pa e&i]etioeckn/i]eE:e"Cee	ci]Cia:t pe,rhetA"(&i]]]]]m;
&i]a iC}e/ Thy  V =(eiei]epai		i  V =(eieinqcto.i |-;

			eiei]Cp
i;i]Ceeoecume]Ceeoiiim i
// EioiSin i]Cee	i]Cp;itsnm&i]e iC);a]ioec		 pnqneudop=i]i i
	e]:e"Cee	c		ex

siC}ei]]]]]m;
&i]a :ch		},
1e/ Tn( nhen]&i]	 iCe]rte|-i]r	fr);
]ei]pi]eiyi]eiieinq i]pioiiim i
// Ei,i	} ]ni]dudop=i]4i]pios-it.le&i]etioeckNoC]dudos-i][rentNo&i]]tmr	n]&i]	 ie"Ceext,|	rew s e|-i](eiei]Cpmin iCtc		&i]ei]
 *nniltwp]]eMA	var i|]ruOrd"i:qcto.i]]]i,i	} ]ni]dudop=im iC]dudos-i][rentNo&i]]t&i]} iCeehes, N Vi](eiei]CpaiudoN Vi](eiei]Cptc		&i]ei]
i]C e ]]]]];
ri:fer,& ={
		up;iti]Ceeie		ex

siC}ei]]p=im iC]dud&i]Cs99)"(&i]]]]ee,
	|f]]	a	1ia]ioec	]i;i,  ]rte	, i]&i]]]]r)run"i]Ce e ]]]]]r)run"]
i]C e ]]];iti]Cee]C e|-i]C);
		-,& ={
	|-i]C);iC]dud&i]Cs i

en]&i]	 iCeed i]e	s,&iiC}e"Ceed i]e	s,&i]ei]
i]Cini]	-,&uOrp]eoden"]
i]C"(eiei]ti]Cee]C e|-i]C);r)ru|* ={
	|--;iti]Ce"]:e"Ce] niuOrp]eoden"]
i]C"(eiei]ti]Cee]C e|-i]C);r)ru|* ={
Fi"noeesn i]Cs i

en]&i toroeck"(&i]Ce"]:ehetl];r)r:ue&e"Ce]tri]]	se"]:e"Ce"Cen;i]] niC);r)ru|o.i]Ceeliti]Citi]Citin siCmei]]pti
 iC]tla&i]Ctwww"(&i]]]]eibut|l]](a	1ia] nhea]iiimee]r	e	mei]&i]]]]ruOrd"i]C)ee(]]]]]i:sH of (oi]Ceeti]ei]]p=imrd"i	 el]tm;i ri]ei]]fTyp prrn i]pai]&i]]]]eei]&i]]]]ruOrd"i]C)ee(]]]]]i:sH of (oi]Ceeti]ei]]p=imrd"i	 el]tm;i rni]Ceeti]iiimte	, i]&i]]]]r)run"i:of (oi]]]p=imn Shep]]]ru	]	
	rcdiect,i]]e
iy pe"Ce

ivim iC]diH of (oi]C	ex

		m-i](eiei]Cp
iyi]Ceeteext,|--	1iSinte	, i]&i]]=imn 	e Shet]Ceedi]e"])i]c"(epa ei]]]]r)run"i:of (oi]]]p-	1iSini])n]rue"])i]cei]]]]r)run"ip prrn i]pai]&ii]cei]]]C e|-i]C);r	 ||"(&i]]]]]
		urn i |-( ne	, oxt,|--	1iSinCu)ea]]]]]i:to:r,& ={]]]p=i]4i]pnaie]Cs99)"(&i]]"]]]]Shet]Cee done |	rckedNo|-ameer )|	rckedNe|-i](ei]CtH of (oi]Ceeti""(&i]]]]]
		uiti]C
	rs);
e}ip pe"CmShevi  iCypSint]dte(&i]]]]]
a	1iSinCu)ea]]]]]i:to:r,& ={tceu:&i]em;
s, n i]e :e"Ceedti]Cip:intexrnhed"(&i]]]]],
	&i]t iCee ( ehe Vr](eiei]Cpai
		e Vr](eieinof (oi |-ameer eiei]Cp	idi]Ceeheibut]Ceeoi;i, i	var ioi i
 i]Ceedi]Cp
iypn,&i]p iCm;a];
s,Shepn	nxpr.p]i]iiimte]:e"CeedtShe	mesiCeei]]]]],
	&i]t :ireturn1e ( ntioecn]&i]S iCe]dre|-i]dInr
/
]ei]
i]Cini]	iieino i]qioi;i, i	var i,itu"-ni])pr.p]i]4i]qios-ipl":&i]em;
s, leC])pr.s-i]ko the &i]]=,u/n]&i]S ie"CetoSe|ir donte|-i](eiei]Cp,in iC= 
	&i]ei][r*nnbas9p]]eMAiatc"i|]r)run"i:of (oi]]]i,itu"-ni])pr.p]i, iC])pr.s-i]ko the &i]]=&i]c iCeeloatln Vi](eiei]Cpaipr.n Vi](eiei]Cp= 
	&i]ei][i]C e	]]]]]
	ri:el) &r]rCac)p
iyi]CeeieShe	mesiCeei]]p]i, iC])pr&i]C	 ||"(&i]]]]eext,|	]];a	1ia];
s,S]iditc ]r)eetci]&i]]]]reetu"i]C  e	]]]]]reetu"][i]C e	]]]
iyi]Cee]C e|-i]C
// E- &r]rCa|-i]C
/iC])pr&i]C	iimecn]&i]S iCee( i]taat&iiCee"Cee( i]taat&i]ei][i]Cini]E- &)rut]en( u"][i]C"(eiei]yi]Cee]C e|-i]C
/reet|* ]rCa|--
iyi]Ce"]:e"Ce]pai)rut]en( u"][i]C"(eiei]yi]Cee]C e|-i]C
/reet|* ]rCFi"no	ex

i]C	iimecn]&i
		r
s, "(&i]Ce"]:enhea]/ree:r,&e"Ce]nri]]		e"]:e"Ce"Ce
si]]paiC
/reet|(oi]Ceetiyi]Ciyi]Ciyi

siC}ei]]p=im iC]dud&i]Cs99)"(&i]]]]ee,
	|f]]	a	1ia]ioec	]i;i,  ]rte	, i]&i]]]]r)run"i]Ce e ]]]]]i:	}r 
		fi]Ceeui]ei]]p]i,un"icttr]=,

eli]ei]]em;
epr
		i]rni]&i]]]]e i]&i]]]]r)run"i]Ce e ]]]]]i:	}r 
		fi]Ceeui]ei]]p]i,un"icttr]=,

elni]Ceeui]i;i,)eetci]&i]]]]reetu"i: 
		fi]]]p]i,n( nhp]]]r)	]c		rtwweon i]]emin pe"Cemeivi, iC])i}r 
		fi]Che	me		,-i](eiei]Cpmini]CeeuetoSe|--	1i i
)eetci]&i]]]i,n(	e( nhe]Ceegi]e"]pi]e"(eceu:i]]]]reetu"i: 
		fi]]]p-	1i i
i]pi]r)e"]pi]e:i]]]]reetu"i
epr
		i]rni]&ii]e:i]]]C e|-i]C
/rhetA"(&i]]]]]m;
:
		i |-tioeetcooSe|--	1i i
C)ee(]]]]]i:sH:) &r]r]]]p]i]4i]
 aie]C	 ||"(&i]]"]]]] nhe]Cee	// Wr|
rconnle|-s,  ] =|
rconnle|-i](ei]Cs}r 
		fi]Ceeui""(&i]]]]]m;
:iyi]C[2]>;
	ekiq pe"C} nhvii iCnt i
)])ee(&i]]]]]ma	1i i
C)ee(]]]]]i:sH:) &r]rFange&i]e doatcndi]e":e"Cee(pi]Cid:ri toroeck"(&i]]]]]tm;&i]; iCeedeNa-a V	](eiei]Cpai		ua V	](eiein 
		fi |-s,  ] eiei]Cp;iti]Ceelee,
	]Ceeoidit iiatc"ioiiim i]Cee(i]Cpmin nt&i]a iC};a]doat nhpnSn thep]i]i;i,)e]:e"Cee(p ne	, siCeei]]]]]tm;&i]; :dih :
	1edeNnm;
s,n]&i]  iCe]	ue|-i]	
	r	v
]ei][i]Cini]Eiiein  i]	ioidit iiatc"i,i : =
i]pthep]i]4i]	ios-iquhe&i]e doatch C]pthes-i]r	false&i]]]t)	n]&i]  ie"Ce				|
r	//  e|-i](eiei]Cpti
 iC]tla&i]ei]ko*
n			 p]]eMAuOrd"i|]reetu"i: 
		fi]]]i,i : =
i]pthep]it iC]pthes-i]r	false&i]]]&i]t iCeeto =rs Vi](eiei]Cpaithes Vi](eiei]Cp]tla&i]ei]ki]C)e	]]]]]m;ri:oer(&	]| eeepmini]Ceeie ne	, siCeei]]p]it iC]pth&i]ChetA"(&i]]]]etoSe|i]]
a	1ia]doat ]iti= 	]r
e	= i]&i]]]]r 
		"i]Cc)e	]]]]]r 
		"]ki]C)e	]]]mini]Cee]C)e|-i]C	var -(&	]| e|-i]C	viC]pth&i]Ch;i, ,n]&i]  iCee= i]	( =&iiCee"Cee= i]	( =&i]ei]ki]Ci
i] -(&eets]e				"]ki]C"(eiei]ni]Cee]C)e|-i]C	vr 
	|* ]| e|--mini]Ce"]:e"Ce]rnieets]e				"]ki]C"(eiei]ni]Cee]C)e|-i]C	vr 
	|* ]| Fi"nohe	mei]Ch;i, ,n]&ieerroatc"(&i]Ce"]:eoec	]vr 
:) &e"Ce]rri]]==e"]:e"Ce"Cem3i]]rniC	vr 
	|	fi]Ceeuini]Cini]CinimesiCeei]]p]i, iC])pr&i]C	 ||"(&i]]]]eext,|	]];a	1ia];
s,S]iditc ]r)eetci]&i]]]]reetu"i]C  e	]]]]]i:tuyp});ei]Cee	i]ei]]p]ittu"ic ) ]]tm	 :i]ei]]dos[dpr			i]opi]&i]]]]eci]&i]]]]reetu"i]C  e	]]]]]i:tuyp});ei]Cee	i]ei]]p]ittu"ic ) ]]tm	 :ni]Cee	i]idit
e	= i]&i]]]]r 
		"i:p});ei]]]p]itntioep]]]re	]etars99 'rti]]e,in pe"Ce, ivit iC]piuyp});ei]Cne	, get-i](eiei]Cp,ini]Cee	e				|--	1iiim
e	= i]&i]]]itnt	etioec]Cee	i]e"]
i]C"(eangei]]]]r 
		"i:p});ei]]]p-	1iiimi]
 ]ree"]
i]Cei]]]]r 
		"i[dpr			i]opi]&ii]Cei]]]C)e|-i]C	vrnhed"(&i]]]]],
					i |-m;
e	= o			|--	1iiimCe e ]]]]]i:	}:r(&	]|]]]p]i]4i][cai ]ChetA"(&i]]"]]]]ioec]Ceecked"	|	rnecth |-atc don|	rnecthe|-i](ei]C	uyp});ei]Cee	i""(&i]]]]],
		ini]Cck 
am;e"i	 pe"Ceioevi; iCn iim
]p e(&i]]]]],a	1iiimCe e ]]]]]i:	}:r(&	]|ar ) &i]ettr = ngi]e":e"Cee=qi]Ci;:;

		r
s, "(&i]]]]]=,
&i]s iCeegumeAe Vi](eiei]Cpai			e Vi](eieinp});ei |-atc doeiei]Cp
iyi]Ceeteext,]Ceeoiti= iuOrd"ioi;i, i]Cee=i]Cp,intn=&i]t iCe;a]tr =ioepn nssiap]i]idit
e]:e"Cee=qioeetcsiCeei]]]]]=,
&i]s :FuQS			1egumn doatn]&i]i iCe]c)e|-i]c		ria
]ei]ki]Ci
i] iieinp i]Sioiti= iuOrd"i,iS			mi]
siap]i]4i]Sios-i		l &i]ettr = ouC]
sias-i]dIndex &i]]]=e&n]&i]i ie"Ceer )|	rckedNe|-i](eiei]Cp=im iC]dud&i]ei]r	*mn Shep]]eMA)run"i|]r 
		"i:p});ei]]]i,iS			mi]
siap]i= iC]
sias-i]dIndex &i]]]&i]p iCeeutr]]> Vi](eiei]Cpaisia> Vi](eiei]Cp]dud&i]ei]ri]Cmeg]]]]],
ri:qc e&i]t iC p,ini]CeeieioeetcsiCeei]]p]i= iC]
si&i]Cnhed"(&i]]]]e				|
]]ma	1ia]tr =i]iyi]tc]r	eE]ti]&i]]]]rcdir"i]Ctmeg]]]]]rcdir"]ri]Cmeg]]],ini]Cee]Cme|-i]Ciatc"-e&i]t i|-i]CiaiC]
si&i]Cnditctn]&i]i iCeef i]npr]&iiCee"Ceef i]npr]&i]ei]ri]Cimi]"-e& 
	p]ecumr"]ri]C"(eiei]ni]Cee]Cme|-i]Ciarcdi|* ]t i|--,ini]Ce"]:e"Ce]opi 
	p]ecumr"]ri]C"(eiei]ni]Cee]Cme|-i]Ciarcdi|* ]t Fi"none	, i]Cnditctn]&i  ]rr = "(&i]Ce"]:e
s,S]arcd:r(&e"Ce]hri]]":e"]:e"Ce"Ce, i]]opiCiarcdi|;ei]Cee	ini]Cini]Cini, siCeei]]p]it iC]pth&i]ChetA"(&i]]]]etoSe|i]]
a	1ia]doat ]iti= 	]r
e	= i]&i]]]]r 
		"i]Cc)e	]]]]]i: :, +;
di]Ceedi]ei]]p]i=		"inNon]]=,
a:i]ei]]markipre =i]nli]&i]]]]e i]&i]]]]r 
		"i]Cc)e	]]]]]i: :, +;
di]Ceedi]ei]]p]i=		"inNon]]=,
a:ni]Ceedi]iti=	eE]ti]&i]]]]rcdir"i: +;
di]]]p]i=nm;
sp]]]r 	]C);r	 |(chei]]eti
 pe"Cetcivi= iC]
i:, +;
di]Coeetc		=-i](eiei]Cpti
i]Ceedeer )|--	1i;i,	eE]ti]&i]]]i=nm	em;
s,]Ceeoi]e"][i]C"(er ) i]]]]rcdir"i: +;
di]]]p-	1i;i,i][r]r e"][i]C i]]]]rcdir"ikipre =i]nli]&ii]C i]]]Cme|-i]Ciaroeck"(&i]]]]]tm;pe =i |- doeE]tor )|--	1i;i,C  e	]]]]]i:tu: e&i]t]]]p]i]4i]k air]Cnhed"(&i]]"]]]];
s,]Ceeconnei|;rion(ou|- = 	// |;rion(oe|-i](ei]Ch:, +;
di]Ceedi""(&i]]]]]tm;pini]Code	s,
e iS pe"Ce;
svid iC

;i,	]
ee(&i]]]]]ta	1i;i,C  e	]]]]]i:tu: e&i]t 1cr	&i]etypr]tn	i]e":e"Ceef	i]Cia: Aeerroatc"(&i]]]]]]tm&i]3 iCee			}ci Vi](eiei]Cpai
		i Vi](eiein +;
di |- = 	//eiei]Cpmini]CeeuetoSe]Ceeoiyi] i)run"ioidit i]Ceefi]Cpti
rn]&i]; iCe;a]ypr];
spnin.puOp]i]iti=	e]:e"Ceef	;
e	= siCeei]]]]]]tm&i]3 :meenpe 1e			nttr =n]&i]; iCe]eee|-i]etaruO
]ei]ri]Cimi]"iiein  i] ioiyi] i)run"i,inp ),i][puOp]i]4i] ios-iSh		&i]etypr]toeC][puOs-i]	
					&i]]]] nn]&i]; ie"Ce ] =|
rconnle|-i](eiei]Cp]i, iC])pr&i]ei]dI*,n( nhp]]eMAeetu"i|]rcdir"i: +;
di]]]i,inp ),i][puOp]i] iC][puOs-i]	
					&i]]]&i]q iCee	}	] 
 Vi](eiei]CpaipuO
 Vi](eiei]Cp])pr&i]ei]di]C}e/]]]]]tmri:of	i&i]o iC pti
i]Ceeie;
e	= siCeei]]p]i] iC][pu&i]Coeck"(&i]]]]eer )|	]],a	1ia]ypr];]ini]dc]rie ]di]&i]]]]rtwww"i]Cs}e/]]]]]rtwww"]di]C}e/]]]ti
i]Cee]C}e|-i]CuOrd"-i&i]o i|-i]CuOiC][pu&i]Coti= =n]&i]; iCeecti]/]	]&iiCee"Ceecti]/]	]&i]ei]di]Ci,i]"-i&cdi}]eibuw"]di]C"(eiei]
i]Cee]C}e|-i]CuOrtww|* ]o i|--ti
i]Ce"]:e"Ce]nlicdi}]eibuw"]di]C"(eiei]
i]Cee]C}e|-i]CuOrtww|* ]o Fi"nooeetci]Coti= =n]&ic drpr]t"(&i]Ce"]:eoat ]Ortw: e&e"Ce]ori]]t:e"]:e"Ce"Cet}i]]nliCuOrtww|
di]Ceedi
i]Ci
i]Ci
itcsiCeei]]p]i= iC]
si&i]Cnhed"(&i]]]]e				|
]]ma	1ia]tr =i]iyi]tc]r	eE]ti]&i]]]]rcdir"i]Ctmeg]]]]]i:S	he&ammi]Cee(i]ei]]p]i]ir"iilen]]]t	p:i]ei]]eturtpron"i] ei]&i]]]]eti]&i]]]]rcdir"i]Ctmeg]]]]]i:S	he&ammi]Cee(i]ei]]p]i]ir"iilen]]]t	p:ni]Cee(i]iyi]ie ]di]&i]]]]rtwww"i:e&ammi]]]p]i]n doap]]]rc	]C
/rhet-io i]]e=im pe"Ce= ivi] iC][i	he&ammi]C
e	=  E]-i](eiei]Cp=imi]Cee(e ] =|--	1iditie ]di]&i]]]i]n 	e doat]Ceehi]e"]ki]C"(e1cr	i]]]]rtwww"i:e&ammi]]]p-	1iditi]ko]rce"]ki]C	i]]]]rtwww"irtpron"i] ei]&ii]C	i]]]C}e|-i]CuOr
s, "(&i]]]]]=,
ton"i |-ttre ]do] =|--	1iditCc)e	]]]]]i: ::	i&i]o]]]p]i]4i]r ai
]Coeck"(&i]]"]]]]doat]Ceenectei|
r remoe|-r]tcked|
r remoe|-i](ei]Cn	he&ammi]Cee(i""(&i]]]]]=,
ti
i]C ataatme i  pe"Cedoavit iCmediti][de(&i]]]]]=a	1iditCc)e	]]]]]i: ::	i&i]ofu |m&i]eont	]dnoi]e":e"CeecSi]Cis:ch  ]rr = "(&i]]]]]]=,&i]  iCeeom co, Vi](eiei]Cpailan, Vi](eieine&ammi |-r]tckeeiei]Cp,ini]Cee	e				]Ceeoini] ieetu"ioiti= i]Ceeci]Cp=imun]&i]s iCe;a]nt	]doapn;n	})rp]i]iyi]ie]:e"CeecSdoeE]tsiCeei]]]]]]=,&i]  :ntugton1eom ntypr]n]&i]d iCe]C e|-i]C);r)r
]ei]di]Ci,i]"iieine i]iioini] ieetu"i,igtmeti]k})rp]i]4i]iios-i nem&i]eont	]dteC]k})rs-i]c						&i]]]] tn]&i]d ie"Ce don|	rnecthe|-i](eiei]Cp]it iC]pth&i]ei]	
*tntioep]]eMA 
		"i|]rtwww"i:e&ammi]]]i,igtmeti]k})rp]i] iC]k})rs-i]c						&i]]]&i]	 iCeed i]e	 Vi](eiei]Cpai})r	 Vi](eiei]Cp]pth&i]ei]	i]Cee ]]]]]=,ri: 


&i]e iC)p=imi]CeeiedoeE]tsiCeei]]p]i] iC]k})&i]C
s, "(&i]]]]e ] =|
]]ta	1ia]nt	]d]ini])n]rue"])i]&i]]]]rs99)"i]C	ee ]]]]]rs99)"]	i]Cee ]]]=imi]Cee]Cee|-i]C)run"-
&i]e i|-i]C)riC]k})&i]C
yi]t]n]&i]d iCee ci]nCi]&iiCee"Cee ci]nCi]&i]ei]	i]Citi]"-
&twws]ee,
)"]	i]C"(eiei]mi]Cee]Cee|-i]C)rrs99|* ]e i|--=imi]Ce"]:e"Ce] eitwws]ee,
)"]	i]C"(eiei]mi]Cee]Cee|-i]C)rrs99|* ]e Fi"no
e	= i]C
yi]t]n]&i 	/rt	]d"(&i]Ce"]:er =i]rrs9:	i&e"Ce]
ri]]toe"]:e"Ce"Ce=ci]] eiC)rrs99|mmi]Cee(imi]Cimi]Cimi= siCeei]]p]i] iC][pu&i]Coeck"(&i]]]]eer )|	]],a	1ia]ypr];]ini]dc]rie ]di]&i]]]]rtwww"i]Cs}e/]]]]]i:npti&s,ei]Cee=i]ei]]p]i]ww"i h )]]]=;d:i]ei]]hIndrprseti]u:i]&i]]]]edi]&i]]]]rtwww"i]Cs}e/]]]]]i:npti&s,ei]Cee=i]ei]]p]i]ww"i h )]]]=;d:ni]Cee=i]ini]ue"])i]&i]]]]rs99)"i:i&s,ei]]]p]i]nttr p]]]rt	]C	vrnhe	;
si]]e]i, pe"Ce]tivi] iC]kipti&s,ei]CoeE]tr ]-i](eiei]Cp]i,i]Cee=e don|--	1iti=ue"])i]&i]]]i]nt	ettr =]Ceeli]e"]ri]C"(eu |mi]]]]rs99)"i:i&s,ei]]]p-	1iti=i]r	]rte"]ri]Cmi]]]]rs99)"idrprseti]u:i]&ii]Cmi]]]Cee|-i]C)rroatc"(&i]]]]]]tmeseti |-type"])odon|--	1iti=Ctmeg]]]]]i:S	:

&i]e]]]p]i]4i]dpai]]C
s, "(&i]]"]]]]tr =]Ceeion( i|mrrentte|-	]dconn|mrrentte|-i](ei]Copti&s,ei]Cee=i""(&i]]]]]]tmeimi]C			( =,e	ii pe"Cetr viy iC, ti=u]kie(&i]]]]]]a	1iti=Ctmeg]]]]]i:S	:

&i]etr {m&i]eon i])nhi]e":e"Cee  i]Cia:irc drpr]t"(&i]]]]]]]t&i]} iCeehes, N Vi](eiei]CpaiudoN Vi](eieini&s,ei |-	]dconeiei]Cpti
i]Ceedeer )]Ceeoini] i 
		"ioiyi] i]Cee i]Cp]i,tn]&i]3 iCe;a]n i]tr pndnaseep]i]ini]ue]:e"Cee  tre ]dsiCeei]]]]]]]t&i]} :xeefese1ehesnont	]n]&i]t iCe]C e|-i]C
/ree
]ei]	i]Citi]"iieini i];ioini] i 
		"i,ifero=i]rseep]i]4i];ios-iioem&i]eon i])eeC]rsees-i]etarget&i]]]])en]&i]t ie"Ce	// |;rion(oe|-i](eiei]Cp]i= iC]
si&i]ei]c	*=nm;
sp]]eMAcdir"i|]rs99)"i:i&s,ei]]]i,ifero=i]rseep]i] iC]rsees-i]etarget&i]]]&i]S iCee( i]ta Vi](eiei]Cpaiseea Vi](eiei]Cp]
si&i]ei]ci]Ceed]]]]]]tri:p}		&i]p iCmp]i,i]Ceeietre ]dsiCeei]]p]i] iC]rse&i]Coatc"(&i]]]]e don|	]]=a	1ia]n i]t]i
i]pi]r)e"]pi]&i]]]]r	 ||"i]Cheed]]]]]r	 ||"]ci]Ceed]]]]i,i]Cee]Cee|-i]Ceetu"-	&i]p i|-i]CeeiC]rse&i]Coni]d]n]&i]t iCeenti]t,i]&iiCee"Ceenti]t,i]&i]ei]ci]Ci=i]"-	&s99h]eext|"]ci]C"(eiei],i]Cee]Cee|-i]Ceer	 ||* ]p i|--]i,i]Ce"]:e"Ce]u:is99h]eext|"]ci]C"(eiei],i]Cee]Cee|-i]Ceer	 ||* ]p Fi"nooeE]ti]Coni]d]n]&itckr i])"(&i]Ce"]:epr];]er	 :

&e"Ce] ri]]mee"]:e"Ce"Ce]ti]]u:iCeer	 ||,ei]Cee=i,i]Ci,i]Ci,i]tsiCeei]]p]i] iC]k})&i]C
s, "(&i]]]]e ] =|
]]ta	1ia]nt	]d]ini])n]rue"])i]&i]]]]rs99)"i]C	ee ]]]]]i:gtue&athi]Ceefi]ei]]p]i]9)"irout]]]]
;:i]ei]]{
		uprecti]gei]&i]]]]e)i]&i]]]]rs99)"i]C	ee ]]]]]i:gtue&athi]Ceefi]ei]]p]i]9)"irout]]]]
;:ni]Ceefi]ini])e"]pi]&i]]]]r	 ||"i:e&athi]]]p]i]ntyprp]]]rs	]Ciaroec(s ni]]e]it pe"Ce]divi] iC]ritue&athi]Cre ]dc"]-i](eiei]Cp]iti]Ceefe	// |--	1iyi])e"]pi]&i]]]i]nt	etypr]]Ceeti]e"]di]C"(er {mi]]]]r	 ||"i:e&athi]]]p-	1iyi]i]dI]rse"]di]Cmi]]]]r	 ||"i	uprecti]gei]&ii]Cmi]]]Cee|-i]Ceerr = "(&i]]]]]]=,lecti |-onte"]po// |--	1iyi]Cs}e/]]]]]i:np:		&i]p]]]p]i]4i]	paia]Coatc"(&i]]"]]]]ypr]]Cee remoi|,ro thee|-i])nect|,ro thee|-i](ei]C
tue&athi]Ceefi""(&i]]]]]]=,li,i]Clanpr]te
i; pe"Ceyprvin iCtcyi])]rte(&i]]]]]]a	1iyi]Cs}e/]]]]]i:np:		&i]p;
pn"&i]e;

i]pnli]e":e"Ceenii]Ci :di 	/rt	]d"(&i]]]]]]]=&i]c iCeeloatln Vi](eiei]Cpaipr.n Vi](eieine&athi |-i])neceiei]Cp=imi]Cee(e ] =]Ceeoi
i] icdir"ioini] i]Ceeni]Cp]it	n]&i]  iCe;a]

i]yprpntnsh 
p]i]ini])e]:e"Ceeniype"])siCeei]]]]]]]=&i]c :(mlelec1eloanon i]n]&i]y iCe]C)e|-i]C	vr 

]ei]ci]Ci=i]"iieine i]dioi
i] icdir"i,iel	i]i]dh 
p]i]4i]dios-i;
 "&i]e;

i]p eC]dh 
s-i]C);
			&i]]]]mtn]&i]y ie"Cecked|
r remoe|-i](eiei]Cp]i] iC][pu&i]ei]et*]n doap]]eMAtwww"i|]r	 ||"i:e&athi]]]i,iel	i]i]dh 
p]i] iC]dh 
s-i]C);
			&i]]]&i]  iCee= i]	( Vi](eiei]Cpaih 
( Vi](eiei]Cp][pu&i]ei]ei]Ceeg]]]]]]=ri: +;
&i]a iC}p]iti]Ceeieype"])siCeei]]p]i] iC]dh &i]Cr = "(&i]]]]e	// |;]]]a	1ia]

i]y]imi]
 ]ree"]
i]&i]]]]rhetA"i]Cneeg]]]]]rhetA"]ei]Ceeg]]]]iti]Cee]Cee|-i]C 
		"-
&i]a i|-i]C 
iC]dh &i]Crni])]n]&i]y iCee.pi]n i]&iiCee"Cee.pi]n i]&i]ei]ei]Ci]i]"-
&	 |n]etoSA"]ei]C"(eiei]ti]Cee]Cee|-i]C 
rhet|* ]a i|--]iti]Ce"]:e"Ce]gei	 |n]etoSA"]ei]C"(eiei]ti]Cee]Cee|-i]C 
rhet|* ]a Fi"nore ]di]Crni])]n]&idcor
i]p"(&i]Ce"]:et	]d]
rhe:		&e"Ce]pri]].ne"]:e"Ce"Ce]pi]]geiC 
rhet|thi]Ceefiti]Citi]Citi]dsiCeei]]p]i] iC]rse&i]Coatc"(&i]]]]e don|	]]=a	1ia]n i]t]i
i]pi]r)e"]pi]&i]]]]r	 ||"i]Cheed]]]]]i:fer,& ={i]Ceeci]ei]]p]i]||"iooeD]]]]ma:i]ei]]rCac)prNami]) i]&i]]]]epi]&i]]]]r	 ||"i]Cheed]]]]]i:fer,& ={i]Ceeci]ei]]p]i]||"iooeD]]]]ma:ni]Ceeci]i
i]ee"]
i]&i]]]]rhetA"i:,& ={i]]]p]i]nont	p]]]r		]CuOr
s, upai]]e]i= pe"Ce])ivi] iC]dier,& ={i]Cpe"])d"]-i](eiei]Cp]i=i]Ceececked|--	1ini]ee"]
i]&i]]]i]no	eont	]]Ceeui]e"]	i]C"(e
pn"i]]]]rhetA"i:,& ={i]]]p-	1ini]i]	
]r	e"]	i]C"i]]]]rhetA"ic)prNami]) i]&ii]C"i]]]Cee|-i]C 
rpr]t"(&i]]]]]]]teNami |-on e"]
oked|--	1ini]C	ee ]]]]]i:gt:;
&i]a]]]p]i]4i]cpaip]Cr = "(&i]]"]]]]nt	]]CeerentNi|tr	fal e|-i]pion(|tr	fal e|-i](ei]Coer,& ={i]Ceeci""(&i]]]]]]]teiti]C		/]	]=e	id pe"Cent	vin iC= ni]e]dre(&i]]]]]]a	1ini]C	ee ]]]]]i:gt:;
&i]atope &i]eamei]
nti]e":e"Cee.;i]Cir:Futckr i])"(&i]]]]]]]]&i]t iCeeto =rs Vi](eiei]Cpaithes Vi](eiein,& ={i |-i]pioneiei]Cp]i,i]Cee=e don]Ceeoimi] itwww"ioini] i]Cee.i]Cp]i=in]&i]} iCe;a]mei]nt	pnynuncdp]i]i
i]ee]:e"Cee.;nte"]psiCeei]]]]]]]]&i]t :		soeNa1eto n;

i]n]&i]n iCe]Cme|-i]Ciarcd
]ei]ei]Ci]i]"iiein, i]tioimi] itwww"i,ioe		]i]	ncdp]i]4i]tios-idor &i]eamei]
eeC]	ncds-i]C
// Ea&i]]]]}on]&i]n ie"Ceconn|mrrentte|-i](eiei]Cp]i] iC]k})&i]ei]C)*]nttr p]]eMAs99)"i|]rhetA"i:,& ={i]]]i,ioe		]i]	ncdp]i] iC]	ncds-i]C
// Ea&i]]]&i]i iCeef i]np Vi](eiei]Cpaincdp Vi](eiei]Cp]k})&i]ei]Ci]Cee	]]]]]]]ri:e&
	&i]t iCep]i=i]Ceeiente"]psiCeei]]p]i] iC]	nc&i]Cpr]t"(&i]]]]ecked|
]]]a	1ia]mei]n]i,i][r]r e"][i]&i]]]]rnhed"i]Coee	]]]]]rnhed"]Ci]Cee	]]]]i=i]Cee]Cee|-i]Ccdir"-	&i]t i|-i]CcdiC]	nc&i]Cp
i]p]n]&i]n iCeetci]rti]&iiCee"Ceetci]rti]&i]ei]Ci]Ci]i]"-	&hetl]e			d"]Ci]C"(eiei]=i]Cee]Cee|-i]Ccdrnhe|* ]t i|--]i=i]Ce"]:e"Ce]) ihetl]e			d"]Ci]C"(eiei]=i]Cee]Cee|-i]Ccdrnhe|* ]t Fi"nope"])i]Cp
i]p]n]&i)nerei]
"(&i]Ce"]:e i]t]drnh:;
&e"Ce]rri]]one"]:e"Ce"Ce]qi]]) iCcdrnhe|={i]Ceeci=i]Ci=i]Ci=i])siCeei]]p]i] iC]dh &i]Cr = "(&i]]]]e	// |;]]]a	1ia]

i]y]imi]
 ]ree"]
i]&i]]]]rhetA"i]Cneeg]]]]]i:el) &r]ri]Cee i]ei]]p]i]tA"i	te(]]]],s:i]ei]]| eeeprto.i]r	i]&i]]]]e
i]&i]]]]rhetA"i]Cneeg]]]]]i:el) &r]ri]Cee i]ei]]p]i]tA"i	te(]]]],s:ni]Cee i]imi] e"][i]&i]]]]rnhed"i: &r]ri]]]p]i]non ip]]]rh	]C)rroatpfrni]]e]i] pe"Ce]pivi] iC]	il) &r]ri]Cte"]pn"]-i](eiei]Cp]i]i]Cee econn|--	1ini] e"][i]&i]]]i]no	eon i]]Cee	i]e"]ci]C"(eope i]]]]rnhed"i: &r]ri]]]p-	1ini]i]c	]rhe"]ci]C i]]]]rnhed"ieeprto.i]r	i]&ii]C i]]]Cee|-i]Ccdrt	]d"(&i]]]]]]]=cto.i |-;

e"][oonn|--	1ini]Cheed]]]]]i:fe:
	&i]t]]]p]i]4i]epai	]Cpr]t"(&i]]"]]]]n i]]Ceeo thei|=rIndeee|-i]
 rem|=rIndeee|-i](ei]Crl) &r]ri]Cee i""(&i]]]]]]]=ci=i]CtonCi]]e;it pe"Cen ivi
 iC]tni] ]	ue(&i]]]]]]a	1ini]Cheed]]]]]i:fe:
	&i]tdtp}	&i]es, i][nui]e":e"Ceetdi]Ci	:medcor
i]p"(&i]]]]]]]]&i]p iCeeutr]]> Vi](eiei]Cpaisia> Vi](eiein &r]ri |-i]
 reeiei]Cp]iti]Ceefe	// ]Ceeoi,i] is99)"ioi
i] i]Ceeti]Cp]i]wn]&i]c iCe;a], i]n ipnnniltwp]i]imi] e]:e"Ceetdn e"]
siCeei]]]]]]]]&i]p :tonqcto1eutrnamei]n]&i]n iCe]C}e|-i]CuOrtw
]ei]Ci]Ci]i]"iiein  i]yioi,i] is99)"i,iqc	u]i]cltwp]i]4i]yios-itr
	&i]es, i][deC]cltws-i]C	var d&i]]]]ecn]&i]n ie"Cenect|,ro thee|-i](eiei]Cp]i] iC]rse&i]ei]C
*]ntyprp]]eMA	 ||"i|]rnhed"i: &r]ri]]]i,iqc	u]i]cltwp]i] iC]cltws-i]C	var d&i]]]&i]; iCeecti]/] Vi](eiei]Cpailtw] Vi](eiei]Cp]rse&i]ei]Ci]Ceeo]]]]]]]ri:i&m;&i]; iCep]i]i]Ceeien e"]
siCeei]]p]i] iC]clt&i]Ct	]d"(&i]]]]econn|m]]]a	1ia], i]n]iti]ko]rce"]ki]&i]]]]roeck"i]C
eeo]]]]]roeck"]Ci]Ceeo]]]]i]i]Cee]Cee|-i]Ctwww"-;&i]; i|-i]CtwiC]clt&i]Ctmi]
]n]&i]n iCee/ i]hei]&iiCee"Cee/ i]hei]&i]ei]Ci]Ci]i]"-;&nhea]eer k"]Ci]C"(eiei]]i]Cee]Cee|-i]Ctwroec|* ]; i|--]i]i]Ce"]:e"Ce]r	inhea]eer k"]Ci]C"(eiei]]i]Cee]Cee|-i]Ctwroec|* ]; Fi"note"]pi]Ctmi]
]n]&ipior i]["(&i]Ce"]:e
i]y]wroe:
	&e"Ce]ori]]fTe"]:e"Ce"Ce]	i]]r	iCtwroec|]ri]Cee i]i]Ci]i]Ci]i]psiCeei]]p]i] iC]	nc&i]Cpr]t"(&i]]]]ecked|
]]]a	1ia]mei]n]i,i][r]r e"][i]&i]]]]rnhed"i]Coee	]]]]]i:oer(&	]|i]Ceeni]ei]]p]i]ed"iIeel]]]]ta:i]ei]]t iC pr (oi]|mi]&i]]]]e[i]&i]]]]rnhed"i]Coee	]]]]]i:oer(&	]|i]Ceeni]ei]]p]i]ed"iIeel]]]]ta:ni]Ceeni]i,i]ce"]ki]&i]]]]roeck"i:(&	]|i]]]p]i]n;

ip]]]rn	]Ceerr =lnopi]]e]i] pe"Ce]
ivi] iC]cier(&	]|i]C e"]
u"]-i](eiei]Cp]i]i]Ceenenect|--	1i
i]ce"]ki]&i]]]i]n;	e;

i]]Ceedi]e"]ei]C"(etp}	i]]]]roeck"i:(&	]|i]]]p-	1i
i]i]et]rne"]ei]C	i]]]]roeck"iC pr (oi]|mi]&ii]C	i]]]Cee|-i]Ctwr i])"(&i]]]]]]]]f (oi |-amee"]koect|--	1i
i]Cneeg]]]]]i:el:m;&i];]]]p]i]4i]Cpai
]Ct	]d"(&i]]"]]]]

i]]Cee	falsi|]r
			de|-i][rent|]r
			de|-i](ei]Cper(&	]|i]Ceeni""(&i]]]]]]]]fi]i]Cect,i]]e
iy pe"Ce

ivim iC]d
i]c]c)e(&i]]]]]]a	1i
i]Cneeg]]]]]i:el:m;&i];)epk &i]eatci]kn	i]e":e"Cee/ti]Cii:nt)nerei]
"(&i]]]]]]]]&i]q iCee	}	] 
 Vi](eiei]CpaipuO
 Vi](eiein(&	]|i |-i][reneiei]Cp]i=i]Ceececked]Ceeoiti] i	 ||"ioimi] i]Cee/i]Cp]i]9n]&i]t iCe;a]tci]

ipnnnbas9p]i]i,i]ce]:e"Cee/t

e"][siCeei]]]]]]]]&i]q :sH of (1e	}	ns, i]n]&i]
 iCe]Cee|-i]C)rrs9
]ei]Ci]Ci]i]"iiein( i]nioiti] i	 ||"i,iof		]i]eas9p]i]4i]nios-iyp] &i]eatci]kieC]eas9s-i]Ciatc"/&i]]]]e/n]&i]
 ie"Ceion(|tr	fal e|-i](eiei]Cp]i] iC]dh &i]ei]C	*]nont	p]]eMAhetA"i|]roeck"i:(&	]|i]]]i,iof		]i]eas9p]i] iC]eas9s-i]Ciatc"/&i]]]&i]d iCee ci]nC Vi](eiei]Cpaias9C Vi](eiei]Cp]dh &i]ei]Ci]Ceeh]]]]]]]ri:e&,
&i]s iCep]i]i]Ceeie

e"][siCeei]]p]i] iC]eas&i]C i])"(&i]]]]enect|,]]]a	1ia]tci]
]i=i]r	]rte"]ri]&i]]]]r
s, "i]Coeeh]]]]]r
s, "]Ci]Ceeh]]]]i]i]Cee]Cee|-i]Cs99)"-
&i]s i|-i]Cs9iC]eas&i]C ,i][]n]&i]
 iCeecoi]o i]&iiCee"Ceecoi]o i]&i]ei]Ci]Ci]i]"-
&oec	]e ]  "]Ci]C"(eiei]]i]Cee]Cee|-i]Cs9r
s,|* ]s i|--]i]i]Ce"]:e"Ce]|mioec	]e ]  "]Ci]C"(eiei]]i]Cee]Cee|-i]Cs9r
s,|* ]s Fi"no e"]
i]C ,i][]n]&i
 rrci]k"(&i]Ce"]:eei]n]9r
s:m;&e"Ce]nri]]eme"]:e"Ce"Ce]Si]]|miCs9r
s,|]|i]Ceeni]i]Ci]i]Ci]i]
siCeei]]p]i] iC]clt&i]Ct	]d"(&i]]]]econn|m]]]a	1ia], i]n]iti]ko]rce"]ki]&i]]]]roeck"i]C
eeo]]]]]i:qc e&i]ti]Cee.i]ei]]p]i]ck"i
 e ]]]]= :i]ei]]o iC pr		fi]{mi]&i]]]]eki]&i]]]]roeck"i]C
eeo]]]]]i:qc e&i]ti]Cee.i]ei]]p]i]ck"i
 e ]]]]= :ni]Cee.i]iti]te"]ri]&i]]]]r
s, "i:e&i]ti]]]p]i]nameip]]]ro	]C 
rpr]	enli]]e]i] pe"Ce][ivi] iC]eic e&i]ti]C
e"][	"]-i](eiei]Cp]i]i]Cee.eion(|--	1imi]te"]ri]&i]]]i]na	eamei]]Cee(i]e"]Ci]C"(eepk i]]]]r
s, "i:e&i]ti]]]p-	1imi]i]C)]roe"]Ci]C i]]]]r
s, "iC pr		fi]{mi]&ii]C i]]]Cee|-i]Cs9r
i]p"(&i]]]]]]]]
		fi |-s, e"]roon(|--	1imi]Coee	]]]]]i:oe:,
&i]s]]]p]i]4i]Cpai	]C i])"(&i]]"]]]]mei]]CeeIndexi|]r				ie|-i]ko th|]r				ie|-i](ei]Ctc e&i]ti]Cee.i""(&i]]]]]]]]
i]i]Ceon i]]emin pe"Cemeivi, iC])mi]t]eee(&i]]]]]]a	1imi]Coee	]]]]]i:oe:,
&i]sp p"m&i]e = i]rndi]e":e"Ceecyi]Cii:xepior i]["(&i]]]]]]]]&i]	 iCeed i]e	 Vi](eiei]Cpai})r	 Vi](eieine&i]ti |-i]ko teiei]Cp]i]i]Cee econn]Ceeoi=i] ihetA"ioi,i] i]Ceeci]Cp]i]|n]&i]p iCe;a]= i]meipn
n			 p]i]iti]te]:e"Ceecymee"]ksiCeei]]]]]]]]&i]	 :	}r 
		1ed inatci]n]&i]m iCe]Cee|-i]Ceer	 
]ei]Ci]Ci]i]"iieine i]nioi=i] ihetA"i,i 
		]i]C		 p]i]4i]nios-intam&i]e = i]rteC]C		 s-i]CuOrd" &i]]]]eon]&i]m ie"Ce rem|=rIndeee|-i](eiei]Cp]i] iC]	nc&i]ei]Ci*]non ip]]eMAnhed"i|]r
s, "i:e&i]ti]]]i,i 
		]i]C		 p]i] iC]C		 s-i]CuOrd" &i]]]&i]t iCeenti]t, Vi](eiei]Cpai		 , Vi](eiei]Cp]	nc&i]ei]Ci]Ceel]]]]]]]ri:,&tm&i]3 iCep]i]i]Ceeiemee"]ksiCeei]]p]i] iC]C		&i]C
i]p"(&i]]]]eion(|t]]]a	1ia]= i]m]i]i]dI]rse"]di]&i]]]]roatc"i]Creel]]]]]roatc"]Ci]Ceel]]]]i]i]Cee]Cee|-i]C	 ||"-m&i]3 i|-i]C	 iC]C		&i]C
ti]k]n]&i]m iCeeMLi]
si]&iiCee"CeeMLi]
si]&i]ei]Ci]Ci]i]"-m&
s,S]e doc"]Ci]C"(eiei]]i]Cee]Cee|-i]C	 roat|* ]3 i|--]i]i]Ce"]:e"Ce]{mi
s,S]e doc"]Ci]C"(eiei]]i]Cee]Cee|-i]C	 roat|* ]3 Fi"no
e"][i]C
ti]k]n]&i[rer i]r"(&i]Ce"]:e i]n] roa:,
&e"Ce] ri]]doe"]:e"Ce"Ce] i]]{miC	 roat|]ti]Cee.i]i]Ci]i]Ci]i][siCeei]]p]i] iC]eas&i]C i])"(&i]]]]enect|,]]]a	1ia]tci]
]i=i]r	]rte"]ri]&i]]]]r
s, "i]Coeeh]]]]]i:of	i&i]oi]Ceeti]ei]]p]i], "i	ee{]]]]]r:i]ei]]e iC)pr);ei]n"i]&i]]]]eri]&i]]]]r
s, "i]Coeeh]]]]]i:of	i&i]oi]Ceeti]ei]]p]i], "i	ee{]]]]]r:ni]Ceeti]i=i]se"]di]&i]]]]roatc"i:i&i]oi]]]p]i]ns, ip]]]r
	]Ccdrt	]pa ei]]e]i] pe"Ce]kivi] iC]Cif	i&i]oi]Cee"]kr"]-i](eiei]Cp]i]i]Ceete rem|--	1i,i]se"]di]&i]]]i]ns	es, i]]Cee=i]e"]Ci]C"(e p"mi]]]]roatc"i:i&i]oi]]]p-	1i,i]i]C
]r
e"]Ci]Cmi]]]]roatc"iC)pr);ei]n"i]&ii]Cmi]]]Cee|-i]C	 rei]
"(&i]]]]]]]]});ei |-atce"]dorem|--	1i,i]C
eeo]]]]]i:qc:tm&i]3]]]p]i]4i]Cpai	]C
i]p"(&i]]"]]]], i]]Cee
				i|]rtargte|-i]r	fal|]rtargte|-i](ei]C f	i&i]oi]Ceeti""(&i]]]]]]]]}i]i]C 'rti]]e,in pe"Ce, ivit iC]p,i]s]C e(&i]]]]]]a	1i,i]C
eeo]]]]]i:qc:tm&i]3
ep r&i]er]ti]dn(i]e":e"CeeMni]Cii:(m
 rrci]k"(&i]]]]]]]]&i]S iCee( i]ta Vi](eiei]Cpaiseea Vi](eieini&i]oi |-i]r	faeiei]Cp]i]i]Ceenenect]Ceeoi]i] inhed"ioiti] i]CeeMi]Cp]i]tn]&i]q iCe;a]]ti], ipnmn Shep]i]i=i]se]:e"CeeMn, e"]rsiCeei]]]]]]]]&i]S :tuyp});1e( in = i]n]&i], iCe]Cee|-i]C 
rhe
]ei]Ci]Ci]i]"iieini i]
ioi]i] inhed"i,ip}an]i]CShep]i]4i]
ios-in pr&i]er]ti]dreC]CShes-i]C)run"o&i]]]]eon]&i], ie"Cerent|]r
			de|-i](eiei]Cp]i] iC]clt&i]ei]Cu*]n;

ip]]eMAoeck"i|]roatc"i:i&i]oi]]]i,ip}an]i]CShep]i] iC]CShes-i]C)run"o&i]]]&i]y iCee.pi]n  Vi](eiei]CpaiShe  Vi](eiei]Cp]clt&i]ei]Ci]Ceet]]]]]]]ri: &=,&i]  iCep]i]i]Ceeie, e"]rsiCeei]]p]i] iC]CSh&i]Cei]
"(&i]]]]e rem|=]]]a	1ia]]ti],]i]i]	
]r	e"]	i]&i]]]]rr = "i]Cpeet]]]]]rr = "]Ci]Ceet]]]]i]i]Cee]Cee|-i]ChetA"-,&i]  i|-i]CheiC]CSh&i]Ce=i]r]n]&i], iCee

i] ni]&iiCee"Cee

i] ni]&i]ei]Ci]Ci]i]"-,&oat ]e	// "]Ci]C"(eiei]]i]Cee]Cee|-i]Cherr =|* ]  i|--]i]i]Ce"]:e"Ce]n"ioat ]e	// "]Ci]C"(eiei]]i]Cee]Cee|-i]Cherr =|* ]  Fi"noee"]ki]Ce=i]r]n]&iko rti]d"(&i]Ce"]:eci]
]err :tm&e"Ce]uri]]mae"]:e"Ce"Ce]ii]]n"iCherr =|]oi]Ceeti]i]Ci]i]Ci]i]ksiCeei]]p]i] iC]C		&i]C
i]p"(&i]]]]eion(|t]]]a	1ia]= i]m]i]i]dI]rse"]di]&i]]]]roatc"i]Creel]]]]]i: 


&i]ei]Cee/i]ei]]p]i]tc"itder]]]]]	:i]ei]]p iCmpr;
di]e i]&i]]]]edi]&i]]]]roatc"i]Creel]]]]]i: 


&i]ei]Cee/i]ei]]p]i]tc"itder]]]]]	:ni]Cee/i]i]i]	e"]	i]&i]]]]rr = "i:
&i]ei]]]p]i]natcip]]]ro	]Ctwr i]ceu:i]]e]i] pe"Ce]rivi] iC]Ci


&i]ei]C e"]rw"]-i](eiei]Cp]i]i]Cee/erent|--	1iti]	e"]	i]&i]]]i]na	eatci]]Ceefi]e"]Ci]C"(eep ri]]]]rr = "i:
&i]ei]]]p-	1iti]i]C	]roe"]Ci]Cri]]]]rr = "iCmpr;
di]e i]&ii]Cri]]]Cee|-i]Cher i]["(&i]]]]]]]]+;
di |- = e"]	oent|--	1iti]Coeeh]]]]]i:of:=,&i] ]]]p]i]4i]Cpai
]Cei]
"(&i]]"]]]]tci]]Cee					i|]r);
	re|-i]dInde|]r);
	re|-i](ei]C



&i]ei]Cee/i""(&i]]]]]]]]+i]i]C(chei]]eti
 pe"Cetcivi= iC]
ti]	]C e(&i]]]]]]a	1iti]Coeeh]]]]]i:of:=,&i] [dp 	&i]e	]di]	n=i]e":e"Cee
ni]Cii:		[rer i]r"(&i]]]]]]]]&i]  iCee= i]	( Vi](eiei]Cpaih 
( Vi](eiein
&i]ei |-i]dIndeiei]Cp]i]i]Cee.eion(]Ceeoi]i] ioeck"ioi=i] i]Cee
i]Cp]i]en]&i]	 iCe;a]]di]tcipn,n( nhp]i]i]i]	e]:e"Cee
ntce"]dsiCeei]]]]]]]]&i]  : :, +;
1e= inr]ti]n]&i]t iCe]Cee|-i]Ccdrnh
]ei]Ci]Ci]i]"iiein
 i]mioi]i] ioeck"i,i +do]i]C nhp]i]4i]mios-i

		&i]e	]di]	ueC]C nhs-i]Ceetu"	&i]]]]enn]&i]t ie"Ceo th|]r				ie|-i](eiei]Cp]i] iC]eas&i]ei]C)*]nameip]]eMA
s, "i|]rr = "i:
&i]ei]]]i,i +do]i]C nhp]i] iC]C nhs-i]Ceetu"	&i]]]&i]n iCeetci]rt Vi](eiei]Cpai nht Vi](eiei]Cp]eas&i]ei]Ci]Ceeu]]]]]]]ri:(&]t&i]} iCep]i]i]Ceeietce"]dsiCeei]]p]i] iC]C n&i]C i]["(&i]]]]erent|]]]]a	1ia]]di]t]i]i]c	]rhe"]ci]&i]]]]rpr]t"i]Cteeu]]]]]rpr]t"]Ci]Ceeu]]]]i]i]Cee]Cee|-i]Cnhed"-t&i]} i|-i]CnhiC]C n&i]C ]i]d]n]&i]t iCeen i]pai]&iiCee"Ceen i]pai]&i]ei]Ci]Ci]i]"-t&r =i]ecket"]Ci]C"(eiei]]i]Cee]Cee|-i]Cnhrpr]|* ]} i|--]i]i]Ce"]:e"Ce]e ir =i]ecket"]Ci]C"(eiei]]i]Cee]Cee|-i]Cnhrpr]|* ]} Fi"no e"]ri]C ]i]d]n]&ir	frdi]	"(&i]Ce"]:e i]m]hrpr:=,&e"Ce]gri]]ete"]:e"Ce"Ce];i]]e iCnhrpr]|]ei]Cee/i]i]Ci]i]Ci]i]rsiCeei]]p]i] iC]CSh&i]Cei]
"(&i]]]]e rem|=]]]a	1ia]]ti],]i]i]	
]r	e"]	i]&i]]]]rr = "i]Cpeet]]]]]i:p}		&i]pi]Ceeci]ei]]p]i]= "i)ie	]]]]]i:i]ei]]a iC}prammi]}	i]&i]]]]e	i]&i]]]]rr = "i]Cpeet]]]]]i:p}		&i]pi]Ceeci]ei]]p]i]= "i)ie	]]]]]i:ni]Ceeci]i]i]he"]ci]&i]]]]rpr]t"i:	&i]pi]]]p]i]n = ip]]]rr	]Cs9r
i]angei]]e]i] pe"Ce]divi] iC]Ci}		&i]pi]Cce"]d)"]-i](eiei]Cp]i]i]Ceeceo th|--	1i=i]he"]ci]&i]]]i]n 	e = i]]Ceeci]e"]Ci]C"(edp 	i]]]]rpr]t"i:	&i]pi]]]p-	1i=i]i]Ci]rre"]Ci]C	i]]]]rpr]t"iC}prammi]}	i]&ii]C	i]]]Cee|-i]Cnhrci]k"(&i]]]]]]]]&ammi |-r]te"]co th|--	1i=i]Creel]]]]]i: 
:]t&i]}]]]p]i]4i]Cpail]C i]["(&i]]"]]]]= i]]Ceetargei|]r
// ue|-i]	
			|]r
// ue|-i](ei]Ce}		&i]pi]Ceeci""(&i]]]]]]]]&i]i]C-io i]]e=im pe"Ce= ivi] iC][=i]h]C)e(&i]]]]]]a	1i=i]Creel]]]]]i: 
:]t&i]}kip		&i]ei])i]cnfi]e":e"Ceen
i]Cii:toko rti]d"(&i]]]]]]]]&i]i iCeef i]np Vi](eiei]Cpaincdp Vi](eiein	&i]pi |-i]	
		eiei]Cp]i]i]Ceete rem]Ceeoi]i] i
s, "ioi]i] i]Ceeni]Cp]i]cn]&i]S iCe;a]])i]= ipntntioep]i]i]i]he]:e"Ceen
= e"]	siCeei]]]]]]]]&i]i :S	he&am1ef in	]di]n]&i]= iCe]Cee|-i]Ctwroe
]ei]Ci]Ci]i]"iiein	 i],ioi]i] i
s, "i,ie&r.]i]Cioep]i]4i],ios-ime
	&i]ei])i]c)eC]Cioes-i]C 
		"(&i]]]]e	n]&i]= ie"Ce	fal|]rtargte|-i](eiei]Cp]i] iC]C		&i]ei]Ce*]ns, ip]]eMAoatc"i|]rpr]t"i:	&i]pi]]]i,ie&r.]i]Cioep]i] iC]Cioes-i]C 
		"(&i]]]&i]n iCee/ i]he Vi](eiei]Cpaiioee Vi](eiei]Cp]C		&i]ei]Ci]Cee	]]]]]]]ri:e&]=&i]c iCep]i]i]Ceeie= e"]	siCeei]]p]i] iC]Cio&i]Cci]k"(&i]]]]eo th|]]]]a	1ia]])i]=]i]i]et]rne"]ei]&i]]]]rt	]d"i]C ee	]]]]]rt	]d"]Ci]Cee	]]]]i]i]Cee]Cee|-i]Coeck"-=&i]c i|-i]CoeiC]Cio&i]Cc]i]	]n]&i]= iCee		i]rni]&iiCee"Cee		i]rni]&i]ei]Ci]Ci]i]"-=&pr];]econd"]Ci]C"(eiei]]i]Cee]Cee|-i]Coert	]|* ]c i|--]i]i]Ce"]:e"Ce]}	ipr];]econd"]Ci]C"(eiei]]i]Cee]Cee|-i]Coert	]|* ]c Fi"noce"]di]Cc]i]	]n]&idInr)i]c"(&i]Ce"]:eti],]ert	:]t&e"Ce])ri]]hIe"]:e"Ce"Ce]di]]}	iCoert	]|]pi]Ceeci]i]Ci]i]Ci]i]dsiCeei]]p]i] iC]C n&i]C i]["(&i]]]]erent|]]]]a	1ia]]di]t]i]i]c	]rhe"]ci]&i]]]]rpr]t"i]Cteeu]]]]]i: +;
&i]ai]CeeMi]ei]]p]i]]t"i
te ]]]]]i:i]ei]]t iCeprs,ei]k i]&i]]]]eci]&i]]]]rpr]t"i]Cteeu]]]]]i: +;
&i]ai]CeeMi]ei]]p]i]]t"i
te ]]]]]i:ni]CeeMi]i]i]ne"]ei]&i]]]]rt	]d"i:
&i]ai]]]p]i]nr]tip]]]rp	]C	 rei]r ) i]]e]i] pe"Ce]	ivi] iC]Ci+;
&i]ai]C e"]	|"]-i](eiei]Cp]i]i]CeeMe	fal|--	1i]i]ne"]ei]&i]]]i]nr	er]ti]]Cee i]e"]Ci]C"(eip		i]]]]rt	]d"i:
&i]ai]]]p-	1i]i]i]Cu]rpe"]Ci]C	i]]]]rt	]d"iCeprs,ei]k i]&ii]C	i]]]Cee|-i]Coer i]r"(&i]]]]]]]]&s,ei |-	]de"]eofal|--	1i]i]Cpeet]]]]]i:p}:]=&i]c]]]p]i]4i]Cpaiu]Cci]k"(&i]]"]]]]]ti]]Cee);
		i|]r	var)e|-i]c				|]r	var)e|-i](ei]C +;
&i]ai]CeeMi""(&i]]]]]]]]&i]i]C	;
si]]e]i, pe"Ce]tivi] iC]k]i]n]Cme(&i]]]]]]a	1i]i]Cpeet]]]]]i:p}:]=&i]crtp
	&i]ei]pi]enci]e":e"Cee	mi]Cii:sHr	frdi]	"(&i]]]]]]]]&i]; iCeecti]/] Vi](eiei]Cpailtw] Vi](eiein
&i]ai |-i]c			eiei]Cp]i]i]Cee/erent]Ceeoi]i] ioatc"ioi]i] i]Cee	i]Cp]i],n]&i]  iCe;a]]pi]]tipn=nm;
sp]i]i]i]ne]:e"Cee	m]te"]csiCeei]]]]]]]]&i]; :npti&s,1ectini])i]n]&i]] iCe]Cee|-i]Cs9r
s
]ei]Ci]Ci]i]"iiein
 i]tioi]i] ioatc"i,ii&he]i]C;
sp]i]4i]tios-i, 		&i]ei]pi]eeeC]C;
ss-i]Ccdir"(&i]]]]ecn]&i]] ie"CeInde|]r);
	re|-i](eiei]Cp]i] iC]CSh&i]ei]C *]natcip]]eMAr = "i|]rt	]d"i:
&i]ai]]]i,ii&he]i]C;
sp]i] iC]C;
ss-i]Ccdir"(&i]]]&i]
 iCeecoi]o  Vi](eiei]Cpai;
s  Vi](eiei]Cp]CSh&i]ei]Ci]Ceed]]]]]]]ri:i&]]&i]t iCep]i]i]Ceeie]te"]csiCeei]]p]i] iC]C;
&i]C i]r"(&i]]]]e	fal|]]]]a	1ia]]pi]]]i]i]C)]roe"]Ci]&i]]]]r i])"i]C
eed]]]]]r i])"]Ci]Ceed]]]]i]i]Cee]Cee|-i]C
s, "-]&i]t i|-i]C
siC]C;
&i]C ]i]c]n]&i]] iCee		i]opi]&iiCee"Cee		i]opi]&i]ei]Ci]Ci]i]"-]&t	]d]enec)"]Ci]C"(eiei]]i]Cee]Cee|-i]C
sr i]|* ]t i|--]i]i]Ce"]:e"Ce]k it	]d]enec)"]Ci]C"(eiei]]i]Cee]Cee|-i]C
sr i]|* ]t Fi"no e"]	i]C ]i]c]n]&i	
	rpi]e"(&i]Ce"]:edi]t]sr i:]=&e"Ce]rri]]{
e"]:e"Ce"Ce]ti]]k iC
sr i]|]ai]CeeMi]i]Ci]i]Ci]i]	siCeei]]p]i] iC]Cio&i]Cci]k"(&i]]]]eo th|]]]]a	1ia]])i]=]i]i]et]rne"]ei]&i]]]]rt	]d"i]C ee	]]]]]i:e&
	&i]ti]Cee
i]ei]]p]i]]d"i	res]]]]]i:i]ei]]; iCeprathi]"mi]&i]]]]eei]&i]]]]rt	]d"i]C ee	]]]]]i:e&
	&i]ti]Cee
i]ei]]p]i]]d"i	res]]]]]i:ni]Cee
i]i]i]oe"]Ci]&i]]]]r i])"i:	&i]ti]]]p]i]n	]dip]]]rt	]Cher i]1cr	i]]e]i] pe"Ce]civi] iC]Ci&
	&i]ti]Cte"]cA"]-i](eiei]Cp]i]i]Cee
eInde|--	1i]i]oe"]Ci]&i]]]i]n		e	]di]]Ceeni]e"]Ci]C"(etp
	i]]]]r i])"i:	&i]ti]]]p-	1i]i]i]C)]rte"]Ci]C	i]]]]r i])"iCeprathi]"mi]&ii]C	i]]]Cee|-i]C
srti]d"(&i]]]]]]]]&athi |-i])e"]Conde|--	1i]i]Cteeu]]]]]i: +:]]&i]t]]]p]i]4i]Cpaip]C i]r"(&i]]"]]]]]di]]Cee
// Ei|]riatcee|-i]etarg|]riatcee|-i](ei]Cc&
	&i]ti]Cee
i""(&i]]]]]]]]&i]i]C(s ni]]e]it pe"Ce]divi] iC]r]i]o]C}e(&i]]]]]]a	1i]i]Cteeu]]]]]i: +:]]&i]tdrp		&i]ei]
i]Cn i]e":e"Cee	,i]Cii:	}dInr)i]c"(&i]]]]]]]]&i]d iCee ci]nC Vi](eiei]Cpaias9C Vi](eiein	&i]ti |-i]etareiei]Cp]i]i]Ceeceo th]Ceeoi]i] ir = "ioi]i] i]Cee	i]Cp]i]tn]&i]i iCe;a]]
i]]dipn]n doap]i]i]i]oe]:e"Cee	,]de"]esiCeei]]]]]]]]&i]d :gtue&at1e cini]pi]n]&i]] iCe]Cee|-i]C	 roa
]ei]Ci]Ci]i]"iiein	 i]=ioi]i] ir = "i,ie&ia]i]Cdoap]i]4i]=ios-itc		&i]ei]
i]C eC]Cdoas-i]Ctwww"(&i]]]]ein]&i]] ie"Ce
			|]r
// ue|-i](eiei]Cp]i] iC]C n&i]ei]Cc*]n = ip]]eMApr]t"i|]r i])"i:	&i]ti]]]i,ie&ia]i]Cdoap]i] iC]Cdoas-i]Ctwww"(&i]]]&i]m iCeeMLi]
s Vi](eiei]Cpaidoas Vi](eiei]Cp]C n&i]ei]Ci]Cee(]]]]]]]ri:
&]]&i]p iCep]i]i]Ceeie]de"]esiCeei]]p]i] iC]Cdo&i]Cti]d"(&i]]]]eInde|]]]]a	1ia]]
i]]]i]i]C
]r
e"]Ci]&i]]]]r
i]p"i]Ceee(]]]]]r
i]p"]Ci]Cee(]]]]i]i]Cee]Cee|-i]Coatc"-]&i]p i|-i]CoaiC]Cdo&i]Ct]i]e]n]&i]] iCee =i]nli]&iiCee"Cee =i]nli]&i]ei]Ci]Ci]i]"-]& i]t]eionp"]Ci]C"(eiei]]i]Cee]Cee|-i]Coar
i]|* ]p i|--]i]i]Ce"]:e"Ce]"mi i]t]eionp"]Ci]C"(eiei]]i]Cee]Cee|-i]Coar
i]|* ]p Fi"note"]ci]Ct]i]e]n]&ic		r
i]C"(&i]Ce"]:e)i]=]ar
i:]]&e"Ce]|ri]]rCe"]:e"Ce"Ce]yi]]"miCoar
i]|]ti]Cee
i]i]Ci]i]Ci]i]csiCeei]]p]i] iC]C;
&i]C i]r"(&i]]]]e	fal|]]]]a	1ia]]pi]]]i]i]C)]roe"]Ci]&i]]]]r i])"i]C
eed]]]]]i:i&m;&i];i]Ceeni]ei]]p]i]])"iiueB]]]]]i:i]ei]]s iCepr ={i] ri]&i]]]]eCi]&i]]]]r i])"i]C
eed]]]]]i:i&m;&i];i]Ceeni]ei]]p]i]])"iiueB]]]]]i:ni]Ceeni]i]i]
e"]Ci]&i]]]]r
i]p"i:;&i];i]]]p]i]ni])ip]]]r 	]Cnhrci]u |mi]]e]i] pe"Ce]eivi] iC]Ci&m;&i];i]Cde"]ed"]-i](eiei]Cp]i]i]Ceene
			|--	1i]i]
e"]Ci]&i]]]i]ni	ei])i]]Cee.i]e"]Ci]C"(erp		i]]]]r
i]p"i:;&i];i]]]p-	1i]i]i]Ce]r e"]Ci]C	i]]]]r
i]p"iCepr ={i] ri]&ii]C	i]]]Cee|-i]Coardi]	"(&i]]]]]]]]& ={i |-i]pe"]Co			|--	1i]i]C ee	]]]]]i:e&:]]&i]p]]]p]i]4i]Cpait]Cti]d"(&i]]"]]]]])i]]Cee	var i|]ruOrd e|-i]C);
	|]ruOrd e|-i](ei]C &m;&i];i]Ceeni""(&i]]]]]]]]&i]i]C upai]]e]i= pe"Ce])ivi] iC]d]i]
]Cee(&i]]]]]]a	1i]i]C ee	]]]]]i:e&:]]&i]p	up;	&i]ei][i]Cnni]e":e"Cee ti]Cii:tu	
	rpi]e"(&i]]]]]]]]&i]t iCeenti]t, Vi](eiei]Cpai		 , Vi](eiein;&i];i |-i]C);
eiei]Cp]i]i]CeeMe	fal]Ceeoi]i] ipr]t"ioi]i] i]Cee i]Cp]i]=n]&i]; iCe;a]][i]])ipn]nttr p]i]i]i]
e]:e"Cee t])e"]CsiCeei]]]]]]]]&i]t :fer,& =1entini]
i]n]&i]] iCe]Cee|-i]Cherr 
]ei]Ci]Ci]i]"iiein; i]]ioi]i] ipr]t"i,i,&uO]i]Ctr p]i]4i]]ios-i= 
	&i]ei][i]C eC]Ctr s-i]Cs99)"(&i]]]]een]&i]] ie"Ce				|]r	var)e|-i](eiei]Cp]i] iC]Cio&i]ei]Ct*]nr]tip]]eMAt	]d"i|]r
i]p"i:;&i];i]]]i,i,&uO]i]Ctr p]i] iC]Ctr s-i]Cs99)"(&i]]]&i], iCee

i] n Vi](eiei]Cpaitr n Vi](eiei]Cp]Cio&i]ei]Ci]Cee=]]]]]]]ri:	&]]&i]q iCep]i]i]Ceeie])e"]CsiCeei]]p]i] iC]Ctr&i]Cdi]	"(&i]]]]e
			|]]]]a	1ia]][i]]]i]i]C	]roe"]Ci]&i]]]]rei]
"i]C ee=]]]]]rei]
"]Ci]Cee=]]]]i]i]Cee]Cee|-i]Cr = "-]&i]q i|-i]Cr iC]Ctr&i]Cd]i]C]n]&i]] iCeen"i] ei]&iiCee"Ceen"i] ei]&i]ei]Ci]Ci]i]"-]&
i]y]e re
"]Ci]C"(eiei]]i]Cee]Cee|-i]Cr rei]|* ]q i|--]i]i]Ce"]:e"Ce] ri
i]y]e re
"]Ci]C"(eiei]]i]Cee]Cee|-i]Cr rei]|* ]q Fi"node"]ei]Cd]i]C]n]&ietar[i]C"(&i]Ce"]:epi]]] rei:]]&e"Ce]{ri]]| e"]:e"Ce"Ce]ni]] riCr rei]|];i]Ceeni]i]Ci]i]Ci]i]esiCeei]]p]i] iC]Cdo&i]Cti]d"(&i]]]]eInde|]]]]a	1ia]]
i]]]i]i]C
]r
e"]Ci]&i]]]]r
i]p"i]Ceee(]]]]]i:e&,
&i]si]Cee	i]ei]]p]i]]p"iu)ea]]]]]i:i]ei]]3 iCeprr]ri] 	i]&i]]]]eCi]&i]]]]r
i]p"i]Ceee(]]]]]i:e&,
&i]si]Cee	i]ei]]p]i]]p"iu)ea]]]]]i:ni]Cee	i]i]i]oe"]Ci]&i]]]]rei]
"i:
&i]si]]]p]i]ni]pip]]]r
	]Coer i]r {mi]]e]i] pe"Ce]Civi] iC]Ci&,
&i]si]C)e"]Ck"]-i](eiei]Cp]i]i]Cee	e				|--	1i]i]oe"]Ci]&i]]]i]ni	ei]pi]]Ceeti]e"]Ci]C"(eup;	i]]]]rei]
"i:
&i]si]]]p-	1i]i]i]C ]r
e"]Ci]C	i]]]]rei]
"iCeprr]ri] 	i]&ii]C	i]]]Cee|-i]Cr r)i]c"(&i]]]]]]]]&r]ri |-i]
e"]Co			|--	1i]i]C
eed]]]]]i:i&:]]&i]q]]]p]i]4i]Cpais]Cdi]	"(&i]]"]]]]]pi]]Ceeiatc"i|]r)run e|-i]C
// |]r)run e|-i](ei]Ct&,
&i]si]Cee	i""(&i]]]]]]]]&i]i]Cpfrni]]e]i] pe"Ce]pivi] iC]	]i]o]Cee(&i]]]]]]a	1i]i]C
eed]]]]]i:i&:]]&i]qc)p
a&i]ei]ki]Cn.i]e":e"Ceen=i]Cii: :c		r
i]C"(&i]]]]]]]]&i]y iCee.pi]n  Vi](eiei]CpaiShe  Vi](eiein
&i]si |-i]C
//eiei]Cp]i]i]Cee
eInde]Ceeoi]i] it	]d"ioi]i] i]Ceeni]Cp]i]]n]&i]d iCe;a]]ki]]pipn]ntyprp]i]i]i]oe]:e"Ceen=]pe"]CsiCeei]]]]]]]]&i]y :el) &r]1e.pini][i]n]&i]] iCe]Cee|-i]Cnhrpr
]ei]Ci]Ci]i]"iiein
 i]]ioi]i] it	]d"i,i &)r]i]Cyprp]i]4i]]ios-i]tla&i]ei]ki]C)eC]Cyprs-i]C	 ||"(&i]]]]een]&i]] ie"Cetarg|]riatcee|-i](eiei]Cp]i] iC]C;
&i]ei]Cs*]n	]dip]]eMA i])"i|]rei]
"i:
&i]si]]]i,i &)r]i]Cyprp]i] iC]Cyprs-i]C	 ||"(&i]]]&i]t iCeen i]pa Vi](eiei]Cpaiypra Vi](eiei]Cp]C;
&i]ei]Ci]Ceef]]]]]]]ri:
&]]&i]	 iCep]i]i]Ceeie]pe"]CsiCeei]]p]i] iC]Cyp&i]C)i]c"(&i]]]]e				|]]]]a	1ia]]ki]]]i]i]Ci]rre"]Ci]&i]]]]r i]["i]Cceef]]]]]r i]["]Ci]Ceef]]]]i]i]Cee]Cee|-i]Cpr]t"-]&i]	 i|-i]CpriC]Cyp&i]C)]i]C]n]&i]] iCeeeti]u:i]&iiCee"Ceeeti]u:i]&i]ei]Ci]Ci]i]"-]&ei]n]eren["]Ci]C"(eiei]]i]Cee]Cee|-i]Cprr i]|* ]	 i|--]i]i]Ce"]:e"Ce] 	iei]n]eren["]Ci]C"(eiei]]i]Cee]Cee|-i]Cprr i]|* ]	 Fi"no)e"]Ci]C)]i]C]n]&iC);rki]C"(&i]Ce"]:e
i]]]rr i:]]&e"Ce]nri]]t e"]:e"Ce"Ce]ni]] 	iCprr i]|]si]Cee	i]i]Ci]i]Ci]i]CsiCeei]]p]i] iC]Ctr&i]Cdi]	"(&i]]]]e
			|]]]]a	1ia]][i]]]i]i]C	]roe"]Ci]&i]]]]rei]
"i]C ee=]]]]]i:,&tm&i]3i]Cee	i]ei]]p]i]]
"i)ee(]]]]]i:i]ei]]  iCepr	]|i]		i]&i]]]]eCi]&i]]]]rei]
"i]C ee=]]]]]i:,&tm&i]3i]Cee	i]ei]]p]i]]
"i)ee(]]]]]i:ni]Cee	i]i]i]re"]Ci]&i]]]]r i]["i:m&i]3i]]]p]i]ni]
ip]]]re	]C
srti]
pn"i]]e]i] pe"Ce]Civi] iC]Ci&tm&i]3i]Cpe"]C "]-i](eiei]Cp]i]i]Cee	etarg|--	1i]i]re"]Ci]&i]]]i]ni	ei]
i]]Cee/i]e"]Ci]C"(e)p
ai]]]]r i]["i:m&i]3i]]]p-	1i]i]i]Cc]ree"]Ci]Cai]]]]r i]["iCepr	]|i]		i]&ii]Cai]]]Cee|-i]Cprrpi]e"(&i]]]]]]]]&	]|i |-i][e"]Coarg|--	1i]i]Ceee(]]]]]i:e&:]]&i]	]]]p]i]4i]Cpaip]C)i]c"(&i]]"]]]]]
i]]CeeuOrd"i|]reetu)e|-i]C	var|]reetu)e|-i](ei]Cd&tm&i]3i]Cee	i""(&i]]]]]]]]&i]i]Clnopi]]e]i] pe"Ce]
ivi] iC]c]i]r]Cee(&i]]]]]]a	1i]i]Ceee(]]]]]i:e&:]]&i]	eepmd&i]ei]ri]Cnti]e":e"Ceee]i]Cii:S	etar[i]C"(&i]]]]]]]]&i]n iCeetci]rt Vi](eiei]Cpai nht Vi](eieinm&i]3i |-i]C	vaeiei]Cp]i]i]Ceene
			]Ceeoi]i] i i])"ioi]i] i]Ceeei]Cp]i]]n]&i]t iCe;a]]ri]]
ipn]nont	p]i]i]i]re]:e"Ceee]]
e"]CsiCeei]]]]]]]]&i]n :oer(&	]1etcini]ki]n]&i]] iCe]Cee|-i]Coert	
]ei]Ci]Ci]i]"iieinm i]]ioi]i] i i])"i,i(&ee]i]Cnt	p]i]4i]]ios-i]dud&i]ei]ri]CmeC]Cnt	s-i]ChetA"(&i]]]]etn]&i]] ie"Ce);
	|]ruOrd e|-i](eiei]Cp]i] iC]Cdo&i]ei]C	*]ni])ip]]eMA
i]p"i|]r i]["i:m&i]3i]]]i,i(&ee]i]Cnt	p]i] iC]Cnt	s-i]ChetA"(&i]]]&i]= iCee		i]rn Vi](eiei]Cpaint	n Vi](eiei]Cp]Cdo&i]ei]Ci]Ceec]]]]]]]ri:	&]]&i]S iCep]i]i]Ceeie]
e"]CsiCeei]]p]i] iC]Cnt&i]Cpi]e"(&i]]]]etarg|]]]]a	1ia]]ri]]]i]i]Cu]rpe"]Ci]&i]]]]rci]k"i]C eec]]]]]rci]k"]Ci]Ceec]]]]i]i]Cee]Cee|-i]Ct	]d"-]&i]S i|-i]Ct	iC]Cnt&i]Cp]i]C]n]&i]] iCeecti]gei]&iiCee"Ceecti]gei]&i]ei]Ci]Ci]i]"-]& i]n]eo tk"]Ci]C"(eiei]]i]Cee]Cee|-i]Ct	rci]|* ]S i|--]i]i]Ce"]:e"Ce]		i i]n]eo tk"]Ci]C"(eiei]]i]Cee]Cee|-i]Ct	rci]|* ]S Fi"nope"]Ci]Cp]i]C]n]&iC
/rri]C"(&i]Ce"]:e[i]]]	rci:]]&e"Ce]eri]]o e"]:e"Ce"Ce]
i]]		iCt	rci]|]3i]Cee	i]i]Ci]i]Ci]i]CsiCeei]]p]i] iC]Cyp&i]C)i]c"(&i]]]]e				|]]]]a	1ia]]ki]]]i]i]Ci]rre"]Ci]&i]]]]r i]["i]Cceef]]]]]i: &=,&i] i]Cee i]ei]]p]i]]["ie e ]]]]]i:i]ei]]} iCepri]ti]
	i]&i]]]]eCi]&i]]]]r i]["i]Cceef]]]]]i: &=,&i] i]Cee i]ei]]p]i]]["ie e ]]]]]i:ni]Cee i]i]i]pe"]Ci]&i]]]]rci]k"i:,&i] i]]]p]i]ni][ip]]]r 	]Coardi]ope i]]e]i] pe"Ce]Civi] iC]Ci&=,&i] i]C
e"]Cc"]-i](eiei]Cp]i]i]Cee e);
	|--	1i]i]pe"]Ci]&i]]]i]ni	ei][i]]Ceeci]e"]Ci]C"(eepmdi]]]]rci]k"i:,&i] i]]]p-	1i]i]i]Ct]r e"]Ci]Cdi]]]]rci]k"iCepri]ti]
	i]&ii]Cdi]]]Cee|-i]Ct	r
i]C"(&i]]]]]]]]&i]ti |-i]ke"]Co;
	|--	1i]i]C ee=]]]]]i:,&:]]&i]S]]]p]i]4i]Cpai}]Cpi]e"(&i]]"]]]]][i]]Cee)run"i|]r 
		me|-i]Ciatc|]r 
		me|-i](ei]C)&=,&i] i]Cee i""(&i]]]]]]]]&i]i]C	enli]]e]i] pe"Ce][ivi] iC]e]i]p]Cee(&i]]]]]]a	1i]i]C ee=]]]]]i:,&:]]&i]SC p,r&i]ei]di]Cn/i]e":e"Ceec]i]Cii:npC);rki]C"(&i]]]]]]]]&i]n iCee/ i]he Vi](eiei]Cpaiioee Vi](eiein,&i] i |-i]Ciateiei]Cp]i]i]Cee	e				]Ceeoi]i] i
i]p"ioi]i] i]Ceeci]Cp]i]]n]&i]y iCe;a]]di]][ipn]non ip]i]i]i]pe]:e"Ceec]][e"]CsiCeei]]]]]]]]&i]n :qc e&i]1e/ ini]ri]n]&i]] iCe]Cee|-i]C
sr i
]ei]Ci]Ci]i]"iiein, i]]ioi]i] i
i]p"i,ie& 
]i]Cn ip]i]4i]]ios-i])pr&i]ei]di]C}eC]Cn is-i]Cnhed"(&i]]]]e	n]&i]] ie"Ce
// |]r)run e|-i](eiei]Cp]i] iC]Ctr&i]ei]Ch*]ni]pip]]eMAei]
"i|]rci]k"i:,&i] i]]]i,ie& 
]i]Cn ip]i] iC]Cn is-i]Cnhed"(&i]]]&i]] iCee		i]op Vi](eiei]Cpain ip Vi](eiei]Cp]Ctr&i]ei]Ci]Cee ]]]]]]]ri:;&]]&i]  iCep]i]i]Ceeie][e"]CsiCeei]]p]i] iC]Cn &i]C
i]C"(&i]]]]e);
	|]]]]a	1ia]]di]]]i]i]C)]rte"]Ci]&i]]]]r i]r"i]Ctee ]]]]]r i]r"]Ci]Cee ]]]]i]i]Cee]Cee|-i]C i])"-]&i]  i|-i]C iiC]Cn &i]C
]i]C]n]&i]] iCeeami]) i]&iiCee"Ceeami]) i]&i]ei]Ci]Ci]i]"-]&ci]
]e	far"]Ci]C"(eiei]]i]Cee]Cee|-i]C ir i]|* ]  i|--]i]i]Ce"]:e"Ce]
	ici]
]e	far"]Ci]C"(eiei]]i]Cee]Cee|-i]C ir i]|* ]  Fi"no
e"]Ci]C
]i]C]n]&iC	vrdi]C"(&i]Ce"]:eki]]]ir i:]]&e"Ce]}ri]]e e"]:e"Ce"Ce]mi]]
	iC ir i]|] i]Cee i]i]Ci]i]Ci]i]CsiCeei]]p]i] iC]Cnt&i]Cpi]e"(&i]]]]etarg|]]]]a	1ia]]ri]]]i]i]Cu]rpe"]Ci]&i]]]]rci]k"i]C eec]]]]]i:(&]t&i]}i]Ceeni]ei]]p]i]]k"i  e	]]]]]i:i]ei]]c iCepri]oi]		i]&i]]]]eCi]&i]]]]rci]k"i]C eec]]]]]i:(&]t&i]}i]Ceeni]ei]]p]i]]k"i  e	]]]]]i:ni]Ceeni]i]i]te"]Ci]&i]]]]r i]r"i:t&i]}i]]]p]i]ni]kip]]]rc	]Cr r)i]tp}	i]]e]i] pe"Ce]Civi] iC]Ci&]t&i]}i]C[e"]C "]-i](eiei]Cp]i]i]Ceene
// |--	1i]i]te"]Ci]&i]]]i]ni	ei]ki]]CeeMi]e"]Ci]C"(e p,ri]]]]r i]r"i:t&i]}i]]]p-	1i]i]i]Cs]rce"]Ci]Cri]]]]r i]r"iCepri]oi]		i]&ii]Cri]]]Cee|-i]C ir[i]C"(&i]]]]]]]]&i]oi |-i]re"]Co// |--	1i]i]Cceef]]]]]i: &:]]&i] ]]]p]i]4i]Cpais]C
i]C"(&i]]"]]]]]ki]]Ceeeetu"i|]rcdir}e|-i]CuOrd|]rcdir}e|-i](ei]Cp&]t&i]}i]Ceeni""(&i]]]]]]]]&i]i]Cpa ei]]e]i] pe"Ce]kivi] iC]C]i]t]Cee(&i]]]]]]a	1i]i]Cceef]]]]]i: &:]]&i] C pth&i]ei]	i]Cnci]e":e"Ceea]i]Cii:gtC
/rri]C"(&i]]]]]]]]&i]
 iCeecoi]o  Vi](eiei]Cpai;
s  Vi](eieint&i]}i |-i]CuOreiei]Cp]i]i]Cee	etarg]Ceeoi]i] iei]
"ioi]i] i]Ceeai]Cp]i]]n]&i]n iCe;a]]	i]]kipn]n;

ip]i]i]i]te]:e"Ceea]]ke"]CsiCeei]]]]]]]]&i]
 :of	i&i]1ecoini]di]n]&i]] iCe]Cee|-i]Coar
i
]ei]Ci]Ci]i]"iieint i]]ioi]i] iei]
"i,ii&cd]i]C

ip]i]4i]]ios-i]pth&i]ei]	i]CeeC]C

is-i]Coeck"(&i]]]]een]&i]] ie"Ce	var|]reetu)e|-i](eiei]Cp]i] iC]Cyp&i]ei]Cn*]ni]
ip]]eMA i]["i|]r i]r"i:t&i]}i]]]i,ii&cd]i]C

ip]i] iC]C

is-i]Coeck"(&i]]]&i]] iCee =i]nl Vi](eiei]Cpai

il Vi](eiei]Cp]Cyp&i]ei]Ci]Ceen]]]]]]]ri:
&]]&i]i iCep]i]i]Ceeie]ke"]CsiCeei]]p]i] iC]C

&i]C[i]C"(&i]]]]e
// |]]]]a	1ia]]	i]]]i]i]Ce]r e"]Ci]&i]]]]rti]d"i]Cdeen]]]]]rti]d"]Ci]Ceen]]]]i]i]Cee]Cee|-i]C
i]p"-]&i]i i|-i]C
iiC]C

&i]C[]i]C]n]&i]] iCeeo.i]r	i]&iiCee"Ceeo.i]r	i]&i]ei]Ci]Ci]i]"-]& i]m]eIndd"]Ci]C"(eiei]]i]Cee]Cee|-i]C
irti]|* ]i i|--]i]i]Ce"]:e"Ce]		i i]m]eIndd"]Ci]C"(eiei]]i]Cee]Cee|-i]C
irti]|* ]i Fi"no[e"]Ci]C[]i]C]n]&iCiar	i]C"(&i]Ce"]:eri]]]irti:]]&e"Ce]kri]]p e"]:e"Ce"Ce],i]]		iC
irti]|]}i]Ceeni]i]Ci]i]Ci]i]CsiCeei]]p]i] iC]Cn &i]C
i]C"(&i]]]]e);
	|]]]]a	1ia]]di]]]i]i]C)]rte"]Ci]&i]]]]r i]r"i]Ctee ]]]]]i:e&]=&i]ci]Ceeei]ei]]p]i]]r"ic)e	]]]]]i:i]ei]]t iCepri]ei];	i]&i]]]]eCi]&i]]]]r i]r"i]Ctee ]]]]]i:e&]=&i]ci]Ceeei]ei]]p]i]]r"ic)e	]]]]]i:ni]Ceeei]i]i] e"]Ci]&i]]]]rti]d"i:=&i]ci]]]p]i]ni]rip]]]r 	]Cprrpi]epk i]]e]i] pe"Ce]Civi] iC]Ci