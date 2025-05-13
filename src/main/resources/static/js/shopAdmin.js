async function getProductListAll() {

    const response = await fetch("/shop/getProductListAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {},
    });

    const resultMap = await response.json();

    console.log(resultMap);

}