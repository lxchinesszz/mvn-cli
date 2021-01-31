const {getDbConfig} = require('../util/DbUtils')
const MysqlAction = require('./mysql/MysqlAction')
const {getDomainModels} = require('../util/DomainModelUtils')

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
}

module.exports = DomainModelCreateAction
