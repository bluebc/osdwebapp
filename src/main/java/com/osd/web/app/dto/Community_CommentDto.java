package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Community_CommentDto {

    private int cmt_id;
    private String cmt_content;
    private int post_id;
    private int parent_cmt_id;
    private int cmt_likecnt;
    private String user_id;
    private LocalDateTime cmt_created_at;
    private LocalDateTime cmt_updated_at;

}
