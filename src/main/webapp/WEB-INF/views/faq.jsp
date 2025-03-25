<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<head>

    <title>오생단</title>

<script src = "${pageContext.request.contextPath}/js/faq.js"></script>
</head>
<body>

<h3>자주하는 질문</h3>

<input type = "text" id = "keyword" placeholder = "질문을 입력하세요">
<input type = "button" id = "searchButton" value = "검색" onclick = "searchQuestion()">

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


<%-- 현재 선택한 카테고리 시각효과 --%>
<div id = "selectCategory">
   <%-- <div class="category-btn">카테고리 1</div>
    <div class="category-btn">카테고리 2</div> --%>
</div>

<br><br><br><br>

<style>
.faq {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    max-width: 400px;
}

.faq_subject {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.faq_content {
    font-size: 14px;
    color: #666;
}
</style>

<div id = "faqList">

    <%-- <div class = "faq">
        <div class = "faq_subject">11</div>
        <div class = "faq_content">내용</div>
    </div>
    <div class = "faq">
        <div class = "faq_subject">22</div>
        <div class = "faq_content">내용</div>
    </div> --%>

</div>





</body>

