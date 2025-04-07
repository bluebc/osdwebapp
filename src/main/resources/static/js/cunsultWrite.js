// 글 작성 완료
async function posting() {
    // console.log("게시");

    var user_id = document.getElementById("user_id").value;
    var post_subject = document.getElementById("post_subject").value;
    var post_content = document.getElementById("post_content").value;

    if (user_id == null || user_id == "") {

        alert("로그인 세션이 만료되었습니다.");
        window.location.href = "/";

        return;
    }


    if (post_subject == null || post_subject == "") {
        alert("제목을 입력하세요.");
        document.getElementById("post_subject").focus();
        return;
    }
    if (post_content == null || post_content == "") {
        alert("내용을 입력하세요.");
        document.getElementById("post_content").focus();
        return;
    }

    var fileInputId = "fileInput";
    var files = [];

    const uploaded = await uploadFiles(fileInputId);
    if (uploaded != null) {
        const fileList = uploaded.fileList;

        fileList.forEach(file => {
            files.push(file);
        });
        // console.log(files);
        var post_files = JSON.stringify(files);
    }
    var post = {
        user_id: user_id,
        post_subject: post_subject,
        post_content: post_content,
        post_files: post_files
    };

    // 글 보내기
    const result = await postCunsultPost(post);

    const cunsult_post = result.cunsult_post;
    const post_id = cunsult_post.post_id;


    //
    alert("글 작성이 완료되었습니다.");

    window.location.href = "/cunsult/read?post_id="+post_id;
}

// 서버에 글 post
async function postCunsultPost(post) {

    const response = await fetch("/cunsult/postCunsultPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    });

    const result = await response.json();
    return result;
}


// 글 작성 취소
function cancelPosting() {
    if (confirm("글 작성을 취소하시겠습니까?")) {
        window.history.back();
    }

    // console.log("취소");
}