package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.User_InfoDto;

@Repository
@Mapper
public class User_InfoDao {

    @Autowired
    private SqlSession session;

    public User_InfoDto getUSER_INFO(String USER_ID){
        return session.selectOne("USER_INFO.getUSER_INFO",USER_ID);

    }

    public List<User_InfoDto> getUSER_INFOAll(){
        return session.selectList("USEUR_INFO.getUSER_INFOAll");
        
    }
}
