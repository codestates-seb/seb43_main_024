package com.codestates.TILTILE.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {
    @Getter
    @NoArgsConstructor
    public static class MemberPost {

        @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "이메일 형식이 올바르지 않습니다.")
        @NotBlank(message = "이메일은 필수 입력 값입니다.")
        @Email
        @Schema(description = "이메일", example = "test@example.com")
        private String email;

        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Schema(description = "비밀번호", example = "Test123!@#")
        private String password;

        @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
        @Schema(description = "닉네임", example = "테스트")
        private String nickName;

        // OAuth2 인증 후 받는 정보를 위한 필드
        // OAuth2 자동 로그인 활성화시 필요
//        private String provider; // OAuth2 제공자 이름 (Google, Facebook 등)
//        private String providerId; // OAuth2 제공자 내에서 사용자를 식별하는 ID
    }
}
