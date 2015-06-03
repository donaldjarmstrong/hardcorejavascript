var Task = require('data.task');
var Async = require('control.async')(Task);
var R = require('ramda');
var P = require('pointfree-fantasy');
var _ = require('lodash');

var log = function (x) {
	console.log(`in log=${x}`);
	return x;
};

var readFile = function () {
	// this is a file that has a bunch of product Id's
	return new Task(function (reject, res) {
		setTimeout(function () {
			res('123\n456\n789');
			//res([123, 456, 789])
		}, 3000);
	});
};

var httpGet = function (x) {
	console.log('in httpGet ', x);
	//return x + 'F';
	return Task.of(x + 'F');
};
var writeToMongo = function (x) {
	console.log('in writeToMongo ', x);
	//return x + 'G';
	return Task.of(x + 'G');
};

var split = R.split('\n');
var callApi = P.traverse(httpGet, Task.of);
var saveData = P.traverse(writeToMongo, Task.of);

var ex1 = R.compose(R.chain(saveData), R.chain(callApi), R.map(split), readFile);
ex1().fork(console.error, function (res) {
	console.log(res);
});
