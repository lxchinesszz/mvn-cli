const {GitIgnoreTemplate} = require('./template/GitIgnoreTemplate')
const path = require('path')

function GitAction() {

    /**
     * 创建gitignore文件
     */
    this.createGitIgnoreFile = function (envConfig) {
        const {projectName} = envConfig.projectConfig;
        let gitIgnoreTemplate = new GitIgnoreTemplate(path.resolve(__dirname, '.gitignore'));
        gitIgnoreTemplate.create(`${projectName}/.gitignore`);
    }
}

module.exports = GitAction
