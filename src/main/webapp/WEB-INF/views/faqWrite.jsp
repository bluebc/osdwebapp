<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>

<head>
    <title>오생단</title>
<script src = "${pageContext.request.contextPath}/js/faq.js"></script>
</head>
<body>

<h3>자주 찾는 질문 업로드</h3>

<div id = "inputSection">

    <select id = "cate_id">
        <option value = "test1">테스트1</option>
        <option value = "test2">테스트2</option>
    </select>
    <br>
    <input type = "text" id = "faq_subject" placeholder = "자주찾는 질문">
    <br>
    <input type = "text" id = "faq_content" placeholder = "자주찾는 질문 답변">
    <br>
    <input type = "text" id = "faq_sort" placeholder = "순서">
    <br>
    <input type = "button" onclick = "postFaq()" value = "FAQ 등록">
</div>





</body>