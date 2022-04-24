import {logger} from "../util/logger.js";

/**
 * 定义插件
 *
 * before->invoke->success->after
 * error异常捕捉执行
 * @param name 插件名称
 * @param desc 插件说明
 * @param type 插件类型
 * @param action 插件核心逻辑
 * @constructor
 */
function Plugin(name, desc, type, action) {


    this.name = name;

    this.desc = desc;

    this.type = type;

    this.defaultAction = action

    /**
     * 插件执行前[一定会执行]
     */
    this.before = function (envConfig) {
        logger.debug(`${this.name} before`)
    }

    /**
     * 插件执行[before执行成功后执行]
     * @param envConfig
     */
    this.invoke = function (envConfig) {
        logger.debug(`${this.name} invoke`)
        this.defaultAction(envConfig)
    }

    /**
     * 插件执行后[一定会执行]
     * @param envConfig
     */
    this.after = function (envConfig) {
        logger.debug(`${this.name} after`)
    }

    /**
     * 插件执行失败[插件异常会执行]
     * @param envConfig
     * @param e
     */
    this.error = function (envConfig, e) {
        logger.debug(`${this.name} error`)
    }
}

const PluginEventType = {

    /**
     * 构建前触发
     */
    BUILD_BEFORE: 'BUILD_BEFORE',

    /**
     * 构建web层触发
     */
    BUILD_WEB: 'BUILD_WEB',

    /**
     * 构建service层触发
     */
    BUILD_SERVICE: 'BUILD_SERVICE',

    /**
     * 构建domain层触发
     */
    BUILD_DOMAIN: 'BUILD_DOMAIN',

    /**
     * 构建dal层触发
     */
    BUILD_DAL: 'BUILD_DAL',

    /**
     * 构建integration层触发
     */
    BUILD_INTEGRATION: 'BUILD_INTEGRATION',

    /**
     * 构建config层触发
     */
    BUILD_CONFIG: 'BUILD_CONFIG',

    /**
     * 构建common通用层触发
     */
    BUILD_COMMON: 'BUILD_COMMON',

    /**
     * 构建完成触发
     */
    BUILD_COMPLETE: 'BUILD_COMPLETE',

    /**
     * 构建java资源文件时候触发
     */
    BUILD_JAVA_RESOURCE: 'BUILD_JAVA_RESOURCE',

    /**
     * 构建java资源文件时候触发
     */
    BUILD_JAVA_WEB_RESOURCE: 'BUILD_JAVA_WEB_RESOURCE'

}
export {
    Plugin,
    PluginEventType
}
