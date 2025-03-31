<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
<title>오생단</title>
<script src = "${pageContext.request.contextPath}/js/supportQnaList.js"></script>
</head>
<body>
<h3>QNA</h3>


<div id = "qnaList">
<table border = "1" id = "qnaListTable">
<tr>
<td>테스트1</td>
<td>테스트2</td>
<td>테스트3</td>
</tr>

</table>

<style>
.qnaPage {
    display: inline-block; /* 인라인 블록 요소로 만들어 가로 정렬 */
    margin-right: 10px; /* 요소 간 간격 */
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    text-align: center;
    width: 50px;
}
</style>

<div id = "qnaListPaging">
1 2 3 4 5 6 7 8 9 10
</div>

</div>






</body>
</html>
