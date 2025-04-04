function uploadFiles() {
    let formData = new FormData();
    let fileInput = document.getElementById("fileInput");

    if (fileInput.files.length === 0) {
        alert("파일을 선택하세요.");
        return;
    }

    for (let file of fileInput.files) {
        formData.append("files", file);
    }

    fetch("/file/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(fileNames => {
        let resultDiv = document.getElementById("uploadResult");
        resultDiv.innerHTML = "업로드된 파일:<br>";
        fileNames.forEach(fileName => {
            resultDiv.innerHTML += `<img src="/upload/files/${fileName}" width="200" style="margin:5px;"> <br>`;
        });
    })
    .catch(error => {
        console.error("업로드 실패", error);
    });
}