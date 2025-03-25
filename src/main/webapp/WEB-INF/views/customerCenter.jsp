<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>고객센터</title>

    <!-- css -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/customerCenter.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
        crossorigin="anonymous" />

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src = "js/customerCenter.js"></script>


</head>
<body>


<!-- header -->
<jsp:include page="header.jsp"></jsp:include>
    
<div class="container">
    <div class="content">
        <div class="basic-type">
            <%-- pc --%>
            <div class="pc-type">
                <%-- <a href="/" class="btn-home">
                    <img src="img/홈.svg" alt="home">
                </a>  --%>
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
                        <input type="text" placeholder="검색어를 입력하세요" class="tf">
                        <button type="button" class="btn-search"><span class="hidden">검색</span></button>
                </span>
            </div>

            <div class="faq-category">
                <div class="cate">
                    <h3>카테고리</h2>
                </div>    
                <div class="tab_but"  role="tablist">
                    <button  class="all tab-button" role="tab" aria-controls="all"  tabindex="0">전체</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-1"  tabindex="0">제품</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-2"  tabindex="0">주문</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-3"  tabindex="0">배송</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-4"  tabindex="0">교환/환불</button>
                </div>  



                <div class="tab_area">
                    <div class="tab-content" id="tab-content-1" role="tabpanel" >
                        <div class="faq-box">
                            <div class="question">
                                <strong class="faq-tit">Q</strong>
                                <span class="faq-subject">제품</span>
                                <span class="faq-tet">질문</span>
                            </div>

                            <div class="answer">
                                <strong class="faq-tit">A</strong>
                                <span class="faq-tet">질문 내용</span>
                            </div>

                        </div>    
                    </div>
                    
                    </div>
                    <div class="tab-content" id="tab-content-2" role="tabpanel" >2 내용</div>
                    <div class="tab-content" id="tab-content-3" role="tabpanel" >3 내용</div>
                    <div class="tab-content" id="tab-content-4" role="tabpanel" >4 내용</div>
                </div>

            </div>
        </div>
    </div>
</div>


<!-- footer -->
<%-- <jsp:include page="footer.jsp"></jsp:include>     --%>
</body>
</html>    