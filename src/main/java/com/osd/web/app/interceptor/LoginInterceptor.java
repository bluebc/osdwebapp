package com.osd.web.app.interceptor;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.osd.web.app.dto.AutoLogin_InfoDto;
import com.osd.web.app.service.LoginService;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Autowired
    private LoginService loginService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // System.out.println("LoginInterceptor: 요청이 들어옴 - " + request.getRequestURI());

        HttpSession session = request.getSession();
        Object login_user_id = session.getAttribute("login_user_id");

        // 자동로그인
        if (login_user_id == null) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                String user_id = "";
                String autologin_token = "";
                for (Cookie cookie : cookies) {
                    if ("autoLoginId".equals(cookie.getName())) {
                        user_id = cookie.getValue();

                    }
                    if ("autoLoginToken".equals(cookie.getName())) {
                        autologin_token = cookie.getValue();
                    }
                }
                // DB 에서 토큰 확인작업
                // 1) 쿠키 확인
                if (!user_id.equals("") && !autologin_token.equals("")) {
                    AutoLogin_InfoDto autologin_InfoDto = new AutoLogin_InfoDto();
                    autologin_InfoDto.setAutoLogin_token(autologin_token);
                    autologin_InfoDto.setUser_id(user_id);
                    // 2) 쿠키 값 DB 확인
                    AutoLogin_InfoDto autoLogin_InfoFromDb = loginService.getAutoLogin_Info(autologin_InfoDto);
                    if (autoLogin_InfoFromDb != null) {

                        if (autoLogin_InfoFromDb.getAutoLogin_token() != null) {
                            // 3) 토큰 만료 확인
                            if (autoLogin_InfoFromDb.getAutoLogin_expiry().isAfter(LocalDateTime.now())) {
                                // 4) 세션
                                session.setAttribute("login_user_id", autoLogin_InfoFromDb.getUser_id());
                            } else {
                                loginService.deleteAuto_login_TokenByTokenAndId(autologin_InfoDto);
                            }

                        }
                    }
                }
            }
        }

        return true; // 아무 동작 없이 요청을 그대로 진행
    }
}
