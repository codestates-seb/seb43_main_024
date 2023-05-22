package com.codestates.TILTILE.til.service;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.exception.BusinessLogicException;
import com.codestates.TILTILE.exception.ExceptionCode;
import com.codestates.TILTILE.exception.NotFoundException;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import com.codestates.TILTILE.member.service.MemberService;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.mapper.TilMapper;
import com.codestates.TILTILE.til.repository.TilRepository;
import com.codestates.TILTILE.til.dto.TilDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Transactional
@Service
public class TilService {

    private final TilRepository tilRepository;

    private final MemberRepository memberRepository;

    private final MemberService memberService;

    private final TilMapper tilMapper;

    public TilService(TilRepository tilRepository, MemberRepository memberRepository, MemberService memberService,
                      TilMapper tilMapper) {
        this.tilRepository = tilRepository;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
        this.tilMapper = tilMapper;
    }

    public TilDto.PageResponseDto findCards(Pageable pageable, List<Bookmark> bookmarks, String searchKeyword, int pageLimit) {

        int page = pageable.getPageNumber() -1 ;

        Page<Til> EntityTils;
        Pageable pageRequest = PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "tilId"));
        if (searchKeyword == null) {
            EntityTils =
                    tilRepository.findAll(pageRequest);
        } else {
            EntityTils = tilRepository.findByTilTitleContaining(searchKeyword, pageRequest);
        }

        int blockLimit = 5;
        int startPage = (((int)(Math.ceil((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
        int endPage = Math.min(startPage + blockLimit - 1, EntityTils.getTotalPages());

        return tilMapper.toPageResponseDto(EntityTils, page, bookmarks,startPage,endPage);
    }

    public TilDto.PageResponseDto findCards(Pageable pageable, List<Bookmark> bookmarks, long memberId, int pageLimit) {

        int page = pageable.getPageNumber() -1 ;

        Pageable pageRequest = PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "tilId"));

        Page<Til> EntityTils =  tilRepository.findByMember_MemberId(memberId, pageRequest);

        int blockLimit = 5;
        int startPage = (((int)(Math.ceil((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
        int endPage = Math.min(startPage + blockLimit - 1, EntityTils.getTotalPages());

        return tilMapper.toPageResponseDto(EntityTils, page, bookmarks,startPage,endPage);
    }



    @Transactional
    public Til createTil(Til til) {
        Member findMember = memberService.verifyExistsMemberId(til.getMember().getMemberId());
        til.setMember(findMember);
        til.setTilViewCount(0L);
        til.setTilStatus(false);

        return tilRepository.save(til);
    }
    public TilDto.Response getTil(long tilId) {

        Til findTil = getTilById(tilId);
        findTil.setTilViewCount(findTil.getTilViewCount()+1);

//        tilRepository.save(findTil); 더티체킹
        return tilMapper.tilToTilResponse(findTil);
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

    public Til getTilById(Long tilId) {
        return tilRepository.findById(tilId)
                .orElseThrow(() -> new NotFoundException(ExceptionCode.Til_NOT_FOUND.getStatus(), ExceptionCode.Til_NOT_FOUND.getMessage()));
    }


}
