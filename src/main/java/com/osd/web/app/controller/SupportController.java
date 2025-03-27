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

import com.osd.web.app.dto.Faq_CategoryDto;
import com.osd.web.app.dto.Faq_ListDto;
import com.osd.web.app.service.FaqService;

@RequestMapping("/support")
@Controller
public class SupportController {

    @Autowired
    private FaqService faqService;

    @RequestMapping("")
    public String supportPage(){
        return "support";
    }


    @RequestMapping("/faq")
    public String faqPage() {
        return "supportFaq";
    }

    @RequestMapping("/qna")
    public String qnaPage() {
        return "supportQna";
    }

    @ResponseBody
    @PostMapping("/getFaqCategory")
    public List<Faq_CategoryDto> getCategoryList() {
        List<Faq_CategoryDto> list = faqService.getCategoryList();
        return list;
    }

    @ResponseBody
    @PostMapping("/getFaqListByCateIdAndKeyword")
    public List<Faq_ListDto> getFaqListByCateIdAndKeyword(@RequestBody Map<String, Object> parameterMap) {
        int cate_id = (int) parameterMap.get("cate_id");
        String keyword = (String) parameterMap.get("keyword");
        List<Faq_ListDto> list = faqService.getFaqListByCateIdAndKeyword(cate_id, keyword);
        return list;
    }

    @RequestMapping("/faq/write")
    public String faqWritePage() {
        return "faqWrite";
    }

    @ResponseBody
    @PostMapping("/faq/insertFaqList")
    public Map<String, Object> insertFaqList(@RequestBody Faq_ListDto faq_ListDto) {
        Map<String, Object> resultMap = new HashMap<>();
        int inserted = faqService.insertFaqList(faq_ListDto);
        resultMap.put("result", inserted);
        return resultMap;
    }


    

}