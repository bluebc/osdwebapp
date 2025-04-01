function loadPage(page) {
    fetch(`/loadPage?page=${page}`)
        .then(response => response.text())
        .then(html => {
            document.getElementById("listSpace").innerHTML = html;
        })
        .catch(error => console.error('Error loading page:', error));
}

// var supportType = "faq";
var supportType = "qna";

function setSupportType(type){
supportType = type;
}

function search() {
    var keyword = document.getElementById("keyword").value;
    currentKeyword = keyword;
    if(supportType=="faq"){

    }
    if(supportType=="qna"){
        qnaPaging(1);
    }
}