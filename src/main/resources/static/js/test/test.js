// ====================  ====================
document.addEventListener("DOMContentLoaded", function () {
    // console.log("문서 로드 완료");

    // 로그인 버튼 on/off
    loginVisible();
    initUserInfo();


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
    var user = { user_id: id, user_pw: pw };

    const response = await fetch("/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
}
// ====================▼ 회원 조회, 업데이트 ▼====================

async function inquire() {

    var iUser_id = document.getElementById("iUserId").value


    var user_info = await getUserInfo(iUser_id);
    fillIn(user_info);
    readOnly();
}

async function getUserInfo(user_id) {

    if (user_id == null || user_id == "") {
        return;
    }

    var userobj = { user_id: user_id };

    const response = await fetch("/getuserinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userobj),
    });
    const result = await response.json();
    return result;
}

function fillIn(user_info) {
    document.getElementById("iUserId").value = user_info.user_id;
    document.getElementById("iUserPw").value = user_info.user_pw;
    document.getElementById("iUserName").value = user_info.user_name;
    document.getElementById("iUserHpNo").value = user_info.user_hpno;
    document.getElementById("iUserEmail").value = user_info.user_email;
    document.getElementById("iUserAddr").value = user_info.user_addr;
    document.getElementById("iUserBirth").value = user_info.user_birth;
    document.getElementById("iUserGender").value = user_info.user_gender;

}

async function modify() {
    var user_info = {};
    user_info.user_id = document.getElementById("iUserId").value;
    user_info.user_pw = document.getElementById("iUserPw").value;
    user_info.user_name = document.getElementById("iUserName").value;
    user_info.user_hpno = document.getElementById("iUserHpNo").value;
    user_info.user_email = document.getElementById("iUserEmail").value;
    user_info.user_addr = document.getElementById("iUserAddr").value;
    user_info.user_birth = document.getElementById("iUserBirth").value;
    user_info.user_gender = document.getElementById("iUserGender").value;

    const result = await updateUserInfo(user_info);

    if (result.result == 1) {
        alert("회원정보 수정 완료");
    }
    // console.log("update:", result.result);

}

async function updateUserInfo(user_info) {

    const response = await fetch("/updateuserinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user_info),
    });
    const result = await response.json();
    return result;
}

async function initUserInfo() {
    const sessionId = await sessionCheck("getId");
    const user_info = await getUserInfo(sessionId);
    fillIn(user_info);
}

function readOnly() {
    document.getElementById("iUserGender").readOnly = true;
}



// ====================▼ 자동로그인 토큰 테스트 ▼====================

function tokenmaker() {
    var user_id = document.getElementById("iUserId").value;
    fetch("/ttokenmaker?user_id=" + user_id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {},
    });

}

// ====================▼ 이메일 테스트 ▼====================

function sendMail() {
    var to = document.getElementById("emailTo").value;
    var subject = document.getElementById("emailSubject").value;
    var text = document.getElementById("emailText").value;

    fetch("/tsendemail",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to: to,
                subject: subject,
                text: text
            })
        });



}