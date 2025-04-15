var currentPage = 1;
var currentKeyword = "";
var categoryList = [];
var currentCate_id = 0;
var faqList = [];

var supportType = "";
// var supportType = "faq";
// var supportType = "qna";

function setSupportType(type) {
    supportType = type;
    document.getElementById("keyword").value = "";

    const supportContentDiv = document.getElementById("supportContent");
    while (supportContentDiv.firstChild) {
        supportContentDiv.removeChild(supportContentDiv.firstChild);
    }

    if (supportType == "faq") {

        // 관리자 FAQ 작성 버튼
        var login_user_role = document.getElementById("login_user_role").value;
        if (login_user_role == "ADMIN") {
            const faqWriteButton = document.createElement("input");
            faqWriteButton.type = "button";
            faqWriteButton.value = "글 작성(관리자)";
            faqWriteButton.className = "faqWriteButton";
            faqWriteButton.onclick = function () {
                location.href = "/support/faq/write";
            }
            supportContentDiv.appendChild(faqWriteButton);
        }

        const faqCategoryDiv = document.createElement("div");
        faqCategoryDiv.id = "faqCategory";
        supportContentDiv.appendChild(faqCategoryDiv);

        const faqListDiv = document.createElement("div");
        faqListDiv.id = "faqList";
        supportContentDiv.appendChild(faqListDiv);

        setCategories(categoryList);
    }

    if (supportType == "qna") {


        const qnaButtonDiv = document.createElement("div");
        qnaButtonDiv.id = "qnaButton";
        const qnaWriteButton = document.createElement("input");
        qnaWriteButton.type = "button";
        qnaWriteButton.value = "문의하기";
        qnaWriteButton.onclick = function(){
            location.href = "/support/qna/write";
        }
        qnaButtonDiv.appendChild(qnaWriteButton);
        supportContentDiv.appendChild(qnaButtonDiv);
        

        const qnaListDiv = document.createElement("div");
        qnaListDiv.id = "qnaList";

        const qnaListTable = document.createElement("table");
        qnaListTable.id = "qnaListTable";

        qnaListDiv.appendChild(qnaListTable);
        supportContentDiv.appendChild(qnaListDiv);

        const qnaListPagingDiv = document.createElement("div");
        qnaListPagingDiv.id = "qnaListPaging";

        supportContentDiv.appendChild(qnaListPagingDiv);
    }



    search();


}

document.addEventListener("DOMContentLoaded", async function () {

    categoryList = await getCategories();


    setSupportType("faq");


    search();

});



function search() {
    var keyword = document.getElementById("keyword").value;
    currentKeyword = keyword;
    if (supportType == "faq") {
        searchFaq();
    }
    if (supportType == "qna") {
        qnaPaging(1);
    }


}

document.addEventListener("DOMContentLoaded", function () {

    const firstBtn = document.querySelector(".snb-btn");
    if (firstBtn) {
        firstBtn.classList.add("active");
    }

    document.querySelectorAll(".snb-btn input").forEach(button => {
        button.addEventListener("click", function (event) {

            document.querySelectorAll(".snb-btn").forEach(btn => btn.classList.remove("active"));

            event.target.parentElement.classList.add("active");
        });
    });
});


