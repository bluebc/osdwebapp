package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Shop_ItemDto;

@Repository
public class Shop_ItemDao {
    @Autowired
    private SqlSession session;

    public List<Shop_ItemDto> selectAll() {
        return session.selectList("Shop_Item.selectAll");
    }
}
