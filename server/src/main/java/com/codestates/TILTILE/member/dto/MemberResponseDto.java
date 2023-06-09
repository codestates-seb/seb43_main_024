package com.codestates.TILTILE.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberResponseDto {
    private Long memberId;
    @Schema(description = "닉네임", example = "테스트")
    private String nickName;
    @Schema(description = "자기소개", example = "자기소개 테스트")
    private String aboutMe;
    @Schema(description = "비밀번호", example = "test123!@#")
    private String passWord;
    @Schema(description = "회원프로필이미지", example = "https://tiltil2-images.s3.ap-northeast-2.amazonaws.com/profile/2023/06/07/26cac24f-4753-4e4a-b231-d87511bafa28.jpg\"")
    private String img;
}
