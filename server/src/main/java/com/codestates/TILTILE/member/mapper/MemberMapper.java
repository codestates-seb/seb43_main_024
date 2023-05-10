package com.codestates.TILTILE.member.mapper;

import com.codestates.TILTILE.member.dto.MemberDto;
import com.codestates.TILTILE.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);

}