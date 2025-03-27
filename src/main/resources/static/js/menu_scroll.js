//메뉴 클릭시 자연스러운 스크롤 이동

$(document).ready(function($) {
    $(".scroll").click(function(){
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
        });
    });


// top버튼
$(document).ready(function() { 
    // Top 버튼 특정 스크롤높이에서만 보이기 / 숨기기
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $('#top-btn').fadeIn();
        }else{
            $('#top-btn').fadeOut();
        }
    });
    // Top 버튼 클릭시 페이지 상단으로 이동
    $('#top-btn').click(function(){
        $('html, body').animate({scrollTop : 0}, 800);
        return false;
    });
    
});    

