// package com.osd.web.app.interceptor;

// import org.springframework.stereotype.Component;
// import org.springframework.web.servlet.HandlerInterceptor;

// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import jakarta.servlet.http.HttpSession;

// @Component
// public class LoginCheckInterceptor implements HandlerInterceptor {

//     @Override
//     public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//             throws Exception {

//         String requestURI = request.getRequestURI();

//         if (requestURI == null || requestURI.equals("")) {
//             requestURI = "index";
//         }

//         HttpSession session = request.getSession();

//         if (session == null || session.getAttribute("osdsession") == null) {
//             response.sendRedirect("/login?redirectURL=" + requestURI);
//             return false;
//         }
//         return true;

//     }

// }
