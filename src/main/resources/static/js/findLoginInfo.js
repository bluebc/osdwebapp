async function requestAuthMail() {

    var user_id = document.getElementById("user_id").value;
    var user_email = document.getElementById("user_email").value;

    const response = await fetch("/find/requestEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: user_id,
            user_email: user_email
        })
    });

    const result = await response.json();

    if (result.status == 1) {
        window.location.href = "/find/emailAuth";
    }

    return result;

}

async function emailAuth() {
    var emailAuthCode = document.getElementById("emailAuthCode").value;
    const response = await fetch("/find/postEmailAuthCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auth_code: emailAuthCode })
    });

    const result = await response.json();

    switch (result.status) {
        case 0:
            alert("server error");
            return;
        case -1:
            alert("session만료");
            // 초기화면으로 이동
            return;
        case -2:
            alert("이메일 정보 오류");
            return;
        case -3:
            alert("인증코드 만료");
            break;
        case -4:
            alert("인증코드 틀림");
            break;
        case -5:
            alert("사용자 정보 없음");
            break;
        case 1:
            window.location.href = "/find/result/id";
            break;
        case 2:
            window.location.href = "/find/result/pw";
            break;
        default:
            alert("script error");
    }

    // if (result.status == 1) {
    //     window.location.href = "/find/id/found";
    // }
    // if (result.status == 2) {
    //     window.location.href = "/find/pw/reset";
    // }
}

async function requestResetPassword() {
    var newPassword = document.getElementById("newPassword");
    var newPassword2 = document.getElementById("newPassword2");

    if (newPassword.value == "") {
        alert("변경할 비밀번호를 입력하세요.");
        newPassword.focus();
        return;
    }
    if (newPassword2.value == "") {
        alert("변경할 비밀번호(확인)를 입력하세요.");
        newPassword2.focus();
        return;
    }
    if (newPassword.value != newPassword2.value) {
        alert("새 비밀번호(확인)가 일치하지 않습니다.");
        newPassword2.focus();
        return;
    }

    const response = await fetch("/find/pw/requestReset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_pw: newPassword.value })
    });

    const result = await response.json();

    switch (result.status) {
        case 0:
            alert("server error");
            return;
        case -1:
            alert("session만료");
            // 초기화면으로 이동
            return;
        case -2:
            alert("비밀번호 변경 실패");
            return;
        case 1:
            alert("비밀번호 변경 완료");
            window.location.href = "/login";
            break;
        default:
            alert("script error");
    }
}
