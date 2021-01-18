const chalk = require('chalk')
const Table = require('cli-table');
const packageConfig = require('../package.json')
const semver = require('semver')
const axios = require('axios');

async function getVersion(id) {
    return await axios.get(`https://registry.npmjs.org/${id}`)
}

/**
 * 打印mvn-cli版本信息
 */
function echoMvnCliVersion() {
    // 打印当前版本号
    console.log(chalk.cyan(`JMVN CLI v${packageConfig.version}`))
    getVersion(packageConfig.name).then(res => {
        // 获取网络最新版本
        const lastedVersion = res.data['dist-tags']['latest']
        // 如果不是最新版本提示建议进行升级
        if (!semver.satisfies(packageConfig.version, lastedVersion)) {
            const updateTable = new Table({
                style: {'padding-left': 0, 'padding-right': 0, 'border': ['red']},
            });
            updateTable.push([` Update available: ${lastedVersion} `])
            console.log(chalk.red(updateTable))
            console.log(chalk.red(`最新版本为:${lastedVersion},建议你升级为新版`))
            console.log(chalk.green(`> npm i -g jmvn`))
        }
    }).catch(error => {

    })
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
    console.log(chalk.cyan(` - JMVN CLI v${packageConfig.version}`))
}

module.exports = {echoMvnCliVersion, successTip}

