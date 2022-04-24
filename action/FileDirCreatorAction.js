import fs from "fs";
export default function FileDirCreatorAction() {

    /**
     * 创建目录
     * @param filePath
     */
    this.create = function (filePath) {
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

