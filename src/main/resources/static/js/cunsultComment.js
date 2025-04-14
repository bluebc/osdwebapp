const reader_id = document.getElementById("reader_id").value;

document.addEventListener("DOMContentLoaded", async function () {
    await setComments();
    await setCommentMyLike();
});



async function writeComment() {

    var cmt_content = document.getElementById("writeCommentContent").value;
    console.log(cmt_content);
    var post_id = document.getElementById("post_id").value;
    // var user_id = document.getElementById("reader_id").value;
    var user_id = reader_id;
    var cunsult_comment = { cmt_content: cmt_content, post_id: post_id, user_id: user_id };

    const result = await postComment(cunsult_comment);

    // 댓글 등록 후 작성 내용 제거
    if (result.status == 1) {
        document.getElementById("writeCommentContent").value = "";
    }

}

async function postComment(cunsult_comment) {

    const response = await fetch("/cunsult/postComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cunsult_comment)
    });

    const result = await response.json();

    console.log("status: " + result.status);

    switch (result.status) {
        case -1:
            alert("로그인 후 댓글을 달아주세요.");
            return;
        case -2:
            alert("로그인 정보 오류");
            return;
        case -201:
            alert("DB 오류");
            return;
        case 1:
            alert("댓글 작성이 완료되었습니다.")
            setComments();

    }
    return result;
}

// 전체 댓글 데이터
async function getCommentListByPost() {
    var post_id = document.getElementById("post_id").value;
    const response = await fetch("/cunsult/getCommentListByPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post_id)
    });

    const result = await response.json();
    const commentList = result.list;

    return commentList;
}

// 댓글 출력
async function setComments() {

    const commentList = await getCommentListByPost();

    const displayCommentDiv = document.getElementById("displayComment");

    while (displayCommentDiv.firstChild) {
        displayCommentDiv.removeChild(displayCommentDiv.firstChild);
    }

    commentList.forEach(comment => {

        // 원댓글
        if (comment.parent_cmt_id == 0) {
            let level1Div = document.createElement("div");
            var level1DivId = "cmt_" + comment.cmt_id;
            level1Div.id = level1DivId;
            level1Div.className = "commentLevel1";

            // 이미지
            let cmtUserImg = document.createElement("img");
            // 임시 사이즈 지정
            cmtUserImg.style.width = "20px";
            cmtUserImg.style.height = "20px";
            // 이미지 없을 때 기본이미지
            if (comment.user_img == null || comment.user_img == "") {
                cmtUserImg.src = "../img/re1.jpg";
                // 이미지 있는 경우
            } else {

            }
            level1Div.appendChild(cmtUserImg);

            // 사용자명 => 닉네임으로 교체 필요
            let cmtUser = document.createElement("strong");
            cmtUser.textContent = comment.user_nickname;
            level1Div.appendChild(cmtUser);

            // 댓글 내용
            let commentContent = document.createElement("p");
            commentContent.textContent = comment.cmt_content;
            commentContent.className = "commentContent";
            level1Div.appendChild(commentContent);

            // 시간
            let createdAt = document.createElement("span");
            createdAt.className = "commentCreatedAt";
            let cmtCreatedAt = new Date(comment.cmt_created_at);
            let formattedCmtCreatedAt = cmtCreatedAt.getFullYear() + '-' +
                String(cmtCreatedAt.getMonth() + 1).padStart(2, '0') + '-' +
                String(cmtCreatedAt.getDate()).padStart(2, '0') + ' ' +
                String(cmtCreatedAt.getHours()).padStart(2, '0') + ':' +
                String(cmtCreatedAt.getMinutes()).padStart(2, '0');
            // String(cmtCreatedAt.getMinutes()).padStart(2, '0') + ':' +
            // String(cmtCreatedAt.getSeconds()).padStart(2, '0');
            createdAt.textContent = formattedCmtCreatedAt;
            level1Div.appendChild(createdAt);


            // 대댓글 버튼
            let reReplyButton = document.createElement("span");
            // reReplyButton.type = "button";
            // reReplyButton.value = "답글쓰기";
            reReplyButton.textContent = "답글쓰기";
            reReplyButton.className = "reReplyButton";
            reReplyButton.onclick = function () {
                addReCommentWrite(level1DivId);
            }
            level1Div.appendChild(reReplyButton);


            // 좋아요 버튼
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

            // 좋아요 수
            let likeCnt = document.createElement("span");
            likeCnt.className = "commentLikeCnt";
            var likeCntId = "cmtLikeCnt_" + comment.cmt_id;
            likeCnt.id = likeCntId;
            likeCnt.textContent = comment.cmt_likecnt;
            level1Div.appendChild(likeCnt);

            // 내가 좋아요 누름
            let myLike = document.createElement("input");
            myLike.type = "hidden";
            var myLikeId = "myLike_" + comment.cmt_id;
            myLike.id = myLikeId;
            myLike.value = 0;
            myLike.className = "myLike";
            level1Div.appendChild(myLike);

            if (reader_id == comment.user_id) {

                // 수정
                let modifyCmtButton = document.createElement("input");
                modifyCmtButton.type = "button";
                modifyCmtButton.value = "수정";
                // modifyCmtButton.style.display = "none";
                modifyCmtButton.onclick = function () {
                    alert("댓글 수정버튼");
                }
                level1Div.appendChild(modifyCmtButton);

                // 삭제
                let deleteCmtButton = document.createElement("input");
                deleteCmtButton.type = "button";
                deleteCmtButton.value = "삭제";
                // deleteCmtButton.style.display = "none";
                deleteCmtButton.onclick = function () {
                    alert("댓글 삭제버튼");
                }
                level1Div.appendChild(deleteCmtButton);

            }


            displayCommentDiv.appendChild(level1Div);

            // 대댓글
        } else {

            level1DivId = "cmt_" + comment.parent_cmt_id;
            // console.log(level1DivId);
            let level1Div = document.getElementById(level1DivId);
            let level2Div = document.createElement("div");
            var level2DivId = "recmt_" + comment.cmt_id;
            level2Div.id = level2DivId;
            level2Div.className = "commentLevel2";

            // 이미지
            let cmtUserImg = document.createElement("img");
            // 임시 사이즈 지정
            cmtUserImg.style.width = "20px";
            cmtUserImg.style.height = "20px";
            // 이미지 없을 때 기본이미지
            if (comment.user_img == null || comment.user_img == "") {
                cmtUserImg.src = "../img/re1.jpg";
                // 이미지 있는 경우
            } else {

            }
            level2Div.appendChild(cmtUserImg);

            // 사용자명 => 닉네임으로 교체 필요
            let cmtUser = document.createElement("strong");
            cmtUser.textContent = comment.user_nickname;
            level2Div.appendChild(cmtUser);

            // 댓글 내용
            let commentContent = document.createElement("p");
            commentContent.textContent = comment.cmt_content;
            commentContent.className = "commentContent";

            level2Div.appendChild(commentContent);


            // 시간
            let createdAt = document.createElement("span");
            createdAt.className = "commentCreatedAt";
            let cmtCreatedAt = new Date(comment.cmt_created_at);
            let formattedCmtCreatedAt = cmtCreatedAt.getFullYear() + '-' +
                String(cmtCreatedAt.getMonth() + 1).padStart(2, '0') + '-' +
                String(cmtCreatedAt.getDate()).padStart(2, '0') + ' ' +
                String(cmtCreatedAt.getHours()).padStart(2, '0') + ':' +
                String(cmtCreatedAt.getMinutes()).padStart(2, '0');
            // String(cmtCreatedAt.getMinutes()).padStart(2, '0') + ':' +
            // String(cmtCreatedAt.getSeconds()).padStart(2, '0');
            createdAt.textContent = formattedCmtCreatedAt;
            level2Div.appendChild(createdAt);


            // 좋아요 버튼
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

            // 좋아요 수
            let likeCnt = document.createElement("span");
            likeCnt.className = "commentLikeCnt";
            var likeCntId = "cmtLikeCnt_" + comment.cmt_id;
            likeCnt.id = likeCntId;
            likeCnt.textContent = comment.cmt_likecnt;
            level2Div.appendChild(likeCnt);

            // 내가 좋아요 누름
            let myLike = document.createElement("input");
            myLike.type = "hidden";
            var myLikeId = "myLike_" + comment.cmt_id;
            myLike.id = myLikeId;
            myLike.value = 0;
            myLike.className = "myLike";
            level2Div.appendChild(myLike);

            if (reader_id == comment.user_id) {

                // 수정
                let modifyCmtButton = document.createElement("input");
                modifyCmtButton.type = "button";
                modifyCmtButton.value = "수정";
                // modifyCmtButton.style.display = "none";
                modifyCmtButton.onclick = function () {
                    alert("댓글 수정버튼");
                }
                level2Div.appendChild(modifyCmtButton);

                // 삭제
                let deleteCmtButton = document.createElement("input");
                deleteCmtButton.type = "button";
                deleteCmtButton.value = "삭제";
                // deleteCmtButton.style.display = "none";
                deleteCmtButton.onclick = function () {
                    alert("댓글 삭제버튼");
                }
                level2Div.appendChild(deleteCmtButton);

            }

            level1Div.appendChild(level2Div);
        }

    });

}

// 댓글 작성 창 열기
function addReCommentWrite(level1DivId) {
    const level1Div = document.getElementById(level1DivId);

    var re_cmt_id = "re" + level1DivId;


    // 열려있는 댓글 창 닫기
    if (document.getElementById(re_cmt_id) != null) {

        const divs = document.querySelectorAll(".writeReComment");
        divs.forEach(div => div.remove());

        return;
    }

    const divs = document.querySelectorAll(".writeReComment");
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

async function postReComment(level1DivId) {

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

    const result = await postComment(cunsult_comment);

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
        //
        document.getElementById(likeCntId).textContent = cmtLikeCnt + 1;
    } else if (myLike > 0) {
        document.getElementById(likeBtnId).value = likeButtonMsg;
        document.getElementById(myLikeId).value = 0;
        //
        document.getElementById(likeCntId).textContent = cmtLikeCnt - 1;
    }

}


// function formatt(){
//     let formatted = content.replace(/\n/g, "<br>");
//     document.querySelector('.reCommentContent').innerHTML = formatted;
// }


// 댓글 수정
function modifyComment(cmt_id) {

}
