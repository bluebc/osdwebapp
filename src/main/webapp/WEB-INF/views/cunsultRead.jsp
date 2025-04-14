<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>상담 & 게시판</title>


</head>

<body>
    
<input type = "hidden" id = "post_id" value = "${cunsult_post.post_id}">
<input type = "hidden" id = "user_id" value = "${cunsult_post.user_id}">
<input type = "hidden" id = "reader_id" value = "${reader_id}">

<%-- jstl 값 load 후 js load --%>

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src ="${pageContext.request.contextPath}/js/cunsultRead.js"></script>
    <script src ="${pageContext.request.contextPath}/js/cunsultComment.js"></script>

<div class="container">
    <div class="content">
            <div class="title">게시판</div>
    <div class="post">
        <input type = "hidden" id = "post_id" value = "${cunsult_post.post_id}">
        <input type = "hidden" id = "user_id" value = "${cunsult_post.user_id}">

        <div class="post-title">제목 : ${cunsult_post.post_subject}</div>
        <div class="post-meta">
            <img class="profile" src="../img/hd-pop.jpg" alt="작성자 프로필">
            <div class="infoItem">
                <span>작성자${cunsult_post.user_id}</span>
                <span>2025.04.01. 00:00</span>
                <span>조회 144</span>
            </div>

        </div>
        <div class="post-content">
        내용 
        <br>
        ${cunsult_post.post_content}
        </div>
    </div>
    
    <div class="comment-section">
        <div class="comment-header">
            <span>댓글 n개</span>
            <span>정렬: <a href="#">등록순</a> | <a href="#">좋아요순</a></span>
<br>
<br>
<br>

<div id = "comment">

<div id = "displayComment">
    <div class = "commentLevel1" id = "cmt_id1">
        <div class = "commentContent">
            부모 댓글 내용
        </div>
        
        <div class="comment">
            <img class="profile" src="../img/re1.jpg" alt="사용자1 프로필">
            <div class="comment-content">
                <strong>사용자1</strong>
                <p>대단하네요^^</p>
                <div class="comment-actions">
                    <span>2025.03.28. 09:14</span>
                    <span><a href="#">답글쓰기</a></span>
                    <span class="like-button" id = "like">
                        <div id = "like">
                        <input type = "hidden" value = "${liked}" id = "myLike">
                            <div id = "likeButton" onclick = "like()">
                            ♡
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        
        <div class="comment reply">
            <img class="profile" src="../img/st2.jpg" alt="사용자2 프로필">
            <div class="comment-content">
                <strong>사용자2</strong>
                <p>대단하네요^^</p>
                <div class="comment-actions">
                    <span>2025.03.28. 09:14</span>
                    <span><a href="#">답글쓰기</a></span>
                    <span class="like-button"><img src="../img/icon_heart.svg"></span>
                </div>
            </div>
        </div>
        
        <div class="comment reply">
            <img class="profile" src="../img/st3.jpg" alt="사용자3 프로필">
            <div class="comment-content">
                <strong>사용자3</strong>
                <p>대단하네요^^</p>
                <div class="comment-actions">
                    <span>2025.03.28. 09:14</span>
                    <span><a href="#">답글쓰기</a></span>
                    <span class="like-button"><img src="../img/icon_heart.svg"></span>
                </div>
            </div>
        </div>
        
        <div class="comment">
            <img class="profile" src="../img/st4.jpg" alt="사용자4 프로필">
            <div class="comment-content">
                <strong>사용자4</strong>
                <p>대단하네요^^</p>
                <div class="comment-actions">
                    <span>2025.03.28. 09:14</span>
                    <span><a href="#">답글쓰기</a></span>
                    <span class="like-button"><img src="../img/icon_heart.svg"></span>
                </div>
            </div>
        </div>
    </div>



        <%-- <input type = "hidden" id = "fileJSON" value = "${cunsult_post.post_files}"> --%>
        <input type="hidden" id="fileJSON" value='<c:out value="${cunsult_post.post_files}" escapeXml="false" />'>
        <div id = fileList>
        ${cunsult_post.post_files}

        </div>


        <div id = "like">
        <input type = "hidden" value = "${liked}" id = "myLike">
            <div id = "likeButton" onclick = "like()">
            ♡
            </div>
        </div>


        <div id = "modOrDel" style="display:none">
            <input type = "button" onclick = "modifyPost(${cunsult_post.post_id})" value = "수정">
            <input type = "button" onclick = "deletePost(${cunsult_post.post_id})" value = "삭제">
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
                <%-- <div class = "commentLevel1" id = "cmt_id1">

                    <div class = "commentContent">
                        부모 댓글 내용
                    </div>

                    <div class="comment-infobox">

                        <input type = "button" value = "좋아요" class = "likeButton">
                        <input type = "button" value = "답글쓰기" class = "reReplyButton">
                    </div>

                    <div class = "commentLevel2" id = "cmt_id2">
                        <div class = "commentContent">
                        자식 댓글 내용
                    </div>
                        <input type = "button" value = "좋아요">
                    </div>
                </div> --%>
            </div>
            
            <div id = "writeComment">
                <textarea class = "writeCommentContent" placeholder  = "댓글을 작성하세요" id = "writeCommentContent"></textarea>
                <input type = "button" value = "작성 완료" onclick = "writeComment()">
            </div>
        </div>

    </div>
</div>

<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>


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