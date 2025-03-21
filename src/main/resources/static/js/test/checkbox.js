function getCheckbox() {

    var box1 = document.getElementById("checkbox1").checked;
    var box2 = document.getElementById("checkbox2").checked;
    var box3 = document.getElementById("checkbox3").checked;
    var box4 = document.getElementById("checkbox4").checked;
    var box5 = document.getElementById("checkbox5").checked;

    var boxes = [];
    boxes.push(box1);
    boxes.push(box2);
    boxes.push(box3);
    boxes.push(box4);
    boxes.push(box5);

    var str = "";
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i]) {
            str += "체크된 박스 : " + (i + 1);
            str += "<br>";
        }

        document.getElementById("checkedboxes").innerHTML = "";
        document.getElementById("checkedboxes").innerHTML += str;


    }




}