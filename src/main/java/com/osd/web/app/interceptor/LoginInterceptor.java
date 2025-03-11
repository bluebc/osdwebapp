package com.osd.web.app.interceptor;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor {

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
                for (Cookie cookie : cookies) {
                    if ("autoLoginId".equals(cookie.getName())) {
                        String userId = cookie.getValue();
                        session.setAttribute("loginUser", userId);
                        break;
                    }
                }
            }
        }

        // 로그아웃 요청 시 쿠키 삭제
        if (request.getRequestURI().equals("/logout")) { // 로그아웃 URL 확인
            // 쿠키 삭제
            Cookie autoLoginIdCookie = new Cookie("autoLoginId", null);
            autoLoginIdCookie.setMaxAge(0); // 쿠키의 유효 시간을 0으로 설정하여 삭제
            autoLoginIdCookie.setPath("/"); // 사이트 전체에서 쿠키를 삭제

            Cookie autoLoginIdToken = new Cookie("autoLoginToken", null);
            autoLoginIdToken.setMaxAge(0);
            autoLoginIdToken.setPath("/");

            response.addCookie(autoLoginIdCookie);
            response.addCookie(autoLoginIdToken);
        }

        return true; // 아무 동작 없이 요청을 그대로 진행
    }
}
