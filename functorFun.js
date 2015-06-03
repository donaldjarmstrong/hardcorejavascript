var R = require('ramda');
var assert = require('assert');

var Maybe = require('pointfree-fantasy/instances/maybe');
var deepCompare = require('./deepCompare');

// reverse :: String -> String
// http://eddmann.com/posts/ten-ways-to-reverse-a-string-in-javascript/
var reverse = (x) => { return x.split('').reverse().join('') };

// toArray :: a -> Array a
var toArray = (x) => { return [x] };

var uppercase = (x) => { return x.toUpperCase(); };

var a = R.compose(toArray, uppercase, reverse)('Bingo');

var b = R.compose(R.map(reverse), R.map(uppercase), toArray)('Bingo');

// very effecient
var c = R.compose(R.map(R.compose(uppercase, reverse)), toArray)('Bingo');

var d = R.compose(R.map(reverse), toArray, uppercase)('Bingo');

assert(a.toString() == b.toString() && b.toString() == c.toString() && c.toString() == d.toString());

