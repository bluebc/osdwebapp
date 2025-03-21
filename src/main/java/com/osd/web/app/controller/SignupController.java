package com.osd.web.app.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.Term_ListDto;
import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.dto.User_TermDto;
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


    // ==================== 회원정보 ====================

    @ResponseBody
    @PostMapping("/existsUser")
    public int idcheck(@RequestBody User_InfoDto user_info) {
        int result = 0;

        result = signupService.existsUser_InfoById(user_info);

        return result;
    }

    @ResponseBody
    @PostMapping("/signup/insertUser")
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

    @RequestMapping("/termview")
    public String termViewPage(@RequestParam(value = "term_id", required = true) String term_id, Model model) {
        System.out.println(term_id);
        System.out.println("확인");
        Term_ListDto term = signupService.getTerm_ListByid(term_id);
     
        model.addAttribute("term",term);


        return "privacyAgree";
    }


    @ResponseBody
    @PostMapping("/signup/insertUserTerm")
    public int signupterm(@RequestBody User_TermDto user_term) {
        int result = 0;
       System.out.println(result);
        result = signupService.insertUser_Term(user_term);

        return result;
    }
    
    @ResponseBody
    @PostMapping("/signup/insertMultiUserTerm")
    public int signupterm(@RequestBody List<User_TermDto> user_term) {
        int result = 0;
       System.out.println(result);
        result = signupService.insertMuitiUser_Term(user_term);

        return result;
    }

    @RequestMapping("/termspage")
    public String gtermspage() {

        
        return "termspage";
    }

    @RequestMapping("/termsmain")
    public String termsmain() {

        
        return "termsmain";
    }

}

