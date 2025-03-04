package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.UseridDto;

@Repository
public class UseridDao {

    @Autowired
    private SqlSession session;

    public UseridDto getUseridById(UseridDto useridDto) {
        return session.selectOne("Userid.getUseridById", useridDto);
    }

    public UseridDto getUserid() {
        return session.selectOne("Userid.getUserid");
    }

    public List<UseridDto> getUseridAll() {
        return session.selectList("Userid.getUseridAll");
    }

    public int idCheck(UseridDto useridDto){
        return session.selectOne("Userid.idCheck", useridDto);
    }
    public int insert(UseridDto useridDto){
        return session.insert("Userid.insert", useridDto);
    }

}
