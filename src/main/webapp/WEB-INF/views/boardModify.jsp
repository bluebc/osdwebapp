<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>


<script src = "${pageContext.request.contextPath}/js/board.js"></script>
</head>
<body>

<h3>글 수정 테스트</h3>

<input type = "hidden" id = "board_no" value = "${board_info.board_no}">
분류 <input type = "text" id = "category" disabled = "true" value = "${board_info.board_category}">
<br>
작성자 <input type = "text" id = "id" disabled = "true" value = "${board_info.user_id}">
<br>
제목 <input type = "text" id = "title" value = "${board_info.board_title}">
<br>
<br>
내용 
<br>
<textarea id = "content">${board_info.board_content}</textarea>
<br>
<br>
<input type = "button" value = "수정 완료" onclick = "requestModify()">
<input type = "button" value = "취소" onclick = "cancelModify()">

