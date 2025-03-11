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
        user_birth: user_birth.value,
        user_gender: user_gender.value,
        //
        user_created_at: createTime,
        user_updated_at: createTime
    };

    var result = await userCreate(user_info);

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

async function userCreate(user_info) {
    const response = await fetch("/usercreate", {
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

