const fs = require("fs");
const _ = require('lodash')
const path = require('path')
const chalk = require('chalk')
const {log} = require('../../config/config')
const {MavenPomTemplate} = require('../../template/MavenPomTemplate')
const {SpringBootTemplate} = require('../../template/SpringBootTemplate')

/**
 * 构建module依赖
 * @param NamespaceAction 命名管理
 * @param mavenModuleDependencies 依赖管理
 * @constructor
 */
function MavenModuleAction(mavenModuleNamespaceConfig, mavenModuleDependencies) {

    /**
     * maven模块命名配置
     * @private
     */
    this._mavenModuleNamespaceConfig = mavenModuleNamespaceConfig

    /**
     * maven模块的依赖配置
     * @private
     */
    this._mavenModuleDependenciesAction = mavenModuleDependencies

    /**
     * maven项目的groupId(所有的配置读取不直接依赖输入,而是对输入的加工)
     * @private
     */
    this._groupId = mavenModuleNamespaceConfig.getGroupId()

    /**
     * maven模块的pom文件模板处理
     * @type {MavenPomTemplate}
     * @private
     */
    this._mavenPomTemplate = new MavenPomTemplate(path.resolve(__dirname, 'root.xml'))

    /**
     * SpringBoot 引导类模板
     * @type {SpringBootTemplate}
     * @private
     */
    this._bootTemplate = new SpringBootTemplate(path.resolve(__dirname, 'boot'))

    /**
     * 构建的配置本地缓存
     * @type {{namespace: [], config: {}}}
     * @private
     */
    this._localConfig = {namespace: [], config: {}}

    /**
     * 构建maven项目
     * @param mavenHooks 钩子函数
     */
    this.init = function (mavenHooks) {
        // 1. 创建maven模块
        this._createModule(this._mavenModuleNamespaceConfig.webNamespace(), mavenHooks)
        this._createModule(this._mavenModuleNamespaceConfig.serviceNamespace(), mavenHooks)
        this._createModule(this._mavenModuleNamespaceConfig.domainNamespace(), mavenHooks)
        this._createModule(this._mavenModuleNamespaceConfig.dalNamespace(), mavenHooks)
        this._createModule(this._mavenModuleNamespaceConfig.integrationNamespace(), mavenHooks)
        this._createModule(this._mavenModuleNamespaceConfig.configNamespace(), mavenHooks)
        this._createModule(this._mavenModuleNamespaceConfig.commonNamespace(), mavenHooks)
        // 2. 构建模块之间的pom关系
        this._createProjectPom(this._mavenModuleNamespaceConfig)

        // 3. 记录配置信息
        log(JSON.stringify(this._localConfig))

        let bootClassPath = this.getWebApplicationPath()
        bootClassPath = replaceAll(bootClassPath, '/web', '')
        let bootClassName = this._getBootClassName()
        let webPackagePath = this.getWebPackagePath()
        // 4. 生成SpringBoot引导类
        this._bootTemplate.create(
            {
                className: `${bootClassName}`,
                bootClassPath: `${webPackagePath}.${bootClassName}`,
                packagePath: `${webPackagePath}`
            },
            `${bootClassPath}${bootClassName}.java`
        )
        this._localConfig.config = this._mavenModuleNamespaceConfig;
        this.ignoreErrorHooks(mavenHooks.buildCompleteHooks, this._localConfig)
    }

    this._getBootClassName = function () {
        return `${_.capitalize(this._mavenModuleNamespaceConfig.getProjectName())}Application`
    }

    this._getBootClass = function () {
        let bootClass = `${_.capitalize(this._mavenModuleNamespaceConfig.getProjectName())}Application`
        return bootClass
    }

    this.getWebApplicationPath = function () {
        let index = _.findIndex(this._localConfig.namespace, function (o) {
            return o.type == 'web';
        });
        return this._localConfig.namespace[index].path
    }

    this.getWebPackagePath = function () {
        let index = _.findIndex(this._localConfig.namespace, function (o) {
            return o.type == 'web';
        });
        let packagePath = this._localConfig.namespace[index].packagePath
        return replaceAll(replaceAll(packagePath, '/', '\.'), '.web', '')
    }

    this.getGroupId = function () {
        return replaceAll(this._groupId, '\\.', '/')
    }

    this.ignoreErrorHooks = function (callback, path) {
        try {
            callback(path)
        } catch (Error) {
            console.log(Error)
        }
    }

    /**
     * 构建模块
     * @param singleModuleNamed 单模块的构建
     * @param mavenHooks 钩子函数
     * @private 状态私有不允许外部使用
     */
    this._createModule = function (singleModuleNamed, mavenHooks) {
        // 1. 构建模块的完整路径名并创建目录
        let fullJavaModulePath = this._createJavaModule(singleModuleNamed)
        this._localConfig.namespace.push({
            type: singleModuleNamed.type,
            path: fullJavaModulePath,
            packagePath: `${this._getPackagePath(singleModuleNamed)}`
        })
        mkdir(fullJavaModulePath)

        // 2. 根据模块类型构建依赖及目录
        let dependencyManagement

        // 3. 根据系统分层类型,构建测试资源、应用启动配置、及单模块的pom依赖
        let type = singleModuleNamed.type
        switch (type) {
            case 'web':
                mkdir(this._createJavaResource(singleModuleNamed))
                mkdir(this._createTestJavaModule(singleModuleNamed))
                this.ignoreErrorHooks(mavenHooks.createJavaResource, this._createJavaResource(singleModuleNamed))
                // 依赖common
                dependencyManagement = this._mavenModuleDependenciesAction.getWebDependencies()
                break
            case 'service':
                // 依赖domain,common
                dependencyManagement = this._mavenModuleDependenciesAction.getServiceDependencies()
                break
            case 'domain':
                // 依赖dal,integration,common
                dependencyManagement = this._mavenModuleDependenciesAction.getDomainDependencies()
                break
            case 'dal':
                // 依赖common
                dependencyManagement = this._mavenModuleDependenciesAction.getDalDependencies()
                break
            case 'integration':
                // 依赖common
                dependencyManagement = this._mavenModuleDependenciesAction.getIntegrationDependencies()
                break
            case 'config':
                // 依赖common
                dependencyManagement = this._mavenModuleDependenciesAction.getConfigDependencies()
                break
            case 'common':
                dependencyManagement = this._mavenModuleDependenciesAction.getCommonDependencies()
                break
            default:
                break;

        }
        // 4. 构建单模块的pom信息
        this._createModulePom(singleModuleNamed, dependencyManagement)
    }

    this._createModulePom = function (singleModuleNamed, dependencyManagement) {
        let projectName = singleModuleNamed.projectName;
        let packagePath;
        let bootClassName;
        if (singleModuleNamed.type === 'web') {
            packagePath = this.getWebPackagePath();
            bootClassName = this._getBootClassName()
        }
        this._mavenPomTemplate.create({
            root: false,
            projectName: projectName,
            projectVersion: singleModuleNamed.version,
            moduleName: singleModuleNamed.moduleName,
            // 需要打包的模块应该是jar
            packaging: singleModuleNamed.type === 'web' ? 'jar' : null,
            bootClassPath: `${packagePath}.${bootClassName}`,
            groupId: this._mavenModuleNamespaceConfig.getGroupId(),
            mavenSurefireJavaVersion: '1.8',
            dependencies: dependencyManagement.dependencies
        }, `./${singleModuleNamed.path}/pom.xml`)
    }

    /**
     * 创建项目级别的pom文件
     * @private
     */
    this._createProjectPom = function () {
        let dependencyManagement = this._mavenModuleDependenciesAction
            .getIntegrationDependencyManagement(['spring-boot-web'])
        let projectName = this._mavenModuleNamespaceConfig.getProjectName();
        let allNamespace = this._mavenModuleNamespaceConfig.getAllNamespace();
        let modules = _.map(allNamespace, 'moduleName')
        this._mavenPomTemplate.create({
            root: true,
            projectName: projectName,
            projectVersion: this._mavenModuleNamespaceConfig.getProjectVersion(),
            modules: modules,
            // 需要打包的模块应该是jar
            packaging: 'pom',
            groupId: this._mavenModuleNamespaceConfig.getGroupId(),
            projectDescription: this._mavenModuleNamespaceConfig.getProjectDescription(),
            springBootVersion: this._mavenModuleNamespaceConfig.getSpringBootVersion(),
            mavenSurefireJavaVersion: '1.8',
            properties: dependencyManagement.properties,
            dependencies: dependencyManagement.dependencies
        }, `./${projectName}/pom.xml`)

    }

    this._getPackagePath = function (namespace) {
        let groupId = this.getGroupId();
        let moduleName = namespace.type
        let directory = namespace.path;
        let projectName = namespace.projectName
        return `${groupId}/${projectName}/${moduleName}`
    }

    this._createJavaModule = function (namespace) {
        let groupId = this.getGroupId();
        let moduleName = namespace.type
        let directory = namespace.path;
        let projectName = namespace.projectName
        let path = `${directory}src/main/java/${groupId}/${projectName}/${moduleName}/`
        console.log(chalk.yellow('Build:'), chalk.green(`${path}`));
        return path
    }

    this._createJavaResource = function (namespace) {
        let directory = namespace.path;
        let path = `${directory}src/main/resources/`
        console.log(chalk.yellow('Build:'), chalk.green(`${path}`));
        return path
    }

    this._createTestJavaModule = function (namespace) {
        let groupId = this.getGroupId();
        let moduleName = namespace.type
        let directory = namespace.path;
        let projectName = namespace.projectName
        return `${directory}src/test/java/${groupId}/${projectName}/${moduleName}/`
    }


}

function mkdir(filepath) {
    const directoryList = filepath.split('/');
    let dir = directoryList[0];
    for (let i = 1; i < directoryList.length; i++) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        dir = dir + '/' + directoryList[i];
    }
}

function replaceAll(str, replaceKey, replaceVal) {
    var reg = new RegExp(replaceKey, 'g');//g就是代表全部
    return str.replace(reg, replaceVal || '');
}

module.exports = {MavenModuleAction}
