var categoryList = [];
var currentCategory = "";


document.addEventListener("DOMContentLoaded", async function () {


    categoryList = await getCategories();
    
    // cate_sort 가장 빠른 id값
    currentCategory = categoryList[0].cate_id;
    setCategories(categoryList);

});

function selectCategory(cate_id){
    
    currentCategory = cate_id;

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


