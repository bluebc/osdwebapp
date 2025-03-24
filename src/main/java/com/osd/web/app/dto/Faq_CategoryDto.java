package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Faq_CategoryDto {

    private int cate_id;
    private String cate_name;
    private String cate_sort;
    private LocalDateTime cate_created_at;
    private LocalDateTime cate_updated_at;

}
