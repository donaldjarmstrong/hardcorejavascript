var Task = require('data.task');
var Async = require('control.async')(Task);

var p = function (delay, err, msg) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (msg) {
				console.log(`message ${msg}`);
			}

			if (err) {
				reject('i broke');
			} else {
				resolve('got data');
			}
		}, delay)
	});
};

function toTask(promise) {
	return new Task(function(reject, resolve) {
		promise.then(resolve).catch(reject);
	});
}

// this is really a task
toTask(p()).fork(console.error, console.log);

// does this actually parallel?
// they should both resolve around 5 seconds, the length
// of the longest execution!
var x = new Date();
Async.parallel([toTask(p(3000)), toTask(p(5000))]).fork(console.err, function (d) {
	console.log('done ok parallel' + (new Date() - x));
	console.log(d);
});

// what happens if there are errors?
// the task should fire error on the first promise that fails
// in the below case, the timer should be around 3000
var xx = new Date();
Async.parallel([toTask(p(5000, true)), toTask(p(3000, true))]).fork(function (d) {
	console.error('done failed parallel' + (new Date() - xx));
	console.error(d);
}, function (d) {
	console.log('done failed parallel' + (new Date() - xx));
	console.log(d);
});

// how about choice?
// it will return rejected, because that one finished first
Async.choice([toTask(p(3000, true)), toTask(p(5000))]).fork(function (d) {
	console.error('done failing choice' + (new Date() - xx));
	console.error(d);
}, function (d) {
	console.log('done failing choice' + (new Date() - xx));
	console.log(d);
});

// how about choice?
// it will return success because that finished first
// but the 5000 sec task is still executing.  There is
// no cancellation!!
Async.choice([toTask(p(5000, true, '5000 choice passing failed')), toTask(p(3000, false, '3000 choice passing pass'))]).fork(function (d) {
	console.error('done passing choice' + (new Date() - xx));
	console.error(d);
}, function (d) {
	console.log('done passing choice' + (new Date() - xx));
	console.log(d);
});
