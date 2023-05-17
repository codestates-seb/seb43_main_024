package com.codestates.TILTILE.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OAuth2MemberDto {
    private String name;
    private String email;
    private String accessToken;
}
