

// 헤더 슬라이드
$(document).ready(function(){
    var swiper = new Swiper(".swiper-container", {
        allowSlideNex :false,	
        shortSwipes : false,
    })
});


// 메인 슬라이드
$(document).ready(function(){
    var swiper = new Swiper(".swiper-container2", {
        autoplay: {
            delay: 2000, 
            desableOnInteraction: false, 
        },
        pagination: {
            el: '.swiper-container2 .pager',
            type: 'fraction',
          },
      loop: true,
      // 슬라이드가 무한 순환
      slidesPerView: "auto",
      // 슬라이드가 표시되는 갯수를 설정
      freemode: true,
      // 슬라이드가 자유롭게 스와이프 되도록 설정
      observer: true,
    })
});

console.log($('.img-info').length);

