package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Board_PostDto {

    private int post_id;

    private String post_subject;
    private String post_content;

    private String post_images;
    private String post_files;

    private String post_viewcnt;
    private String post_cmtcnt;
    private String post_likecnt;
    

    private LocalDateTime post_created_at;
    private LocalDateTime post_updated_at;

    private String user_id;
    private String user_nickname;
    private String user_img;

}
