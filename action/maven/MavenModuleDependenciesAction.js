import _ from 'lodash'
import {toJson} from "../../util/JsonUtils.js";

let dependencyConfig = toJson('./dependency.json')

/**
 * 依赖管理
 * @param mavenModuleNamespaceConfig Maven模块的命名管理
 * @constructor
 */
function MavenModuleDependenciesAction(mavenModuleNamespaceConfig) {

    this._mavenModuleNamespaceConfig = mavenModuleNamespaceConfig

    this.dependencies = function (moduleNamespace) {
        return {
            groupId: this._mavenModuleNamespaceConfig.getGroupId(),
            artifactId: moduleNamespace.moduleName,
            version: moduleNamespace.version
        }
    }

    this.getWebDependencies = function () {
        // 依赖common
        return this.dependencyManagement(['spring-boot-web'],
            [this.dependencies(this._mavenModuleNamespaceConfig.commonNamespace()),
                this.dependencies(this._mavenModuleNamespaceConfig.serviceNamespace())
            ])
    }

    this.getServiceDependencies = function () {
        // 依赖domain,common
        return this.dependencyManagement([],
            [this.dependencies(this._mavenModuleNamespaceConfig.domainNamespace()),
                this.dependencies(this._mavenModuleNamespaceConfig.commonNamespace())
            ])

    }

    this.getDomainDependencies = function () {
        // 依赖dal,integration,common
        return this.dependencyManagement([],
            [this.dependencies(this._mavenModuleNamespaceConfig.integrationNamespace()),
                this.dependencies(this._mavenModuleNamespaceConfig.commonNamespace()),
                this.dependencies(this._mavenModuleNamespaceConfig.dalNamespace())
            ])
    }

    this.getDalDependencies = function () {
        // 依赖common
        return this.dependencyManagement(['mybatis-plus-annotation'],
            [this.dependencies(this._mavenModuleNamespaceConfig.commonNamespace())])
    }

    this.getIntegrationDependencies = function () {
        // 依赖common
        return this.dependencyManagement([],
            [this.dependencies(this._mavenModuleNamespaceConfig.commonNamespace())])
    }

    this.getConfigDependencies = function () {
        // 依赖common
        return this.dependencyManagement([],
            [this.dependencies(this._mavenModuleNamespaceConfig.commonNamespace())])
    }

    this.getCommonDependencies = function () {
        return []
    }

    this._getSystemDependencies = function () {
        return [
            this.dependencies(this._mavenModuleNamespaceConfig.commonNamespace()),
            this.dependencies(this._mavenModuleNamespaceConfig.integrationNamespace()),
            this.dependencies(this._mavenModuleNamespaceConfig.dalNamespace()),
            this.dependencies(this._mavenModuleNamespaceConfig.domainNamespace()),
            this.dependencies(this._mavenModuleNamespaceConfig.webNamespace()),
        ]
    }

    /**
     * maven根pom节点依赖的信息
     * @param dependencyNames
     * @returns {{properties: *[], dependencies: *[]}}
     */
    this.getIntegrationDependencyManagement = function (dependencyNames) {
        return this.dependencyManagement(dependencyNames, [], true)
    }

    /**
     *
     * @param dependencyNames   要集成的 如redis依赖,只用输入名字即可
     * @param systemDependencies maven模块系统的依赖
     * @returns {{properties: [], dependencies: []}}
     */
    this.dependencyManagement = function (dependencyNames, systemDependencies, isVersion) {
        // 1. 读取集成的配置
        let dependencySpaceDependencies = this._findDependencies(dependencyNames)
        // 2. 构建系统的依赖,系统的依赖version就是版本号
        let mavenSystemDepArr = this._buildSystemDependencies(systemDependencies)
        // 3. 构建集成的依赖,集成的依赖version放null
        let intDepArr = this._buildDependencies(dependencySpaceDependencies)
        // 4. 集成的版本只显示在外层pom
        if (!isVersion) {
            for (let intDepArrElement of intDepArr) {
                intDepArrElement.version = null
            }
        }
        // 4. 将系统依赖和集成依赖整合
        mavenSystemDepArr.push(...intDepArr)
        return {
            properties: this._buildPropertyTag(dependencySpaceDependencies),
            dependencies: mavenSystemDepArr
        }
    }

    this._findDependencies = function (names) {
        let result = [];
        for (let name of names) {
            let index = _.findIndex(dependencyConfig.dependencies, function (o) {
                    return o.name === name
                }
            )
            if (index >= 0) {
                result.push(...dependencyConfig.dependencies[index].dependencies);
            }
        }
        return result
    }


    this._buildPropertyTag = function (dependencies) {
        let result = []
        for (let dependency of dependencies) {
            result.push(
                `\<${dependency.groupId}.version\>${dependency.version}</${dependency.groupId}.version>`
            )
        }
        return result
    }

    this._buildDependencies = function (dependencies) {
        let result = []
        for (let dependency of dependencies) {
            result.push(
                {
                    groupId: dependency.groupId,
                    artifactId: dependency.artifactId,
                    version: `\${${dependency.groupId}.version}`
                }
            )
        }
        return result
    }

    this._buildSystemDependencies = function (dependencies) {
        let result = []
        for (let dependency of dependencies) {
            result.push(
                {
                    groupId: dependency.groupId,
                    artifactId: dependency.artifactId,
                    version: dependency.version
                }
            )
        }
        return result
    }
}

export {MavenModuleDependenciesAction}
