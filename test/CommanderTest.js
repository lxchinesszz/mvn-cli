#!/usr/bin/env node
import {ProjectTemplateConfig} from '../config/config.js';
import {projectInfoQuestionsEn} from '../config/questions_en.js';
import DomainModelCreateAction from '../action/DomainModelCreateAction.js'
import {DbQuestions, inputTableQuestions} from '../config/db_questions.js'
import Program from 'commander'
import Prompt from 'inquirer'
import {Project} from '../action/ProjectAction.js'
import chalk from "chalk";
import Table from 'cli-table'
import semver from 'semver'
import axios from "axios";
import {logger} from "../util/logger.js";
import _ from 'lodash'
import {getDbConfig} from "../util/DomainModelUtils.js";
import {Asserts} from "../util/Asserts.js";
import {toJson} from "../util/JsonUtils.js";

let packageConfig = toJson('../package.json')
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        let originalRequest = error.config
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
            // eslint-disable-next-line
            return Promise.reject('TIMEOUT')
        }
        return Promise.reject(error)
    }
)

async function getVersion(id) {
    axios.defaults.timeout = 100;
    return await axios.get(`https://registry.npmjs.org/${id}`)
}

Program
    .version(`v${packageConfig.version}`)
    .description("快速构建支持SpringBoot的Maven多模块应用")

/**
 * 命令行函数定义
 */
function viewProgram() {
    Program
        .command("init")
        .description("创建一个新的Maven多模块项目")
        .action(() => {
            Prompt.prompt(projectInfoQuestionsEn).then(result => {
                console.log("您选择的平台类型信息如下：");
                // 1. 项目名称
                ProjectTemplateConfig.projectName = result.projectName
                ProjectTemplateConfig.projectVersion = result.projectVersion
                ProjectTemplateConfig.projectDescription = result.projectDescription
                ProjectTemplateConfig.springBootVersion = result.springBootVersion
                ProjectTemplateConfig.groupId = result.groupId
                ProjectTemplateConfig.projectAuthor = result.projectAuthor
                ProjectTemplateConfig.port = result.port
                const project = new Project({
                    projectTemplateConfig: ProjectTemplateConfig
                })
                project.create();
            })
        });


    const installProgram = Program
        .command("install")
        .alias('i')
        .option('-i, --tables [String]', '要安装的表模型名称(可以使用,分隔)')
        .option('-s, --suffix [String]', '模型后缀名', false)
        .option('-p, --path [String]', '要安装的路径地址(相对路径)', false)
        .description("安装数据模型");

    installProgram.action(() => {
        try {
            let domainModelCreateAction = new DomainModelCreateAction();
            if (_.isString(installProgram.tables) && _.isString(installProgram.path)) {
                domainModelCreateAction.buildAndAdd({
                    "suffix": _.isString(installProgram.suffix) ? installProgram.suffix : 'DO',
                    "tableName": _.isString(installProgram.tables) ? _.split(installProgram.tables).filter(entry => {
                        return !_.isEmpty(entry)
                    }) : [],
                    "path": `${installProgram.path}`
                })
            } else {
                // 直接读取配置
                domainModelCreateAction.build();
            }
        } catch (Error) {
            logger.error(Error.message)
        }
    });

    const exportProgram = Program
        .command("export")
        .option('-c, --commanded [String]', '命令行模式运行')
        .option('-m, --markdown [String]', '导出markdown格式')
        .option('-h, --host [String]', '数据库[host]')
        .option('-u, --user [String]', '数据库登陆用户')
        .option('-p, --password [String]', '登陆密码(明文请注意安全)')
        .option('-t, --tables [String]', '要导出的表模型(支持,分隔)')
        .option('-db, --database [String]', '指定要导出的库')
        .description("导出数据模型 (支持命令行模式 & 交互模式)");
    exportProgram.action(() => {
        if (exportProgram.commanded) {
            if (Asserts.isBlank(exportProgram.host)) {
                logger.error(`Host cannot be empty(${exportProgram.host})`)
                logger.error("建议输入jmvn help export,查看帮助")
            } else if (Asserts.isBlank(exportProgram.user)) {
                logger.error("User cannot be empty")
                logger.error("建议输入jmvn help export,查看帮助")
            } else if (Asserts.isBlank(exportProgram.tables)) {
                logger.error("Tables cannot be empty")
                logger.error("建议输入jmvn help export,查看帮助")
            } else if (Asserts.isBlank(exportProgram.database)) {
                logger.error("Database cannot be empty")
                logger.error("建议输入jmvn help export,查看帮助")
            } else {
                let config = {
                    "host": exportProgram.host,
                    "user": exportProgram.user,
                    "password": exportProgram.password,
                    "database": exportProgram.database,
                    "format": exportProgram.markdown ? "markdown" : "table",
                    "tables": _.split(exportProgram.tables, ',').reverse()
                };
                logger.info(`您输入的表模型信息:${JSON.stringify(config)}`);
                _exportFunction(config)
            }
        } else {
            let dbConfig = getDbConfig()
            if (!Asserts.isBlank(dbConfig)
                && !Asserts.isBlank(dbConfig.host)
                && !Asserts.isBlank(dbConfig.user)
                && !Asserts.isBlank(dbConfig.password)) {
                // 添加了配置，且有添加了数据库host和密码信息会走简短的
                logger.info(`检查到当前项目已配置过数据库信息,当前自动读取数据库配置。若想导出非本项目,请使用 jmvn export -c`);
                Prompt.prompt(inputTableQuestions).then(result => {
                    logger.info(`您输入的表模型信息:${JSON.stringify(result)}`);
                    let config = {
                        "host": dbConfig.host,
                        "user": dbConfig.user,
                        "password": dbConfig.password,
                        "database": dbConfig.database,
                        "format": result.format,
                        "tables": _.split(result.tables, ',').reverse()
                    };
                    _exportFunction(config)
                })
            } else {
                // 如果没有添加配置文件走这个
                Prompt.prompt(DbQuestions).then(result => {
                    logger.info(`您输入的表模型信息:${JSON.stringify(result)}`);
                    let config = {
                        "host": result.host,
                        "user": result.user,
                        "password": result.password,
                        "database": result.database,
                        "format": result.format,
                        "tables": _.split(result.tables, ',').reverse()
                    };
                    _exportFunction(config)
                })
            }
        }

    });
    Program.parse(process.argv);
}

function _exportFunction(config) {
    let domainModelCreateAction = new DomainModelCreateAction();
    if (_.isEqual(config['format'], "markdown")) {
        domainModelCreateAction.exportsMarkdown(config)
    } else {
        domainModelCreateAction.exports(config)
    }
}

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
    } else {
        viewProgram()
    }
}).catch(error => {
    // 超时就不检查版本了,直接使用
    if (error === 'TIMEOUT') {
        viewProgram()
    }
})
