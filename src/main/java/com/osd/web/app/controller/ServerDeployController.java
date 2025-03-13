package com.osd.web.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.service.DeployService;



@Controller
public class ServerDeployController {
    @GetMapping("/Deploy")
    public String getMethodName(Model model) {
        
        return "Serverdeploy";

    }


    @ResponseBody
    @GetMapping("/Deploybat")
    public void deploy1() {
  
        DeployService.execute("a");
    
    }

    @GetMapping("/Deploybat2")
    public void deploy2() {
  
        DeployService.execute("b");
    
    }


}
