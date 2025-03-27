

// id=52prog 52프로젝트
$(document).ready(function(){
  if ($(".swiper-container3").length === 0) {
      console.error("swiper-container3 요소가 없음!");
      return;
  }  
  var swiper3 = new Swiper(".swiper-container3", {
    loop: true,
    slidesPerView: 3,
    slidesOffsetBefore: 70,
    slidesOffsetAfter: 20,
    centeredSlides: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    on: {
      beforeInit:slideClone,
      //init: slideClone, 
    },
    breakpoints: {
    1440:{
      spaceBetween: 300,
      slidesPerView: 3,
      slidesOffsetBefore: 0,
    },  
    1024: {
      spaceBetween: 200,
      slidesPerView: 2,
      slidesOffsetBefore: 200,
    },
    769:{
      spaceBetween: 0,
      slidesPerView: 1,
      slidesOffsetBefore: 100,
      slidesOffsetAfter: 0,
    }
    }
  });  

});


// id="event" 이벤트&행사 
$(document).ready(function(){
    var swiper2 = new Swiper(".swiper-container2", {
      loop:true,
      slidesPerView: 5,
      spaceBetween: 300,
      centeredSlides: true,
      breakpoints: {
        // 화면의 넓이가 768px 
        1440:{
          slidesPerView: 3,
          spaceBetween: 200,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 200,
        },
        340: {
          slidesPerView: 1
        },
        
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      on:{
        // 1. 초기화 이전에 슬라이드 복제
        beforeInit:slideClone,
      }
    })
});


/* 1. 초기화 이전에 슬라이드 복제 */
function slideClone(tg){
  var swiperWrapper = tg.el.querySelector('.swiper-wrapper');
  var slides = swiperWrapper.querySelectorAll('.swiper-slide');

  // 복제하여 붙여넣기
  for (var i = 0; i < slides.length; i++) {
    var clone = slides[i].cloneNode(true);
    swiperWrapper.appendChild(clone);
  }
} // slideClone()

/* 2. 활성 pagination 순환하기 */
function swiperPaginationLoop(instance){
  var currentIndex = instance.realIndex;
  // var slidesPerView = instance.params.slidesPerView;
  var loopedSlides = instance.slides.length / 2;

  // index가 루프할 슬라이드 개수를 초과하면
  if (currentIndex >= loopedSlides) {
    currentIndex -= loopedSlides; // 0번 인덱스로
  }

  // index pagination 활성화
  $(instance.pagination.bullets[currentIndex]).addClass('swiper-pagination-bullet-active');
}

/* 3. 루프할 슬라이드를 초과하는 pagination 숨기기 */
function paginationOverflow(index, className){
  // console.log(index);
  // console.log(this.slides.length);
  if (index > this.slides.length / 2 - 1) {
    return '';
  } else {
    return '<span class="' + className + '"></span>';
  }
}


