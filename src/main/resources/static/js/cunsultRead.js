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

function modifyPost() {
    var post_id = document.getElementById("post_id").value;
    window.location.href = "/cunsult/modify?post_id=" + post_id;
}


function deletePost(post_id) { }



// 목록
function goPostList() {
    // 목록이 아님
    var post_id = document.getElementById("post_id").value;
    window.history.back();
    // window.location.href = "/cunsult/list?post_id=" + post_id;
}