addEventListener("DOMContentLoaded", function () {

    // 업로드할 파일 선택 이벤트
    document.getElementById("fileInput").addEventListener("change", function () {
        getNewFileList();
        setNewFileList(newFileList);
    });

});


// 글 작성 완료
async function posting() {
    // console.log("게시");

    var user_id = document.getElementById("user_id").value;
    var post_subject = document.getElementById("post_subject").value;
    // var post_content = document.getElementById("post_content").value;
    // summernote.js
    let post_content = getMarkupStr();
    let usedImages = getUsedImageList();
    let post_images = null;

    if (usedImages.length > 0) {
        post_images = JSON.stringify(usedImages);
    }



    if (user_id == null || user_id == "") {

        alert("로그인 세션이 만료되었습니다.");
        window.location.href = "/";

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

    // const uploaded = await uploadFiles(fileInputId);
    // if (uploaded != null) {
    //     const fileList = uploaded.fileList;

    //     fileList.forEach(file => {
    //         files.push(file);
    //     });
    //     // console.log(files);
    //     var post_files = JSON.stringify(files);
    // }

    const uploaded = await uploadFiles(newFileList);
    if (uploaded != null) {
        const uploadfileList = uploaded.fileList;

        uploadfileList.forEach(file => {
            files.push(file);
        });
        var post_files = JSON.stringify(files);
    }



    var post = {
        user_id: user_id,
        post_subject: post_subject,
        post_content: post_content,
        post_files: post_files,
        post_images: post_images
    };

    // 글 보내기
    const result = await postCunsultPost(post);

    const cunsult_post = result.cunsult_post;
    const post_id = cunsult_post.post_id;


    //
    alert("글 작성이 완료되었습니다.");

    window.location.href = "/cunsult/read?post_id=" + post_id;
}

// 서버에 글 post
async function postCunsultPost(post) {

    const response = await fetch("/cunsult/postCunsultPost", {
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


let newFileList = [];

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
