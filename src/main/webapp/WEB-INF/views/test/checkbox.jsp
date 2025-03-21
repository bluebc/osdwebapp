<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>


<script src = "${pageContext.request.contextPath}/js/test/checkbox.js"></script>
</head>
<body>



<h3>체크박스 테스트</h3>

<div>

박스 1 <input type = "checkbox" id = "checkbox1"> <br>
박스 2 <input type = "checkbox" id = "checkbox2"> <br>
박스 3 <input type = "checkbox" id = "checkbox3"> <br>
박스 4 <input type = "checkbox" id = "checkbox4"> <br>
박스 5 <input type = "checkbox" id = "checkbox5"> <br>

</div>

<br><br>
<input type = "button" value = "체크된 박스 확인" onclick = "getCheckbox()">
<br><br>
<div>
값 출력
<div id = "checkedboxes">
</div>
</div>


</body>
