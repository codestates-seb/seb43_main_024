package com.codestates.TILTILE.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class LoginDto {
    @Schema(description = "사용자명", example = "test@example.com")
    private String username;
    @Schema(description = "비밀번호", example = "Test123!@#")
    private String password;
}
