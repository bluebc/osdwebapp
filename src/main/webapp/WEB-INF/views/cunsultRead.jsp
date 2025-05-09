<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>상담 & 게시판</title>

    <!-- css -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/cunsultRead.css">

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>


</head>

<body>
    
<!-- header -->
<jsp:include page="header.jsp"></jsp:include>


<%-- jstl 값 load 후 js load --%>

<input type = "hidden" id = "post_id" value = "${cunsult_post.post_id}">
<input type = "hidden" id = "user_id" value = "${cunsult_post.user_id}">
<input type = "hidden" id = "login_user_id" value = "${login_user_id}">



<div class="container">
    <div class="content">
        <div class="title">게시판</div>
        <div class="post">
            <input type = "hidden" id = "post_id" value = "${cunsult_post.post_id}">
            <input type = "hidden" id = "user_id" value = "${cunsult_post.user_id}">

            <div class="post-title">${cunsult_post.post_subject}</div>
            <div class="post-meta">
                <img class="thumb" src="${pageContext.request.contextPath}/img/user/${cunsult_post.user_img}" alt="작성자 프로필">
                <div class="infoItem">
                    <div class="nickname"><h3>${cunsult_post.user_nickname}</h3></div>
                    <div class="article-info">
                        <span>${postCreatedAt}</span>
                        <span>조회 ${cunsult_post.post_viewcnt}</span>
                    </div>
                    
                </div>
            </div>
            <hr noshade>
            <div class="post-content">${cunsult_post.post_content}</div>

            <div id = "modOrDel" style="display:none">
                <input type = "button" onclick = "modifyPost(${cunsult_post.post_id})" value = "수정">
                <input type = "button" onclick = "deletePost(${cunsult_post.post_id})" value = "삭제">
            </div>

        </div>
    
        <div class="comment-section">
            <div class="reply-box">
                <div id = "like">
                    <input type = "hidden" value = "${liked}" id = "myLike">
                    <div id = "likeButton" onclick = "like()">♡ 좋아요</div>
                </div>

                <div class="comment-header">
                    <span id = "cmtCount">댓글 ${cunsult_post.post_cmtcnt}개</span>
                </div>
            </div>

            <div id = "comment">
                <div id = "displayComment">
                    <div class = "commentLevel1" id = "cmt_id1">
                    </div>
                    <input type = "hidden" id = "fileJSON" value = "${cunsult_post.post_files}">
                    <input type="hidden" id="fileJSON" value='<c:out value="${cunsult_post.post_files}" escapeXml="false" />'>
                    <div id = fileList>
                    ${cunsult_post.post_files}
                </div>
            </div>


            <div id = "writeComment">
                <div class="comment-inbox">
                    <div class="nickname"><h3>${login_user_nickname}</h3></div>
                    <textarea id = "writeCommentContent" class = "write-content" placeholder  = "댓글을 작성하세요"></textarea>
                </div>

                <div  class="comment-attach">
                    <div  class="register-box">
                        <input type = "button" value = "등록" onclick = "writeComment()">
                    </div>
                </div>

            </div>

            </div>
        </div>

        <div class="list-frame">
            <%-- <input type = "button" value = "목록" onclick = "goPostList()"> --%>
            <input type = "button" value = "목록" onclick = "location.href='/cunsultList'">
        </div>

    </div>
</div>



<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>




<script src ="${pageContext.request.contextPath}/js/cunsultRead.js"></script>
<script src ="${pageContext.request.contextPath}/js/cunsultComment.js"></script>


</body>

</html>