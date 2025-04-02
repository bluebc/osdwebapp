package com.osd.web.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/cunsult")
@Controller
public class CunsultBoardController {

    @RequestMapping("/write")
    public String cunsultWritePage() {
        return "cunsultWrite";
    }

    @RequestMapping("/list")
    public String cunsultListPage(){
        return "cunsultList";
    }

}
