package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Community_TypeDto;

@Repository
public class Community_TypeDao {

    @Autowired
    private SqlSession session;

    public List<Community_TypeDto> selectAll() {
        return session.selectList("Community_Type.selectAll");
    }

}
