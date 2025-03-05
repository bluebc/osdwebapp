// 로그인 세션 확인
async function sessionCheck(page) {
    
    const response = await fetch("/getsession", {
        method: "POST"
    });
    const result = await response.json();

    var isLoggedIn = false;
    if (result.id != null && result.id != "") {
        isLoggedIn = true;
    }

    switch (page) {
        case "header":
            if (isLoggedIn != true) {
                window.location.href = "/login";
            } else {
                window.location.href = "/logout";
            }
            break;
        case "footer":
            if (isLoggedIn != true) {
                window.location.href = "/login";
            } else {
                window.location.href = "/mypage";
            }
            break;
        default :
            return isLoggedIn;
    }
}