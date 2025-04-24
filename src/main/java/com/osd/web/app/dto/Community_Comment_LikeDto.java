package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Community_Comment_LikeDto {
    
    private int like_id;
    private int cmt_id;
    private String user_id;
    private LocalDateTime like_created_at;
}
