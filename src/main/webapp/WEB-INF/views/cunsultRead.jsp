<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>


    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src ="${pageContext.request.contextPath}/js/cunsultRead.js"></script>
</head>

<body>
    
<input type = "hidden" id = "post_id" value = "${cunsult_post.post_id}">
<input type = "hidden" id = "user_id" value = "${cunsult_post.user_id}">

<div>
제목 ${cunsult_post.post_subject}
<br>
작성자 ${cunsult_post.user_id}
<br>

<br>

<br>
내용 
<br>
${cunsult_post.post_content}
<br>
<br>
</div>

<br>
<br>
<br>

<%-- <input type = "hidden" id = "fileJSON" value = "${cunsult_post.post_files}"> --%>
<input type="hidden" id="fileJSON" value='<c:out value="${cunsult_post.post_files}" escapeXml="false" />'>
<div id = fileList>
${cunsult_post.post_files}

</div>


<div id = "like">
<input type = "hidden" value = "${liked}" id = "myLike">
    <div id = "likeButton" onclick = "like()">
    좋아요
    </div>
</div>


<div id = "modOrDel" style="display:none">
<input type = "button" onclick = "modifyPost(${cunsult_post.post_id})" value = "수정"> <input type = "button" onclick = "deletePost(${cunsult_post.post_id})" value = "삭제">
</div>


<br>
<br>
<br>



<input type = "button" value = "목록" onclick = "goPostList()">
    
             



</body>

</html>