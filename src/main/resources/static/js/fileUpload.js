// function beforeUp(){
// let formData = new FormData();
//     let fileInput = document.getElementById("fileInput");

//     if (fileInput.files.length === 0) {
//         // alert("파일을 선택하세요.");
//         return null;
//     }
//     uploadFiles(fileInput);
// }

async function uploadFiles(fileInputId) {

    let formData = new FormData();
    // let fileInput = document.getElementById("fileInput");
    let fileInput = document.getElementById(fileInputId);

    if (fileInput.files.length === 0) {
        // alert("파일을 선택하세요.");
        return null;
    }

    for (let file of fileInput.files) {
        formData.append("files", file);
    }

    const response = await fetch("/file/upload", {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    // const fileOriginNames = result.fileOriginNames;
    // const fileList = result.fileList;

    return result;
};



// function uploadFiles() {
//     let formData = new FormData();
//     let fileInput = document.getElementById("fileInput");

//     if (fileInput.files.length === 0) {
//         alert("파일을 선택하세요.");
//         return;
//     }

//     for (let file of fileInput.files) {
//         formData.append("files", file);
//     }


//     fetch("/file/upload2", {
//         method: "POST",
//         body: formData
//     })
//     .then(response => response.json())
//     .then(result =>{
//         const fileNames = result.fileNames;
//         var resultDiv = document.getElementById("uploadResult");
//         fileNames.forEach(file => {
//             let filenameH6 = document.createElement("h6");
//             filenameH6.textContent = file;
//             resultDiv.appendChild(filenameH6);
//         });
//     })

    // fetch("/file/upload", {
    //     method: "POST",
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(fileNames => {
    //     let resultDiv = document.getElementById("uploadResult");
    //     resultDiv.innerHTML = "업로드된 파일:<br>";
    //     fileNames.forEach(fileName => {
    //         resultDiv.innerHTML += `<img src="/upload/files/${fileName}" width="200" style="margin:5px;"> <br>`;
    //     });
    // })
    // .catch(error => {
    //     console.error("업로드 실패", error);
    // });
// }