var categoryList = [];
var currentCate_id = 0;
var faqList = [];
var currentKeyword;


document.addEventListener("DOMContentLoaded", async function () {

    categoryList = await getCategories();

    await setCategories(categoryList);
    await showFaqList(currentCate_id, currentKeyword);
    accordion();


    const buttons = document.querySelectorAll(".tab-button");
    // const questions = document.querySelectorAll(".faq-question");
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

    // // 아코디언 기능 
    // questions.forEach(question => {
    //     question.addEventListener("click", function () {
    //         const answer = this.nextElementSibling;
    //         const isOpen = this.classList.contains("open");

    //         // 모든 질문 닫기
    //         document.querySelectorAll(".faq-question").forEach(q => q.classList.remove("open"));
    //         document.querySelectorAll(".faq-answer").forEach(ans => ans.style.display = "none");

    //         if (!isOpen) {
    //             this.classList.add("open");
    //             answer.style.display = "block";
    //         }
    //     });
    // });
});


$('.list > div').hide();
$(".list > div").slice(0, 2).css("display", "block");

$("#load").click(function (e) {
    e.preventDefault();
    $(".list >div:hidden").slice(0, 5).show().css('display', 'block');
    if ($(".list >div:hidden").length == 0) {
        $('#load').hide();
    }
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


// 카테고리 선택
function selectCategory(cate_id) {
    currentCate_id = cate_id;
    showFaqList(currentCate_id, currentKeyword);
}

// 서버에서 카테고리 리스트
async function getCategories() {
    const response = await fetch("/getFaqCategory",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {}
        }
    )
    const list = response.json();
    return list;
}

// 서버에서 FAQ리스트 수집
async function getFaqListByCateIdAndKeyword(cate_id, keyword) {

    cate_id = parseInt(cate_id);

    if (keyword == null || keyword == undefined || keyword == "") {
        keyword = "";
    }

    const response = await fetch("/getFaqListByCateIdAndKeyword",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cate_id: cate_id, keyword: keyword })
        }
    )
    const list = response.json();
    return list;
}

// 검색
function searchQuestion() {

    var keyword = document.getElementById("keyword").value;
    currentKeyword = keyword;

    showFaqList(currentCate_id, keyword);
}

// 
async function showFaqList(cate_id, keyword) {
    faqList = await getFaqListByCateIdAndKeyword(cate_id, keyword);
    await setFaqListTag(faqList);
    accordion();
}

// 카테고리 만들기
function setCategories(list) {

    const div = document.getElementById("selectCategory");


    // 기존 내용 삭제
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    // "전체" 버튼 추가
    const allBtn = document.createElement("button");
    allBtn.className = "tab-button";
    allBtn.textContent = "전체";
    allBtn.role = "tab";
    allBtn.onclick = function () {
        selectCategory(0);
    };
    div.appendChild(allBtn);

    // 리스트에 있는 카테고리 추가
    list.forEach(category => {
        const categoryBtn = document.createElement("button");
        categoryBtn.className = "tab-button";
        categoryBtn.textContent = category.cate_name;
        categoryBtn.role = "tab";
        categoryBtn.onclick = function () {
            selectCategory(category.cate_id);
        };
        div.appendChild(categoryBtn);
    });
}

function setFaqListTag(faqList) {

    const categoryMap = new Map();

    categoryList.forEach(category => {
        var cate_id = category.cate_id;
        var cate_name = category.cate_name;
        categoryMap.set(cate_id, cate_name);
    });

    const faqListSection = document.getElementById("faq-list");
    while (faqListSection.firstChild) {
        faqListSection.removeChild(faqListSection.firstChild);
    }

    faqList.forEach(faq => {

        const tapContent = document.createElement("div");
        tapContent.className = "tab-content";
        tapContent.role = "tabpanel";

        const faqBox = document.createElement("div");
        faqBox.className = "faq-box";

        const faqQuestion = document.createElement("div");
        faqQuestion.className = "faq-question";
        // faqQuestion.onclick = function(){
        //     accordion();
        // }

        const questionTitle = document.createElement("strong");
        questionTitle.className = "faq-tit";
        questionTitle.textContent = "Q";

        const questionContent = document.createElement("div");

        const categorySpan = document.createElement("span");
        categorySpan.className = "faq-subject";
        categorySpan.textContent = "[" + categoryMap.get(faq.cate_id) + "]";

        const questionSpan = document.createElement("span");
        questionSpan.className = "faq-tet";
        questionSpan.textContent = faq.faq_subject;

        questionContent.appendChild(categorySpan);
        questionContent.appendChild(questionSpan);

        faqQuestion.appendChild(questionTitle);
        faqQuestion.appendChild(questionContent);

        faqBox.appendChild(faqQuestion);

        tapContent.appendChild(faqBox);

        const faqAnswer = document.createElement("div");
        faqAnswer.className = "faq-answer";

        const answerTbl = document.createElement("table");
        const answerTbody = document.createElement("tbody");

        const answerTr = document.createElement("tr");
        // class 사용 필요
        const answerTdA = document.createElement("td");

        const answerTitle = document.createElement("strong");
        answerTitle.className = "faq-tit";
        answerTitle.textContent = "A";

        answerTdA.appendChild(answerTitle);
        answerTr.appendChild(answerTdA);

        const answerTdB = document.createElement("td");
        answerTdB.vAlign = "top";

        const answerContent = document.createElement("div");
        answerContent.className = "faq-tet";

        const answerP = document.createElement("p");

        const answerSpan = document.createElement("span");
        answerSpan.textContent = faq.faq_content;

        answerP.appendChild(answerSpan);
        answerTdB.appendChild(answerP);
        answerTr.appendChild(answerTdB);
        answerTbody.appendChild(answerTr);
        answerTbl.appendChild(answerTbody);


        faqAnswer.appendChild(answerTbl);
        faqBox.appendChild(faqAnswer);
        tapContent.appendChild(faqBox);
        faqListSection.appendChild(tapContent);

    });
}
