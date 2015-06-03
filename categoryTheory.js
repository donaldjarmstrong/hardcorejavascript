var add = require('ramda').add;
var mult = require('ramda').multiply;
var assert = require('assert');

var capitalize = require('ramda').toUpper;

// associative
// it doesn't matter how we group the numbers
// 1+(2+3) === (1+2) + 3
assert (add(1, (add(2,3))) == add(2, add(1,3)));

// communicative
// we can swap numbers over and still get the same answer
assert (add(1,4) === add(4,1));

// properties of identity
// numbers that keep the expressions the same
// add/sub that number is 0 (additive identity)
// mult/div that number is 1 (mult identity)
var n = 42;
assert(add(n,0) === n);
assert(mult(n, 1) === n);

// distributive
// multiplying a number by a group of numbers added together is the same as doing each multiplication separately
// 3*(2+4) === (3*2)+(3*4)
assert(mult(3, add(2,4)) === add(mult(3,2), mult(3,4)));
// 6*204 === (6*200) + (6*4)
assert(mult(6, 204) === add(mult(6,200), mult(6,4)));
// undistribute (3*1)+(3*5) === 3*(1+5)
assert(add(mult(3,1), mult(3,5) === mult(3, add(1,5))));

/*
polymorphic??

do not even try.  This breaks what add should do
 */
//assert(add('ta', 'cos') === 'tacos');
//assert(add(9.5, .7) === 10.2);
//assert(add([1,2,3], [,4,5,6]) === [1,2,3,4,5,6]);

var compose = function (g, f) {
	return function (x) {
		g(f(x));
	}
};

// what is important
// we need a composition and and an Identity to form a category

/*
Category Laws
 */
// left identity
//assert(compose(id, f) === f);

// right identity
//assert(compose(f, id) === f);

// associativity
//assert(compose(compose(f,g), h) === compose(f, compose(g, h)));

// building apps with functions is like using legos.

/*
 A category consists of two things, a set of objects and a set of morphisms sometimes referred to as
 arrows that relate two of those objects. In layman's terms, a category is a consistent set of things
 (objects) and operations on those things (morphisms/arrows). The abstract nature of both is exactly
 what gives categories and category theory power, because you can define a wide range of systems in
 terms of a categories.
 */

/*
 Additionally each and every category must satisfy three laws:

 Identity: The morphisms in a category must include an identity morphism.
 	In terms of the category Set or Hask and those defined here, the identity
 	morphism is just a function that return it's first and only argument.

 Composition: The composition of morphisms, which is itself a requirement,
 	must be associative. For Hask, Set, and the following categories this is
 	simply function composition (eg . for Hask) and we'll explicitly define a
 	composition function for Html and Jqry. Function application is always
 	associative2 so for Hask, Set and the categories to follow this can be assumed.

 Closed Under Composition: When composing two morphisms in a category the result
 	must also be in the set of morphisms in that same category. For Hask this
 	means that the output of composing two functions must be another function
 	that takes a Haskell type and returns a Haskell type.
 */

/*
 Functors are a single morphism from one category to another. Another way to think
 about them is an operation that can take either an object or a morphism from one
 category and translate it so that it exists or "works" in another category. This
 obviously means that a given functor handles both morphisms and objects.
 */

// what about null? callback? errors?
// we'll use objects!!! not OOP objects

// these will wrap data!
// probably will not create your own for a while!!  (functors)

// container

// constructor function, called with new
var _Container = function (val) {
	this.val = val;
};

/*
The general idea of map is, not an iterator over an array... but hte ability to apply a function
 */
_Container.prototype.map = function (f) {
	return Container(f(this.val));
};

// this is so we can compose without a 'new' keyword
var Container = function (x) {
	return new _Container(x);
};

console.log(Container(5));

// this works fine
capitalize('donnie');

// but not this
//capitalize(Container('donnie'));

// but why put donnie in a container? Null safe!
console.log(Container('donnie').map(capitalize));

// Natural transformations
//





