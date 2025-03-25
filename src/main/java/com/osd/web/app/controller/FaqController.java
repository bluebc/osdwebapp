package com.osd.web.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.Faq_CategoryDto;
import com.osd.web.app.service.FaqService;

@Controller
public class FaqController {

    @Autowired
    private FaqService faqService;

    @RequestMapping("/faq")
    public String faqPage() {
        return "faq";
    }

    @ResponseBody
    @PostMapping("/getFaqCategory")
    public List<Faq_CategoryDto> getCategoryList() {
        List<Faq_CategoryDto> list = faqService.getCategoryList();
        return list;
    }

}