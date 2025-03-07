<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>


<html>
    <head>
    <title>osdwebapp</title>
    


    </head>
    <body>
        <h1>changepw</h1><br>
        
        <br>
        <input type = "text", id = "user_id" placeholder = "아이디">
        <br>

        <br>
        <input type = "password", id = "user_pw_old" placeholder = "현재 비밀번호">
        <br>
        
        <br>
        <input type = "password", id = "user_pw_new" placeholder = "새 비밀번호">
        <br>

        <br>
        <input type = "password", id = "user_pw_new2" placeholder = "새 비밀번호(확인)">
        <br>

        <br>
        <input type = "button" value = "비밀번호 변경" onclick = "changeUser_pw()">
        <br>

    </body>
    <script src = "js/changepw.js"></script>
</html>