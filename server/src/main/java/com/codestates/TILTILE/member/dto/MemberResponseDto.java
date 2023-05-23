package com.codestates.TILTILE.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberResponseDto {
    private Long memberId;
    private String nickName;
    private String aboutMe;
    private String passWord;
    private String img;
}
