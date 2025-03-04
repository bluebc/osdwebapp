// body 내에 header와 footer가 없을 때만 생성
if ($('header').length === 0) {
    $('body').prepend('<header></header>');
}
if ($('footer').length === 0) {
    $('body').append('<footer></footer>');
}

// load()로 중복된 태그가 들어가지 않도록 수정
$('header').load('./pages/inc.html header > *',head);
$('footer').load('./pages/inc.html footer > *');


function head(){
    
    // gnb
    $(function () {
    $(".gnbgroup").click(function () {
      $(".m_menu").animate({ height: "toggle" }, 100);
    });
    });
    
    // // 아코디언
    // function collapse(element) {
    // var before = document.getElementsByClassName("active")[0]               // 기존에 활성화된 버튼
    // if (before && document.getElementsByClassName("active")[0] != element) {  // 자신 이외에 이미 활성화된 버튼이 있으면
    //     before.nextElementSibling.style.maxHeight = null;   // 기존에 펼쳐진 내용 접고
    //     before.classList.remove("active");                  // 버튼 비활성화
    // }
    // element.classList.toggle("active");         // 활성화 여부 toggle

    // var content = element.nextElementSibling;
    // if (content.style.maxHeight != 0) {         // 버튼 다음 요소가 펼쳐져 있으면
    //     content.style.maxHeight = null;         // 접기
    // } else {
    //     content.style.maxHeight = content.scrollHeight + "px";  // 접혀있는 경우 펼치기
    // }
    // }
    // $(function () {
    // $(".menu-trigger ").click(function (e) {
    //     e.preventDefault();
    //     $(this).toggleClass('active-' + 1);
    // });
    // });
    // // 


    // 로그인 로그아웃
    $(document).ready(function () {
      const $loginButtons = $(".loginBtn"); // 모든 로그인 버튼
      const $signupButtons = $(".signupBtn"); // 모든 회원가입 버튼
      const $hdUtilDiv = $(".hd_util"); // 위치, 알람 버튼

      // localStorage에서 로그인 상태 불러오기 (없으면 기본값 false)
      let isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === null) {
          isLoggedIn = false; // 기본값 설정
      } else {
          isLoggedIn = isLoggedIn === "true"; // 문자열 → boolean 변환
      }
  
      function updateButtons() {
          if (isLoggedIn) {
              $loginButtons.text("로그아웃");
              $signupButtons.text("내정보");
              $hdUtilDiv.css("visibility", "visible"); // 보이기 (자리 유지)
          } else {
              $loginButtons.text("로그인");
              $signupButtons.text("회원가입");
              $hdUtilDiv.css("visibility", "hidden"); // 숨기기 (자리는 그대로)
          }
      }
  
      // 로그인 버튼 클릭 시 상태 변경
      $loginButtons.on("click", function (event) {
          event.preventDefault(); // 기본 동작(페이지 이동) 막기
          isLoggedIn = !isLoggedIn; // 상태 변경
          localStorage.setItem("isLoggedIn", isLoggedIn); // 상태 저장
          updateButtons(); // 버튼 상태 업데이트
      });
  
      updateButtons(); // 초기 버튼 상태 설정
  });


  //gnb
  $(document).ready(function(){
      const opTitle = document.querySelector('.group_option .select_op');
      const opList = document.querySelector('.group_option .op_list');
      //리스트 열고 닫기
      opTitle.addEventListener('click',function(){
        opList.classList.toggle('on')
      });
      //리스트 선택 이벤트
      opList.addEventListener('click', function(event){
        if(event.target.tagName !== 'BUTTON') return false;
        opTitle.innerText = event.target.innerText;
        opList.classList.remove('on');
    });

  });
  

}

