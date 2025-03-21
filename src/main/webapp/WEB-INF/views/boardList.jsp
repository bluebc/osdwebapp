<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script src = "${pageContext.request.contextPath}/js/board.js"></script>
</head>
<body>

<h3>글 목록 테스트</h3>

<input type = "hidden" id = "currentPage" value = "${currentPage}">
<input type = "hidden" id = "maxPage" value = "${maxPage}">
<input type = "hidden" id = "boardCount" value = "${boardCount}">
<div id = "pagingSection">
<input type = "button" value = "이전" id = "pre1" onclick = "previousList()">
<input type = "button" value = "다음" id = "next1" onclick = "nextList()">
</div>

no / title
<div id = "listSection">

  <c:forEach var="board" items="${boardList}">
        ${board.board_no} / <a href = "/boardread?board_no=${board.board_no}">${board.board_title}</a><br>
    </c:forEach>


</div>


<div id = "pagingSection">
<input type = "button" value = "이전" id = "pre2" onclick = "previousList()">
<input type = "button" value = "다음" id = "next2" onclick = "nextList()">
</div>