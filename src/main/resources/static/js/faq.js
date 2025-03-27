document.addEventListener("DOMContentLoaded", async function () {
    setSelectCategory(await getCategories());
});


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

function setSelectCategory(categoryList) {
    const cateId = document.getElementById("cate_id");

    while (cateId.firstChild) {
        cateId.removeChild(cateId.firstChild);
    }

    categoryList.forEach(category => {
        const selectOption = document.createElement("option");
        selectOption.value = category.cate_id;
        selectOption.textContent = category.cate_name;
        cateId.appendChild(selectOption);
    });

}

function postFaq(){
    var cate_id = document.getElementById("cate_id").value;
    var faq_subject = document.getElementById("faq_subject").value;
    var faq_content = document.getElementById("faq_content").value;
    var faq_sort = document.getElementById("faq_sort").value;


    console.log(cate_id);
    console.log(faq_subject);
    console.log(faq_content);
    console.log(faq_sort);
}