<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>


<script src = "${pageContext.request.contextPath}/js/board.js"></script>
</head>
<body>

<h3>글 작성 테스트</h3>

<input type = "hidden" id = "board_no" value = "${board_info.board_no}">
<input type = "hidden" id = "user_id" value = "${board_info.user_id}">

<div>
분류 ${board_info.board_category}
<br>
작성자 ${board_info.user_id}
<br>
제목 ${board_info.board_title}
<br>
<div id = "modOrDel" style="display:none">
<input type = "button" onclick = "modifyBoard(${board_info.board_no})" value = "수정"> <input type = "button" onclick = "deleteBoard(${board_info.board_no})" value = "삭제">
</div>
<br>
내용 
<br>
${board_info.board_content}
<br>
<br>
</div>

<input type = "button" value = "목록" onclick = "goBoardList()">
