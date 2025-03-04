package com.osd.web.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.UseridDao;
import com.osd.web.app.dto.UseridDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class LoginService {

    @Autowired
    private UseridDao useridDao;

    // 세션 생성
    public void setSession(HttpServletRequest request, String id) {
        HttpSession session = request.getSession(true);
        // 10분
        // session.setMaxInactiveInterval(10 * 60);
        session.setAttribute("springsession", id);
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

}
