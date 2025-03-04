<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>

</head>
<body>


<div id = "signupSection">

<input type="text" id="id" placeholder="아이디 (이메일주소)"> <br>
			<input type="password" id="ps" placeHolder="패스워드"><br>
			<input type="password" id="ps2" placeHolder="패스워드 (확인)"><br>
			<input type="text" id="name" placeHolder="이름"><br>
            <br><br>
			<input type="submit" height=50 value="회원가입하기" onclick="signup()"><br>
            <br>
            <br>
		


</div>


<script>

async function signup() {

    var id = document.getElementById("id").value;
    if (id == "") {
        alert("아이디를 입력해 주세요.");
        document.getElementById("id").focus();
        return;
    }

    var ps = document.getElementById("ps").value;
    if (ps == "") {
        alert("패스워드를 입력해주세요.");
        document.getElementById("ps").focus();
        return;
    }

    var ps2 = document.getElementById("ps2").value;
    if (ps != ps2) {
        alert("패스워드(확인)가 일치하지 않습니다.");
        document.getElementById("ps2").focus();
        return;
    }
    var name = document.getElementById("name").value;
    if (name == "") {
        alert("이름을 입력해 주세요.");
        document.getElementById("name").focus();
        return;
    }
    var userobj = {
        id: id,
        password: ps,
        name: name,
        ts: getTime()
    };

    var result = await idCheck(userobj);

    switch (result) {
        case -1:
            alert("중복된 아이디 입니다.");
            break;
        case 0:
            alert("DB Error");
            break;
        case 1:
            alert("회원가입 완료!");
            window.location.href = "/login";
            break;
        default:
            alert("스크립트 Error");
    }

}

async function idCheck(userobj) {

    const response = await fetch("/idcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userobj),
    });
    const result = await response.json();

    return result;
}

function getTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var min = ("0" + date.getMinutes()).slice(-2);
    var sec = ("0" + date.getSeconds()).slice(-2);
    return year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec;
}


</script>


</body>
</html>