// document.addEventListener("DOMContentLoaded", function () {
//     const buttons = document.querySelectorAll(".tab-button");
//     const allButton = document.querySelector(".all");
//     const contents = document.querySelectorAll(".tab-content");

//     contents.forEach(content => content.style.display = "none");

//     buttons.forEach((button) => {
//         button.addEventListener("click", function () {
//             contents.forEach(content => content.style.display = "none");
            
//             buttons.forEach(btn => btn.classList.remove("active"));
//             allButton.classList.remove("active");

//             button.classList.add("active");
        
//             document.getElementById(button.getAttribute("aria-controls")).style.display = "block";
//         });
//     });


//     // all 버튼 
//     allButton.addEventListener("click", function () {
//         contents.forEach(content => content.style.display = "block");
//         buttons.forEach(btn => btn.classList.remove("active"));
//         allButton.classList.add("active");
//     });
// });