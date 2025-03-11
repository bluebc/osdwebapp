<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>


<html>
    <head>
    <title>osdwebapp</title>
    


    </head>
    <body>
        <h1>logins</h1><br>
        
        <br>
        <input type = "text", id = "user_id" placeholder = "아이디">
        <br>

        <br>
        <input type = "text", id = "user_pw" placeholder = "비밀번호">
        <br>

        <br>
        <input type = "button" value = "login" onclick = "login()">
        <br>

    </body>
    <script src = "js/login.js"></script>
</html>