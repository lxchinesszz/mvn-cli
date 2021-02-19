package com.idea.ascm.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author liuxin
 * 2021/2/3 6:16 下午
 */
@RestController
public class WebController {

    @GetMapping(value = "/get")
    public String test(){
        return "test";
    }
}
