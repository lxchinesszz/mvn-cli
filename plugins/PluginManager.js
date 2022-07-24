import {Plugin} from './Plugin.js'
import {logger} from '../util/logger.js'
import _ from 'lodash'
import {getPlugins} from "../util/DomainModelUtils.js";
import {Asserts} from '../util/Asserts.js'

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
        let existingIndex = _.findIndex(this.plugins, p => {
            return p.name === plugin.name
        })
        if (existingIndex >= 0) {
            logger.error(`${plugin.name} 插件名称重复,请确认核实。默认执行插件覆盖`)
            this.plugins.splice(existingIndex, 1)
            this.plugins.push(plugin);
        } else {
            this.plugins.push(plugin);
        }
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

    this.loadPlugins = function () {
        let _this = this
        return new Promise(function (resolve, reject) {
            // 从配置文件中加载插件
            let plugins = getPlugins();
            let importPromises = []
            if (plugins) {
                plugins.forEach(plugin => {
                    if (Asserts.isBlank(plugin.name)) {
                        logger.error("插件名称不能为空")
                    }
                    if (Asserts.isBlank(plugin.desc)) {
                        logger.error("插件描述不能为空")
                    }
                    if (Asserts.isBlank(plugin.type)) {
                        logger.error("插件类型不能为空")
                    }
                    if (Asserts.isBlank(plugin.action)) {
                        logger.error("插件文件不能为空")
                    }
                    importPromises.push(dynamicImport(plugin))
                })
            }
            Promise.all(importPromises).then(values => {
                resolve(_this)
            })
        })

    }
}

function dynamicImport(plugin) {
    return new Promise((resolve, reject) => {
        let importPluginPromise = import(plugin.action);
        Plugins.register(new Plugin(plugin.name, plugin.desc, plugin.type, importPluginPromise.action))
        resolve()
    })
}

const Plugins = new PluginManager();

export {Plugins}
