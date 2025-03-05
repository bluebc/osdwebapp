package com.osd.web.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class TestController {

    @RequestMapping("/main")
    public String testing(){
        return "redirect:/test";
    }



    @RequestMapping("/test")
    public String testPage(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String loginId = (String) session.getAttribute("osdsession");

        model.addAttribute("loginId", loginId);

        return "test/test";
    }

}
