package com.codestates.TILTILE.til.mapper;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TilMapper {

    default Til tilPutToTil(TilDto.Put put) {
        if ( put == null ) {
            return null;
        }

        Til til = new Til();

        til.setTilId( put.getTilId() );
        til.setTilTitle( put.getTilTitle() );
        til.setTilContent( put.getTilContent() );
        til.setTilStatus( put.getTilStatus() );

        return til;
    }

    // 추가
    default Til tilPostToTil(TilDto.Post post) {
        Til til = new Til();
        Member member = new Member();
        member.setMemberId(post.getMemberId());

        til.setTilTitle(post.getTilTitle() );
        til.setTilContent(post.getTilContent() );
        til.setTilStatus(post.getTilStatus()); // 틸 상태 추가
        til.setMember(member);

        return til;
    }

    // 하나의 카드(썸네일 게시글) 매퍼
    default TilDto.Card toCard(Til til,List<Bookmark> bookmarks) {
        TilDto.Card card = new TilDto.Card();
        long til_id = til.getTilId();
        card.setTilId(til_id);
        card.setTilTitle(til.getTilTitle());
        card.setTilContent(til.getTilContent());
        card.setTilViewCount(til.getTilViewCount());
        card.setCreatedAt(til.getCreatedAt());
        card.setModifiedAt(til.getModifiedAt());
        card.setMemberNickname(til.getMember().getNickName());
        card.setMemberId(til.getMember().getMemberId());
        card.setMemberProfileImage(til.getMember().getProfileImage());
        card.setTilTier(til.getMember().getTilTier());
        card.setCheckBookmark(false);
        if (bookmarks != null) {
            for (Bookmark bookmark: bookmarks) {
                if (bookmark.getTil().getTilId() == til_id) {
                    card.setCheckBookmark(true);
                }
            }
        }
        return card;
    }

    // 여러개의 카드(썸네일 게시글) + 그외 페이지 정보 매퍼
    default TilDto.PageResponseDto toPageResponseDto(Page<Til> tils, int page, List<Bookmark> bookmarks,int startPage, int endPage) {
        if ( tils == null ) {
            return null;
        }

        List<TilDto.Card> cardlist = new ArrayList<>( tils.getContent().size() );
        for ( Til til : tils ) {
            cardlist.add( toCard( til ,bookmarks) );
        }

        TilDto.PageResponseDto pageResponseDto = new TilDto.PageResponseDto();
        pageResponseDto.setCards(cardlist);
        pageResponseDto.setPageNumber(page+1); // findCards { int page = pageable.getPageNumber() -1 ...}
        pageResponseDto.setTotalPages(tils.getTotalPages());
        pageResponseDto.setTotalElements(tils.getTotalElements());
        pageResponseDto.setSize(tils.getSize());
        pageResponseDto.setStartPage(startPage);
        pageResponseDto.setEndPage(endPage);

        return pageResponseDto;
    }

    // 한개 게시글 조회 매퍼
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
        getResponse.setTilTier(til.getMember().getTilTier());

        return getResponse;
    }


    default TilDto.Response tilToTilResponse2(Til til) {

        return TilDto.Response.builder()
                .tilId(til.getTilId())
                .tilTitle(til.getTilTitle())
                .tilContent(til.getTilContent())
                .createdAt(til.getCreatedAt())
                .memberId(til.getMember().getMemberId())
                .memberNickname(til.getMember().getNickName())
                .tilStatus(til.getTilStatus())
                .build();
    }

    default TilDto.Response tilToTilResponse(Til til) {

        return TilDto.Response.builder()
                .tilId(til.getTilId())
                .tilTitle(til.getTilTitle())
                .tilContent(til.getTilContent())
                .createdAt(til.getCreatedAt())
                .modifiedAt(til.getModifiedAt())
                .memberId(til.getMember().getMemberId())
                .memberNickname(til.getMember().getNickName())
                .tilStatus(til.getTilStatus())
                .build();
    }
}

