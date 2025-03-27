package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.User_TermDto;

@Repository
public class User_TermDao {

    @Autowired
    private SqlSession session;

    public User_TermDto getUser_Term(String user_Id) {
        return session.selectOne("User_Term.getUser_Term", user_Id);

    }

    public List<User_TermDto> getUser_TermAll() {
        return session.selectList("User_Term.getUser_TermAll");

    }

    public int insertUser_Term(User_TermDto user_TermDto) {
        return session.insert("User_Term.insert", user_TermDto);
    }

     
    public int insertMuitiUser_Term(List<User_TermDto> user_TermDto) {
        
        return session.insert("User_Term.Multiinsert", user_TermDto);
    }
        
}