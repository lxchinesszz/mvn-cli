import path from 'path';
import convert from 'xml-js';
import fs from 'fs';
import _ from 'lodash';

export function parsePom(pomFile) {
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
export function modules(pomFile) {
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

export function dependencyManagement(pomFile) {
    let dependencies = parsePom(pomFile)['project']['dependencyManagement']['dependencies']['dependency'];
    return _.map(dependencies, dependency => new Dependency(getValue(dependency, 'groupId'), getValue(dependency, 'artifactId'), getValue(dependency, 'version'), getValue(dependency, 'scope')))
}

export function properties(pomFile){

}

class Dependency {
    constructor(groupId, artifactId, version, scope) {
        this.groupId = groupId;
        this.artifactId = artifactId;
        this.version = version;
        this.scope = scope;
    }
}


function getValue(element, key) {
    if (element && element[key]) {
        return element[key]['_text']
    }
    return null;
}
