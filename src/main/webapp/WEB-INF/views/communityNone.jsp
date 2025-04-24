<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>건강 나눔</title>

    <!-- css -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/cunsultRead.css">

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>


</head>

<body>
    
<!-- header -->
<%-- <jsp:include page="header.jsp"></jsp:include> --%>

없는 글이거나 삭제된 글입니다.
<br><br><br><br><br>
<a href = "/community/list">목록으로 가기</a>
<%-- 버튼으로 처리? --%>

<!-- footer -->
<%-- <jsp:include page="footer.jsp"></jsp:include> --%>



</body>

</html>