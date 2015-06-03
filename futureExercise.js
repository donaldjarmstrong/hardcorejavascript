var _ = require('ramda');
var P = require('pointfree-fantasy');
var Future = require('data.future');
var map = _.map;
var compose = P.compose;
var Maybe = require('pointfree-fantasy/instances/maybe');
var Identity = P.I;
var IO = require('./IO');
var Bacon = require('bacon');
IO.extendFn();


// Exercise 1
// ==========
// Use getPost(id) to return a Future of the title of the post ({id: i, title: 'Love them futures'})
console.log("--------Start exercise 1--------");

var ex1 = _.compose(map(_.prop('title')), getPost);

ex1(3).fork(console.error, function(title){
	assertEqual('Love them futures', title);
	console.log("exercise 1..ok!");
});

// Exercise 2
// ==========
// Use ex1 to extend the computation and render the title in a div
console.log("--------Start exercise 2--------");

var render = function(x){ return "<div>"+x+"</div>"; };
var ex2 = _.compose(map(render), ex1);

ex2(3).fork(log, function(html){
	assertEqual('<div>Love them futures</div>', html);
	console.log("exercise 2...ok!");
});






// Exercise 3
// ==========
// In JSBin, click the "Output" tab to see a div. Click this div to run the test.
// Turn the clicks into a stream of the div's innerHTML
//console.log("--------Start exercise 3--------")
//
//var clicks = Bacon.fromEventTarget(document.querySelector("#box"), "click")
//
////Todo: turn clicks into a stream of the e.target.innerHTML
//var htmlClicks = clicks;
//
//htmlClicks.onValue(function(html){
//	assertEqual('<span>CLICK ME</span>', trim(html))
//	console.log("exercise 3...ok!")
//})







// Exercise 4
// ==========
// Keep the Output tab open. Type into the input to run the test.
// Transform the keydowns into a stream of the input's value
// Then use pureLog() to log it to the console
//console.log("--------Start exercise 4--------")
//
//var pureLog = function(x){ console.log(x); return x; }.toIO();
//var search_input = document.querySelector("#search")
//var keydowns = Bacon.fromEventTarget(search_input, "keydown")
//
////Todo: turn keydowns into a stream of the logged input's value
//var logs = keydowns;
//
//logs.onValue(function(io){
//	assertEqual(search_input.value, runIO(io))
//	console.log("exercise 4...ok!")
//})







// Exercise 5*
// ==========
// Use only safeGet() to safely return the street name
console.log("--------Start exercise 5--------");

var safeGet = _.curry(function(x,o){ return Maybe(o[x]) });
var user = {id: 2, name: "Albert", address: { street: {number: 22, name: 'Walnut St'} } };
var ex5 = _.compose(safeGet('name'), safeGet('street'), safeGet('address'));

assertDeepEqual(Maybe(Maybe(Maybe('Walnut St'))), ex5(user));
console.log("exercise 5...ok!");









// TEST HELPERS
// =====================
function inspectIt(x){
	return (x.inspect && x.inspect()) || (x.toString && x.toString()) || x.valueOf(); //hacky for teachy.
}

function assertEqual(x,y){
	if(x !== y){ throw("expected "+x+" to equal "+y); }
}
function assertDeepEqual(x,y){
	if(inspectIt(x) !== inspectIt(y)) throw("expected "+inspectIt(x)+" to equal "+inspectIt(y));
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