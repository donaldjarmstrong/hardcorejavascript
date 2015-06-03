var MaybeType = function (x) { this.val = x; };
var Just = function (x) { this.val = x; };
var Nothing = function (x) { this.val = x; };

//+ notThere :: a -> Bool
var notThere = function (val) {
	return (val === undefined || val === null);
};

var Maybe = function (x) {
	return notThere(x) ? (new Nothing()) : (new Just(x));
};

Maybe.Just = Just;
Maybe.Nothing = Nothing;

Nothing.prototype.concat = function (b) {
	return b;
};

Just.prototype.concat = function (b) {
	if (notThere(b.val)) return this;
	return Maybe(this.val.concat(b.val));
};

Nothing.prototype.empty = function () {
	return new Nothing();
};

Just.prototype.empty = function () {
	return new Nothing();
};

Nothing.prototype.map = function (f) {
	return new Nothing();
};

Just.prototype.map = function (f) {
	return new Just(f(this.val));
};

Nothing.prototype.of = function (x) {
	return new Nothing(x)
};
Just.prototype.of = function (x) {
	return new Just(x)
};

Nothing.of = function (x) {
	return new Nothing().of(x)
};
Just.of = function (x) {
	return new Just().of(x)
};

Maybe.of = function (x) {
	return Maybe(x).of(x);
};

Nothing.prototype.ap = function (m) {
	return new Nothing();
};
Just.prototype.ap = function (m) {
	return m.map(this.val);
};

Nothing.prototype.chain = function (f) {
	return this;
};
Just.prototype.chain = function (f) {
	return f(this.val);
};

var inspect = function (x) {
	if (x == null || x == undefined) return "null";
	return x.inspect ? x.inspect() : x;
};

Nothing.prototype.inspect = function () {
	return 'Maybe(null)';
};
Just.prototype.inspect = function () {
	return 'Maybe(' + inspect(this.val) + ')';
};

Just.prototype.toString = function () {
	return this.inspect();
};
Nothing.prototype.toString = function () {
	return this.inspect();
};

module.exports = {
	Maybe : Maybe
};
