'use strict';

var runIO = function (io) {
	return io.val.apply(this, [].slice.call(arguments, 1));
};

var IOType = function (fn) {
	this.val = fn;
	this.runIO = this.val;
};

var IO = function (fn) {
	return (new IOType(fn));
};

IOType.of = function (x) {
	return IO(function () {
		return x;
	});
};
IOType.prototype.of = IOType.of;

IOType.prototype.chain = function (g) {
	var io = this;
	return IO(function () {
		return g(io.val()).val();
	});
};

// Derived
IOType.prototype.map = function (f) {
	return this.chain(function (a) {
		return IOType.of(f(a));
	});
};
IOType.prototype.ap = function (a) {
	return this.chain(function (f) {
		return a.map(f);
	});
};

var extendFn = function () {
	Function.prototype.toIO = function () {
		var self = this;
		return function (x) {
			var args = arguments;
			return IO(function () {
				return self.apply(this, args)
			});
		};
	};
};


var inspect = function (x) {
	if (x == null || x == undefined) return "null";
	return x.inspect ? x.inspect() : x.toString();
};

IOType.prototype.inspect = function () {
	return 'IO(' + inspect(this.val) + ')';
};

IOType.prototype.toString = function () {
	return this.inspect();
};

IO.of = function (x) {
	return IO(x).of(x);
};

module.exports = {
	IO: IO,
	runIO: runIO,
	extendFn: extendFn
};
