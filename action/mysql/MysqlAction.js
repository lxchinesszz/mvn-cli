const mysql = require('mysql')
const JavaFileTemplate = require('../../template/JavaFileTemplate')
const javaFileTemplate = new JavaFileTemplate('./java')
let typeMapping = require('./mapper.json')
const _ = require('lodash')

function MysqlAction(host, user, password, database) {

    this._createConn = function () {
        return mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        })
    }

    this.create = function (tableName) {
        let connection = this._createConn()
        let table_info_query = `select TABLE_SCHEMA,TABLE_NAME, COLUMN_NAME,COLUMN_KEY,DATA_TYPE,COLUMN_COMMENT from information_schema.COLUMNS where table_name = '${tableName}' and TABLE_SCHEMA = '${database}';`
        connection.query(table_info_query, function (error, results, fields) {
            if (error) throw error;
            let tableName = results[0]['TABLE_NAME'];
            let javaFields = []
            let imports = []
            for (let result of results) {
                // 1. 字段名
                let columnName = result['COLUMN_NAME'];
                // 2. 是否是主键
                let primaryKeyFlag = result['COLUMN_KEY'] === 'PRI'
                // 3. 字段类型
                let columnType = result['DATA_TYPE'];
                // 4. 字段备注
                let columnComment = result['COLUMN_COMMENT'];

                let javaType = typeMapping[`${columnType}`]['javaType']
                let importPath = typeMapping[`${columnType}`]['package']
                javaFields.push({
                    javaType: javaType,
                    name: columnName,
                    comment: columnComment,
                    primary: primaryKeyFlag
                })
                if (importPath) {
                    imports.push(importPath)
                }
                console.log(result)
            }
            let className = fistUpper(_.camelCase(tableName)) + 'DO'
            javaFileTemplate.create({
                className: className,
                tableName: tableName,
                fields: javaFields,
                imports: _.uniq(imports)
            }, `${className}.java`)
            connection.destroy()
        });


    }
}


function fistUpper(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}


module.exports = MysqlAction
