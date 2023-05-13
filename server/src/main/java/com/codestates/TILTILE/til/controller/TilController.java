package com.codestates.TILTILE.til.controller;

import com.codestates.TILTILE.member.repository.MemberRepository;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.repository.TilRepository;
import com.codestates.TILTILE.til.service.TilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Validated
@RequestMapping("/til")
@RestController
public class TilController {

    @Autowired
    private TilRepository tilRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TilService tilService;

    @PostMapping
    public ResponseEntity postTil(@RequestBody @Valid TilDto.Post requestBody) {
        Til til = tilService.createTil(requestBody);
        return new ResponseEntity<>(requestBody, HttpStatus.CREATED);
    }

    @DeleteMapping("/{til-id}")
    public ResponseEntity deleteTil(@PathVariable("til-id") long tilId) {
        tilService.deleteTil(tilId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}