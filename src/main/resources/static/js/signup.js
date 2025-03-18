async function signup() {
    var user_id = document.getElementById("user_id");
    if (user_id.value.trim() === "") {
        alert("아이디를 입력해주세요.");
        user_id.focus();
        return;
    }
    if (user_id.value.length < 6) {
        alert("아이디는 6~15자의 영문,숫자로 만들어 주세요.");
        user_id.focus();
        return;
    }

    var user_pw = document.getElementById("user_pw");
    var pwValue = user_pw.value;
    if (user_pw.value == "") {
        alert("패스워드를 입력해주세요.");
        user_pw.focus();
        return;
    }
    if (pwValue.length < 8 || pwValue.length > 20) {
        alert("비밀번호는 최소 8자 이상, 20자 이하로 입력해야 합니다.");
        user_pw.focus();
        return;
    }
    var hasLetter = /[a-zA-Z]/.test(pwValue);
    var hasNumber = /\d/.test(pwValue);
    var hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwValue);

    if (!(hasLetter && hasNumber && hasSpecial)) {
        alert("비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.");
        user_pw.focus();
        return;
    }

    var user_pw2 = document.getElementById("user_pw2");
    if (user_pw.value != user_pw2.value) {
        alert("패스워드(확인)가 일치하지 않습니다.");
        user_pw2.focus();
        return;
    }

    
    var user_name = document.getElementById("user_name");
    if (user_name.value == "") {
        alert("이름을 입력해주세요.");
        user_name.focus();
        return;
    }
    

    var user_hpno = document.getElementById("user_hpno");
    if (user_hpno.value == "") {
        alert("핸드폰 번호를 입력해주세요.");
        user_hpno.focus();
        return;
    }
    if (user_hpno.value.length < 11) {
        alert("핸드폰 번호 11자리를 입력해주세요.");
        user_hpno.focus();
        return;
    }

    var user_email = document.getElementById("user_email");
    if (user_email.value == "") {
        alert("이메일을 입력해주세요.");
        user_email.focus();
        return;
    }

    var user_addr = document.getElementById("user_addr");
    if (user_addr.value == "") {
        alert("주소를 입력해주세요.");
        user_addr.focus();
        return;
    }

    var user_detail = document.getElementById("user_detail");
    if (user_detail.value == "") {
        alert("상세주소를 입력해주세요.");
        user_detail.focus();
        return;
    }

    var user_birthy = document.getElementById("user_birthy");
    if (user_birthy.value.length < 4) {
        alert("출생 연도 4자리 숫자를 입력해주세요.");
        user_birthy.focus();
        return;
    }

    var user_birthm = document.getElementById("user_birthm");
    if (user_birthm.value.length < 2) {
        alert("출생 월 2자리 숫자를 입력해주세요.");
        user_birthm.focus();
        return;
    }

    var user_birthd = document.getElementById("user_birthd");
    if (user_birthd.value.length < 2) {
        alert("출생 일 2자리 숫자를 입력해주세요.");
        user_birthd.focus();
        return;
    }

    // 성별 체크
    if (!genderChkFn()) {
        return;
    }
    
    var user_gender = document.querySelector('input[name="gender"]:checked');

    var createTime = getTime();

    var user_info = {
        user_id: user_id.value,
        user_pw: user_pw.value,
        user_name: user_name.value,
        user_hpno: user_hpno.value,
        user_email: user_email.value,
        user_addr: user_addr.value,
        user_detail: user_detail.value,
        user_birthy: user_birthy.value,
        user_birthm: user_birthm.value,
        user_birthd: user_birthd.value,
        user_gender: user_gender.value,
        user_created_at: createTime,
        user_updated_at: createTime
    };

    var result = await createUser(user_info);

    // result = 1;  // 강제로 한거, 서버 오류 

    switch (result) {
        case -1:
            alert("중복된 아이디 입니다.");
            break;
        case 0:
            alert("DB Error");
            break;
        case 1:
            alert("회원가입 완료!");
            window.location.href = "/login";
            break;
        default:
            alert("Error1");
    }


}


async function createUser(user_info) {
    const response = await fetch("/signup/insertUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user_info),
    });

    // 응답 상태 코드 확인
    if (!response.ok) {
        console.error("서버 오류:", response.status, response.statusText);
        return null;  // 서버에서 오류가 발생한 경우 null 반환
    }


    const result = await response.json();
    return result;
}

function getTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var min = ("0" + date.getMinutes()).slice(-2);
    var sec = ("0" + date.getSeconds()).slice(-2);
    return year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec;
}



// 한글만 입력 - 이름
$(function(){
    $("#user_name").keyup(function (event) {
         regexp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
         v = $(this).val();
         var spaceRegexp = /\s/g;  // 공백 문자
         if (regexp.test(v)) {
             alert("한글만 입력가능 합니다.");
             $(this).val(v.replace(regexp, '').replace(spaceRegexp, ''));
         }
     });
});


// 한글입력 막기 
$(function () {
    $('#user_id, #user_email, #user_emailId').on("input", function () {
        var cleanedVal = $(this).val().replace(/[^a-zA-Z0-9]/g, ''); 
        $(this).val(cleanedVal);
    });
});


// 숫자만 입력 - 핸드폰
$(function(){
    $("#user_hpno").keyup(function (event) {
         regexp = /[^0-9]/gi;
         v = $(this).val();
         if (regexp.test(v)) {
             alert("숫자만 입력가능 합니다.");
             $(this).val(v.replace(regexp, ''));
         }
     });
});


// 유효성 검사-색상변경
document.addEventListener("DOMContentLoaded", function () {
    // 각 입력 필드에 대한 이벤트 리스너 추가
    document.getElementById("user_id").addEventListener("input", validateUserId);
    document.getElementById("user_pw").addEventListener("input", validateUserPw);
    document.getElementById("user_pw2").addEventListener("input", validateUserPw2);
    document.getElementById("user_name").addEventListener("input", validateUserName);

    // 아이디 검증
    function validateUserId() {
        const userId = document.getElementById("user_id").value;
        const validator = document.getElementById("user_id").closest(".cont-box").querySelector(".validator");

        const isValid = /^[a-zA-Z0-9]{6,15}$/.test(userId); 
        updateValidator(validator, isValid, "최소 6자 이상 15자 이하의 영문 혹은 영문과 숫자를 조합");
    }

    // 비밀번호 검증
    function validateUserPw() {
        const password = document.getElementById("user_pw").value;
        const validatorBox = document.getElementById("user_pw").closest(".cont-box");

        // 개별 조건 확인
        const lengthCheck = password.length >= 8 && password.length <= 20;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const noSpaces = !/\s/.test(password); 
        const isValidLength = lengthCheck;
        const isValidContent = hasUpperCase || hasLowerCase && hasNumber && hasSpecialChar && noSpaces; 

        // 각각의 validator 메시지
        const lengthValidator = validatorBox.querySelectorAll(".validator")[0]; // 첫 번째 조건 (길이 체크)
        const contentValidator = validatorBox.querySelectorAll(".validator")[1]; // 두 번째 조건 (영문/숫자/특수문자 조합)

        // 길이 조건에 대한 색상 변경
        updateValidator(lengthValidator, isValidLength, "최소 8자 이상 20자 이하 입력");

        // 내용 조건에 대한 색상 변경
        updateValidator(contentValidator, isValidContent, "영문/숫자/특수문자(공백 제외)만 허용하며, 세가지 문자 전부 조합");
    }

    // 비밀번호 재입력 검증
    function validateUserPw2() {
        const password = document.getElementById("user_pw").value;
        const password2 = document.getElementById("user_pw2").value;
        const validator = document.getElementById("user_pw2").closest(".cont-box").querySelector(".validator");

        const isValid = password2.length > 0 && password === password2;
        updateValidator(validator, isValid, "비밀번호 재입력 확인");
    }

    // 이름 검증
    function validateUserName() {
        const userName = document.getElementById("user_name").value;
        const validator = document.getElementById("user_name").closest(".cont-box").querySelector(".validator");

        const isValid = /^[가-힣]+$/.test(userName); // 한글만, 공백 불가
        updateValidator(validator, isValid, "한글만 가능, 공백 불가");
    }

    // 유효성 검사 후, 조건 메시지와 색상 변경
    function updateValidator(validator, isValid, message) {
        if (isValid) {
            validator.classList.add("valid");
        } else {
            validator.classList.remove("valid");
        }
        validator.textContent = message;
    }
});


// 이메일
document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.querySelector(".btn-select");
    const dropdownMenu = document.querySelector(".dropdown-btn");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const emailInput = document.getElementById("user_emailId");
    const emailHidden = document.getElementById("user_email");
    const btnText = document.querySelector(".btn-text");

    // 직접 입력 필드 생성
    const customEmailInput = document.createElement("input");
    customEmailInput.type = "text";
    customEmailInput.id = "custom_email";
    customEmailInput.name = "custom_email";
    customEmailInput.classList.add("email-inp");
    customEmailInput.style.display = "none";

    // `.btn-text` 위치에 `customEmailInput` 추가
    btnText.parentNode.insertBefore(customEmailInput, btnText);

    // 드롭다운 버튼 클릭 시 메뉴 토글
    dropdownButton.addEventListener("click", () => dropdownMenu.classList.toggle("active"));

    // 드롭다운 항목 클릭 시 처리
    dropdownItems.forEach(item => {
        item.addEventListener("click", function () {
            const selectedDomain = item.textContent;
            if (selectedDomain === "직접 입력") {
                btnText.style.display = "none";
                customEmailInput.style.display = "inline-block";
                customEmailInput.value = "";
                customEmailInput.focus();
            } else {
                btnText.style.display = "inline-block";
                btnText.textContent = selectedDomain;
                customEmailInput.style.display = "none";
                emailHidden.value = emailInput.value + "@" + selectedDomain;
            }
            dropdownMenu.classList.remove("active");
        });
    });

    // 직접 입력 필드 입력 시 hidden input 업데이트
    customEmailInput.addEventListener("input", () => {
        emailHidden.value = emailInput.value + "@" + customEmailInput.value;
    });

    // 이메일 아이디 입력 시 hidden input 업데이트
    emailInput.addEventListener("input", () => {
        let selectedDomain = btnText.textContent;
        if (selectedDomain !== "선택하기" && selectedDomain !== "직접 입력") {
            emailHidden.value = emailInput.value + "@" + selectedDomain;
        } else if (selectedDomain === "직접 입력") {
            emailHidden.value = emailInput.value + "@" + customEmailInput.value;
        }
    });

    // 드롭다운 외부 클릭 시 닫기
    document.addEventListener("click", event => {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("active");
        }
    });
});


// 성별
function genderChkFn() {
    var selectedGender = document.querySelector('input[name="gender"]:checked');

    if (!selectedGender) {
        alert("성별을 선택해주세요.");
        return false;
    }

    if (selectedGender.value !== "MALE" && selectedGender.value !== "FEMALE") {
        alert("성별을 선택해 주세요.");
        return false;
    }

    return true;
}


// 주소 카카오api 
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('user_postcode').value = data.zonecode;
            document.getElementById("user_addr").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("user_detail").focus();
        }
    }).open();
}

// 이용약관
document.addEventListener("DOMContentLoaded", function () {
    const chkAll = document.getElementById("chk_all");
    const chkEach = document.querySelectorAll(".chk_each");

    chkAll.addEventListener("change", function () {
        chkEach.forEach(chk => chk.checked = chkAll.checked);
    });


    chkEach.forEach(chk => {
        chk.addEventListener("change", function () {
            chkAll.checked = [...chkEach].every(chk => chk.checked);
        });
    });
});


