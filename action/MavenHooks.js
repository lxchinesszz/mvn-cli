const FileTemplate = require('../template/FileTemplate')
const path = require('path')
const Table = require('cli-table');
const chalk = require('chalk')
const {successTip} = require('../action/EchoVersionAction')
const FileDirCreatorAction = require('./FileDirCreatorAction')
const logger = require('../util/logger')

function _dir(path) {
    new FileDirCreatorAction().create(path)
}

function MavenHooks(projectTemplateConfig) {

    this._projectTemplateConfig = projectTemplateConfig

    /**
     * web创建
     * @param webPath
     */
    this.webCreateHook = function (webPath) {
        logger.info('MavenHooks webPath:' + webPath)
        if (projectTemplateConfig.modelFlag) {
            _dir(`${webPath}model/vo/`)
            _dir(`${webPath}model/dto/`)
        }

    }

    /**
     * service层创建
     * @param servicePath
     */
    this.serviceCreateHook = function (servicePath) {
        logger.info('MavenHooks servicePath:' + servicePath)
        if (projectTemplateConfig.modelFlag) {
            _dir(`${servicePath}model/dto/`)
        }
    }

    /**
     * domainPath
     * @param domainPath
     */
    this.domainCreateHook = function (domainPath) {
        logger.info('MavenHooks domainPath:' + domainPath)
        if (projectTemplateConfig.modelFlag) {
            _dir(`${domainPath}model/bo/`)
        }
    }

    /**
     * dalPath
     * @param dalPath
     */
    this.dalCreateHook = function (dalPath) {
        logger.info('MavenHooks dalPath:' + dalPath)
        if (projectTemplateConfig.modelFlag) {
            _dir(`${dalPath}model/entity/`)
        }
    }

    /**
     * integrationPath
     * @param integrationPath
     */
    this.integrationCreateHook = function (integrationPath) {
        logger.info('MavenHooks integrationPath:' + integrationPath)
        if (projectTemplateConfig.modelFlag) {
            _dir(`${integrationPath}model/dto/`)
        }
    }

    /**
     * configPath
     * @param configPath
     */
    this.configCreateHook = function (configPath) {
        logger.info('MavenHooks configPath:' + configPath)
    }

    /**
     * commonPath
     * @param commonPath
     */
    this.commonCreateHook = function (commonPath) {
        logger.info('MavenHooks commonPath:' + commonPath)
    }

    /**
     * web资源修改application.yml
     * @param javaResourcePath
     */
    this.createJavaResource = function (javaResourcePath) {
        _dir(javaResourcePath)
    }

    /**
     * web资源修改application.yml
     * @param javaResourcePath
     */
    this.createJavaResourceApplication = function (javaResourcePath) {
        const {projectName, port} = projectTemplateConfig
        const application = path.resolve(__dirname, './maven/application.yml')
        const fileTemplate = new FileTemplate(application)
        const applicationPath = `${javaResourcePath}application.yml`
        fileTemplate.create({
            projectName: projectName,
            port: port,
        }, applicationPath)

        logger.success(`Build: Add SpringBoot Config:${applicationPath}`);
    }

    /**
     * 构建完成消息
     */
    this.buildCompleteHooks = function (config) {
        successTip(projectTemplateConfig)
        const table = new Table({
            head: ['项目名', '作者', '项目版本', 'SpringBoot版本', '描述', '端口号'],
            style: {
                border: ['green'],
                head: ['green']
            }
        });
        const {
            projectName,
            projectVersion,
            springBootVersion,
            projectDescription,
            projectAuthor,
            port
        } = projectTemplateConfig
        table.push(
            [`${projectName}`, `${projectAuthor}`, `${projectVersion}`,
                `${springBootVersion}`, `${projectDescription}`, `${port}`]
        );
        console.log(chalk.green(table.toString()))
    }
}


function _createJavaResource(namespace) {
    let directory = namespace.path;
    let path = `${directory}src/main/resources/`
    console.log(chalk.yellow('Build:'), chalk.green(`${path}`));
    return path
}

module.exports = {MavenHooks}
