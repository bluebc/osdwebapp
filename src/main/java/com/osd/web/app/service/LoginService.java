package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Auto_Login_TokenDao;
import com.osd.web.app.dao.User_InfoDao;
import com.osd.web.app.dto.Auto_Login_TokenDto;
import com.osd.web.app.dto.User_InfoDto;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Service
public class LoginService {

    private static final String loginSessionName = "loginUser";

    @Autowired
    private User_InfoDao user_InfoDao;

    @Autowired
    private Auto_Login_TokenDao auto_Login_TokenDao;

    // 세션 생성
    public void setSession(HttpServletRequest request, String id) {
        HttpSession session = request.getSession(true);
        // 10분
        // session.setMaxInactiveInterval(10 * 60);
        // 1분
        session.setMaxInactiveInterval(1 * 60);
        session.setAttribute(loginSessionName, id);

    }

    public Map<String, Object> getSession(HttpServletRequest request) {
        Map<String, Object> sessionInfo = new HashMap<>();
        HttpSession session = request.getSession();

        String loginId = (String) session.getAttribute(loginSessionName);
        boolean isLoggedIn = false;
        if (loginId != null && !loginId.equals("")) {
            isLoggedIn = true;
        }
        sessionInfo.put("id", loginId);
        sessionInfo.put("isLoggedIn", isLoggedIn);
        return sessionInfo;
    }

    public Cookie setCookie(String cookieName, String cookieValue) {

        Cookie cookie = new Cookie(cookieName, cookieValue);
        // cookie.setMaxAge(7*24*60*60); // 7일간 유지
        cookie.setPath("/"); // 모든 경로에서 사용 가능
        cookie.setMaxAge(60); // 1분

        // 보안을 강화하는 설정
        cookie.setSecure(true); // HTTPS에서만 쿠키 전송 (서버가 HTTPS 연결일 때만)
        cookie.setHttpOnly(true); // JavaScript에서 쿠키를 접근할 수 없도록 설정
        // cookie.setSameSite("Strict"); // SameSite 설정 (크로스사이트 요청에서 쿠키를 전송하지 않음)
        
        return cookie;
    }

    // 토큰
    public int insertAutoLoginToken(Auto_Login_TokenDto auto_Login_TokenDto){
        return auto_Login_TokenDao.insert(auto_Login_TokenDto);
    }

    public void invalidateSession(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.invalidate();
    }

    public int auth(User_InfoDto user_InfoDto) {
        int result = 0;
        User_InfoDto user_InfoFromDb = user_InfoDao.getUser_InfoForAuth(user_InfoDto);

        if (user_InfoFromDb == null) {
            result = -1;
            return result;
        }
        if (!user_InfoDto.getUser_pw().equals(user_InfoFromDb.getUser_pw())) {
            result = -2;
            return result;
        }
        if (user_InfoDto.getUser_id().equals(user_InfoFromDb.getUser_id())
                && user_InfoDto.getUser_pw().equals(user_InfoFromDb.getUser_pw())) {
            result = 1;
        }

        return result;
    }

    public int insertUser_Info(User_InfoDto user_InfoDto) {
        int result = 0;

        if (user_InfoDao.existsUser_InfoById(user_InfoDto.getUser_id()) == 0) {
            result = user_InfoDao.insertUser_Info(user_InfoDto);
        } else if (user_InfoDao.existsUser_InfoById(user_InfoDto.getUser_id()) > 0) {
            result = -1;
        }
        return result;
    }

    public int deleteUser_Info(User_InfoDto user_InfoDto) {
        int result = 0;

        result = user_InfoDao.deleteUser_InfoByIdAndPw(user_InfoDto);

        return result;
    }

    public int updateUser_Pw(User_InfoDto user_InfoDto) {
        int result = 0;

        LocalDateTime updateTime = LocalDateTime.now();
        user_InfoDto.setUser_updated_at(updateTime);
        result = user_InfoDao.updateUser_Pw(user_InfoDto);

        return result;
    }

}
