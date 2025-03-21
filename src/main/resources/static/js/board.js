async function posting() {

    var category = document.getElementById("category");
    var id = document.getElementById("id");
    var title = document.getElementById("title");
    var content = document.getElementById("content");

    var user_id = id.value;
    var board_category = category.value;

    var board_title = title.value;
    if (board_title == "") {
        title.focus();
        alert("제목 입력");
        return;
    }

    var board_content = content.value;
    if (board_content == "") {
        content.focus();
        alert("내용 입력");
        return;
    }


    var board = {
        user_id: user_id,
        board_category: board_category,
        board_title: board_title,
        board_content: board_content
    };

    const response = await fetch("/postBoard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(board)
    });
    const result = await response.json();

    console.log(result.code);

    if (result.code == 1) {
        alert("글 작성이 완료되었습니다.");
        window.location.href = "/boardread?board_no=" + result.board_info.board_no;
    }
}

function modifyBoard(board_no) {
    if (confirm("수정하시겠습니까?")) {
        window.location.href = "/boardmodify?board_no=" + board_no;
    }
}

function deleteBoard(board_no) {
    alert("delete");
}

function requestModify() {


    if (confirm("저장하시겠습니까?")) {
        requestUpdate();
    };

}


async function requestUpdate() {

    var board_no = document.getElementById("board_no").value;


    var category = document.getElementById("category");
    var id = document.getElementById("id");
    var title = document.getElementById("title");
    var content = document.getElementById("content");

    var user_id = id.value;
    var board_category = category.value;

    var board_title = title.value;
    if (board_title == "") {
        title.focus();
        alert("제목 입력");
        return;
    }

    var board_content = content.value;
    if (board_content == "") {
        content.focus();
        alert("내용 입력");
        return;
    }


    var board = {
        board_no: board_no,
        user_id: user_id,
        board_category: board_category,
        board_title: board_title,
        board_content: board_content
    };

    const response = await fetch("/postModifiedBoard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(board)
    });
    const result = await response.json();

    console.log(result.code);
}

function cancelModify() {

    var board_no = document.getElementById("board_no").value;

    window.location.href = "/boardread?board_no=" + board_no;

}


function previousList() {
    var currentPage = parseInt(document.getElementById("currentPage").value);
    window.location.href = "/boardlist?page=" + (currentPage - 1);
}
function nextList() {
    var currentPage = parseInt(document.getElementById("currentPage").value);
    window.location.href = "/boardlist?page=" + (currentPage + 1);
}

addEventListener("DOMContentLoaded", function () {
    hidePagingButton();
});

function hidePagingButton() {

    var currentPage = parseInt(document.getElementById("currentPage").value);
    var maxPage = parseInt(document.getElementById("maxPage").value);

    if (currentPage <= 1) {
        document.getElementById("pre1").style.display = "none";
        document.getElementById("pre2").style.display = "none";
    }


    if (currentPage >= maxPage) {
        document.getElementById("next1").style.display = "none";
        document.getElementById("next2").style.display = "none";
    }
}

async function goBoardList() {

    const result = await getListPage();

    var page = result.page;

    var board_no = result.board_no;

    window.location.href = "/boardlist?page=" + page;

}



async function getListPage() {

    var board_no = parseInt(document.getElementById("board_no").value);

    const response = await fetch("/getListPage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board_no: board_no })
    }
    );

    const result = await response.json();

    return result;
}