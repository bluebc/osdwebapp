var currentPage = 1;
var currentKeyword = "";
const viewPage = 10;
const limit = 10;

async function findPage() {

    const response = await fetch("/cunsult/getRownumSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {}
    });

    const result = await response.json();
    var rownum = result.rownum;

    var page = 1;

    if (rownum == 0) {
        return page;
    }

    page = parseInt(rownum / limit) + 1;
    if ((rownum / limit) == 0) {
        page -= 1;
    }
    return page;
}


async function search() {
    var keyword = document.getElementById("keyword").value;
    currentKeyword = keyword;
    currentPage = 1;
    const cunsultMap = await getCunsultPostByKeywordAndPage();
    setCunsultListTable(cunsultMap.list);
    setCunsultListPaging(currentPage, cunsultMap.maxPage, cunsultMap.count, cunsultMap.limit);
}

document.addEventListener("DOMContentLoaded", async function () {
    currentPage = await findPage();
    console.log(currentPage);
    const cunsultMap = await getCunsultPostByKeywordAndPage();
    setCunsultListTable(cunsultMap.list);
    setCunsultListPaging(currentPage, cunsultMap.maxPage, cunsultMap.count, cunsultMap.limit);
})


async function getCunsultPostByKeywordAndPage() {

    var page = parseInt(currentPage);
    var keyword = currentKeyword;
    if (keyword == null || keyword == undefined || keyword == "") {
        keyword = "";
    }

    var parameterMap = { keyword: keyword, page: page };

    const response = await fetch("/cunsult/getCunsultPostByKeywordAndPage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parameterMap)
    });

    const result = await response.json();

    return result;

}

// list 테이블로 생성
function setCunsultListTable(list) {
    var cunsultListTable = document.getElementById("cunsultListTable");

    while (cunsultListTable.firstChild) {
        cunsultListTable.removeChild(cunsultListTable.firstChild);
    }

    // th
    const columnTr = document.createElement("tr");
    const idTh = document.createElement("th");
    // idTh.textContent = "";
    const subjectTh = document.createElement("th");
    subjectTh.textContent = "제목";
    const userTh = document.createElement("th");
    userTh.textContent = "작성자";
    const createdTh = document.createElement("th");
    createdTh.textContent = "작성일";
    //
    const viewCntTh = document.createElement("th");
    viewCntTh.textContent = "조회수";
    columnTr.appendChild(idTh);
    columnTr.appendChild(subjectTh);
    columnTr.appendChild(userTh);
    columnTr.appendChild(createdTh);
    columnTr.appendChild(viewCntTh);
    cunsultListTable.appendChild(columnTr);


    list.forEach(cunsult => {
        const cunsultTr = document.createElement("tr");
        const idTd = document.createElement("td");
        idTd.textContent = cunsult.post_id;

        const subjectTd = document.createElement("td");
        subjectTd.textContent = cunsult.post_subject + " [" + cunsult.post_cmtcnt + "]";
        subjectTd.onclick = function () {
            // 글 읽기 기능 구현
            goCunsultRead(cunsult.post_id);
            console.log(cunsult.post_subject);
        }

        const cunsultBoxTd = document.createElement("td");
        cunsultBoxTd.className = "cunsultBoxTd";
        cunsultBoxTd.setAttribute("colspan", "3");


        const cunsultBox = document.createElement("div");
        cunsultBox.className = "cunsultBox";

        const userTd = document.createElement("span");
        userTd.textContent = cunsult.user_nickname;

        const createdTd = document.createElement("span");
        const cunsultCreatedAt = new Date(cunsult.post_created_at).toISOString().slice(0, 10);
        createdTd.textContent = cunsultCreatedAt;

        const viewCntTd = document.createElement("span");
        viewCntTd.textContent = cunsult.post_viewcnt;

        cunsultBox.appendChild(userTd);
        cunsultBox.appendChild(createdTd);
        cunsultBox.appendChild(viewCntTd);

        cunsultBoxTd.appendChild(cunsultBox);


        cunsultTr.appendChild(idTd);
        cunsultTr.appendChild(subjectTd);
        cunsultTr.appendChild(cunsultBoxTd);

        cunsultListTable.appendChild(cunsultTr);

    });
}

// 페이지 이동 버튼
function setCunsultListPaging(currentPage, maxPage, count, limit) {

    setPostCount(count);

    var cunsultListPaging = document.getElementById("cunsultPaging");
    while (cunsultListPaging.firstChild) {
        cunsultListPaging.removeChild(cunsultListPaging.firstChild);
    }

    // 10페이지씩
    // var viewPage = 10;
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
        leftPageBtn.className = "pagination";
        // 아이콘 대체?
        leftPageBtn.textContent = "<<"
        leftPageBtn.onclick = function () {
            qnaPaging(startPage - 1);
        }
        qnaListPaging.appendChild(leftPageBtn);
    }


    for (let page = startPage; page <= endPage; page++) {
        var pageDiv = document.createElement("div");
        pageDiv.className = "pagination";
        pageDiv.textContent = page;
        // console.log("input: " + page);

        if (page === currentPage) {
            pageDiv.classList.add("selected");
        }

        pageDiv.onclick = function () {
            // console.log("clicked: " + page);
            cunsultPaging(page);
        }
        cunsultListPaging.appendChild(pageDiv);
    }

    if (endPage != maxPage) {
        var rightPageBtn = document.createElement("div");
        rightPageBtn.className = "pagination";
        // 아이콘 대체?
        // let btnImg = document.createElement("img");
        // btnImg.src = "/img/사람.png";
        // rightPageBtn.appendChild(btnImg);
        rightPageBtn.textContent = ">>"
        rightPageBtn.onclick = function () {
            cunsultPaging(endPage + 1);
        }
        cunsultListPaging.appendChild(rightPageBtn);
    }

}

// 페이지 이동(검색어 반영)
async function cunsultPaging(page) {
    currentPage = page;

    const result = await getCunsultPostByKeywordAndPage();
    setCunsultListPaging(currentPage, result.maxPage, result.count, result.limit);
    setCunsultListTable(result.list);
}

// 글 읽기 이동
function goCunsultRead(post_id) {
    window.location.href = "/cunsult/read?post_id=" + post_id;
}

function goCunsultWrite() {
    window.location.href = "/cunsult/write";
}

function setPostCount(count) {
    document.getElementById("postCount").textContent = count;
}