<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<%-- index.html --%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/index.css">

<script src ="${pageContext.request.contextPath}/js/cunsultList.js"></script>

</head>
<body>
<div class="notice-board">
    <div class="content">
        <h2>상담 & 게시판 글쓰기</h2>

        <hr class ="hr1" noshade> 

        <form>
            <span> ▷ 총 n개의 게시물이 있습니다. </span>
        </form>

        <table id = "cunsultListTable">
            <tr>
                <!-- <th>번호</th> -->
                <th>&nbsp;</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
            </tr>
            <tr>
                <td class="center">1</td>
                <td class="left"><a href="#">게시글 1 입니다. <span>[1]</span></a></td>
                <td class="center">세모세모</td>
                <td class="center">2025-04-01</td>
                <td class="center">15</td>   
            </tr>
            <tr>
                <td class="center">2</td>
                <td class="left"><a href="#">게시글 2 입니다. <span>[5]</span></a></td>
                <td class="center">네모네모</td>
                <td class="center">2025-04-01</td>
                <td class="center">15</td>   
            </tr>
            <tr>
                <td class="center">3</td>
                <td class="left"><a href="#">게시글 3 입니다. <span>[63]</span></a></td>
                <td class="center">동글동글</td>
                <td class="center">2025-04-01</td>
                <td class="center">15</td>   
            </tr>
            <tr>
                <td class="center">4</td>
                <td class="left"><a href="#">게시글 4 입니다. <span>[11]</span></a></td>
                <td class="center">네모네모</td>
                <td class="center">2025-04-01</td>
                <td class="center">15</td>   
            </tr>
            <tr>
                <td class="center">5</td>
                <td class="left"><a href="#">게시글 5 입니다. <span></span></a></td>
                <td class="center">동글동글</td>
                <td class="center">2025-04-01</td>
                <td class="center">15</td>   
            </tr>
        </table>

        <div class="writing";>
            <input type="button" value="글쓰기"  class="writing-btn" onclick="goCunsultWrite()">
        </div>

        <div class="pagination" id = "cunsultPaging" >
            <a href  = "#">◀</a> 
            <a href  = "#">1</a>  
            <a href  = "#">▶</a>
        </div>




        <form class="search-paging";>
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


</body>
</html>