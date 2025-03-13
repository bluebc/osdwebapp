function requestAuthMail() {

    sendAuthMailForId();

    // DB user 정보에서 일치하는 메일 찾기
    // 비번찾기는 변경으로 진행
}

async function sendAuthMailForId() {

    var email = document.getElementById("email").value;

    const response = await fetch("/find/id/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email })
    });

    const result = await response.json();

    if (result.status == 1) {
        window.location.href = "/find/emailAuth";
    }
}

async function emailAuth() {
    var emailAuthCode = document.getElementById("emailAuthCode").value;
    const response = await fetch("/find/postEmailAuthCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auth_code: emailAuthCode })
    });

    const result = await response.json();
    if (result.status == 1) {
        window.location.href = "/find/id/found";
    }
}
