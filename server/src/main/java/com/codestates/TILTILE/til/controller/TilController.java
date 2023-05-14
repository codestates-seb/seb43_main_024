package com.codestates.TILTILE.til.controller;

import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.mapper.TilMapper;
import com.codestates.TILTILE.til.service.TilService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Validated
@RequestMapping("/til")
@RequiredArgsConstructor
@RestController
public class TilController {

    private final TilService tilService;
    private final TilMapper mapper;

    @PostMapping
    public ResponseEntity postTil(@RequestBody @Valid TilDto.Post requestBody) {
        Til til = tilService.createTil(requestBody);
        return new ResponseEntity<>(requestBody, HttpStatus.CREATED);
    }

    @PutMapping("/{til-id}")
    public ResponseEntity putTil(@PathVariable("til-id") long tilId,
                                @RequestBody @Valid TilDto.Put requestBody) {
        Til til = mapper.tilPutToTil(requestBody);
        til.setTilId(tilId);
        Til response = tilService.updateTil(til);

        return new ResponseEntity<>(mapper.tilToTilResponse(response), HttpStatus.OK);
    }

    @DeleteMapping("/{til-id}")
    public ResponseEntity deleteTil(@PathVariable("til-id") long tilId) {
        tilService.deleteTil(tilId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}