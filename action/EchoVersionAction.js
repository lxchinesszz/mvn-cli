const chalk = require('chalk')
const packageConfig = require('../package.json')
const logger = require('../util/logger')

/**
 * 处理成功提示
 * @param config
 */
function successTip(config) {
    console.log(chalk.yellowBright(`   __  ____   ___  __    _______   ____\n` +
        `  /  |/  / | / / |/ /___/ ___/ /  /  _/\n` +
        ` / /|_/ /| |/ /    /___/ /__/ /___/ /  \n` +
        `/_/  /_/ |___/_/|_/    \\___/____/___/  ` + chalk.greenBright(`Application ${config.projectName} Build Success`)));
    console.log()
    logger.success(chalk.cyan(`🚀 JMVN CLI v${packageConfig.version}`))
}

module.exports = {successTip}


