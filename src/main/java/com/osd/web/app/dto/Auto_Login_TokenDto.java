package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Auto_Login_TokenDto {

    private String token;
    private String user_id;
    private LocalDateTime expiry_date;

}
