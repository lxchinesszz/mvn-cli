// scm/scm-_web/
// scm/scm-service/
// scm/scm-_domain/
// scm/scm-_dal/
// scm/scm-_integration/
// scm/scm-_config/
// scm/scm-_common/

/**
 * 根据配置构建项目模块
 * @param config
 * @constructor
 */
function NamespaceAction(config) {

    /**
     * 项目名
     * @type {string}
     */
    this._projectName = config.projectName

    /**
     * web层
     * @type {string}
     */
    this._web = config.web

    /**
     * 业务层
     * @type {string}
     */
    this._biz = config.biz

    /**
     * 领域层
     * @type {string}
     */
    this._domain = config.domain

    /**
     * 数据层
     * @type {string}
     */
    this._dal = config.dal

    /**
     * 三方接口层
     * @type {string}
     */
    this._integration = config.integration

    /**
     * 配置
     * @type {string}
     */
    this._config = config.config;

    /**
     * 通用层
     * @type {string}
     */
    this._common = config.common

    /**
     * _groupId
     * @type {string|string|boolean|ConstrainDOMString|*}
     * @private
     */
    this._groupId = config.groupId

    /**
     * 项目版本
     * @type {string|*}
     * @private
     */
    this._projectVersion = config.projectVersion

    /**
     * 项目描述
     * @type {string|MavenModuleAction._createModulePom._namespaceAction.projectDescription|*}
     * @private
     */
    this._projectDescription = config.projectDescription

    /**
     * SpringBoot的版本号
     * @type {string|undefined|*}
     * @private
     */
    this._springBootVersion = config.springBootVersion


    /**
     * 获取SpringBoot版本号
     * @returns {string|undefined|*}
     */
    this.getSpringBootVersion = function (){
        return this._springBootVersion
    }

    /**
     * 获取项目描述
     * @returns {string|MavenModuleAction._createModulePom._namespaceAction.projectDescription|*}
     */
    this.getProjectDescription = function (){
        return this._projectDescription;
    }

    /**
     * web层命名
     * @returns {string}
     */
    this.getWeb = function () {
        return this._web
    }

    /**
     * 获取biz层命名
     * @returns {string}
     */
    this.getBiz = function () {
        return this._biz
    }

    /**
     * 获取领域层命名
     * @returns {string}
     */
    this.getDomain = function () {
        return this._domain
    }

    /**
     * 获取db层
     */
    this.getDal = function () {
        return this._dal
    }

    /**
     * 三方api
     * @returns {string}
     */
    this.getIntegration = function () {
        return this._integration
    }

    /**
     * 配置层
     * @returns {string}
     */
    this.getConfig = function () {
        return this._config
    }

    /**
     * 通用层
     * @returns {string}
     */
    this.getCommon = function () {
        return this._common
    }

    /**
     * 获取groupId
     * @returns {string|boolean|ConstrainDOMString|*}
     */
    this.getGroupId = function () {
        return this._groupId
    }

    /**
     * 项目名
     * @returns {string}
     */
    this.getProjectName = function () {
        return this._projectName
    }

    /**
     * 获取项目版本号
     * @returns {string|*}
     */
    this.getProjectVersion = function () {
        return this._projectVersion
    }
    /**
     * web入口层路径
     */
    this.webNamespace = function () {
        return {
            projectName: this._projectName,
            type: 'web',
            version: this._projectVersion,
            moduleName: `${this._projectName}-${this._web}`,
            path: `${this._projectName}/${this._projectName}-${this._web}/`
        }
    }
    /**
     * 服务层路径
     */
    this.serviceNamespace = function () {
        return {
            projectName: this._projectName,
            type: 'service',
            version: this._projectVersion,
            moduleName: `${this._projectName}-${this._biz}`,
            path: `${this._projectName}/${this._projectName}-${this._biz}/`
        }
    }

    /**
     * 领域层
     */
    this.domainNamespace = function () {
        return {
            projectName: this._projectName,
            type: 'domain',
            version: this._projectVersion,
            moduleName: `${this._projectName}-${this._domain}`,
            path: `${this._projectName}/${this._projectName}-${this._domain}/`
        }
    }

    /**
     * db操作层
     */
    this.dalNamespace = function () {
        return {
            projectName: this._projectName,
            type: 'dal',
            version: this._projectVersion,
            moduleName: `${this._projectName}-${this._dal}`,
            path: `${this._projectName}/${this._projectName}-${this._dal}/`
        }
    }

    /**
     * 三方API调用防腐层
     */
    this.integrationNamespace = function () {
        return {
            projectName: this._projectName,
            type: 'integration',
            version: this._projectVersion,
            moduleName: `${this._projectName}-${this._integration}`,
            path: `${this._projectName}/${this._projectName}-${this._integration}/`
        }
    }

    /**
     * 配置层
     */
    this.configNamespace = function () {
        return {
            projectName: this._projectName,
            type: 'config',
            version: this._projectVersion,
            moduleName: `${this._projectName}-${this._config}`,
            path: `${this._projectName}/${this._projectName}-${this._config}/`
        }
    }

    /**
     * 通用配置(不依赖容器)
     */
    this.commonNamespace = function () {
        return {
            projectName: this._projectName,
            type: 'common',
            version: this._projectVersion,
            moduleName: `${this._projectName}-${this._common}`,
            path: `${this._projectName}/${this._projectName}-${this._common}/`
        }
    }

    /**
     * 获取所有的命名
     */
    this.getAllNamespace = function () {
        return [this.webNamespace(), this.serviceNamespace(), this.domainNamespace()
            , this.dalNamespace(), this.integrationNamespace(), this.configNamespace(), this.commonNamespace()
        ]
    }

}

module.exports = {NamespaceAction}


