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
import com.osd.web.app.service.MailService;
import com.osd.web.app.service.User_InfoService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/user")
@Controller
public class User_InfoController {

    @Autowired
    private User_InfoService user_InfoService;

    @RequestMapping("/info")
    public String userInfoPage(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String user_id = (String) session.getAttribute("login_user_id");
        // if (user_id == null || user_id.equals("")) {
        //     return "redirect:/wrongPath";
        // }

        User_InfoDto user_InfoDto = new User_InfoDto();
        user_InfoDto.setUser_id(user_id);

        User_InfoDto user_InfoFromDb = user_InfoService.getUser_InfoById(user_InfoDto);

        model.addAttribute("user_info", user_InfoFromDb);


        return "userInfo";
    }

    @RequestMapping("/info/update")
    public String userUpdatePage(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String user_id = (String) session.getAttribute("login_user_id");
        if (user_id == null || user_id.equals("")) {
            return "redirect:/wrongPath";
        }

        User_InfoDto user_InfoDto = new User_InfoDto();
        user_InfoDto.setUser_id(user_id);

        User_InfoDto user_InfoFromDb = user_InfoService.getUser_InfoById(user_InfoDto);

        model.addAttribute("user_info", user_InfoFromDb);

        return "userInfoUpdate";
    }

    @ResponseBody
    @PostMapping("/info/updateUserInfo")
    public Map<String, Object> updateUserInfo(@RequestBody User_InfoDto user_InfoDto) {
        Map<String, Object> resultMap = new HashMap<>();
        int status = 0;

        System.out.println(user_InfoDto);

        int updated = user_InfoService.updateUser_Info(user_InfoDto);
        if (updated == 1) {
            status = 1;
        }
        resultMap.put("status", status);

        return resultMap;
    }

}
