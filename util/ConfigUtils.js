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
    let jmvnConfig = getConfig('./.mvn-cli')
    try {
        JSON.parse(jmvnConfig)
    } catch (e) {
        throw new Error("./mvn-cli 语法检查警告, 建议复制配置信息检查Json语法！https://www.json.cn/️")
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


