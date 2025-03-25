<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script src="http://code.jquery.com/jquery-latest.min.js"></script>

<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>

<script type="text/javascript">
$(document).ready(function () {
    $("#result_list").load("/termspage");
});
</script>

</head>
<body>
    this main
			<div id='result_list' class='result_table' style="width:100%;height:530px;overflow:auto">
	
			</div>
</body>
</html>