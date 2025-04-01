<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
<title>오생단</title>

<script src = "${pageContext.request.contextPath}/js/support.js"></script>
<script src = "${pageContext.request.contextPath}/js/supportQnaList.js"></script>
<script src = "${pageContext.request.contextPath}/js/supportFaqList.js"></script>
</head>
<body>


<h3>SUPPORT</h3>

<div id = "supportTypeBtnSection">

<input type = "button" value = "FAQ" onclick = "setSupportType('faq')">
<input type = "button" value = "QNA" onclick = "setSupportType('qna')">


</div>



<br>
<input type = "text" id = "keyword" placeholder = "검색어 입력">
<input type = "button" onclick= "search()" value = "검색버튼">


<br>
<br>


<style>
.qnaPage {
    display: inline-block; /* 인라인 블록 요소로 만들어 가로 정렬 */
    margin-right: 10px; /* 요소 간 간격 */
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    text-align: center;
    width: 10px;
}
</style>


<div id = "supportContent">



</div>




</body>
</html>
