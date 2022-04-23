let fs = require('fs')
let path = require('path')
let convert = require('xml-js');
let _ = require('lodash')



function parsePom(pomFile) {
    let xmlFile = path.resolve('pom.xml')
    let pom = '{}'
    if (fs.existsSync(xmlFile)) {
        pom = fs.readFileSync(xmlFile, 'utf-8');
    }
    let pomJson = convert.xml2json(pom, {compact: true, spaces: 4});
    return JSON.parse(pomJson);
}

/**
 * [
 *   'purchase-center-common',
 *   'purchase-center-dal',
 *   'purchase-center-core',
 *   'purchase-center-provider-api',
 *   'purchase-center-provider',
 *   'purchase-center-domain'
 * ]
 * @param pomFile pom文件
 * @returns {*} []
 */
function modules(pomFile) {
    /**
     * [
     *   { _text: 'purchase-center-common' },
     *   { _text: 'purchase-center-dal' },
     *   { _text: 'purchase-center-core' },
     *   { _text: 'purchase-center-provider-api' },
     *   { _text: 'purchase-center-provider' },
     *   { _text: 'purchase-center-domain' }
     * ]
     */
    let modules = parsePom(pomFile)['project']['modules']['module'];
    return _.map(modules, module => module['_text'])
}

module.exports = {parsePom, modules}
