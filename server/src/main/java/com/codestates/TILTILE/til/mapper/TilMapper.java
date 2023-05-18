package com.codestates.TILTILE.til.mapper;

import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

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
        til.setMember(member);

        return til;
    }

    default List<TilDto.Response> toDtoResponseList(List<Til> tils) {
        if ( tils == null ) {
            return null;
        }

        List<TilDto.Response> list = new ArrayList<>( tils.size() );
        for ( Til til : tils ) {
            list.add( tilToTilResponse( til ) );
        }

        return list;
    }

    default TilDto.Response tilToTilResponse2(Til til) {

        return TilDto.Response.builder()
                .tilId(til.getTilId())
                .tilTitle(til.getTilTitle())
                .tilContent(til.getTilContent())
                .createdAt(til.getCreatedAt())
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
                .memberNickname(til.getMember().getNickName())
                .tilStatus(til.getTilStatus())
                .build();
    }
}

