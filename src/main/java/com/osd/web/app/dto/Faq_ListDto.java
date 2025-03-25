package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Faq_ListDto {

    private int faq_id;
    private String faq_subject;
    private String faq_content;
    private int cate_id;
    private String faq_sort;
    private LocalDateTime faq_created_at;
    private LocalDateTime faq_updated_at;

}
