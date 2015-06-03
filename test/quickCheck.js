"use strict";

var assert = require("assert"),
	qc = require("quickcheck");

function propertyEven(x) { return x % 2 === 0; }

function arbEven() {
	var b = qc.arbByte();

	if (b % 2 === 0) { return b; }
	else { return (b + 1) % 256; }
}

function validInteger(s) {
	var i = parseInt(s, 10);
	return typeof i === "number" && !isNaN(i);
}

function arbDigits() {
	var
		d = "",
		fn = function () { return String.fromCharCode(48 + Math.floor(Math.random() * 10)); };

	while (d.length < 1) { d = qc.arbArray(fn); }

	return d;
}

describe("quickcheck", function() {
	describe("forAll", function () {
		it("random numbers should not all be even", function() {
			assert.notEqual(true, qc.forAll(propertyEven, qc.arbByte));
		});

		it("random even numbers should all be even", function() {
			assert.equal(true, qc.forAll(propertyEven, arbEven));
		});

		it("random strings should not all be valid numbers", function() {
			assert.notEqual(true, qc.forAll(validInteger, qc.arbString));
		});

		it("random digits should all be valid numbers", function() {
			assert.equal(true, qc.forAll(validInteger, arbDigits));
		});
	});
});

console.log(qc.arbString());