import _ from 'lodash'
import logSymbols from "log-symbols";

const projectInfoQuestionsEn = [{
    type: 'input',
    name: 'projectName',
    message: 'Please enter a project name',
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
            return 'It is recommended that you use meaningful names and not special characters(-/￥%@)'
        }
    }
},
    {
        type: 'input',
        name: 'projectAuthor',
        message: 'Please enter author',
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
        message: 'Project description',
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
        message: 'GroupId coordinates',
        default: 'com.github',
        suffix: ':',
        prefix: logSymbols.success,
        validate: function (val) {
            if (new RegExp('^[a-zA-Z]*\\.\\w*$').test(val)) {
                return true
            } else {
                return 'GroupId illegal(Full letters are recommended eg: com.idea/com.alibaba.taobao)'
            }
        }
    },
    {
        type: 'input',
        name: 'projectVersion',
        message: 'The initial version number of the project',
        default: '1.0.0',
        prefix: logSymbols.success,
        suffix: ':'
    },
    {
        type: 'input',
        name: 'port',
        message: 'Application port number',
        default: '8081',
        prefix: logSymbols.success,
        suffix: ':',
        validate: function (val) {
            if (_.isNumber(Number(val))) {
                return true;
            } else {
                return 'Suggested range of port number (8080 ~ 30000)'
            }
        }
    }
    ,
    {
        type: 'input',
        name: 'springBootVersion',
        message: 'SpringBoot version number',
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
    projectInfoQuestionsEn
}
