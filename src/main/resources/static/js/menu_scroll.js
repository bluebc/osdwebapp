//메뉴 클릭시 자연스러운 스크롤 이동

$(document).ready(function($) {
    $(".scroll").click(function(){
    /* event.preventDefault(); */
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000);
    });
    });



// function selectLink(link) {
    
//     // 클릭된 링크에 대해 추가적인 작업을 여기서 처리합니다.
//     console.log(link); // 예시로 클릭된 링크를 출력
//     // 예: 링크에 "active" 클래스를 추가하여 스타일 변경
//     $(".menu_style a").removeClass("active"); // 기존 active 클래스 제거
//     $(link).addClass("active"); // 클릭된 링크에 active 클래스 추가
// }