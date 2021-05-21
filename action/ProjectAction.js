const {NamespaceAction} = require('./NamespaceAction')
const {MavenModuleAction} = require('./maven/MavenModuleAction')
const {MavenModuleDependenciesAction} = require('./maven/MavenModuleDependenciesAction')
const {MavenHooks} = require('./MavenHooks')
const {plugin} = require('../plugins/Install')

/**
 * 构建Maven多模块应用
 * @param config 项目配置
 * @constructor
 */
function Project(config) {

    /**
     * 项目的模板配置
     * @type {{mavenSurefireJavaVersion: string, groupId: string, dal: string, biz: string, common: string, web: string, port: number, domain: string, integration: string, projectDescription: string, springBootVersion: string, projectName: string, config: string, projectAuthor: string, projectVersion: string}}
     * @private
     */
    this._projectTemplateConfig = config.projectTemplateConfig

    this.create = function () {
        // 1. 构建模块命名处理类
        let mavenModuleNamespaceConfig = new NamespaceAction(this._projectTemplateConfig);
        // 2. 构建模块的依赖信息
        let mavenModuleDependencies = new MavenModuleDependenciesAction(mavenModuleNamespaceConfig);
        // 3. 执行构建动作
        let mavenModule = new MavenModuleAction(mavenModuleNamespaceConfig, mavenModuleDependencies)
        // 4. 构建扩展的钩子函数
        let mavenHooks = new MavenHooks(this._projectTemplateConfig);
        // 5. 注册钩子
        mavenModule.init(mavenHooks);
    }
}


module.exports = {Project}
