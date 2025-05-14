package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Shop_GroupDto;

@Repository
public class Shop_GroupDao {
    
    @Autowired
    private SqlSession session;

    public List<Shop_GroupDto> selectAll() {
        return session.selectList("Shop_Group.selectAll");
    }
}
