<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>

    <!-- meta  -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--favicon--->
    <link href="${pageContext.request.contextPath}/img/favicon.ico" rel="icon">

    <!-- css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
    <link rel="stylesheet" href="<c:url value='/css/community.css?ver=1'/>">




    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>

    <title>블로그 형식</title>

</head>

<body>

<!-- header -->
<jsp:include page="header.jsp"></jsp:include>


<main>
    <div class="container">
        <div class="content">
            <div class="snbContainer">
                <div class="title"><h1>비움과 채움 스토리</h1></div>
                <div id = "communityTypeBtnSection" class="snbMenu">
                    <div class="snb-btn">
                            <input type = "button" value = "비움과 채움 스토리" onclick = "">
                    </div>
                    <div class="snb-btn">
                            <input type = "button" value = "키토산 스토리" onclick = "">
                    </div>
                    <div class="snb-btn">
                            <input type = "button" value = "건강 스토리" onclick = "">
                    </div>
                </div>
            </div> 

            <div class="blog-container">

                <div class="form-area">
                    <span class="search">
                        <input type = "text" id = "keyword" class="tf" placeholder = "검색어를 입력하세요">
                        <input type = "button" onclick= "search()" class="btn-search" >
                    </span>
                </div>



                <div class="post">
                    <div class="post-left">
                        <div class="author">
                            <img src="/img/re1.jpg" alt="작성자">
                            <div class="write-time"><h3>작성자</h3><h4>16시간전</h4></div>
                        </div>
                        <!-- 모바일에서만 보일 이미지 -->
                        <div class="m-thumbnail">
                            <div class="m-imgbox" ><img src="/img/hd-pop.jpg" alt="썸네일"></div>
                            <span class="m-num-photos"><span class="blind">사진 개수</span>30</span>
                        </div>
                        <!-- 모바일에서만 보일 이미지 -->
                        <div class="title">제목</div>
                        <div class="desc">자꾸 생각이 나
                            마음이 소란스러워
                            너는 뭘 하고 있을까
                            편하기만 하던 너였는데 왜
                            그랬는데 왜
                            다르게 보이는지

                            그러게 웃긴 것 같아
                            But it is what it is you know
                            언젠가부터 내 마음의
                            색은 바뀌었어

                            아마 그건 Pink!
                            정말 말도 안 되게
                            이젠 친구로 보이지 않아
                            아직은 Light Pink!
                            더 짙어질까
                            오 나도 궁금해
                            How will this story go on

                            Yeah I know It's weird
                            Cuz you, you are really my best friend
                            종일 구름 위를 걷는 느낌 이 느낌
                            혹시 네가 좋아진 걸까
                            별거 아닌 너의 말에
                            느닷없는 너의 배려에
                            조금씩 들었던 이상한 이 감정

                            물감이 번지듯이 천천히 번져갔던 것 같아
                            아마도 그랬나봐
                            마음 끄트머리에 아직 남아있던
                            우정이라는 그 자리에도
                            이젠 색이 번지고 있어

                            아마 그건 Pink!
                            정말 말도 안 되게
                            이제 친구로 보이지 않아
                            아직은 Light Pink!
                            더 짙어질까
                            오 나도 궁금해
                            How will this story go on

                            내 마음은 Pink!
                            Oh How do you feel
                            너는 내가 어떻게 하는 게 좋겠어
                            알고 싶어
                            What color is your mind
                            이미 내 색깔은 바뀐지 오래야</div>
                        <div class="buttons">
                            <button class="button" onclick="likePost(this)"><i class="fa-regular fa-heart"></i> 좋아요 0</button>
                            <button class="button" onclick="commentPost()"><i class="fa-regular fa-comment-dots"></i>
                                댓글</button>
                        </div>
                    </div>
                    <div class="thumbnail">
                        <div class="thumbnail"><img src="/img/hd-pop.jpg" alt="썸네일"></div>
                        <!-- <span class="num-photos"><span class="blind">사진 개수</span>30</span> -->
                    </div>
                </div>

                <!-- 추가 포스트는 복사해서 사용 -->
                <div class="post">
                    <div class="post-left">
                        <div class="author">
                            <img src="/img/re1.jpg" alt="작성자">
                            <div class="write-time"><h3>작성자</h3><h4>16시간전</h4></div>
                        </div>
                        <!-- 모바일에서만 보일 이미지 -->
                        <div class="m-thumbnail">
                            <div class="m-imgbox"><img src="/img/hd-pop.jpg" alt="썸네일"></div>
                            <span class="m-num-photos">
                                <span class="blind">사진 개수</span>
                                30
                            </span>
                        </div>
                        <!-- 모바일에서만 보일 이미지 -->
                        <div class="title">제목</div>
                        <div class="desc">안에 들어갈 내용물</div>
                        <div class="buttons">
                            <button class="button" onclick="likePost(this)"><i class="fa-regular fa-heart"></i> 좋아요 0</button>
                            <button class="button" onclick="commentPost()"><i class="fa-regular fa-comment-dots"></i>
                                댓글</button>
                        </div>
                    </div>
                    <div class="thumbnail">
                        <div class="thumbnail"><img src="/img/hd-pop.jpg" alt="썸네일"></div>
                        <!-- <span class="num-photos"><span class="blind">사진 개수</span>30</span> -->
                    </div>
                </div>

                <div class="pagination" >
                    <div class="pagenumber selected">1</div>
                    <div class="pagenumber">2</div>
                    <div class="pagenumber">3</div>
                    <div class="pagenumber">4</div>
                    <div class="pagenumber">5</div>
                    <div class="pagenumber">6</div>
                </div>

            </div>





        </div>    
    </div>
</main>

<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>

<%-- <script>
        function likePost(button) {
            let text = button.innerText;
            let count = parseInt(text.match(/\d+/)[0]);
            count++;
            button.innerText = `❤︎ 좋아요 ${count}`;
            console.log('좋아요 카운트');
        }

        function commentPost() {
            alert('댓글 기능은 아직 준비 중입니다!');
        }
</script> --%>

</body>

</html>