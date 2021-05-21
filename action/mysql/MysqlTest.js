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

const mysqlAction1 = new MysqlAction('127.0.0.1','test','123456','dev')
const mysqlAction2 = new MysqlAction('127.0.0.1','test','123456','dev')


mysqlAction1.create("sdad", "DO", './')
mysqlAction2.create("sda", "DO", './')

