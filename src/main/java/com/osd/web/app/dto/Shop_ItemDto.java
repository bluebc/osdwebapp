package com.osd.web.app.dto;

import lombok.Data;

@Data
public class Shop_ItemDto {
    private int item_id;
    private String item_name;
    private int group_id;
    private int cate_id;
    private int item_price;
    private int item_discounted;
    private String item_product;
    private int item_sort;
    private String item_use;
}
