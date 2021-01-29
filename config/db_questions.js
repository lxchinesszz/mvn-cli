const inquirer = require('inquirer');

const DbQuestions = [{
    type: 'input',
    name: 'host',
    message: '请输入数据库地址',
    suffix: ':',
    filter: function (val) {
        if (val) {
            return val
        } else {
            return '127.0.0.1'
        }
    }
},
    {
        type: 'input',
        name: 'database',
        message: '请输入要连接的库名',
        default: 'test',
        suffix: ':'
    },
    {
        type: 'input',
        name: 'user',
        message: '请输入数据库登陆用户',
        suffix: ':',
        filter: function (val) {
            if (val) {
                return val
            } else {
                return 'root'
            }
        }
    },
    {
        type: 'password',
        name: 'password',
        message: '请输入数据库登陆用户密码',
        suffix: ':',
        filter: function (val) {
            if (val) {
                return val
            } else {
                return '123456'
            }
        }
    },
    {
        type: 'input',
        name: 'dalModelPath',
        message: '请输入要安装的地址',
        suffix: ':',
        filter: function (val) {
            if (val) {
                return val
            } else {
                return 'root'
            }
        }
    },

];

module.exports = {
    DbQuestions
}
