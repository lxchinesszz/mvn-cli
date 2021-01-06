const {NamespaceAction} = require('./NamespaceAction')
const {MavenModuleAction} = require('./MavenModuleAction')
// 1. 根据项目名创建项目目录

// 2. 进入项目

function Project(config) {

    this.namespaceConfig = config.namespaceConfig

    this.create = function () {
        // 1. 构建命名处理类
        let namespace = new NamespaceAction(this.namespaceConfig);
        let mavenModule = new MavenModuleAction(namespace)
        mavenModule.init();
    }
}

const {MvnConfig, DefaultDomainConfig} = require('../config/config')

const project = new Project({
    namespaceConfig: DefaultDomainConfig
})


project.create();
