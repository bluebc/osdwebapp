package com.osd.web.app.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Auth_EmailDto;

@Repository
public class Auth_EmailDao {

    @Autowired
    private SqlSession session;

    public int insert(Auth_EmailDto auth_EmailDto) {
        return session.insert("Auth_Email.insert", auth_EmailDto);
    }

    public Auth_EmailDto selectByEmailAndCode(Auth_EmailDto auth_EmailDto) {
        return session.selectOne("Auth_Email.selectByEmailAndCode", auth_EmailDto);
    }

    public Auth_EmailDto selectByEmail(Auth_EmailDto auth_EmailDto) {
        return session.selectOne("Auth_Email.selectByEmail", auth_EmailDto);
    }

    public int updateConfirmed(Auth_EmailDto auth_EmailDto){
        return session.update("Auth_Email.updateConfirmed", auth_EmailDto);
    }

}
