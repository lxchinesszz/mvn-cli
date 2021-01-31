let path = require('path')
let fs = require('fs')

function getConfig(filePath) {
    let jmvnConfigPath = path.resolve(filePath)
    console.log("jmvnConfigPath:" + jmvnConfigPath)
    if (fs.existsSync(jmvnConfigPath)) {
        return fs.readFileSync(jmvnConfigPath, 'utf-8');
    } else {
        throw new Error(`文件:${jmvnConfigPath},不存在`)
    }
}

/**
 * 读取配置文件地址
 * @returns {*}
 */
function getJmvnConfig() {
    return getConfig('./.mvn-cli')
}


module.exports = {getJmvnConfig}


