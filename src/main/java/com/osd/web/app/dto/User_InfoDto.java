
package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class User_InfoDto {
    private String user_id;
    private String user_pw;
    private String user_name;
    private String user_hpno;
    private String user_email;
    private String user_addr;
    private String user_birth;
    private String user_gender;
    private LocalDateTime user_created_at;
    private LocalDateTime user_updated_at;
}

