package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Auth_EmailDao;
import com.osd.web.app.dao.User_InfoDao;
import com.osd.web.app.dto.Auth_EmailDto;
import com.osd.web.app.dto.User_InfoDto;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailService {

    @Autowired
    private Auth_EmailDao auth_EmailDao;

    @Autowired
    private User_InfoDao user_InfoDao;

    private final JavaMailSender mailSender;

    public int sendEmail(String to, String subject, String text) throws MessagingException {
        int result = 0;

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);

        mailSender.send(message);

        result = 1;
        return result;
    }

    // 인증메일 발송
    public int sendAuthEmail(Auth_EmailDto auth_EmailDto) {
        int result = 0;
        // 인증코드발송 성공여부, 오류코드만 반환

        // 오류 1. 이메일 없음
        if (auth_EmailDto.getUser_email() == null || auth_EmailDto.equals("")) {
            result = -1;
            return result;
        }

        // 예외에 대해 케이스문으로 회피
        String auth_purpose = auth_EmailDto.getAuth_purpose();
        switch (auth_purpose) {

            case "signup":
                break;

            default:
                // 회원 정보에서 이메일 조회
                String user_email = auth_EmailDto.getUser_email();
                User_InfoDto user_InfoDto = new User_InfoDto();
                user_InfoDto.setUser_email(user_email);
                User_InfoDto user_InfoDtoFromDb = user_InfoDao.getUser_IdByEmail(user_InfoDto);

                // 오류 1-1. 이메일이 DB에 없음
                if (user_InfoDtoFromDb == null) {
                    result = -1;
                    return result;
                }
                break;
        }

        // 인증코드 생성
        Random random = new Random();
        int code = random.nextInt(100000000); // 0 ~ 99999999 범위의 숫자 생성
        String auth_code = String.format("%08d", code); // 8자리로 패딩 (앞에 0 포함 가능)
        auth_EmailDto.setAuth_code(auth_code);

        // 인증만료기한 생성
        // 10분
        // LocalDateTime auth_expiry = LocalDateTime.now().plusMinutes(10);
        // DB 조회 문제로 초단위까지만 사용
        LocalDateTime auth_expiry = LocalDateTime.now().plusMinutes(10).truncatedTo(ChronoUnit.SECONDS);
        auth_EmailDto.setAuth_expiry(auth_expiry);

        // DB Insert
        auth_EmailDto.setAuth_confirmed(0);
        int inserted = auth_EmailDao.insert(auth_EmailDto);
        if (inserted != 1) {
            // 오류 2. DB 오류
            result = -2;
            return result;
        }

        // 메일 발송 정보
        String to = auth_EmailDto.getUser_email();
        String subject = "osdwebapp mail auth 2";
        String text = "";
        text = auth_code;

        int sended = 0;
        try {
            sended = sendEmail(to, subject, text);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        // 오류 3. Email 발송 실패
        if (sended == 0) {
            result = -3;
            return result;
        } else if (sended == 1) {
            result = 1;
        }
        return result;
    }

    // 인증코드 확인
    public int checkAuthCode(Auth_EmailDto auth_EmailDto) {
        // 인증코드발송 성공여부, 오류코드만 반환
        int result = 0;

        Auth_EmailDto auth_EmailFromDb = auth_EmailDao.selectByEmail(auth_EmailDto);
        // 오류 1. 인증요청정보 없음
        if (auth_EmailFromDb == null) {
            result = -1;
            return result;
        }
        // 오류 2. 인증코드 유효기간 만료
        if (auth_EmailFromDb.getAuth_expiry().isBefore(LocalDateTime.now())) {
            result = -2;
            return result;
        }
        // 오류 3. 이미 인증이 완료된 코드
        if (auth_EmailFromDb.getAuth_confirmed() == 1) {
            result = -3;
            return result;
        }
        // 오류 4. 입력한 인증번호 틀림
        if (!auth_EmailFromDb.getAuth_code().equals(auth_EmailDto.getAuth_code())) {
            result = -4;
            return result;
        }
        // 오류 5. 인증목적 불일치
        if (!auth_EmailFromDb.getAuth_purpose().equals(auth_EmailDto.getAuth_purpose())) {
            result = -5;
            return result;
        }
        // 오류 6. DB update 실패
        int updated = 0;
        updated = auth_EmailDao.updateConfirmed(auth_EmailFromDb);
        if (updated == 0) {
            result = -6;
            return result;
        } else if (updated == 1) {
            result = 1;
        }

        return result;
    }

}
