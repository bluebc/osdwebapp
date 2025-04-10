document.addEventListener("DOMContentLoaded", async function () {
    await setComments();
    await setCommentMyLike();

});


function writeComment() {

    var cmt_content = document.getElementById("writeComment").value;
    var post_id = document.getElementById("post_id").value;
    var user_id = document.getElementById("reader_id").value;
    var cunsult_comment = { cmt_content: cmt_content, post_id: post_id, user_id: user_id };

    postComment(cunsult_comment);
    afterPostComment();
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

    while (displayCommentDiv.firstChild) {
        displayCommentDiv.removeChild(displayCommentDiv.firstChild);
    }

    commentList.forEach(comment => {

        if (comment.parent_cmt_id == 0) {
            let level1Div = document.createElement("div");
            var level1DivId = "cmt_" + comment.cmt_id;
            level1Div.id = level1DivId;
            level1Div.className = "commentLevel1";

            let commentContent = document.createElement("div");
            commentContent.textContent = comment.cmt_content;
            commentContent.className = "commentContent";

            level1Div.appendChild(commentContent);

            let likeCnt = document.createElement("div");
            likeCnt.className = "commentLikeCnt";
            var likeCntId = "cmtLikeCnt_" + comment.cmt_id;
            likeCnt.id = likeCntId;
            likeCnt.textContent = comment.cmt_likecnt;
            level1Div.appendChild(likeCnt);

            let myLike = document.createElement("input");
            myLike.type = "hidden";
            var myLikeId = "myLike_" + comment.cmt_id;
            myLike.id = myLikeId;
            myLike.value = 0;
            myLike.className = "myLike";
            level1Div.appendChild(myLike);


            let likeButton = document.createElement("input");
            likeButton.type = "button";
            likeButton.value = likeButtonMsg;
            likeButton.className = "likeButton";
            var likeButtonId = "likeBtn_" + comment.cmt_id;
            likeButton.id = likeButtonId;
            likeButton.onclick = function () {
                likeComment(comment.cmt_id);
            }

            level1Div.appendChild(likeButton);

            let reReplyButton = document.createElement("input");
            reReplyButton.type = "button";
            reReplyButton.value = "대댓글";
            reReplyButton.className = "likeButton";
            reReplyButton.onclick = function () {
                addReCommentWrite(level1DivId);
            }

            level1Div.appendChild(reReplyButton);

            displayCommentDiv.appendChild(level1Div);
        } else {
            level1DivId = "cmt_" + comment.parent_cmt_id;
            // console.log(level1DivId);
            let level1Div = document.getElementById(level1DivId);
            let level2Div = document.createElement("div");
            var level2DivId = "recmt_" + comment.cmt_id;
            level2Div.id = level2DivId;
            level2Div.className = "commentLevel2";

            let commentContent = document.createElement("div");
            commentContent.textContent = comment.cmt_content;
            commentContent.className = "reCommentContent";

            level2Div.appendChild(commentContent);

            let likeCnt = document.createElement("div");
            likeCnt.className = "commentLikeCnt";
            var likeCntId = "cmtLikeCnt_" + comment.cmt_id;
            likeCnt.id = likeCntId;
            likeCnt.textContent = comment.cmt_likecnt;
            level2Div.appendChild(likeCnt);

            let myLike = document.createElement("input");
            myLike.type = "hidden";
            var myLikeId = "myLike_" + comment.cmt_id;
            myLike.id = myLikeId;
            myLike.value = 0;
            myLike.className = "myLike";
            level2Div.appendChild(myLike);


            let likeButton = document.createElement("input");
            likeButton.type = "button";
            likeButton.value = likeButtonMsg;
            likeButton.className = "likeButton";
            var likeButtonId = "likeBtn_" + comment.cmt_id;
            likeButton.id = likeButtonId;
            likeButton.onclick = function () {
                likeComment(comment.cmt_id);
            }
            level2Div.appendChild(likeButton);

            level1Div.appendChild(level2Div);
        }

    });

}

function addReCommentWrite(level1DivId) {
    const level1Div = document.getElementById(level1DivId);
    // 댓글창 열고 닫기 전환 필요
    var re_cmt_id = "re" + level1DivId;



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
        postReComment(level1DivId);
    }
    writeReCommentDiv.appendChild(reCommentPostButton);

    level1Div.appendChild(writeReCommentDiv);

}

function postReComment(level1DivId) {

    var parent_cmt_id = level1DivId.substring(4);
    var reCommentTextareaId = "re" + level1DivId;

    var cmt_content = document.getElementById(reCommentTextareaId).value;
    var post_id = document.getElementById("post_id").value;
    var user_id = document.getElementById("reader_id").value;
    var cunsult_comment = {
        cmt_content: cmt_content,
        post_id: post_id,
        user_id: user_id,
        parent_cmt_id: parent_cmt_id
    };

    postComment(cunsult_comment);
    afterPostComment();
}

function afterPostComment() {
    alert("댓글 작성이 완료 되었습니다.");
    setComments();
}

// 좋아요 클릭
async function likeComment(cmt_id) {
    // var user_id = document.getElementById("reader_id").value;

    var like = 0;
    // cmt_id = parseInt(cmt_id);

    var myLikeId = "myLike_" + cmt_id;
    var myLike = parseInt(document.getElementById(myLikeId).value);
    if (myLike == 0) {
        like = 1;
    }
    else if (myLike > 0) {
        like = -1;
    }

    const result = await postLikeComment(cmt_id, like);

    // console.log(result);

    if (result == -1) {
        alert("로그인 하세요");
        return;
    }

    // 좋아요 버튼 변경
    commentLikeButton(cmt_id);
}

async function postLikeComment(cmt_id, like) {

    const response = await fetch("/cunsult/postLikeComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cmt_id: cmt_id, like: like })
    });

    const result = await response.json();

    return result;

}

// 댓글에 내가 누른 좋아요 구분
async function setCommentMyLike() {

    var post_id = parseInt(document.getElementById("post_id").value);

    const response = await fetch("/cunsult/getCommentMyLike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post_id)
    });

    const result = await response.json();

    if (result.status == -1) {
        // 로그인 정보 없음
        return;
    }

    commentList = result.list;
    commentList.forEach(comment => {

        var myLikeId = "myLike_" + comment.cmt_id;
        document.getElementById(myLikeId).value = 1;
        var likeBtnId = "likeBtn_" + comment.cmt_id;
        document.getElementById(likeBtnId).value = cancelLikeButtonMsg;

        // console.log(myLikeId);
    });


}

const likeButtonMsg = "좋아요";
const cancelLikeButtonMsg = "좋아요 취소";

// 댓글 좋아요 버튼 눌렀을 때 변화 처리
function commentLikeButton(cmt_id) {
    var likeBtnId = "likeBtn_" + cmt_id;
    var myLikeId = "myLike_" + cmt_id;
    var likeCntId = "cmtLikeCnt_" + cmt_id;
    var cmtLikeCnt = parseInt(document.getElementById(likeCntId).textContent);


    var myLike = document.getElementById(myLikeId).value;
    if (myLike == 0) {
        document.getElementById(likeBtnId).value = cancelLikeButtonMsg;
        document.getElementById(myLikeId).value = 1;
        document.getElementById(likeCntId).textContent = cmtLikeCnt + 1;
    } else if (myLike > 0) {
        document.getElementById(likeBtnId).value = likeButtonMsg;
        document.getElementById(myLikeId).value = 0;
        document.getElementById(likeCntId).textContent = cmtLikeCnt - 1;
    }

}