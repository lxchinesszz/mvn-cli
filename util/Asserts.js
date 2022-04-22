let _ = require('lodash')

function Asserts() {
}

Asserts.isBlank = function (value) {
    if (_.isUndefined(value)) {
        return true
    }
    if (_.isNull(value) || _.isNaN(value)) {
        return true
    }
    // 是字符串,trim后长度是0，说明是空
    if (_.isString(value) && _.trim(value).length === 0) {
        return false;
    }
    return false;
}
module.exports = Asserts

