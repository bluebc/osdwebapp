let fileList = [];
let newFileList = [];
let originalFileList = [];

addEventListener("DOMContentLoaded", async function () {
    const typeResultMap = await getPostTypeList();
    const typeList = typeResultMap.list;
    setPostTypeList(typeList);

    let type_id = document.getElementById("type_id").value;
    document.getElementById("post_type").value = type_id;

    originalFileList = JSON.parse(document.getElementById("originalFileJSON").value);
    fileList = originalFileList;
    console.log(originalFileList);
    setOriginalFileList(originalFileList);

    document.getElementById("fileInput").addEventListener("change", function () {
        getNewFileList();
        setNewFileList(newFileList);
    });
});

async function uploadFiles(newFileList) {

    let formData = new FormData();
    if (newFileList.length === 0) {
        return null;
    }

    for (let file of newFileList) {
        formData.append("files", file);
    }

    const response = await fetch("/file/upload", {
        method: "POST",
        body: formData
    });

    const result = await response.json();

    return result;
};


function getNewFileList() {

    let fileInput = document.getElementById("fileInput");
    let files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        let isDuplicate = newFileList.some(f => f.name === files[i].name && f.size === files[i].size);
        if (!isDuplicate) {
            newFileList.push(files[i]);
        } else {
            alert(`중복된 파일입니다: ${files[i].name}`);
        }
    }
}

function setNewFileList(newFileList) {

    const newFileContainerDiv = document.getElementById("newFileContainer");
    const newFilesDiv = document.getElementById("newFiles");

    while (newFilesDiv.firstChild) {
        newFilesDiv.removeChild(newFilesDiv.firstChild);
    }

    newFileList.forEach(newFile => {
        let newfileDiv = document.createElement("div");

        let deleteCheckBox = document.createElement("input");
        deleteCheckBox.type = "checkbox";
        // deleteCheckBox.value = newFile;
        // name + size를 기준으로 고유값 생성
        deleteCheckBox.value = `${newFile.name}_${newFile.size}`;
        deleteCheckBox.name = "deleteNewFile";
        newfileDiv.appendChild(deleteCheckBox);

        let fileName = newFile.name;
        let fileNameLabel = document.createElement("label");
        fileNameLabel.textContent = fileName;
        newfileDiv.appendChild(fileNameLabel);

        newFilesDiv.appendChild(newfileDiv);

    });

    // if (newFileList.length > 0) {
    //     let deleteFileButton = document.createElement("input");
    //     deleteFileButton.type = "button";
    //     deleteFileButton.value = "삭제";
    //     deleteFileButton.onclick = function () {
    //         deleteNewFiles();
    //     }
    //     newFileContainerDiv.appendChild(deleteFileButton);
    // }
    let deleteNewFilesButton = document.getElementById("deleteNewFilesButton");
    if (newFileList.length > 0) {
        deleteNewFilesButton.style.display = "block";
    }
    else {
        deleteNewFilesButton.style.display = "none";
    }

}


function deleteNewFiles() {
    const checkedBoxes = document.querySelectorAll("input[name='deleteNewFile']:checked");
    console.log(checkedBoxes);
    const filesToDelete = Array.from(checkedBoxes).map(checkedBox => checkedBox.value);
    console.log(filesToDelete);

    // newFileList = newFileList.filter(file => !filesToDelete.includes(file));
    newFileList = newFileList.filter(file => {
        const identifier = `${file.name}_${file.size}`;
        return !filesToDelete.includes(identifier);
    });

    setNewFileList(newFileList);
}

function setOriginalFileList(originalFileList) {
    const originalFileContainerDiv = document.getElementById("originFileContainer");
    const originalFilesDiv = document.getElementById("originalFiles");
    while (originalFilesDiv.firstChild) {
        originalFilesDiv.removeChild(originalFilesDiv.firstChild);
    }
    originalFileList.forEach(originalFile => {
        let originalfileDiv = document.createElement("div");

        let deleteCheckBox = document.createElement("input");
        deleteCheckBox.type = "checkbox";
        deleteCheckBox.value = originalFile;
        deleteCheckBox.name = "deleteOriginalFile";
        originalfileDiv.appendChild(deleteCheckBox);

        let fileName = originalFile.substring(originalFile.indexOf("_") + 1);
        let fileNameLabel = document.createElement("label");
        fileNameLabel.textContent = fileName;
        originalfileDiv.appendChild(fileNameLabel);

        originalFilesDiv.appendChild(originalfileDiv);

    });

    // if (originalFileList.length > 0) {
    //     let deleteFileButton = document.createElement("input");
    //     deleteFileButton.type = "button";
    //     deleteFileButton.value = "삭제";
    //     deleteFileButton.onclick = function () {
    //         deleteOriginalFiles();
    //     }
    //     originalFileContainerDiv.appendChild(deleteFileButton);
    // }

    let deleteOriginalFilesButton = document.getElementById("deleteOriginalFilesButton");
    if (originalFileList.length > 0) {
        deleteOriginalFilesButton.style.display = "block";
    }
    else {
        deleteOriginalFilesButton.style.display = "none";
    }

}

function deleteOriginalFiles() {
    const checkedBoxes = document.querySelectorAll("input[name='deleteOriginalFile']:checked");
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

    // var fileInputId = "fileInput";
    // fileList
    let post_files;

    const uploaded = await uploadFiles(newFileList);
    if (uploaded != null) {
        const uploadfileList = uploaded.fileList;

        uploadfileList.forEach(file => {
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