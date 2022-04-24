import {Asserts} from "../util/Asserts.js";
import _ from 'lodash'
console.log(_.trim("").length);
console.log(Asserts.isBlank("123"));

console.log(Asserts.isBlank(null));
