let userImage = null;

document.addEventListener("DOMContentLoaded", function () {


    document.getElementById('uploadImage').addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;

        // 미리보기
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);

        // 서버 전송
        const formData = new FormData();
        formData.append('file', file);

        fetch('/file/uploadUserImage', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(filename => {
                userImage = filename;
                console.log('업로드 완료:', filename);
                // filename: 서버에서 반환된 파일명
            })
            .catch(error => {
                console.error('업로드 실패:', error);
            });
    });



});

// async function applyUpdate() {

//     const user_id = document.getElementById("user_id").textContent;
//     const user_img = userImage;
//     console.log(userImage);

//     const user_info = { user_id: user_id, user_img: user_img };

//     const response = await fetch("/user/info/updateUserInfo", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user_info)
//     });

//     const result = await response.json();
//     // console.log(result.status);

//     switch(result.status){
//         case 1:
//             alert("변경이 완료되었습니다.");
//             window.location.href = "/user/info";
//             break;
//     }

// }

async function applyUpdate() {

    const user_id = document.getElementById("user_id").value; 
    const user_img = userImage;
    console.log(userImage);
    
    const user_info = { user_id, user_img };

    const response = await fetch("/user/info/updateUserInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user_info)
    });

    const result = await response.json();

    switch(result.status) {
        case 1:
            alert("변경이 완료되었습니다.");
            window.location.href = "/user/info";
            break;
        default:
            alert("변경 실패");
    }
}
