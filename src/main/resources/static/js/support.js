function loadPage(page) {
    fetch(`/loadPage?page=${page}`)
        .then(response => response.text())
        .then(html => {
            document.getElementById("listSpace").innerHTML = html;
        })
        .catch(error => console.error('Error loading page:', error));
}