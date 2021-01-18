const {Project} = require('./action/ProjectAction')
const {MvnConfig, ProjectTemplateConfig} = require('./config/config');



// 1. 项目名称

const project = new Project({
    projectTemplateConfig: ProjectTemplateConfig
})
project.create();
