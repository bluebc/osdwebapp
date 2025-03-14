package com.osd.web.app.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.AutoLogin_InfoDto;

@Repository
public class AutoLogin_InfoDao {

    @Autowired
    private SqlSession session;

    public int insert(AutoLogin_InfoDto autoLogin_InfoDto) {
        return session.insert("AutoLogin_Info.insert", autoLogin_InfoDto);
    }
    public AutoLogin_InfoDto selectByTokenAndId(AutoLogin_InfoDto autoLogin_InfoDto) {
        return session.selectOne("AutoLogin_Info.selectByTokenAndId", autoLogin_InfoDto);
    }
    public int deleteByTokenAndId(AutoLogin_InfoDto autoLogin_InfoDto){
        return session.delete("AutoLogin_Info.deleteByTokenAndId", autoLogin_InfoDto);
    }
    public int deleteById(AutoLogin_InfoDto autoLogin_InfoDto){
        return session.delete("AutoLogin_Info.deleteById", autoLogin_InfoDto);
    }

}
