<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>


<html>
    <head>
    <title>osdwebapp</title>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <script>
        
        function fn_run(){
        
        const response = fetch("/Deploybat");
       }

       function fn_run2(){
        
        const response = fetch("/Deploybat2");
       }
        
        </script>
    </head>
    <body>
        <div id="div1"><h2>server deploy</h2></div>
        <input type = "button" value = "build" onclick = "fn_run()">
        <input type = "button" value = "deploy" onclick = "fn_run2()">
    </body>
</html>