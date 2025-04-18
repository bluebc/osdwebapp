<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">

<head>

<script src ="${pageContext.request.contextPath}/js/userInfo.js"></script>


</head>
<body>

사진 업로드 후 확인

id:<span id = "user_id">${user_info.user_id}</span>

<img id="preview" style="max-width: 300px; display: block;" src = "/img/user/${user_info.user_img}">

<input type = "button" value = "수정페이지로 이동" onclick = "goUserInfoUpdate()">

</body>
</html>