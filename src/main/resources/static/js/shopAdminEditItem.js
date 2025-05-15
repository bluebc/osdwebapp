let field = "";

let groupList = [];
let categoryList = [];
let productList = [];

addEventListener("DOMContentLoaded", async function () {
    groupList = await getGroupListAll();
    categoryList = await getCategoryListAll();
    productList = await getProductListAll();
});


// Set field List
let row = 0;
let addCount = -1;
// let addedRow = -1;
const trName = "r";
const tdName = "c";
const s1 = "-";
const s2 = "_";
const s3 = " ";
const newFieldId = "new";

//

async function changeField(fieldName) {
    field = fieldName;
    row = 0;
    addCount = -1;

    switch (field) {
        case 'product':
            // const productList = await getProductListAll();
            setProductList(productList);
            break;
        case 'group':
            // const groupList = await getGroupListAll();
            setGroupList(groupList);
            break;
        case 'category':
            // const categoryList = await getCategoryListAll();
            setCategoryList(categoryList);
            break;
        case 'item':
            const itemList = await getItemListAll();
            setItemList(itemList);
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
        case 'group':
            addGroupRow();
            break;
        case 'category':
            addCategoryRow();
            break;
        case 'item':
            addItemRow();
            break;
    }
}

// ==================================================
// ▼ Shop_Product ▼
// ==================================================

async function getProductListAll() {

    const response = await fetch("/shop/admin/getProductListAll", {
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

    const fieldTbl = document.createElement("div");
    fieldTbl.className = field;
    fieldTbl.id = field;

    const fieldNameTr = document.createElement("div");
    fieldNameTr.className = field + s3 + "row" + s3 + "header";

    const productIdTh = document.createElement("div");
    productIdTh.textContent = "제품ID";
    const productNameTh = document.createElement("div");
    productNameTh.textContent = "제품 이름";

    fieldNameTr.appendChild(productIdTh);
    fieldNameTr.appendChild(productNameTh);

    fieldTbl.appendChild(fieldNameTr);


    list.forEach((product, rowIndex) => {

        const productTr = document.createElement("div");
        productTr.id = trName + s1 + rowIndex;
        productTr.className = field + s3 + "row";
        const idTd = document.createElement("div");
        idTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "id";
        idTd.textContent = product.product_id;
        productTr.appendChild(idTd);

        const nameTd = document.createElement("div");
        nameTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "name";
        nameTd.textContent = product.product_name;
        productTr.appendChild(nameTd);

        fieldTbl.appendChild(productTr);

        row = rowIndex;
    });
    fieldContainerDiv.appendChild(fieldTbl);

}

function addProductRow() {
    const fieldTbl = document.getElementById(field);

    row += 1;
    addCount += 1;
    // addedRow += 1;
    addedRow = addCount;
    rowIndex = row;

    const productTr = document.createElement("div");

    productTr.id = trName + s1 + rowIndex;
    productTr.className = field + s3 + "row";

    const idTd = document.createElement("div");
    idTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "id";
    const idInput = document.createElement("input");
    idInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "id";
    idInput.type = "text";
    idTd.appendChild(idInput);
    productTr.appendChild(idTd);

    const nameTd = document.createElement("div");
    nameTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "name";
    const nameInput = document.createElement("input");
    nameInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "name";
    nameInput.type = "text";
    nameTd.appendChild(nameInput);
    productTr.appendChild(nameTd);


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

function getModifiedProduct() {

}

// ==================================================
// ▲ Shop_Product ▲
// ==================================================



// ==================================================
// ▼ Shop_Item ▼
// ==================================================

async function getItemListAll() {

    const response = await fetch("/shop/admin/getItemListAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {},
    });

    const resultMap = await response.json();
    const list = resultMap.list;

    return list;
}

function setItemList(list) {

    row = 0;

    const fieldContainerDiv = document.getElementById("fieldContainer");

    while (fieldContainerDiv.firstChild) {
        fieldContainerDiv.removeChild(fieldContainerDiv.firstChild);
    }

    const fieldTbl = document.createElement("div");
    fieldTbl.className = field;
    fieldTbl.id = field;

    const fieldNameTr = document.createElement("div");
    fieldNameTr.className = field + s3 + "row" + s3 + "header";

    const itemIdTh = document.createElement("div");
    itemIdTh.textContent = "품목ID";
    const itemNameTh = document.createElement("div");
    itemNameTh.textContent = "품목 이름";
    const itemGroupTh = document.createElement("div");
    itemGroupTh.textContent = "그룹 ID";
    const itemCateTh = document.createElement("div");
    itemCateTh.textContent = "카테고리 ID";
    const itemPriceTh = document.createElement("div");
    itemPriceTh.textContent = "품목 정가";
    const itemDiscountedTh = document.createElement("div");
    itemDiscountedTh.textContent = "품목 할인가";
    const itemProductTh = document.createElement("div");
    itemProductTh.textContent = "품목 제품";
    const itemSortTh = document.createElement("div");
    itemSortTh.textContent = "품목 순서";
    const itemUseTh = document.createElement("div");
    itemUseTh.textContent = "품목 사용";


    fieldNameTr.appendChild(itemIdTh);
    fieldNameTr.appendChild(itemNameTh);
    fieldNameTr.appendChild(itemGroupTh);
    fieldNameTr.appendChild(itemCateTh);
    fieldNameTr.appendChild(itemPriceTh);
    fieldNameTr.appendChild(itemDiscountedTh);
    fieldNameTr.appendChild(itemProductTh);
    fieldNameTr.appendChild(itemSortTh);
    fieldNameTr.appendChild(itemUseTh);

    fieldTbl.appendChild(fieldNameTr);


    list.forEach((item, rowIndex) => {

        const itemTr = document.createElement("div");
        itemTr.className = field + s3 + "row";
        itemTr.id = trName + s1 + rowIndex;


        const idTd = document.createElement("div");
        idTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "id";
        idTd.textContent = item.item_id;
        itemTr.appendChild(idTd);

        const nameTd = document.createElement("div");
        nameTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "name";
        nameTd.textContent = item.item_name;
        itemTr.appendChild(nameTd);

        const groupTd = document.createElement("div");
        groupTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "group";
        groupTd.textContent = item.group_id;
        itemTr.appendChild(groupTd);

        const cateTd = document.createElement("div");
        cateTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "cate";
        cateTd.textContent = item.cate_id;
        itemTr.appendChild(cateTd);

        const priceTd = document.createElement("div");
        priceTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "price";
        priceTd.textContent = item.item_price;
        itemTr.appendChild(priceTd);

        const discountedTd = document.createElement("div");
        discountedTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "discounted";
        discountedTd.textContent = item.item_discounted;
        itemTr.appendChild(discountedTd);

        const productTd = document.createElement("div");
        productTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product";
        productTd.textContent = item.product_id;
        itemTr.appendChild(productTd);

        const sortTd = document.createElement("div");
        sortTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "sort";
        sortTd.textContent = item.item_sort;
        itemTr.appendChild(sortTd);

        const useTd = document.createElement("div");
        useTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "use";
        useTd.textContent = item.item_use;
        itemTr.appendChild(useTd);


        fieldTbl.appendChild(itemTr);

        row = rowIndex;
    });
    fieldContainerDiv.appendChild(fieldTbl);

}

function addItemRow() {
    const fieldTbl = document.getElementById(field);

    row += 1;
    addCount += 1;
    let addedRow = addCount;
    let rowIndex = row;

    const itemTr = document.createElement("div");
    itemTr.className = field + s3 + "row";

    itemTr.id = trName + s1 + rowIndex;

    const idTd = document.createElement("div");
    idTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "id";
    const idInput = document.createElement("input");
    idInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "id";
    idInput.type = "text";
    idTd.appendChild(idInput);
    itemTr.appendChild(idTd);

    const nameTd = document.createElement("div");
    nameTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "name";
    const nameInput = document.createElement("input");
    nameInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "name";
    nameInput.type = "text";
    nameTd.appendChild(nameInput);
    itemTr.appendChild(nameTd);

    // const groupTd = document.createElement("td");
    // groupTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "group";
    // const groupInput = document.createElement("input");
    // groupInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "group";
    // groupInput.type = "text";
    // groupTd.appendChild(groupInput);
    // itemTr.appendChild(groupTd);

    const groupTd = document.createElement("div");
    groupTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "group";



    const groupSelect = document.createElement("select");
    groupSelect.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "group";

    groupList.forEach(group => {
        const groupSelectOption = document.createElement("option");
        groupSelectOption.value = group.group_id;
        groupSelectOption.textContent = group.group_name;
        groupSelect.appendChild(groupSelectOption);
    });


    // groupSelect.addEventListener("change", function () {
    //     const cateSelect = document.getElementById(newFieldId + s1 + addedRow + s2 + tdName + s1 + "cate");
    //     while (cateSelect.firstChild) {
    //         cateSelect.removeChild(cateSelect.firstChild);
    //     }
    //     categoryList.forEach(category => {
    //         const group_id = document.getElementById(newFieldId + s1 + addedRow + s2 + tdName + s1 + "group").value;
    //         if (category.group_id != group_id) {
    //             return;
    //         }
    //         const cateSelectOption = document.createElement("option");
    //         cateSelectOption.value = category.cate_id;
    //         cateSelectOption.textContent = category.cate_name;
    //         cateSelect.appendChild(cateSelectOption);
    //     });

    // });

    groupSelect.addEventListener("change", function () {
        updateCategoryOptions();
    });



    groupTd.appendChild(groupSelect);
    itemTr.appendChild(groupTd);

    // const cateTd = document.createElement("td");
    // cateTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "cate";
    // const cateInput = document.createElement("input");
    // cateInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "cate";
    // cateInput.type = "text";
    // cateTd.appendChild(cateInput);
    // itemTr.appendChild(cateTd);

    const cateTd = document.createElement("div");
    cateTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "cate";

    const cateSelect = document.createElement("select");
    cateSelect.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "cate";

    cateTd.appendChild(cateSelect);
    itemTr.appendChild(cateTd);



    const priceTd = document.createElement("div");
    priceTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "price";
    const priceInput = document.createElement("input");
    priceInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "price";
    priceInput.type = "text";
    priceTd.appendChild(priceInput);
    itemTr.appendChild(priceTd);

    const discountedTd = document.createElement("div");
    discountedTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "discounted";
    const discountedInput = document.createElement("input");
    discountedInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "discounted";
    discountedInput.type = "text";
    discountedTd.appendChild(discountedInput);
    itemTr.appendChild(discountedTd);

    const productTd = document.createElement("div");
    productTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product";

    const productCount = document.createElement("input");
    productCount.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "product" + s2 + "count";
    productCount.type = "hidden";
    productCount.value = 0;
    productTd.appendChild(productCount);

    const productContainerDiv = document.createElement("div");
    productContainerDiv.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "product" + s2 + "container";
    productContainerDiv.className = "itemProductContainer";
    productTd.appendChild(productContainerDiv);

    const addProductBtn = document.createElement("input");
    addProductBtn.type = "button";
    addProductBtn.value = "추가";
    addProductBtn.onclick = function () {
        addSelectProductToItem(rowIndex, trName, tdName, newFieldId, addedRow);
    }
    productTd.appendChild(addProductBtn);



    // 제품 * 수량


    // const productInput = document.createElement("input");
    // productInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "product";
    // productInput.type = "text";

    // productTd.appendChild(productInput);








    itemTr.appendChild(productTd);

    const sortTd = document.createElement("div");
    sortTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "sort";
    const sortInput = document.createElement("input");
    sortInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "sort";
    sortInput.type = "text";
    sortTd.appendChild(sortInput);
    itemTr.appendChild(sortTd);

    const useTd = document.createElement("div");
    useTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "use";
    // const useInput = document.createElement("input");
    // useInput.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "use";
    // useInput.type = "text";
    // useTd.appendChild(useInput);

    const useSelect = document.createElement("select");
    useSelect.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "use";
    const useSelectOptionY = document.createElement("option");
    useSelectOptionY.value = "Y";
    useSelectOptionY.textContent = "Y";
    useSelect.appendChild(useSelectOptionY);
    const useSelectOptionN = document.createElement("option");
    useSelectOptionN.value = "N";
    useSelectOptionN.textContent = "N";
    useSelect.appendChild(useSelectOptionN);

    useTd.appendChild(useSelect);



    itemTr.appendChild(useTd);



    fieldTbl.appendChild(itemTr);


    // 후작업
    updateCategoryOptions();
    addSelectProductToItem(rowIndex, trName, tdName, newFieldId, addedRow);

}

// added => add
function addSelectProductToItem(rowIndex, trName, tdName, newFieldId, addedRow) {

    let productCount = document.getElementById(newFieldId + s1 + addedRow + s2 + tdName + s1 + "product" + s2 + "count");
    productCount.value = parseInt(productCount.value) + 1;
    let count = productCount.value;




    const productContainerDiv = document.getElementById(newFieldId + s1 + addedRow + s2 + tdName + s1 + "product" + s2 + "container");

    // const productTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "product");
    const productAndQuantityDiv = document.createElement("div");
    productAndQuantityDiv.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count;
    const productSelect = document.createElement("select");
    productSelect.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count + s2 + "select";
    productList.forEach(product => {
        const productSelectOption = document.createElement("option");
        productSelectOption.value = product.product_id;
        productSelectOption.textContent = product.product_name;
        productSelect.appendChild(productSelectOption);
    });
    productAndQuantityDiv.appendChild(productSelect);
    const productQuantity = document.createElement("input");
    productQuantity.id = newFieldId + s1 + addedRow + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count + s2 + "quantity";
    productQuantity.type = "number";
    productAndQuantityDiv.appendChild(productQuantity);

    const deleteProductBtn = document.createElement("input");
    deleteProductBtn.type = "button";
    deleteProductBtn.value = "삭제";
    deleteProductBtn.onclick = function () {
        // 해당 항목 삭제
        document.getElementById(newFieldId + s1 + addedRow + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count).remove();
    }
    productAndQuantityDiv.appendChild(deleteProductBtn);

    productContainerDiv.appendChild(productAndQuantityDiv);

}

function updateCategoryOptions() {
    let addedRow = addCount;
    const cateSelect = document.getElementById(newFieldId + s1 + addedRow + s2 + tdName + s1 + "cate");
    while (cateSelect.firstChild) {
        cateSelect.removeChild(cateSelect.firstChild);
    }
    categoryList.forEach(category => {
        const group_id = document.getElementById(newFieldId + s1 + addedRow + s2 + tdName + s1 + "group").value;
        if (category.group_id != group_id) {
            return;
        }
        const cateSelectOption = document.createElement("option");
        cateSelectOption.value = category.cate_id;
        cateSelectOption.textContent = category.cate_name;
        cateSelect.appendChild(cateSelectOption);
    });

};



function applyItemChanges() {

    insertList = getNewItem();

    if (insertList.length > 0) {

        const response = fetch("/shop/admin/insertItemList", {
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

function getNewItem() {
    let itemList = [];
    for (let rowIndex = 1; rowIndex <= addedRow; rowIndex++) {
        const item_id = document.getElementById(newFieldId + s1 + rowIndex + s2 + tdName + s1 + "id").value;
        if (item_id == null || item_id == "") {
            continue;
        }
        const item_name = document.getElementById(newFieldId + s1 + rowIndex + s2 + tdName + s1 + "name").value;
        if (item_name == null || item_name == "") {
            continue;
        }
        const item = { item_id: item_id, item_name: item_name };
        itemList.push(item);
    }
    return productList;
}

function getModifiedItem() {

}

// ==================================================
// ▲ Shop_Item ▲
// ==================================================

// ==================================================
// ▼ Shop_Group ▼
// ==================================================

async function getGroupListAll() {

    const response = await fetch("/shop/admin/getGroupListAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {},
    });

    const resultMap = await response.json();
    const list = resultMap.list;

    return list;
}

// ==================================================
// ▲ Shop_Group ▲
// ==================================================

// ==================================================
// ▼ Shop_Category ▼
// ==================================================

async function getCategoryListAll() {

    const response = await fetch("/shop/admin/getCategoryListAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {},
    });

    const resultMap = await response.json();
    const list = resultMap.list;

    return list;
}

// ==================================================
// ▲ Shop_Category ▲
// ==================================================



// ==================================================

function setFieldList(list) {
    const fieldContainerDiv = document.getElementById("fieldContainer");
    const fieldTbl = document.createElement("div");
    fieldTbl.className = field;

    list.forEach((element, rowIndex) => {
        const fieldTr = document.createElement("div");
        fieldTr.id = `r-${rowIndex}`;


        Object.values(element).forEach((value, colIndex) => {
            const fieldTd = document.createElement("div");
            fieldTd.id = `r-${rowIndex}_c-${colIndex}`;
            fieldTd.textContent = value;


            fieldTr.appendChild(fieldTd);
        });

        fieldTbl.appendChild(fieldTr);
    });

    fieldContainerDiv.appendChild(fieldTbl);
}

