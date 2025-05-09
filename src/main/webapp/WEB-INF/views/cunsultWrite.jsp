<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상담 & 게시판 글쓰기</title>

    
    
    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src ="${pageContext.request.contextPath}/js/cunsultWrite.js"></script>
    <script src ="${pageContext.request.contextPath}/js/fileUpload.js"></script>



</head>

<body>

<!-- header -->
<jsp:include page="header.jsp"></jsp:include>

<div class="container">
    <div class="content">
        <form action="#" method="post" enctype="multipart/form-data">
            <input type = "hidden" id = "user_id" value = "${user_id}">
            <table>
                <tr>
                    <td>
                        <h2>상담 & 게시판 글쓰기</h2>
                        <hr noshade>
                    </td>
                </tr>
                
                <tr>
                    <td class="title">
                        <%-- <h3>카테고리</h3> --%>
                        <fieldset>
                            <select>
                                <option value="카테고리"; name="카테고리"; >카테고리를 선택해주세요</option>
                                <option value="카테고리1";name="카테고리1";>카테고리1</option>
                                <option value="카테고리2";name="카테고리2";>카테고리2</option>
                                <option value="카테고리3";name="카테고리3";>카테고리3</option>
                                <option value="카테고리4";name="카테고리4";>카테고리4</option>
                            </select>
                            <input type="text" placeholder="제목을 입력해주세요" name="title" id = "post_subject">
                        </fieldset>
                    </td>
                </tr>

                <tr>
                    <td class="comment">
                        <!-- <h3>Comment</h3> -->
                        <div class="text-box">
                            <%-- <textarea placeholder="내용을 입력해주세요" name="detail" id = "post_content"></textarea> --%>
                            
                            <%-- summernote --%>
                            <div>
                                <div id="summernote" name="editordata"></div>
                            </div>
                        </div>
                    <hr noshade>
                    </td>
                </tr>

                <%-- <tr>
                    <td class="imageUpload">
                        <input class="upload-name" value="이미지" placeholder="이미지">
                        <label for="file">이미지찾기</label>
                        <input type="file" id="file" accept="image/*">
                        <hr noshade>
                        <h3>이미지 업로드</h3>
                        <input type="file" name="image" accept="image/*" id="btn-upload"> 
                    </td>
                </tr> --%>


                <tr>
                    <td>
                        <label for="file">파일 업로드</label>
                        <form id="uploadForm" enctype="multipart/form-data">
                            <input type="file" id="fileInput" name="files" multiple>
                        </form>
                        <hr noshade>
                        <!-- <h3>이미지 업로드</h3>
                        <input type="file" name="image" accept="image/*" id="btn-upload"> -->
                    </td>
                </tr>


                <tr>
                    <td class="register-btn">
                    <%-- before : submit --%>
                        <input type="button" value="등록" onclick="posting()">
                        <input type="button" value="취소" onclick="cancelPosting()">
                    </td>
                </tr>
                
            </table>
        </form>
    </div>
</div>

<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>



    <script>
        $("#file").on('change', function () {
            var fileName = $("#file").val();
            $(".upload-name").val(fileName);
        });
    </script>

</body>

    <%-- summernote --%>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/lang/summernote-ko-KR.js"></script>
    <script src ="${pageContext.request.contextPath}/js/summernote/summernote.js"></script>

    <!-- css -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/cunsultWrite.css">
    
</html>