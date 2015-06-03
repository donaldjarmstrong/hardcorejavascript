'use strong';

let R = require('ramda');

/// set theory

// every function is a single-value set of pairs
// ie.
//  X   Y
// (-2, -1)
// (0, 0)
// (2, 1)

// not this
//  X  Y
// (1, D)
// (2, B)
// (2, C) <-- bad

// functions with a given input must always products that output.

// Domain === X
// Range (or co-domain) === Y
// the domain represents things that are eligible to be put into a function
// the range represents the answers for that input

let people =  [ { name: 'Donnie'}, {name: 'JoAnne'} ];

// using the 'dot' access, we cannot compose functions together

function get(property, object) {
	return object[property];
}

function getPersonName(person) {
	return get('name', person);
}

console.log(people.map(getPersonName));

// now with curry
let getFrom = R.curry(get);

console.log(people.map(getFrom('name')));

// functors have laws