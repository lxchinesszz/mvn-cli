const template = require('art-template')
const fs = require('fs')

function MavenPomTemplate(filePath) {

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
            return fs.readFileSync(filePath, 'utf-8');
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
        template.defaults.escape=false;
        return formatXml(template.render(this.readSource(), data))
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

function formatXml(xmlStr) {
    let text = xmlStr;
    //使用replace去空格
    text = '\n' + text.replace(/(<\w+)(\s.*?>)/g, function ($0, name, props) {
        return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
    }).replace(/>\s*?</g, ">\n<");
    //处理注释
    text = text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g, function ($0, text) {
        return '<!--' + escape(text) + '-->';
    }).replace(/\r/g, '\n');
    //调整格式  以压栈方式递归调整缩进
    let rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
    let nodeStack = [];
    let output = text.replace(rgx, function ($0, all, name, isBegin, isCloseFull1, isCloseFull2, isFull1, isFull2) {
        let isClosed = (isCloseFull1 === '/') || (isCloseFull2 === '/') || (isFull1 === '/') || (isFull2 === '/');
        let prefix;
        if (isBegin === '!') {//!开头
            prefix = setPrefix(nodeStack.length);
        } else {
            if (isBegin !== '/') {///开头
                prefix = setPrefix(nodeStack.length);
                if (!isClosed) {//非关闭标签
                    nodeStack.push(name);
                }
            } else {
                nodeStack.pop();//弹栈
                prefix = setPrefix(nodeStack.length);
            }
        }
        return '\n' + prefix + all;
    });
    let prefixSpace = -1;
    let outputText = output.substring(1);
    //还原注释内容
    outputText = outputText.replace(/\n/g, '\r').replace(/(\s*)<!--(.+?)-->/g, function ($0, prefix, text) {
        if (prefix.charAt(0) === '\r')
            prefix = prefix.substring(1);
        text = unescape(text).replace(/\r/g, '\n');
        return '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix) + '-->';
    });
    outputText = outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
    return outputText;
}

//计算头函数 用来缩进
function setPrefix(prefixIndex) {
    let result = '';
    let span = '    ';//缩进长度
    let output = [];
    for (let i = 0; i < prefixIndex; ++i) {
        output.push(span);
    }
    result = output.join('');
    return result;
}

// console.log(template.render('{{@name}}', {name: 'lx'}));

module.exports = {MavenPomTemplate}


// new MavenPomTemplate('../template/root.xml').create({
//     root: false,
//     projectName: 'scm',
//     projectVersion: '1.0.0-SNAPSHOT',
//     modules: ['scm-web', 'scm-dal'],
//     // 如果不是跟目录要添加上moduleName名称
//     moduleName: 'scm-web',
//     // 需要打包的模块应该是jar
//     packaging: 'pom',
//     groupId: 'com.it',
//     mavenSurefireJavaVersion: '1.8',
//     dependencies: [
//         {
//             groupId: 'org.projectlombok',
//             artifactId: 'lombok',
//             version: '1.4.0'
//         }
//     ]
// }, 'pom.xml')
