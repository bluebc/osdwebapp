<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">

<!-- meta  -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<html>
    <head>
    <title>로그인</title>

    <!-- css -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/login.css">

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


    <script src = "${pageContext.request.contextPath}/js/login.js"></script>

    </head>
    <body>



    <!-- header -->
    <jsp:include page="header.jsp"></jsp:include>

    <div class="container">
        <div class="content">
            

            <%-- pc --%>
            <div class="pc-type">
                <a href="/" class="btn-home">
                    <img src="img/홈.svg" alt="home">
                </a> 
                <h1>로그인</h1>
            </div>

            <%-- mobile --%>
            <div class="mobil-type">
                <div class="tit-wrap">
                    <a href="/" class="btn-back">
                        <i class="hidden">닫기</i>
                    </a> 
                    <h1 class="header-sub-tit">로그인</h1>
                </div>
                <div class="header-util">
                    <a href="/" class="btn-home">
                        <img src="img/홈.svg" alt="home">
                    </a> 
                </div>
            </div>


            <form id="loginForm" action="#" method="post">

                    <div class="formInput">
                                <label for="username" class="blind">아이디 입력</label>
                                <input type="text" id="user_id" name="username"  placeholder="아이디를 입력해주세요.">
                    </div>

                    <div class="formInput">
                                <label for="password" class="blind">비밀번호 입력</label>
                                <input type="password" id="user_pw" name="password"  placeholder="비밀번호를 입력해주세요.">
                                <%-- <span class="inputMsg error"></span> --%>
                    </div>

                    <div class="check">
                        <span class="inp">
                            <input type="checkbox" id="autoLogin" name="autoLogin" value="자동 로그인" checked>
                            <label for="autoLogin">
                                <span class="ftext">자동 로그인</span>
                            </label>

                            <input  type="checkbox" id="saveIdCheck" name="saveIdCheck" value="아이디 저장">
                            <label  for="saveIdCheck">
                                <span  class="ftext">아이디 저장</span>
                            </label>
                        </span>
                    </div>

                    <div class="boxBtnGroup">
                        <div class="btnInp">
                                <input type = "button" value = "로그인" onclick = "login()">
                        </div>
                        <div class="btnInp">
                                <input type = "button" value = "회원가입" onclick=" location.href='/signup';">
                        </div>
                    </div>

                    <div class="formLink">
                        <a href="/find/id">아이디 찾기</a>
                        <span></span>
                        <a href="/find/pw">비밀번호 찾기</a>
                    </div>        

                    <div class="non-member">
                        <div class="member-order">
                            <input type = "button" value = "비회원 주문조회" onclick = "">
                        </div>
                    </div>
            </form>

        </div>
    </div>


    <!-- footer -->
    <jsp:include page="footer.jsp"></jsp:include>

    </body>
    
</html>