let currentPage = 1;
let currentKeyword = "";
let currentType = 0;
const viewPage = 10;
const limit = 10;

document.addEventListener("DOMContentLoaded", async function () {
    await getRownumSession();
    await setCommunityType();
    await loadAndSetPostList();
});


async function getRownumSession() {
    const response = await fetch("/community/getRownumSession",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {}
        });
    const result = await response.json();

    if (result.status != 1) {
        return;
    }
    currentType = result.type_id;

    let rownum = result.rownum;

    let page = 1;

    if (rownum == 0) {
        return page;
    }

    page = parseInt(rownum / limit) + 1;
    if ((rownum / limit) == 0) {
        page -= 1;
    }

    currentPage = page;
}

async function setCommunityType() {
    resultMap = await getCommunityType();
    typeList = resultMap.list;

    let communityTypeBtnSectionDiv = document.getElementById("communityTypeBtnSection");
    while (communityTypeBtnSectionDiv.firstChild) {
        communityTypeBtnSectionDiv.removeChild(communityTypeBtnSectionDiv.firstChild);
    }

    typeList.forEach(type => {
        let snbBtnDiv = document.createElement("div");
        snbBtnDiv.className = "snb-btn";

        let typeBtn = document.createElement("input");
        typeBtn.type = "button";
        typeBtn.value = type.type_name;

        typeBtn.onclick = function () {
            setType(type.type_id);

            const pageTitle = document.getElementById("pageTitle");
            if (pageTitle) {
                pageTitle.textContent = type.type_name;
            }
        }

        snbBtnDiv.appendChild(typeBtn);
        communityTypeBtnSectionDiv.appendChild(snbBtnDiv);
    });
}


async function getCommunityType() {

    const response = await fetch("/community/getCommunityType", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {}
    });

    const result = await response.json();

    return result;
}


function search() {
    let keyword = document.getElementById("keyword").value;
    currentKeyword = keyword;
    paging(1);
}

function setType(type_id) {
    currentType = type_id;
    // document.getElementById("keyword").value = "";
    currentKeyword = "";
    paging(1);
}

// 페이지 이동
async function paging(page) {

    currentPage = page;
    await loadAndSetPostList();

}

function setPagination(currentPage, maxPage, count, limit) {

    let pagination = document.getElementById("pagination");
    while (pagination.firstChild) {
        pagination.removeChild(pagination.firstChild);
    }

    let startPage = parseInt(currentPage / viewPage) * viewPage + 1;
    if (currentPage % viewPage == 0) {
        startPage = (parseInt(currentPage / viewPage) - 1) * viewPage + 1;
    }

    var endPage = startPage + viewPage - 1;
    if (endPage > maxPage) {
        endPage = maxPage;
    }

    if (currentPage > viewPage) {
        let leftPageBtn = document.createElement("div");
        leftPageBtn.className = "pagination";

        leftPageBtn.textContent = "◀"
        leftPageBtn.onclick = function () {
            paging(startPage - 1);
        }
        pagination.appendChild(leftPageBtn);
    }

    for (let page = startPage; page <= endPage; page++) {
        let pageDiv = document.createElement("div");
        pageDiv.className = "pagenumber";
        pageDiv.textContent = page;

        if (page === currentPage) {
            pageDiv.classList.add("selected");
        }

        pageDiv.onclick = function () {
            paging(page);
        }
        pagination.appendChild(pageDiv);
    }

    if (endPage != maxPage) {
        let rightPageBtn = document.createElement("div");
        rightPageBtn.className = "pagination";

        rightPageBtn.textContent = "▶"
        rightPageBtn.onclick = function () {
            paging(endPage + 1);
        }
        pagination.appendChild(rightPageBtn);
    }
}

function goPostRead(post_id) {
    window.location.href = "/community/read?post_id=" + post_id;
}

async function loadAndSetPostList() {

    const resultMap = await getPostList();
    const postList = resultMap.list;
    const postCount = resultMap.count;
    const maxPage = resultMap.maxPage;

    setPostList(postList);
    setPagination(currentPage, maxPage, postCount);

}

async function getPostList() {

    let page = currentPage;
    let keyword = currentKeyword;
    let type_id = currentType;
    let parameterMap = { keyword: keyword, page: page, type_id: type_id };

    let response;
    if (type_id == 0) {
        response = await fetch("/community/getPostListByKeywordAndPage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parameterMap)
        });
    } else {
        response = await fetch("/community/getPostListByTypeAndKeywordAndPage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parameterMap)
        });
    }

    const result = await response.json();

    return result;
}

function removeAllPost() {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => post.remove());
}

function setPostList(postList) {

    removeAllPost();

    // let blogContainerDiv = document.getElementById("blogContainer");
    let postContatinerDiv = document.getElementById("postContainer");

    postList.forEach(post => {

        // 프로필 이미지
        const userImgDir = "/img/user/";
        let userImg;
        if (post.user_img != null) {
            userImg = post.user_img;
        } else {
            userImg = "default.jpg";
        }
        const userImgSrc = userImgDir + userImg;
    
        // 게시글 썸네일
        const uploadImgDir = "/img/upload/";
        let postThumbnailImg;
        if (post.post_images != null) {
            let postImgs = JSON.parse(post.post_images);
            postThumbnailImg = postImgs[0];
        } else {
            postThumbnailImg = "notUploaded.jpg";
        }
        const postImgSrc = uploadImgDir + postThumbnailImg;
    
        // lv1 (postDiv)
        let postDiv = document.createElement("div");
        postDiv.className = "post";
    
        // lv2 (postLeftDiv)
        let postLeftDiv = document.createElement("div");
        postLeftDiv.className = "post-left";
    
        // lv3 (authorDiv)
        let authorDiv = document.createElement("div");
        authorDiv.className = "author";
    
        // lv4 (authorImg)
        let authorImg = document.createElement("img");
        authorImg.src = userImgSrc;
        authorDiv.appendChild(authorImg);
    
        // lv4 (writeTimeDiv)
        let writeTimeDiv = document.createElement("div");
        writeTimeDiv.className = "write-time";
    
        let createdAt = post.post_created_at;
        let date = new Date(createdAt);
    
        let yyyy = date.getFullYear();
        let MM = String(date.getMonth() + 1).padStart(2, '0');
        let dd = String(date.getDate()).padStart(2, '0');
        let formattedTime = `${yyyy}.${MM}.${dd}`;
    
        // 작성자와 시간
        let writerH3 = document.createElement("h3");
        writerH3.textContent = post.user_nickname;
        writeTimeDiv.appendChild(writerH3);
    
        let timeH4 = document.createElement("h4");
        timeH4.textContent = formattedTime;
        writeTimeDiv.appendChild(timeH4);
    
        authorDiv.appendChild(writeTimeDiv);
        postLeftDiv.appendChild(authorDiv);
    
        // lv3 (mThumbnailDiv) - 모바일에서만 보일 이미지
        let mThumbnailDiv = document.createElement("div");
        mThumbnailDiv.className = "m-thumbnail";
        mThumbnailDiv.onclick = function () {
            goPostRead(post.post_id);
        }
    
        // lv4 (mImgbox)
        let mImgbox = document.createElement("div");
        mImgbox.className = "m-imgbox";

        if (post.post_images != null) {
        // lv5
    
        // lv5 (mThumbnailImg)
        let mThumbnailImg = document.createElement("img");
        mThumbnailImg.src = postImgSrc;
    
        mImgbox.appendChild(mThumbnailImg);
        mThumbnailDiv.appendChild(mImgbox);
        }
    
        // lv4 (mNumPhotosSpan) - 사진 개수
        let mNumPhotosSpan = document.createElement("span");
        mNumPhotosSpan.className = "m-num-photos";
        let blindSpan = document.createElement("span");
        blindSpan.className = "blind";
        mNumPhotosSpan.appendChild(blindSpan);
        mThumbnailDiv.appendChild(mNumPhotosSpan);
    
        postLeftDiv.appendChild(mThumbnailDiv);

    
        // lv3 (titleDiv)
        let titleDiv = document.createElement("div");
        titleDiv.className = "title";
        titleDiv.textContent = post.post_subject;
        titleDiv.onclick = function () {
            goPostRead(post.post_id);
        }
        postLeftDiv.appendChild(titleDiv);
    
        // lv3 (descDiv)
        let descDiv = document.createElement("div");
        descDiv.className = "desc";
    
        let htmlContent = post.post_content;
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        let images = tempDiv.querySelectorAll('img');
        images.forEach(img => img.remove());
        let textOnly = tempDiv.textContent.trim();
    
        descDiv.textContent = textOnly;
        descDiv.onclick = function () {
            goPostRead(post.post_id);
        }

        let imageCount = images.length;
        mNumPhotosSpan.append(imageCount);
    
        postLeftDiv.appendChild(descDiv);
    
        // lv3 (buttonsDiv)
        let buttonsDiv = document.createElement("div");
        buttonsDiv.className = "buttons";
    
        // 좋아요 버튼
        let likePostButton = document.createElement("button");
        likePostButton.className = "button";
        likePostButton.onclick = function () {
            // 좋아요 처리
        }
    
        let heartI = document.createElement("i");
        heartI.className = "fa-regular fa-heart";
        likePostButton.appendChild(heartI);
        likePostButton.textContent = "좋아요 " + post.post_likecnt;
        buttonsDiv.appendChild(likePostButton);
    
        // 댓글 버튼
        let commentPostButton = document.createElement("button");
        commentPostButton.className = "button";
        let commentI = document.createElement("i");
        commentI.className = "fa-regular fa-comment-dots";
        commentPostButton.appendChild(commentI);
        commentPostButton.textContent = "댓글 " + post.post_cmtcnt;
        buttonsDiv.appendChild(commentPostButton);
    
        postLeftDiv.appendChild(buttonsDiv);
        postDiv.appendChild(postLeftDiv);
    
        // lv2 (thumbnailDiv) - 썸네일
        let thumbnailDiv = document.createElement("div");
        thumbnailDiv.className = "thumbnail";
        thumbnailDiv.onclick = function () {
            goPostRead(post.post_id);
        }
    
        let thumbnailDiv2 = document.createElement("div");
        thumbnailDiv2.className = "thumbnail";

        if (post.post_images != null) {
        // lv4
        let thumnailImg = document.createElement("img");
        thumnailImg.src = postImgSrc;
        thumbnailDiv2.appendChild(thumnailImg);
        }

        // lv3
        // let numPhotosSpan = document.createElement("span");

        thumbnailDiv.appendChild(thumbnailDiv2);
        postDiv.appendChild(thumbnailDiv);
    
        // postContainerDiv에 추가
        postContatinerDiv.appendChild(postDiv);
    
    });
    

    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });


}



function goCommunityWrite(){
    window.location.href = "/community/write";
}