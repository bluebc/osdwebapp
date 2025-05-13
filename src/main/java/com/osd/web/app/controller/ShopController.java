package com.osd.web.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.Shop_ProductDto;
import com.osd.web.app.service.ShopService;

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

    @ResponseBody
    @PostMapping("/getProductListAll")
    public Map<String, Object> getProductListAll() {
        Map<String, Object> resultMap = new HashMap<>();

        List<Shop_ProductDto> list = shopService.getProductListAll();
        resultMap.put("list", list);
        return resultMap;
    }

    @ResponseBody
    @PostMapping("/admin/insertProductList")
    public Map<String, Object> insertProductList(@RequestBody List<Shop_ProductDto> list){

        Map<String, Object> resultMap = new HashMap<>();
        int result = 0;

        int inserted = shopService.insertProduct(list);

        resultMap.put("inserted", inserted);
        resultMap.put("result", result);
        
        return resultMap;
    }

    @RequestMapping("/admin/edit/item")
    public String shopAdminEditItemPage() {
        return "shopAdminEditItem";
    }


}
