const login_user_id = document.getElementById("login_user_id").value;

document.addEventListener("DOMContentLoaded", async function () {
    await loadComments();
});

async function loadComments() {
    await setComments();
    await setCommentMyLike();
}

async function writeComment() {

    var cmt_content = document.getElementById("writeCommentContent").value;
    var post_id = document.getElementById("post_id").value;
    var user_id = login_user_id;
    var community_comment = { cmt_content: cmt_content, post_id: post_id, user_id: user_id };

    const result = await postComment(community_comment);

    // 댓글 등록 후 작성 내용 제거
    if (result.status == 1) {
        document.getElementById("writeCommentContent").value = "";
    }

}

async function postComment(community_comment) {

    const response = await fetch("/community/postComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(community_comment)
    });

    const result = await response.json();

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
            await setComments();

    }
    return result;
}

// 전체 댓글 데이터
async function getCommentListByPost() {
    var post_id = document.getElementById("post_id").value;
    const response = await fetch("/community/getCommentListByPost", {
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

    let userImgPath = "/img/user/";

    commentList.forEach(comment => {

        // 원댓글
        if (comment.parent_cmt_id == 0) {

            let level0Div = document.createElement("div");
            level0Div.id = "cmtLv0_" + comment.cmt_id;
            level0Div.className = "commentLevel0";

            let level1Div = document.createElement("div");
            var level1DivId = "cmtLv1_" + comment.cmt_id;
            level1Div.id = level1DivId;
            level1Div.className = "commentLevel1";

            // 이미지
            let cmtUserImg = document.createElement("img");
            // 임시 사이즈 지정
            cmtUserImg.style.width = "40px";
            cmtUserImg.style.height = "40px";
            // 이미지 없을 때 기본이미지
            if (comment.user_img == null || comment.user_img == "") {
                cmtUserImg.src = "../img/re1.jpg";
                // 이미지 있는 경우
            } else {
                cmtUserImg.src = userImgPath + comment.user_img;
            }
            level1Div.appendChild(cmtUserImg);


            let commentDiv = document.createElement("div");
            commentDiv.className = "commentContent";


            // 사용자명 => 닉네임으로 교체 필요
            let cmtUser = document.createElement("strong");
            cmtUser.textContent = comment.user_nickname;
            commentDiv.appendChild(cmtUser);

            // 댓글 내용
            let commentContent = document.createElement("p");
            commentContent.textContent = comment.cmt_content;
            commentContent.id = "cmtContent_" + comment.cmt_id;
            commentDiv.appendChild(commentContent);


            let commentButtonsDiv = document.createElement("div");
            commentButtonsDiv.className = "commentButtons";


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
            commentButtonsDiv.appendChild(createdAt);


            // 대댓글 버튼
            let reReplyButton = document.createElement("span");
            // reReplyButton.type = "button";
            // reReplyButton.value = "답글쓰기";
            reReplyButton.textContent = "답글쓰기";
            reReplyButton.className = "reReplyButton";
            reReplyButton.onclick = function () {
                addReCommentWrite(level1DivId);
            }
            commentButtonsDiv.appendChild(reReplyButton);


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
            commentButtonsDiv.appendChild(likeButton);

            // 좋아요 수
            let likeCnt = document.createElement("span");
            likeCnt.className = "commentLikeCnt";
            var likeCntId = "cmtLikeCnt_" + comment.cmt_id;
            likeCnt.id = likeCntId;
            likeCnt.textContent = comment.cmt_likecnt;
            commentButtonsDiv.appendChild(likeCnt);

            // 내가 좋아요 누름
            let myLike = document.createElement("input");
            myLike.type = "hidden";
            var myLikeId = "myLike_" + comment.cmt_id;
            myLike.id = myLikeId;
            myLike.value = 0;
            myLike.className = "myLike";
            commentButtonsDiv.appendChild(myLike);

            if (login_user_id == comment.user_id) {

                let inpButtonsDiv = document.createElement("div");
                inpButtonsDiv.className = "inpButtons";

                // 수정
                let editCmtButton = document.createElement("input");
                editCmtButton.type = "button";
                editCmtButton.value = "수정";
                editCmtButton.onclick = function () {
                    // alert("댓글 수정버튼");
                    editComment(level1DivId);
                }
                commentButtonsDiv.appendChild(editCmtButton);

                // 삭제
                let deleteCmtButton = document.createElement("input");
                deleteCmtButton.type = "button";
                deleteCmtButton.value = "삭제";
                deleteCmtButton.onclick = function () {
                    deleteComment(level1DivId);
                }
                inpButtonsDiv.appendChild(deleteCmtButton);

                commentButtonsDiv.appendChild(inpButtonsDiv);

            }
            commentDiv.appendChild(commentButtonsDiv);
            level1Div.appendChild(commentDiv);
            level0Div.appendChild(level1Div);


            displayCommentDiv.appendChild(level0Div);

            // 대댓글
        } else {

            let level0DivId = "cmtLv0_" + comment.parent_cmt_id;
            let level0Div = document.getElementById(level0DivId);

            let level2Div = document.createElement("div");
            let level2DivId = "cmtLv2_" + comment.cmt_id;
            level2Div.id = level2DivId;
            level2Div.className = "commentLevel2";

            // 이미지
            let cmtUserImg = document.createElement("img");
            // 임시 사이즈 지정
            cmtUserImg.style.width = "40px";
            cmtUserImg.style.height = "40px";
            // 이미지 없을 때 기본이미지
            if (comment.user_img == null || comment.user_img == "") {
                cmtUserImg.src = "../img/re1.jpg";
                // 이미지 있는 경우
            } else {
                cmtUserImg.src = userImgPath + comment.user_img;
            }
            level2Div.appendChild(cmtUserImg);

            let commentDiv = document.createElement("div");
            commentDiv.className = "commentContent";

            // 사용자명 => 닉네임으로 교체 필요
            let cmtUser = document.createElement("strong");
            cmtUser.textContent = comment.user_nickname;
            commentDiv.appendChild(cmtUser);

            // 댓글 내용
            let commentContent = document.createElement("p");
            commentContent.textContent = comment.cmt_content;
            commentContent.id = "cmtContent_" + comment.cmt_id;

            commentDiv.appendChild(commentContent);

            let commentButtonsDiv = document.createElement("div");
            commentButtonsDiv.className = "commentButtons";

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
            commentButtonsDiv.appendChild(createdAt);


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
            commentButtonsDiv.appendChild(likeButton);

            // 좋아요 수
            let likeCnt = document.createElement("span");
            likeCnt.className = "commentLikeCnt";
            var likeCntId = "cmtLikeCnt_" + comment.cmt_id;
            likeCnt.id = likeCntId;
            likeCnt.textContent = comment.cmt_likecnt;
            commentButtonsDiv.appendChild(likeCnt);

            // 내가 좋아요 누름
            let myLike = document.createElement("input");
            myLike.type = "hidden";
            var myLikeId = "myLike_" + comment.cmt_id;
            myLike.id = myLikeId;
            myLike.value = 0;
            myLike.className = "myLike";
            commentButtonsDiv.appendChild(myLike);

            if (login_user_id == comment.user_id) {

                let inpButtonsDiv = document.createElement("div");
                inpButtonsDiv.className = "inpButtons";

                // 수정
                let editCmtButton = document.createElement("input");
                editCmtButton.type = "button";
                editCmtButton.value = "수정";
                editCmtButton.onclick = function () {
                    editComment(level2DivId);
                }
                commentButtonsDiv.appendChild(editCmtButton);

                // 삭제
                let deleteCmtButton = document.createElement("input");
                deleteCmtButton.type = "button";
                deleteCmtButton.value = "삭제";
                deleteCmtButton.onclick = function () {
                    deleteComment(level2DivId);
                }
                inpButtonsDiv.appendChild(deleteCmtButton);

                commentButtonsDiv.appendChild(inpButtonsDiv);

            }

            commentDiv.appendChild(commentButtonsDiv);
            level2Div.appendChild(commentDiv);

            level0Div.appendChild(level2Div);
        }

    });

}

// 댓글 작성 창 열기
function addReCommentWrite(level1DivId) {
    const level1Div = document.getElementById(level1DivId);
    const level0Div = level1Div.parentElement;

    const re_cmt_id = "re" + level1DivId;

    // 열려있는 댓글 창 닫기
    if (document.getElementById(re_cmt_id) != null) {
        const divs = document.querySelectorAll(".writeReComment");
        divs.forEach(div => div.remove());
        return;
    }

    const writeReCommentDiv = document.createElement("div");
    writeReCommentDiv.className = "writeReComment";

    const reCommentTextarea = document.createElement("textarea");
    reCommentTextarea.placeholder = "댓글을 작성하세요";
    reCommentTextarea.id = re_cmt_id;
    writeReCommentDiv.appendChild(reCommentTextarea);

    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "reWrapper";

    const reCommentPostButton = document.createElement("input");
    reCommentPostButton.type = "button";
    reCommentPostButton.value = "작성 완료";
    reCommentPostButton.onclick = function () {
        postReComment(level1DivId);
    };

    buttonWrapper.appendChild(reCommentPostButton);
    writeReCommentDiv.appendChild(buttonWrapper);

    if (level1Div.nextSibling) {
        level0Div.insertBefore(writeReCommentDiv, level1Div.nextSibling);
    } else {
        level0Div.appendChild(writeReCommentDiv);
    }
}


async function postReComment(level1DivId) {

    const parent_cmt_id = level1DivId.split("_")[1];
    var reCommentTextareaId = "re" + level1DivId;

    var cmt_content = document.getElementById(reCommentTextareaId).value;
    var post_id = document.getElementById("post_id").value;
    var user_id = document.getElementById("login_user_id").value;
    var community_comment = {
        cmt_content: cmt_content,
        post_id: post_id,
        user_id: user_id,
        parent_cmt_id: parent_cmt_id
    };

    const result = await postComment(community_comment);

}


// 좋아요 클릭
async function likeComment(cmt_id) {

    var like = 0;

    var myLikeId = "myLike_" + cmt_id;
    var myLike = parseInt(document.getElementById(myLikeId).value);
    if (myLike == 0) {
        like = 1;
    }
    else if (myLike > 0) {
        like = -1;
    }

    const result = await postLikeComment(cmt_id, like);

    if (result == -1) {
        alert("로그인 하세요");
        return;
    }

    // 좋아요 버튼 변경
    commentLikeButton(cmt_id);
}

async function postLikeComment(cmt_id, like) {

    const response = await fetch("/community/postLikeComment", {
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

    const response = await fetch("/community/getCommentMyLike", {
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



// 댓글 수정
async function editComment(cmtLvId) {

    cancelEditComment();

    const cmt_id = cmtLvId.split("_")[1];

    let cmtContentId = "cmtContent_" + cmt_id;
    let cmtContent = document.getElementById(cmtContentId).textContent;

    let cmtLvDiv = document.getElementById(cmtLvId);

    // 기존 댓글 숨기기
    Array.from(cmtLvDiv.children).forEach(child => {
        child.style.display = "none";
    });

    let editCmtDiv = document.createElement("div");
    editCmtDiv.className = "editComment";

    // 입력창 (textarea)
    let editCmtContent = document.createElement("textarea");
    editCmtContent.value = cmtContent;
    editCmtContent.id = "editCmt_" + cmt_id;
    editCmtDiv.appendChild(editCmtContent);

    // 버튼 컨테이너
    let buttonWrapper = document.createElement("div");
    buttonWrapper.className = "editButtons";

    // 수정 완료 버튼
    let updateCmtButton = document.createElement("input");
    updateCmtButton.type = "button";
    updateCmtButton.value = "수정";
    updateCmtButton.onclick = function () {
        updateComment(cmt_id);
    }
    buttonWrapper.appendChild(updateCmtButton);

    // 수정 취소 버튼
    let cancelEditButton = document.createElement("input");
    cancelEditButton.type = "button";
    cancelEditButton.value = "취소";
    cancelEditButton.onclick = function () {
        cancelEditComment();
    }
    buttonWrapper.appendChild(cancelEditButton);

    // 버튼 div 추가
    editCmtDiv.appendChild(buttonWrapper);

    // 최종 삽입
    cmtLvDiv.appendChild(editCmtDiv);
}



// 댓글 수정 취소
function cancelEditComment() {

    // 댓글 수정 창 제거
    let editCommentDivs = document.querySelectorAll(".editComment");
    editCommentDivs.forEach(editCommentDiv => {
        editCommentDiv.remove(); 
    });

    // 숨겨진 댓글 내용 다시 보이기
    let allCommentContainers = document.querySelectorAll(".commentLevel");
    allCommentContainers.forEach(container => {
        Array.from(container.children).forEach(child => {
            if (!child.classList.contains("editComment")) {
                child.style.display = "block";
            }
        });
    });

    let commentContentDivs = document.querySelectorAll(".commentContent");
    commentContentDivs.forEach(commentContentDiv => {
        commentContentDiv.style.display = "block";
    });
}


// 댓글 수정 - 업데이트
async function updateComment(cmt_id) {

    const cmtContentId = "editCmt_" + cmt_id;
    const cmt_content = document.getElementById(cmtContentId).value;

    const community_comment = { cmt_id: cmt_id, cmt_content: cmt_content };

    const response = await fetch("/community/updateComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(community_comment)
    });

    const result = await response.json();

    switch (result.status) {
        case 0:
            alert("서버 오류");
            return;
        case -1:
            alert("로그인 세션이 만료되었습니다.");
            return;
        case -301:
            alert("DB 오류");
            return;
        case 1:
            // alert("댓글 수정이 완료되었습니다.");
            break;
    }

    // 완료 후 댓글 창 초기화
    await loadComments();

    return result;
}

async function deleteComment(cmtLvId) {


    if (confirm("댓글을 삭제하시겠습니까?")) {

        const cmt_id = cmtLvId.split("_")[1];
        const post_id = document.getElementById("post_id").value;
        const community_comment = { cmt_id: cmt_id, post_id: post_id };

        const response = await fetch("/community/deleteComment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(community_comment)
        });

        const result = await response.json();

        switch (result.status) {
            case 0:
                alert("서버 오류");
                return;
            case -1:
                alert("로그인 세션이 만료되었습니다.");
                return;
            case -301:
                alert("DB 오류");
                return;
            case 1:
                alert("댓글 삭제가 완료되었습니다.");
                break;
            case 2:
                // 대댓글이 있어 삭제표시 처리
                alert("댓글 삭제가 완료되었습니다.");
                break;
        }
        // 완료 후 댓글 창 초기화
        await loadComments();
    }

}