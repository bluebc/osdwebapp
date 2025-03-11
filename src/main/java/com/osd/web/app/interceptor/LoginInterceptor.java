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

        if (loginUser == null) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("autoLogin".equals(cookie.getName())) {
                        String userName = cookie.getValue();
                        session.setAttribute("loginUser", userName);
                        break;
                    }
                }
            }
        }

        return true; // 아무 동작 없이 요청을 그대로 진행
    }
}
