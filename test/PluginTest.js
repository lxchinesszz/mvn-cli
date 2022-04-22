const Plugins = require('../plugins/PluginManager')
const {Plugin, PluginEventType} = require('../plugins/Plugin')
const GitAction = require('../plugins/git/GitAction')
const {getPlugins} = require('../util/DomainModelUtils')
const logger = require('../util/logger')
let _ = require('lodash')
const Asserts = require('../util/Asserts')


// 注册一个git忽略文件插件,接受maven构建完成事件
// Plugins.register(new Plugin('GitIgnore', 'GitIgnore创建', PluginEventType.BUILD_COMPLETE, new GitAction().createGitIgnoreFile))
// 从配置文件中加载插件
Plugins.loadPlugins();

Plugins.wrapInvokePlugins(PluginEventType.BUILD_COMPLETE, {}, () => {
    console.log("模块构建动作")
}, () => {
    console.log("系统动作")
})
