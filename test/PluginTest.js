import {PluginEventType} from "../plugins/Plugin.js";
import {Plugins} from "../plugins/PluginManager.js";

// 注册一个git忽略文件插件,接受maven构建完成事件
// Plugins.register(new Plugin('GitIgnore', 'GitIgnore创建', PluginEventType.BUILD_COMPLETE, new GitAction().createGitIgnoreFile))
// 从配置文件中加载插件
Plugins.loadPlugins().then(p=>{
    // console.log(p)
    p.wrapInvokePlugins(PluginEventType.BUILD_COMPLETE, {}, () => {
        console.log("模块构建动作")
    }, () => {
        console.log("系统动作")
    })
})
