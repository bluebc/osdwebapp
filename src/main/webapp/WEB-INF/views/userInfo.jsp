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
        <div class="snbContainer"> 
            <div class="title"><h1>내 정보</h1></div>
            <div id = "supportTypeBtnSection" class="snbMenu">
                <div class="snb-btn">
                    <input type = "button" value = "프로필" onclick = "">
                </div>
                <div class="snb-btn">
                    <input type = "button" value = "내정보" onclick = "">
                </div>
                <div class="snb-btn">
                    <input type = "button" value = "비밀번호변경" onclick = "">
                </div>
                <div class="snb-btn">
                    <input type = "button" value = "회원탈퇴" onclick = "">
                </div>
            </div>
        </div> 


        <div class="lnbContainer">

            <%-- 프로필 profile --%>
            <div class="contents-box" >
                <div id="profileContent" >
                    <div class=title>
                        <h2>프로필 수정</h2>
                        <p class="contxt">대표 프로필과 아이디를 수정 하실 수 있습니다.</p>
                    </div>
                    
                    <form>          
                        <fieldset>
                            <table  class="tbl_model">
                                <caption><span class="blind">프로필 수정</span></caption>
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
                                            <div class="thcell"><label for="inpNickname">아이디</label></div>
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

            <%-- 내정보 my information --%>
            <div  class="contents-box">
                <div id="myInfo">
                    <div class=title>
                        <h2>회원정보 수정</h2>
                    </div>

                    <div class="formList edit">
                        <table>
                            <caption>나의 정보 항목</caption>
                            <colgroup>
                                    <col style="width: 20%;">
                                    <col>
                            </colgroup>

                            <tbody>
                                <tr>
                                    <th>이름</th>
                                    <td>관리자</td>
                                </tr>

                                <tr>
                                    <th>휴대폰번호</th>
                                    <td>
                                        010-0000-0000
                                        <span class="btn">
                                            <button type="button" class="txtLink"><span>휴대폰번호 변경</span></button>
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <th>이메일</th>
                                    <td>aaaaa@naver.com</td>
                                </tr>
                                    
                                <tr class="form-item-address">
                                    <th><label for="zipPostNo">주소</label></th>
                                    <td>
                                        <div class="form-cont">
                                            <div class="m_address">
                                                <div class="address_postcode">
                                                    <input type="text" id="user_postcode"readonly="readonly" placeholder="우편번호">
                                                    <input type="button" onclick="sample6_execDaumPostcode()" value="우편번호검색"><br>
                                                </div>
                                                <div class="address_input">
                                                    <div class="member_warning">
                                                        <input type="text" id="user_addr"  readonly="readonly" placeholder="기본주소"><br>
                                                    </div>
                                                    <div class="member_warning js_address_sub">
                                                        <input type="text" id="user_detail" placeholder="상세주소">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr class="lineSection">
                                        <th>정보/이벤트 활용동의</th>
                                        <td>
                                            <div class="formchkArea">
                                                <span class="checkbox"><input type="checkbox" id="emailAgree">
                                                    <label for="emailAgree">이메일</label>
                                                </span>
                                                <span class="checkbox">
                                                    <input type="checkbox" id="smsAgree">
                                                    <label for="smsAgree">SNS</label>
                                                </span>
                                                <button type="button" class="txtLink">내용보기</button>
                                            </div>

                                            <p class="listTxt">회원정보 구매정보 및 서비스 주요 정책관련 내용은 수신 동의 여부와 관계 없이 발송 됩니다.</p>
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="boxBtn">
                        <button type="submit" class="btnBasic">
                            <span>확인</span>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>

<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>

</body>
</html>