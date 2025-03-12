package com.osd.web.app.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Auto_Login_TokenDto;

@Repository
public class Auto_Login_TokenDao {

    @Autowired
    private SqlSession session;

    public int insert(Auto_Login_TokenDto auto_Login_TokenDto) {
        return session.insert("Auto_Login_Token.insert", auto_Login_TokenDto);
    }

    public Auto_Login_TokenDto selectByTokenAndId(Auto_Login_TokenDto auto_Login_TokenDto) {
        return session.selectOne("Auto_Login_Token.selectByTokenAndId", auto_Login_TokenDto);
    }
    public int deleteByTokenAndId(Auto_Login_TokenDto auto_Login_TokenDto){
        return session.delete("Auto_Login_Token.deleteByTokenAndId", auto_Login_TokenDto);
    }
    public int deleteById(Auto_Login_TokenDto auto_Login_TokenDto){
        return session.delete("Auto_Login_Token.deleteById", auto_Login_TokenDto);
    }

}
