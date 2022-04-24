import {FileTemplate} from "../template/FileTemplate.js";
import path from "path";
import Table from 'cli-table'
import chalk from "chalk";
import {successTip} from "./EchoVersionAction.js";
import FileDirCreatorAction from "./FileDirCreatorAction.js";
import {logger} from "../util/logger.js";
import {GitAction} from "../plugins/git/GitAction.js";
import {Plugins} from "../plugins/PluginManager.js";
import {PluginEventType} from "../plugins/Plugin.js";
function _dir(path) {
    new FileDirCreatorAction().create(path)
}

export function MavenHooks(projectTemplateConfig) {

    this._projectTemplateConfig = projectTemplateConfig


    MavenHooks._wrapEnvConfig = function (config) {
        if (config.constructor === Object) {
            config.projectConfig = projectTemplateConfig
            return config
        } else {
            return {projectConfig: projectTemplateConfig, currentPath: config}
        }
    }

    /**
     * web创建
     * @param webPath
     * @param moduleBuildAction 模块构建操作
     */
    this.webCreateHook = function (webPath, moduleBuildAction) {
        let wrapEnvConfig = MavenHooks._wrapEnvConfig(webPath)
        Plugins.wrapInvokePlugins(PluginEventType.BUILD_WEB, wrapEnvConfig, moduleBuildAction, function () {
            logger.info('MavenHooks webPath:' + webPath)
            if (projectTemplateConfig.modelFlag) {
                _dir(`${webPath}model/vo/`)
                _dir(`${webPath}model/dto/`)
            }
        })
    }

    /**
     * service层创建
     * @param servicePath
     */
    this.serviceCreateHook = function (servicePath, moduleBuildAction) {
        let wrapEnvConfig = MavenHooks._wrapEnvConfig(servicePath)
        Plugins.wrapInvokePlugins(PluginEventType.BUILD_SERVICE, wrapEnvConfig, moduleBuildAction, function () {
            logger.info('MavenHooks servicePath:' + servicePath)
            if (projectTemplateConfig.modelFlag) {
                _dir(`${servicePath}model/dto/`)
            }
        })
    }

    /**
     * domainPath
     * @param domainPath
     */
    this.domainCreateHook = function (domainPath, moduleBuildAction) {
        let wrapEnvConfig = MavenHooks._wrapEnvConfig(domainPath)
        Plugins.wrapInvokePlugins(PluginEventType.BUILD_DOMAIN, wrapEnvConfig, moduleBuildAction, function () {
            logger.info('MavenHooks domainPath:' + domainPath)
            if (projectTemplateConfig.modelFlag) {
                _dir(`${domainPath}model/bo/`)
            }
        })
    }

    /**
     * dalPath
     * @param dalPath
     */
    this.dalCreateHook = function (dalPath, moduleBuildAction) {
        let wrapEnvConfig = MavenHooks._wrapEnvConfig(dalPath)
        Plugins.wrapInvokePlugins(PluginEventType.BUILD_DAL, wrapEnvConfig, moduleBuildAction, function () {
            logger.info('MavenHooks dalPath:' + dalPath)
            if (projectTemplateConfig.modelFlag) {
                _dir(`${dalPath}model/entity/`)
            }
        })
    }

    /**
     * integrationPath
     * @param integrationPath
     */
    this.integrationCreateHook = function (integrationPath, moduleBuildAction) {
        let wrapEnvConfig = MavenHooks._wrapEnvConfig(integrationPath)
        Plugins.wrapInvokePlugins(PluginEventType.BUILD_INTEGRATION, wrapEnvConfig, moduleBuildAction, function () {
            logger.info('MavenHooks integrationPath:' + integrationPath)
            if (projectTemplateConfig.modelFlag) {
                _dir(`${integrationPath}model/dto/`)
            }
        })
    }

    /**
     * configPath
     * @param configPath
     */
    this.configCreateHook = function (configPath, moduleBuildAction) {
        let wrapEnvConfig = MavenHooks._wrapEnvConfig(configPath)
        Plugins.wrapInvokePlugins(PluginEventType.BUILD_CONFIG, wrapEnvConfig, moduleBuildAction, function () {
            logger.info('MavenHooks configPath:' + configPath)
        })
    }

    /**
     * commonPath
     * @param commonPath
     */
    this.commonCreateHook = function (commonPath, moduleBuildAction) {
        let wrapEnvConfig = MavenHooks._wrapEnvConfig(commonPath)
        Plugins.wrapInvokePlugins(PluginEventType.BUILD_COMMON, wrapEnvConfig, moduleBuildAction, function () {
            logger.info('MavenHooks commonPath:' + commonPath)
        })
    }

    /**
     * web资源修改application.yml
     * @param javaResourcePath
     */
    this.createJavaResource = function (javaResourcePath, moduleBuildAction) {
        let wrapEnvConfig = MavenHooks._wrapEnvConfig(javaResourcePath)
        Plugins.wrapInvokePlugins(PluginEventType.BUILD_JAVA_RESOURCE, wrapEnvConfig, moduleBuildAction, function () {
            _dir(javaResourcePath)
        })
    }

    /**
     * web资源修改application.yml
     * @param javaResourcePath
     */
    this.createJavaResourceApplication = function (javaResourcePath) {
        let wrapEnvConfig = MavenHooks._wrapEnvConfig(javaResourcePath)
        Plugins.wrapInvokePlugins(PluginEventType.BUILD_JAVA_WEB_RESOURCE, wrapEnvConfig, undefined, function () {
            const {projectName, port} = projectTemplateConfig
            const application = path.resolve(__dirname, './maven/application.yml')
            const fileTemplate = new FileTemplate(application)
            const applicationPath = `${javaResourcePath}application.yml`
            fileTemplate.create({
                projectName: projectName,
                port: port,
            }, applicationPath)

            logger.success(`Build: Add SpringBoot Config:${applicationPath}`);
        })
    }


    /**
     * 构建完成消息
     */
    this.buildCompleteHooks = function (config) {
        config.projectConfig = projectTemplateConfig
        let wrapEnvConfig = MavenHooks._wrapEnvConfig(config);
        Plugins.wrapInvokePlugins(PluginEventType.BUILD_COMPLETE, wrapEnvConfig, undefined, function () {
            const {
                projectName,
                projectVersion,
                springBootVersion,
                projectDescription,
                projectAuthor,
                port
            } = projectTemplateConfig
            successTip(projectTemplateConfig)
            const table = new Table({
                head: ['项目名', '作者', '项目版本', 'SpringBoot版本', '描述', '端口号'],
                style: {
                    border: ['green'],
                    head: ['green']
                }
            });
            table.push(
                [`${projectName}`, `${projectAuthor}`, `${projectVersion}`,
                    `${springBootVersion}`, `${projectDescription}`, `${port}`]
            );
            console.log(chalk.green(table.toString()))
        })
    }
}

