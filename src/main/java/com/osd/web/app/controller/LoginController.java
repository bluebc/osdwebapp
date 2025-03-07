package com.osd.web.app.controller;

import java.net.http.HttpRequest;
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

    @RequestMapping("/changepw")
    public String changePasswordPage(HttpServletRequest request) {

        return "changepw";
    }

    @ResponseBody
    @PostMapping("/updatepw")
    public Map<String, Object> updatePassword(HttpServletRequest request, @RequestBody Map<String, Object> idAndPw) {
        Map<String, Object> response = new HashMap<>();
        int status = 0;

        String user_id = (String) idAndPw.get("user_id");
        String user_pw_old = (String) idAndPw.get("user_pw_old");
        String user_pw_new = (String) idAndPw.get("user_pw_new");

        User_InfoDto user_InfoDto = new User_InfoDto();
        user_InfoDto.setUser_id(user_id);
        user_InfoDto.setUser_pw(user_pw_old);

        int auth = loginService.auth(user_InfoDto);

        if (auth == -2) {
            // 인증 실패
            // 비밀번호 오류
            status = -1;
        } else if (auth == 1) {

            if (user_InfoDto.getUser_pw().equals(user_pw_new)) {
                // 기존 비밀번호와 동일
                status = -2;
            } else {
                user_InfoDto.setUser_pw(user_pw_new);
                int update = loginService.updateUser_Pw(user_InfoDto);

                if (update == 0) {
                    // db update 실패
                    status = -3;
                } else if (update == 1) {
                    // update 완료
                    status = 1;
                }
            }

        }

        response.put("status", status);

        return response;
    }

}
