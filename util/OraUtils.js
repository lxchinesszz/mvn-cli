const ora = require('ora')

const chalk = require('chalk');

/**
 *
 * @param runtimeMsg 运行时提示
 * @param successMsg 运行成功时提示
 * @param timeout 延迟执行
 * @param callback 数据处理函数
 */
function animation(runtimeMsg, successMsg, timeout, callback) {
    const spinner = ora({
        text: `${chalk.greenBright(runtimeMsg)}`,
    }).start()
    // console.log()
    if (spinner.isSpinning) {
        try {
            setTimeout(function () {
                callback()
                setTimeout(function () {
                    spinner.succeed(`${chalk.greenBright(successMsg)}`)
                }, 500)
            }, timeout)
        } catch (error) {
            spinner.fail(`${chalk.redBright('执行失败')}`)
        }
    }

}

module.exports = {animation}

