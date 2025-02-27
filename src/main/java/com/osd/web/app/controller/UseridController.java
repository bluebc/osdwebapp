package com.osd.web.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.osd.web.app.dto.UseridDto;
import com.osd.web.app.service.UseridService;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class UseridController {

    @Autowired
    private  UseridService useridService;

    public UseridController(UseridService useridService){
        this.useridService = useridService;
    }

    @GetMapping("/Userid")
    public String getMethodName(Model model) {
        
        UseridDto dto = useridService.getUserid();

        dto.getId();

        System.out.println(dto.getId());

        model.addAttribute("userid", dto);

        return "Userid";

    }
    

}
