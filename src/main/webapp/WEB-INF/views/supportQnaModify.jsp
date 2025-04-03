<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
<title>오생단</title>
<script src = "${pageContext.request.contextPath}/js/supportQnaModify.js"></script>
</head>
<body>
<h3>QNA Write</h3>


<h3>글 작성 테스트</h3>

<input type = "hidden" id = "post_id" value = "${qna_post.post_id}">
<input type = "hidden" id = "user_id" value = "${qna_post.user_id}">

<div>
제목 <input type = "text" id = "user_id" value = "${qna_post.post_subject}">
<br>
작성자 <input type = "text" id = "user_id" disabled = "true" value = "${user_id}">
<br>

<br>

<br>
내용 
<br>
<textarea id = "post_content">${qna_post.post_content}</textarea>
<br>
<br>
</div>

<input type = "button" value = "수정 취소" onclick = "cancelModify()">
<input type = "button" value = "수정 완료" onclick = "modify()">

</body>
</html>
