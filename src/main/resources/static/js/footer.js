

$(function () {
    $("div.navi-item").click(function () {
        $(".category_wrap").toggle();
    });
});


// 아코디언 기능 (변경 없음)
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const isOpen = content.style.display === 'block';
        document.querySelectorAll('.accordion-content').forEach(item => item.style.display = 'none');
        content.style.display = isOpen ? 'none' : 'block';
    });
});




// 로그인 UI 업데이트
$(document).ready(function () {
    const $loginButtons = $(".loginBtn2"); // 푸터 로그인 버튼
    const $btbAddress = $(".btn-address2 img"); // 푸터 알람 이미지

    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    function updateFooterUI() {
        if (isLoggedIn) {
            $loginButtons.text("나의정보");
            $btbAddress.attr('src', '/img/사람.png?v=' + new Date().getTime());
        } else {
            $loginButtons.text("로그인");
            $btbAddress.attr('src', '/img/로그인.svg?v=' + new Date().getTime());
        }
    }

    // 로그인 버튼 클릭 이벤트
    $loginButtons.on("click", function (event) {
        event.preventDefault();
        // isLoggedIn = !isLoggedIn;
        localStorage.setItem("isLoggedIn", isLoggedIn);
        updateFooterUI();

        // 다른 파일에서도 즉시 반영되도록 이벤트 발생
        window.dispatchEvent(new Event("storage"));

        // ++ 로그인 여부 세션 확인
        sessionCheck("footer");


    });

    updateFooterUI();

    // 다른 JS 파일에서 로그인 상태 변경 감지하여 동기화
    window.addEventListener("storage", function () {
        isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        updateFooterUI();
    });
});

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
    }
}