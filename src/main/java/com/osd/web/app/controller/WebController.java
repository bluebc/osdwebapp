package com.osd.web.app.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.osd.web.app.service.LoginService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class WebController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("/")
    public String indexPage(HttpServletRequest request, Model model) {

        // index.jsp 열릴 때 세션정보 가져감.
        Map<String, Object> loginInfo = loginService.getSession(request);
        model.addAttribute("loginInfo", loginInfo);
     
        
        return "index";
    }

    @RequestMapping("/customerCenter")
    public String mainPage() {
    return "customerCenter";
    }

    @RequestMapping("/boardList")
    public String boardList() {
    return "boardList";
    }

    @RequestMapping("/cunsultList")
    public String cunsultList() {
    return "cunsultList";
    }
    // 다른페이지 가지고 올때 사용할 예시
    // @RequestMapping("/main")
    // public String mainPage() {
    // return "main";
    // }

}
