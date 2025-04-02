<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<%-- sub2.html --%>
<%-- 글 쓰기 페이지 --%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/sub2.css">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>

<body>
    <form action="#" method="post" enctype="multipart/form-data">
        <table>
            <tr>
                <td>
                    <h2>상담 & 게시판 글쓰기</h2>
                    <hr noshade>
                </td>
            </tr>



            <tr>
                <td class="title">
                    <h3>카테고리</h3>
                    <fieldset>
                        <select>
                            <option value="카테고리"; name="카테고리"; >카테고리를 선택해주세요</option>
                            <option value="카테고리1";name="카테고리1";>카테고리1</option>
                            <option value="카테고리2";name="카테고리2";>카테고리2</option>
                            <option value="카테고리3";name="카테고리3";>카테고리3</option>
                            <option value="카테고리4";name="카테고리4";>카테고리4</option>
                        </select>
                        <input type="text" placeholder="제목을 입력해주세요" name="title">
                    </fieldset>
                </td>
            </tr>

            <tr>
                <td class="comment">
                    <!-- <h3>Comment</h3> -->
                    <div class="text-box">
                        <textarea placeholder="내용을 입력해주세요" name="detail"></textarea>
                    </div>
                </td>
            </tr>

            <tr>
                <td class="imageUpload">
                    <input class="upload-name" value="이미지" placeholder="이미지">
                    <label for="file">이미지찾기</label>
                    <input type="file" id="file" accept="image/*">
                    <hr noshade>
                    <!-- <h3>이미지 업로드</h3>
                    <input type="file" name="image" accept="image/*" id="btn-upload"> -->
                </td>
            </tr>
            
            <tr>
                <td class="register-btn">
                    <input type="submit" value="등록" onclick="">
                    <input type="submit" value="취소" onclick="">
                </td>
            </tr>
        </table>
    </form>

    <script>
        $("#file").on('change', function () {
            var fileName = $("#file").val();
            $(".upload-name").val(fileName);
        });
    </script>

</body>

</html>