const {MvnConfig} = require('./config/config');
const echoMvnCliVersion = require('./action/EchoVersionAction')
const {projectInfoQuestions} = require('./config/questions')
const chalk = require('chalk')
const semver = require('semver')
const Program = require("commander");
const Prompt = require("inquirer");


Program
    .version(`v${MvnConfig.version}`)
    .description("快速构建maven多模块应用")

Program
    .command("create")
    .alias("c")
    .description("初始化平台")
    .action(() => {
        Prompt.prompt(projectInfoQuestions).then(result => {
            console.log("您选择的平台类型信息如下：");
            console.log(JSON.stringify(result));
        })
    });
Program.parse(process.argv);

