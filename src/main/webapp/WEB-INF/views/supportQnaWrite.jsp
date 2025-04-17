<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>

    <title>오생단</title>

    <!-- meta  -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- css -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/supportQnaWrite.css">

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">


    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src = "${pageContext.request.contextPath}/js/supportQnaWrite.js"></script>
</head>
<body>

<!-- header -->
<jsp:include page="header.jsp"></jsp:include>

<div class="container">
    <div class="content">
        <div class="title">
            <h2>QNA Write</h3>
            <hr class="hr1" noshade>
        </div>


        <div class="section-cont">
            <div class="qnaList">
                <div class="writerEnc">
                    <span>작성자</span>
                    <hr>
                    <input type = "text" id = "user_id" disabled = "true" value = "${user_id}">
                </div>

                <div class="subBox">
                    <span>제목</span> 
                    <hr>
                    <input type = "text" id = "post_subject" placeholder="제목을 입력하세요.">
                </div>
                
                <div class="contBox">
                    <span>내용</span>
                    <hr>
                    <textarea id = "post_content" placeholder = "내용을 입력하세요."></textarea>
                </div>
                
                <div class="inpBox">
                    <input type = "button" value = "작성 완료" onclick = "posting()">
                    <input type = "button" value = "취소" onclick = "cancelPosting()">
                </div>
            </div>
        </div>    

        

    </div>
</div>

<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>

</body>