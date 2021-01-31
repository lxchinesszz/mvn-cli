package com.idea.ascm;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SpringBootApplication 建议放在同路径名下,
 * 因为默认会向下面路径去扫描类信息
 * @author mvn-cli
 */
@SpringBootApplication
public class AscmApplication{

    /**
     * SpringBoot主函数
     * @param args 程序启动参数
     */
    public static void main(String[]args){
        // 引导启动
        SpringApplication.run(AscmApplication.class,args);
    }

}
