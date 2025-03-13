document.addEventListener("DOMContentLoaded", function () {

    rememberMe();

});

async function rememberMe() {


    const response = await fetch("/login/rememberMe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {},
    });
    const result = await response.json();

    const user_id = result.user_id;
    if (result.status == 1) {
        document.getElementById("user_id").value = user_id;
        document.getElementById("rememberMe").checked = true;
    }
}

async function login() {


    var user_id = document.getElementById("user_id");
    if (user_id.value == "") {
        user_id.focus();
        alert("아이디를 입력하세요.");
        return;
    }
    var user_pw = document.getElementById("user_pw");
    if (user_pw == "") {
        user_pw.focus();
        alert("비밀번호를 입력해주세요.");
        return;
    }

    await loginCheck(user_id.value, user_pw.value);
}

async function loginCheck(id, pw) {
    var check = await auth(id, pw);
    //alert(check.status);



    switch (check.status) {
        case -2:
            alert("비밀번호를 확인하세요.");
            break;
        case -1:
            alert("아이디를 확인하세요.");
            break;
        case 0:
            alert("오류가 발생하였습니다.");
            break;
        case 1:
            alert("로그인되었습니다.");
            // localStorage.setItem("isLoggedIn",true);
            window.location.href = "/";
            break;
        default:
            alert("오류가 발생하였습니다.");
            break;
    }
}


async function auth(id, pw) {

    var autoLogin = document.getElementById("autoLogin").checked;
    var rememberMe = document.getElementById("rememberMe").checked;

    var user = { user_id: id, user_pw: pw };

    const response = await fetch("/login/requestLogin?autoLogin=" + autoLogin + "&rememberMe=" + rememberMe, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    const result = await response.json();
    return result;
}