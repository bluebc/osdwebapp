<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <!-- meta  -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>오생단</title>


    <!-- css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
    <link rel="stylesheet" href="<c:url value='/css/community.css?ver=1'/>">

    <!--favicon--->
    <link href="${pageContext.request.contextPath}/img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>

    <script src = "${pageContext.request.contextPath}/js/communityList.js"></script>


</head>

<body>


<!-- header -->
<jsp:include page="header.jsp"></jsp:include>




<main>
    <div class="container">
        <div class="content">
            <div class="snbContainer">
                <div class="title"><h1 id="pageTitle">비움과 채움 스토리</h1></div>
                <div class="writing">
                    <i class="fa-regular fa-pen-to-square" style="color: #000000;"></i>
                    <input type="button" value="글쓰기"  class="writing-btn" onclick="">
                </div>
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

            <div class="blog-container" id = "blogContainer">

                <div class="form-area">
                    <span class="search">
                        <input type = "text" id = "keyword" class="tf" placeholder = "검색어를 입력하세요">
                        <input type = "button" onclick= "search()" class="btn-search" >
                    </span>
                </div>


                <%-- 페이징 위치 문제로 컨테이너 추가 --%>
                <div class = "postContainer" id = "postContainer">

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
                        <div class="desc">내용</div>
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

                </div> 
                <%-- postContatiner --%>

                <div class="pagination" id = "pagination">
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

<script>
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
</script>

</body>

</html>