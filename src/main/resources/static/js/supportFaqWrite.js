document.addEventListener("DOMContentLoaded", async function () {
    setSelectCategory(await getCategories());
});


// 서버에서 카테고리 리스트
async function getCategories() {
    const response = await fetch("/support/faq/getFaqCategory",
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

async function postFaq() {
    var cate_id = document.getElementById("cate_id").value;
    var faq_subject = document.getElementById("faq_subject").value;
    var faq_content = document.getElementById("faq_content").value;
    var faq_sort = document.getElementById("faq_sort").value;

    var faq_list = {
        cate_id: cate_id,
        faq_subject: faq_subject,
        faq_content: faq_content,
        faq_sort: faq_sort
    };

    const response = await fetch("/support/faq/insertFaqList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faq_list)
    });

    const result = await response.json();

    switch (result.inserted) {
        case 1:
            console.log("FAQ 작성 완료");
            break;
        default:
            console.log("error");
    }
}