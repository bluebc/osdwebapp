package com.osd.web.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.osd.web.app.dto.FeedDto;
import com.osd.web.app.service.FeedService;

@Controller
public class FeedController {

    @Autowired
    private FeedService feedService;

    @RequestMapping("/feedlist")
    public String feedListPage(Model model) {
        List<FeedDto> list = feedService.getAllFeed();
FeedDto feedDto = list.get(0);
        model.addAttribute("feed", feedDto);
        return "feedlist";
    }
}
