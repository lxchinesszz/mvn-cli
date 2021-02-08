let path = require('path')
let fs = require('fs')

function getConfig(filePath) {
    let jmvnConfigPath = path.resolve(filePath)
    if (fs.existsSync(jmvnConfigPath)) {
        return fs.readFileSync(jmvnConfigPath, 'utf-8');
    } else {
        throw new Error(`File not found:[${jmvnConfigPath}',Please check if it is under the root of the project.`)
    }
}

/**
 * 读取配置文件地址
 * @returns {*}
 */
function getJmvnConfig() {
    let jmvnConfig = getConfig('./.mvn-cli')
    try {
        JSON.parse(jmvnConfig)
    } catch (e) {
        throw new Error("./mvn-cli Configuration file syntax error warning, It is recommended to copy the configuration information and check the JSON syntax！https://www.json.cn/️")
    }
    return jmvnConfig
}

/**
 * 文件重置
 * @param jmvnConfig
 */
function writeJmvnConfig(jmvnConfig) {
    fs.writeFileSync('./.mvn-cli', jmvnConfig)
}

module.exports = {getJmvnConfig, writeJmvnConfig}


