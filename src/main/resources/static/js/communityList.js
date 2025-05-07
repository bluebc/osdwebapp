console.log('--');

let currentPage = 1;
let currentKeyword = "";
let currentType = 0;
const viewPage = 10;
const limit = 10;


function setType(type_id){
    currentType = type_id;
    console.log(currentType);
}


function goPostRead(post_id) {
    window.location.href = "/community/read?post_id=" + post_id;
}


async function loadAndSetTest() {

    const result = await getPostList();
    const postList = result.list;

    console.log(postList);

    setPostList(postList);

}



function page() {

}

function search() {
    let keyword = document.getElementById("keyword").value;
    currentKeyword = keyword;
    console.log(currentKeyword);
    currentPage = 1;
}

async function getPostList() {

    let page = currentPage;
    let keyword = currentKeyword;
    let type_id = currentType;

    var parameterMap = { keyword: keyword, page: page, type_id: type_id };


    let response;

    if (type_id <= 1) {
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
    // const postList = result.list;
    // const postCount = result.count;

    return result;
}

function removeAllPost() {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => post.remove());
}

function setPostList(postList) {

    removeAllPost();

    let blogContainerDiv = document.getElementById("blogContainer");

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

        // lv1
        let postDiv = document.createElement("div");
        postDiv.className = "post"
        postDiv.id = "post_" + post.post_id;
        postDiv.onclick = function () {
            // goPostRead(post.post_id);
        }

        // lv2
        let postLeftDiv = document.createElement("div");
        postLeftDiv.className = "post-left";

        // lv3
        let authorDiv = document.createElement("div");
        authorDiv.className = "author";
        // lv4
        let authorImg = document.createElement("img");
        authorImg.src = userImgSrc;
        authorDiv.appendChild(authorImg);

        // lv4
        let writeTimeDiv = document.createElement("div");
        writeTimeDiv.className = "write-time";

        let createdAt = post.post_created_at;
        let date = new Date(createdAt);

        let yyyy = date.getFullYear();
        let MM = String(date.getMonth() + 1).padStart(2, '0');
        let dd = String(date.getDate()).padStart(2, '0');
        let hh = String(date.getHours()).padStart(2, '0');
        let mm = String(date.getMinutes()).padStart(2, '0');
        let ss = String(date.getSeconds()).padStart(2, '0');

        // let formattedTime = `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
        let formattedTime = `${yyyy}.${MM}.${dd}`;

        // writeTimeDiv.textContent = formattedTime;
        // hh 시간 전 표기?

        // lv5
        let writerH3 = document.createElement("h3");
        writerH3.textContent = post.user_nickname;
        writeTimeDiv.appendChild(writerH3);

        // lv5
        let timeH4 = document.createElement("h4");
        timeH4.textContent = formattedTime;
        writeTimeDiv.appendChild(timeH4);

        authorDiv.appendChild(writeTimeDiv);
        postLeftDiv.appendChild(authorDiv);
        postDiv.appendChild(postLeftDiv);

        // lv3
        let mThumbnailDiv = document.createElement("div");
        mThumbnailDiv.className = "m-thumbnail";
        mThumbnailDiv.onclick = function () {
            goPostRead(post.post_id);
        }

        // lv4
        let mImgbox = document.createElement("div");
        mImgbox.className = "m-imgbox";

        // lv5
        let mThumbnailImg = document.createElement("img");
        mThumbnailImg.src = postImgSrc;

        mImgbox.appendChild(mThumbnailImg);
        mThumbnailDiv.appendChild(mImgbox);

        // lv4
        let mNumPhotosSpan = document.createElement("span");
        mNumPhotosSpan.className = "m-num-photos";
        // lv5
        let blindSpan = document.createElement("span");
        blindSpan.className = "blind";
        // 사진 개수
        mNumPhotosSpan.appendChild(blindSpan);
        mThumbnailDiv.appendChild(mNumPhotosSpan);

        // lv3
        let titleDiv = document.createElement("div");
        titleDiv.className = "title";
        titleDiv.textContent = post.post_subject;
        titleDiv.onclick = function () {
            goPostRead(post.post_id);
        }
        postLeftDiv.appendChild(titleDiv);

        // lv3
        let descDiv = document.createElement("div");
        descDiv.className = "desc";

        let htmlContent = post.post_content;
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        let images = tempDiv.querySelectorAll('img');
        images.forEach(img => img.remove());
        let textOnly = tempDiv.textContent.trim();

        // descDiv.textContent = post.post_content;
        descDiv.textContent = textOnly;
        descDiv.onclick = function () {
            goPostRead(post.post_id);
        }

        // // 3줄만 표시하는 스타일 적용
        // descDiv.style.display = "-webkit-box";
        // descDiv.style.webkitBoxOrient = "vertical";
        // descDiv.style.webkitLineClamp = "3"; // 3줄 제한
        // descDiv.style.overflow = "hidden";
        // descDiv.style.textOverflow = "ellipsis";

        postLeftDiv.appendChild(descDiv);

        // lv3
        let buttonsDiv = document.createElement("div");
        buttonsDiv.className = "buttons";
        // lv4
        let likePostButton = document.createElement("button");
        likePostButton.className = "button";
        likePostButton.onclick = function () {

        }

        // lv5
        let heartI = document.createElement("i");
        heartI.className = "fa-regular fa-heart";
        // 텍스트, 하트 위치 의문
        likePostButton.appendChild(heartI);
        likePostButton.textContent = "좋아요";
        likePostButton.textContent += " ";
        likePostButton.textContent += post.post_likecnt;

        // 좋아요 개수 표기
        buttonsDiv.appendChild(likePostButton);

        // lv4
        let commentPostButton = document.createElement("button");
        commentPostButton.className = "button";

        // lv5
        let commentI = document.createElement("i");
        commentI.className = "fa-regular fa-comment-dots";
        commentPostButton.appendChild(commentI);
        commentPostButton.textContent = "댓글";
        commentPostButton.textContent += " ";
        commentPostButton.textContent += post.post_cmtcnt;

        buttonsDiv.appendChild(commentPostButton);
        postLeftDiv.appendChild(buttonsDiv);
        postDiv.appendChild(postLeftDiv);

        // lv2 ====================
        let thumbnailDiv = document.createElement("div");
        thumbnailDiv.className = "thumbnail";
        thumbnailDiv.onclick = function () {
            goPostRead(post.post_id);
        }

        // lv3
        let thumbnailDiv2 = document.createElement("div");
        thumbnailDiv2.className = "thumbnail";

        // lv4
        let thumnailImg = document.createElement("img");
        thumnailImg.src = postImgSrc;
        thumbnailDiv2.appendChild(thumnailImg);

        // lv3
        // let numPhotosSpan = document.createElement("span");

        thumbnailDiv.appendChild(thumbnailDiv2);
        postDiv.appendChild(thumbnailDiv);

        blogContainerDiv.appendChild(postDiv);

    });



}