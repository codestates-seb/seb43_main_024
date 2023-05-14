package com.codestates.TILTILE.til.mapper;

import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TilMapper {

    Til tilPutToTil(TilDto.Put put);

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

