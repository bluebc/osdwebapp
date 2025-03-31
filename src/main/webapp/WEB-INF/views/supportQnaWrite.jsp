<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
<title>오생단</title>
<script src = "${pageContext.request.contextPath}/js/supportQnaWrite.js"></script>
</head>
<body>
<h3>QNA Write</h3>


<br>

작성자 <input type = "text" id = "user_id" disabled = "true" value = "${user_id}">
<br>
제목 <input type = "text" id = "post_subject">
<br>
<br>
내용
<br>
<textarea id = "post_content"></textarea>
<br>
<br>
<input type = "button" value = "작성 완료" onclick = "posting()">
<input type = "button" value = "취소" onclick = "cancelPosting()">