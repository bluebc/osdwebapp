// var currentPage = 1;
// var currentKeyword = "";

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

    // th
    const columnTr = document.createElement("tr");
    const idTh = document.createElement("th");
    idTh.textContent = "번호";
    const subjectTh = document.createElement("th");
    subjectTh.textContent = "제목";
    const userTh = document.createElement("th");
    userTh.textContent = "작성자";
    const createdTh = document.createElement("th");
    createdTh.textContent = "작성 시간";
    const viewCntTh = document.createElement("th");
    viewCntTh.textContent = "조회수";
    columnTr.appendChild(idTh);
    columnTr.appendChild(subjectTh);
    columnTr.appendChild(userTh);
    columnTr.appendChild(createdTh);
    columnTr.appendChild(viewCntTh);
    qnaListTable.appendChild(columnTr);


    list.forEach(qna => {
        const qnaTr = document.createElement("tr");
        const idTd = document.createElement("td");
        idTd.textContent = qna.post_id;

        const subjectTd = document.createElement("td");
        subjectTd.textContent = qna.post_subject + " [" + qna.post_childcnt + "]";
        subjectTd.onclick = function () {
            // 글 읽기 기능 구현
            goQnaRead(qna.post_id);
            console.log(qna.post_subject);
        }

        const qnaBoxTd = document.createElement("td");
        qnaBoxTd.className = "qnaBoxTd";

        const qnaBox = document.createElement("div");
        qnaBox.className = "qnaBox";



        // const userTd = document.createElement("td");
        // userTd.textContent = qna.user_id;

        // const createdTd = document.createElement("td");
        // const qnaCreatedAt = new Date(qna.post_created_at).toISOString().slice(0, 10);
        // createdTd.textContent = qnaCreatedAt;

        // const viewCntTd = document.createElement("td");
        // viewCntTd.textContent = qna.post_viewcnt;

        // qnaBox.appendChild(userTd);
        // qnaBox.appendChild(createdTd);
        // qnaBox.appendChild(viewCntTd);

        const userSpan = document.createElement("span");
        userSpan.textContent = qna.user_id;

        const createdSpan = document.createElement("span");
        const qnaCreatedAt = new Date(qna.post_created_at).toISOString().slice(0, 10);
        createdSpan.textContent = qnaCreatedAt;

        const viewCntSpan = document.createElement("span");
        viewCntSpan.textContent = qna.post_viewcnt;

        qnaBox.appendChild(userSpan);
        qnaBox.appendChild(createdSpan);
        qnaBox.appendChild(viewCntSpan);

        qnaBoxTd.appendChild(qnaBox);


        qnaTr.appendChild(idTd);
        qnaTr.appendChild(subjectTd);
        // qnaTr.appendChild(userTd);
        // qnaTr.appendChild(createdTd);
        qnaTr.appendChild(qnaBoxTd);

        qnaListTable.appendChild(qnaTr);

    });
}

// document.addEventListener("DOMContentLoaded", async function () {
//     const qnaMap = await getQnaPostByKeywordAndPage();

//     setQnaListTable(qnaMap.list);
//     setQnaListPaging(currentPage, qnaMap.maxPage, qnaMap.count, qnaMap.limit);

// })

// 페이지 이동 버튼
function setQnaListPaging(currentPage, maxPage, count, limit) {

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
        leftPageBtn.textContent = "◀"
        leftPageBtn.onclick = function () {
            qnaPaging(startPage - 1);
        }
        qnaListPaging.appendChild(leftPageBtn);
    }


    for (let page = startPage; page <= endPage; page++) {
        var pageDiv = document.createElement("div");
        pageDiv.className = "qnaPage";
        pageDiv.textContent = page;
        // console.log("input: " + page);
        pageDiv.onclick = function () {
            // console.log("clicked: " + page);
            qnaPaging(page);
        }
        qnaListPaging.appendChild(pageDiv);
    }

    if (endPage != maxPage) {
        var rightPageBtn = document.createElement("div");
        rightPageBtn.className = "qnaPage";
        // 아이콘 대체?
        // let btnImg = document.createElement("img");
        // btnImg.src = "/img/사람.png";
        // rightPageBtn.appendChild(btnImg);
        rightPageBtn.textContent = "▶"
        rightPageBtn.onclick = function () {
            qnaPaging(endPage + 1);
        }
        qnaListPaging.appendChild(rightPageBtn);
    }

}

// 페이지 이동(검색어 반영)
async function qnaPaging(page) {
    currentPage = page;

    const result = await getQnaPostByKeywordAndPage();
    setQnaListPaging(currentPage, result.maxPage, result.count, result.limit);
    setQnaListTable(result.list);
<<<<<<< HEAD
=======
}

// 글 읽기 이동
function goQnaRead(post_id) {
    window.location.href = "/support/qna/read?post_id=" + post_id;
>>>>>>> Frontend
}