const {getDbConfig} = require('../util/DbUtils')
const MysqlAction = require('./mysql/MysqlAction')
const {getDomainModels, comparedDomainModel} = require('../util/DomainModelUtils')
const logger = require('../util/logger')
function DomainModelCreateAction() {

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

}

module.exports = DomainModelCreateAction
