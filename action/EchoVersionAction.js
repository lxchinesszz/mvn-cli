import chalk from "chalk";
import {logger} from "../util/logger.js";
import {toJson} from "../util/JsonUtils.js";

let packageConfig = toJson('../package.json')

/**
 * 处理成功提示
 * @param config
 */
export function successTip(config) {
    console.log(chalk.yellowBright(`   __  ____   ___  __    _______   ____\n` +
        `  /  |/  / | / / |/ /___/ ___/ /  /  _/\n` +
        ` / /|_/ /| |/ /    /___/ /__/ /___/ /  \n` +
        `/_/  /_/ |___/_/|_/    \\___/____/___/  ` + chalk.greenBright(`Application ${config.projectName} Build Success`)));
    console.log()
    logger.success(chalk.cyan(`🚀 JMVN CLI v${packageConfig.version}`))
}


