<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


    <%-- <title>privacyAgree</title> --%>
    <%-- <link rel="stylesheet" href="css/privacyAgree.css">
    <script src = "js/privacyAgree.js"></script> --%>


<div class="popup-wrap" id="popup">
    <div class="popup">
        <div class="popup-body">
            <div class="body-content">
                <div class="body-titlebox">
                    <h1>서비스 이용약관</h1>
                </div>
                <div class="body-contentbox">
                    <div class="agree-pop-conts">
                        <div class = 'text2'>${term.term_content}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup-foot">
            <span class="pop-btn confirm" id="confirm" onclick= "privacyClick()">확인</span>
        </div>
    </div>
</div>