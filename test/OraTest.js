let ora = require('ora')

// const spinner = ora('正在下载......').start()
// spinner.color = 'green'
// spinner.text = 'Loading rainbows'
//
// setTimeout(() => {
//     // spinner.succeed('下载成功')
//     // spinner.fail('下载失败')
//     // spinner.info('下载完成')
// }, 2000)

//
const {animation} = require('../util/OraUtils')


animation("下载中","下载完成",5000,()=>{
    console.log("数据处理中")
})
