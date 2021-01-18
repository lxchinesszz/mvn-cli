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
    },
    validate: function (val) {
        if (new RegExp('^[a-zA-Z]*$').test(val)) {
            return true
        } else {
            return '建议您使用有意义的名字,不要使用特殊字符(-/￥%@)'
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
        name: 'groupId',
        message: 'groupId坐标',
        default: 'com.idea',
        suffix: ':',
        validate: function (val) {
            if (new RegExp('^[a-zA-Z]*\\.\\w*$').test(val)) {
                return true
            } else {
                return 'GroupId不合法(建议使用全字母 eg: com.idea/com.alibaba.taobao)'
            }
        }
    },
    {
        type: 'input',
        name: 'projectVersion',
        message: '项目初始版本号',
        default: '1.0.0',
        suffix: ':'
    },
    {
        type: 'input',
        name: 'port',
        message: '应用端口号',
        default: '8081',
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
