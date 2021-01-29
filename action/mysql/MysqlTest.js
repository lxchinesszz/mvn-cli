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

const mysqlAction = new MysqlAction('10.70.21.50','erp-test','c5ggCY9z65jggNHX','pms_dev')


mysqlAction.create('arrival_notice_order_detail')
