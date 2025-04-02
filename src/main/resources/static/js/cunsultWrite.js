// 글 작성 완료
async function posting() {
    // console.log("게시");

    var user_id = document.getElementById("user_id").value;
    var post_subject = document.getElementById("post_subject").value;
    var post_content = document.getElementById("post_content").value;

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

    var qna_post = {
        user_id: user_id,
        post_subject: post_subject,
        post_content: post_content
    };

    // 글 보내기
    const result = await postCunsultPost(qna_post);

    const cunsult_post = result.cunsult_post;
    const post_id = cunsult_post.post_id;


    //
    alert("글 작성이 완료되었습니다.");
}

// 서버에 글 post
async function postCunsultPost(qna_post) {

    const response = await fetch("/cunsult/postCunsultPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(qna_post)
    });

    const result = await response.json();
    return result;
}


// 글 작성 취소
function cancelPosting() {
    // console.log("취소");
}