package com.codestates.TILTILE.email;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@Tag(name = "Email", description = "이메일 관련 api 입니다.")
@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @Operation(summary = "이메일인증", description = "이메일인증을 위한 인증번호를 받습니다.")
    @PostMapping("login/mailConfirm")
    public String mailConfirm(@RequestBody EmailAuthRequestDto emailDto) throws MessagingException, UnsupportedEncodingException {

        String authCode = emailService.sendEmail(emailDto.getEmail());
        return authCode;
    }
}
