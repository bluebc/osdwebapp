<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
<title>오생단</title>
</head>
<body>
<h3>SUPPORT</h3>


<br>
<input type = "text" id = "keyword" placeholder = "검색어 입력">
<input type = "button" onclick= "search()" value = "검색버튼">


<br>
<br>

<div id = "listSpace">
<%@ include file="supportQna.jsp" %>
</div>




</body>
</html>
