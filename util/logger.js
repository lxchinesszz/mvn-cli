const logSymbols = require("log-symbols")
const chalk = require('chalk')

function logger() {
}

logger.info = function (msg) {
    console.log(chalk.blueBright(logSymbols.info), chalk.blueBright(msg))
}

logger.error = function (msg) {
    console.log(chalk.redBright(logSymbols.error), chalk.redBright(msg))
}

logger.warning = function (msg) {
    console.log(chalk.yellowBright(logSymbols.warning), chalk.yellowBright(msg))
}

logger.success = function (msg) {
    console.log(chalk.greenBright(logSymbols.success), chalk.greenBright(msg))
}

logger.successNoIcon = function (msg) {
    console.log(chalk.greenBright(msg))
}

module.exports = logger

