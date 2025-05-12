package com.osd.web.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/shop")
@Controller
public class ShopController {

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

}
