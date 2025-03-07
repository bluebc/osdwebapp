async function changeUser_pw() {

    var user_id = document.getElementById("user_id");
    var user_pw_old = document.getElementById("user_pw_old");
    var user_pw_new = document.getElementById("user_pw_new");
    var user_pw_new2 = document.getElementById("user_pw_new2");

    if (user_id.value == "") {
        user_id.focus();
        alert("아이디를 입력하세요.");
        return;
    }
    if (user_pw_old.value == "") {
        user_pw_old.focus();
        alert("현재 비밀번호를 입력해주세요.");
        return;
    }
    if (user_pw_new.value == "") {
        user_pw_new.focus();
        alert("변경할 비밀번호를 입력해주세요.");
        return;
    }
    if (user_pw_new2.value == "") {
        user_pw_new2.focus();
        alert("변경할 비밀번호를 다시 입력해주세요.");
        return;
    }

    if (user_pw_new.value != user_pw_new2.value) {
        alert("패스워드(확인)가 일치하지 않습니다.");
        user_pw_new2.focus();
        return;
    }
    var idAndPw = {
        user_id: user_id.value,
        user_pw_old: user_pw_old.value,
        user_pw_new: user_pw_new.value
    }

    var check = await updatepw(idAndPw);

    switch (check.status) {
        case (-1):
            alert("현재 비밀번호가 맞지 않습니다.");
            return;
        case (-2):
            alert("변경할 비밀번호와 현재의 비밀번호가 동일합니다.");
            return;
        case (-3):
            alert("변경 실패");
            return;
        case (1):
            alert("비밀번호 변경 완료");
    }

}


async function updatepw(idAndPw) {

    const response = await fetch("/updatepw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(idAndPw),
    });
    const result = await response.json();
    return result;
}
