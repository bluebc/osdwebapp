<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>

<script src = "${pageContext.request.contextPath}/js/findLoginInfo.js"></script>
</head>
<body>

<h3>find pw Reset</h3>

<div id = "section">
        <input type = "text" id = "newPassword" placeholder = "비밀번호">
        <br>
        <input type = "text" id = "newPassword2" placeholder = "비밀번호(확인)">
        <br>
        <input type = "button" value = "비밀번호 변경" onclick = "requestResetPassword()">
</div>


</body>
