'use strong';

const _ = require('ramda');

/*****************************************
 C U R R Y I N G  E X A M P L E
 ******************************************/

// We've got a nice multiply function.
// It takes two arguments.

console.log( _.multiply(3, 4) );

// But it has been secretly curried already
// so we can feed it fewer arguments and it
// will return a new function.
//
// How about making a function to double a
// value? Done.
const double = _.multiply(2);

console.log( double(13) );

/*****************************************
 Y O U R  T U R N
 ******************************************/

// _.split pulls a string apart around a
// given value
console.log( _.split('i', 'mississippi') );

// -- Challenge 1 ------------------------
// Make a function called "words" which
// returns a list of words in a string.
// Use only the split function and
// currying.

console.log("Testing challenge 1...");

//const words = undefined; // change this
//const words = _.curry(function (what, str) {
//	return String.prototype.split.apply(str, [what]);
//})(' ');

const words = _.split(' ');

assertEqualArrays(
	['one', 'two', 'three'],
	words('one two three')
);
console.log("passed");

// -- Challenge 2 ------------------------
// Create a function to triple every
// number in a list using only
// _.multiply and _.map.

console.log("Testing challenge 2...");

const tripleList = _.map(_.multiply(3));

assertEqualArrays([3,6,9], tripleList([1,2,3]));

console.log("passed");

// -- Challenge 3 ------------------------
// Create a function to find the largest
// number in a list. You can use the
// greater(a,b) function which returns the
// greater of its two inputs. You can do
// this with currying and one of the list
// functions _.map, _.filter, or _.reduce.

console.log("Testing challenge 3...");

const greater = function(a,b) {
	return a > b ? a : b;
};

//const max = (arr) => {
//	return arr.reduce(function (prev, curr) {
//		return greater(prev, curr);
//	});
//};

const max = _.reduce(greater, -Infinity);

assertEqual(9, max([1,-3483,9,7,2]));
assertEqual(-1, max([-21,-3483,-2,-1]));

console.log("passed");

console.log("All tests pass.");
/******************************************
 B A C K G R O U N D  C O D E
 *******************************************/

function assertEqualArrays(x,y) {
	if(x.length !== y.length) throw("expected "+x+" to equal "+y);
	for (let i of x) {
	//for(var i in x) {
		if(x[i] !== y[i]) {
			throw("expected array "+x+" to equal "+y);
		}
	}
}
function assertEqual(x,y){
	if(x !== y) throw("expected "+x+" to equal "+y);
}
