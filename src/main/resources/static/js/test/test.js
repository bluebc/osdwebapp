// ====================  ====================
document.addEventListener("DOMContentLoaded", function () {
    // console.log("문서 로드 완료");

    // 로그인 버튼 on/off
    loginVisible();


});

// ====================▼ 로그인 버튼 on/off ▼====================

function loginVisible() {
    var loginId = document.getElementById("loginId").value;
    
    if (loginId != "" && loginId != null) {
        document.getElementById("loginSection").style.display = "none";
    } else {
        document.getElementById("loginSection").style.display = "block";
    }
}


// ====================▼ 로그아웃 ▼====================
function logout() {
    alert("logout");
    window.location.href = "/logout";
}


// ====================▼ login.js ▼====================

async function login() {
    var id = document.getElementById("id").value;
    if (id == "") {
        document.getElementById("id").focus();
        alert("아이디를 입력하세요.");
        return;
    }
    var pw = document.getElementById("pw").value;
    if (pw == "") {
        document.getElementById("pw").focus();
        alert("패스워드를 입력해주세요.");
        return;
    }

    loginCheck(id, pw);
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

            // 테스트 페이지 이동
            window.location.href = "/test";

            break;
        default:
            alert("오류가 발생하였습니다.");
            break;
    }
}

async function auth(id, pw) {
    var user = { id: id, password: pw };

    const response = await fetch("/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
}
