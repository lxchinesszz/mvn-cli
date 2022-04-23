let ora = require('ora')


const {animation} = require('../util/OraUtils')

animation("下载中", "下载完成", 5000, () => {
    console.log()
    console.log("数据处理中")
})
