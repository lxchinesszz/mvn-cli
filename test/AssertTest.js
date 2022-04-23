const Asserts = require('../util/Asserts')

let _ = require('lodash')



console.log(_.trim("").length);
console.log(Asserts.isBlank("123"));

console.log(Asserts.isBlank(null));
