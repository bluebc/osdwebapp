<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>


<html>
    <head>
    <title>osdwebapp</title>
    
<script src = "js/login.js"></script>

    </head>
    <body>
        <h1>login</h1><br>
        
        <br>
        <input type = "text", id = "id" placeholder = "id">
        <br>

        <br>
        <input type = "text", id = "pw" placeholder = "pw">
        <br>

        <br>
        <input type = "button" value = "login" onclick = "login()">
        <br>

    </body>
</html>