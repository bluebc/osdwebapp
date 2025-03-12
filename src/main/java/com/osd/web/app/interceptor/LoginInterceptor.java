package com.osd.web.app.interceptor;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.osd.web.app.dto.Auto_Login_TokenDto;
import com.osd.web.app.service.LoginService;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Autowired
    private LoginService loginService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        System.out.println("LoginInterceptor: 요청이 들어옴 - " + request.getRequestURI());

        HttpSession session = request.getSession();
        Object loginUser = session.getAttribute("loginUser");

        // 자동로그인
        if (loginUser == null) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                String user_id = "";
                String token = "";
                for (Cookie cookie : cookies) {
                    if ("autoLoginId".equals(cookie.getName())) {
                        user_id = cookie.getValue();
                        // session.setAttribute("loginUser", user_id);
                        // break;
                    }
                    if ("autoLoginToken".equals(cookie.getName())) {
                        token = cookie.getValue();
                    }
                }
                // DB 에서 토큰 확인작업
                // 1) 쿠키 확인
                if (!user_id.equals("") && !token.equals("")) {
                    Auto_Login_TokenDto auto_Login_TokenDto = new Auto_Login_TokenDto();
                    auto_Login_TokenDto.setToken(token);
                    auto_Login_TokenDto.setUser_id(user_id);
                    // 2) 쿠키 값 DB 확인
                    Auto_Login_TokenDto auto_Login_TokenFromDb = loginService.getAuto_Login_Token(auto_Login_TokenDto);
                    if (auto_Login_TokenFromDb.getToken() != null) {
                        // 3) 토큰 만료 확인
                        if (auto_Login_TokenFromDb.getExpiry_date().isAfter(LocalDateTime.now())) {
                            // 4) 세션
                            session.setAttribute("loginUser", auto_Login_TokenFromDb.getUser_id());
                        } else {
                            loginService.deleteAuto_login_TokenByTokenAndId(auto_Login_TokenDto);
                        }

                    }
                }
            }
        }

        // 로그아웃 요청 시 쿠키 삭제 -- 컨트롤러로 이관
        // if (request.getRequestURI().equals("/logout")) { // 로그아웃 URL 확인
        // // 쿠키 삭제
        // Cookie autoLoginIdCookie = new Cookie("autoLoginId", null);
        // autoLoginIdCookie.setMaxAge(0); // 쿠키의 유효 시간을 0으로 설정하여 삭제
        // autoLoginIdCookie.setPath("/"); // 사이트 전체에서 쿠키를 삭제

        // Cookie autoLoginIdToken = new Cookie("autoLoginToken", null);
        // autoLoginIdToken.setMaxAge(0);
        // autoLoginIdToken.setPath("/");

        // response.addCookie(autoLoginIdCookie);
        // response.addCookie(autoLoginIdToken);
        // }

        return true; // 아무 동작 없이 요청을 그대로 진행
    }
}
