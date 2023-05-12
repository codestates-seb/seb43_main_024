package com.codestates.TILTILE.member.mapper;

import com.codestates.TILTILE.member.dto.MemberDto;
import com.codestates.TILTILE.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    @Mapping(source = "email", target = "email")
    @Mapping(source = "nickName", target = "nickName")
    @Mapping(source = "password", target = "password")
    Member memberPostToMember(MemberDto.Post requestBody);

    default Member memberDtoToMember(MemberDto.Post memberDto) {
        if (memberDto == null) {
            return null;
        }

        Member member = new Member();
        member.setEmail(memberDto.getEmail());
        member.setNickName(memberDto.getNickName());
        member.setPassword(memberDto.getPassword());

        return member;
    }
}