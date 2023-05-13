package com.codestates.TILTILE.til.controller;

import com.codestates.TILTILE.member.repository.MemberRepository;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.repository.TilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Validated
@RequestMapping("/til")
@RestController
public class TilController {

    @Autowired
    private TilRepository tilRepository;

    @Autowired
    private MemberRepository memberRepository;

    @PostMapping
    public ResponseEntity postTil(@RequestBody @Valid TilDto.Post requestBody) {
        Til til = new Til();
        til.setMember(memberRepository.getOne(requestBody.getMemberId()));
        til.setTilTitle(requestBody.getTilTitle());
        til.setTilContent(requestBody.getTilContent());
        til.setTilStatus(requestBody.getTilStatus());
        tilRepository.save(til);
        return new ResponseEntity<>(requestBody, HttpStatus.CREATED);
    }
}