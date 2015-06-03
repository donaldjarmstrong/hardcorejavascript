var R = require('ramda');
var Maybe = require('pointfree-fantasy/instances/maybe');

/*
 NATURAL TRANSFORMATION
 */
// natural transformations
// compose(nt, map(f)) == compose(map(f), nt)

// maybeToArray :: Maybe a -> Array a
var maybeToArray = (x) => {
	return (x.val) ? [x.val] : [];
};

console.log(R.difference(maybeToArray(Maybe(3)), [3]).length === 0);
console.log(R.difference(maybeToArray(Maybe(null)), []).length === 0);
