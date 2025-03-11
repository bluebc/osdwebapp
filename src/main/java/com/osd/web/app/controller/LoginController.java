package com.osd.web.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.LoginService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public String loginPage() {

        return "login";
    }

    // 자동로그인, 아이디저장 기능
    @ResponseBody
    @PostMapping("/userlogin")
    public Map<Object, Object> userLogin(HttpServletRequest request, HttpServletResponse response,
            @RequestBody User_InfoDto user_InfoDto,
            @RequestParam(name = "autoLogin") boolean autoLogin,
            @RequestParam(name = "rememberMe") boolean rememberMe) {
        Map<Object, Object> result = new HashMap<>();

        int status = loginService.auth(user_InfoDto);
        result.put("status", status);

        if (status == 1) {
            loginService.setSession(request, user_InfoDto.getUser_id());
        }

        if (autoLogin) {
            Cookie autoLoginCookie = loginService.setCookie("autoLogin", user_InfoDto.getUser_id());
            response.addCookie(autoLoginCookie);

        }
        if (rememberMe) {
            Cookie rememberMeCookie = loginService.setCookie("rememberMe", user_InfoDto.getUser_id());
            response.addCookie(rememberMeCookie);
        }

        return result;
    }

    @ResponseBody
    @PostMapping("/rememberMe")
    public Map<String, Object> rememberMe(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();
        int stauts = 0;

        Cookie[] cookies = request.getCookies();
        String user_id = "";

        for (Cookie cookie : cookies) {
            if ("rememberMe".equals(cookie.getName())) {
                user_id = cookie.getValue();
            }
        }
        if(user_id != ""){
            stauts = 1;
        }
        result.put("user_id", user_id);
        result.put("status", stauts);

        return result;
    }

    // 로그인 및 인증
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

        loginService.invalidateSession(request);

        return "logout";
    }

    @RequestMapping("/signup")
    public String signupPage() {
        return "signup";
    }

    @ResponseBody
    @PostMapping("/createuser")
    public int userCreate(@RequestBody User_InfoDto user_info) {
        int result = 0;

        result = loginService.insertUser_Info(user_info);

        return result;
    }

    @ResponseBody
    @PostMapping("/getsession")
    public Map<String, Object> getSession(HttpServletRequest request) {

        Map<String, Object> sessionInfo = loginService.getSession(request);

        return sessionInfo;
    }

    @RequestMapping("/withdraw")
    public String withdrawPage(HttpServletRequest request) {

        return "withdraw";
    }

    @ResponseBody
    @PostMapping("/withdrawuser")
    public Map<String, Object> withdraw(HttpServletRequest request, @RequestBody User_InfoDto user_info) {

        Map<String, Object> response = new HashMap<>();
        int isDeleted = 0;

        loginService.invalidateSession(request);
        isDeleted = loginService.deleteUser_Info(user_info);

        response.put("isDeleted", isDeleted);

        return response;
    }

}
