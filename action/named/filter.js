const config = require('./config');

import _ from 'lodash'
module.exports = {
    run:function (s) {
        let strArr = s.toLowerCase();
        return _.difference(strArr.split(' '),_.union(config.filter.prep,config.filter.prefix,config.filter.suffix,config.filter.verb));
    }
};
