// http://robotlolita.me/2013/12/08/a-monad-in-practicality-first-class-failures.html

var Maybe = require('data.maybe');
var Either = require('data.either');
var R = require('ramda');

// Array(a) -> Maybe(a)
function first(sequence) {
	return sequence.length > 0 ? Maybe.Just(sequence[0]) : /* otherwise */       Maybe.Nothing()
}

/*
 chain and of. These are the two operations that all monads must implement to be considered a monad.

 and have one operation to manipulate some values of the monad (chain), and an operation to put values
 into a monad (of). These are the only two (low level) ways we can interact with the values, and what
 they do is highly dependent on the specific monad type. We can never interact with the values in a
 monad directly, because that would break the laws (and as you probably know if you’re of legal age
 in your country, breaking the laws tends to end up badly), however we can easily write any sort of
 high-level construct to manipulate the values just using these two functions.
 */
// Monad(a), Monad(a) -> Monad(a)
function concatenate_manual(monadA, monadB) {
	// We take the value of the `monadA`
	return monadA.chain(function (valueA) {
		// And the value of the `monadB`
		return monadB.chain(function (valueB) {
			// And place the concatenated value in a new monad
			// of the same type as the `monadB`
			//
			// The `of` operator allows us to put things inside
			// a monad.
			return monadB.of(valueA + valueB)
		})
	})
}

// Monad(a), (a -> b) -> Monad(b)
function map(monad, transformation) {
	return monad.chain(function (value) {
		return monad.of(transformation(value))
	})
}

// Monad(a), Monad(a) -> Monad(a)
function concatenate(monadA, monadB) {
	return monadA.chain(function (valueA) {
		return map(monadB, function (valueB) {
			return valueA + valueB
		})
	})
}

function lift2M(monadA, monadB, transformation) {
	return monadA.chain(function (valueA) {
		return map(monadB, function (valueB) {
			return transformation(valueA, valueB)
		})
	})
}

var consonants = 'bcd';
var vowels = 'aei';
var nothing = [];

var firstConsonant = first(consonants);
var firstVowel = first(vowels);
var firstNothing = first(nothing);

console.log(firstVowel + firstNothing);   // doesn't make sense
console.log(firstVowel + firstConsonant); // doesn't give you 'ab'

console.log(concatenate(firstVowel, firstNothing));
console.log(concatenate(firstVowel, firstConsonant));

/*
 But we could even abstract it further by realising that we just want a monad with the value computed
 from the value of two monads, a fairly common operation that’s called lift2M
 */
console.log(lift2M(firstVowel, firstConsonant, function (a, b) {
	return a + b
}));


// Int, Int -> Either(fError, Int)
function divide(a, b) {
	return b === 0 ? Either.Left(new Error('Division by 0.')) : /* otherwise */  Either.Right(a / b)
}

console.log(divide(4, 2));  // Right(2)
console.log(divide(5, 0));

// A little abuse of JavaScript's operator semantics :P
var add = concatenate;

// [Either(Error, Int)] -> Either(Error, Int)
function sum(ns) {
	// We need to start from a Monad, but we can reuse our
	// previously defined `add` computation to work on
	// these new monads too!
	return ns.reduce(add, Either.Right(0))
}

// [a], [b] -> Either(Error, [(a, b)])
function zip(xs, bs) {
	return xs.length !== bs.length ? Either.Left(new Error('Can\'t zip lists of different lengths.')) : Either.Right(xs.reduce(function (a, x, i) {
		a.push([x, bs[i]]);
		return a;
	}, []))
}

function dividePairs(nss) {
	return nss.map(function (a) {
		return divide(a[0], a[1])
	})
}

var fives = [5, 10, 15, 20];
var odds = [1, 3, 6, 9];
var alien = [3, 1, 0, 10, 2, 1];

/*
 CHAIN
 every monad provides the chain operation, which allows a function to transform the value from one monad,
 and put the transformed value into another monad

 If this sounds confusing, imagine that in this case we’ve got a cat into a box. We have no way of
 extracting the cat from the box, but we have a machine that will allow us to add a small top hat
 to the cat, and provide a new box of the same shape (lest the poor soul suffers) for it.
 */

// => Right(13.05...)
// zip(fives, odds) -> Either
// dividePairs -> value
// map -> Either [Either]

// (a, b) -> Either [a,b]
var zips = zip(fives, odds);

// Either [a,b] -> Either [ Either(c) ]
var pairs = map(zips, dividePairs);

// Either [a,b] ->
var z = pairs.chain(sum);
console.log(`z=${z}`);

// => Left(Error('Can\'t zip lists of different lengths.'))
var y = map(zip(fives, alien), dividePairs).chain(sum);
console.log(`y=${y}`);

// => Left(Error('Division by 0.')
var x = map(zip(fives, alien.slice(0, 4)), dividePairs).chain(sum);
x.orElse(function (a) {
	console.log(`x=${x} a=${a}`)
});

map(zip(fives, alien), dividePairs)
	.chain(sum)
	.orElse(function (error) {
		console.log('Error when trying to sum the lists: ' + error.message)
	});


/*
 APPLICICATIVE FUNCTORS

 you can think about them as a list where every element is a function, with a map
 operation that, instead of mapping a function over the list, you apply (thus, applicative) the list
 of functions to an element or list of elements.
 */
var Validation = require('data.validation')
var Success = Validation.Success
var Failure = Validation.Failure

// String -> Validation([Error], String)
function isNameValid(name) {
	return /^[\d\w]+$/.test(name) ? Success(name) : /* otherwise */ Failure([new Error('Username can\'t be empty.')])
}

// String -> Validation([Error], String)
function isPasswordLongEnough(password) {
	console.log('long');
	return password.length > 6 ? Success(password) : /* otherwise */ Failure([new Error('Password have to be at ' + 'least 6 characters long.')])
}

// String -> Validation([Error], String)
function isPasswordStrongEnough(password) {
	console.log('strong');
	return /[\W]/.test(password) ? Success(password) : /* otherwise */ Failure(new Error(['Password must contain at ' + 'least one special character.']))
}

// String -> Validation(Array(Error), String)
function isPasswordValid(password) {
	return Success(R.curryN(2, function(a, b){ console.log('in isPassword x=' + JSON.stringify(arguments));return password }))
		.ap(isPasswordLongEnough(password))
		.ap(isPasswordStrongEnough(password))
}

// String, String -> Validation(Array(Error), [String, String])
function isAccountValid(name, password) {
	return Success(R.curryN(2, function(a, b){ console.log('in isAccount x=' + JSON.stringify(arguments));return [a, b] }))
		.ap(isNameValid(name))
		.ap(isPasswordValid(password))
}

console.log(isAccountValid("donnie", "fred.garvin"));