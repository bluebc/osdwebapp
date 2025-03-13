package com.osd.web.app.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.AutoLogin_InfoDto;
import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.LoginService;
import com.osd.web.app.service.MailService;
import com.osd.web.app.service.User_InfoService;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class TestController {

    @Autowired
    private User_InfoService user_InfoService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private MailService mailService;

    @RequestMapping("/test")
    public String testPage(HttpServletRequest request, HttpServletResponse response, Model model) {

        HttpSession session = request.getSession();
        String loginId = (String) session.getAttribute("loginUser");

        model.addAttribute("loginId", loginId);

        Cookie cookie = loginService.setCookie("testCookie", "coocoo");
        response.addCookie(cookie);

        return "test/test";
    }

    @ResponseBody
    @PostMapping("/getuserinfo")
    public User_InfoDto getUser_Info(@RequestBody User_InfoDto user_InfoDto) {

        User_InfoDto user_info = user_InfoService.getUser_InfoById(user_InfoDto);

        return user_info;
    }

    @ResponseBody
    @PostMapping("/ttokenmaker")
    public void autoLoginTokenMaker(@RequestParam(name = "user_id") String user_id) {

        UUID uuid = UUID.randomUUID();
        String token = uuid.toString();
        LocalDateTime expiry_date = LocalDateTime.now();

        AutoLogin_InfoDto auto_Login_TokenDto = new AutoLogin_InfoDto();

        auto_Login_TokenDto.setAutoLogin_token(token);
        auto_Login_TokenDto.setUser_id(user_id);
        auto_Login_TokenDto.setAutoLogin_expiry(expiry_date);

        loginService.insertAutoLogin_info(auto_Login_TokenDto);

        AutoLogin_InfoDto auto_Login_TokenFromDb = loginService.getAutoLogin_Info(auto_Login_TokenDto);
        System.out.println(auto_Login_TokenFromDb);

    }

    @ResponseBody
    @PostMapping("/tsendemail")
    public void sendEmail(@RequestBody Map<String, Object> emailMap) {

        String to = (String) emailMap.get("to");
        String subject = (String) emailMap.get("subject");
        String text = (String) emailMap.get("text");

        try {
            mailService.sendEmail(to, subject, text);
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @ResponseBody
    @PostMapping("/tupdateuserinfo")
    public Map<String, Object> updateUser_Info(@RequestBody User_InfoDto user_InfoDto) {
        Map<String, Object> response = new HashMap<>();

        int result = user_InfoService.updateUser_Info(user_InfoDto);

        response.put("result", result);

        return response;
    }

}
