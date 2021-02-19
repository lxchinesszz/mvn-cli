package com.idea.ascm;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author liuxin
 * 2021/2/3 6:14 下午
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {AscmApplication.class})
public class AscmApplicationTest {

    @Test
    public void before() {
        System.out.println(this.getClass().getName() + "Running Test");
    }
}