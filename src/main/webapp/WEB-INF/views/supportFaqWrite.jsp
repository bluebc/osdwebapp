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
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/supportFaqWrite.css">

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src = "${pageContext.request.contextPath}/js/supportFaqWrite.js"></script>

</head>
<body>

<!-- header -->
<jsp:include page="header.jsp"></jsp:include>

<div class="container">
    <div class="content">
        <div class="title">
            <h2>자주 찾는 질문 업로드</h3>
            <hr class="hr1" noshade>
        </div>

        <div id="inputSection">
            <div class="section-cont">
            
                <div class="cateBox">
                    <select id = "cate_id">
                        <%-- <option value = "test1">테스트1</option>
                        <option value = "test2">테스트2</option> --%>
                    </select>
                </div>

                <div class="faqList">
                    <div class="subBox">
                        <span>자주찾는 질문</span>
                        <hr>
                        <input type = "text" id = "faq_subject" placeholder = "자주찾는 질문">
                    </div>
                    
                    <div class="contBox">
                        <span>자주찾는 질문 답변</span>
                        <hr>
                        <textarea id = "faq_content" placeholder = "자주찾는 질문 답변"></textarea>
                        <%-- <input type = "text" id = "faq_content" placeholder = "자주찾는 질문 답변"> --%>
                    </div>
                    
                    <div class="sortBox">
                        <span>순서</span>
                        <hr>
                        <input type = "text" id = "faq_sort" placeholder = "순서">
                    </div>

                    <div class="inpBox">
                        <input type = "button" onclick = "postFaq()" value = "FAQ 등록">
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</div>

<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>

<%-- <div class=""></div> --%>

</body>


