/*
An example of how names really pollute the landscape of grokking code.

how many places we are using the word error?
 */
var on_error = function (f) {
	f( new Error('howdy error!'));
};

on_error(function (error) {
	console.log(error.message);
});

// simple compose example
// does not care what is inside f or g,
// it just pushes a value (x) through
var compose = function (g, f) {
	return function (x) {
		g(f(x));
	}
};

// point-free version of on_error
var on_error_pf = compose(console.log, get('message'));
