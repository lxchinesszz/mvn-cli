const {Project} = require('./action/ProjectAction')
const {MvnConfig, ProjectTemplateConfig} = require('./config/config');
const semver = require('semver')

console.log(semver.satisfies('1.0.1', '1.0.1'));

// 1. 项目名称
//
const project = new Project({
    projectTemplateConfig: ProjectTemplateConfig
})
project.create();
