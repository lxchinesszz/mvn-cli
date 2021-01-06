const fs = require("fs");
const {NamespaceAction} = require('./NamespaceAction')


function MavenModuleAction(NamespaceAction) {

    this.namespaceAction = NamespaceAction

    this.init = function () {
        createModule(this.namespaceAction.webPath())
        createModule(this.namespaceAction.servicePath())
        createModule(this.namespaceAction.domainPath())
        createModule(this.namespaceAction.dalPath())
        createModule(this.namespaceAction.integrationPath())
        createModule(this.namespaceAction.configPath())
        createModule(this.namespaceAction.commonPath())
    }
}

function mkdir(filepath) {
    const directoryList = filepath.split('/');
    let dir = directoryList[0];
    for (let i = 1; i < directoryList.length; i++) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        dir = dir + '/' + directoryList[i];
    }
}

function createModule(directory) {
    mkdir(createJavaModule(directory))
    mkdir(createJavaResource(directory))
    mkdir(createTestJavaModule(directory))
}

function createJavaModule(directory) {
    return `${directory}src/main/java/`
}

function createJavaResource(directory) {
    return `${directory}src/main/resource/`
}

function createTestJavaModule(directory) {
    return `${directory}src/test/java/`
}


module.exports = {MavenModuleAction}
