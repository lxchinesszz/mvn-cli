package com.idea.ascm.web;

import com.idea.ascm.AscmApplicationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


/**
 * @author liuxin
 * 2021/2/3 6:17 下午
 */
public class WebControllerTest extends AscmApplicationTest {

    @Autowired
    private WebController webController;

    @Test
    public void test() {
        System.out.println(webController.test());
    }
}