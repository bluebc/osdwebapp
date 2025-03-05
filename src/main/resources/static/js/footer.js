$(function () {
    $("div.navi-item").click(function () {
        $(".category_wrap").toggleClass('accordion_op');
    });
});

// 아코디언 기능 
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

        // 모든 아코디언 닫기
        document.querySelectorAll('.accordion-button').forEach(btn => btn.classList.remove('open'));
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.style.maxHeight = '0px';
        });

        // 클릭한 요소만 열기
        if (!isOpen) {
            button.classList.add('open'); // 버튼에 open 클래스 추가
            content.style.maxHeight = content.scrollHeight + 'px'; // 실제 높이만큼 설정
        }
    });
});

// 로그인 UI 업데이트
$(document).ready(function () {
    const $loginContainer = $(".nave-test"); // 푸터 로그인 컨테이너
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

    // 로그인 컨테이너 클릭 이벤트 (한번에 변경)
    $loginContainer.on("click", function (event) {
        event.preventDefault();
        isLoggedIn = !isLoggedIn;
        localStorage.setItem("isLoggedIn", isLoggedIn);
        updateFooterUI();

        // 다른 파일에서도 즉시 반영되도록 이벤트 발생
        window.dispatchEvent(new Event("storage"));
    });

    updateFooterUI();

    // 다른 JS 파일에서 로그인 상태 변경 감지하여 동기화
    window.addEventListener("storage", function () {
        isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        updateFooterUI();
    });
});