const {NamespaceAction} = require('./NamespaceAction')
const {MavenModuleAction} = require('./maven/MavenModuleAction')
const {MavenModuleDependenciesAction} = require('./maven/MavenModuleDependenciesAction')

/**
 * 构建Maven多模块应用
 * @param config
 * @constructor
 */
function Project(config) {

    this.namespaceConfig = config.namespaceConfig

    this.create = function () {
        // 1. 构建命名处理类
        let namespace = new NamespaceAction(this.namespaceConfig);
        // 2. 模块依赖配置
        let mavenModuleDependencies = new MavenModuleDependenciesAction(namespace);
        // 3. 构建工具
        let mavenModule = new MavenModuleAction(namespace, mavenModuleDependencies)
        mavenModule.init();
    }
}


module.exports = {Project}
