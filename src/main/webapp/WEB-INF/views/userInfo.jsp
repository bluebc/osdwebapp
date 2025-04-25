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
                    <input type = "button" value = "회원정보" onclick = "">
                </div>
                <div class="snb-btn">
                    <input type = "button" value = "비밀번호변경" onclick = "">
                </div>
                <div class="snb-btn">
                    <input type = "button" value = "지사찾기" onclick = "">
                </div>
                <div class="snb-btn">
                    <input type = "button" value = "회원탈퇴" onclick = "">
                </div>
            </div>
        </div> 


        <div class="lnbContainer">

            <%-- 프로필 profile --%>
            <div class="contents-box" >
                <div id="myProfile" >
                    <div class=title>
                        <h2>프로필 수정</h2>
                        <p class="contxt">대표 프로필과 닉네임을 수정하실 수 있습니다.</p>
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
                                    <th>아이디</th>
                                    <td>adad</td>
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
            
            <div class="contents-box">
                <div id="myPassword">
                    <div class="title">
                        <h2>비밀번호 변경</h2>
                        <p >고객님의 소중한 정보를 보호하기 위하여 새로운 비밀번호로 변경 후 서비스를 이용해 주세요.</p>
                    </div>

                    <div class="cont_area">
                        <div class="login_sec">
                            <!-- 비밀번호 입력 홈 -->
                            <div class="member_info">
                                <div class="table_col">
                                    <table>
                                        <caption>비밀번호 변경을 위한 새 비밀번호, 새 비밀번호 확인 입력을 나타냅니다.</caption>
                                        <colgroup>
                                            <col class="title">
                                            <col class="body">
                                        </colgroup>
                                        <tbody>
                                            <tr class="input">
                                                <th scope="row">
                                                    <label for="bef_pwd">현재 비밀번호</label>
                                                </th>
                                                <td>
                                                    <div class="cont-box">
                                                        <div class="input_group">
                                                            <span class="input_txt w250"><input type="password" id="bef_pwd"
                                                                    name="bef_pwd" class="text" placeholder="비밀번호를 입력해주세요."></span>
                                                        </div>
                                                    </div>    
                                                </td>
                                            </tr>
                                            <tr class="input">
                                                <th scope="row">
                                                    <label for="new_pwd">새 비밀번호</label>
                                                </th>
                                                <td>
                                                    <div class="cont-box">
                                                        <div class="input_group">
                                                            <span class="input_txt w250"><input type="password" id="new_pwd"
                                                                    name="new_pwd" class="text" placeholder="새 비밀번호를 입력해주세요."></span>
                                                            <%-- <span class="pwd_lv"><em id="msg_pwd">강도 : 약함</em></span> --%>
                                                        </div>
                                                        <p class="validator">최소 8자 이상 20자 이하 입력</p>
                                                        <p class="validator">영문/숫자/특수문자(공백 제외)만 허용하며, 세가지 문자 전부 조합</p>
                                                    </div>    
                                                </td>
                                            </tr>
                                            <tr class="input">
                                                <th scope="row">
                                                    <label for="new_pwd_check">새 비밀번호 확인</label>
                                                </th>
                                                <td>
                                                    <div class="cont-box">
                                                        <div class="input_group">
                                                            <span class="input_txt w250"><input type="password" id="new_pwd_check"
                                                                    name="new_pwd_check" class="text"
                                                                    placeholder="새 비밀번호를 재입력해주세요."></span>
                                                        </div>
                                                        <p class="validator">최소 8자 이상 20자 이하 입력</p>
                                                        <p class="validator">영문/숫자/특수문자(공백 제외)만 허용하며, 세가지 문자 전부 조합</p>
                                                    </div>      
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- // 비밀번호 입력 홈 -->
                            <!-- 이용안내 -->
                            <div class="box_gray">
                                <dl class="box_info">
                                    <dt>비밀번호 변경 시 유의사항</dt>
                                    <dd>
                                        <ul class="bul_list">
                                            <li class="dot_arr">영문, 숫자, 특수문자를 모두 조합하여 8~20자리를 입력해주세요.</li>
                                            <li class="dot_arr">사용 가능 특수 문자는 !@#$%^&*(),.?":{}|<> 입니다.</li>
                                            <!-- 사용 가능 특수문자 -->
                                            <%-- <li class="dot_arr">아이디와 4자리 이상 동일한 비밀번호는 사용 불가합니다.</li>
                                            <li class="dot_arr">동일문자를 4번 이상 사용할 수 없습니다.</li>
                                            <li class="dot_arr">4자리 이상 연속되는 문자와 숫자는 사용 불가합니다.</li>
                                            <li class="dot_arr">휴대전화번호와 4자리 이상 동일한 비밀번호는 사용 불가합니다.</li>
                                            <li class="dot_arr">생년월일과 4자리 이상 동일한 비밀번호는 사용 불가합니다.</li>
                                            <li class="dot_arr">연속된 자판배열이 4자리 이상 포함된 비밀번호는 사용 불가합니다.</li> --%>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>
                            <!-- // 이용안내 -->
                            <div class="btn_sec">
                                <button type="button" class="btn" onclick="goCancel()">나중에</button>
                                <button type="button" class="btn btn_em" onclick="goChange()">비밀번호 변경</button>
                            </div>
                        </div>
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