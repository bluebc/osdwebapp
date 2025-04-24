package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Community_Post_LikeDto {
    
    private int like_id;
    private int post_id;
    private String user_id;
    private LocalDateTime like_created_at;
}
