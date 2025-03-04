package com.osd.web.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    @RequestMapping("/") 
    public String indexPage() {
        return "index";
    }

    // 다른페이지 가지고 올때 사용할 예시
    // @RequestMapping("/main") 
    // public String mainPage() {
    //     return "main";
    // }

}
