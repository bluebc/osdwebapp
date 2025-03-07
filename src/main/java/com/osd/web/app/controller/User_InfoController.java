package com.osd.web.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.User_InfoService;

@Controller
public class User_InfoController {

    @Autowired
    private User_InfoService user_InfoService;

    @ResponseBody
    @PostMapping("/updateuserinfo")
    public Map<String, Object> updateUser_Info(@RequestBody User_InfoDto user_InfoDto) {
        Map<String, Object> response = new HashMap<>();

        int result = user_InfoService.updateUser_Info(user_InfoDto);

        response.put("result", result);

        return response;
    }

}
