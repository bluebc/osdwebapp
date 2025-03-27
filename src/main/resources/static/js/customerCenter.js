document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tab-button");
    const questions = document.querySelectorAll(".faq-question");
    const contents = document.querySelectorAll(".tab-content");

    // 모든 콘텐츠 보이기 
    contents.forEach(content => content.style.display = "block");
    document.querySelector(".all").classList.add("active");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            contents.forEach(content => content.style.display = "none");
            document.querySelectorAll(".faq-answer").forEach(answer => answer.style.display = "none"); // 모든 answer 닫기

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            if (button.classList.contains("all")) {
                contents.forEach(content => content.style.display = "block");
            } else {
                document.getElementById(button.getAttribute("aria-controls")).style.display = "block";
            }
        });
    });

    // 아코디언 기능 
    questions.forEach(question => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const isOpen = this.classList.contains("open");

            // 모든 질문 닫기
            document.querySelectorAll(".faq-question").forEach(q => q.classList.remove("open"));
            document.querySelectorAll(".faq-answer").forEach(ans => ans.style.display = "none");

            if (!isOpen) {
                this.classList.add("open");
                answer.style.display = "block";
            }
        });
    });
});


// +

function accordion() {
    const questions = document.querySelectorAll(".faq-question");

    // 아코디언 기능 
    questions.forEach(question => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const isOpen = this.classList.contains("open");

            // 모든 질문 닫기
            document.querySelectorAll(".faq-question").forEach(q => q.classList.remove("open"));
            document.querySelectorAll(".faq-answer").forEach(ans => ans.style.display = "none");

            if (!isOpen) {
                this.classList.add("open");
                answer.style.display = "block";
            }
        });
    });

}


$('.list > div').hide();
$(".list > div").slice(0, 2).css("display", "block");

$("#load").click(function (e) {
    e.preventDefault();
    $(".list >div:hidden").slice(0, 5).show().css('display', 'block');
    if ($(".list >div:hidden").length == 0) {
        $('#load').hide();
    }
});