
# mvn-cli

构建maven多模块应用。

- [ ] 项目名称
- [ ] 项目作者
- [ ] 是否生成README
- [ ] 是否持续集成
- [ ] 项目初始版本号
- [ ] SpringBoot版本号
- [ ] 是否集成Mybatils-Plus,是否集成SpringBoot,是否集成Web,MQ,

```xml
    <groupId>com.idanchuang</groupId>
    <artifactId>spring-cloud-starter-parent</artifactId>
    <version>0.5.1-RELEASE</version>
```


```
Mvn CLI v1.0.0
┌───────────────────────────┐
│  Update available: 1.0.0  │
└───────────────────────────┘

```


```
scm
    - scm-web
        - com
            - idanchuang
                - scm
                    - web
                        - controller              
    - scm-biz
        - com
            - idanchuang
                - scm
                    - service
                        - impl
                    - model
                        - vo
                        - request
                        - response
                    - utils    
    - scm-manager
        - com
            - idanchuang
                - scm
                    - manager
                        - model
                            - bo
                            - dto
                        - utils
    - scm-dal
        - com
            - idanchuang
                - scm
                    - dal
                        - model
                            - do
                            - dto
                        - utils
    - scm-integration
        - com
            - idanchuang
                - scm
                    - integration
                        - model
                            - dto
                        - utils
    - scm-config
        - com
            - idanchuang
                - scm
                    - config
                        - redis
                        - message
    - scm-common
        - com
            - idanchuang
                - scm
                    - common
```
