let fileList = [];

addEventListener("DOMContentLoaded", async function () {
    const typeResultMap = await getPostTypeList();
    const typeList = typeResultMap.list;
    setPostTypeList(typeList);

    let type_id = document.getElementById("type_id").value;
    document.getElementById("post_type").value = type_id;

    let originalFileList = JSON.parse(document.getElementById("originalFileJSON").value);
    fileList = originalFileList;
    console.log(originalFileList);
    setOriginalFileList(originalFileList);
});


function setOriginalFileList(originalFileList) {
    const originalFilesDiv = document.getElementById("originalFiles");
    while (originalFilesDiv.firstChild) {
        originalFilesDiv.removeChild(originalFilesDiv.firstChild);
    }
    originalFileList.forEach(originalFile => {
        let originalfileDiv = document.createElement("div");

        let deleteCheckBox = document.createElement("input");
        deleteCheckBox.type = "checkbox";
        deleteCheckBox.value = originalFile;
        deleteCheckBox.name = "deleteFile";
        originalfileDiv.appendChild(deleteCheckBox);

        let fileName = originalFile.substring(originalFile.indexOf("_") + 1);
        let fileNameLabel = document.createElement("label");
        fileNameLabel.textContent = fileName;
        originalfileDiv.appendChild(fileNameLabel);

        originalFilesDiv.appendChild(originalfileDiv);

    });
    
    if (originalFileList.length>0) {
        let deleteFileButton = document.createElement("input");
        deleteFileButton.type = "button";
        deleteFileButton.value = "삭제";
        deleteFileButton.onclick = function () {
            deleteOriginalFiles();
        }
        originalFilesDiv.appendChild(deleteFileButton);
    }

}

function deleteOriginalFiles() {
    const checkedBoxes = document.querySelectorAll("input[name='deleteFile']:checked");
    const filesToDelete = Array.from(checkedBoxes).map(checkedBox => checkedBox.value);
    console.log(fileList);
    fileList = fileList.filter(file => !filesToDelete.includes(file));
    console.log(fileList);
    setOriginalFileList(fileList);
}


async function getPostTypeList() {

    const response = await fetch("/community/getPostTypeList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {}
    });

    const result = await response.json();

    return result;
}

function setPostTypeList(typeList) {

    let postTypeSelect = document.getElementById("post_type");

    while (postTypeSelect.firstChild) {
        postTypeSelect.removeChild(postTypeSelect.firstChild);
    }

    typeList.forEach(type => {
        let postTypeOption = document.createElement("option");
        postTypeOption.value = type.type_id;
        postTypeOption.textContent = type.type_name;
        postTypeSelect.append(postTypeOption);
    });



}






// 글 작성 완료
async function modify() {
    // console.log("게시");

    var post_id = document.getElementById("post_id").value;
    let type_id = document.getElementById("post_type").value;
    var user_id = document.getElementById("user_id").value;
    var post_subject = document.getElementById("post_subject").value;
    // var post_content = document.getElementById("post_content").value;
    // summernote
    let post_content = getMarkupStr();
    let usedImages = getUsedImageList();
    let post_images = null;

    if (usedImages.length > 0) {
        post_images = JSON.stringify(usedImages);
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
    // fileList
    let post_files;

    const uploaded = await uploadFiles(fileInputId);
    if (uploaded != null) {
        const newfileList = uploaded.fileList;

        newfileList.forEach(file => {
            fileList.push(file);
        });
        // console.log(files);
    }
    post_files = JSON.stringify(fileList);

    let post = {
        post_id: post_id,
        type_id: type_id,
        // theme_id: theme_id,
        user_id: user_id,
        post_subject: post_subject,
        post_content: post_content,
        post_files: post_files,
        post_images: post_images
    };

    // 글 보내기
    const result = await modifyCommunityPost(post);

    const status = result.status;


    //
    switch (status) {
        case -1:
            console.log("로그인 정보 없음");
            break;
        case -2:
            console.log("로그인 정보 작성자 정보와 불일치");
            break;
        case -101:
            console.log("글 정보 없음");
            break;
        case -301:
            console.log("DB 에러");
            break;
        case 1:
            alert("글 수정이 완료되었습니다.");
            window.location.href = "/community/read?post_id=" + post_id;
            break;
    }

}

// 서버에 글 post
async function modifyCommunityPost(community_post) {

    const response = await fetch("/community/modifyCommunityPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(community_post)
    });

    const result = await response.json();
    return result;
}


// 글 작성 취소
function cancelModify() {
    if (confirm("글 수정을 취소하시겠습니까?")) {
        // window.history.back();
        // 원문 글 읽는 곳으로
        var post_id = document.getElementById("post_id").value;
        window.location.href = "/community/read?post_id=" + post_id;
    }

    // console.log("취소");
}