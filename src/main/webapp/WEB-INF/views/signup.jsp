<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>

</head>
<body>


<div id = "signupSection">

            <input type="text" id="user_id" placeholder="아이디"> <br>
			<input type="password" id="user_pw" placeHolder="패스워드"><br>
			<input type="password" id="user_pw2" placeHolder="패스워드 (확인)"><br>
			<input type="text" id="user_name" placeHolder="이름"><br>
            <input type="text" id="user_hpno" placeHolder="핸드폰번호"><br>
            <input type="text" id="user_email" placeHolder="이메일"><br>
            <input type="text" id="user_addr" placeHolder="주소"><br>
            <input type="text" id="user_birth" placeHolder="생일"><br>
            <%-- <input type="text" id="user_gender" placeHolder="성별"><br> --%>
            <select id="user_gender">
            <option value = "">성별</option>
            <option value = "M">남</option>
            <option value = "F">여</option>
            </select>





            
            <br><br>
			<input type="submit" height=50 value="회원가입하기" onclick="signup()"><br>
            <br>
            <br>
		


</div>


<script src = "js/signup.js"></script>

</body>
</html>