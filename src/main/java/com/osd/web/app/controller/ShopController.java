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

        int inserted = shopService.insertItemProduct(list);

        String item_id = list.get(0).getItem_id();

        for (int i = 0; i < list.size(); i++) {
            if (!item_id.equals(list.get(i).getItem_id())) {
                status = -102;
                resultMap.put("status", status);
                return resultMap;
            }
        }

        List<Shop_Item_ProductDto> itemProductList = shopService.getItemProductByItem(item_id);

        resultMap.put("status", status);
        resultMap.put("list", itemProductList);

        return resultMap;
    }

}
