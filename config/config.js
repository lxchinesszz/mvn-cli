import fs from "fs";
// 配置属性

// Mybatis-Plus
const MYBATIS_PLUS = "MyBatis-Plus"

// Redis
const REDIS = "Redis"

// rabbitmq
const RABBITMQ = "RabbitMq"

// web模板
const WEB = "Web"

//
const LOMBOK = "Lombok"

// 构建项目配置配置
const ProjectTemplateConfig = {
    projectName: "ascm",
    // web层
    web: "web",
    // 业务层
    biz: "service",
    // 领域层
    domain: "domain",
    // 数据层
    dal: "dal",
    // 接口层
    integration: "integration",
    // 配置层
    config: "config",
    // 通用模块
    common: "common",
    // 分组
    groupId: "com.idanchuang",
    // 版本
    projectVersion: '1.0.0-SNAPSHOT',
    // maven编译版本
    mavenSurefireJavaVersion: '1.8',
    // 项目描述
    projectDescription: 'JMVN-CLI BUILD',
    // SpringBoot版本号
    springBootVersion: '0.5.1-RELEASE',
    // 端口号
    port: 8081,
    // 作者
    projectAuthor: 'JMVN-CLI',
    // 是否生成model规范目录
    modelFlag: true
}


const MvnConfig = {
    version: '1.0.0',
    // 项目名称
    projectName: '',
    // 项目作者
    projectAuthor: "mvn-cli.js",
    // 项目版本号
    projectVersion: '',
    // 是否自动生成readme文档
    isAutoCreateReadme: true,
    // SpringBoot版本号
    springBootVersion: '0.5.1-RELEASE',
    // 持续集成
    integrations: [MYBATIS_PLUS, REDIS, RABBITMQ, WEB, LOMBOK]
}

// 缓存: GuavaCache/Caffeine/Redis-sion
const integrationCaches = []

function log(ConfigSource) {
    fs.writeFile(`${ProjectTemplateConfig.projectName}/.jmvn.json`, JSON.stringify(JSON.parse(ConfigSource), null, "\t"), err => {
        if (err) {
            throw err;
        }
    })
}

function mvnCliConfig() {
    let configContext = fs.readFile(`${ProjectTemplateConfig.projectName}/.jmvn.json`, err => {
        throw Error("配置文件读取失败")
    })
    return JSON.stringify(configContext)
}


export {MvnConfig, ProjectTemplateConfig, log, mvnCliConfig}
