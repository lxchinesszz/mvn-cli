const {FileTemplate} = require('../template/FileTemplate')
const path = require('path')
const Table = require('cli-table');
const chalk = require('chalk')
const {successTip} = require('../action/EchoVersionAction')

function MavenHooks(namespace) {

    this._config = namespace

    /**
     * web创建
     * @param webPath
     */
    this.webCreateHook = function (webPath) {
        console.log('MavenHooks:' + webPath)
    }

    /**
     * web资源修改application.yml
     * @param javaResourcePath
     */
    this.createJavaResource = function (javaResourcePath) {
        const {projectName, port} = namespace
        const application = path.resolve(__dirname, './maven/application.yml')
        const fileTemplate = new FileTemplate(application)
        const applicationPath = `${javaResourcePath}application.yml`
        fileTemplate.create({
            projectName: projectName,
            port: port,
        }, applicationPath)
        console.log(chalk.yellow('Build:'), chalk.green(`Add SpringBoot Config:${applicationPath}`));
    }

    /**
     * 构建完成消息
     */
    this.buildCompleteHooks = function (config) {
        successTip(namespace)
        const table = new Table({
            head: ['项目名', '作者', '项目版本', 'SpringBoot版本', '描述', '端口号'],
            style: {
                border: ['green'],
                head: ['green']
            }
        });
        const {projectName, projectVersion, springBootVersion, projectDescription, projectAuthor, port} = namespace
        table.push(
            [`${projectName}`, `${projectAuthor}`, `${projectVersion}`,
                `${springBootVersion}`, `${projectDescription}`, `${port}`]
        );
        console.log(chalk.green(table.toString()))
    }
}

module.exports = {MavenHooks}
