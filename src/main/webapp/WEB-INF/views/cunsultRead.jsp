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
    <script src ="${pageContext.request.contextPath}/js/cunsultComment.js"></script>
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
    
<br>
<br>
<br>

<div id = "comment">
<input type = "hidden" id = "reader_id" value = "${reader_id}">
<div id = "displayComment">
    <div class = "commentLevel1" id = "cmt_id1">
        <div class = "commentContent">
            부모 댓글 내용
        </div>
        <input type = "button" value = "좋아요">
            <input type = "button" value = "대댓글">
        <div class = "commentLevel2" id = "cmt_id2">
            <div class = "commentContent">
            자식 댓글 내용
        </div>
            <input type = "button" value = "좋아요">
        </div>
    </div>
</div>
<div id = "postComment">
    <textarea class = "writeComment" placeholder  = "댓글을 작성하세요" id = "writeComment"></textarea>
            <input type = "button" value = "작성 완료" onclick = "writeComment()">
</div>
</div>

<style>
    #comment {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        font-family: Arial, sans-serif;
    }

    .commentLevel1 {
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
        background-color: #f9f9f9;
    }

    .commentLevel2 {
        margin-top: 10px;
        margin-left: 20px;
        border-left: 2px solid #ddd;
        padding-left: 10px;
        background-color: #fff;
    }

    textarea {
        width: 100%;
        height: 60px;
        resize: vertical;
        padding: 5px;
        box-sizing: border-box;
        margin-bottom: 5px;
    }

    input[type="button"] {
        margin-right: 5px;
        padding: 5px 10px;
        cursor: pointer;
    }
    .commentContent {
    white-space: pre-wrap;  /* 줄바꿈 유지 */
    padding: 8px;
    border: 1px solid #ccc;
    background-color: #fdfdfd;
    margin-bottom: 5px;
    border-radius: 4px;
}
</style>



</body>

</html>