package com.codestates.TILTILE.member.mapper;

import com.codestates.TILTILE.member.dto.MemberDto;
import com.codestates.TILTILE.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    default Member memberPostToMember(MemberDto.Post memberDto) {
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