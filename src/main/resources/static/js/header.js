$(document).ready(function () {

    const $loginButtons = $(".loginBtn"); // 로그인 버튼
    const $signupButtons = $(".signupBtn"); // 회원가입 버튼
    const $hdUtilDiv = $(".hd_util"); // 헤더 알람 버튼


    // 로그인 버튼 클릭 이벤트
    $loginButtons.on("click", function (event) {

        event.preventDefault();
        // isLoggedIn = !isLoggedIn;
        localStorage.setItem("isLoggedIn", isLoggedIn);
        // updateHeaderUI();

        // 다른 파일에서도 즉시 반영되도록 이벤트 발생
        window.dispatchEvent(new Event("storage"));

        // ++ 로그인 여부 세션 확인
        sessionCheck("header");
    });

    // updateHeaderUI();
    headerPageInit();

}); // document.ready end


async function headerPageInit() {
    var isLoggedIn = await sessionCheck() === true;
    localStorage.setItem("isLoggedIn", isLoggedIn);
    updateHeaderUI(isLoggedIn);
}

function updateHeaderUI(isLoggedIn) {

    const $loginButtons = $(".loginBtn"); // 로그인 버튼
    const $signupButtons = $(".signupBtn"); // 회원가입 버튼
    const $hdUtilDiv = $(".hd_util"); // 헤더 알람 버튼

    if (isLoggedIn) {
        $loginButtons.text("로그아웃");
        $signupButtons.text("내정보");
        $hdUtilDiv.css("visibility", "visible");
    } else {
        $loginButtons.text("로그인");
        $signupButtons.text("회원가입");
        $hdUtilDiv.css("visibility", "hidden");
    }
}


// GNB 메뉴 관련 코드
$(document).ready(function () {
    const opTitle = document.querySelector('.group_option .select_op');
    const opList = document.querySelector('.group_option .op_list');

    opTitle.addEventListener('click', function () {
        opList.classList.toggle('on');
    });

    opList.addEventListener('click', function (event) {
        if (event.target.tagName !== 'BUTTON') return false;
        opTitle.innerText = event.target.innerText;
        opList.classList.remove('on');
    });
});

// 로그인 세션 확인
async function sessionCheck(page) {

    const response = await fetch("/getsession", {
        method: "POST"
    });
    const result = await response.json();

    var isLoggedIn = result.isLoggedIn === true;

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
        default:
            return isLoggedIn;
    }
}