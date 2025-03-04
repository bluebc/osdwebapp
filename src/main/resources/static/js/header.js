
// 로그인 로그아웃
document.addEventListener("DOMContentLoaded", function () {
  const loginButtons = document.querySelectorAll(".loginBtn"); // 모든 로그인 버튼
  const signupButtons = document.querySelectorAll(".signupBtn"); // 모든 회원가입 버튼

  let isLoggedIn = false; // 로그인 상태 변수

  function updateButtons() {
      if (isLoggedIn) {
          loginButtons.forEach(btn => btn.textContent = "로그아웃");
          signupButtons.forEach(btn => btn.textContent = "내정보");
      } else {
          loginButtons.forEach(btn => btn.textContent = "로그인");
          signupButtons.forEach(btn => btn.textContent = "회원가입");
      }
  }

  // 로그인 버튼 클릭 시 모든 버튼 상태 변경
  loginButtons.forEach(button => {
      button.addEventListener("click", function () {
          isLoggedIn = !isLoggedIn; // 상태 변경
          updateButtons(); // 버튼 텍스트 업데이트
      });
  });

  updateButtons(); // 초기 버튼 상태 설정
});


// 메뉴버튼 토글
$(function () {
  $(".m_menu_button").click(function () {
    $(".m_tag, .m_log").animate({ width: "toggle" }, 200);
  });

  
});

// gnb
$(function () {
  $(".gnbgroup").click(function () {
    $(".m_menu").animate({ height: "toggle" }, 200);
  });
});


// 아코디언
  function collapse(element) {
    var before = document.getElementsByClassName("active")[0]               // 기존에 활성화된 버튼
    if (before && document.getElementsByClassName("active")[0] != element) {  // 자신 이외에 이미 활성화된 버튼이 있으면
        before.nextElementSibling.style.maxHeight = null;   // 기존에 펼쳐진 내용 접고
        before.classList.remove("active");                  // 버튼 비활성화
    }
    element.classList.toggle("active");         // 활성화 여부 toggle

    var content = element.nextElementSibling;
    if (content.style.maxHeight != 0) {         // 버튼 다음 요소가 펼쳐져 있으면
        content.style.maxHeight = null;         // 접기
    } else {
        content.style.maxHeight = content.scrollHeight + "px";  // 접혀있는 경우 펼치기
    }
}
$(function () {
    $(".menu-trigger ").click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active-' + 1);
    });
    });
// 


