document.addEventListener("DOMContentLoaded", function () {
    alert("로그아웃 되었습니다.");
    localStorage.setItem("isLoggedIn", false);
    window.location.href = "/";
});