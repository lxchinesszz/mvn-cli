const {MvnConfig} = require('./config');
const inquirer = require('inquirer');

const projectInfoQuestions = [{
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称',
    suffix: ':',
    filter: function (val) {
        if (val) {
            return val
        } else {
            return 'example'
        }
    }
},
    {
        type: 'input',
        name: 'projectAuthor',
        message: '请输入Owner',
        suffix: ':',
        filter: function (val) {
            if (val) {
                return val
            } else {
                return 'mvn-cli'
            }
        }
    },
    {
        type: 'input',
        name: 'projectDescription',
        message: '项目描述',
        suffix: ':',
        filter: function (val) {
            if (val) {
                return val
            } else {
                return 'description'
            }
        }
    },
    {
        type: 'input',
        name: 'projectVersion',
        message: '初始版本号',
        default: '1.0.0',
        suffix: ':'
    }
    ,
    {
        type: 'input',
        name: 'springBootVersion',
        message: 'SpringBoot版本号',
        default: '2.3.1.RELEASE',
        suffix: ':'
    }
    ,
    {
        type: 'confirm',
        name: 'isAutoCreateReadme',
        message: '是否生成README',
        default: true,
        suffix: ':'
    },
    // {
    //     type: "confirm",
    //     message: "是否选择集成",
    //     name: "integration",
    //     suffix: '?',
    //     default: true
    // },
    // {
    //     type: "checkbox",
    //     message: "集成",
    //     name: "integrations",
    //     suffix: ':',
    //     choices: [
    //         ...MvnConfig.integrations,
    //     ],
    //     when: function (answers) { // 当watch为true的时候才会提问当前问题
    //         return answers.integration
    //     }
    // }
];

module.exports = {
    projectInfoQuestions
}
