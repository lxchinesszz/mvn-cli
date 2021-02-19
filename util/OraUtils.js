const ora = require('ora')

const chalk = require('chalk');

function animation(runtimeMsg, successMsg, timeout, callback) {
    const spinner = ora({
        text: `${chalk.greenBright(runtimeMsg)}`,
    }).start()
    console.log()
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
        spinner.stop()
    }

}

module.exports = {animation}

