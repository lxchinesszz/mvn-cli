import {GitAction} from "../plugins/git/GitAction.js";
import {getPlugins} from "../util/DomainModelUtils.js";
import {logger} from "../util/logger.js";
import _ from 'lodash'
import {Plugin, PluginEventType} from "../plugins/Plugin.js";
import {Plugins} from "../plugins/PluginManager.js";
import {Asserts} from "../util/Asserts.js";

// 注册一个git忽略文件插件,接受maven构建完成事件
// Plugins.register(new Plugin('GitIgnore', 'GitIgnore创建', PluginEventType.BUILD_COMPLETE, new GitAction().createGitIgnoreFile))
// 从配置文件中加载插件
Plugins.loadPlugins();

Plugins.wrapInvokePlugins(PluginEventType.BUILD_COMPLETE, {}, () => {
    console.log("模块构建动作")
}, () => {
    console.log("系统动作")
})
