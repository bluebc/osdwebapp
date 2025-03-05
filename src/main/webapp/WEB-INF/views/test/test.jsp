<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>

</head>
<body>
<div id = hiddenSection>
<input type = "hidden" value = "${loginId}" id = "loginId">
</div>


<h3>테스트 페이지</h3>

<h6><a href = "/">인덱스 페이지</a></h6>
<h6><a href = "/signup">회원가입 페이지</a></h6>

<%-- <input type = "button" value = "test" onclick = "loginVisible('${loginId}')"> --%>

<input type = "button" value = "test" onclick = "">
<br>

<br>
login id : ${loginId}
<br>

 


<br>
<div id = "loginSection">
        <input type = "text", id = "id" placeholder = "id">
        <br>

        <br>
        <input type = "text", id = "pw" placeholder = "pw">
        <br>

        <br>
        <input type = "button" value = "login" onclick = "login()">
</div>
        <br>


<input type = "button" value = "로그아웃" onclick = "logout()">
<br>
<br>
<br>



</body>
</html>

<script src = "js/test/test.js"></script>
<script src = "js/sessioncheck.js"></script>