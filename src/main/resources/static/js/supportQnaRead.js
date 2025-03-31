addEventListener("DOMContentLoaded", function () {
    showModOrDel();
});

function showModOrDel() {

    fetch("/getsession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {}
    }).then(response => {
        return response.json();
    }).then(result => {
        if (result.login_user_id != null || result.login_user_id != "") {
            document.getElementById("modOrDel").style.display = "block";
        }
    });

}


function goQnaList(){
    alert("목록페이지 구현");
}