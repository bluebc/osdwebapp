
// 로그인 상태 UI 갱신 함수
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

// 세션 확인 후 헤더 UI 초기화
async function headerPageInit() {
    var isLoggedIn = await sessionCheck("isLoggedIn") === true;
    localStorage.setItem("isLoggedIn", isLoggedIn);
    updateHeaderUI(isLoggedIn);
}

// 문서 준비 완료 시 실행
$(document).ready(function () {
    console.log("스크립트 실행됨");

    // 로그인 버튼 클릭 이벤트
    $(".loginBtn").on("click", function (event) {
        event.preventDefault();
        window.dispatchEvent(new Event("storage"));
        sessionCheck("headerLogin");
    });

    // 회원가입 버튼 클릭 이벤트
    $(".signupBtn").on("click", function (event) {
        event.preventDefault();
        window.dispatchEvent(new Event("storage"));
        sessionCheck("headerSignup");
    });

    // GNB 메뉴 토글
    const opTitle = document.querySelector('.group_option .select_op');
    const opList = document.querySelector('.group_option .op_list');

    if (opTitle && opList) {
        opTitle.addEventListener('click', function () {
            opList.classList.toggle('on');
        });

        opList.addEventListener('click', function (event) {
            if (event.target.tagName !== 'A') return false;
            opTitle.innerText = event.target.innerText;
            opList.classList.remove('on');
        });
    }

    // 스크롤 시 배경색 바꾸기
    $(window).on("scroll", function () {
        const $headerAll = $(".hd_all");
        if ($(window).scrollTop() > 10) {
            $headerAll.addClass("scrolled");
        } else {
            $headerAll.removeClass("scrolled");
        }
    });

    // 초기 로그인 상태 반영
    headerPageInit();
});
