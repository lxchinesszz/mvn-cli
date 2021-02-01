const {Project} = require('./action/ProjectAction')
const {MvnConfig, ProjectTemplateConfig} = require('./config/config');
const semver = require('semver')
let _ = require('lodash')


console.log();
// console.log(semver.satisfies('1.0.1', '1.0.1'));
//
// // 1. 项目名称
// //
// const project = new Project({
//     projectTemplateConfig: ProjectTemplateConfig
// })
// project.create();

let domainModels = [
    {
        "suffix": "DO",
        "tableName": [
            "demand_plan",
            "demand_plan_detail"
        ],
        "path": "ascm-dal/src/main/java/com/idea/ascm/dal/model/DO"
    },
    {
        "suffix": "BO",
        "tableName": [
            "demand_plan",
            "demand_plan_detail"
        ],
        "path": "ascm-dal/src/main/java/com/idea/ascm/dal/model/DO"
    }
]

models =
    {
        "suffix": "DO",
        "tableName": [
            "demand_plan1",
            "demand_plan_detail2"
        ],
        "path": "ascm-dal/src/main/java/com/idea/ascm/dal/model/DO"
    }


let newJ = _.filter(domainModels, {"suffix": models.suffix, "path": models.path})


add(domainModels,models)

console.log(domainModels)
/**
 *
 * @param sourceConfig 原来的配置文件
 * @param newAddConfig 要新增的配置文件
 */
function add(sourceConfig, newAddConfig) {
    let matchList = _.filter(sourceConfig, {"suffix": newAddConfig.suffix, "path": newAddConfig.path})
    // 1. 匹配到了就想加
    if (matchList.length > 0) {
        matchList.forEach(sourceConfig => {
            newAddConfig.tableName.forEach(tableName => {
                sourceConfig.tableName.push(tableName)
            })
        })
    }
}
