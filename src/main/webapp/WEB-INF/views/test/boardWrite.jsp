<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>


<script src = "${pageContext.request.contextPath}/js/test/board.js"></script>
</head>
<body>

<h3>글 작성 테스트</h3>

분류 <input type = "text" id = "category" disabled = "true" value = "테스트">
<br>
작성자 <input type = "text" id = "id" disabled = "true" value = "${user_id}">
<br>
제목 <input type = "text" id = "title">
<br>
<br>
내용 
<br>
<textarea id = "content"></textarea>
<br>
<br>
<input type = "button" value = "작성 완료" onclick = "posting()">

