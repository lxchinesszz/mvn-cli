import {JavaFileTemplate} from '../../template/JavaFileTemplate.js'

// const connection = mysql.createConnection({
//     host: '120.26.68.230',
//     user: 'root',
//     password: 'kdm001',
//     database: 'springlearn'
// })
//
// connection.connect()

import MysqlAction from './MysqlAction.js'

const mysqlAction1 = new MysqlAction('10.80.20.8', 'abm_dev', 'pOj*4Z%^izKy0o23o8aH', 'pms_dev')

mysqlAction1.export("replenish_order");
// mysqlAction1.create("sdad", "DO", './')
// mysqlAction2.create("sda", "DO", './')

//
// import {toJson} from "../../util/JsonUtils.js";
//
// console.log(toJson('./mapper.json'));
