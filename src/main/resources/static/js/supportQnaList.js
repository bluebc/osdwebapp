var currentPage = 1;
var currentKeyword = "";


async function getQnaPostByKeywordAndPage() {

    var page = parseInt(currentPage);
    var keyword = currentKeyword;
    if (keyword == null || keyword == undefined || keyword == "") {
        keyword = "";
    }

    var parameterMap = { keyword: keyword, page: page };

    const response = await fetch("/support/qna/getQnaPostByKeywordAndPage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parameterMap)
    });

    const result = await response.json();

    return result;

}




// list 테이블로 생성
function setQnaListTable(list) {
    var qnaListTable = document.getElementById("qnaListTable");
    while (qnaListTable.firstChild) {
        qnaListTable.removeChild(qnaListTable.firstChild);
    }
    list.forEach(qna => {
        const qnaTr = document.createElement("tr");
        const idTd = document.createElement("td");
        idTd.textContent = qna.post_id;

        const subjectTd = document.createElement("td");
        subjectTd.textContent = qna.post_subject + " [" + qna.post_childcnt + "]";
        subjectTd.onclick = function () {
            console.log(qna.post_subject);
        }


        const userTd = document.createElement("td");
        userTd.textContent = qna.user_id;
        const createdTd = document.createElement("td");
        createdTd.textContent = qna.post_created_at;


        qnaTr.appendChild(idTd);
        qnaTr.appendChild(subjectTd);
        qnaTr.appendChild(userTd);
        qnaTr.appendChild(createdTd);

        qnaListTable.appendChild(qnaTr);

    });

    // console.log(qnaTable);
}

document.addEventListener("DOMContentLoaded", async function () {
    // setQnaListTable();
    const qnaMap = await getQnaPostByKeywordAndPage();


    setQnaListTable(qnaMap.list);


    console.log(currentPage);
    console.log(qnaMap.count);
    console.log(qnaMap.limit);
    console.log(qnaMap.maxPage);
    setQnaListPaging(currentPage, qnaMap.count, qnaMap.limit, qnaMap.maxPage);

})

function setQnaListPaging(currentPage, count, limit, maxPage) {


    var qnaListPaging = document.getElementById("qnaListPaging");
    while (qnaListPaging.firstChild) {
        qnaListPaging.removeChild(qnaListPaging.firstChild);
    }



    // 10페이지씩
    var viewPage = 10;
    var startPage = parseInt(currentPage / viewPage) * viewPage + 1;
    if (currentPage % viewPage == 0) {
        startPage = (parseInt(currentPage / viewPage) - 1) * viewPage + 1;
    }

    var endPage = startPage + viewPage - 1;
    if (endPage > maxPage) {
        endPage = maxPage;
    }

    if (currentPage > viewPage) {
        var leftPageBtn = document.createElement("div");
        leftPageBtn.className = "qnaPage";
        // 아이콘 대체?
        leftPageBtn.textContent = "<<"
        leftPageBtn.onclick = function () {
            qnaPaging(startPage - 1);
        }
        qnaListPaging.appendChild(leftPageBtn);
    }


    for (let page = startPage; page <= endPage; page++) {
        var pageDiv = document.createElement("div");
        pageDiv.className = "qnaPage";
        pageDiv.textContent = page;
        console.log("input: " + page);
        pageDiv.onclick = function () {
            console.log("clicked: " + page);
            qnaPaging(page);
        }
        qnaListPaging.appendChild(pageDiv);
    }

    if (endPage != maxPage) {
        var rightPageBtn = document.createElement("div");
        rightPageBtn.className = "qnaPage";
        // 아이콘 대체?
        rightPageBtn.textContent = ">>"
        rightPageBtn.onclick = function () {
            qnaPaging(endPage + 1);
        }
        qnaListPaging.appendChild(rightPageBtn);
    }



}


async function qnaPaging(page) {
    currentPage = page;
    
    const result = await getQnaPostByKeywordAndPage();
    setQnaListPaging(currentPage, result.count, result.limit, result.maxPage);
    setQnaListTable(result.list);
}