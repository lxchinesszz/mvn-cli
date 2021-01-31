let {getJmvnConfig} = require('./ConfigUtils')

function getDomainModels() {
    let jmvnConfig = getJmvnConfig();
    let domainModels = JSON.parse(jmvnConfig)["models"];
    let newDomainModels = []
    for (let i = 0; i < domainModels.length; i++) {
        let domainModel = domainModels[i];
        if (!domainModel.suffix) {
            console.log("后缀缺失,默认DO")
        }
        if (!domainModel.tableName) {
            console.log(domainModel.tableName)
            continue
        }
        if (!domainModel.path) {
            console.log("路径缺失")
            continue
        }
        newDomainModels.push(domainModel)
    }
    return newDomainModels
}

module.exports = {getDomainModels}
