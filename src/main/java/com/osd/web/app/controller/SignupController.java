package com.osd.web.app.controller;


import java.util.HashMap;
<<<<<<< HEAD
import java.util.List;
=======
>>>>>>> f635c65e4b52e8940b84821050559df8d879a781
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.GetMapping;
=======

>>>>>>> f635c65e4b52e8940b84821050559df8d879a781
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;

<<<<<<< HEAD
import com.osd.web.app.dto.Term_ListDto;
=======

>>>>>>> f635c65e4b52e8940b84821050559df8d879a781
import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.LoginService;
import com.osd.web.app.service.SignupService;

import jakarta.servlet.http.HttpServletRequest;


@Controller
public class SignupController {

     @Autowired
    private LoginService loginService;

    @Autowired
    private SignupService signupService;
   

    @RequestMapping("/signup")
    public String signupPage() {
        return "signup";
    }

<<<<<<< HEAD
    // ==================== 회원정보 ====================

=======
>>>>>>> f635c65e4b52e8940b84821050559df8d879a781
    @ResponseBody
    @PostMapping("/existsUser")
    public int idcheck(@RequestBody User_InfoDto user_info) {
        int result = 0;

        result = signupService.existsUser_InfoById(user_info);

        return result;
    }

    @ResponseBody
<<<<<<< HEAD
    @PostMapping("/signup/insertUser")
=======
    @PostMapping("/insertUser")
>>>>>>> f635c65e4b52e8940b84821050559df8d879a781
    public int signup(@RequestBody User_InfoDto user_info) {
        int result = 0;

        result = signupService.insertUser_Info(user_info);

        return result;
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
        isDeleted = signupService.deleteUser_Info(user_info);

        response.put("isDeleted", isDeleted);

        return response;
    }

<<<<<<< HEAD
    // ==================== 약관정보 ====================

    @ResponseBody
    @PostMapping("/getTermAll")
    public List<Term_ListDto> getTermAll() {

        List<Term_ListDto> list = signupService.getTerm_ListAll();

        return list;
    }

    @ResponseBody
    @PostMapping("/getTermOne")
    public Term_ListDto getTermOne() {

        Term_ListDto list = signupService.getTerm_ListOne();

        return list;
    }

}

=======
}
>>>>>>> f635c65e4b52e8940b84821050559df8d879a781
