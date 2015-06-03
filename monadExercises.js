var _ = require('ramda');
var P = require('pointfree-fantasy');
var Future = require('data.future');
var map = _.map;
var compose = P.compose;
var chain = P.chain;
var Maybe = require('pointfree-fantasy/instances/maybe');
var Identity = P.I;
var IO = require('./IO');
var Bacon = require('bacon');
IO.extendFn();


// Exercise 1
// ==========
// Use safeGet and mjoin or chain to safetly get the street name
console.log("--------Start exercise 1--------");

var safeGet = _.curry(function(x,o){ return Maybe(o[x]) });
var user = {id: 2, name: "Albert", address: { street: {number: 22, name: 'Walnut St'} } };

// mjoin
//var ex1 = compose(P.mjoin, map(safeGet('name')), P.mjoin, map(safeGet('street')), safeGet('address'));

// chain (because mjoin, map === chain
var ex1 = compose(chain(safeGet('name')), chain(safeGet('street')), safeGet('address'));

assertDeepEqual(Maybe('Walnut St'), ex1(user));
console.log("exercise 1...ok!");








// Exercise 2
// ==========
// Use monads to get the href, then purely log it.

console.log("--------Start exercise 2--------");

var getHref = function(){ return 'http://run.jsbin.io/runner' }.toIO();
var pureLog = function(x){ console.log(x); return x; }.toIO();

// mjoin version
//var ex2 = compose(P.mjoin, map(pureLog), getHref);

// chain version
var ex2 = compose(chain(pureLog), getHref);

assertEqual("http://run.jsbin.io/runner", IO.runIO(ex2(null)));
console.log("exercise 2...ok!");









// Exercise 3
// ==========
// Use monads to first get the Post with getPost(), then pass it's id in to getComments().
console.log("--------Start exercise 3--------");

//var ex3 = compose(P.mjoin, map(getComments), map(safeGet('id')),  getPost);
var ex3 = compose(chain(getComments), map(safeGet('id')),  getPost);

ex3(13).fork(log, function(res){
	assertEqual(2, res.length);
	console.log("exercise 3...ok!")
});












// TEST HELPERS
// =====================
function inspectIt(x){
	return (x.inspect && x.inspect()) || (x.toString && x.toString()) || x.valueOf(); //hacky for teachy.
}

function assertEqual(x,y){
	if(x !== y){ throw("expected "+x+" to equal "+y); }
}
function assertDeepEqual(x,y){
	if(x.val !== y.val) throw("expected "+inspectIt(JSON.stringify(x))+" to equal "+inspectIt(JSON.stringify(y)));
}

function log(x){ console.log(x); return x; }

function getPost(i) {
	return new Future(function(rej, res) {
		setTimeout(function(){
			res({id: i, title: 'Love them futures'})
		}, 300)
	})
}

function getComments(i) {
	return new Future(function(rej, res) {
		setTimeout(function(){
			res(["This class should be illegal", "Monads are like space burritos"])
		}, 300)
	})
}

function trim(x){ return x.replace('/\S{0,}/g', ''); }