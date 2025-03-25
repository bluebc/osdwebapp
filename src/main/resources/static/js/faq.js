var categoryList = [];
var currentCate_id;
var faqList = [];
var cuurentKeyword;

// 최초 실행
document.addEventListener("DOMContentLoaded", async function () {
    categoryList = await getCategories();

    // cate_sort 가장 빠른 id값
    currentCate_id = categoryList[0].cate_id;
    setCategories(categoryList);
    showFaqList(currentCate_id, cuurentKeyword);
});

// 카테고리 선택
function selectCategory(cate_id) {
    currentCate_id = cate_id;
    showFaqList(currentCate_id, cuurentKeyword);
}

// 전체 카테고리 버튼 나열
function setCategories(list) {
    var str = "";
    for (var i = 0; i < list.length; i++) {
        str += "<div class = 'category-btn' onclick='selectCategory(\"" + list[i].cate_id + "\")'>" + list[i].cate_name + "</div>";
    }
    document.getElementById("selectCategory").innerHTML = str;
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

// list 태그 만들기
function setFaqListTag(list) {

    var str = "";
    for (var i = 0; i < list.length; i++) {
        str += "<div class = 'faq'>"
        str += "<div class = 'faq_subject'>" + list[i].faq_subject + "</div>";
        str += "<div class = 'faq_content'>" + list[i].faq_content + "</div>";
        str += "</div>";
    }
    document.getElementById("faqList").innerHTML = str;
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