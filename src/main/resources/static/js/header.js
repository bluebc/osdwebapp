
$(document).ready(function () {

    const $loginButtons = $(".loginBtn"); // 로그인 버튼
    const $signupButtons = $(".signupBtn"); // 회원가입 버튼
    const $hdUtilDiv = $(".hd_util"); // 헤더 알람 버튼

    // 로그인 버튼 클릭 이벤트
    $loginButtons.on("click", function (event) {

        event.preventDefault();
        window.dispatchEvent(new Event("storage"));

        // 로그인 여부 세션 확인
        // sessioncheck.js 함수사용
        sessionCheck("headerLogin");
    });


    // 회원가입 버튼 클릭 이벤트
    $signupButtons.on("click", function (event) {

        event.preventDefault();
        // 다른 파일에서도 즉시 반영되도록 이벤트 발생
        window.dispatchEvent(new Event("storage"));

        // 로그인 여부 세션 확인
        // sessioncheck.js 함수사용
        sessionCheck("headerSignup");
    });

    headerPageInit();

}); // document.ready end

async function headerPageInit() {
    // sessioncheck.js 함수사용
    var isLoggedIn = await sessionCheck("isLoggedIn") === true;
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
