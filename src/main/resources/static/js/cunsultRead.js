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


function deletePost() {
    if(confirm("글을 삭제하시겠습니까?")){
        deleteCunsultPost();
    }
}

function deleteCunsultPost(){

    var post_id = document.getElementById("post_id").value;
    var user_id = document.getElementById("user_id").value;

    const cunsult_post = { post_id: post_id, user_id: user_id };

    fetch("/cunsult/deleteCunsultPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cunsult_post)
    }).then(response => {
        return response.json();
    }).then(result => {
        if (result.deleted == 1) {
            alert("삭제가 완료되었습니다.");
            window.location.href = "/cunsult/list";
        }
    });

}



// 목록
function goPostList() {
    // 목록이 아님
    var post_id = document.getElementById("post_id").value;
    var cunsult_post  = {post_id:post_id};
    // window.history.back();
    // window.location.href = "/cunsult/list?post_id=" + post_id;

    fetch("/cunsult/setRownumSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cunsult_post)
    }).then(response => {
        return response.json();
    }).then(result => {
        if (result.rownum != 0) {
            
            // window.location.href = "/cunsult/list";
        }
    });


    window.location.href = "/cunsult/list";
}