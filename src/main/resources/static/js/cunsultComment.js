document.addEventListener("DOMContentLoaded", async function () {
    setComments();

});


function writeComment() {



    var cmt_content = document.getElementById("writeComment").value;
    var post_id = document.getElementById("post_id").value;
    var user_id = document.getElementById("reader_id").value;
    var cunsult_comment = { cmt_content: cmt_content, post_id: post_id, user_id: user_id };

    postComment(cunsult_comment);


}

async function postComment(cunsult_comment) {

    const response = await fetch("/cunsult/postComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cunsult_comment)
    });

    const result = await response.json();

    console.log("status: " + result.status);

    return result;


}

async function getCommentListByPost() {
    var post_id = document.getElementById("post_id").value;
    const response = await fetch("/cunsult/getCommentListByPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post_id)
    });

    const result = await response.json();
    // console.log(result);

    const commentList = result.list;
    // console.log(commentList);

    return commentList;

}

async function setComments() {

    const commentList = await getCommentListByPost();

    const displayCommentDiv = document.getElementById("displayComment");
    commentList.forEach(comment => {

        if (comment.parent_cmt_id == 0) {
            let level1Div = document.createElement("div");
            level1Div.id = comment.cmt_id;
            level1Div.className = "commentLevel1";

            let commentContent = document.createElement("div");
            commentContent.textContent = comment.cmt_content;
            commentContent.className = "commentContent";

            level1Div.appendChild(commentContent);

            let likeButton = document.createElement("input");
            likeButton.type = "button";
            likeButton.value = "좋아요";
            likeButton.className = "likeButton";

            level1Div.appendChild(likeButton);

            let reReplyButton = document.createElement("input");
            reReplyButton.type = "button";
            reReplyButton.value = "대댓글";
            reReplyButton.className = "likeButton";
            reReplyButton.onclick = function () {
                addReCommentWrite(comment.cmt_id);
            }

            level1Div.appendChild(reReplyButton);

            displayCommentDiv.appendChild(level1Div);


        }

    });

}

function addReCommentWrite(cmt_id) {
    const level1Div = document.getElementById(cmt_id);
    // 댓글창 열고 닫기 전환 필요
    var re_cmt_id = "re" + cmt_id;



    if (document.getElementById(re_cmt_id) != null) {
        // 클래스 이름이 'targetDiv'인 모든 요소 선택
        const divs = document.querySelectorAll(".writeReComment");
        // 각 요소를 순회하며 제거
        divs.forEach(div => div.remove());

        return;
    }
    // 클래스 이름이 'targetDiv'인 모든 요소 선택
    const divs = document.querySelectorAll(".writeReComment");
    // 각 요소를 순회하며 제거
    divs.forEach(div => div.remove());



    const writeReCommentDiv = document.createElement("div");
    writeReCommentDiv.className = "writeReComment"

    const reCommentTextarea = document.createElement("textarea");
    reCommentTextarea.placeholder = "댓글을 작성하세요";
    reCommentTextarea.id = re_cmt_id;
    reCommentTextarea.className = "writeReCommentContent";
    writeReCommentDiv.appendChild(reCommentTextarea);

    const reCommentPostButton = document.createElement("input");
    reCommentPostButton.type = "button";
    reCommentPostButton.value = "작성 완료";
    reCommentPostButton.onclick = function () {
        postReComment(re_cmt_id);
    }
    writeReCommentDiv.appendChild(reCommentPostButton);

    level1Div.appendChild(writeReCommentDiv);




}

function postReComment() {
    console.log("누름");
}