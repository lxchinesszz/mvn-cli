const {MvnConfig} = require('../config/config')
const chalk = require('chalk')
const Table = require('cli-table');

function echoMvnCliVersion() {
    const updateTable = new Table({
        style: {'padding-left': 0, 'padding-right': 0, 'border': ['green']},
    });
    updateTable.push([' Update available: 1.0.0 '])
    console.log(chalk.cyan(`Mvn CLI v${MvnConfig.version}`))
    console.log(chalk.green(updateTable))
}

module.exports = echoMvnCliVersion
