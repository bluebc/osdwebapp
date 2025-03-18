package com.osd.web.app.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Auth_EmailDto {

    private String user_email;
    private String auth_code;
    private LocalDateTime auth_expiry;
    private String auth_purpose;
    private int auth_confirmed;

}
