<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>

<script src = "${pageContext.request.contextPath}/js/findLoginInfo.js"></script>
</head>
<body>

<h3>find id by email</h3>

<div id = "section">
        <input type = "text", id = "user_email" placeholder = "email">
        <br>
        <input type = "button" value = "인증 이메일 요청" onclick = "requestAuthMail()">
</div>


</body>
