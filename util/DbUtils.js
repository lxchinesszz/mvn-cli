let {getJmvnConfig} = require('./ConfigUtils')

function getDbConfig() {
    let jmvnConfig = getJmvnConfig();
    console.log("jmvnConfig:" + jmvnConfig)
    let dbConfig = JSON.parse(jmvnConfig)["dbConfig"];
    console.log("dbConfig" + dbConfig)
    if (!dbConfig) {
        throw new Error("请添加配置信息," +
            "\"dbConfig\":{\n" +
            "                \"host\": \"host\",\n" +
            "                \"user\": \"user\",\n" +
            "                \"password\": \"password\",\n" +
            "                \"database\": \"database\"\n" +
            "\t}")
    }
    return dbConfig
}

module.exports = {getDbConfig}
