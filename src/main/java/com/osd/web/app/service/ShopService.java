package com.osd.web.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Shop_CategoryDao;
import com.osd.web.app.dao.Shop_GroupDao;
import com.osd.web.app.dao.Shop_ItemDao;
import com.osd.web.app.dao.Shop_ProductDao;
import com.osd.web.app.dto.Shop_CategoryDto;
import com.osd.web.app.dto.Shop_GroupDto;
import com.osd.web.app.dto.Shop_ItemDto;
import com.osd.web.app.dto.Shop_ProductDto;

@Service
public class ShopService {

    @Autowired
    private Shop_ProductDao shop_ProductDao;

    @Autowired
    private Shop_ItemDao shop_ItemDao;

    @Autowired
    private Shop_GroupDao shop_GroupDao;

    @Autowired
    private Shop_CategoryDao shop_CategoryDao;

    public List<Shop_ProductDto> getProductListAll() {
        return shop_ProductDao.selectAll();
    }

    public int insertProduct(Shop_ProductDto shop_ProductDto) {
        return shop_ProductDao.insert(shop_ProductDto);
    }

    public int insertProduct(List<Shop_ProductDto> list) {
        int result = 0;
        for (int i = 0; i < list.size(); i++) {
            Shop_ProductDto shop_ProductDto = list.get(i);
            result += insertProduct(shop_ProductDto);
        }
        return result;
    }

    public List<Shop_ItemDto> getItemListAll() {
        return shop_ItemDao.selectAll();
    }

    public List<Shop_GroupDto> getGroupListAll() {
        return shop_GroupDao.selectAll();
    }

    public List<Shop_CategoryDto> getCategoryListAll() {
        return shop_CategoryDao.selectAll();
    }

}
