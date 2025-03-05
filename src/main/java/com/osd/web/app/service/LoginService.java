package com.osd.web.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.User_InfoDao;
import com.osd.web.app.dao.UseridDao;
import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.dto.UseridDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class LoginService {

    @Autowired
    private UseridDao useridDao;

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

    public int auth(UseridDto useridDto) {
        int result = 0;
        UseridDto useridDtoFromDb = useridDao.getUseridById(useridDto);

        if (useridDtoFromDb == null) {
            result = -1;
            return result;
        }
        if (!useridDto.getPassword().equals(useridDtoFromDb.getPassword())) {
            result = -2;
            return result;
        }
        if (useridDto.getId().equals(useridDtoFromDb.getId())
                && useridDto.getPassword().equals(useridDtoFromDb.getPassword())) {
            result = 1;
        }

        return result;
    }

    public int insert(User_InfoDto user_InfoDto){
        int result = 0;

        if (user_InfoDao.existsById(user_InfoDto.getUser_id()) == 0) {
            result = user_InfoDao.insert(user_InfoDto);
        } else if (user_InfoDao.existsById(user_InfoDto.getUser_id()) > 0) {
            result = -1;
        }
        return result;
    }

}
