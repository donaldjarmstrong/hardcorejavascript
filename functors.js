var R = require('ramda');
var map = R.map;
var capitalize = R.toUpper;
var match = R.match;
var compose = R.compose;

// FUNCTORS!
// any object or structure you can map over!!
// If it has a map function, it is probably a functor

// MAP is not about iterating, but instead think of it as going inside an object and running a function

// how to deal with nulls?
// Maybe functor
var _Maybe = function (x) {
	this.val = x;
};

var Maybe = function (x) {
	console.log(`maybe=${x}`);
	return new _Maybe(x);
};

_Maybe.prototype.map = function (f) {
	// this is an abstraction of function application!
	return this.val ? Maybe(f(this.val)) : Maybe(null);
};

//console.log(map(capitalize, Maybe('flamethrower')));
//console.log(map(capitalize, Maybe(null)));

var dsds = R.compose(map(capitalize), Maybe, match(/cat/g));
console.log(dsds('cat'));

//console.log(dsds('dog'));