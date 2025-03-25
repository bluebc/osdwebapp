<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<head>

    <title>오생단</title>

<script src = "${pageContext.request.contextPath}/js/faq.js"></script>
</head>
<body>

<h3>자주하는 질문</h3>

<input type = "text" id = "question" placeholder = "질문을 입력하세요">
<input type = "button" id = "searchButton" value = "검색">

<br><br><br><br>

<%-- css 버튼배치목적 임의 선택 --%>
<style>
    #selectCategory {
        display: flex; /* 가로 정렬 */
        gap: 10px; /* 버튼 사이 간격 */
    }

    .category-btn {
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f8f8f8;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
    }

    .category-btn:hover {
        background-color: #ddd;
        transform: scale(1.05);
    }

    .category-btn:active {
        background-color: #bbb;
        transform: scale(0.95);
    }
</style>


<div id = "selectCategory">
   <div class="category-btn">카테고리 1</div>
    <div class="category-btn">카테고리 2</div>
</div>





</body>

