const {MvnConfig, DefaultDomainConfig} = require('./config/config');
const {echoMvnCliVersion,successTip} = require('./action/EchoVersionAction')
const {projectInfoQuestions} = require('./config/questions')
const semver = require('semver')
const Program = require("commander");
const Prompt = require("inquirer");
const {Project} = require('./action/ProjectAction')


Program
    .version(`v${MvnConfig.version}`)
    .description("快速构建maven多模块应用")

echoMvnCliVersion()
Program
    .command("create")
    .alias("c")
    .description("初始化平台")
    .action(() => {
        Prompt.prompt(projectInfoQuestions).then(result => {
            console.log("您选择的平台类型信息如下：");
            console.log(JSON.stringify(result));
            // 1. 项目名称
            DefaultDomainConfig.projectName = result.projectName
            DefaultDomainConfig.projectVersion = result.projectVersion
            DefaultDomainConfig.projectDescription = result.projectDescription
            DefaultDomainConfig.springBootVersion = result.springBootVersion
            const project = new Project({
                namespaceConfig: DefaultDomainConfig
            })
            project.create();
            successTip(result)
        })
    });
Program.parse(process.argv);

