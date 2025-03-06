// 로그인 세션 확인
async function sessionCheck(page) {

    const response = await fetch("/getsession", {
        method: "POST"
    });
    const result = await response.json();

    var isLoggedIn = result.isLoggedIn === true;

    switch (page) {
        case "headerLogin":
            if (isLoggedIn != true) {
                window.location.href = "/login";
            } else {
                window.location.href = "/logout";
            }
            break;
        case "footerLogin":
            if (isLoggedIn != true) {
                window.location.href = "/login";
            } else {
                window.location.href = "/mypage";
            }
            break;
        case "headerSignup":
            if (isLoggedIn != true) {
                window.location.href = "/signup";
            } else {
                window.location.href = "/mypage";
            }
            break;
        default:
            return isLoggedIn;
    }
}