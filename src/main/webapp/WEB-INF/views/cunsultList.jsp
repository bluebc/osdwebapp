<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상담 & 게시판</title>

    <!-- css -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/cunsultList.css">

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src ="${pageContext.request.contextPath}/js/cunsultList.js"></script>

</head>
<body>

    <!-- header -->
    <jsp:include page="header.jsp"></jsp:include>

    <div class="notice-board">
        <div class="content">
            <h2>상담 & 게시판 글쓰기</h2>

            <hr class ="hr1" noshade> 

            <form>
                <span> ▷ 총 <span id = "postCount">n</span>개의 게시물이 있습니다. </span>
            </form>

            <div class="writing">
                <input type="button" value="글쓰기"  class="writing-btn" onclick="goCunsultWrite()">
            </div>


            <table id="cunsultListTable"></table>

            <div class="pagination" id = "cunsultPaging" ></div>

            <form class="search-paging">
                <div class="select-search">
                    <select>
                        <option value="subject" name="subject" >제목</option>
                        <option value="writer" name="writer">작성자</option>
                        <option value="memo" name="memo">내용</option>
                    </select>
                    <input type="text" class="search-box" placeholder="검색어를 입력해주세요" id = "keyword">
                    <input type="button" name="검색" class="search-btn" value="검색" onclick="search()">
                </div>
            </form>
        </div>
    </div>

    <!-- footer -->
    <jsp:include page="footer.jsp"></jsp:include>

</body>
</html>