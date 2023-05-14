package com.codestates.TILTILE.til.service;

import com.codestates.TILTILE.exception.BusinessLogicException;
import com.codestates.TILTILE.exception.ExceptionCode;
import com.codestates.TILTILE.member.repository.MemberRepository;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.repository.TilRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

@Transactional
@Service
public class TilService {

    private final TilRepository tilRepository;

    private final MemberRepository memberRepository;

    @Autowired
    public TilService(TilRepository tilRepository, MemberRepository memberRepository) {
        this.tilRepository = tilRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Til createTil(TilDto.Post requestBody) {
        Til til = new Til();
        til.setMember(memberRepository.getOne(requestBody.getMemberId()));
        til.setTilTitle(requestBody.getTilTitle());
        til.setTilContent(requestBody.getTilContent());
        til.setTilStatus(requestBody.getTilStatus());
        return tilRepository.save(til);
    }

    public Til updateTil(Til til) {

        Til findTil = findVerifiedTil(til.getTilId());
        findTil.updateFrom(til);
        findTil.setModifiedAt(new Timestamp(new Date().getTime()));

        return tilRepository.save(findTil);
    }

    public Til findVerifiedTil(long tilId) {
        return tilRepository.findById(tilId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.Til_NOT_FOUND));
    }

    @Transactional
    public void deleteTil(long tilId) {
        Til findTil = findVerifiedTil(tilId);
        tilRepository.delete(findTil);
    }
}
