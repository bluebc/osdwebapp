<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">

<head>

<script src ="${pageContext.request.contextPath}/js/userInfoUpdate.js"></script>

</head>
<body>

사진 업로드 테스트

<div>

id:<span id = "user_id">${user_info.user_id}</span>
<br>




</div>


<div>

<%-- 
                        <label for="file">이미지찾기</label>
                        <input type="file" id="file" accept="image/*"> --%>


<input type="file" id="uploadImage" accept="image/*">
<img id="preview" style="max-width: 300px; display: block;" src = "/img/user/${user_info.user_img}">


</div>

<input type = "button" value = "적용" onclick = "applyUpdate()">


</body>
</html>