<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

    <!-- css -->

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/header.css">


    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/header.js"></script>
    <script src = "${pageContext.request.contextPath}/js/sessioncheck.js"></script>

    
    <header  class="header" >
        <div class="top-banner">
            <img src="/img/top-banner.png" alt="배너알림">
        </div>
        <div class="hd_all">
            <article >
                <hgroup class="gnb">
                    <div>
                        <a href="/">
                            <h1 >
                                <img src="${pageContext.request.contextPath}/img/uni-well-logo.png" alt="logo">
                            </h1>
                        </a>
                
                    </div>
        
                    <nav class="pc_menu">
                        <ul class="menu_style">
                            <li><a href="#health" class="scroll">건강 프로그램</a></li>
                            <li><a href="#story" class="scroll" >건강 나눔</a></li>
                            <li><a href="#program52" class="scroll" >회원방</a></li>
                            <li><a href="#shoppingmall" class="scroll" >건강 이벤트</a></li>
                            <li><a href="/cunsultList" class="scroll" >상담 & 게시판</a></li>
                            <li><a href="#event" class="scroll">마이 오피스</a></li>
                        </ul>
                    </nav>
                </hgroup>
                
                
                <div class="he_link" >
                    <a href="/login" class="loginBtn">로그인</a>
                    <a href="/signup" class="signupBtn">회원가입</a>
                    <a href="/" class="supportBtn">홈</a>
                    <a href="/support" class="supportBtn">고객센터</a>
                </div>

                
                
            </article>


        
            <!--header 반응형-->
        
            
            <div class="hd_m">
                <div class="hd_info" >
                    <div class="hd_logo">
                        <a href="/">
                            <img src="${pageContext.request.contextPath}/img/uni-well-logo-sd.png">
                        </a>
                    </div>

                    <div class="gnbbar">
                        <nav class="group_option">
                            <button type="button" class="select_op">건강 프로그램</button>
                            <ul class="op_list">
                                <li class="op_item"><button type="button">건강 프로그램</button></li>
                                <li class="op_item"><button type="button">건강 나눔</button></li>
                                <li class="op_item"><button type="button">회원방</button></li>
                                <li class="op_item"><button type="button">건강 이벤트&Mall</button></li>
                                <li class="op_item"><a href="/cunsultList">상담 & 게시판</a></li>
                                <li class="op_item"><button type="button">마이 오피스</button></li>
                            </ul>
                        </nav>
                    </div>

                    <div class="hd_log_m">
                        <!-- 지도 & 알람 아이콘 (초기 상태에서 숨김) -->
                        <div class="hd_util" style="overflow:hidden;">
                            <a href="#" class="btn-address">
                                <img src="/img/map.svg">
                            </a>
                            <a href="#" class="btn-address">
                                <img src="/img/알람.svg">
                            </a>
                        </div>
                    
                        <!-- 로그인/회원가입 버튼 -->
                        <div class="he_link_m">
                            <a href="#" class="loginBtn">로그인</a>
                            <a href="#" class="signupBtn">회원가입</a>
                        </div>
                    </div>

                    
                </div>
                
                
            </div>

        </div>
    </header>

