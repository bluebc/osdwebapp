<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>건강 나눔</title>

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

<input type = "hidden" id = "post_id" value = "${community_post.post_id}">
<input type = "hidden" id = "user_id" value = "${community_post.user_id}">
<input type = "hidden" id = "login_user_id" value = "${login_user_id}">



<div class="container">
    <div class="content">
        <div class="title">게시판 type theme</div>

        <%-- 카테고리 표시 필요 --%>

        <div class="post">
            <input type = "hidden" id = "post_id" value = "${community_post.post_id}">
            <input type = "hidden" id = "user_id" value = "${community_post.user_id}">

            <div class="post-title">${community_post.post_subject}</div>
            <div class="post-meta">
                <img class="thumb" src="${pageContext.request.contextPath}/img/user/${community_post.user_img}" alt="작성자 프로필">
                <div class="infoItem">
                    <div class="nickname"><h3>${community_post.user_nickname}</h3></div>
                    <div class="article-info">
                        <span>${postCreatedAt}</span>
                        <span>조회 ${community_post.post_viewcnt}</span>
                    </div>
                    
                </div>
            </div>
            <div class="post-content">${community_post.post_content}</div>

            <div id = "modOrDel" style="display:none">
                <input type = "button" onclick = "modifyPost(${community_post.post_id})" value = "수정">
                <input type = "button" onclick = "deletePost(${community_post.post_id})" value = "삭제">
            </div>

        </div>
    
        <div class="comment-section">
            <div class="reply-box">
                <div id = "like">
                    <input type = "hidden" value = "${liked}" id = "myLike">
                    <div id = "likeButton" onclick = "like()">♡ 좋아요</div>
                </div>

                <div class="comment-header">
                    <span id = "cmtCount">댓글 ${community_post.post_cmtcnt}개</span>
                </div>
            </div>

            <div id = "comment">
                <div id = "displayComment">
                    <div class = "commentLevel1" id = "cmt_id1">
                    </div>
                    <input type = "hidden" id = "fileJSON" value = "${community_post.post_files}">
                    <%-- <input type="hidden" id="fileJSON" value="<c:out value='${community_post.post_files}' escapeXml='false' />"> --%>
                    

                    <div id = fileList>
                    <%-- ${community_post.post_files} --%>
                </div>
            </div>


            <div id = "writeComment">
                <div class="comment-inbox">
                    <div class="nickname"><h3>${login_user_nickname}</h3></div>
                    <textarea  class = "write-content" placeholder  = "댓글을 작성하세요"></textarea>
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
            <input type = "button" value = "목록" onclick = "goPostList()">
        </div>

    </div>
</div>



<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>




<script src ="${pageContext.request.contextPath}/js/communityRead.js"></script>
<script src ="${pageContext.request.contextPath}/js/communityComment.js"></script>


</body>

</html>