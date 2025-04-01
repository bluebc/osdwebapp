<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
<title>오생단</title>
<script src = "${pageContext.request.contextPath}/js/support.js"></script>
<script src = "${pageContext.request.contextPath}/js/supportFaqList.js"></script>

</head>
<body>


<div id = "supportTypeBtnSection">




</div>


<div id = "search">

<input type = "text" id = "keyword" placeholder = "keyword">
<input type = "button" value = "검색" onclick = "search()">


</div>

<h3>FAQ</h3>


<div id = "faqList">



</div>






</body>
</html>
