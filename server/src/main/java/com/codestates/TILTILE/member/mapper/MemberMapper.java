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
    default Member memberPostToMember(MemberDto.MemberPost memberDto) {
        if (memberDto == null) {
            return null;
        }

        Member member = new Member();
        member.setEmail(memberDto.getEmail());
        member.setNickName(memberDto.getNickName());
        member.setPassword(memberDto.getPassword());

        return member;
    }

    default TilDto.bookmarkCard tilToGetResponse(Til til,long bookmarkId) {
        if (til == null) {
            return null;
        }

        TilDto.bookmarkCard bookmarkCard = new TilDto.bookmarkCard();
        bookmarkCard.setBookmarkId(bookmarkId);
        bookmarkCard.setTilId(til.getTilId());
        bookmarkCard.setTilTitle(til.getTilTitle());
        bookmarkCard.setTilContent(til.getTilContent());
        bookmarkCard.setTilViewCount(til.getTilViewCount());
        bookmarkCard.setCreatedAt(til.getCreatedAt());
        bookmarkCard.setModifiedAt(til.getModifiedAt());
        bookmarkCard.setMemberId(til.getMember().getMemberId());
        bookmarkCard.setMemberNickname(til.getMember().getNickName());
        bookmarkCard.setMemberProfileImage(til.getMember().getProfileImage());

        return bookmarkCard;
    }

    default MemberWithBookmarksDto.PageResponseDto toMemberWithBookmarksDto(List<Til> bookmarks,
                                                                            Page<Bookmark> bookmarks2,
                                                                            int page,
                                                                            int startPage,
                                                                            int endPage) {

        List<TilDto.bookmarkCard> tillist = new ArrayList<>( bookmarks2.getContent().size() );
//        for ( Til til : bookmarks ) {
        for (int i =0; i<bookmarks2.getContent().size(); i++) {
            tillist.add(tilToGetResponse(bookmarks.get(i), bookmarks2.getContent().get(i).getBookmarkId()));
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