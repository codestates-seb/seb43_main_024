package com.codestates.TILTILE.til.service;

import com.codestates.TILTILE.exception.BusinessLogicException;
import com.codestates.TILTILE.exception.ExceptionCode;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import com.codestates.TILTILE.member.service.MemberService;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.mapper.TilMapper;
import com.codestates.TILTILE.til.repository.TilRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;

@Transactional
@Service
public class TilService {

    private final TilRepository tilRepository;

    private final MemberRepository memberRepository;

    private final MemberService memberService;

    private final TilMapper tilMapper;

    @Autowired
    public TilService(TilRepository tilRepository, MemberRepository memberRepository, MemberService memberService, TilMapper tilMapper) {
        this.tilRepository = tilRepository;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
        this.tilMapper = tilMapper;
    }

//    @Transactional
//    public Til createTil(Til til) {
//
//        Member findMember = memberService.verifyExistsMemberId(til.getMember().getMemberId());
//
//        til.setMember(findMember);
//        til.setTilViewCount(0L);
//        til.setTilStatus(false);
//
//        Til savedtil = tilRepository.save(til);
//
//        return tilRepository.save(til);
//    }

    @Transactional
    public Til createTil(Til til) {
        Member findMember = memberService.verifyExistsMemberId(til.getMember().getMemberId());
        til.setMember(findMember);
        til.setTilViewCount(0L);
        til.setTilStatus(false);

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
