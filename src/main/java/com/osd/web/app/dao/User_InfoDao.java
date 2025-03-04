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

    public User_InfoDto getUser_Info(String user_Id){
        return session.selectOne("User_Info.getUser_Info",user_Id);

    }

    public List<User_InfoDto> getUser_InfoAll(){
        return session.selectList("User_Info.getUser_InfoAll");
        
    }
}
