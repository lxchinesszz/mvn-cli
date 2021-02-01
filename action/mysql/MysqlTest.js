const JavaFileTemplate = require('../../template/JavaFileTemplate')

// const connection = mysql.createConnection({
//     host: '120.26.68.230',
//     user: 'root',
//     password: 'kdm001',
//     database: 'springlearn'
// })
//
// connection.connect()

const MysqlAction = require('./MysqlAction')

const mysqlAction1 = new MysqlAction('10.70.21.50','erp-test','c5ggCY9z65jggNHX','pms_dev')
const mysqlAction2 = new MysqlAction('10.70.21.50','erp-test','c5ggCY9z65jggNHX','pms_dev')


mysqlAction1.create("demand_plan_detail", "DO", './')
mysqlAction2.create("demand_plan", "DO", './')

