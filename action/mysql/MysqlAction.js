const mysql = require('mysql')
const path = require('path')
const JavaFileTemplate = require('../../template/JavaFileTemplate')
const javaFileTemplate = new JavaFileTemplate(path.resolve(__dirname, 'domain.java'))
let typeMapping = require('./mapper.json')
const {consoleTableString, markdownTableString} = require('../../util/TableUtils')
const _ = require('lodash')
const logger = require('../../util/logger')
const FileDirCreatorAction = require('../FileDirCreatorAction')

function ExportError(msg) {
    this.name = "ExportError";
    this.message = msg || "导出异常";
}

ExportError.prototype = Object.create(Error.prototype);

ExportError.prototype.constructor = ExportError


function MysqlAction(host, user, password, database) {


    this._createConn = function () {
        return mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        })
    }


    this.create = function (tableName, suffix, filePath) {
        let connection = this._createConn()
        let table_info_query = `select TABLE_SCHEMA,TABLE_NAME, COLUMN_NAME,COLUMN_KEY,DATA_TYPE,COLUMN_COMMENT from information_schema.COLUMNS where table_name = '${tableName}' and TABLE_SCHEMA = '${database}';`
        logger.debug("SQL:" + table_info_query)
        let currentTableName = tableName
        connection.query(table_info_query, function (error, results, fields) {
            if (!results || results.length === 0) {
                logger.error(`🚴 Creating a fail: tableName['${currentTableName}'],suffix:['${suffix}'],path:['${filePath}']`)
                connection.destroy()
                return
            }
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
            }
            let className = fistUpper(_.camelCase(tableName)) + suffix
            new FileDirCreatorAction().create(filePath + '/')
            javaFileTemplate.create({
                className: className,
                tableName: tableName,
                fields: javaFields,
                imports: _.uniq(imports),
                packages: fetchDalModelPackage(filePath)
            }, `${filePath}/${className}.java`)
            connection.destroy()
            let fullPath = `${filePath}/${className}.java`;
            logger.success(`🚴 Creating a successful: tableName['${tableName}'],suffix:['${suffix}'],path:['${fullPath}']`)
        });
    }

    /**
     * 执行导出表结构
     * @param tableName
     */
    this.export = function (tableName) {
        let table_info_query = `select TABLE_SCHEMA,TABLE_NAME, COLUMN_NAME,COLUMN_KEY,DATA_TYPE,COLUMN_COMMENT from information_schema.COLUMNS where table_name = '${tableName}' and TABLE_SCHEMA = '${database}';`
        logger.info("SQL:" + table_info_query)
        this._queryCallback(tableName, table_info_query, (tableInfo, results) => {
            let rows = []
            let tableComment = ''
            results.forEach(result => {
                let model = this._convertModel(result)
                let pri = model.primaryKeyFlag
                let row = [model.columnName, model.javaType, model.columnType, model.columnComment, pri]
                rows.push(row)
            })
            logger.successNoIcon(`表名:${tableName}(${tableInfo.tableComment})`)
            logger.successNoIcon(consoleTableString(["字段名", "字段Java类型", "字段db类型", "备注", "主键"], rows), true)
        })
    }

    /**
     * 执行导出表结构
     * @param tableName
     */
    this.exportMarkdown = function (tableName) {
        let table_info_query = `select TABLE_SCHEMA,TABLE_NAME, COLUMN_NAME,COLUMN_KEY,DATA_TYPE,COLUMN_COMMENT from information_schema.COLUMNS where table_name = '${tableName}' and TABLE_SCHEMA = '${database}';`
        logger.info("SQL:" + table_info_query)
        this._queryCallback(tableName, table_info_query, (tableInfo, results) => {
            let rows = []
            results.forEach(result => {
                let model = this._convertModel(result)
                let pri = model.primaryKeyFlag
                let row = [model.columnName, model.javaType, model.columnType, model.columnComment, pri]
                rows.push(row)
            })
            console.log()
            logger.successNoIcon(`## 表名:${tableName}(${tableInfo.tableComment})`)
            logger.successNoIcon(markdownTableString(["字段名", "字段Java类型", "字段db类型", "备注", "主键"], rows), true)
        })
    }

    /**
     * 将表模型转换成实体
     * @param result
     * @returns {{columnType: *, columnComment: *, primaryKeyFlag: *, columnName: *, javaType: *}}
     * @private
     */
    this._convertModel = function (result) {
        return {
            // 1. 字段名
            columnName: result['COLUMN_NAME'],
            // 2. 是否是主键
            primaryKeyFlag: result['COLUMN_KEY'],
            // 3. 字段类型
            columnType: result['DATA_TYPE'],
            // 4. 字段备注
            columnComment: result['COLUMN_COMMENT'],
            // 5. 对应的java类型
            javaType: typeMapping[`${result['DATA_TYPE']}`]['javaType']
        }
    }


    /**
     * 统一处理查询操作
     * @param table_name 表信息
     * @param table_info_query
     * @param callback
     * @private
     */
    this._queryCallback = function (table_name, table_info_query, callback) {
        let connection = this._createConn()
        let table_comment_query = `select TABLE_COMMENT from information_schema.TABLES where table_name =  '${table_name}' and TABLE_SCHEMA = '${database}';`
        logger.info("SQL:" + table_comment_query)
        // 1. 查询表信息
        connection.query(table_comment_query, function (tableError, tableResults, tableFields) {
            if (tableError) {
                logger.error(tableError)
                throw new ExportError(tableError);
            } else {
                connection.query(table_info_query, function (error, results, fields) {
                    if (!error) {
                        logger.error(`数据模型导出失败,请检查数据库配置或是否存在将要导出的表名:${table_name}`)
                        throw new ExportError(tableError);
                    }
                    callback({
                        tableName: table_name,
                        tableComment: tableResults[0]['TABLE_COMMENT']
                    }, results)
                    connection.destroy()
                })
            }
        })
    }
}


/**
 * 根据路径生成java的包目录
 * @param filePath "sass-dal/src/main/java/com/idea/sass/dal/model/entity/group";
 * @returns {string}
 */
function fetchDalModelPackage(filePath) {
    let strings = _.split(filePath, "java/");
    let str = strings[1];
    let reg = new RegExp("/", 'g');//g就是代表全部
    return str.replace(reg, ".");
}


function fistUpper(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}


module.exports = MysqlAction
