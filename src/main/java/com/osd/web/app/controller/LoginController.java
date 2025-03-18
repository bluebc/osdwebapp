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

import com.osd.web.app.dto.Auth_EmailDto;
import com.osd.web.app.dto.AutoLogin_InfoDto;
import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.LoginService;
import com.osd.web.app.service.MailService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private MailService mailService;

    // ==================== 로그인 시작 ====================

    @RequestMapping("/login")
    public String loginPage() {

        return "login";
    }

    // 자동로그인, 아이디저장 기능
    @ResponseBody
    @PostMapping("/login/requestLogin")
    public Map<Object, Object> loginAuth(HttpServletRequest request, HttpServletResponse response,
            @RequestBody User_InfoDto user_InfoDto,
            @RequestParam(name = "autoLogin") boolean autoLogin,
            @RequestParam(name = "rememberMe") boolean rememberMe) {
        Map<Object, Object> result = new HashMap<>();

        int status = loginService.auth(user_InfoDto);
        result.put("status", status);

        if (status == 1) {
            loginService.setLoginSession(request, user_InfoDto.getUser_id());
        }

        String user_id = user_InfoDto.getUser_id();
        String token = UUID.randomUUID().toString();

        // 토큰 만료 시점
        LocalDateTime autoLogin_expiry = LocalDateTime.now().plusMinutes(1);

        AutoLogin_InfoDto autoLogin_InfoDto = new AutoLogin_InfoDto();
        autoLogin_InfoDto.setAutoLogin_token(token);
        autoLogin_InfoDto.setUser_id(user_id);
        autoLogin_InfoDto.setAutoLogin_expiry(autoLogin_expiry);

        if (autoLogin) {
            Cookie autoLoginCookie = loginService.setCookie("autoLoginId", user_InfoDto.getUser_id());
            Cookie autoLoginTokenCookie = loginService.setCookie("autoLoginToken", token);
            response.addCookie(autoLoginCookie);
            response.addCookie(autoLoginTokenCookie);
            // 기존 자동로그인 토큰 삭제
            // loginService.deleteAuto_login_TokenById(auto_Login_TokenDto);
            loginService.insertAutoLogin_info(autoLogin_InfoDto);
        }
        if (rememberMe) {
            Cookie rememberMeCookie = loginService.setCookie("rememberMe", user_InfoDto.getUser_id());
            response.addCookie(rememberMeCookie);
        }

        return result;
    }

    // 아이디 저장 값 불러오기
    @ResponseBody
    @PostMapping("/login/rememberMe")
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
        if (user_id != "") {
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
            loginService.setLoginSession(request, user_InfoDto.getUser_id());
        }

        return result;
    }

    @RequestMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {

        loginService.invalidateSession(request);

        Cookie[] cookies = request.getCookies();
        String user_id = "";
        String autoLogin_token = "";
        AutoLogin_InfoDto autoLogin_InfoDto = new AutoLogin_InfoDto();

        for (Cookie cookie : cookies) {
            if ("autoLoginId".equals(cookie.getName())) {
                user_id = cookie.getValue();
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
            if ("autoLoginToken".equals(cookie.getName())) {
                autoLogin_token = cookie.getValue();
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }

        }
        if (!autoLogin_token.equals("") && !user_id.equals("")) {
            autoLogin_InfoDto.setAutoLogin_token(autoLogin_token);
            autoLogin_InfoDto.setUser_id(user_id);
        }

        // DB 쿠키 토큰 삭제
        loginService.deleteAuto_login_TokenByTokenAndId(autoLogin_InfoDto);

        return "logout";
    }

    // ==================== 로그인 끝 ====================

    @ResponseBody
    @PostMapping("/getsession")
    public Map<String, Object> getSession(HttpServletRequest request) {

        Map<String, Object> sessionInfo = loginService.getSession(request);

        return sessionInfo;
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

    // ==================== ID, PW 찾기 시작 ====================

    // ID
    @RequestMapping("/find/id")
    public String findIdPage() {

        return "findId";
    }

    // ID/email/1
    @RequestMapping("/find/id/email")
    public String findIdByEmailPage() {

        return "findIdByEmail";
    }

    // ID/email/1-1
    // PW/email/1-1
    // 회원정보 찾기 아이디 세션 생성
    @ResponseBody
    @PostMapping("/find/requestEmail")
    public Map<String, Object> findIdByEmail(HttpServletRequest request, @RequestBody User_InfoDto user_InfoDto) {
        Map<String, Object> result = new HashMap<>();
        int status = 0;
        HttpSession session = request.getSession();
        // 로그인 정보 찾기 세션 제거
        session.setAttribute("find_user_email", null);
        session.setAttribute("find_user_id", null);

        User_InfoDto user_InfoFromDb = loginService.getUser_IdByEmail(user_InfoDto);
        String user_email = "";
        if (user_InfoFromDb != null) {
            user_email = user_InfoFromDb.getUser_email();
        }

        Auth_EmailDto auth_EmailDto = new Auth_EmailDto();
        auth_EmailDto.setUser_email(user_InfoDto.getUser_email());

        String auth_purpose = "";
        String user_id = user_InfoDto.getUser_id();
        if (user_id != null && !user_id.equals("")) {
            // 비번 찾기
            session.setAttribute("find_user_id", user_id);
            auth_purpose = "find_reset_pw";
        } else {
            // 아이디 찾기
            auth_purpose = "find_find_id";
        }

        auth_EmailDto.setAuth_purpose(auth_purpose);
        session.setAttribute("auth_purpose", auth_purpose);
        int sended = mailService.sendAuthEmail(auth_EmailDto);
        status = sended;

        result.put("status", status);

        session.setAttribute("find_user_email", user_email);
        // session.setMaxInactiveInterval(1*60); // 1분
        session.setMaxInactiveInterval(10 * 60); // 10분

        System.out.println(result);

        return result;
    }

    // ID/email/2
    // 인증코드 입력 화면
    @RequestMapping("/find/emailAuth")
    public String emailAuthPage(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();

        String user_email = (String) session.getAttribute("find_user_email");
        String user_id = (String) session.getAttribute("find_user_id");

        // 세션없이 url 진입 시 내보냄
        if (user_email == null || user_email.equals("")) {
            return "redirect:/wrongPath";
        }

        model.addAttribute("user_email", user_email);

        return "findByEmail";
    }

    // 인증코드 입력
    @ResponseBody
    @PostMapping("/find/postEmailAuthCode")
    public Map<String, Object> emailAuth(HttpServletRequest request, @RequestBody Auth_EmailDto auth_EmailDto) {
        Map<String, Object> result = new HashMap<>();
        int status = 0;

        HttpSession session = request.getSession();
        String auth_email = (String) session.getAttribute("find_user_email");
        // 1. session 에 인증이메일이 없는 경우
        if (auth_email == null || auth_email.equals("")) {
            status = -10;
            result.put("status", status);
            return result;
        }

        auth_EmailDto.setUser_email(auth_email);
        auth_EmailDto.setAuth_purpose((String) session.getAttribute("auth_purpose"));

        int checkAuthCode = mailService.checkAuthCode(auth_EmailDto);

        // 에러코드
        if (checkAuthCode != 1) {
            status = checkAuthCode;
            result.put("status", status);
            return result;
        }

        String user_email = auth_EmailDto.getUser_email();

        User_InfoDto user_InfoDto = new User_InfoDto();
        user_InfoDto.setUser_email(user_email);
        User_InfoDto user_InfoDtoFromDb = loginService.getUser_IdByEmail(user_InfoDto);

        // ID 조회 완료
        String user_id = user_InfoDtoFromDb.getUser_id();
        if (checkAuthCode == 1) {

            status = 1;

            String find_user_id = (String) session.getAttribute("find_user_id");
            System.out.println("find_user_id: " + find_user_id);
            if (find_user_id != null && !find_user_id.equals("")) {
                if (find_user_id.equals(user_id)) {
                    status = 2;
                }

            }
            session.setAttribute("found_user_id", user_id);
            session.setAttribute("auth_purpose", null);
            result.put("status", status);
        }

        return result;
    }

    @RequestMapping("/find/result/id")
    public String idFoundPage(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String user_id = (String) session.getAttribute("found_user_id");

        String find_user_id = (String) session.getAttribute("find_user_id");
        if (find_user_id != null && !find_user_id.equals("")) {
            // 로그인 정보 찾기 세션 제거
            session.setAttribute("find_user_email", null);
            session.setAttribute("find_user_id", null);
            return "redirect:/wrongPath";
        }
        model.addAttribute("user_id", user_id);

        // 페이지에 아이디 값 올려주고 세션정보 삭제
        session.setAttribute("found_user_id", null);

        return "findIdFound";
    }

    @RequestMapping("/find/pw")
    public String findPwPage() {
        return "findPw";
    }

    @RequestMapping("/find/pw/email")
    public String findPwByEmailPage() {
        return "findPwByEmail";
    }

    @RequestMapping("/find/result/pw")
    public String pwResetPage(HttpServletRequest request) {

        HttpSession session = request.getSession();
        String user_id = (String) session.getAttribute("find_user_id");
        if (user_id == null || user_id.equals("")) {
            session.setAttribute("find_user_email", null);
            session.setAttribute("find_user_id", null);
            return "redirect:/wrongPath";
        }

        return "findPwReset";
    }

    @ResponseBody
    @PostMapping("/find/pw/requestReset")
    public Map<String, Object> resetUser_Pw(HttpServletRequest request, @RequestBody User_InfoDto user_InfoDto) {
        Map<String, Object> result = new HashMap<>();
        int status = 0;

        HttpSession session = request.getSession();

        String user_id = (String) session.getAttribute("find_user_id");

        // 아이디 찾기 세션에 아이디가 없을 경우
        if (user_id == null || user_id.equals("")) {
            status = -1;
            result.put("status", status);
            return result;
        }

        user_InfoDto.setUser_id(user_id);
        // DB 변경
        int updated = loginService.updateUser_Pw(user_InfoDto);
        // DB Update Fail
        if (updated != 1) {
            status = -2;
            result.put("status", status);
            return result;
        } else if (updated == 1) {
            status = 1;
        }
        result.put("status", status);

        // 비밀번호 변경 후 세션정보 삭제
        session.setAttribute("find_user_email", null);
        session.setAttribute("find_user_id", null);
        session.invalidate();

        return result;
    }

}
