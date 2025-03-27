package com.osd.web.app.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class FindLoginInfoInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // System.out.println("FindLoginInfoInterceptor: 요청이 들어옴 - " + request.getRequestURI());

        HttpSession session = request.getSession();
        String find_user_email = (String) session.getAttribute("find_user_email");

        if (find_user_email == null || find_user_email.equals("")) {
            response.sendRedirect("/wrongPath");
            return false;
        }
        
        return true;
    }
}
