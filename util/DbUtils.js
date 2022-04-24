import _ from 'lodash'
import {getJmvnConfig}  from './ConfigUtils.js'


export function getDbConfig() {
    let jmvnConfig = getJmvnConfig();
    // console.info("jmvnConfig:" + jmvnConfig)
    let dbConfig = JSON.parse(jmvnConfig)["dbConfig"];
    if (!dbConfig) {
        throw new Error("请添加db配置节点\n" +
            "\"dbConfig\":{\n" +
            "                \"host\": \"host\",\n" +
            "                \"user\": \"user\",\n" +
            "                \"password\": \"password\",\n" +
            "                \"database\": \"database\"\n" +
            "\t}")
    }
    if (!_.has(dbConfig, 'host')) {
        throw new Error("dbConfig['host'] 不能为空,请键入数据库所在网络IP")
    }
    if (!_.has(dbConfig, 'user')) {
        throw new Error("dbConfig['user'] 不能为空,请键入数据库可登陆用户")
    }
    if (!_.has(dbConfig, 'password')) {
        throw new Error("dbConfig['password'] 不能为空,请键入登陆用户密码")
    }
    if (!_.has(dbConfig, 'database')) {
        throw new Error("dbConfig['database'] 不能为空,请键入要读取的库名")
    }
    return dbConfig
}

