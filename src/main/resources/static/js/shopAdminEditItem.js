let field = "";

// Set field List
let row = 0;
const trName = "r";
const tdName = "c";
const s1 = "-";
const s2 = "_";
const newFieldId = "new";

//

async function changeField(fieldName) {
    field = fieldName;

    switch (field) {
        case 'product':
            const productList = await getProductListAll();
            setProductList(productList);
            break;
    }
    addFieldButton();
}

// ==================================================




function addFieldButton() {
    const fieldContainerDiv = document.getElementById("fieldContainer");
    const addFieldButton = document.createElement("input");
    addFieldButton.type = "button";
    addFieldButton.value = "추가";
    addFieldButton.onclick = function () {
        addField(field);
    }
    fieldContainerDiv.appendChild(addFieldButton);
}


function addField(field) {
    switch (field) {
        case 'product':
            addProductRow();
            break;
    }
}

// ==================================================
// ▼ Shop_Product ▼
// ==================================================

async function getProductListAll() {

    const response = await fetch("/shop/getProductListAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {},
    });

    const resultMap = await response.json();
    const list = resultMap.list;

    return list;
}

function setProductList(list) {

    row = 0;

    const fieldContainerDiv = document.getElementById("fieldContainer");

    while (fieldContainerDiv.firstChild) {
        fieldContainerDiv.removeChild(fieldContainerDiv.firstChild);
    }

    const fieldTbl = document.createElement("table");
    fieldTbl.className = field;
    fieldTbl.id = field;

    const fieldNameTr = document.createElement("tr");

    const productIdTh = document.createElement("th");
    productIdTh.textContent = "제품ID";
    const productNameTh = document.createElement("th");
    productNameTh.textContent = "제품 이름";

    fieldNameTr.appendChild(productIdTh);
    fieldNameTr.appendChild(productNameTh);

    fieldTbl.appendChild(fieldNameTr);


    list.forEach((product, rowIndex) => {

        row += 1;

        const productTr = document.createElement("tr");
        productTr.id = trName + s1 + rowIndex;
        const productIdTd = document.createElement("td");
        productIdTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "id";
        productIdTd.textContent = product.product_id;
        productTr.appendChild(productIdTd);

        const productNameTd = document.createElement("td");
        productNameTd.textContent = product.product_name;
        productTr.appendChild(productNameTd);

        fieldTbl.appendChild(productTr);
    });
    fieldContainerDiv.appendChild(fieldTbl);

}
let addedRow = 0;
function addProductRow() {
    const fieldTbl = document.getElementById(field);



    row += 1;
    addedRow += 1;
    rowIndex = row;

    const productTr = document.createElement("tr");

    productTr.id = trName + s1 + rowIndex;

    const productIdTd = document.createElement("td");
    productIdTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "id";
    const productIdInput = document.createElement("input");
    productIdInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "id";
    productIdInput.type = "text";
    productIdTd.appendChild(productIdInput);
    productTr.appendChild(productIdTd);

    const productNameTd = document.createElement("td");
    productNameTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "name";
    const productNameInput = document.createElement("input");
    productNameInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "name";
    productNameInput.type = "text";
    productNameTd.appendChild(productNameInput);
    productTr.appendChild(productNameTd);


    fieldTbl.appendChild(productTr);
}

function applyProductChanges() {

    insertList = getNewProduct();

    if (insertList.length > 0) {

        const response = fetch("/shop/admin/insertProductList", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(insertList)
        }).then(response => response.json())
            .then(resultMap => {
                const inserted = resultMap.inserted;
                const result = resultMap.result;
                console.log(inserted);
                console.log(result);
            });

    }

}

function getNewProduct() {
    let productList = [];
    for (let rowIndex = 1; rowIndex <= addedRow; rowIndex++) {
        const product_id = document.getElementById(newFieldId + s1 + rowIndex + s2 + tdName + s1 + "id").value;
        if (product_id == null || product_id == "") {
            continue;
        }
        const product_name = document.getElementById(newFieldId + s1 + rowIndex + s2 + tdName + s1 + "name").value;
        if (product_name == null || product_name == "") {
            continue;
        }
        const product = { product_id: product_id, product_name: product_name };
        productList.push(product);
    }
    return productList;
}

function getModifiedProduct(){
    
}

// ==================================================
// ▲ Shop_Product ▲
// ==================================================




// ==================================================

function setFieldList(list) {
    const fieldContainerDiv = document.getElementById("fieldContainer");
    const fieldTbl = document.createElement("table");
    fieldTbl.className = field;

    list.forEach((element, rowIndex) => {
        const fieldTr = document.createElement("tr");
        fieldTr.id = `r-${rowIndex}`;


        Object.values(element).forEach((value, colIndex) => {
            const fieldTd = document.createElement("td");
            fieldTd.id = `r-${rowIndex}_c-${colIndex}`;
            fieldTd.textContent = value;


            fieldTr.appendChild(fieldTd);
        });

        fieldTbl.appendChild(fieldTr);
    });

    fieldContainerDiv.appendChild(fieldTbl);
}

