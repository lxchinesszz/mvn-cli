import os from 'os'
import {exec} from 'child_process'
import {logger} from "./logger.js";
import {consoleTableString} from './TableUtils.js'
import {Asserts} from "./Asserts.js";


class JavaProcess {
    pid;
    name;

    constructor(pid, name) {
        this.pid = pid;
        this.name = name;
    }
}


/**
 * ┌───────┬───────────────────────────────────────────────────────────────────┬───────────────────────────────────┐
 * │ PID   │ 进程名称                                                          │ main 方法的参数                   │
 * ├───────┼───────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
 * │ 19137 │ com.install4j.runtime.launcher.MacLauncher                        │                                   │
 * ├───────┼───────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
 * │ 74213 │ sun.tools.jps.Jps                                                 │ -lm                               │
 * ├───────┼───────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
 * │ 49670 │ org.jetbrains.idea.maven.server.RemoteMavenServer36               │                                   │
 * ├───────┼───────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
 * │ 67110 │ org.jetbrains.jps.cmdline.Launcher                                │ /Users/liuxin/Library/Application │
 * ├───────┼───────────────────────────────────────────────────────────────────┼───────────────────────────────────┤
 * │ 67101 │ com.idanchuang.purchase.center.provider.CenterProviderApplication │ --server.port=8000                │
 * └───────┴───────────────────────────────────────────────────────────────────┴───────────────────────────────────┘
 * -q：只输出进程 ID
 * -m：输出传入 main 方法的参数
 * -l：输出完全的包名，应用主类名，jar的完全路径名
 * -v：输出jvm参数
 * -V：输出通过flag文件传递到JVM中的参数
 */
export function listJavaProcess() {
    exec("jps -lm", (err, stdout, stderr) => {
        let javaProcessList = stdout.split("\n");
        let rows = []
        javaProcessList.forEach(javaProcess => {
            let lines = javaProcess.split(" ");
            let pid = lines[0];
            let programArguments = lines[2];
            if (lines[1] !== undefined) {
                let javaProcessName = lines[1].replace(/[\r\n]/g, "").replace(/\ +/g, "");
                if (!Asserts.isBlank(javaProcessName)) {
                    let row = [pid, javaProcessName, programArguments]
                    rows.push(row)
                }
            }
        })
        logger.successNoIcon(consoleTableString(["PID", "进程名称", "main 方法的参数"], rows))
    })
}


export function listClassBaseInfo(pid) {
    exec(`jmap -histo ${pid} | tail -2 | head -1 | awk '{printf $1 "|"}';jmap -histo 76859  | tail -1 | awk '{print $2 "|" $3}'`, (err, stdout, stderr) => {
        console.log(stdout)
    })
}

export function listLocalClass(pid) {
    listClassBaseInfo(pid)
    // exec(`jmap -histo ${pid}`, (err, stdout, stderr) => {
    //     console.log(stdout)
    // })
}

// listJavaProcess();


// listClassBaseInfo(27639)

// listLocalClass(27639)

