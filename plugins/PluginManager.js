let {Plugin} = require('./Plugin')
let logger = require('../util/logger')
let _ = require('lodash')

function PluginManager() {

    if (typeof PluginManager.instance === 'object') {
        return PluginManager.instance;
    } else {
        PluginManager.instance = this;
    }

    /**
     * 插件集合
     * @type {*[]}
     */
    this.plugins = Array.of();

    this.register = function (plugin) {
        this._checkPlugin(plugin);
        this.plugins.push(plugin);
    }

    this._checkPlugin = function (plugin) {
        if (plugin.constructor !== Plugin) {
            logger.error(`${plugin} 类型错误, 不是Plugin类型,请检查`)
        }
    }

    /**
     * 获取所有的插件类型
     * @returns {[]|PluginArray|HTMLCollectionOf<HTMLEmbedElement>|*}
     */
    this.getPlugins = function (type) {
        if (_.isUndefined(type)) {
            return this.plugins;
        }
        return _.filter(this.getPlugins(), plugin => plugin.type === type)
    }

    /**
     * 执行插件
     * @param type 事件类型
     * @param envConfig 环境信息
     * @param moduleBuildAction 模块构建动作
     * @param action 系统钩子动作
     */
    this.wrapInvokePlugins = function (type, envConfig, moduleBuildAction, action) {
        let plugins = this.getPlugins(type);
        if (_.isArray(plugins) && !_.isEmpty(plugins)) {
            plugins.forEach(plugin => {
                try {
                    plugin.before(envConfig)
                    if (!_.isUndefined(moduleBuildAction)) {
                        moduleBuildAction()
                    }
                    if (!_.isUndefined(action)) {
                        action()
                    }
                    plugin.invoke(envConfig)
                } catch (e) {
                    logger.error(`${plugin.name} 异常`)
                    plugin.error(envConfig, e)
                } finally {
                    plugin.after(envConfig)
                }
            })
        } else {
            if (!_.isUndefined(moduleBuildAction)) {
                moduleBuildAction()
            }
            if (!_.isUndefined(action)) {
                action()
            }
        }
    }
}

const Plugins = new PluginManager();
module.exports = Plugins

