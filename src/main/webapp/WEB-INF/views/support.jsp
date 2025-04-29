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

<input type = "hidden" value = "${login_user_role}" id = "login_user_role">

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
                        <div class="snb-btn">
                            <input type = "button" value = "공지사항" onclick = "">
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
                                <%-- <a href="/" class="btn-back">
                                    <i class="hidden">닫기</i>
                                </a>  --%>
                                <h2 class="header-sub-tit">자주 찾는 질문</h2>
                            </div>
                            <%-- <div class="header-util">
                                <a href="/" class="btn-home">
                                    <img src="img/홈.svg" alt="home">
                                </a> 
                            </div> --%>
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
                            <div id = "supportContent" class="contents-box"></div>
                        </div>  
                    </div>

                    <div class="agent">
                        <div class="inner-agent" >
                            <div class="call-help">
                                <div class='call-img'><img src='../img/phone-solid.svg'></div>
                                <strong class="tit-call">전화상담</strong>
                                <span class="operate-time">
                                    평일(월-금) : 9시 ~ 18시<br>
                                    토요일,일요일,공휴일 휴무
                                </span> 
                                <button type="button" class="btn-call">1899-8475</button>
                            </div> 

                            <div class="fq-service">
                                <strong class="tit-fq">자주찾는 서비스</strong>
                                <ul class="list-service">
                                    <li><a href="#">서비스 안내</a></li>
                                </ul>
                            </div>                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <!-- footer -->
    <jsp:include page="footer.jsp"></jsp:include>
</body>
</html>
