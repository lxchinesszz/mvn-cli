const fs = require('fs')

function GitIgnoreTemplate(filePath) {


    /**
     * 当前处理的文件模板路径
     * @private
     */
    this._filePath = filePath

    /**
     * 生成新的文件
     */
    this.create = function (newFilePath) {
        let fileContext = fs.readFileSync(this._filePath, 'utf-8');
        fs.writeFile(newFilePath, fileContext, err => {
            if (err) {
                throw err;
            }
        })
    }
}

module.exports = {GitIgnoreTemplate}
