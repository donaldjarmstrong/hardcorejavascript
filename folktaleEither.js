var P = require('pointfree-fantasy');
var R = require('ramda');
var F = require('folktale');

var Right = require('data.either').Right;
var Left = require('data.either').Left;

var determineAge = function (user) {
	return user.age ? Right(user.age) : Left('couldnt get age');
};

var yearOlder = R.compose(R.map(R.add(1)), determineAge);

//var f = yearOlder({ age: 22});
var f = yearOlder({age: null});

console.log(f);