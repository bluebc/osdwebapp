package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Shop_Item_ProductDto;

@Repository
public class Shop_Item_ProductDao {
    @Autowired
    private SqlSession session;

    public List<Shop_Item_ProductDto> selectAll() {
        return session.selectList("Shop_Item_Product.selectAll");
    }

    public int insert(Shop_Item_ProductDto shop_Item_ProductDto) {
        return session.insert("Shop_Item_Product.insert", shop_Item_ProductDto);
    }

    public List<Shop_Item_ProductDto> selectByItem(String item_id) {
        return session.selectList("Shop_Item_Product.selectByItem", item_id);
    }

    public int updateProductAndQuantity(Shop_Item_ProductDto shop_Item_ProductDto) {
        return session.update("Shop_Item_Product.updateProductAndQuantity", shop_Item_ProductDto);
    }

    public int deleteByNotInId(List<Integer> list) {
        return session.delete("Shop_Item_Product.deleteByNotInId", list);
    }

    public int deleteById(Shop_Item_ProductDto shop_Item_ProductDto) {
        return session.delete("Shop_Item_Product.deleteById", shop_Item_ProductDto);
    }
}
