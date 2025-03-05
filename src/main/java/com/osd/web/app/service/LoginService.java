package com.osd.web.app.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.User_InfoDao;
import com.osd.web.app.dto.User_InfoDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class LoginService {

    @Autowired
    private User_InfoDao user_InfoDao;

    // 세션 생성
    public void setSession(HttpServletRequest request, String id) {
        HttpSession session = request.getSession(true);
        // 10분
        // session.setMaxInactiveInterval(10 * 60);
        // 1분
        session.setMaxInactiveInterval(1 * 60);
        session.setAttribute("osdsession", id);

    }

    public Map<String, Object> getSession(HttpServletRequest request){
        Map<String, Object> sessionInfo = new HashMap<>();
        HttpSession session = request.getSession();

        sessionInfo.put("id", session.getAttribute("osdsession"));
        return sessionInfo;
    }

    public int auth(User_InfoDto user_InfoDto) {
        int result = 0;
        User_InfoDto user_InfoFromDb = user_InfoDao.getUser_InfoById(user_InfoDto);

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

    public int insert(User_InfoDto user_InfoDto) {
        int result = 0;

        if (user_InfoDao.existsById(user_InfoDto.getUser_id()) == 0) {
            result = user_InfoDao.insert(user_InfoDto);
        } else if (user_InfoDao.existsById(user_InfoDto.getUser_id()) > 0) {
            result = -1;
        }
        return result;
    }

}
