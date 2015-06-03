var R = require('ramda-fantasy');
var Future = R.Future;

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
	return new Future(function(reject, resolve) {
		promise.then(resolve).catch(reject);
	});
}

// this is really a task
toTask(p(5000)).fork(console.error, console.log);

