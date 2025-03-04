async function login() {
    var id = document.getElementById("id").value;
    if (id == "") {
        document.getElementById("id").focus();
        alert("아이디를 입력하세요.");
        return;
    }
    var pw = document.getElementById("pw").value;
    if (pw == "") {
        document.getElementById("pw").focus();
        alert("패스워드를 입력해주세요.");
        return;
    }

    loginCheck(id, pw);
}

async function loginCheck(id, pw) {
    var check = await auth(id, pw);
    //alert(check.status);

    switch (check.status) {
        case -2:
            alert("비밀번호를 확인하세요.");
            break;
        case -1:
            alert("아이디를 확인하세요.");
            break;
        case 0:
            alert("오류가 발생하였습니다.");
            break;
        case 1:
            alert("로그인되었습니다.");
            window.location.href = "/main";
            break;
        default:
            alert("오류가 발생하였습니다.");
            break;
    }
}

async function auth(id, pw) {
    var user = { id: id, password: pw };
  
    const response = await fetch("/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
}
