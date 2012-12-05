var JSON;if(!JSON){JSON={};(function(){'use strict';function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());}// Underscore.js 1.3.3
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function r(a,c,d){if(a===c)return 0!==a||1/a==1/c;if(null==a||null==c)return a===c;a._chain&&(a=a._wrapped);c._chain&&(c=c._wrapped);if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return!1;switch(e){case "[object String]":return a==""+c;case "[object Number]":return a!=+a?c!=+c:0==a?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if("object"!=typeof a||"object"!=typeof c)return!1;for(var f=d.length;f--;)if(d[f]==a)return!0;d.push(a);var f=0,g=!0;if("[object Array]"==e){if(f=a.length,g=f==c.length)for(;f--&&(g=f in a==f in c&&r(a[f],c[f],d)););}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return!1;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&r(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,h)&&!f--)break;
g=!f}}d.pop();return g}var s=this,I=s._,o={},k=Array.prototype,p=Object.prototype,i=k.slice,J=k.unshift,l=p.toString,K=p.hasOwnProperty,y=k.forEach,z=k.map,A=k.reduce,B=k.reduceRight,C=k.filter,D=k.every,E=k.some,q=k.indexOf,F=k.lastIndexOf,p=Array.isArray,L=Object.keys,t=Function.prototype.bind,b=function(a){return new m(a)};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports._=b):s._=b;b.VERSION="1.3.3";var j=b.each=b.forEach=function(a,
c,d){if(a!=null)if(y&&a.forEach===y)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===o)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===o)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(z&&a.map===z)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(A&&
a.reduce===A){e&&(c=b.bind(c,e));return f?a.reduce(c,d):a.reduce(c)}j(a,function(a,b,i){if(f)d=c.call(e,d,a,b,i);else{d=a;f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(B&&a.reduceRight===B){e&&(c=b.bind(c,e));return f?a.reduceRight(c,d):a.reduceRight(c)}var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=function(a,
c,b){var e;G(a,function(a,g,h){if(c.call(b,a,g,h)){e=a;return true}});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(C&&a.filter===C)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(D&&a.every===D)return a.every(c,b);j(a,function(a,g,h){if(!(e=e&&c.call(b,
a,g,h)))return o});return!!e};var G=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(E&&a.some===E)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return o});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;if(q&&a.indexOf===q)return a.indexOf(c)!=-1;return b=G(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&
(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){d=Math.floor(Math.random()*(f+1));b[f]=b[d];b[d]=a});return b};b.sortBy=function(a,c,d){var e=b.isFunction(c)?c:function(a){return a[c]};return b.pluck(b.map(a,function(a,b,c){return{value:a,criteria:e.call(d,a,b,c)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c===void 0?1:d===void 0?-1:c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};
j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:b.isArray(a)||b.isArguments(a)?i.call(a):a.toArray&&b.isFunction(a.toArray)?a.toArray():b.values(a)};b.size=function(a){return b.isArray(a)?a.length:b.keys(a).length};b.first=b.head=b.take=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,
0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,
e=[];a.length<3&&(c=true);b.reduce(d,function(d,g,h){if(c?b.last(d)!==g||!d.length:!b.include(d,g)){d.push(g);e.push(a[h])}return d},[]);return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1),true);return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=
i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d){d=b.sortedIndex(a,c);return a[d]===c?d:-1}if(q&&a.indexOf===q)return a.indexOf(c);d=0;for(e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(F&&a.lastIndexOf===F)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){if(arguments.length<=
1){b=a||0;a=0}for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;){g[f++]=a;a=a+d}return g};var H=function(){};b.bind=function(a,c){var d,e;if(a.bind===t&&t)return t.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));H.prototype=a.prototype;var b=new H,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=
i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(null,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i,j=b.debounce(function(){h=
g=false},c);return function(){d=this;e=arguments;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);j()},c));g?h=true:i=a.apply(d,e);j();g=true;return i}};b.debounce=function(a,b,d){var e;return function(){var f=this,g=arguments;d&&!e&&a.apply(f,g);clearTimeout(e);e=setTimeout(function(){e=null;d||a.apply(f,g)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));
return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=L||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&
c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.pick=function(a){var c={};j(b.flatten(i.call(arguments,1)),function(b){b in a&&(c[b]=a[b])});return c};b.defaults=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return r(a,b,[])};b.isEmpty=
function(a){if(a==null)return true;if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=p||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};b.isArguments=function(a){return l.call(a)=="[object Arguments]"};b.isArguments(arguments)||(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});b.isFunction=function(a){return l.call(a)=="[object Function]"};
b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isFinite=function(a){return b.isNumber(a)&&isFinite(a)};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,
b){return K.call(a,b)};b.noConflict=function(){s._=I;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.result=function(a,c){if(a==null)return null;var d=a[c];return b.isFunction(d)?d.call(a):d};b.mixin=function(a){j(b.functions(a),function(c){M(c,b[c]=a[c])})};var N=0;b.uniqueId=
function(a){var b=N++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var u=/.^/,n={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"},v;for(v in n)n[n[v]]=v;var O=/\\|'|\r|\n|\t|\u2028|\u2029/g,P=/\\(\\|'|r|n|t|u2028|u2029)/g,w=function(a){return a.replace(P,function(a,b){return n[b]})};b.template=function(a,c,d){d=b.defaults(d||{},b.templateSettings);a="__p+='"+a.replace(O,function(a){return"\\"+n[a]}).replace(d.escape||
u,function(a,b){return"'+\n_.escape("+w(b)+")+\n'"}).replace(d.interpolate||u,function(a,b){return"'+\n("+w(b)+")+\n'"}).replace(d.evaluate||u,function(a,b){return"';\n"+w(b)+"\n;__p+='"})+"';\n";d.variable||(a="with(obj||{}){\n"+a+"}\n");var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",e=new Function(d.variable||"obj","_",a);if(c)return e(c,b);c=function(a){return e.call(this,a,b)};c.source="function("+(d.variable||"obj")+"){\n"+a+"}";return c};
b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var x=function(a,c){return c?b(a).chain():a},M=function(a,c){m.prototype[a]=function(){var a=i.call(arguments);J.call(a,this._wrapped);return x(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return x(d,
this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return x(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);
// Backbone.js 0.9.2

// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function () {
	var l = this,
	y = l.Backbone,
	z = Array.prototype.slice,
	A = Array.prototype.splice,
	g;
	g = "undefined" !== typeof exports ? exports : l.Backbone = {};
	g.VERSION = "0.9.2";
	var f = l._;
	!f && "undefined" !== typeof require && (f = require("underscore"));
	var i = l.jQuery || l.Zepto || l.ender;
	g.setDomLibrary = function (a) {
		i = a
	};
	g.noConflict = function () {
		l.Backbone = y;
		return this
	};
	g.emulateHTTP = !1;
	g.emulateJSON = !1;
	var p = /\s+/,
	k = g.Events = {
		on : function (a, b, c) {
			var d,
			e,
			f,
			g,
			j;
			if (!b)
				return this;
			a = a.split(p);
			for (d = this._callbacks || (this._callbacks = {}); e = a.shift(); )
				f = (j = d[e]) ? j.tail : {},
			f.next = g = {},
			f.context = c,
			f.callback = b,
			d[e] = {
				tail : g,
				next : j ? j.next : f
			};
			return this
		},
		off : function (a, b, c) {
			var d,
			e,
			h,
			g,
			j,
			q;
			if (e = this._callbacks) {
				if (!a && !b && !c)
					return delete this._callbacks, this;
				for (a = a ? a.split(p) : f.keys(e); d = a.shift(); )
					if (h = e[d], delete e[d], h && (b || c))
						for (g = h.tail; (h = h.next) !== g; )
							if (j = h.callback, q = h.context, b && j !== b || c && q !== c)
								this.on(d, j, q);
				return this
			}
		},
		trigger : function (a) {
			var b,
			c,
			d,
			e,
			f,
			g;
			if (!(d = this._callbacks))
				return this;
			f = d.all;
			a = a.split(p);
			for (g =
					z.call(arguments, 1); b = a.shift(); ) {
				if (c = d[b])
					for (e = c.tail; (c = c.next) !== e; )
						c.callback.apply(c.context || this, g);
				if (c = f) {
					e = c.tail;
					for (b = [b].concat(g); (c = c.next) !== e; )
						c.callback.apply(c.context || this, b)
				}
			}
			return this
		}
	};
	k.bind = k.on;
	k.unbind = k.off;
	var o = g.Model = function (a, b) {
		var c;
		a || (a = {});
		b && b.parse && (a = this.parse(a));
		if (c = n(this, "defaults"))
			a = f.extend({}, c, a);
		b && b.collection && (this.collection = b.collection);
		this.attributes = {};
		this._escapedAttributes = {};
		this.cid = f.uniqueId("c");
		this.changed = {};
		this._silent = {};
		this._pending = {};
		this.set(a, {
			silent : !0
		});
		this.changed = {};
		this._silent = {};
		this._pending = {};
		this._previousAttributes = f.clone(this.attributes);
		this.initialize.apply(this, arguments)
	};
	f.extend(o.prototype, k, {
		changed : null,
		_silent : null,
		_pending : null,
		idAttribute : "id",
		initialize : function () {},
		toJSON : function () {
			return f.clone(this.attributes)
		},
		get : function (a) {
			return this.attributes[a]
		},
		escape : function (a) {
			var b;
			if (b = this._escapedAttributes[a])
				return b;
			b = this.get(a);
			return this._escapedAttributes[a] = f.escape(null ==
					b ? "" : "" + b)
		},
		has : function (a) {
			return null != this.get(a)
		},
		set : function (a, b, c) {
			var d,
			e;
			f.isObject(a) || null == a ? (d = a, c = b) : (d = {}, d[a] = b);
			c || (c = {});
			if (!d)
				return this;
			d instanceof o && (d = d.attributes);
			if (c.unset)
				for (e in d)
					d[e] = void 0;
			if (!this._validate(d, c))
				return !1;
			this.idAttribute in d && (this.id = d[this.idAttribute]);
			var b = c.changes = {},
			h = this.attributes,
			g = this._escapedAttributes,
			j = this._previousAttributes || {};
			for (e in d) {
				a = d[e];
				if (!f.isEqual(h[e], a) || c.unset && f.has(h, e))
					delete g[e], (c.silent ? this._silent :
						b)[e] = !0;
				c.unset ? delete h[e] : h[e] = a;
				!f.isEqual(j[e], a) || f.has(h, e) != f.has(j, e) ? (this.changed[e] = a, c.silent || (this._pending[e] = !0)) : (delete this.changed[e], delete this._pending[e])
			}
			c.silent || this.change(c);
			return this
		},
		unset : function (a, b) {
			(b || (b = {})).unset = !0;
			return this.set(a, null, b)
		},
		clear : function (a) {
			(a || (a = {})).unset = !0;
			return this.set(f.clone(this.attributes), a)
		},
		fetch : function (a) {
			var a = a ? f.clone(a) : {},
			b = this,
			c = a.success;
			a.success = function (d, e, f) {
				if (!b.set(b.parse(d, f), a))
					return !1;
				c && c(b, d)
			};
			a.error = g.wrapError(a.error, b, a);
			return (this.sync || g.sync).call(this, "read", this, a)
		},
		save : function (a, b, c) {
			var d,
			e;
			f.isObject(a) || null == a ? (d = a, c = b) : (d = {}, d[a] = b);
			c = c ? f.clone(c) : {};
			if (c.wait) {
				if (!this._validate(d, c))
					return !1;
				e = f.clone(this.attributes)
			}
			a = f.extend({}, c, {
					silent : !0
				});
			if (d && !this.set(d, c.wait ? a : c))
				return !1;
			var h = this,
			i = c.success;
			c.success = function (a, b, e) {
				b = h.parse(a, e);
				if (c.wait) {
					delete c.wait;
					b = f.extend(d || {}, b)
				}
				if (!h.set(b, c))
					return false;
				i ? i(h, a) : h.trigger("sync", h, a, c)
			};
			c.error = g.wrapError(c.error,
					h, c);
			b = this.isNew() ? "create" : "update";
			b = (this.sync || g.sync).call(this, b, this, c);
			c.wait && this.set(e, a);
			return b
		},
		destroy : function (a) {
			var a = a ? f.clone(a) : {},
			b = this,
			c = a.success,
			d = function () {
				b.trigger("destroy", b, b.collection, a)
			};
			if (this.isNew())
				return d(), !1;
			a.success = function (e) {
				a.wait && d();
				c ? c(b, e) : b.trigger("sync", b, e, a)
			};
			a.error = g.wrapError(a.error, b, a);
			var e = (this.sync || g.sync).call(this, "delete", this, a);
			a.wait || d();
			return e
		},
		url : function () {
			var a = n(this, "urlRoot") || n(this.collection, "url") || t();
			return this.isNew() ? a : a + ("/" == a.charAt(a.length - 1) ? "" : "/") + encodeURIComponent(this.id)
		},
		parse : function (a) {
			return a
		},
		clone : function () {
			return new this.constructor(this.attributes)
		},
		isNew : function () {
			return null == this.id
		},
		change : function (a) {
			a || (a = {});
			var b = this._changing;
			this._changing = !0;
			for (var c in this._silent)
				this._pending[c] = !0;
			var d = f.extend({}, a.changes, this._silent);
			this._silent = {};
			for (c in d)
				this.trigger("change:" + c, this, this.get(c), a);
			if (b)
				return this;
			for (; !f.isEmpty(this._pending); ) {
				this._pending = {};
				this.trigger("change", this, a);
				for (c in this.changed)
					!this._pending[c] && !this._silent[c] && delete this.changed[c];
				this._previousAttributes = f.clone(this.attributes)
			}
			this._changing = !1;
			return this
		},
		hasChanged : function (a) {
			return !arguments.length ? !f.isEmpty(this.changed) : f.has(this.changed, a)
		},
		changedAttributes : function (a) {
			if (!a)
				return this.hasChanged() ? f.clone(this.changed) : !1;
			var b,
			c = !1,
			d = this._previousAttributes,
			e;
			for (e in a)
				if (!f.isEqual(d[e], b = a[e]))
					(c || (c = {}))[e] = b;
			return c
		},
		previous : function (a) {
			return !arguments.length ||
			!this._previousAttributes ? null : this._previousAttributes[a]
		},
		previousAttributes : function () {
			return f.clone(this._previousAttributes)
		},
		isValid : function () {
			return !this.validate(this.attributes)
		},
		_validate : function (a, b) {
			if (b.silent || !this.validate)
				return !0;
			var a = f.extend({}, this.attributes, a),
			c = this.validate(a, b);
			if (!c)
				return !0;
			b && b.error ? b.error(this, c, b) : this.trigger("error", this, c, b);
			return !1
		}
	});
	var r = g.Collection = function (a, b) {
		b || (b = {});
		b.model && (this.model = b.model);
		b.comparator && (this.comparator = b.comparator);
		this._reset();
		this.initialize.apply(this, arguments);
		a && this.reset(a, {
			silent : !0,
			parse : b.parse
		})
	};
	f.extend(r.prototype, k, {
		model : o,
		initialize : function () {},
		toJSON : function (a) {
			return this.map(function (b) {
				return b.toJSON(a)
			})
		},
		add : function (a, b) {
			var c,
			d,
			e,
			g,
			i,
			j = {},
			k = {},
			l = [];
			b || (b = {});
			a = f.isArray(a) ? a.slice() : [a];
			c = 0;
			for (d = a.length; c < d; c++) {
				if (!(e = a[c] = this._prepareModel(a[c], b)))
					throw Error("Can't add an invalid model to a collection");
				g = e.cid;
				i = e.id;
				j[g] || this._byCid[g] || null != i && (k[i] || this._byId[i]) ?
				l.push(c) : j[g] = k[i] = e
			}
			for (c = l.length; c--; )
				a.splice(l[c], 1);
			c = 0;
			for (d = a.length; c < d; c++)
				(e = a[c]).on("all", this._onModelEvent, this), this._byCid[e.cid] = e, null != e.id && (this._byId[e.id] = e);
			this.length += d;
			A.apply(this.models, [null != b.at ? b.at : this.models.length, 0].concat(a));
			this.comparator && this.sort({
				silent : !0
			});
			if (b.silent)
				return this;
			c = 0;
			for (d = this.models.length; c < d; c++)
				if (j[(e = this.models[c]).cid])
					b.index = c, e.trigger("add", e, this, b);
			return this
		},
		remove : function (a, b) {
			var c,
			d,
			e,
			g;
			b || (b = {});
			a = f.isArray(a) ?
				a.slice() : [a];
			c = 0;
			for (d = a.length; c < d; c++)
				if (g = this.getByCid(a[c]) || this.get(a[c]))
					delete this._byId[g.id], delete this._byCid[g.cid], e = this.indexOf(g), this.models.splice(e, 1), this.length--, b.silent || (b.index = e, g.trigger("remove", g, this, b)), this._removeReference(g);
			return this
		},
		push : function (a, b) {
			a = this._prepareModel(a, b);
			this.add(a, b);
			return a
		},
		pop : function (a) {
			var b = this.at(this.length - 1);
			this.remove(b, a);
			return b
		},
		unshift : function (a, b) {
			a = this._prepareModel(a, b);
			this.add(a, f.extend({
					at : 0
				}, b));
			return a
		},
		shift : function (a) {
			var b = this.at(0);
			this.remove(b, a);
			return b
		},
		get : function (a) {
			return null == a ? void 0 : this._byId[null != a.id ? a.id : a]
		},
		getByCid : function (a) {
			return a && this._byCid[a.cid || a]
		},
		at : function (a) {
			return this.models[a]
		},
		where : function (a) {
			return f.isEmpty(a) ? [] : this.filter(function (b) {
				for (var c in a)
					if (a[c] !== b.get(c))
						return !1;
				return !0
			})
		},
		sort : function (a) {
			a || (a = {});
			if (!this.comparator)
				throw Error("Cannot sort a set without a comparator");
			var b = f.bind(this.comparator, this);
			1 == this.comparator.length ?
			this.models = this.sortBy(b) : this.models.sort(b);
			a.silent || this.trigger("reset", this, a);
			return this
		},
		pluck : function (a) {
			return f.map(this.models, function (b) {
				return b.get(a)
			})
		},
		reset : function (a, b) {
			a || (a = []);
			b || (b = {});
			for (var c = 0, d = this.models.length; c < d; c++)
				this._removeReference(this.models[c]);
			this._reset();
			this.add(a, f.extend({
					silent : !0
				}, b));
			b.silent || this.trigger("reset", this, b);
			return this
		},
		fetch : function (a) {
			a = a ? f.clone(a) : {};
			void 0 === a.parse && (a.parse = !0);
			var b = this,
			c = a.success;
			a.success = function (d,
				e, f) {
				a.add ? b["add"](b.parse(d, f), a) : '';
				c && c(b, d)
			};
			a.error = g.wrapError(a.error, b, a);
			return (this.sync || g.sync).call(this, "read", this, a)
		},
		create : function (a, b) {
			var c = this,
			b = b ? f.clone(b) : {},
			a = this._prepareModel(a, b);
			if (!a)
				return !1;
			b.wait || c.add(a, b);
			var d = b.success;
			b.success = function (e, f) {
				b.wait && c.add(e, b);
				d ? d(e, f) : e.trigger("sync", a, f, b)
			};
			a.save(null, b);
			return a
		},
		parse : function (a) {
			return a
		},
		chain : function () {
			return f(this.models).chain()
		},
		_reset : function () {
			this.length = 0;
			this.models = [];
			this._byId = {};
			this._byCid = {}
			
		},
		_prepareModel : function (a, b) {
			b || (b = {});
			a instanceof o ? a.collection || (a.collection = this) : (b.collection = this, a = new this.model(a, b), a._validate(a.attributes, b) || (a = !1));
			return a
		},
		_removeReference : function (a) {
			this == a.collection && delete a.collection;
			a.off("all", this._onModelEvent, this)
		},
		_onModelEvent : function (a, b, c, d) {
			("add" == a || "remove" == a) && c != this || ("destroy" == a && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this,
					arguments))
		}
	});
	f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","), function (a) {
		r.prototype[a] = function () {
			return f[a].apply(f, [this.models].concat(f.toArray(arguments)))
		}
	});
	var u = g.Router = function (a) {
		a || (a = {});
		a.routes && (this.routes = a.routes);
		this._bindRoutes();
		this.initialize.apply(this, arguments)
	},
	B = /:\w+/g,
	C = /\*\w+/g,
	D = /[-[\]{}()+?.,\\^$|#\s]/g;
	f.extend(u.prototype, k, {
		initialize : function () {},
		route : function (a, b, c) {
			g.history || (g.history = new m);
			f.isRegExp(a) || (a = this._routeToRegExp(a));
			c || (c = this[b]);
			g.history.route(a, f.bind(function (d) {
					d = this._extractParameters(a, d);
					c && c.apply(this, d);
					this.trigger.apply(this, ["route:" + b].concat(d));
					g.history.trigger("route", this, b, d)
				}, this));
			return this
		},
		navigate : function (a, b) {
			g.history.navigate(a, b)
		},
		_bindRoutes : function () {
			if (this.routes) {
				var a = [],
				b;
				for (b in this.routes)
					a.unshift([b,
							this.routes[b]]);
				b = 0;
				for (var c = a.length; b < c; b++)
					this.route(a[b][0], a[b][1], this[a[b][1]])
			}
		},
		_routeToRegExp : function (a) {
			a = a.replace(D, "\\$&").replace(B, "([^/]+)").replace(C, "(.*?)");
			return RegExp("^" + a + "$")
		},
		_extractParameters : function (a, b) {
			return a.exec(b).slice(1)
		}
	});
	var m = g.History = function () {
		this.handlers = [];
		f.bindAll(this, "checkUrl")
	},
	s = /^[#\/]/,
	E = /msie [\w.]+/;
	m.started = !1;
	f.extend(m.prototype, k, {
		interval : 50,
		getHash : function (a) {
			return (a = (a ? a.location : window.location).href.match(/#(.*)$/)) ? a[1] :
			""
		},
		getFragment : function (a, b) {
			if (null == a)
				if (this._hasPushState || b) {
					var a = window.location.pathname,
					c = window.location.search;
					c && (a += c)
				} else
					a = this.getHash();
			a.indexOf(this.options.root) || (a = a.substr(this.options.root.length));
			return a.replace(s, "")
		},
		start : function (a) {
			if (m.started)
				throw Error("Backbone.history has already been started");
			m.started = !0;
			this.options = f.extend({}, {
					root : "/"
				}, this.options, a);
			this._wantsHashChange = !1 !== this.options.hashChange;
			this._wantsPushState = !!this.options.pushState;
			this._hasPushState =
				!(!this.options.pushState || !window.history || !window.history.pushState);
			var a = this.getFragment(),
			b = document.documentMode;
			if (b = E.exec(navigator.userAgent.toLowerCase()) && (!b || 7 >= b))
				this.iframe = i('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(a);
			this._hasPushState ? i(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !b ? i(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl,
						this.interval));
			this.fragment = a;
			a = window.location;
			b = a.pathname == this.options.root;
			if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !b)
				return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
			this._wantsPushState && this._hasPushState && b && a.hash && (this.fragment = this.getHash().replace(s, ""), window.history.replaceState({}, document.title, a.protocol + "//" + a.host + this.options.root + this.fragment));
			if (!this.options.silent)
				return this.loadUrl()
		},
		stop : function () {
			i(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl);
			clearInterval(this._checkUrlInterval);
			m.started = !1
		},
		route : function (a, b) {
			this.handlers.unshift({
				route : a,
				callback : b
			})
		},
		checkUrl : function () {
			var a = this.getFragment();
			a == this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe)));
			if (a == this.fragment)
				return !1;
			this.iframe && this.navigate(a);
			this.loadUrl() || this.loadUrl(this.getHash())
		},
		loadUrl : function (a) {
			var b = this.fragment = this.getFragment(a);
			return f.any(this.handlers,
				function (a) {
				if (a.route.test(b))
					return a.callback(b), !0
			})
		},
		navigate : function (a, b) {
			if (!m.started)
				return !1;
			if (!b || !0 === b)
				b = {
					trigger : b
				};
			var c = (a || "").replace(s, "");
			this.fragment != c && (this._hasPushState ? (0 != c.indexOf(this.options.root) && (c = this.options.root + c), this.fragment = c, window.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c)) : this._wantsHashChange ? (this.fragment = c, this._updateHash(window.location, c, b.replace), this.iframe && c != this.getFragment(this.getHash(this.iframe)) && (b.replace ||
						this.iframe.document.open().close(), this._updateHash(this.iframe.location, c, b.replace))) : window.location.assign(this.options.root + a), b.trigger && this.loadUrl(a))
		},
		_updateHash : function (a, b, c) {
			c ? a.replace(a.toString().replace(/(javascript:|#).*$/, "") + "#" + b) : a.hash = b
		}
	});
	var v = g.View = function (a) {
		this.cid = f.uniqueId("view");
		this._configure(a || {});
		this._ensureElement();
		this.initialize.apply(this, arguments);
		this.delegateEvents()
	},
	F = /^(\S+)\s*(.*)$/,
	w = "model,collection,el,id,attributes,className,tagName".split(",");
	f.extend(v.prototype, k, {
		tagName : "div",
		$ : function (a) {
			return this.$el.find(a)
		},
		initialize : function () {},
		render : function () {
			return this
		},
		remove : function () {
			this.$el.remove();
			return this
		},
		make : function (a, b, c) {
			a = document.createElement(a);
			b && i(a).attr(b);
			c && i(a).html(c);
			return a
		},
		setElement : function (a, b) {
			this.$el && this.undelegateEvents();
			this.$el = a instanceof i ? a : i(a);
			this.el = this.$el[0];
			!1 !== b && this.delegateEvents();
			return this
		},
		delegateEvents : function (a) {
			if (a || (a = n(this, "events"))) {
				this.undelegateEvents();
				for (var b in a) {
					var c = a[b];
					f.isFunction(c) || (c = this[a[b]]);
					if (!c)
						throw Error('Method "' + a[b] + '" does not exist');
					var d = b.match(F),
					e = d[1],
					d = d[2],
					c = f.bind(c, this),
					e = e + (".delegateEvents" + this.cid);
					"" === d ? this.$el.bind(e, c) : this.$el.delegate(d, e, c)
				}
			}
		},
		undelegateEvents : function () {
			this.$el.unbind(".delegateEvents" + this.cid)
		},
		_configure : function (a) {
			this.options && (a = f.extend({}, this.options, a));
			for (var b = 0, c = w.length; b < c; b++) {
				var d = w[b];
				a[d] && (this[d] = a[d])
			}
			this.options = a
		},
		_ensureElement : function () {
			if (this.el)
				this.setElement(this.el,
					!1);
			else {
				var a = n(this, "attributes") || {};
				this.id && (a.id = this.id);
				this.className && (a["class"] = this.className);
				this.setElement(this.make(this.tagName, a), !1)
			}
		}
	});
	o.extend = r.extend = u.extend = v.extend = function (a, b) {
		var c = G(this, a, b);
		c.extend = this.extend;
		return c
	};
	var H = {
		create : "POST",
		update : "PUT",
		"delete" : "DELETE",
		read : "GET"
	};
	g.sync = function (a, b, c) {
		var d = H[a];
		c || (c = {});
		var e = {
			type : d,
			dataType : "json"
		};
		c.url || (e.url = n(b, "url") || t());
		if (!c.data && b && ("create" == a || "update" == a))
			e.contentType = "application/json",
			e.data = JSON.stringify(b.toJSON());
		g.emulateJSON && (e.contentType = "application/x-www-form-urlencoded", e.data = e.data ? {
				model : e.data
			}
			 : {});
		if (g.emulateHTTP && ("PUT" === d || "DELETE" === d))
			g.emulateJSON && (e.data._method = d), e.type = "POST", e.beforeSend = function (a) {
				a.setRequestHeader("X-HTTP-Method-Override", d)
			};
		"GET" !== e.type && !g.emulateJSON && (e.processData = !1);
		return i.ajax(f.extend(e, c))
	};
	g.wrapError = function (a, b, c) {
		return function (d, e) {
			e = d === b ? e : d;
			a ? a(b, e, c) : b.trigger("error", b, e, c)
		}
	};
	var x = function () {},
	G = function (a,
		b, c) {
		var d;
		d = b && b.hasOwnProperty("constructor") ? b.constructor : function () {
			a.apply(this, arguments)
		};
		f.extend(d, a);
		x.prototype = a.prototype;
		d.prototype = new x;
		b && f.extend(d.prototype, b);
		c && f.extend(d, c);
		d.prototype.constructor = d;
		d.__super__ = a.prototype;
		return d
	},
	n = function (a, b) {
		return !a || !a[b] ? null : f.isFunction(a[b]) ? a[b]() : a[b]
	},
	t = function () {
		throw Error('A "url" property or function must be specified');
	}
}).call(this);
/*
    @Plugin: Backbone.Pagination - pagination plugin
    @Dependencies - jQuery
                  - Backbone 
                  - UnderScore 
    
    * Note: This plugin is a custom implemenation of Backbone.Paginator By Addy Osmani <http://addyosmani.com>
*/
Backbone.Pagination = (function (Backbone, _, $) {
    "use strict";
    
    var Pagination = Backbone.Collection.extend({
    
        initialize: function () {
            this.filteredModels = '';
            this.filteredTag = '';
            this.currentPage = 1;
            this.currentGroup = 1;
            this.allFetched = false;
        },
        
        
        showPreNext: true,
        
        
        showFirstLast: true,
        
        
        sortOrder: 'desc',
        
        
        groupLimit: 9, 
        

        /*
            @Public
            @Void: sets the sortOrder of collection 
        */
        changeSortOder: function (direction) {
            if (direction) {
                this.sortOrder = direction;
            }
            
            this.pager();
        },
        

        /*
            @Public
            @Void: sets the number for the next group of pages 
        */   
        nextGroup: function () {
            if (this.currentGroup + 1 <= this.totalGroups) {
              ++this.currentGroup;
            }
        },
        


        /*
            @Public
            @Void: sets the number for the previous group of pages
        */        
        previousGroup: function () {
            if (this.currentGroup - 1 > 0) {
              --this.currentGroup;
            }
        }, 
        


        /*
            @Public
            @Void: sets the page number to go to
            @Param: (Number) page - page number            
        */        
        goTo: function ( page ) {
            if (page !== undefined) {
                this.currentPage = parseInt(page, 10);
                this.currentGroup = Math.ceil(page / this.groupLimit);
                this.pager();
	        }
	    },
        
        
        /*
            @Public
            @Void: resets collection 
        */        
        refresh: function () {
            this.goTo(this.currentPage);
	    },
        
        


        /*
            @Public
            @Void: resets collection 
        */        
        resetFilteredModels: function () {
            this.filteredModels = '';
            this.filteredTag = '';
            this.currentPage = 1;
            this.currentGroup = 1;
            this.pager();
	    },
	


        /*
            @Public
            @Void: checks properties and resets the collection by loading a portion models for public access
        */	
        pager: function () {
            var self = this,
                disp = self.perPage,
                start = (self.currentPage - 1) * disp,
                stop = start + disp;
            
            if (self.origModels === undefined) {
                self.origModels = self.models;
	        }
	    
	        self.models = self.origModels;
	        
            if (self.filteredModels) {
                self.models = self.filteredModels;
	        }
            
            self.models = self.sortModels(self.models, self.sortOrder);
	    
	        self.reset(self.models.slice(start, stop));
	    },
	

        /*
            @Public
            @Void: sets number of bookmarks per page and performs a calculation to determine currentPage and currentGroup 
            @Param: (Number) perPage - number of bookmarks per page
        */		
	    setLimit: function ( perPage ) {
	        if (perPage !== undefined) {
	            var lastPerPage = this.perPage;
	            this.perPage = parseInt(perPage, 10);
	            this.currentPage = Math.ceil( ( lastPerPage * ( this.currentPage - 1 ) + 1 ) / perPage);
                this.currentGroup = Math.ceil(this.currentPage / this.groupLimit);
	            this.pager();
	        }
	    },
    


        /*
            @Public
            @Void: updates original models upon bookmark deletion
            @Param: (Mixed) cid - model unique id
        */	    
	    removeFromOGModels: function ( cid ) {
	        var self = this;
            
            
            $.each(self.origModels, function (i, model) {
                if (model.cid === cid) {
                    self.origModels.splice(i, 1);
                    return false;
                }
            });
            
            // if we have filtered models we need to update them as well
            if (self.filteredModels) {
                $.each(self.filteredModels, function (i, model) {
                    if (model.cid === cid) {
                        self.filteredModels.splice(i, 1);
                        return false;
                    }
                 });            
            }
	    },
	

    
        /*
            @Public
            @Void: filters models containing tag
            @Param: (String) tag - tag being filtered
        */	    
        filterTags: function (tag) {
            var tagCollection, self = this;
            
            tag = decodeURIComponent(tag);
            
            tagCollection = _.filter(self.origModels, function (bookmark) {
                var tags = bookmark.get('tags');
                
                return self.hasTag(tags, tag);
            });
            
            self.currentPage = 1;
            self.currentGroup = 1;
            self.filteredTag = tag;
            self.filteredModels = tagCollection;
            
            self.pager();
        },
	


        /*
            @Public
            @Object: calculates, updates and returns current properties
        */	
	    info: function () {
	        var self = this,
	        info = {},
	        totalRecords = self.filteredModels ? self.filteredModels.length : (self.origModels !== undefined) ? self.origModels.length : self.length,
	        totalPages = Math.ceil(totalRecords / self.perPage),
	        totalGroups = Math.ceil(totalPages / self.groupLimit),
	        currentGroup = self.currentGroup || 1,
            groupLimit = self.groupLimit;
	        
	        self.totalPages = totalPages;
	        self.totalGroups = totalGroups;
	        self.currentGroup = currentGroup;
	        
	        info = {
                showFirstLast: self.showFirstLast,
                showPreNext: self.showPreNext,
	            totalRecords: totalRecords,
	            currentPage: self.currentPage,
	            perPage: self.perPage,
	            totalPages: totalPages,
	            lastPage: totalPages,
	            previous: false,
	            next: false,
	            currentGroup: self.currentGroup || 1,
	            totalGroups: totalGroups,
	            counterLimit: (self.currentGroup * groupLimit) > totalPages ? totalPages : (self.currentGroup * groupLimit),
                counter: (self.currentGroup * groupLimit) - (groupLimit - 1),
                groupLimit: groupLimit,
                filteredTag: self.filteredTag,
                allFetched: self.allFetched
	        };
	        
	        
	        if (self.currentGroup > 1) {
	            info.previous = true;
	        }
	        
	        if (self.currentGroup < info.totalGroups) {
	            info.next = true;
	        }
	    
	        self.information = info;
	        
	        return info;
	    },
        

        /*
            @Private
            @Boolean: checks if array contains tag
            @Params: (Array) tags - haystack
                     (String) tag - needle
        */	        
        hasTag: function (tags, tag) {
            var yes = false, i;  
             
            for (i = 0; i < tags.length; i++) {
                if (tags[i] === tag) {
                    yes = true;
                    break;
                }
            }             
            
            return yes; 
        },
        


        /*
            @Public
            @Boolean: checks if array contains tag
        */        
        getTags: function () {
            var tags = this.buildTags(), 
                uniqueTags = _.uniq(tags);
            
            uniqueTags.sort();
            
            return uniqueTags;
        },
        


        /*
            @Private
            @Array: combines all collection tags into one array
        */          
        buildTags: function () {
            var tags = [], models = this.origModels || this.models;
            
            _.each(models, function (bookmark) {
                var subtags = bookmark.get('tags');
                tags.push(subtags);
            }, this);
            
            return _.flatten(tags);
        },
        


        /*
            @Private
            @Array: sorts the order of models, descending or ascending
            @Params: (Array) models - models to be sortedmodels
                     (String) direction - 'desc' or 'asc'
        */          
        sortModels: function (models, direction) {
            
            var sortedmodels, 
            
            sortFn = function (a, b) {
                if (direction === 'desc') {
                    return b.get('date') - a.get('date');
                }
                    
                return a.get('date') - b.get('date');
            };
            
            sortedmodels = models.sort(sortFn);
            
            return sortedmodels;
        }
        
    });
    
    return Pagination;
}(Backbone, _, jQuery));
﻿String.prototype.rsplit=function(F){var E=this;var A=F.exec(E);var G=new Array();while(A!=null){var D=A.index;var C=F.lastIndex;if((D)!=0){var B=E.substring(0,D);G.push(E.substring(0,D));E=E.slice(D)}G.push(A[0]);E=E.slice(A[0].length);A=F.exec(E)}if(!E==""){G.push(E)}return G};String.prototype.chop=function(){return this.substr(0,this.length-1)};var EjsScanner=function(B,C,A){this.left_delimiter=C+"%";this.right_delimiter="%"+A;this.double_left=C+"%%";this.double_right="%%"+A;this.left_equal=C+"%=";this.left_comment=C+"%#";if(C=="["){this.SplitRegexp=/(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\]\n)|(%\])|(\n)/}else{this.SplitRegexp=new RegExp("("+this.double_left+")|(%%"+this.double_right+")|("+this.left_equal+")|("+this.left_comment+")|("+this.left_delimiter+")|("+this.right_delimiter+"\n)|("+this.right_delimiter+")|(\n)")}this.source=B;this.stag=null;this.lines=0};EjsView=function(A){this.data=A};EjsView.prototype.partial=function(A,B){if(!B){B=this.data}return new EJS(A).render(B)};EjsScanner.to_text=function(A){if(A==null||A===undefined){return""}if(A instanceof Date){return A.toDateString()}if(A.toString){return A.toString()}return""};EjsScanner.prototype={scan:function(D){scanline=this.scanline;regex=this.SplitRegexp;if(!this.source==""){var C=this.source.rsplit(/\n/);for(var A=0;A<C.length;A++){var B=C[A];this.scanline(B,regex,D)}}},scanline:function(A,D,G){this.lines++;var E=A.rsplit(D);for(var C=0;C<E.length;C++){var B=E[C];if(B!=null){try{G(B,this)}catch(F){throw {type:"EjsScanner",line:this.lines}}}}}};var EjsBuffer=function(B,C){this.line=new Array();this.script="";this.pre_cmd=B;this.post_cmd=C;for(var A=0;A<this.pre_cmd.length;A++){this.push(B[A])}};EjsBuffer.prototype={push:function(A){this.line.push(A)},cr:function(){this.script=this.script+this.line.join("; ");this.line=new Array();this.script=this.script+"\n"},close:function(){if(this.line.length>0){for(var A=0;A<this.post_cmd.length;A++){this.push(pre_cmd[A])}this.script=this.script+this.line.join("; ");line=null}}};EjsCompiler=function(B,C){this.pre_cmd=['___ejsO = "";'];this.post_cmd=new Array();this.source=" ";if(B!=null){if(typeof B=="string"){B=B.replace(/\r\n/g,"\n");B=B.replace(/\r/g,"\n");this.source=B}else{if(B.innerHTML){this.source=B.innerHTML}}if(typeof this.source!="string"){this.source=""}}C=C||"<";var A=">";switch(C){case"[":A="]";break;case"<":break;default:throw C+" is not a supported deliminator";break}this.scanner=new EjsScanner(this.source,C,A);this.out=""};EjsCompiler.prototype={compile:function(options){options=options||{};this.out="";var put_cmd="___ejsO += ";var insert_cmd=put_cmd;var buff=new EjsBuffer(this.pre_cmd,this.post_cmd);var content="";var clean=function(content){content=content.replace(/\\/g,"\\\\");content=content.replace(/\n/g,"\\n");content=content.replace(/"/g,'\\"');return content};this.scanner.scan(function(token,scanner){if(scanner.stag==null){switch(token){case"\n":content=content+"\n";buff.push(put_cmd+'"'+clean(content)+'";');buff.cr();content="";break;case scanner.left_delimiter:case scanner.left_equal:case scanner.left_comment:scanner.stag=token;if(content.length>0){buff.push(put_cmd+'"'+clean(content)+'"')}content="";break;case scanner.double_left:content=content+scanner.left_delimiter;break;default:content=content+token;break}}else{switch(token){case scanner.right_delimiter:switch(scanner.stag){case scanner.left_delimiter:if(content[content.length-1]=="\n"){content=content.chop();buff.push(content);buff.cr()}else{buff.push(content)}break;case scanner.left_equal:buff.push(insert_cmd+"(EjsScanner.to_text("+content+"))");break}scanner.stag=null;content="";break;case scanner.double_right:content=content+scanner.right_delimiter;break;default:content=content+token;break}}});if(content.length>0){buff.push(put_cmd+'"'+clean(content)+'"')}buff.close();this.out=buff.script+";";var to_be_evaled="this.process = function(_CONTEXT,_VIEW) { try { with(_VIEW) { with (_CONTEXT) {"+this.out+" return ___ejsO;}}}catch(e){e.lineNumber=null;throw e;}};";try{eval(to_be_evaled)}catch(e){if(typeof JSLINT!="undefined"){JSLINT(this.out);for(var i=0;i<JSLINT.errors.length;i++){var error=JSLINT.errors[i];if(error.reason!="Unnecessary semicolon."){error.line++;var e=new Error();e.lineNumber=error.line;e.message=error.reason;if(options.url){e.fileName=options.url}throw e}}}else{throw e}}}};EJS=function(B){this.set_options(B);if(B.url){var C=EJS.get(B.url,this.cache);if(C){return C}if(C==EJS.INVALID_PATH){return null}this.text=EJS.request(B.url);if(this.text==null){throw"There is no template at "+B.url}this.name=B.url}else{if(B.element){if(typeof B.element=="string"){var A=B.element;B.element=document.getElementById(B.element);if(B.element==null){throw A+"does not exist!"}}if(B.element.value){this.text=B.element.value}else{this.text=B.element.innerHTML}this.name=B.element.id;this.type="["}}var C=new EjsCompiler(this.text,this.type);C.compile(B);EJS.update(this.name,this);this.template=C};EJS.config=function(B){EJS.cache=B.cache!=null?B.cache:EJS.cache;EJS.type=B.type!=null?B.type:EJS.type;var A={};EJS.get=function(D,C){if(C==false){return null}if(A[D]){return A[D]}return null};EJS.update=function(D,C){if(D==null){return }A[D]=C};EJS.INVALID_PATH=-1};EJS.config({cache:true,type:"<"});EJS.prototype={render:function(B){var A=new EjsView(B);return this.template.process.call(A,B,A)},out:function(){return this.template.out},set_options:function(A){this.type=A.type!=null?A.type:EJS.type;this.cache=A.cache!=null?A.cache:EJS.cache;this.text=A.text!=null?A.text:null;this.name=A.name!=null?A.name:null},update:function(element,options){if(typeof element=="string"){element=document.getElementById(element)}if(options==null){_template=this;return function(object){EJS.prototype.update.call(_template,element,object)}}if(typeof options=="string"){params={};params.url=options;_template=this;params.onComplete=function(request){var object=eval(request.responseText);EJS.prototype.update.call(_template,element,object)};EJS.ajax_request(params)}else{element.innerHTML=this.render(options)}}};EJS.newRequest=function(){var C=[function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];for(var A=0;A<C.length;A++){try{var B=C[A]();if(B!=null){return B}}catch(D){continue}}};EJS.request=function(C){var A=new EJS.newRequest();A.open("GET",C,false);try{A.send(null)}catch(B){return null}if(A.status==404||A.status==2||(A.status==0&&A.responseText=="")){return null}return A.responseText};EJS.ajax_request=function(B){B.method=(B.method?B.method:"GET");var A=new EJS.newRequest();A.onreadystatechange=function(){if(A.readyState==4){if(A.status==200){B.onComplete(A)}else{B.onComplete(A)}}};A.open(B.method,B.url);A.send(null)};EjsView.prototype.date_tag=function(C,O,A){if(!(O instanceof Date)){O=new Date()}var B=["January","February","March","April","May","June","July","August","September","October","November","December"];var G=[],D=[],P=[];var J=O.getFullYear();var H=O.getMonth();var N=O.getDate();for(var M=J-15;M<J+15;M++){G.push({value:M,text:M})}for(var E=0;E<12;E++){D.push({value:(E),text:B[E]})}for(var I=0;I<31;I++){P.push({value:(I+1),text:(I+1)})}var L=this.select_tag(C+"[year]",J,G,{id:C+"[year]"});var F=this.select_tag(C+"[month]",H,D,{id:C+"[month]"});var K=this.select_tag(C+"[day]",N,P,{id:C+"[day]"});return L+F+K};EjsView.prototype.form_tag=function(B,A){A=A||{};A.action=B;if(A.multipart==true){A.method="post";A.enctype="multipart/form-data"}return this.start_tag_for("form",A)};EjsView.prototype.form_tag_end=function(){return this.tag_end("form")};EjsView.prototype.hidden_field_tag=function(A,C,B){return this.input_field_tag(A,C,"hidden",B)};EjsView.prototype.input_field_tag=function(A,D,C,B){B=B||{};B.id=B.id||A;B.value=D||"";B.type=C||"text";B.name=A;return this.single_tag_for("input",B)};EjsView.prototype.is_current_page=function(A){return(window.location.href==A||window.location.pathname==A?true:false)};EjsView.prototype.link_to=function(B,A,C){if(!B){var B="null"}if(!C){var C={}}if(C.confirm){C.onclick=' var ret_confirm = confirm("'+C.confirm+'"); if(!ret_confirm){ return false;} ';C.confirm=null}C.href=A;return this.start_tag_for("a",C)+B+this.tag_end("a")};EjsView.prototype.submit_link_to=function(B,A,C){if(!B){var B="null"}if(!C){var C={}}C.onclick=C.onclick||"";if(C.confirm){C.onclick=' var ret_confirm = confirm("'+C.confirm+'"); if(!ret_confirm){ return false;} ';C.confirm=null}C.value=B;C.type="submit";C.onclick=C.onclick+(A?this.url_for(A):"")+"return false;";return this.start_tag_for("input",C)};EjsView.prototype.link_to_if=function(F,B,A,D,C,E){return this.link_to_unless((F==false),B,A,D,C,E)};EjsView.prototype.link_to_unless=function(E,B,A,C,D){C=C||{};if(E){if(D&&typeof D=="function"){return D(B,A,C,D)}else{return B}}else{return this.link_to(B,A,C)}};EjsView.prototype.link_to_unless_current=function(B,A,C,D){C=C||{};return this.link_to_unless(this.is_current_page(A),B,A,C,D)};EjsView.prototype.password_field_tag=function(A,C,B){return this.input_field_tag(A,C,"password",B)};EjsView.prototype.select_tag=function(D,G,H,F){F=F||{};F.id=F.id||D;F.value=G;F.name=D;var B="";B+=this.start_tag_for("select",F);for(var E=0;E<H.length;E++){var C=H[E];var A={value:C.value};if(C.value==G){A.selected="selected"}B+=this.start_tag_for("option",A)+C.text+this.tag_end("option")}B+=this.tag_end("select");return B};EjsView.prototype.single_tag_for=function(A,B){return this.tag(A,B,"/>")};EjsView.prototype.start_tag_for=function(A,B){return this.tag(A,B)};EjsView.prototype.submit_tag=function(A,B){B=B||{};B.type=B.type||"submit";B.value=A||"Submit";return this.single_tag_for("input",B)};EjsView.prototype.tag=function(C,E,D){if(!D){var D=">"}var B=" ";for(var A in E){if(E[A]!=null){var F=E[A].toString()}else{var F=""}if(A=="Class"){A="class"}if(F.indexOf("'")!=-1){B+=A+'="'+F+'" '}else{B+=A+"='"+F+"' "}}return"<"+C+B+D};EjsView.prototype.tag_end=function(A){return"</"+A+">"};EjsView.prototype.text_area_tag=function(A,C,B){B=B||{};B.id=B.id||A;B.name=B.name||A;C=C||"";if(B.size){B.cols=B.size.split("x")[0];B.rows=B.size.split("x")[1];delete B.size}B.cols=B.cols||50;B.rows=B.rows||4;return this.start_tag_for("textarea",B)+C+this.tag_end("textarea")};EjsView.prototype.text_tag=EjsView.prototype.text_area_tag;EjsView.prototype.text_field_tag=function(A,C,B){return this.input_field_tag(A,C,"text",B)};EjsView.prototype.url_for=function(A){return'window.location="'+A+'";'};EjsView.prototype.img_tag=function(B,C,A){A=A||{};A.src=B;A.alt=C;return this.single_tag_for("img",A)}/* ===================================================
 * bootstrap-transition.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  $(function () {

    "use strict"; // jshint ;_;


    /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
     * ======================================================= */

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd'
            ,  'msTransition'     : 'MSTransitionEnd'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSIBLE DATA-API
  * ==================== */

  $(function () {
    $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function ( e ) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
      $(target).collapse(option)
    })
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , selector
        , isActive

      if ($this.is('.disabled, :disabled')) return

      selector = $this.attr('data-target')

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body')
      .on('click.dropdown', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })

}(window.jQuery);/*
    Custom functions
*/
(function (window, $) {
    "use strict";
    
    window.trim = function (txt) {
        return txt.replace(/^\s+|\s+$/,'');
    };
    
    
    $.shout = function (msg, x, dclass) {
        if ($("#appMessage").length) {
          $("#appMessage").fadeOut().remove();
        }
            
        var elem = $('<div>', {'id': 'appMessage', 'class': dclass || 'error', html: msg});
            
        elem.click(function () {
            $(this).fadeOut(function () {
                $(this).remove();
            }.bind(this));
        });
            
        if (x) {
            setTimeout(function () {
                elem.click();
            }, x * 1000);
        }
            
        elem.hide().appendTo('body').slideDown();
    };
    
    
    $.validateEmail = function (email) {
        var valid = (email.indexOf('@') > 0 && email.indexOf('.') > email.indexOf('@'));
            
        return valid;
    };
        

    $.validateName = function (name) {
        if ((!name || name.length < 3)) {
            return false;     
        }
            
        return true;
    };
        

    $.validatePassword = function (password) {    
        if (password && password.length < 6) {
            return false; 
        }
            
        return true;
    };
    
    window.onerror = function (errorMsg, url, lineNumber) {
        alert(errorMsg + ' ' + lineNumber + ' ' + url);
    };
}(window, jQuery));/*
    @Namespace: App - application namespace.
*/

if (!String.prototype.trim) {
    String.prototype.trim = function() {   // 
	    return this.replace(/^\s+|\s+$/g,'');
    };
} 

(function (window, Backbone) {
    "use strict";

    var App = {
    
        /*
            
            @Api:   public   
            @param: (String) page 
            @param: (Array) bookmarks - collection of bookmarks
        */
        init: function (page, bookmarks) {
            var index, controller;
            
            App.page = page;
            
            if (page === 'home' || page === 'demo') {
                controller = new App.Views.Controller({collection: bookmarks});
                App.Views.Controller = controller;
            }
            if (page === 'index') {
                index = new App.Views.Index();
            
                App.Views.Index = index;
            }
        

            Backbone.history.start();
        },
    
    
        Views: {},
    
    
        Routes: {},
    
    
        Models: {},
    
    
        Collections: {}
    };
  
    window.App = App;
    
}(window, Backbone));/*
    @Module - App.Models.Bookmark - holds user data
    @Dependencies - Backbone
                  - jQuery
*/
(function (Backbone, models, $) {
    "use strict";
    
    models.User = Backbone.Model.extend({
        defaults: {
            name: '',
            email: '',
            password:''
        },
        
        
        task: '',
        
        
        urlRoot: 'user',
        
        
        setUrl: function (url) {
            this.url = url;
        },
        
        
        validate: function (attr) {
            if (!$.validateName(attr.name) && (this.task === 'register' || this.task === 'update')) {
                $('#name').addClass('warning');
                
                return 'Name input is not valid';
            }
            
            if (!$.validateEmail(attr.email)) {
                var id = (this.task === 'login') ? '#login-email': '#email';
                
                $(id).addClass('warning');
                
                return 'Email input is not valid';
            }
            
            if (!$.validatePassword(attr.password)) {
                return 'Password input is not valid';
            }
        },
        
        
        update: function (data, options) {
            var changedAttributes = {}, model = this, attr, update = false;
            
            for (attr in data) {
                if (data[attr] !== model.get(attr)) {
                    changedAttributes[attr] = data[attr];
                    update = true;
                }
            }
            
            if (update) {
               model.save(changedAttributes, options);
            }
            else {
                $.shout('Nothing to update', 10, 'success');
            }
        }
    });
}(Backbone, App.Models, jQuery));
