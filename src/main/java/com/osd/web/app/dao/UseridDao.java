package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.UseridDto;

@Repository
@Mapper
public class UseridDao {

    @Autowired
    private SqlSession session;

    public UseridDto getUserid(){
        return session.selectOne("Userid.getUserid");
    }

    public List<UseridDto> getUseridAll(){
        return session.selectList("Userid.getUseridAll");
    }
    
}
