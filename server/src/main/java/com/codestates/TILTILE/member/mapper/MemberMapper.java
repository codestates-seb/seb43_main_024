package com.codestates.TILTILE.member.mapper;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.member.dto.MemberDto;
import com.codestates.TILTILE.member.dto.MemberWithBookmarksDto;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

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

    default TilDto.getResponse tilToGetResponse(Til til) {
        if (til == null) {
            return null;
        }

        TilDto.getResponse getResponse = new TilDto.getResponse();
        getResponse.setTilId(til.getTilId());
        getResponse.setTilTitle(til.getTilTitle());
        getResponse.setTilContent(til.getTilContent());
        getResponse.setTilViewCount(til.getTilViewCount());
        getResponse.setCreatedAt(til.getCreatedAt());
        getResponse.setModifiedAt(til.getModifiedAt());
        getResponse.setMemberId(til.getMember().getMemberId());
        getResponse.setMemberNickname(til.getMember().getNickName());
        getResponse.setMemberProfileImage(til.getMember().getProfileImage());

        return getResponse;
    }

    default MemberWithBookmarksDto.PageResponseDto toMemberWithBookmarksDto(List<Til> bookmarks,
                                                                            Page<Bookmark> bookmarks2,
                                                                            int page,
                                                                            int startPage,
                                                                            int endPage) {

        List<TilDto.getResponse> tillist = new ArrayList<>( bookmarks2.getContent().size() );
        for ( Til til : bookmarks ) {
            tillist.add(tilToGetResponse(til));
        }

        MemberWithBookmarksDto.PageResponseDto dto = new MemberWithBookmarksDto.PageResponseDto();
        dto.setBookmarks(tillist);  // List<TIlDto.Response> / List<
        dto.setPageNumber(page+1);
        dto.setTotalPages(bookmarks2.getTotalPages());
        dto.setTotalElements(bookmarks2.getTotalElements());
        dto.setSize(bookmarks2.getSize());
        dto.setStartPage(startPage);
        dto.setEndPage(endPage);

        return dto;
    }
}