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
        const faqCategoryDiv = document.createElement("div");
        faqCategoryDiv.id = "faqCategory";
        supportContentDiv.appendChild(faqCategoryDiv);

        const faqListDiv = document.createElement("div");
        faqListDiv.id = "faqList";
        supportContentDiv.appendChild(faqListDiv);

        setCategories(categoryList);
    }

    if (supportType == "qna") {
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




