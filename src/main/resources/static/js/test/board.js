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

    const response = await fetch("tPostBoard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(board)
    });
    const result = await response.json();

    console.log(result.code);
}


