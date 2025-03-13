<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>
    
    <!-- meta  -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- css -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">

    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/index.css">
    
    
    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
    
    <script src="js/menu_scroll.js"></script>
    <script src="js/swiper.js"></script>
    <script src="js/sessioncheck.js"></script>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>



</head>
<body>

    <!-- header -->
    <jsp:include page="header.jsp"></jsp:include>

    <!-- main -->
    <main>
        <!-- 건강스토리 -->
        <section id="health" >
            <div class="content">

                <div class="he-img">
                    <div class="he-bg " style="background-image: url(img/bg.jpg);">
                    </div>

                    <div class="he-box">
                        <div class="he-container">
                            <div class="he-wrapper">
                                <div class="he-sw"><img src="img/he-sw1.jpg" loading="lazy"></div>
                                <div class="he-sw"><img src="img/he-sw2.jpg" loading="lazy"></div>
                                <div class="he-sw"><img src="img/he-sw3.jpg" loading="lazy"></div>
                            </div>
                        </div>

                        <div class="he-tit">
                            <p><span>당</span><span>신</span><span>의</span></p>
                            <P><span>성</span><span>공</span><span>스</span><span>토</span><span>리</span></P>
                        </div>
                    </div>
                    
                </div>

                <div class="he-fix">
                    <h2>TOTAL CARE SPECIALIZING IN HEALTH</h2>
                </div> 
            </div>
        </section>
        <!-- 우리들이야기 -->
        <section id="story" >
            <div class="content">
                <article class="st-flex1">
                    <div class="st-img"><img src="img/st1.jpg"></div>
                    <div class="st-tet" data-aos="fade-up" data-aos-duration="1000">
                        <h2>비움과 채움</h2>
                        <h3>일상에서 누구나 쉽게 실천할 수 있는<br>
                        비움프로그램</h2>
                        <div class="st-more">
                            <a href="#"><span>READ MORE</span></a>
                        </div>
                    </div>
                </article>
                <article class="st-flex2">
                    <div class="st-tet" data-aos="fade-up" data-aos-duration="1000">
                        <h2>건강 코칭</h2>
                        <h3>생활 속 바른 습관을 형성하는<br>
                        토탈 러닝메이트 서비스</h2>
                        <div class="st-more">
                            <a href="#"><span>READ MORE</span></a>
                        </div>
                    </div>
                    <div class="st-img"><img src="img/st2.jpg"></div>
                    
                </article>
                <article class="st-flex3">
                    <div class="st-img"><img src="img/st3.jpg"></div>
                    <div class="st-tet" data-aos="fade-up" data-aos-duration="1000">
                        <h2>생명 나눔</h2>
                        <h3>더불어 사는 사회에서 실천하는 나눔의<br>
                        봉사 프로젝트</h2>
                        <div class="st-more">
                            <a href="#"><span>READ MORE</span></a>
                        </div>
                    </div>
                </article>
                <article class="st-flex4">
                    <div class="st-tet" data-aos="fade-up" data-aos-duration="1000">
                        <h2>휴먼 리셋</h2>
                        <h3>명상, 요가, 피트니스, 여행 등<br>
                        자연 속 휴식과 명상을 통해 함께하는<br>
                        최적의 힐링 설계 서비스</h2>
                        <div class="st-more">
                            <a href="#"><span>READ MORE</span></a>
                        </div>
                    </div>
                    <div class="st-img"><img src="img/st4.jpg"></div>
                </article>
            </div>
        </section>
        <!-- 52프로젝트 -->
        <section id="program52">
            <div class="content">
                <article class="flex-52">
                    <div class="tet-52">
                        <h2>생명 나눔<br>52프로그램</h2>
                    </div>
                    <div class="swiper swiper-container3 ">
                        <div class="swiper-wrapper ">
                        <div class="swiper-slide"><img src="img/52-1.jpg"></div>
                        <div class="swiper-slide"><img src="img/52-2.jpg"></div>
                        <div class="swiper-slide"><img src="img/52-3.jpg"></div>
                        <div class="swiper-slide"><img src="img/52-4.jpg"></div>
                        <div class="swiper-slide"><img src="img/52-5.jpg"></div>
                        </div>
                    </div>
                    <div class="nosw">
                        <div class="nowra">
                            <div class="nogrid"><img src="img/52-1.jpg"></div>
                            <div class="nogrid"><img src="img/52-2.jpg"></div>
                            <div class="nogrid"><img src="img/52-3.jpg"></div>
                            <div class="nogrid"><img src="img/52-4.jpg"></div>
                            <div class="nogrid"><img src="img/52-5.jpg"></div>
                        </div>
                    </div>

                </article>
            </div>
        </section>
        <!-- 쇼핑몰 -->
        <section id="shoppingmall" >
            <div class="content">
                <div class="shop-img"><img src="img/he-sw22.jpg"></div>
                <div class="shop-tet">
                    <div>
                        <h3>나의 하루를 기록하는</h3>
                        <h2>플랫폼 서비스</h2>
                    </div>
                    <h4>일상속에서도 편안하게 관리할 수 있어서 언제 어디서든<br>
                    꾸준함을 유지할 수 있게 도와주는 1:1 서비스</h4>
                    <div class="shop-now">
                        <a href="#">
                            <span>VIEW NOW</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <!-- 리셋프로그램 -->
        <section id="resetprogram">
            <div class="content">
                <div class="rst-tet">
                    <h2>자연 속 휴식과 명상을 통한<br>
                    휴먼 리셋 프로그램</h2>
                    <h4>경제적인 이유로 건강의 사각지대에 놓인<br>
                        차상위 계층을 위한 봉사와 나눔을 실천하는 프로그램</h4>
                    </div>
                <div class="ret-img"><img src="img/re1.jpg"></div>
            </div>
        </section>
        <!-- 고객센터 -->
        <section id="cs" >
            <div class="content">
                <div class="cs-img" style="background-image: url(img/he-sw33.jpg);"></div>
                <div class="cs-tet">
                    <article class="cs-abs1" data-aos="fade-left"  data-aos-duration="500">
                        <h2>체계적인 관리</h2>
                        <h4>기록의 습관을 통해 일상에서도 꾸준하게 관리<br>
                        할 수 있고 체계적인 프로그램을 편하게 관리<br>
                        할 수 있게 제작한 맞춤 서비스</h4>
                    </article>
                    <article class="cs-abs2" data-aos="fade-right"  data-aos-duration="500">
                        <h2>저속노화를 도화주는 건강 체크</h2>
                        <h4>기대 수명이 올라간 현대 사회에서 노화를 늦추는 것은<br>
                        건강한 삶을 영위하는데 필수적인 요소이다.<br>
                        개인의 건강 상태에 맞춰 전문가의 조언과<br>
                        다양한 프로그램을 통해 전반적인 건강을 증진시킨다.</h4>
                    </article>
                </div>
            </div>
        </section>
        <!-- 이벤트&행사 -->
        <section id="event" >
            <div class="content">
                <div class="ev-tet">
                    <h2>체험 후기</h2>
                    <h4>우수 고객들의 성공 스토리</h4>
                </div>
                <div class="swiper swiper-container2">
                    <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="ev-sw-img"><img src="img/he-sw11.jpg"></div>
                        <div class="ev-sw-tet" >
                            <h3>3월 단식중에</h3>
                            <h4>프로그램</h3>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="ev-sw-img"><img src="img/st4.jpg"></div>
                        <div class="ev-sw-tet" >
                            <h3>4월 단식중에</h3>
                            <h4>프로그램</h3>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="ev-sw-img"><img src="img/he-sw22.jpg"></div>
                        <div class="ev-sw-tet" >
                            <h3>5월 단식중에</h3>
                            <h4>프로그램</h3>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="ev-sw-img"><img src="img/he-sw33.jpg"></div>
                        <div class="ev-sw-tet" >
                            <h3>6월 단식중에</h3>
                            <h4>프로그램</h3>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="ev-sw-img"><img src="img/st1.jpg"></div>
                        <div class="ev-sw-tet" >
                            <h3>7월 단식중에</h3>
                            <h4>프로그램</h3>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="ev-sw-img"><img src="img/st2.jpg"></div>
                        <div class="ev-sw-tet" >
                            <h3>8월 단식중에</h3>
                            <h4>프로그램</h3>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
        </section>

        <%-- top버튼 --%>
        <button id="top-btn"> ▲ <br/> TOP </button >

    </main>

    <!-- footer -->
    <jsp:include page="footer.jsp"></jsp:include>


    <!-- AOS라이브러리 -->
    <script> AOS.init(); </script>


</body>

</html>