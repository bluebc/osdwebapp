addEventListener("DOMContentLoaded", function () {
    showModOrDel();
    loadLiked();
    // 파일 없을 때 처리 필요
    setFileList();
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
    if (confirm("글을 삭제하시겠습니까?")) {
        deleteCunsultPost();
    }
}

function deleteCunsultPost() {

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

    var post_id = document.getElementById("post_id").value;
    var cunsult_post = { post_id: post_id };

    fetch("/cunsult/setRownumSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cunsult_post)
    }).then(response => {
        return response.json();
    }).then(result => {

    });

    window.location.href = "/cunsult/list";
}

function setFileList() {
    const fileJSON = document.getElementById("fileJSON").value;
    const fileListDiv = document.getElementById("fileList");
    const fileList = JSON.parse(fileJSON);
    // console.log(fileList);
    fileList.forEach(file => {
        let fileLinkA = document.createElement("a");
        fileLinkA.href = "/file/download?filename=" + file;
        fileLinkA.textContent = file.substring(file.indexOf("_") + 1);
        fileListDiv.appendChild(fileLinkA);
    });

}

async function like() {

    var post_id = parseInt(document.getElementById("post_id").value);
    var myLike = document.getElementById("myLike").value;
    var result;

    if (myLike == 0) {
        result = await postLike(post_id, 1);
        if (result == -1) {
            alert("로그인 하세요");
            return;
        }
        document.getElementById("myLike").value = 1;
        likeButton.textContent = unLikeMsg;
    } else if (myLike > 0) {
        result = await postLike(post_id, -1);
        if (result == -1) {
            alert("로그인 하세요");
            return;
        }
        document.getElementById("myLike").value = 0;
        likeButton.textContent = likeMsg;
    }

}

async function postLike(post_id, like) {

    const response = await fetch("/cunsult/postLike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: post_id, like: like })
    });
    const result = await response.json();

    return result;

}

const likeMsg = "♡ 좋아요";
const unLikeMsg = "❤︎ 좋아요";


function loadLiked() {
    var myLike = document.getElementById("myLike").value;
    if (myLike == 0) {
        likeButton.textContent = likeMsg;
    } else if (myLike > 0) {
        likeButton.textContent = unLikeMsg;
    }
}