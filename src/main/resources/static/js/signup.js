async function signup() {

    var user_id = document.getElementById("user_id");
    if (user_id.value == "") {
        alert("아이디를 입력해주세요.");
        user_id.focus();
        return;
    }

    var user_pw = document.getElementById("user_pw");
    if (user_pw.value == "") {
        alert("패스워드를 입력해주세요.");
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
    var user_addr = document.getElementById("user_detail");
    if (user_addr.value == "") {
        alert("상세주소를 입력해주세요.");
        user_addr.focus();
        return;
    }
    var user_birth = document.getElementById("user_birth");
    if (user_birth.value == "") {
        alert("생년월일을 입력해주세요.");
        user_birth.focus();
        return;
    }
    var user_gender = document.getElementById("user_gender");
    if (user_gender.value == "") {
        alert("성별을 선택해주세요.");
        user_gender.focus();
        return;
    }

var createTime = getTime();

    var user_info = {
        user_id: user_id.value,
        user_pw: user_pw.value,
        user_name: user_name.value,
        user_hpno: user_hpno.value,
        user_email: user_email.value,
        user_addr: user_addr.value,
        user_detail: user_detail.value,
        user_birth: user_birth.value,
        user_gender: user_gender.value,
        //
        user_created_at: createTime,
        user_updated_at: createTime
    };

    var result = await createUser(user_info);

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


// input 글자수 제한
function handleInputLength(el, max) {
    if(el.value.length > max) {
      el.value = el.value.substr(0, max);
    }
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

// 한글입력 막기 - 이메일 1
// $(function () {
//     $('#user_id, #user_email, #user_emailId').on("blur keyup", function () {
//         var inputVal = $(this).val();
//         var cleanedVal = inputVal.replace(/[^a-zA-Z0-9]/g, ''); // 영문, 숫자만 허용
//         if (inputVal !== cleanedVal) {
//             alert("영문과 숫자만 입력 가능합니다.");
//         }
//         $(this).val(cleanedVal);
//     });
// });

// 한글입력 막기 - 이메일 alert안뜨게하기 2
$(function () {
    $('#user_id, #user_email, #user_emailId').on("input", function () {
        var cleanedVal = $(this).val().replace(/[^a-zA-Z0-9]/g, ''); 
        $(this).val(cleanedVal);
    });
});

// 비밀번호
$(function () {
    $('#user_pw, #user_pw2').on("input", function () {
        var cleanedVal = $(this).val().replace(/[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\\/|`~\-]/g, ''); // 한글과 공백을 제외한 모든 문자 허용
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
    const dropdownButton = document.querySelector(".btn-select"); // 드롭다운 버튼 (화살표)
    const dropdownMenu = document.querySelector(".dropdown-btn"); // 드롭다운 목록
    const dropdownItems = document.querySelectorAll(".dropdown-item"); // 드롭다운 항목
    const emailInput = document.getElementById("user_emailId"); // 이메일 아이디 입력 필드
    const emailHidden = document.getElementById("user_email"); // 최종 이메일 저장 hidden input
    const btnText = document.querySelector(".btn-text"); // 선택한 도메인 표시 버튼
    const downBut = document.querySelector(".down-but"); // 버튼 그룹 

    // 직접 입력 필드 생성
    const customEmailInput = document.createElement("input");
    customEmailInput.type = "text";
    customEmailInput.id = "custom_email";
    customEmailInput.name = "custom_email";
    customEmailInput.placeholder = "도메인 입력";
    customEmailInput.classList.add("email-inp");
    customEmailInput.style.display = "none"; // 기본적으로 숨김

    // `.btn-text` 위치에 `customEmailInput` 추가
    btnText.parentNode.insertBefore(customEmailInput, btnText);

    // 드롭다운 버튼 클릭 시 메뉴 토글
    dropdownButton.addEventListener("click", function () {
        dropdownMenu.classList.toggle("active");
    });

    // 드롭다운 항목 클릭 시 처리
    dropdownItems.forEach(item => {
        item.addEventListener("click", function () {
            const selectedDomain = item.textContent.trim();
            if (selectedDomain === "직접 입력") {
                btnText.style.display = "none"; // 기존 도메인 텍스트 숨기기
                customEmailInput.style.display = "inline-block"; // 입력 필드 표시
                customEmailInput.value = "";
                customEmailInput.focus();
            } else {
                btnText.style.display = "inline-block"; // 기존 텍스트 다시 보이기
                btnText.textContent = selectedDomain;
                customEmailInput.style.display = "none"; // 입력 필드 숨기기
                customEmailInput.value = "";
                emailHidden.value = emailInput.value + "@" + selectedDomain;
            }
            dropdownMenu.classList.remove("active");
        });
    });

    // 직접 입력 필드 입력 시 hidden input 업데이트
    customEmailInput.addEventListener("input", function () {
        emailHidden.value = emailInput.value + "@" + customEmailInput.value;
    });

    // 이메일 아이디 입력 시 hidden input 업데이트
    emailInput.addEventListener("input", function () {
        let selectedDomain = btnText.textContent;
        if (selectedDomain !== "선택하기" && selectedDomain !== "직접 입력") {
            emailHidden.value = emailInput.value + "@" + selectedDomain;
        } else if (selectedDomain === "직접 입력") {
            emailHidden.value = emailInput.value + "@" + customEmailInput.value;
        }
    });

    // 드롭다운 외부 클릭 시 닫기
    document.addEventListener("click", function (event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("active");
        }
    });
});


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



