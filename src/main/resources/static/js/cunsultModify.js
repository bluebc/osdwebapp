// 글 작성 완료
async function modify() {
    // console.log("게시");

    var post_id = document.getElementById("post_id").value;
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
        post_id: post_id,
        user_id: user_id,
        post_subject: post_subject,
        post_content: post_content
    };

    // 글 보내기
    const result = await modifyCunsultPost(qna_post);

    const updated = result.updated;


    //
    switch(updated){
        case 1:
            alert("글 수정이 완료되었습니다.");
            break;
    }
    
}

// 서버에 글 post
async function modifyCunsultPost(qna_post) {

    const response = await fetch("/cunsult/modifyCunsultPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(qna_post)
    });

    const result = await response.json();
    return result;
}


// 글 작성 취소
function cancelModify() {
    if (confirm("글 수정을 취소하시겠습니까?")) {
        window.history.back();
        // 원문 글 읽는 곳으로
    }

    // console.log("취소");
}