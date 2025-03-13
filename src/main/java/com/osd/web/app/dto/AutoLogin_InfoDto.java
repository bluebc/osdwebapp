package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AutoLogin_InfoDto {

    private String autoLogin_token;
    private String user_id;
    private LocalDateTime autoLogin_expiry;

}
