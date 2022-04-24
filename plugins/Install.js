import {GitAction} from "./git/GitAction.js";
import {Plugins} from "./PluginManager.js";
import {Plugin, PluginEventType} from "./Plugin.js";
// 注册一个git忽略文件插件,接受maven构建完成事件
Plugins.register(new Plugin('GitIgnore', 'GitIgnore创建', PluginEventType.BUILD_COMPLETE, new GitAction().createGitIgnoreFile))

