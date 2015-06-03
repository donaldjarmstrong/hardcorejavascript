var range = require('range_check');

var x = range.in_range('161.225.196.111', '161.225.0.0/16');

console.log(x);