<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html lang="ko" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>고객센터</title>

    <!-- css -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/customerCenter.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
        crossorigin="anonymous" />

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>


    <script src = "${pageContext.request.contextPath}/js/customerCenter.js"></script>




</head>
<body>


<!-- header -->
<jsp:include page="header.jsp"></jsp:include>
    
<div class="container">
    <div class="content">

        <div class="basic-type">
            <%-- pc --%>
            <div class="pc-type">
                <h1>자주 찾는 질문</h1>
            </div>
            <%-- mobile --%>
            <div class="mobil-type">
                <div class="tit-wrap">
                    <a href="/" class="btn-back">
                        <i class="hidden">닫기</i>
                    </a> 
                    <h1 class="header-sub-tit">자주 찾는 질문</h1>
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
                        <input type="text" placeholder="검색어를 입력하세요" class="tf" id = "keyword">
                        <button type="button" class="btn-search" onclick="searchQuestion()"><span class="hidden">검색</span></button>
                </span>
            </div>

            <div class="faq-category">
            
                <div class="tab_but"  role="tablist" id = "selectCategory">
                    <%-- <button  class="all tab-button" role="tab" aria-controls="all"  tabindex="0">전체</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-1"  tabindex="0">교환/환불</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-2"  tabindex="0">주문</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-3"  tabindex="0">배송</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-4"  tabindex="0">제품</button> --%>
                </div>  

                <div class="tab_area list" id = "faq-list"></div>
                <div class="paging type-more">
                        <button type="button" id="load">
                            <span>더보기<img src="../img/arrowdown.svg"></span>
                        </button>
                </div>
            </div>
        </div>      
        
    </div>
</div>


<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>    

</body>
</html>    