import {getDbConfig} from '../util/DbUtils.js'
import MysqlAction from './mysql/MysqlAction.js'
import {getDomainModels, comparedDomainModel} from '../util/DomainModelUtils.js'
import {animation} from "../util/OraUtils.js";

export default function DomainModelCreateAction() {

    /**
     * 读取配置文件并构建表结构
     */
    this.build = function () {
        let dbConfig = getDbConfig()
        if (dbConfig.host && dbConfig.user && dbConfig.password && dbConfig.database) {
            let mysqlAction = new MysqlAction(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database)
            let domainModels = getDomainModels();
            domainModels.forEach(domainModel => {
                domainModel.tableName.forEach(tableName => {
                    mysqlAction.create(tableName, domainModel.suffix, domainModel.path)
                })
            })
        }
    }

    /**
     * 新增表结构并重新构建配置文件
     * @param models
     */
    this.buildAndAdd = function (models) {
        // 1.
        let dbConfig = getDbConfig()
        if (dbConfig.host && dbConfig.user && dbConfig.password && dbConfig.database) {
            let mysqlAction = new MysqlAction(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database)
            models.tableName.forEach(tableName => {
                console.log(`tableName:${tableName},suffix:${models.suffix},path:${models.path}`)
                mysqlAction.create(tableName, models.suffix, models.path)
            })
        }
        // 3. 如果创建成功就将成功匹配的写入到信息
        comparedDomainModel(models)

    }

    /**
     * 导出控制台表格
     * @param dbConfig
     */
    this.exports = function (dbConfig) {
        // 1. 创建实例
        let mysqlAction = new MysqlAction(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database)
        dbConfig.tables.forEach(tableName => {
            animation(`正在执行导出表[${tableName}]从库[${dbConfig.database}]`
                , `${tableName}导出成功`
                , 2000,
                () => {
                    mysqlAction.export(tableName)
                })

        })
    }

    /**
     * 导出markdown格式文档
     * @param dbConfig
     */
    this.exportsMarkdown = function (dbConfig) {
        // 1. 创建实例
        let mysqlAction = new MysqlAction(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database)
        dbConfig.tables.forEach(tableName => {
            animation(`正在执行导出表[${tableName}]从库[${dbConfig.database}]`,
                `${tableName}导出成功`,
                2000, () => {
                    mysqlAction.exportMarkdown(tableName);
                })
        })
    }

}

