import fs from 'fs';
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function toJson(jsonPath) {
    let jsonFile = path.resolve(__dirname, jsonPath)
    let jsonContent = '{}'
    if (fs.existsSync(jsonFile)) {
        // console.log("依赖文件已存在:" + jsonFile)
        jsonContent = fs.readFileSync(jsonFile, 'utf-8');
    } else {
        // console.log("依赖文件不存在:" + jsonFile)
    }
    return JSON.parse(jsonContent);
}
