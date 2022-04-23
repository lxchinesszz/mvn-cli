let path = require('path')
let fs = require('fs')
const logger = require('../util/logger')

function getConfig(filePath) {
    let jmvnConfigPath = path.resolve(filePath)
    if (fs.existsSync(jmvnConfigPath)) {
        return fs.readFileSync(jmvnConfigPath, 'utf-8');
    } else {
        logger.error(`Jmvn Config File not found:[${jmvnConfigPath},请检查根目录下是否存在".jmvn.json"文件`)
        return "{}";
    }
}

/**
 * 读取配置文件地址
 * @returns {*}
 */
function getJmvnConfig() {
    let jmvnConfig = getConfig('./.jmvn.json')
    try {
        JSON.parse(jmvnConfig)
    } catch (e) {
        throw new Error("./.jmvn.json Configuration file syntax error warning, It is recommended to copy the configuration information and check the JSON syntax！https://www.json.cn/️")
    }
    return jmvnConfig
}

/**
 * 文件重置
 * @param jmvnConfig
 */
function writeJmvnConfig(jmvnConfig) {
    fs.writeFileSync('./.jmvn.json', jmvnConfig)
}

module.exports = {getJmvnConfig, writeJmvnConfig}


