package com.osd.web.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.User_InfoService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class TestController {

    @Autowired
    private User_InfoService user_InfoService;

    @RequestMapping("/test")
    public String testPage(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String loginId = (String) session.getAttribute("osdsession");

        model.addAttribute("loginId", loginId);

        return "test/test";
    }

    @ResponseBody
    @PostMapping("/getuserinfo")
    public User_InfoDto getUser_Info(@RequestBody User_InfoDto user_InfoDto) {

        User_InfoDto user_info = user_InfoService.getUser_InfoById(user_InfoDto);

        return user_info;
    }

}
