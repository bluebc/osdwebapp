package com.osd.web.app.dto;

import lombok.Data;

@Data
public class Shop_Item_ProductDto {
    private int item_product_id;
    private String item_id;
    private String product_id;
    private int product_quantity;
}
