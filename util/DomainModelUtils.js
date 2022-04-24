import {getJmvnConfig, writeJmvnConfig} from './ConfigUtils.js'
import _ from 'lodash'
/**
 * 对比并且更新
 * @param models
 */
export function comparedDomainModel(models) {
    let jmvnConfigStr = getJmvnConfig();
    let jmvnConfig = JSON.parse(jmvnConfigStr);
    let domainModels = jmvnConfig["models"];
    // 1. 如果有值就进行匹配,并新增到配置文件中
    if (domainModels) {
        add(domainModels, models)
        writeJmvnConfig(JSON.stringify(jmvnConfig, null, "\t"))
    } else {
        jmvnConfig["models"] = models
        writeJmvnConfig(JSON.stringify(jmvnConfig, null, "\t"))
    }
}

/**
 *
 * @param sourceConfig 原来的配置文件
 * @param newAddConfig 要新增的配置文件
 */
export function add(sourceConfig, newAddConfig) {
    // 如果配置文件中没有配置,则直接信息
    if (!sourceConfig) {
        sourceConfig = [].push(newAddConfig)
    }
    let matchList = _.filter(sourceConfig, {"suffix": newAddConfig.suffix, "path": newAddConfig.path})
    // 1. 匹配到了就想加
    if (matchList.length > 0) {
        matchList.forEach(sourceConfig => {
            newAddConfig.tableName.forEach(tableName => {
                sourceConfig.tableName.push(tableName)
            })
            // 去重
            sourceConfig.tableName = _.uniq(sourceConfig.tableName)
        })
    } else {
        // 2. 没有匹配上就新增
        sourceConfig.push(newAddConfig)
    }
}

// 获取db的配置
export function getDbConfig() {
    let jmvnConfig = getJmvnConfig();
    return JSON.parse(jmvnConfig)["dbConfig"];
}

// 获取数据模型的配置
export function getDomainModels() {
    let jmvnConfig = getJmvnConfig();
    let domainModels = JSON.parse(jmvnConfig)["models"];
    if (!domainModels) {
        throw new Error("请添加库-表映射配置节点\n" +
            "\"models\":[\n" +
            "        {\n" +
            "            // 后缀名称,默认DO\n" +
            "            \"suffix\":\"DO\",\n" +
            "            // 要安装的表列表\n" +
            "            \"tableName\":[\n" +
            "                \"tableName_{0}\",\n" +
            "                \"tableName_{1}\"\n" +
            "            ],\n" +
            "            // 相对路径\n" +
            "            \"path\":\"ascm-dal/src/main/java/com/idea/ascm/dal/model/DO\"\n" +
            "        }\n" +
            "    ]")
    }
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


export function getPlugins() {
    let jmvnConfig = getJmvnConfig();
    return JSON.parse(jmvnConfig)["plugins"];
}

