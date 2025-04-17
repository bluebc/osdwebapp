package com.osd.web.app.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.User_InfoDao;
import com.osd.web.app.dto.User_InfoDto;

@Service
public class User_InfoService {

    @Autowired
    private User_InfoDao user_InfoDao;

    public User_InfoDto getUser_InfoById(String user_id) {
        User_InfoDto user_InfoDto = new User_InfoDto();
        user_InfoDto.setUser_id(user_id);
        return getUser_InfoById(user_InfoDto);
    }
    public User_InfoDto getUser_InfoById(User_InfoDto user_InfoDto) {
        return user_InfoDao.getUser_InfoById(user_InfoDto);
    }


    public int updateUser_Info(User_InfoDto user_InfoDto) {
        int result = 0;

        LocalDateTime updateTime = LocalDateTime.now();
        user_InfoDto.setUser_updated_at(updateTime);

        result = user_InfoDao.updateUser_Info(user_InfoDto);

        return result;
    }

    public User_InfoDto getUserRoleById(String user_id){
        return user_InfoDao.selectRoleById(user_id);
    }


}
