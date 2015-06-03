var assert = require('assert');
var R = require('ramda');

/*
 https://esolangs.org/wiki/Combinatory_logic
 */

// I-Combinator
// I, the identity combinator. Applied to some combinator x, it simply evaluates to x:
var I = function (x) {
	return x;
};

// K-Combinator
// K, the constant-making combinator. Applied to some combinator x, it yields a combinator
// that always evaluates to x, no matter what it is applied to:
var K = function (x) {
	return function (y) {
		return x;
	}
};

// S-Combinator
// S, the application combinator. Applied to three combinators, it applies each of the first
// two combinators to the last, then applies the first result of that to the second:
//var S = function (last, first, second, x) {
//	return last(first(x), second(x));
//};
var SS = function (x) {
	return function (y) {
		return function (z) {
			return x(z)(y(z));
		}
	}
};

var S = function(x) {
	return function(y) {
		return function(z) {
			/* Immediately execute the left-hand spine, but defer evaluation of the
			 * right-hand argument until it is actually called. (Lazy evaluation.) */
			return x(z)(function(d) {
				return y(z)(d);
			});
		};
	};
};

var Y = S (K(S(I)(I))) (S(S(K(S))(K)) (K(S(I)(I))));

Y;    //evals to:
//function (z) {return x(z)(y(z));}

//And this (lifted from Crockford's Site):
var factorial = Y(function (fac) {
	return function (n) {
		return n <= 2 ? n : n * fac(n - 1);
	};
});

console.log(factorial(4));