const {Project} = require('./action/ProjectAction')
const {MvnConfig, DefaultDomainConfig} = require('./config/config');

var ProgressBar = require('progress');

var bar = new ProgressBar(':bar :current/:total', { total: 10 });
var timer = setInterval(function () {
    bar.tick();
    if (bar.complete) {
        clearInterval(timer);
    } else if (bar.curr === 5) {
        bar.interrupt('this message appears above the progress bar\ncurrent progress is ' + bar.curr + '/' + bar.total);
    }
}, 1000);

// // 1. 项目名称
//
// const project = new Project({
//     namespaceConfig: DefaultDomainConfig
// })
// project.create();
