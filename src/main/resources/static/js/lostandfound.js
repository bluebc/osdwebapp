function requestAuthMail() {

    sendAuthMailForId();

    // DB user 정보에서 일치하는 메일 찾기
    // 비번찾기는 변경으로 진행
}

async function sendAuthMailForId() {

    var email = document.getElementById("email").value;

    const response = await fetch("/findidbyemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email })
    });

    const result = await response.json();

    // console.log(result.status);

    if (result.status == 1) {
        // goAuthPage(email);
        window.location.href = "/find/emailauth";
    }

}

// function goAuthPage(email){
//     const form = document.createElement("form");
//     form.method = "POST";
//     form.action = "/find/emailauth";

//       // 데이터를 숨겨서 전송 (input hidden 사용)
//       const input = document.createElement("input");
//       input.type = "hidden";
//       input.name = "user_email";
//       input.value = email; // 전송할 데이터
//       form.appendChild(input);

//       document.body.appendChild(form);
//       form.submit(); // 서버에 데이터 전송 후 페이지 이동
// }

async function emailAuth() {
    var emailAuthCode = document.getElementById("emailAuthCode").value;
    const response = await fetch("/emailAuth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auth_code: emailAuthCode })
    });

    const result = await response.json();
    if (result.status == 1) {
        window.location.href = "/findFoundId";
    }
}
