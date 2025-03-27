<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>비밀번호 찾기</title>

    <!-- css -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/authEmailRequest.css">

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">
    
    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src = "${pageContext.request.contextPath}/js/findLoginInfo.js"></script>

</head>
<body>
    

<!-- header -->
<jsp:include page="header.jsp"></jsp:include>

<div class="container">
    <div class="content">

        <%-- pc --%>
        <div class="pc-type">비밀번호 찾기</div>

        <%-- mobile --%>
        <div class="mobil-type">
                <div class="tit-wrap">
                    <a href="/login" class="btn-back">
                        <i class="hidden">닫기</i>
                    </a> 
                    <h1 class="header-sub-tit">비밀번호 찾기</h1>
                </div>
                <div class="header-util">
                    <a href="/" class="btn-home">
                        <img src="${pageContext.request.contextPath}/img/홈.svg" alt="home">
                    </a> 
                </div>
        </div>

        <div class="inner-cont">
            <div class="nav-tab">
                <button type="button" class="btn-tab" disabled="disabled">휴대폰 인증</button> 
                <button type="button" class="btn-tab">이메일 인증</button>
            </div>

            <form id="section" class="section-cont">

                <div class="form-item">
                    <div class="form-tit">
                        <label for="email" class="tit">아이디</label>
                        <div class="form-cont">
                            <input type = "text", id = "user_id" placeholder = "아이디를 입력해 주세요">
                        </div>
                        <label for="email" class="tit">이메일</label>
                        <div class="form-cont">
                            <input type = "text", id = "user_email" placeholder = "이메일을 입력해 주세요">
                        </div>
                    </div>
                </div>

                <div class="btn-area">
                    <input class="btn-point" type = "button" value = "확인" onclick = "goAuthEmail()">
                </div>
            </form>
        </div>
    </div>
</div>

<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>    

</body>
</html>

