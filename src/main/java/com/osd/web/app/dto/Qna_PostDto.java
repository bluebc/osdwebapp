package com.osd.web.app.dto;

import lombok.Data;

@Data
public class Qna_PostDto {
    
    private String post_id;
    private String post_subject;
    private String post_content;
    private String post_images;
    private String post_viewcnt;
    private String post_childcnt;
    private String post_likecnt;
    private String user_id;
    private String post_sort;
    private String post_created_at;
    private String post_updated_at;

}
