let field = "";

let groupList = [];
let categoryList = [];
let productList = [];
let productMap = new Map(productList.map(product => [String(product.product_id), product.product_name]));

addEventListener("DOMContentLoaded", async function () {
    groupList = await getGroupListAll();
    categoryList = await getCategoryListAll();
    productList = await getProductListAll();
    productMap = new Map(productList.map(product => [String(product.product_id), product.product_name]));
});


// Set field List
let row = 0;
let addCount = -1;
let modifyCount = -1;
// let addedRow = -1;
const trName = "r";
const tdName = "c";
const s1 = "-";
const s2 = "_";
const s3 = " ";
const newFieldId = "new";
const modifyFieldId = "modify";

//

async function changeField(fieldName) {
    field = fieldName;
    row = 0;
    addCount = -1;
    modifyCount = -1;

    const applyChangesButton = document.getElementById("applyChangesButton");

    switch (field) {
        case 'product':
            // const productList = await getProductListAll();
            setProductList(productList);
            applyChangesButton.onclick = function () {
                applyProductChanges();
            }
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
            applyChangesButton.onclick = function () {
                applyItemChanges();
            }
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
    addedRowIndex = addCount;
    rowIndex = row;

    const productTr = document.createElement("div");

    productTr.id = trName + s1 + rowIndex;
    productTr.className = field + s3 + "row";

    const idTd = document.createElement("div");
    idTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "id";
    const idInput = document.createElement("input");
    idInput.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "id";
    idInput.type = "text";
    idTd.appendChild(idInput);
    productTr.appendChild(idTd);

    const nameTd = document.createElement("div");
    nameTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "name";
    const nameInput = document.createElement("input");
    nameInput.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "name";
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
            });

    }

}

function getNewProduct() {
    let productList = [];
    for (let rowIndex = 0; rowIndex < addCount; rowIndex++) {
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
    const itemEditTh = document.createElement("div");
    itemEditTh.textContent = "편집";


    fieldNameTr.appendChild(itemIdTh);
    fieldNameTr.appendChild(itemNameTh);
    fieldNameTr.appendChild(itemGroupTh);
    fieldNameTr.appendChild(itemCateTh);
    fieldNameTr.appendChild(itemPriceTh);
    fieldNameTr.appendChild(itemDiscountedTh);
    fieldNameTr.appendChild(itemProductTh);
    fieldNameTr.appendChild(itemSortTh);
    fieldNameTr.appendChild(itemUseTh);
    fieldNameTr.appendChild(itemEditTh);

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

        let item_productList = [];
        item_productList = JSON.parse(item.item_product);


        const productCount = document.createElement("input");
        productCount.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "count";
        productCount.type = "hidden";
        productCount.value = item_productList.length;
        productTd.appendChild(productCount);


        const productContainerDiv = document.createElement("div");
        productContainerDiv.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "container";
        productContainerDiv.className = "itemProductContainer";
        productTd.appendChild(productContainerDiv);

        let i = -1;
        item_productList.forEach(item_product => {
            i += 1;

            const productAndQuantityDiv = document.createElement("div");
            // productAndQuantityDiv.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + item_product.item_product_id;
            productAndQuantityDiv.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i;

            const itemProductId = document.createElement("input");
            itemProductId.type = "hidden"
            // itemProductId.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + item_product.item_product_id + s2 + "id";
            itemProductId.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i + s2 + "i";
            itemProductId.value = item_product.item_product_id;

            productAndQuantityDiv.appendChild(itemProductId);


            const productId = document.createElement("input");
            productId.type = "hidden"
            // productId.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + item_product.item_product_id + s2 + "id";
            productId.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i + s2 + "id";
            productId.value = item_product.product_id;

            productAndQuantityDiv.appendChild(productId);


            const productName = document.createElement("div");
            // productName.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + item_product.item_product_id + s2 + "name";
            productName.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i + s2 + "name";
            productName.textContent = productMap.get(item_product.product_id);

            productAndQuantityDiv.appendChild(productName);


            const productQuantity = document.createElement("div");
            // productQuantity.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + item_product.item_product_id + s2 + "quantity";
            productQuantity.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i + s2 + "quantity";
            productQuantity.textContent = item_product.product_quantity;
            productAndQuantityDiv.appendChild(productQuantity);


            productContainerDiv.appendChild(productAndQuantityDiv);



        });
        productTd.appendChild(productContainerDiv);

        itemTr.appendChild(productTd);

        const sortTd = document.createElement("div");
        sortTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "sort";
        sortTd.textContent = item.item_sort;
        itemTr.appendChild(sortTd);

        const useTd = document.createElement("div");
        useTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "use";
        useTd.textContent = item.item_use;
        itemTr.appendChild(useTd);

        const editTd = document.createElement("div");
        editTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "edit";
        const editBtn = document.createElement("input");
        editBtn.type = "button";
        editBtn.value = "수정";
        editBtn.onclick = function () {
            // 기존 데이터 수정 기능
            modifyItem(rowIndex);
        }
        editTd.appendChild(editBtn);
        itemTr.appendChild(editTd);

        fieldTbl.appendChild(itemTr);

        row = rowIndex;
    });
    fieldContainerDiv.appendChild(fieldTbl);

}

function addItemRow() {
    const fieldTbl = document.getElementById(field);

    row += 1;
    addCount += 1;
    let addedRowIndex = addCount;
    let rowIndex = row;

    const itemTr = document.createElement("div");
    itemTr.className = field + s3 + "row";

    itemTr.id = trName + s1 + rowIndex;

    const idTd = document.createElement("div");
    idTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "id";
    const idInput = document.createElement("input");
    idInput.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "id";
    idInput.type = "text";
    idTd.appendChild(idInput);
    itemTr.appendChild(idTd);

    const nameTd = document.createElement("div");
    nameTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "name";
    const nameInput = document.createElement("input");
    nameInput.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "name";
    nameInput.type = "text";
    nameTd.appendChild(nameInput);
    itemTr.appendChild(nameTd);

    const groupTd = document.createElement("div");
    groupTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "group";

    const groupSelect = document.createElement("select");
    groupSelect.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "group";

    groupList.forEach(group => {
        const groupSelectOption = document.createElement("option");
        groupSelectOption.value = group.group_id;
        groupSelectOption.textContent = group.group_name;
        groupSelect.appendChild(groupSelectOption);
    });

    groupSelect.addEventListener("change", function () {
        updateCategoryOptions();
    });

    groupTd.appendChild(groupSelect);
    itemTr.appendChild(groupTd);

    const cateTd = document.createElement("div");
    cateTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "cate";

    const cateSelect = document.createElement("select");
    cateSelect.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "cate";

    cateTd.appendChild(cateSelect);
    itemTr.appendChild(cateTd);

    const priceTd = document.createElement("div");
    priceTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "price";
    const priceInput = document.createElement("input");
    priceInput.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "price";
    priceInput.type = "text";
    priceTd.appendChild(priceInput);
    itemTr.appendChild(priceTd);

    const discountedTd = document.createElement("div");
    discountedTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "discounted";
    const discountedInput = document.createElement("input");
    discountedInput.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "discounted";
    discountedInput.type = "text";
    discountedTd.appendChild(discountedInput);
    itemTr.appendChild(discountedTd);

    const productTd = document.createElement("div");
    productTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "product";

    const productCount = document.createElement("input");
    productCount.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count";
    productCount.type = "hidden";
    productCount.value = 0;
    productTd.appendChild(productCount);

    const productContainerDiv = document.createElement("div");
    productContainerDiv.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "container";
    productContainerDiv.className = "itemProductContainer";
    productTd.appendChild(productContainerDiv);

    const addProductBtn = document.createElement("input");
    addProductBtn.type = "button";
    addProductBtn.value = "추가";
    addProductBtn.onclick = function () {
        addSelectProductToItem(rowIndex, trName, tdName, newFieldId, addedRowIndex);
    }
    productTd.appendChild(addProductBtn);

    itemTr.appendChild(productTd);

    const sortTd = document.createElement("div");
    sortTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "sort";
    const sortInput = document.createElement("input");
    sortInput.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "sort";
    sortInput.type = "text";
    sortTd.appendChild(sortInput);
    itemTr.appendChild(sortTd);

    const useTd = document.createElement("div");
    useTd.id = trName + s1 + rowIndex + s2 + tdName + s1 + "use";


    const useSelect = document.createElement("select");
    useSelect.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "use";
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


    const editTd = document.createElement("div");
    editTd.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "edit";
    const editBtn = document.createElement("input");
    editBtn.type = "button";
    editBtn.value = "삭제";
    editBtn.onclick = function () {
        // 추가 품목 삭제
        document.getElementById(trName + s1 + rowIndex).remove();
    }
    editTd.appendChild(editBtn);

    itemTr.appendChild(editTd);


    fieldTbl.appendChild(itemTr);



    // 후작업
    updateCategoryOptions();
    addSelectProductToItem(rowIndex, trName, tdName, newFieldId, addedRowIndex);

}


function addSelectProductToItem(rowIndex, trName, tdName, newFieldId, addedRowIndex) {

    let productCount = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count");
    productCount.value = parseInt(productCount.value) + 1;
    let count = productCount.value;

    const productContainerDiv = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "container");

    const productAndQuantityDiv = document.createElement("div");
    productAndQuantityDiv.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count;
    const productSelect = document.createElement("select");
    productSelect.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count + s2 + "id";
    productList.forEach(product => {
        const productSelectOption = document.createElement("option");
        productSelectOption.value = product.product_id;
        productSelectOption.textContent = product.product_name;
        productSelect.appendChild(productSelectOption);
    });
    productAndQuantityDiv.appendChild(productSelect);
    const productQuantity = document.createElement("input");
    productQuantity.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count + s2 + "quantity";
    productQuantity.type = "number";
    productAndQuantityDiv.appendChild(productQuantity);

    const deleteProductBtn = document.createElement("input");
    deleteProductBtn.type = "button";
    deleteProductBtn.value = "삭제";
    deleteProductBtn.onclick = function () {
        document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count).remove();
    }
    productAndQuantityDiv.appendChild(deleteProductBtn);

    productContainerDiv.appendChild(productAndQuantityDiv);

}

function updateCategoryOptions() {
    let addedRowIndex = addCount;
    const cateSelect = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "cate");
    while (cateSelect.firstChild) {
        cateSelect.removeChild(cateSelect.firstChild);
    }
    categoryList.forEach(category => {
        const group_id = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "group").value;
        if (category.group_id != group_id) {
            return;
        }
        const cateSelectOption = document.createElement("option");
        cateSelectOption.value = category.cate_id;
        cateSelectOption.textContent = category.cate_name;
        cateSelect.appendChild(cateSelectOption);
    });

};



async function applyItemChanges() {

    const insertList = await getNewItem();

    if (insertList.length > 0) {

        const response = fetch("/shop/admin/insertItemList", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(insertList)
        }).then(response => response.json())
            .then(resultMap => {
                const inserted = resultMap.inserted;
                const result = resultMap.result;
                console.log("insertItemList: " + inserted);
                console.log("insertItemList: " + result);
            });

    }

}

async function getNewItem() {
    let itemList = [];
    for (let addedRowIndex = 0; addedRowIndex <= addCount; addedRowIndex++) {
        const item_id = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "id").value;
        if (item_id == null || item_id == "") {
            continue;
        }
        const item_name = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "name").value;
        if (item_name == null || item_name == "") {
            continue;
        }
        const group_id = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "group").value;
        if (group_id == null || group_id == "") {
            continue;
        }
        const cate_id = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "cate").value;
        if (cate_id == null || cate_id == "") {
            continue;
        }
        const item_price = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "price").value;
        if (item_price == null || item_price == "") {
            continue;
        }
        const item_discounted = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "discounted").value;
        if (item_discounted == null || item_discounted == "") {
            continue;
        }
        // product
        let item_product = [];
        const productCount = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count").value;
        for (let count = 1; count <= productCount; count++) {
            const productAndQuantityDiv = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count);
            if (productAndQuantityDiv == null) {
                continue;
            }
            let product_id = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count + s2 + "id").value;
            let product_quantity = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count" + s1 + count + s2 + "quantity").value;
            // const product = { product_id: product_id, product_quantity: product_quantity };
            const product = { item_id: item_id, product_id: product_id, product_quantity: product_quantity };

            item_product.push(product);
            // function insertItemProductList();

        }

        const itemProductList = await insertItemProductList(item_product);
        item_product = await itemProductList;

        item_product = JSON.stringify(item_product);
        // product

        const item_sort = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "sort").value;
        if (item_sort == null || item_sort == "") {
            continue;
        }
        const item_use = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "use").value;
        if (item_use == null || item_use == "") {
            continue;
        }

        const item = {
            item_id: item_id,
            item_name: item_name,
            group_id: group_id,
            cate_id: cate_id,
            item_price: item_price,
            item_discounted: item_discounted,
            item_product: item_product,
            item_sort: item_sort,
            item_use: item_use
        };
        itemList.push(item);
    }
    return itemList;
}

async function insertItemProductList(item_product) {
    const response = await fetch("/shop/admin/insertItemProductList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item_product),
    });

    const resultMap = await response.json();
    const list = resultMap.list;
    console.log("insertItemProductList: " + resultMap.status);
    return list;
}

function modifyItem(rowIndex) {

    modifyCount += 1;
    let modifyRow = modifyCount;

    const idTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "id");
    const idVal = idTd.textContent;
    while (idTd.firstChild) {
        idTd.removeChild(idTd.firstChild);
    }
    const idInput = document.createElement("input");
    idInput.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "id";
    idInput.type = "readonly";
    idInput.value = idVal;
    idTd.appendChild(idInput);

    const nameTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "name");
    const nameVal = nameTd.textContent;
    while (nameTd.firstChild) {
        nameTd.removeChild(nameTd.firstChild);
    }
    const nameInput = document.createElement("input");
    nameInput.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "name";
    nameInput.type = "text";
    nameInput.value = nameVal;
    nameTd.appendChild(nameInput);

    const groupTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "group");
    const groupVal = groupTd.textContent;
    while (groupTd.firstChild) {
        groupTd.removeChild(groupTd.firstChild);
    }
    const groupInput = document.createElement("input");
    groupInput.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "group";
    groupInput.type = "text";
    groupInput.value = groupVal;
    groupTd.appendChild(groupInput);

    const cateTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "cate");
    const cateVal = cateTd.textContent;
    while (cateTd.firstChild) {
        cateTd.removeChild(cateTd.firstChild);
    }
    const cateInput = document.createElement("input");
    cateInput.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "cate";
    cateInput.type = "text";
    cateInput.value = cateVal;
    cateTd.appendChild(cateInput);

    const priceTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "price");
    const priceVal = priceTd.textContent;
    while (priceTd.firstChild) {
        priceTd.removeChild(priceTd.firstChild);
    }
    const priceInput = document.createElement("input");
    priceInput.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "price";
    priceInput.type = "text";
    priceInput.value = priceVal;
    priceTd.appendChild(priceInput);

    const discountedTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "discounted");
    const discountedVal = discountedTd.textContent;
    while (discountedTd.firstChild) {
        discountedTd.removeChild(discountedTd.firstChild);
    }
    const discountedInput = document.createElement("input");
    discountedInput.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "discounted";
    discountedInput.type = "text";
    discountedInput.value = discountedVal;
    discountedTd.appendChild(discountedInput);

    const productTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "product");
    let productCount = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "count");
    const count = productCount.value;

    let itemProductList = [];
    for (let i = 0; i < count; i++) {
        const item_product_id = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i + s2 + "i").value;
        const product_id = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i + s2 + "id").value;
        const product_quantity = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i + s2 + "quantity").textContent;
        const item_product = { item_product_id: item_product_id, product_id: product_id, product_quantity: product_quantity };
        itemProductList.push(item_product);
    }

    while (productTd.firstChild) {
        productTd.removeChild(productTd.firstChild);
    }

    const productContainerDiv = document.createElement("div");
    productContainerDiv.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "container";
    productContainerDiv.className = "itemProductContainer";



    productCount = document.createElement("input");
    productCount.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "count";
    productCount.type = "hidden";
    productCount.value = count;
    productTd.appendChild(productCount);


    // 기존 것 넣기
    let i = -1;
    itemProductList.forEach(itemProduct => {
        i += 1;


        const productAndQuantityDiv = document.createElement("div");
        productAndQuantityDiv.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i;


        // item_product_id
        const itemProductInput = document.createElement("input");
        itemProductInput.type = "hidden";
        itemProductInput.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i + s2 + "i";
        itemProductInput.value = itemProduct.item_product_id;
        productAndQuantityDiv.appendChild(itemProductInput);



        const productSelect = document.createElement("select");
        productSelect.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i + s2 + "id";
        productList.forEach(product => {
            const productSelectOption = document.createElement("option");
            productSelectOption.value = product.product_id;
            productSelectOption.textContent = product.product_name;
            productSelect.appendChild(productSelectOption);
        });
        productSelect.value = itemProduct.product_id;

        productAndQuantityDiv.appendChild(productSelect);


        const productQuantity = document.createElement("input");
        productQuantity.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i + s2 + "quantity";
        productQuantity.type = "number";
        productQuantity.value = itemProduct.product_quantity;

        productAndQuantityDiv.appendChild(productQuantity);



        const deleteProductBtn = document.createElement("input");
        deleteProductBtn.type = "button";
        deleteProductBtn.value = "삭제";
        const deleteDivId = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + i;
        deleteProductBtn.onclick = function () {
            document.getElementById(deleteDivId).remove();
        }
        productAndQuantityDiv.appendChild(deleteProductBtn);

        productContainerDiv.appendChild(productAndQuantityDiv);
    });

    productTd.appendChild(productContainerDiv);

    // 추가 버튼


    const addProductBtn = document.createElement("input");
    addProductBtn.type = "button";
    addProductBtn.value = "추가";
    addProductBtn.onclick = function () {
        modifySelectProductToItem(rowIndex, trName, tdName, modifyFieldId, modifyRow);
    }
    productTd.appendChild(addProductBtn);


    const sortTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "sort");
    const sortVal = sortTd.textContent;
    while (sortTd.firstChild) {
        sortTd.removeChild(sortTd.firstChild);
    }
    const sortInput = document.createElement("input");
    sortInput.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "sort";
    sortInput.type = "text";
    sortInput.value = sortVal;
    sortTd.appendChild(sortInput);


    const useTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "use");
    const usetVal = useTd.textContent;
    while (useTd.firstChild) {
        useTd.removeChild(useTd.firstChild);
    }
    const useSelect = document.createElement("select");
    useSelect.id = modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "use";

    const useSelectOptionY = document.createElement("option");
    useSelectOptionY.value = "Y";
    useSelectOptionY.textContent = "Y";
    useSelect.appendChild(useSelectOptionY);
    const useSelectOptionN = document.createElement("option");
    useSelectOptionN.value = "N";
    useSelectOptionN.textContent = "N";
    useSelect.appendChild(useSelectOptionN);


    useSelect.value = usetVal;
    useTd.appendChild(useSelect);

    const editTd = document.getElementById(trName + s1 + rowIndex + s2 + tdName + s1 + "edit");
    while (editTd.firstChild) {
        editTd.removeChild(editTd.firstChild);
    }

    const applyBtn = document.createElement("input");
    applyBtn.type = "button";
    applyBtn.value = "적용";
    applyBtn.onclick = async function () {
        if (!confirm("수정하시겠습니까?")) {
            return;
        }
        await updateItem(modifyRow);
        // 적용
    }
    editTd.appendChild(applyBtn);

    const deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.value = "삭제";
    deleteBtn.onclick = function () {
        // 삭제
    }
    editTd.appendChild(deleteBtn);

    const cancelBtn = document.createElement("input");
    cancelBtn.type = "button";
    cancelBtn.value = "취소";
    cancelBtn.onclick = function () {
        // 취소
    }
    editTd.appendChild(cancelBtn);

}


async function getModifiedItem(modifyRow) {
    // let itemList = [];


    // for (let addedRowIndex = 0; addedRowIndex <= addCount; addedRowIndex++) {
    const item_id = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "id").value;
    if (item_id == null || item_id == "") {
        // continue;
        alert("내용 오류");
        return;
    }
    const item_name = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "name").value;
    if (item_name == null || item_name == "") {
        // continue;
        alert("내용 오류");
        return;
    }
    const group_id = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "group").value;
    if (group_id == null || group_id == "") {
        // continue;
        alert("내용 오류");
        return;
    }
    const cate_id = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "cate").value;
    if (cate_id == null || cate_id == "") {
        // continue;
        alert("내용 오류");
        return;
    }
    const item_price = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "price").value;
    if (item_price == null || item_price == "") {
        // continue;
        alert("내용 오류");
        return;
    }
    const item_discounted = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "discounted").value;
    if (item_discounted == null || item_discounted == "") {
        // continue;
        alert("내용 오류");
        return;
    }
    // product
    let item_product = [];
    const productCount = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "count").value;
    for (let count = 0; count < productCount; count++) {
        const productAndQuantityDiv = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + count);
        if (productAndQuantityDiv == null) {
            continue;
        }
        let item_product_id = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + count + s2 + "i").value;
        let product_id = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + count + s2 + "id").value;
        let product_quantity = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + count + s2 + "quantity").value;

        const product = { item_product_id: item_product_id, item_id: item_id, product_id: product_id, product_quantity: product_quantity };

        item_product.push(product);
        // function insertItemProductList();

    }
    if (item_product == null || item_product.length == 0) {
        // continue;
        alert("내용 오류");
        return;
    }

    const itemProductList = await applyItemProductModifies(item_product);
    // 수정 + 추가 함수
    item_product = await itemProductList;

    item_product = JSON.stringify(item_product);
    // product

    const item_sort = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "sort").value;
    if (item_sort == null || item_sort == "") {
        // continue;
        alert("내용 오류");
        return;
    }
    const item_use = document.getElementById(modifyFieldId + s1 + modifyRow + s2 + tdName + s1 + "use").value;
    if (item_use == null || item_use == "") {
        // continue;
        alert("내용 오류");
        return;
    }

    const item = {
        item_id: item_id,
        item_name: item_name,
        group_id: group_id,
        cate_id: cate_id,
        item_price: item_price,
        item_discounted: item_discounted,
        item_product: item_product,
        item_sort: item_sort,
        item_use: item_use
    };
    // itemList.push(item);
    // }
    return item;
}

async function applyItemProductModifies(item_product) {


    const response = await fetch("/shop/admin/applyItemProductModifies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item_product),
    });

    const resultMap = await response.json();
    const list = resultMap.list;
    console.log("applyItemProductModifies: " + resultMap.status);
    return list;



}

async function updateItem(modifyRow) {

    const item = await getModifiedItem(modifyRow);

    const response = await fetch("/shop/admin/updateItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });

    const resultMap = await response.json();
    console.log("updateItem: " + resultMap.result);

}


function modifySelectProductToItem(rowIndex, trName, tdName, newFieldId, addedRowIndex) {

    let productCount = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "count");
    productCount.value = parseInt(productCount.value) + 1;
    let count = productCount.value - 1;

    const productContainerDiv = document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "container");

    const productAndQuantityDiv = document.createElement("div");
    productAndQuantityDiv.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + count;


    const itemProductInput = document.createElement("input");
    itemProductInput.type = "hidden";
    itemProductInput.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + count + s2 + "i";
    itemProductInput.value = 0;
    productAndQuantityDiv.appendChild(itemProductInput);


    const productSelect = document.createElement("select");
    productSelect.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + count + s2 + "id";
    productList.forEach(product => {
        const productSelectOption = document.createElement("option");
        productSelectOption.value = product.product_id;
        productSelectOption.textContent = product.product_name;
        productSelect.appendChild(productSelectOption);
    });

    productAndQuantityDiv.appendChild(productSelect);
    const productQuantity = document.createElement("input");
    productQuantity.id = newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + count + s2 + "quantity";
    productQuantity.type = "number";
    productAndQuantityDiv.appendChild(productQuantity);

    const deleteProductBtn = document.createElement("input");
    deleteProductBtn.type = "button";
    deleteProductBtn.value = "삭제";
    deleteProductBtn.onclick = function () {
        document.getElementById(newFieldId + s1 + addedRowIndex + s2 + tdName + s1 + "product" + s2 + "itemProduct" + s1 + count).remove();
    }
    productAndQuantityDiv.appendChild(deleteProductBtn);

    productContainerDiv.appendChild(productAndQuantityDiv);

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

