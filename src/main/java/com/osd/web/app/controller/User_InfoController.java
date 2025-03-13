package com.osd.web.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.MailService;
import com.osd.web.app.service.User_InfoService;

@Controller
public class User_InfoController {

    @Autowired
    private User_InfoService user_InfoService;

    @Autowired
    private MailService mailService;

    @ResponseBody
    @PostMapping("/updateuserinfo")
    public Map<String, Object> updateUser_Info(@RequestBody User_InfoDto user_InfoDto) {
        Map<String, Object> response = new HashMap<>();

        int result = user_InfoService.updateUser_Info(user_InfoDto);

        response.put("result", result);

        return response;
    }

    // @ResponseBody
    // @PostMapping("/findidbyemail")
    // public Map<String, Object> findIdByEmail(@RequestBody User_InfoDto user_InfoDto) {
    //     Map<String, Object> result = new HashMap<>();
    //     int status = 0;

    //     User_InfoDto user_InfoFromDb = user_InfoService.getUser_IdByEmail(user_InfoDto);
    //     String user_email = user_InfoFromDb.getUser_email();

    //     if (user_email == null || user_email.equals("")) {
    //         // 이메일 없음
    //         status = -1;
    //         result.put("status", status);
    //         return result;
    //     }
    //     String subject = "osdwebapp mailtest";
    //     String text = "아이디 찾기 테스트";
    //     try {
    //         int sended = mailService.sendEmail(user_email, subject, text);
    //         if (sended == 0) {
    //             status = -2;
    //         }
    //         if (sended == 1) {
    //             status = 1;
    //         }
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     }

    //     result.put("status", status);

    //     System.out.println(result);

    //     return result;
    // }

}
