let newFileList = [];
let themesByType = new Map();

addEventListener("DOMContentLoaded", async function () {
    const typeResultMap = await getPostTypeList();
    const typeList = typeResultMap.list;
    setPostTypeList(typeList);

    const themeResultMap = await getPostThemeList();
    const themeList = themeResultMap.list;

    setThemesByTypeMap(typeList, themeList);

    // type 변경 시 theme 업데이트
    const typeSelect = document.getElementById("post_type");
    typeSelect.addEventListener("change", function () {

        let type_id = parseInt(this.value);
        setPostThemeList(type_id);
    });
    
    let type_id = document.getElementById("post_type").value;
    type_id = parseInt(type_id);
    setPostThemeList(type_id);

    // 업로드할 파일 선택 이벤트
    document.getElementById("fileInput").addEventListener("change", function () {
        getNewFileList();
        setNewFileList(newFileList);
    });

});



function setThemesByTypeMap(typeList, themeList) {

    typeList.forEach(type => {
        let type_id = type.type_id;
        let themes = [];

        themeList.forEach(theme => {

            if (type_id == theme.type_id) {
                themes.push(theme);
            }

        });

        themesByType.set(type_id, themes);

    });
    return themesByType;
}


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
        deleteCheckBox.value = `${newFile.name}_${newFile.size}`;
        deleteCheckBox.name = "deleteNewFile";
        newfileDiv.appendChild(deleteCheckBox);

        let fileName = newFile.name;
        let fileNameLabel = document.createElement("label");
        fileNameLabel.textContent = fileName;
        newfileDiv.appendChild(fileNameLabel);

        newFilesDiv.appendChild(newfileDiv);

    });

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
    const filesToDelete = Array.from(checkedBoxes).map(checkedBox => checkedBox.value);

    newFileList = newFileList.filter(file => {
        const identifier = `${file.name}_${file.size}`;
        return !filesToDelete.includes(identifier);
    });

    setNewFileList(newFileList);
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


async function getPostThemeList() {

    const response = await fetch("/community/getPostThemeList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {}
    });

    const result = await response.json();

    return result;
}

function setPostThemeList(type_id) {

    let themeList = themesByType.get(type_id);
    let postThemeSelect = document.getElementById("post_theme");

    while (postThemeSelect.firstChild) {
        postThemeSelect.removeChild(postThemeSelect.firstChild);
    }

    themeList.forEach(theme => {
        let postThemeOption = document.createElement("option");
        postThemeOption.value = theme.theme_id;
        postThemeOption.textContent = theme.theme_name;
        postThemeSelect.append(postThemeOption);
    });

}


// 글 작성 완료
async function posting() {
    // console.log("게시");

    let user_id = document.getElementById("user_id").value;
    let type_id = document.getElementById("post_type").value;
    let theme_id = document.getElementById("post_theme").value;
    if(theme_id == null){
        theme_id = 0;
    }
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

    var files = [];

    const uploaded = await uploadFiles(newFileList);
    if (uploaded != null) {
        const uploadfileList = uploaded.fileList;

        uploadfileList.forEach(file => {
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