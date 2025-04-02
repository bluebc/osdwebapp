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
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/support.css">

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src = "${pageContext.request.contextPath}/js/support.js"></script>
    <script src = "${pageContext.request.contextPath}/js/supportQnaList.js"></script>
    <script src = "${pageContext.request.contextPath}/js/supportFaqList.js"></script>

</head>
<body>

    <!-- header -->
    <jsp:include page="header.jsp"></jsp:include>

    <main>
        <div class="container">
            <div class="content">
                <div class="snbContainer">
                    <div class="title"><h1>고객센터</h1></div>
                    <div id = "supportTypeBtnSection" class="snbMenu">
                        <div class="snb-btn">
                            <input type = "button" value = "FAQ" onclick = "setSupportType('faq')">
                        </div>
                        <div class="snb-btn">
                            <input type = "button" value = "QNA" onclick = "setSupportType('qna')">
                        </div>
                    </div>
                </div>    


                <div class="lnbContainer">

                    <div class="basic-type">
                        <%-- pc --%>
                        <div class="pc-type">
                            <h2>자주 찾는 질문</h2>
                        </div>
                        <%-- mobile --%>
                        <div class="mobil-type">
                            <div class="tit-wrap">
                                <a href="/" class="btn-back">
                                    <i class="hidden">닫기</i>
                                </a> 
                                <h2 class="header-sub-tit">자주 찾는 질문</h2>
                            </div>
                            <div class="header-util">
                                <a href="/" class="btn-home">
                                    <img src="img/홈.svg" alt="home">
                                </a> 
                            </div>
                        </div>
                    </div>

                    <div class="section-cont">
                        <div class="form-area">
                            <span class="search">
                                <input type = "text" id = "keyword" class="tf" placeholder = "검색어를 입력하세요">
                                <input type = "button" onclick= "search()" class="btn-search" >
                            </span>
                        </div>

                        <div class="all-category">
                            <div id = "supportContent" class="contents-box">
                        </div>
                    </div>  


                </div>



                </div>
            </div>
        </div>
    </main>
    <style>

</style>
    <!-- footer -->
    <%-- <jsp:include page="footer.jsp"></jsp:include> --%>
</body>
</html>
