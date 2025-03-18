// 인증 이메일 요청
async function requestEmail() {

    var user_email = document.getElementById("user_email").value;
    if (user_email == null || user_email == "") {
        alert("이메일을 입력하세요");
        return;
    }

    const result = await postRequest(user_email);
    switch (result.code) {
        case 0:
            alert("서버 오류");
            return;
        case -1:
            alert("이메일과 맞는 회원정보 없음");
            return;
        case -2:
            alert("DB 오류");
            return;
        case -3:
            alert("이메일 발송 실패");
            return;
        case 1:
            alert("인증 이메일이 발송되었습니다.");
            break;
        default:
            alert("script 오류");
            return;
    }
    window.location.href = "/auth/email/verify";
}

// 이메일 요청 보내기
async function postRequest(user_email) {

    const response = await fetch("/auth/email/postRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_email: user_email
        })
    });

    const result = await response.json();

    return result;
}

// 인증코드 입력
async function verifyCode() {

    var auth_code = document.getElementById("auth_code").value;
    if (auth_code == null || auth_code == "") {
        alert("인증코드를 입력하세요");
        return;
    }

    const result = await postVerify(auth_code);
    switch (result.code) {
        case 0:
            alert("서버 오류");
            return;
        case -1:
            alert("인증요청 정보 없음");
            return;
        case -2:
            alert("인증코드 유효기간 만료");
            return;
        case -3:
            alert("이미 인증이 완료된 코드");
            return;
        case -4:
            alert("입력한 인증번호가 틀림");
            return;
        case -5:
            alert("인증 절차 오류");
            return;
        case -6:
            alert("DB 오류");
            return;
        case 1:
            alert("인증 완료");
            break;
        default:
            alert("script 오류")
            return;
    }
    switch (result.auth_purpose) {
        case "find_find_id":
            window.location.href = "/find/result/id";
            break;
        case "find_reset_pw":
            window.location.href = "/find/result/pw";
            break;
    }
}

// 인증코드 보내기
async function postVerify(auth_code) {

    const response = await fetch("/auth/email/postVerify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            auth_code: auth_code
        })
    });

    const result = await response.json();

    return result;
}