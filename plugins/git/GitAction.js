import path from 'path'
import {GitIgnoreTemplate} from "./template/GitIgnoreTemplate.js";

export function GitAction() {

    /**
     * 创建gitignore文件
     */
    this.createGitIgnoreFile = function (envConfig) {
        const {projectName} = envConfig.projectConfig;
        let gitIgnoreTemplate = new GitIgnoreTemplate(path.resolve(__dirname, '.gitignore'));
        gitIgnoreTemplate.create(`${projectName}/.gitignore`);
    }
}

