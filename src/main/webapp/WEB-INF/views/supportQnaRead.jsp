<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QNA 조회</title>

    <!-- css -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/supportQnaRead.css">
    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src = "${pageContext.request.contextPath}/js/supportQnaRead.js"></script>


</head>
<body>

    <!-- header -->
    <jsp:include page="header.jsp"></jsp:include>

    <div class="container">
        <div class="content">

            <%-- 제목 --%>
            <%-- <div class="inquiry-tit">
                <h3>QNA Write</h3>
            </div>   --%>

            <!-- Q -->
            <div class="question-content">
                <div class='inp-hidden'>
                    <input type = "hidden" id = "post_id" value = "${qna_post.post_id}">
                    <input type = "hidden" id = "user_id" value = "${qna_post.user_id}">
                </div>

                <div class="titles-ection">
                    <span class="question">
                        Q . <span class="blind">${qna_post.post_subject}</span>
                    </span>
                </div>
                
                <div class="user-info">
                    <span class="infoHeadItem">${qna_post.user_id}</span>
                    <span class="infoItem">조회수 641</span>
                    <span class="infoItem"><span class="blind">작성일</span> 2025.04.07</span>
                </div>
                
                <div class="question-detail">${qna_post.post_content}</div>

                <div class="tag-list">
                    <a href="#" target="_blank" onclick="" class="tag">태그</a>
                </div>
            </div>

            <!-- A -->
            <div class="answer-content">
                <!-- 머리 -->
                <%-- <div class="answer-header">
                    <div class="aside-title">
                        <span class="title-area">n</span>개 답변
                    </div>
                </div> --%>

                <!-- 내용물 -->
                <div class="answer-area">

                    <%-- 프로필 --%>
                    <div class="profile-card">
                        <div class="card-info">
                            <div class="thumbnail-area">
                                <div class="thumbnail">
                                    <%-- <img src="/img/hd-pop.jpg" alt="프로필 사진"> --%>
                                </div>
                            </div>

                            <div class="profile-info">
                                <div class="name-area">작성자</div>
                            </div>
                        </div>
                    </div>
                    
                    <%-- 내용 --%>
                    <div class="answer-detail">
                        이것저것
                    </div>

                    <!-- 작성시간 -->
                    <div class="answer-info">
                        <p class="answer-date">작성시간</p>
                    </div>
                </div>

            </div>

            <%-- 목록 --%>
            <div class="inventory">
                <input type = "button" value = "목록" onclick = "goQnaList()">
            </div>

        </div>
    </div>    

    <!-- footer -->
    <jsp:include page="footer.jsp"></jsp:include>

</body>
</html>