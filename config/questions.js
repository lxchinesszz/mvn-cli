import inquirer from 'inquirer'
import {MvnConfig} from "./config.js";
import logSymbols from "log-symbols";
const projectInfoQuestions = [{
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称',
    suffix: ':',
    prefix: logSymbols.success,
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
        message: '请输入作者',
        suffix: ':',
        prefix: logSymbols.success,
        filter: function (val) {
            if (val) {
                return val
            } else {
                return 'mvn-cli.js'
            }
        }
    },
    {
        type: 'input',
        name: 'projectDescription',
        message: '项目描述',
        suffix: ':',
        prefix: logSymbols.success,
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
        default: 'com.idanchuang',
        suffix: ':',
        prefix: logSymbols.success,
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
        prefix: logSymbols.success,
        suffix: ':'
    },
    {
        type: 'input',
        name: 'port',
        message: '应用端口号',
        default: '8081',
        prefix: logSymbols.success,
        suffix: ':'
    }
    ,
    {
        type: 'input',
        name: 'springBootVersion',
        message: 'SpringBoot版本号',
        default: '0.5.1-RELEASE',
        prefix: logSymbols.success,
        suffix: ':'
    }
    // ,
    // {
    //     type: 'confirm',
    //     name: 'isAutoCreateReadme',
    //     message: '是否生成README',
    //     default: true,
    //     suffix: ':'
    // },
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

export {
    projectInfoQuestions
}
