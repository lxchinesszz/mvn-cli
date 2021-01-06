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
     * web入口层路径
     */
    this.webPath = function () {
        return `${this._projectName}/${this._projectName}-${this._web}/`
    }
    /**
     * 服务层路径
     */
    this.servicePath = function () {
        return `${this._projectName}/${this._projectName}-${this._biz}/`
    }

    /**
     * 领域层
     */
    this.domainPath = function () {
        return `${this._projectName}/${this._projectName}-${this._domain}/`

    }

    /**
     * db操作层
     */
    this.dalPath = function () {
        return `${this._projectName}/${this._projectName}-${this._dal}/`

    }

    /**
     * 三方API调用防腐层
     */
    this.integrationPath = function () {
        return `${this._projectName}/${this._projectName}-${this._integration}/`

    }

    /**
     * 配置层
     */
    this.configPath = function () {
        return `${this._projectName}/${this._projectName}-${this._config}/`

    }

    /**
     * 通用配置(不依赖容器)
     */
    this.commonPath = function () {
        return `${this._projectName}/${this._projectName}-${this._common}/`
    }
}

module.exports = {NamespaceAction}


