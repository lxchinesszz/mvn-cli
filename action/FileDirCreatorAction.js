const fs = require("fs");

function FileDirCreatorAction() {

    /**
     * 创建目录
     * @param filePath
     */
    this.create = function (filePath) {
        console.log("文件地址:" + filePath)
        const directoryList = filePath.split('/');
        let dir = directoryList[0];
        for (let i = 1; i < directoryList.length; i++) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            dir = dir + '/' + directoryList[i];
        }
    }
}

module.exports = FileDirCreatorAction
