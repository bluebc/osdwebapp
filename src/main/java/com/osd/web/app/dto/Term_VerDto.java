package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Term_VerDto {
    private String ver_id;
    private String term_id;
    private String ver_no;
    private String ver_content;
    private LocalDateTime ver_created_at;
    private LocalDateTime ver_updated_at;
}
