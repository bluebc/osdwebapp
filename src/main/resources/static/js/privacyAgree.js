$(function () {
    function scrollDisable(){ // body 스크롤 비활성화
        $('body').addClass('scroll-disable').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
        });
      }
      function scrollAble(){ // body 스크롤 활성화
        $('body').removeClass('scroll-disable').off('scroll touchmove mousewheel');
      }
    
      
      $('.toggle').click(function(){
        $('.popup').toggleClass('active');
        if($('.popup').hasClass('active')) {
          scrollDisable();
        } else {
          scrollAble();
        }
      });    


    $("#modal-open").click(() => $("#popup").css("display", "flex").hide().fadeIn(100));
    
    $("#confirm").click(()=>{ console.log('='); });
    $("#confirm").click(() => $("#popup").fadeOut(100));
});