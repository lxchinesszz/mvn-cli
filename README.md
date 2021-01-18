# 一、介绍 | Introduce

![](https://img.springlearn.cn/blog/learn_1610971978000.png)

快速构建支持SpringBoot的Maven多模块应用,启动及快速打包部署

# 二、快速安装

```
➜ npm i jmvn -g
```

# 三、快速构建

## 3.1 命令行构建项目

![](https://img.springlearn.cn/blog/learn_1610973272000.png)

## 3.2 idea直接打开

- 可以点击 `run main` 启动
![](https://img.springlearn.cn/blog/learn_1610973142000.png)

## 3.3 打包jar文件部署

- 输入 `mvn package` 快速打包构建部署

```
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary:
[INFO] 
[INFO] ascm ............................................... SUCCESS [  0.364 s]
[INFO] ascm-common ........................................ SUCCESS [  0.842 s]
[INFO] ascm-integration ................................... SUCCESS [  0.040 s]
[INFO] ascm-dal ........................................... SUCCESS [  0.038 s]
[INFO] ascm-domain ........................................ SUCCESS [  0.038 s]
[INFO] ascm-service ....................................... SUCCESS [  0.037 s]
[INFO] ascm-web ........................................... SUCCESS [  1.274 s]
[INFO] ascm-config ........................................ SUCCESS [  0.038 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3.292 s
[INFO] Finished at: 2021-01-18T20:36:03+08:00
[INFO] Final Memory: 46M/356M
[INFO] ------------------------------------------------------------------------

```

- 进入 `web/target` 目录直接运行启动 `java -jar ascm-web.jar`

# 四、发布记录 | Release record

**1.0.1**

- 构建服务
- 支持注册命令

**1.0.2**

- 代码精简及优化
- 版本检测及升级

**1.0.3**

- fix端口号映射问题

# 五、定制 | Custom

欢迎感兴趣的小伙伴一起参与开发, 🚀 `call me！`

- 微信: `lxchinesszz`
- 邮箱: `lxchinesszz@163.com`
