<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>마이페이지</title>

    <!-- css -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/userInfo.css">

    <!--favicon--->
    <link href="${pageContext.request.contextPath}/img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src ="${pageContext.request.contextPath}/js/userInfo.js"></script>
    <script src ="${pageContext.request.contextPath}/js/userInfoUpdate.js"></script>
    
</head>
<body>

<!-- header -->
<jsp:include page="header.jsp"></jsp:include>

<div class="container">
    <div class="content">
        <div class=title>
            <h2>프로필 수정</h2>
            <p class="contxt">대표 프로필과 닉네임을 수정 하실 수 있습니다.</p>
        </div>
        
        <form>          
            <fieldset>
                <table  class="tbl_model">
                    <%-- <caption><span class="blind">프로필 수정</span></caption> --%>
                    <colgroup>
                        <col style="width:22%"><col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <div class="thcell">프로필 사진</div>
                            </th>
                            <td>
                                <div class="tdcell">
                                    <div class="profile_photo">
                                        <img id="preview"  src = "/img/user/${user_info.user_img}">
                                        <span class="mask"></span>
                                    </div>

                                    <div class="btn_area_btm">
                                        <span class="btn_file">
                                            <label  for="uploadImage" class="btn_model">
                                                <b id="btnChangeProfile" onclick="clickcr(this,'prf.upimg','','',event);">사진변경</b>
                                            </label>
                                            <input type="file" id="uploadImage" accept="image/*">
                                        </span>
                                    </div>

                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <div class="thcell"><label for="inpNickname">닉네임</label></div>
                            </th>
                            <td>
                                <div class="tdcell">
                                    <p class="contxt_webctrl nickname">
                                        <input type="text" name="nickname" id="user_id" value="${user_info.user_id}" onclick="clickcr(this,'prf.nick','','',event);">
                                        <input type="text" style="display: none;">
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="btn_wrap">
                    <input type="button" value="적용" onclick="applyUpdate()">
                    <input type="button" value="취소" onclick="history.back()">
                </div>

            </fieldset>

            <%-- <input type = "button" value = "수정페이지로 이동" onclick = "goUserInfoUpdate()"> --%>
        </from>

    </div>
</div>

<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>

</body>
</html>