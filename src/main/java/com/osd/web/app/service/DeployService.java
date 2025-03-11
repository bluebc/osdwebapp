package com.osd.web.app.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

public class DeployService {
    public static void execute(String gb) {
	   String sBat = "";
	   String batDir = "C:\\Users\\Administrator\\Desktop\\TomcatDeploy";
	   String gubun = gb;
	   System.out.println(batDir);
	   try {
		   
		  if(gubun =="a"){
			sBat = batDir + File.separator + "0.All_Upload.bat";
		  }else if(gubun =="b"){
			sBat = batDir + File.separator + "0.All_Upload2.bat";
		  }
           
		   
		   Process p = Runtime.getRuntime().exec(sBat);  
		    
		   BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
		    String line = null;
		    
		    while ((line = br.readLine()) != null) {
		      System.out.println(line);
		    }
		  } catch (Exception e) {
		    System.err.println(e);
		  }

   }
}
