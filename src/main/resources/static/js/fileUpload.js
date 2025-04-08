async function uploadFiles(fileInputId) {

    let formData = new FormData();
     let fileInput = document.getElementById(fileInputId);

    if (fileInput.files.length === 0) {
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

    return result;
};