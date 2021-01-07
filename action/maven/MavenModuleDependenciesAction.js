const {NamespaceAction} = require('../NamespaceAction')

/**
 * 依赖管理
 * @param NamespaceAction 命名管理
 * @constructor
 */
function MavenModuleDependenciesAction(NamespaceAction) {

    this._namespaceAction = NamespaceAction

    this.dependencies = function (moduleNamespace) {
        return {
            groupId: this._namespaceAction.getGroupId(),
            artifactId: moduleNamespace.moduleName,
            version: moduleNamespace.version
        }
    }

    this.getWebDependencies = function () {
        // 依赖common
        return [this.dependencies(this._namespaceAction.commonNamespace())]
    }

    this.getServiceDependencies = function () {
        // 依赖domain,common
        return [this.dependencies(this._namespaceAction.domainNamespace()),
            this.dependencies(this._namespaceAction.commonNamespace())
        ]

    }

    this.getDomainDependencies = function () {
        // 依赖dal,integration,common
        return [this.dependencies(this._namespaceAction.integrationNamespace()),
            this.dependencies(this._namespaceAction.commonNamespace()),
            this.dependencies(this._namespaceAction.dalNamespace())
        ]
    }

    this.getDalDependencies = function () {
        // 依赖common
        return [this.dependencies(this._namespaceAction.commonNamespace())]
    }

    this.getIntegrationDependencies = function () {
        // 依赖common
        return [this.dependencies(this._namespaceAction.commonNamespace())]
    }

    this.getConfigDependencies = function () {
        // 依赖common
        return [this.dependencies(this._namespaceAction.commonNamespace())]
    }

    this.getCommonDependencies = function () {
        return [this.dependencies(this._namespaceAction.commonNamespace())]
    }
}

module.exports = {MavenModuleDependenciesAction}
