package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.User_InfoDto;

@Repository
public class User_InfoDao {

    @Autowired
    private SqlSession session;

    public User_InfoDto getUser_Info(String user_Id) {
        return session.selectOne("User_Info.getUser_Info", user_Id);

    }

    public List<User_InfoDto> getUser_InfoAll() {
        return session.selectList("User_Info.getUser_InfoAll");

    }

    public int existsById(String user_id) {
        return session.selectOne("User_Info.existsById", user_id);
    }

    public int insert(User_InfoDto user_InfoDto) {
        return session.insert("User_Info.insert", user_InfoDto);
    }

    public User_InfoDto getUser_InfoById(User_InfoDto user_InfoDto) {
        return session.selectOne("User_Info.getUser_InfoById", user_InfoDto);
    }

    public int deleteUser_InfoByIdAndPw(User_InfoDto user_InfoDto) {
        return session.delete("User_Info.deleteUser_InfoByIdAndPw", user_InfoDto);
    }

}
