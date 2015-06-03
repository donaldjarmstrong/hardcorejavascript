var R = require('ramda');
var Task = require('data.task');
var Maybe = require('data.maybe');

var p = function () {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve('got data');
		}, 300)
	})
};

//p().then(console.log);

var g = R.compose(Task.of, p);

g().fork(console.error, console.log);


