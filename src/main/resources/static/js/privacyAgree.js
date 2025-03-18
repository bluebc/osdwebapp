$(function () {
    $("#modal-open").click(() => $("#popup").css("display", "flex").hide().fadeIn(100));
    $("#confirm, #close").click(() => $("#popup").fadeOut(100));
});