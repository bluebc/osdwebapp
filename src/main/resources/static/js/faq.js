var categoryList = [];
var currentCate_id = 0;
var faqList = [];
var cuurentKeyword;

// 최초 실행
document.addEventListener("DOMContentLoaded", async function () {
    categoryList = await getCategories();

    // cate_sort 가장 빠른 id값
    // currentCate_id = categoryList[0].cate_id;
    setCategories(categoryList);
    showFaqList(currentCate_id, cuurentKeyword);
});

// 카테고리 선택
function selectCategory(cate_id) {
    currentCate_id = cate_id;
    showFaqList(currentCate_id, cuurentKeyword);
}

// // 전체 카테고리 버튼 나열
// function setCategories(list) {
//     var str = "";
//     str += "<div class = 'category-btn' onclick='selectCategory(0)'>" + "전체" + "</div>";
//     for (var i = 0; i < list.length; i++) {
//         str += "<div class = 'category-btn' onclick='selectCategory(" + list[i].cate_id + ")'>" + list[i].cate_name + "</div>";
//     }
//     document.getElementById("selectCategory").innerHTML = str;
// }

// 전체 카테고리 버튼 나열(보안)
function setCategories(list) {
    const div = document.getElementById("selectCategory");

    // 기존 내용 삭제
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    // "전체" 버튼 추가
    const allBtn = document.createElement("div");
    allBtn.className = "category-btn";
    allBtn.textContent = "전체";
    allBtn.onclick = function () {
        selectCategory(0);
    };
    div.appendChild(allBtn);

    // 리스트에 있는 카테고리 추가
    list.forEach(category => {
        const categoryBtn = document.createElement("div");
        categoryBtn.className = "category-btn";
        categoryBtn.textContent = category.cate_name;
        categoryBtn.onclick = function () {
            selectCategory(category.cate_id);
        };
        div.appendChild(categoryBtn);
    });
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

// // list 태그 만들기
// function setFaqListTag(list) {

//     var str = "";
//     for (var i = 0; i < list.length; i++) {
//         str += "<div class = 'faq'>"
//         str += "<div class = 'faq_subject'>" + list[i].faq_subject + "</div>";
//         str += "<div class = 'faq_content'>" + list[i].faq_content + "</div>";
//         str += "</div>";
//     }
//     document.getElementById("faqList").innerHTML = str;
// }

// list 태그 만들기 (보안)
function setFaqListTag(list) {
    const faqContainer = document.getElementById("faqList");

    // 기존 내용 삭제
    while (faqContainer.firstChild) {
        faqContainer.removeChild(faqContainer.firstChild);
    }

    // 리스트 순회하면서 FAQ 항목 추가
    list.forEach(faq => {
        const faqDiv = document.createElement("div");
        faqDiv.className = "faq";

        const subjectDiv = document.createElement("div");
        subjectDiv.className = "faq_subject";
        subjectDiv.textContent = faq.faq_subject;

        const contentDiv = document.createElement("div");
        contentDiv.className = "faq_content";
        contentDiv.textContent = faq.faq_content;

        // FAQ 요소에 추가
        faqDiv.appendChild(subjectDiv);
        faqDiv.appendChild(contentDiv);
        faqContainer.appendChild(faqDiv);
    });
}

// 검색
function searchQuestion() {

    var keyword = document.getElementById("keyword").value;
    cuurentKeyword = keyword;

    showFaqList(currentCate_id, keyword);
}

// 
async function showFaqList(cate_id, keyword) {
    faqList = await getFaqListByCateIdAndKeyword(cate_id, keyword);
    setFaqListTag(faqList);
}