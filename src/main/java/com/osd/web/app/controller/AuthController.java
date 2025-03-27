package com.osd.web.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.Auth_EmailDto;
import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.MailService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/auth")
@Controller
public class AuthController {

    @Autowired
    private MailService mailService;

    // 인증작업 전 세션 설정
    @ResponseBody
    @PostMapping("/setSession")
    public Map<String, Object> setAuthSession(HttpServletRequest request, @RequestBody Map<String, Object> requestMap) {
        Map<String, Object> result = new HashMap<>();
        int code = 0;
        HttpSession session = request.getSession();
        session.setAttribute("auth_purpose", null);
        session.setAttribute("find_user_id", null);

        String auth_purpose = (String) requestMap.get("auth_purpose");
        if (auth_purpose != null && !auth_purpose.equals("")) {
            session.setAttribute("auth_purpose", auth_purpose);
        }
        String user_id = (String) requestMap.get("user_id");

        if (auth_purpose.equals("find_reset_pw")) {
            if (user_id != null && !user_id.equals("")) {
                session.setAttribute("find_user_id", user_id);
            }
        }

        code = 1;
        result.put("code", code);
        return result;
    }

    // 1. 이메일 인증 요청 페이지
    @RequestMapping("/email/request")
    public String authEmailRequestPage(HttpServletRequest request) {
        // HttpSession session = request.getSession();
        // String auth_purpose = (String) session.getAttribute("auth_purpose");

        return "authEmailRequest";
    }

    // 2. 인증 이메일 요청
    @ResponseBody
    @PostMapping("/email/postRequest")
    public Map<String, Object> authEmailRequest(HttpServletRequest request,
            @RequestBody User_InfoDto user_InfoDto) {
        Map<String, Object> result = new HashMap<>();
        int code = 0;
        HttpSession session = request.getSession();

        // 세션 확인
        String auth_purpose = (String) session.getAttribute("auth_purpose");
        if (auth_purpose == null || auth_purpose.equals("")) {
            result.put("code", code);
            return result;
        }
        // 이메일 객체 확인
        if (user_InfoDto == null) {
            result.put("code", code);
            return result;
        }
        if (user_InfoDto.getUser_email() == null) {
            result.put("code", code);
            return result;
        }

        // 인증 목적 별 로직 -
        session.setAttribute("auth_email", user_InfoDto.getUser_email());

        // 이메일 인증 객체 생성
        Auth_EmailDto auth_EmailDto = new Auth_EmailDto();
        auth_EmailDto.setUser_email(user_InfoDto.getUser_email());
        auth_EmailDto.setAuth_purpose((String) session.getAttribute("auth_purpose"));
        // 이메일 발송
        int sended = mailService.sendAuthEmail(auth_EmailDto);

        code = sended;
        result.put("code", code);

        return result;
    }

    // 3. 인증코드 입력 페이지
    @RequestMapping("/email/verify")
    public String authEmailVerifyPage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String auth_purpose = (String) session.getAttribute("auth_purpose");

        System.out.println(auth_purpose);

        return "authEmailVerify";
    }

    // 4. 인증 완료 처리
    @ResponseBody
    @PostMapping("/email/postVerify")
    public Map<String, Object> emailAuth(HttpServletRequest request, @RequestBody Auth_EmailDto auth_EmailDto) {
        Map<String, Object> result = new HashMap<>();
        int code = 0;
        HttpSession session = request.getSession();

        // 세션 확인
        String auth_email = (String) session.getAttribute("auth_email");
        if (auth_email == null || auth_email.equals("")) {
            result.put("code", code);
            return result;
        }
        String auth_purpose = (String) session.getAttribute("auth_purpose");
        if (auth_purpose == null || auth_purpose.equals("")) {
            result.put("code", code);
            return result;
        }

        // 이메일 인증 객체
        auth_EmailDto.setUser_email(auth_email);
        auth_EmailDto.setAuth_purpose(auth_purpose);

        // DB 확인
        code = mailService.checkAuthCode(auth_EmailDto);
        // 에러코드
        if (code != 1) {
            result.put("code", code);
            return result;
        }

        // 인증 완료 후
        // session.setAttribute("auth_email", null);
        // session.setAttribute("auth_purpose", null);
        session.setAttribute("auth_confirmed", "auth_confirmed");
        result.put("code", code);
        result.put("auth_purpose", auth_purpose);

        return result;
    }

}
