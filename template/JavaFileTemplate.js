import template from 'art-template'
import fs from 'fs'
import _ from 'lodash'

export function JavaFileTemplate(filePath) {

    /**
     * 当前处理的文件模板路径
     * @private
     */
    this._filePath = filePath

    /**
     * 读取文件路径下的文件
     * @returns {string}
     */
    this.readSource = function () {
        try {
            return fs.readFileSync(this._filePath, 'utf-8');
        } catch (e) {
            throw Error(`文件路径:${this._filePath},找不到`)
        }
    }

    /**
     * 文件渲染
     * @param data
     * @returns {string}
     */
    this.render = function (data) {
        template.defaults.imports.camelCase = _.camelCase
        template.defaults.imports.capitalize = _.capitalize
        // 首字符大写
        template.defaults.imports.fistUpper = function (name) {
            return name.charAt(0).toUpperCase() + name.slice(1)
        }
        return template.render(this.readSource(), data)
    }

    /**
     * 生成新的文件
     */
    this.create = function (data, newFilePath) {
        let fileContext = this.render(data)
        fs.writeFile(newFilePath, fileContext, err => {
            if (err) {
                throw err;
            }
        })
    }
}

