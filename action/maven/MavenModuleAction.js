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
 * @param MavenModuleDependenciesAction 依赖管理
 * @constructor
 */
function MavenModuleAction(NamespaceAction, MavenModuleDependenciesAction) {

    this._namespaceAction = NamespaceAction

    this._mavenModuleDependenciesAction = MavenModuleDependenciesAction

    this._groupId = NamespaceAction.getGroupId()

    this._mavenPomTemplate = new MavenPomTemplate(path.resolve(__dirname, 'root.xml'))

    this._bootTemplate = new SpringBootTemplate(path.resolve(__dirname, 'boot'))

    this._localConfig = {namespace: []}

    this.init = function () {
        // 1. 创建maven模块
        this._createModule(this._namespaceAction.webNamespace())
        this._createModule(this._namespaceAction.serviceNamespace())
        this._createModule(this._namespaceAction.domainNamespace())
        this._createModule(this._namespaceAction.dalNamespace())
        this._createModule(this._namespaceAction.integrationNamespace())
        this._createModule(this._namespaceAction.configNamespace())
        this._createModule(this._namespaceAction.commonNamespace())

        // 2. 构建模块之间的pom关系
        this._createProjectPom(this._namespaceAction)

        // 3. 记录配置信息
        log(JSON.stringify(this._localConfig))

        let bootClassPath = this.getWebApplicationPath()
        let bootClass = `${_.capitalize(this._namespaceAction.getProjectName())}Application`
        // 4. 生成SpringBoot引导类
        this._bootTemplate.create(
            {
                className: `${bootClass}`,
                packagePath: `${this.getWebPackagePath()}`
            },
            `${bootClassPath}${bootClass}.java`
        )
    }


    this._getBootClass = function (){
        let bootClass = `${_.capitalize(this._namespaceAction.getProjectName())}Application`
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
        return replaceAll(packagePath, '/', '\.') + ';'
    }

    this.getGroupId = function () {
        return replaceAll(this._groupId, '\\.', '/')
    }

    this._createModule = function (namespace) {
        // 1. 构建模块信息
        let fullJavaModulePath = this._createJavaModule(namespace)
        this._localConfig.namespace.push({
            type: namespace.type,
            path: fullJavaModulePath,
            packagePath: `${this._getPackagePath(namespace)}`
        })
        mkdir(fullJavaModulePath)
        let type = namespace.type
        // 2. 根据模块类型构建依赖及目录
        let dependencies = []
        // 3. 本地配置文件
        let localConfig = {type: type, path: fullJavaModulePath}
        switch (type) {
            case 'web':
                mkdir(this._createJavaResource(namespace))
                mkdir(this._createTestJavaModule(namespace))
                // 依赖common
                dependencies = this._mavenModuleDependenciesAction.getWebDependencies()
                break
            case 'service':
                // 依赖domain,common
                dependencies = this._mavenModuleDependenciesAction.getServiceDependencies()
                break
            case 'domain':
                // 依赖dal,integration,common
                dependencies = this._mavenModuleDependenciesAction.getDomainDependencies()
                break
            case 'dal':
                // 依赖common
                dependencies = this._mavenModuleDependenciesAction.getDalDependencies()
                break
            case 'integration':
                // 依赖common
                dependencies = this._mavenModuleDependenciesAction.getIntegrationDependencies()
                break
            case 'config':
                // 依赖common
                dependencies = this._mavenModuleDependenciesAction.getConfigDependencies()
                break
            case 'common':
                dependencies = this._mavenModuleDependenciesAction.getCommonDependencies()
                break
            default:
                break;

        }
        this._createModulePom(namespace, dependencies)
    }

    this._createModulePom = function (namespace, dependencies) {
        let projectName = namespace.projectName;
        let packagePath;
        if (namespace.type === 'web'){
            packagePath =  replaceAll(this._getPackagePath(namespace), '/', '\.')
            packagePath = `${packagePath}.${_.capitalize(this._namespaceAction.getProjectName())}Application`
        }
        this._mavenPomTemplate.create({
            root: false,
            projectName: projectName,
            projectVersion: namespace.version,
            moduleName: namespace.moduleName,
            // 需要打包的模块应该是jar
            packaging: namespace.type === 'web' ? 'jar' : null,
            bootClassPath: packagePath,
            groupId: this._namespaceAction.getGroupId(),
            mavenSurefireJavaVersion: '1.8',
            dependencies: dependencies
        }, `./${namespace.path}/pom.xml`)
    }

    this._createProjectPom = function (namespace) {
        let projectName = namespace.getProjectName();
        let allNamespace = this._namespaceAction.getAllNamespace();
        let modules = _.map(allNamespace, 'moduleName')
        this._mavenPomTemplate.create({
            root: true,
            projectName: projectName,
            projectVersion: namespace.getProjectVersion(),
            modules: modules,
            // 需要打包的模块应该是jar
            packaging: 'pom',
            groupId: this._namespaceAction.getGroupId(),
            projectDescription: this._namespaceAction.getProjectDescription(),
            springBootVersion: this._namespaceAction.getSpringBootVersion(),
            mavenSurefireJavaVersion: '1.8',
            dependencies: [
                {
                    groupId: 'org.projectlombok',
                    artifactId: 'lombok',
                    version: '1.4.0'
                }
            ]
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
