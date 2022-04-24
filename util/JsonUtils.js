import path from 'path';
import fs from 'fs';

export function toJson(jsonPath) {
    let jsonFile = path.resolve(jsonPath)
    let jsonContent = '{}'
    if (fs.existsSync(jsonFile)) {
        jsonContent = fs.readFileSync(jsonFile, 'utf-8');
    }
    return JSON.parse(jsonContent);
}
