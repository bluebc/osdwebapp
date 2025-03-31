// 글 작성 완료
async function posting() {
    // console.log("게시");

    var user_id = document.getElementById("user_id").value;
    var post_subject = document.getElementById("post_subject").value;
    var post_content = document.getElementById("post_content").value;

    var qna_post = {
        user_id: user_id,
        post_subject: post_subject,
        post_content: post_content
    };

    // 글 보내기
    const result = await postQnaPost(qna_post);

    

}

// 서버에 글 post
async function postQnaPost(qna_post) {

    const response = await fetch("/support/qna/postQnaPost", {
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