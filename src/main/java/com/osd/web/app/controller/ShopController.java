package com.osd.web.app.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.Shop_CategoryDto;
import com.osd.web.app.dto.Shop_GroupDto;
import com.osd.web.app.dto.Shop_ItemDto;
import com.osd.web.app.dto.Shop_Item_ProductDto;
import com.osd.web.app.dto.Shop_ProductDto;
import com.osd.web.app.service.ShopService;

import lombok.val;

@RequestMapping("/shop")
@Controller
public class ShopController {

    @Autowired
    private ShopService shopService;

    @RequestMapping("/")
    public String shopPage() {
        return "redirect:/shop/list";
    }

    @RequestMapping("")
    public String shopPage2() {
        return "redirect:/shop/";
    }

    @RequestMapping("/list")
    public String shopListPage() {
        return "shopList";
    }

    @RequestMapping("/admin")
    public String shopAdminPage() {
        return "shopAdmin";
    }

    @RequestMapping("/admin/edit/item")
    public String shopAdminEditItemPage() {
        return "shopAdminEditItem";
    }

    @ResponseBody
    @PostMapping("/admin/getProductListAll")
    public Map<String, Object> getProductListAll() {
        Map<String, Object> resultMap = new HashMap<>();

        List<Shop_ProductDto> list = shopService.getProductListAll();
        resultMap.put("list", list);
        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/insertProductList")
    public Map<String, Object> insertProductList(@RequestBody List<Shop_ProductDto> list) {

        Map<String, Object> resultMap = new HashMap<>();
        int result = 0;

        int inserted = shopService.insertProduct(list);

        resultMap.put("inserted", inserted);
        resultMap.put("result", result);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/getItemListAll")
    public Map<String, Object> getItemListAll() {
        Map<String, Object> resultMap = new HashMap<>();

        List<Shop_ItemDto> list = shopService.getItemListAll();
        resultMap.put("list", list);
        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/insertItemList")
    public Map<String, Object> insertItemList(@RequestBody List<Shop_ItemDto> list) {

        System.out.println(list);

        Map<String, Object> resultMap = new HashMap<>();
        int result = 0;

        int inserted = shopService.insertItem(list);

        resultMap.put("inserted", inserted);
        resultMap.put("result", result);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/getGroupListAll")
    public Map<String, Object> getGroupListAll() {
        Map<String, Object> resultMap = new HashMap<>();

        List<Shop_GroupDto> list = shopService.getGroupListAll();
        resultMap.put("list", list);
        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/getCategoryListAll")
    public Map<String, Object> getCategoryListAll() {
        Map<String, Object> resultMap = new HashMap<>();

        List<Shop_CategoryDto> list = shopService.getCategoryListAll();
        resultMap.put("list", list);
        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/insertItemProductList")
    public Map<String, Object> insertItemProductList(@RequestBody List<Shop_Item_ProductDto> list) {
        Map<String, Object> resultMap = new HashMap<>();

        int status = 0;

        if (list == null) {
            status = -101;
            resultMap.put("status", status);
            return resultMap;
        }

        String item_id = list.get(0).getItem_id();

        for (int i = 0; i < list.size(); i++) {
            if (!item_id.equals(list.get(i).getItem_id())) {
                status = -102;
                resultMap.put("status", status);
                return resultMap;
            }
        }

        int inserted = shopService.insertItemProduct(list);

        List<Shop_Item_ProductDto> itemProductList = shopService.getItemProductByItem(item_id);

        resultMap.put("inserted", inserted);
        resultMap.put("status", status);
        resultMap.put("list", itemProductList);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/applyItemProductModifies")
    public Map<String, Object> applyItemProductModifies(@RequestBody List<Shop_Item_ProductDto> list) {
        Map<String, Object> resultMap = new HashMap<>();

        int status = 0;

        if (list == null || list.size() == 0) {
            status = -101;
            resultMap.put("status", status);
            return resultMap;
        }

        String item_id = list.get(0).getItem_id();

        for (int i = 0; i < list.size(); i++) {
            if (!item_id.equals(list.get(i).getItem_id())) {
                status = -102;
                resultMap.put("status", status);
                return resultMap;
            }
        }
        List<Integer> itemProductIds = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getItem_product_id() == 0) {
                continue;
            }
            itemProductIds.add(list.get(i).getItem_product_id());
        }
        shopService.deleteItemProductByNotInId(itemProductIds);

        int updated = 0;
        int inserted = 0;

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getItem_product_id() == 0) {
                inserted += shopService.insertItemProduct(list.get(i));
                continue;
            }
            updated += shopService.updateItemProductProductAndQuantity(list.get(i));
        }

        List<Shop_Item_ProductDto> itemProductList = shopService.getItemProductByItem(item_id);

        resultMap.put("updated", updated);
        resultMap.put("inserted", inserted);
        resultMap.put("status", status);
        resultMap.put("list", itemProductList);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/updateItem")
    public Map<String, Object> updateItem(@RequestBody Shop_ItemDto shop_ItemDto) {

        Map<String, Object> resultMap = new HashMap<>();
        int result = 0;

        int updated = shopService.updateItem(shop_ItemDto);

        resultMap.put("updated", updated);
        resultMap.put("result", result);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/deleteItemProductList")
    public Map<String, Object> deleteItemProductById(@RequestBody List<Shop_Item_ProductDto> list) {

        Map<String, Object> resultMap = new HashMap<>();
        int result = 0;

        int deleted = shopService.deleteItemProductById(list);

        resultMap.put("deleted", deleted);
        resultMap.put("result", result);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/deleteItem")
    public Map<String, Object> deleteItem(@RequestBody Shop_ItemDto shop_ItemDto) {

        Map<String, Object> resultMap = new HashMap<>();
        int result = 0;

        int deleted = shopService.deleteItemById(shop_ItemDto);

        resultMap.put("deleted", deleted);
        resultMap.put("result", result);

        return resultMap;
    }

}
