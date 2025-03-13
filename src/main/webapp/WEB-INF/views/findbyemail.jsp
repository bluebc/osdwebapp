<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>
<script src = "${pageContext.request.contextPath}/js/lostandfound.js"></script>
</head>
<body>
<div id = "authSection">
<br>
<input type = "text" id = "emailAuthCode">
<br>
${user_email}
<br>

  <input type = "button" value = "확인" onclick = "emailAuth()">
</body>
