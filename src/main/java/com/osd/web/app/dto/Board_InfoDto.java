package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Board_InfoDto {

    private int board_no;
    private String user_id;
    private String board_category;
    private String board_title;
    private String board_content;
    private LocalDateTime board_created_at;
    private LocalDateTime board_updated_at;
    private int board_deleted;
    private LocalDateTime board_deleted_at;

}
