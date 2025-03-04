//메뉴 클릭시 자연스러운 스크롤 이동

$(document).ready(function($) {
    $(".scroll").click(function(){
    /* event.preventDefault(); */
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000);
    });
    });
