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


async function goAuthEmail() {
    var user_id = document.getElementById("user_id");
    user_id = user_id ? user_id.value : "";

    const response = await fetch("/auth/setSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            auth_purpose: "find_reset_pw",
            user_id: user_id
        })
    });

    const result = await response.json();
    console.log(result.code);
    if (result.code == 1) {
        window.location.href = "/auth/email/request";
    }

}