package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Term_ListDto {
    private String term_id;
    private String term_name;
    private String term_content;
    private String term_type;
    private String term_gb;
    private String term_sort;
    private String term_use_yn;
    private LocalDateTime term_created_at;
    private LocalDateTime term_updated_at;
}
