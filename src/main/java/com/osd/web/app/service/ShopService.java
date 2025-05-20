package com.osd.web.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Shop_CategoryDao;
import com.osd.web.app.dao.Shop_GroupDao;
import com.osd.web.app.dao.Shop_ItemDao;
import com.osd.web.app.dao.Shop_Item_ProductDao;
import com.osd.web.app.dao.Shop_ProductDao;
import com.osd.web.app.dto.Shop_CategoryDto;
import com.osd.web.app.dto.Shop_GroupDto;
import com.osd.web.app.dto.Shop_ItemDto;
import com.osd.web.app.dto.Shop_Item_ProductDto;
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

    @Autowired
    private Shop_Item_ProductDao shop_Item_ProductDao;

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

    public int insertItem(Shop_ItemDto shop_ItemDto) {
        return shop_ItemDao.insert(shop_ItemDto);

    }

    public int insertItem(List<Shop_ItemDto> list) {
        int result = 0;
        for (int i = 0; i < list.size(); i++) {
            Shop_ItemDto shop_ItemDto = list.get(i);
            result += insertItem(shop_ItemDto);
        }
        return result;
    }

    public int updateItem(Shop_ItemDto shop_ItemDto){
        return shop_ItemDao.update(shop_ItemDto);
    }

    public List<Shop_GroupDto> getGroupListAll() {
        return shop_GroupDao.selectAll();
    }

    public List<Shop_CategoryDto> getCategoryListAll() {
        return shop_CategoryDao.selectAll();
    }

    public int insertItemProduct(Shop_Item_ProductDto shop_Item_ProductDto) {
        return shop_Item_ProductDao.insert(shop_Item_ProductDto);
    }

    public int insertItemProduct(List<Shop_Item_ProductDto> list) {
        int result = 0;
        for (int i = 0; i < list.size(); i++) {
            Shop_Item_ProductDto shop_Item_ProductDto = list.get(i);
            result += insertItemProduct(shop_Item_ProductDto);
        }
        return result;
    }

    public List<Shop_Item_ProductDto> getItemProductByItem(String item_id) {
        return shop_Item_ProductDao.selectByItem(item_id);
    }

    public int updateItemProductProductAndQuantity(Shop_Item_ProductDto shop_Item_ProductDto){
        return shop_Item_ProductDao.updateProductAndQuantity(shop_Item_ProductDto);
    }
    
    public int deleteItemProductByNotInId(List<Integer> list){
        return shop_Item_ProductDao.deleteByNotInId(list);
    }

}
