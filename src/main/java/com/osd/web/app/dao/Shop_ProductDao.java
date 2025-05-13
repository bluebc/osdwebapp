package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Shop_ProductDto;

@Repository
public class Shop_ProductDao {

    @Autowired
    private SqlSession session;

    public List<Shop_ProductDto> selectAll() {
        return session.selectList("Shop_Product.selectAll");
    }

    public int insert(Shop_ProductDto shop_ProductDto){
        return session.insert("Shop_Product.insert", shop_ProductDto);
    }
}
