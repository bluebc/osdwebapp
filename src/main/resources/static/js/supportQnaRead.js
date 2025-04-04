addEventListener("DOMContentLoaded", function () {
    showModOrDel();
});

function showModOrDel() {

    fetch("/getsession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {}
    }).then(response => {
        return response.json();
    }).then(result => {
        if (result.login_user_id != null && result.login_user_id != "") {
            // 아이디 일치 여부 확인
            if (document.getElementById("user_id").value == result.login_user_id) {
                document.getElementById("modOrDel").style.display = "block";
            }
        }
    });

}


function modifyQna(post_id){

}

function deleteQna(post_id){

}


function goQnaList(){
    // alert("목록페이지 구현");
    window.history.back();
}