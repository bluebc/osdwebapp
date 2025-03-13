package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class User_TermDto {
    private String user_id;
    private String term_id;
    private String term_agreed;
    private LocalDateTime agreed_created_at;
    private LocalDateTime agreed_updated_at;
}
