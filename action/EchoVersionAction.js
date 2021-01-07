const {MvnConfig} = require('../config/config')
const chalk = require('chalk')
const Table = require('cli-table');

/**
 * 打印mvn-cli版本信息
 */
function echoMvnCliVersion() {
    const updateTable = new Table({
        style: {'padding-left': 0, 'padding-right': 0, 'border': ['green']},
    });
    updateTable.push([' Update available: 1.0.0 '])
    console.log(chalk.cyan(`Mvn CLI v${MvnConfig.version}`))
    console.log(chalk.green(updateTable))
}


/**
 * 处理成功提示
 * @param config
 */
function successTip(config) {
    console.log(chalk.yellowBright(`   __  ____   ___  __    _______   ____\n` +
        `  /  |/  / | / / |/ /___/ ___/ /  /  _/\n` +
        ` / /|_/ /| |/ /    /___/ /__/ /___/ /  \n` +
        `/_/  /_/ |___/_/|_/    \\___/____/___/  Application ${config.projectName} Build Success ` +
        `                                          `))
}

module.exports = {echoMvnCliVersion, successTip}


