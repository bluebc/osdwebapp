// 글 작성 완료
async function posting() {
    // console.log("게시");

    let user_id = document.getElementById("user_id").value;
    let type_id = document.getElementById("type_id").value;
    let theme_id = document.getElementById("theme_id").value;
    let post_subject = document.getElementById("post_subject").value;
    // summernote.js
    let post_content = getMarkupStr();
    let usedImages = getUsedImageList();
    let post_images = null;

    if (usedImages.length > 0) {
        post_images = JSON.stringify(usedImages);
    }



    if (user_id == null || user_id == "") {

        alert("로그인 세션이 만료되었습니다.");
        // window.location.href = "/";

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
        type_id: type_id,
        theme_id: theme_id,
        user_id: user_id,
        post_subject: post_subject,
        post_content: post_content,
        post_files: post_files,
        post_images: post_images
    };

    // 글 보내기
    const result = await postCommunityPost(post);

    const community_post = result.community_post;
    const post_id = community_post.post_id;


    //
    alert("글 작성이 완료되었습니다.");

    window.location.href = "/community/read?post_id=" + post_id;
}

// 서버에 글 post
async function postCommunityPost(post) {

    const response = await fetch("/community/postCommunityPost", {
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