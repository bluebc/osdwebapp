// 로그인 세션 확인
async function sessionCheck(request) {

    const response = await fetch("/getsession", {
        method: "POST"
    });
    const result = await response.json();

    var isLoggedIn = result.isLoggedIn === true;
    result.isLoggedIn = isLoggedIn;

    switch (request) {
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
                // window.location.href = "/mypage";
                window.location.href = "/user/info";
            }
            break;
        case "headerSignup":
            if (isLoggedIn != true) {
                window.location.href = "/signup";
            } else {
                // window.location.href = "/mypage";
                window.location.href = "/user/info";
            }
            break;
        case "isLoggedIn":
            return isLoggedIn;
        case "getId":
            return result.id;
        default:
            return result;
    }
}