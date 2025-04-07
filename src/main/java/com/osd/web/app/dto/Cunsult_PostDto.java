package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Cunsult_PostDto {

    private int post_id;
    private String post_subject;
    private String post_content;
    private String post_images;
    private String post_files;
    private int post_viewcnt;
    private int post_childcnt;
    private int post_likecnt;
    private String user_id;
    private int post_sort;
    private LocalDateTime post_created_at;
    private LocalDateTime post_updated_at;

}
