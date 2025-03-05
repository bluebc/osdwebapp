// document.addEventListener("DOMContentLoaded", sessionCheck());

async function sessionCheck(page) {
    // localStorage.setItem("isLoggedIn", isLoggedIn);
    const response = await fetch("/getsession", {
        method: "POST"
    });
    const result = await response.json();

    alert(result.id);

    var isLoggedIn = false;
    if (result.id != null && result.id != "") {
        isLoggedIn = true;
    }

    switch (page) {
        case "header":
            if (isLoggedIn != true) {
                window.location.href = "/login";
            } else {
                window.location.href = "/logout";
            }
    }

}