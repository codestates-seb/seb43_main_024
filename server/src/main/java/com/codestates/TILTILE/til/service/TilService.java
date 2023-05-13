package com.codestates.TILTILE.til.service;

import com.codestates.TILTILE.exception.BusinessLogicException;
import com.codestates.TILTILE.exception.ExceptionCode;
import com.codestates.TILTILE.member.repository.MemberRepository;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.repository.TilRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class TilService {

    @Autowired
    private final TilRepository tilRepository;

    @Autowired
    private MemberRepository memberRepository;

    public Til createTil(TilDto.Post requestBody) {
        Til til = new Til();
        til.setMember(memberRepository.getOne(requestBody.getMemberId()));
        til.setTilTitle(requestBody.getTilTitle());
        til.setTilContent(requestBody.getTilContent());
        til.setTilStatus(requestBody.getTilStatus());
        return tilRepository.save(til);
    }
    public Til findVerifiedTil(long tilId) {
        Optional<Til> optionalTil = tilRepository.findById(tilId);

        return optionalTil.orElseThrow(() -> new BusinessLogicException(ExceptionCode.Til_NOT_FOUND));
    }
    public void deleteTil(long tilId) {
        Til findTil = findVerifiedTil(tilId);

        tilRepository.delete(findTil);
    }
}
