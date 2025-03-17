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
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Service
public class SignupService {


    @Autowired
    private User_InfoDao user_InfoDao;

    
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

    
