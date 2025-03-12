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
<h6><a href = "/withdraw">회원탈퇴 페이지</a></h6>
<h6><a href = "/login">로그인 페이지</a></h6>
<h6><a href = "/changepw">비밀번호 수정 페이지</a></h6>


<%-- <input type = "button" value = "test" onclick = "loginVisible('${loginId}')"> --%>

<input type = "button" value = "test" onclick = "tokenmaker()">
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

<div id = "userinfoSection">
<input type = "text" id = "iUserId" placeholder = "id">
<input type = "button" value = "조회" onclick = "inquire()"> <input type = "button" value = "수정" onclick = "modify()">
<hr>
<input type = "text" id = "iUserPw" placeholder = "pw">
<br>
<input type = "text" id = "iUserName" placeholder = "name">
<br>
<input type = "text" id = "iUserHpNo" placeholder = "phonenumber">
<br>
<input type = "text" id = "iUserEmail" placeholder = "email">
<br>
<input type = "text" id = "iUserAddr" placeholder = "address">
<br>
<input type = "text" id = "iUserBirth" placeholder = "birth">
<br>
<input type = "text" id = "iUserGender" placeholder = "gender">
<br>

</div>
<hr>

<div id = "mailSection">
<br>
<input type = "text" id = "emailTo" placeholder = "받는 주소">
<br>
<input type = "text" id = "emailSubject" placeholder = "제목">
<br>
<input type = "text" id = "emailText" placeholder = "내용">
<br>
<input type = "button" value = "send" onclick = "sendMail()">
</div>


<br>
<br>
<br>





</body>
</html>

<script src = "js/test/test.js"></script>
<script src = "js/sessioncheck.js"></script>
