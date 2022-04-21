const inputTableQuestions = [
    {
        type: 'rawlist',
        message: '请选择要导出的格式',
        name: 'format',
        choices: [
            "markdown",
            "table"
        ]
    },
    {
        type: 'input',
        name: 'tables',
        message: '请输入要导出的表模型',
        suffix: ':',
        filter: function (val) {
            if (val) {
                return val
            } else {
                throw Error('请输入要导出的表模型');
            }
        }
    }
]
const DbQuestions = [
    {
        type: 'rawlist',
        message: '请选择要导出的格式',
        name: 'format',
        choices: [
            "markdown",
            "table"
        ]
    }, {
        type: 'input',
        name: 'host',
        message: '请输入数据库地址',
        suffix: ':',
        filter: function (val) {
            if (val) {
                return val
            } else {
                // return '127.0.0.1'
                return '10.70.21.50'
            }
        }
    },
    {
        type: 'input',
        name: 'database',
        message: '请输入要连接的库名',
        default: 'pms_test',
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
                return 'erp-test'
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
                return 'c5ggCY9z65jggNHX'
            }
        }
    },
    {
        type: 'input',
        name: 'tables',
        message: '请输入要导出的表模型',
        suffix: ':',
        filter: function (val) {
            if (val) {
                return val
            } else {
                throw Error('请输入要导出的表模型');
            }
        }
    },
];

module.exports = {
    DbQuestions,
    inputTableQuestions
}
