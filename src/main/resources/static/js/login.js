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
        document.getElementById("saveIdCheck").checked = true;
    }
}

async function login() {


    var user_id = document.getElementById("user_id");
    if (user_id.value == "") {
        user_id.focus();
        Swal.fire({
            icon: "warning",
            title: "알림",
            text: "아이디를 입력하세요.",
            confirmButtonColor: "#82a90d", 
            background: "#ffffff",
        });
        return;
    }

    var user_pw = document.getElementById("user_pw");
    if (user_pw.value == "") { 
        user_pw.focus();
        Swal.fire({
            icon: "warning",
            title: "알림",
            text: "비밀번호를 입력하세요.",
            confirmButtonColor: "#82a90d",
            background: "#ffffff",
        });
        return;
    }

    await loginCheck(user_id.value, user_pw.value);
}

async function loginCheck(id, pw) {
    var check = await auth(id, pw);
    // alert(check.status);



    switch (check.status) {
        case -2:
            Swal.fire({
                title: "비밀번호가 일치하지 않습니다",
                text: "비밀번호를 확인하세요",
                icon: "error",
                confirmButtonColor: "#82a90d", 
                background: "#ffffff",
            });
            break;
        case -1:
            alert("아이디를 확인하세요.");
            break;
        case 0:
            alert("오류가 발생하였습니다.");
            break;
        case 1:
            Swal.fire({
                title: "로그인 되었습니다.",
                text: "환영합니다.",
                icon: "success",
                confirmButtonColor: "#82a90d", 
                background: "#ffffff", 
                color: "#2E7D32", 
                timer: 1500, 
                showConfirmButton: false 
            }).then(() => {
                window.location.href = "/";
            });
            break;
        default:
            alert("오류가 발생하였습니다.");
            break;
    }
}


async function auth(id, pw) {

    var autoLogin = document.getElementById("autoLogin").checked;
    var rememberMe = document.getElementById("saveIdCheck").checked;

    var user = { user_id: id, user_pw: pw };

    const response = await fetch("/login/requestLogin?autoLogin=" + autoLogin + "&rememberMe=" + rememberMe, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    const result = await response.json();
    return result;
}