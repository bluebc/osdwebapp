<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko" dir="ltr">

<!-- meta  -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<head>
    <title>회원가입</title>

    <!-- css -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/signup.css">

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src = "${pageContext.request.contextPath}/js/signup.js"></script>

</head>
<body>

<!-- header -->
<jsp:include page="header.jsp"></jsp:include>

<div class="container">
    <div class="content">
            <div class="fromSignup">회원가입</div>

            <div id="signupSection" class="memberWrap">
                    <!-- 필수입력사항 -->
                    <div class="required">
                        <span class="symbol">*</span> 필수입력사항
                    </div>

                    <div class="list-form-area">
                        <!-- 아이디 -->
                        <div class="form-item">
                            <div class="form-tit">
                                <label class="title">아이디<span class="symbol">*</span></label>
                            </div>

                            <div class="form-cont">
                                <div class="cont-box">
                                    <div class="save-inp">
                                        <input type="text" id="user_id" name="user_id" placeholder="아이디를 입력해주세요"
                                            data-testid="input-box" minlength="6" maxlength='16' oninput="handleInputLength(this, 6,16)">
                                        <%-- <button type="button" class="btn-point">중복확인</button> --%>
                                    </div>
                                    <p class="validator">최소 6자 이상 15자 이하의 영문 혹은 영문과 숫자를 조합</p>
                                </div>
                            </div>

                            <div class="blank-space">
                                <input type="button" id="confirmId" class="btn-point" value="중복확인" onclick="idcheck()">
                            </div>
                            <input type="hidden" id="IdCheck" name="IdCheck" value=0>
                        </div>
                        <!-- 비밀번호 -->
                        <div class="form-item">
                            <div class="form-tit">
                                <label class="title">비밀번호<span class="symbol">*</span></label>
                            </div>

                            <div class="form-cont">
                                <div class="cont-box">
                                    <div class="save-inp">
                                        <input type="password" id="user_pw" name="user_pw" placeholder="비밀번호를 입력해주세요"
                                            data-testid="input-box" minlength="8" maxlength='20' oninput="handleInputLength(this, 8,20)">
                                    </div>
                                    <p class="validator">최소 8자 이상 20자 이하 입력</p>
                                    <p class="validator">영문/숫자/특수문자(공백 제외)만 허용하며, 세가지 문자 전부 조합</p>
                                </div>
                            </div>

                            <div class="blank-space"></div>
                        </div>
                        <div class="form-item">
                            <div class="form-tit">
                                <label class="title">비밀번호 확인<span class="symbol">*</span></label>
                            </div>

                            <div class="form-cont">
                                <div class="cont-box">
                                    <div class="save-inp">
                                        <input type="password" id="user_pw2" name="user_pw2" placeholder="비밀번호를 한번더 입력해주세요"
                                            data-testid="input-box" minlength="8" maxlength='20' oninput="handleInputLength(this, 8,20)">
                                    </div>
                                    <p class="validator">비밀번호 재입력 확인</p>
                                </div>
                            </div>

                            <div class="blank-space"></div>
                        </div>
                        <!-- 이름 -->
                        <div class="form-item">
                            <div class="form-tit">
                                <label class="title">이름<span class="symbol">*</span></label>
                            </div>

                            <div class="form-cont">
                                <div class="cont-box">
                                    <div class="save-inp">
                                        <input type="text" id="user_name" name="user_name" placeholder="이름을 입력해주세요"
                                            data-testid="input-box" maxlength='7'>
                                    </div>
                                    <p class="validator">한글만 가능,공백불가</p>
                                </div>
                            </div>

                            <div class="blank-space"></div>
                        </div>
                        <!-- 휴대폰 -->
                        <div class="form-item">
                            <div class="form-tit">
                                <label class="title">휴대폰<span class="symbol">*</span></label>
                            </div>

                            <div class="form-cont">
                                <div class="cont-box">
                                    <div class="save-inp">
                                        <input type="text" id="user_hpno" name="user_hpno" placeholder="- 없이 숫자만 입력해주세요."
                                            data-testid="input-box" pattern="\d*" minlength="10" maxlength="11" oninput="handleInputLength(this, 10,11)">
                                        <!-- <div class="number-box">
                                            <button class="number-btn" type="button" disabled="">
                                                <span class="number-spn">인증번호 받기</span>
                                            </button>
                                        </div> -->
                                    </div>
                                </div>
                            </div>

                            <div class="blank-space"></div>
                        </div>
                        <!-- 이메일 -->
                        <div class="form-item">
                            <div class="form-tit">
                                <label class="title">이메일<span class="symbol">*</span></label>
                            </div>

                            <div class="form-cont">
                                <div class="cont-box">
                                    <div class="save-inp">
                                        <div class="mail-box">
                                            <input type="hidden" id="user_email" name="user_email" value="">
                                            <!-- 사용자 입력 (아이디 부분) -->
                                            <input type="text" id="user_emailId" name="user_emailId" placeholder="예: uniwell" required class="email-inp">  
                                            <div class="at-sign">@</div>
                                            <div class="down-but">
                                                <button type="button" class="btn-text empty">선택하기</button>
                                                <button type="button" class="btn-select">
                                                    <img src="/img/arrowdown.svg" alt="arrow-down">
                                                </button>
                                            </div>
                                            <!-- 드롭다운 -->
                                            <div class="dropdown-btn">
                                                <button type="button" class="dropdown-item" data-value="naver.com">naver.com</button>
                                                <button type="button" class="dropdown-item" data-value="gmail.com">gmail.com</button>
                                                <button type="button" class="dropdown-item" data-value="hanmail.net">hanmail.net</button>
                                                <button type="button" class="dropdown-item" data-value="kakao.com">kakao.com</button>
                                                <button type="button" class="dropdown-item" data-value="daum.net">daum.net</button>
                                                <button type="button" class="dropdown-item" data-value="custom">직접 입력</button>
                                            </div>

                                            <%-- <input type="text" id="custom_email" name="custom_email" placeholder="도메인 입력" class="email-inp" style="display: none;"> --%>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="blank-space"></div>
                        </div>
                        <!-- 주소 -->
                        <div class="form-item">
                            <div class="form-tit">
                                <label class="title">주소<span class="symbol">*</span></label>
                            </div>

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

                            <div class="blank-space"></div>
                        </div>
                        <!-- 생년월일 -->
                        <div class="form-item">
                            <div class="form-tit">
                                <label class="title">생년월일<span class="symbol">*</span></label>
                            </div>

                            <div class="form-cont">
                                <div class="cont-box">
                                    <div class="date-bundle" >
                                        <div class="box-date">
                                            <div height="40" >
                                                <input type="text" id="user_birthy" name="birthYear" placeholder="YYYY" data-testid="input-box"
                                                    height="40" value="" minlength="4" maxlength='4' oninput="handleInputLength(this, 4,4)" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');">
                                            </div>
                                        </div>
                                        <span class="slash"></span>

                                        <div class="box-date">
                                            <div height="40" >
                                                <input type="text" id="user_birthm" name="birthMonth" placeholder="MM" data-testid="input-box"
                                                    height="40" value="" minlength="2" maxlength='2' oninput="handleInputLength(this, 2,2)" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');">
                                            </div>
                                        </div>
                                        <span class="slash"></span>

                                        <div class="box-date">
                                            <div height="40">
                                                <input type="text" id="user_birthd" name="birthDay" placeholder="DD" data-testid="input-box"
                                                    height="40" value="" minlength="2" maxlength='2'oninput="handleInputLength(this, 2,2)" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');">
                                            </div>
                                        </div>
                                    </div>    
                                </div>
                            </div>

                            <div class="blank-space"></div>
                        </div>
                        <!-- 성별 -->
                        <div class="form-item">
                            <div class="form-tit">
                                <label class="title">성별<span class="symbol">*</span></label>
                            </div>

                            <div class="form-cont">
                                <div class="cont-box">
                                    <div class="box-gender">
                                        <label class="gender-element" for="gender-man">
                                            <input type="radio" id="gender-man" name="gender" class="gman"
                                                data-testid="radio-MALE" value="MALE">
                                            <span class="r-blank">
                                                <div class="r-check"></div>
                                            </span>
                                            <span aria-labelledby="gender-all">남자</span>
                                        </label>

                                        <label class="gender-element" for="gender-woman">
                                            <input type="radio" id="gender-woman" name="gender" class="gwoman"
                                                data-testid="radio-FEMALE" value="FEMALE">
                                            <span class="r-blank">
                                                <div class="r-check"></div>
                                            </span>
                                            <span aria-labelledby="gender-all">여자</span>
                                        </label>

                                    </div>
                                </div>
                            </div>

                            <div class="blank-space"></div>
                        </div>
                    </div>

                    <div class="lineDivide"></div>

                    <!-- 이용약관 -->
                    <div class="t-c">
                        <div class="tcFrom">
                            <div class="tcAgreement">
                                <label class="tcLab">
                                    이용약관동의<span class="symbol">*</span>
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="chk_all">
                                <label for="chk_all">모두 동의합니다</label>
                            </div>

                            <div>
                                <input type="checkbox" name="service" id="service" class="chk_each">
                                <label for="service">서비스 이용약관 동의 (필수)</label>
                            </div>
                            <div id="list" class="section"></div>
                            <div>
                                <textarea>본 약관은 ...</textarea>
                            </div>

                            <div>
                                <input type="checkbox" name="event" id="event" class="chk_each">
                                <label for="event">이벤트 알림 동의 (선택)</label>
                            </div>

                            <div>
                                <textarea>본 약관은 ...</textarea>
                            </div>

                            <div>
                                <input type="checkbox" name="event" id="event" class="chk_each">
                                <label for="age14">본인은 만 14세 이상입니다. <span>(필수)</sapn></label>
                            </div>
                        </div>
                    </div>

                    <!-- 가입버튼 -->
                    <div class="signUpButton">
                        <button class="join" type="submit" width="240" height="56" radius="3" onclick="signup()">
                            <span>가입하기</span>
                        </button>
                    </div>

            </div>
    </div>
</div>

<!-- footer -->
<%-- <jsp:include page="footer.jsp"></jsp:include> --%>


</body>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</html>