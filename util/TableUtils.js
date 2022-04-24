import Table from 'cli-table';
import _ from 'lodash';

const MD_STYLE = {
    'top': ' ', 'top-mid': '', 'top-left': '', 'top-right': ''
    , 'bottom': ' ', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': ''
    , 'left': '| ', 'left-mid': '', 'mid': '', 'mid-mid': ''
    , 'right': ' |', 'right-mid': '', 'middle': ' | '
}

/**
 * 输出到控制台
 * ┌──────┬──────┬──────┐
 * │ 字段  │ 名称  │ 介绍  │
 * ├──────┼──────┼──────┤
 * │ 11   │ 2    │ 3    │
 * └──────┴──────┴──────┘
 * @param heads ['字段', '名称', '介绍']
 * @param rows [[11, 2, 3]]
 * @returns {string|*}
 */
function consoleTableString(heads, rows) {
    const table = new Table({
        head: heads,
        style: {
            border: ['green'],
            head: ['green']
        }
    });
    rows.forEach(row => {
        table.push(row)
    })
    return table.toString();
}

/**
 * markdown格式的输出
 * ┌──────┬──────┬──────┐
 * │ 字段  │ 名称  │ 介绍  │
 * ├──────┼──────┼──────┤
 * │ 11   │ 2    │ 3    │
 * └──────┴──────┴──────┘
 * @param heads ['字段', '名称', '介绍']
 * @param rows [[11, 2, 3]]
 * @returns {string|*}
 */
function markdownTableString(heads, rows) {
    const table = new Table({
        head: _bold(heads),
        chars: MD_STYLE
    });
    _headLine(rows)
    rows.forEach(row => {
        table.push(row)
    })
    return table.toString();
}

/**
 * heads加粗
 * @param heads [ '字段', '名称', '介绍' ]
 * @returns {*} [ '**字段**', '**名称**', '**介绍**' ]
 * @private
 */
function _bold(heads) {
    return heads.map(head => {
        return `**${_.trim(head)}**`
    })
}

function _headLine(rows) {
    let lines = []
    for (let i = 0; i < rows[0].length; i++) {
        lines.push("------------")
    }
    rows.unshift(lines)
}

export {consoleTableString, markdownTableString}

