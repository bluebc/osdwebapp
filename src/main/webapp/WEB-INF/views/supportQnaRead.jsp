<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
<title>오생단</title>
<script src = "${pageContext.request.contextPath}/js/supportQnaRead.js"></script>
</head>
<body>
<h3>QNA Write</h3>


<h3>글 작성 테스트</h3>

<input type = "hidden" id = "post_id" value = "${qna_post.post_id}">
<input type = "hidden" id = "user_id" value = "${qna_post.user_id}">

<div>
제목 ${qna_post.post_subject}
<br>
작성자 ${qna_post.user_id}
<br>

<br>
<div id = "modOrDel" style="display:none">
<input type = "button" onclick = "modifyBoard(${qna_post.post_id})" value = "수정"> <input type = "button" onclick = "deleteBoard(${board_info.board_no})" value = "삭제">
</div>
<br>
내용 
<br>
${qna_post.post_content}
<br>
<br>
</div>

<input type = "button" value = "목록" onclick = "goQnaList()">

</body>
</html>