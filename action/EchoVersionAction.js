const chalk = require('chalk')
const packageConfig = require('../package.json')

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
    console.log(chalk.cyan(` - JMVN CLI v${packageConfig.version}`))
}

module.exports = {successTip}

