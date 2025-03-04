package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class FeedDto {

    private int no;
    private String id;
    private String content;
    private LocalDateTime ts;
    private String images;

}
