package com.osd.web.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.LoginService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public String loginPage() {

        return "login";
    }

    @ResponseBody
    @PostMapping("/auth")
    public Map<Object, Object> auth(@RequestBody User_InfoDto user_InfoDto,
            HttpServletRequest request) {
        Map<Object, Object> result = new HashMap<>();

        int status = loginService.auth(user_InfoDto);
        result.put("status", status);

        if (status == 1) {
            loginService.setSession(request, user_InfoDto.getUser_id());
        }

        return result;
    }

    @RequestMapping("/logout")
    public String logout(HttpServletRequest request) {

        HttpSession session = request.getSession();
        session.invalidate();

        return "logout";
    }

    @RequestMapping("/signup")
    public String signupPage() {
        return "signup";
    }

    @ResponseBody
    @PostMapping("/usercreate")
    public int userCreate(@RequestBody User_InfoDto user_info) {
        int result = 0;

        result = loginService.insert(user_info);

        return result;
    }

    @ResponseBody
    @PostMapping("/getsession")
    public Map<String, Object> getSession(HttpServletRequest request) {
  
        Map<String, Object> sessionInfo = loginService.getSession(request);

        return sessionInfo;
    }

}
