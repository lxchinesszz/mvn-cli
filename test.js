const {Project} = require('./action/ProjectAction')
const {MvnConfig, DefaultDomainConfig} = require('./config/config');



// 1. 项目名称

const project = new Project({
    namespaceConfig: DefaultDomainConfig
})
project.create();
