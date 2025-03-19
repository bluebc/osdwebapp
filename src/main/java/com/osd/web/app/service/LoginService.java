package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Auth_EmailDao;
import com.osd.web.app.dao.AutoLogin_InfoDao;
import com.osd.web.app.dao.User_InfoDao;
import com.osd.web.app.dto.Auth_EmailDto;
import com.osd.web.app.dto.AutoLogin_InfoDto;
import com.osd.web.app.dto.User_InfoDto;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class LoginService {

    // 세션_로그인 정보
    private static final String loginSessionName = "login_user_id";

    @Autowired
    private User_InfoDao user_InfoDao;

    @Autowired
    private AutoLogin_InfoDao autoLogin_InfoDao;

    @Autowired
    private Auth_EmailDao auth_EmailDao;

    // 세션 생성
    public void setLoginSession(HttpServletRequest request, String id) {
        HttpSession session = request.getSession(true);
        // 10분
        session.setMaxInactiveInterval(10 * 60);
        // 1분
        // session.setMaxInactiveInterval(1 * 60);
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
        // cookie.setMaxAge(60); // 1분
        cookie.setMaxAge(10*60); // 10분

        // 보안을 강화하는 설정
        cookie.setSecure(true); // HTTPS에서만 쿠키 전송 (서버가 HTTPS 연결일 때만)
        cookie.setHttpOnly(true); // JavaScript에서 쿠키를 접근할 수 없도록 설정
        // cookie.setSameSite("Strict"); // SameSite 설정 (크로스사이트 요청에서 쿠키를 전송하지 않음)

        return cookie;
    }

    // 자동로그인 토큰 DB in
    public int insertAutoLogin_info(AutoLogin_InfoDto autoLogin_InfoDto) {
        return autoLogin_InfoDao.insert(autoLogin_InfoDto);
    }

    // 자동로그인 토큰 DB out
    public AutoLogin_InfoDto getAutoLogin_Info(AutoLogin_InfoDto autoLogin_InfoDto) {
        return autoLogin_InfoDao.selectByTokenAndId(autoLogin_InfoDto);
    }

    // 자동로그인 토큰 삭제 (로그아웃)
    public int deleteAuto_login_TokenByTokenAndId(AutoLogin_InfoDto autoLogin_InfoDto) {
        return autoLogin_InfoDao.deleteByTokenAndId(autoLogin_InfoDto);
    }

    // 자동로그인 토큰 삭제 (로그인)
    public int deleteAuto_login_TokenById(AutoLogin_InfoDto autoLogin_InfoDto) {
        return autoLogin_InfoDao.deleteById(autoLogin_InfoDto);
    }

    // 세션 종료
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

    public int updateUser_Pw(User_InfoDto user_InfoDto) {
        int result = 0;

        LocalDateTime updateTime = LocalDateTime.now();
        user_InfoDto.setUser_updated_at(updateTime);
        result = user_InfoDao.updateUser_Pw(user_InfoDto);

        return result;
    }
    
    public Auth_EmailDto setAuth_Email(Auth_EmailDto auth_EmailDto) {

        Random random = new Random();
        int code = random.nextInt(100000000); // 0 ~ 99999999 범위의 숫자 생성
        String auth_code = String.format("%08d", code); // 8자리로 패딩 (앞에 0 포함 가능)
        auth_EmailDto.setAuth_code(auth_code);

        LocalDateTime auth_expiry = LocalDateTime.now().plusMinutes(30);
        auth_EmailDto.setAuth_expiry(auth_expiry);

        int result = auth_EmailDao.insert(auth_EmailDto);
        if (result != 1) {
            auth_EmailDto = null;
        }

        return auth_EmailDto;
    }

    public Auth_EmailDto getAuth_Email(Auth_EmailDto auth_EmailDto) {

        Auth_EmailDto auth_EmailFromDb = auth_EmailDao.selectByEmailAndCode(auth_EmailDto);

        return auth_EmailFromDb;

    }

    public User_InfoDto getUser_IdByEmail(User_InfoDto user_InfoDto) {

        return user_InfoDao.getUser_IdByEmail(user_InfoDto);
    }

}
