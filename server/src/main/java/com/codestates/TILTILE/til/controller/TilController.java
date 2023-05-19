package com.codestates.TILTILE.til.controller;

import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.mapper.TilMapper;
import com.codestates.TILTILE.til.service.TilService;
import com.codestates.TILTILE.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@Validated
@RequestMapping("/til")
@RequiredArgsConstructor
@RestController
public class TilController {

    private final TilService tilService;
    private final TilMapper mapper;


    @GetMapping("/paging")
    public ResponseEntity<Page<TilDto.Response>> getTils(@PageableDefault(page = 1) Pageable pageable) {
//        List<TilDto.Response> TilList = tilService.findTop16ByOrderByIdDesc();
        System.out.println("in");
        Page<TilDto.Response> TilList = tilService.paging(pageable);

        int blockLimit = 5;
        int startPage = (((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1; // 1 4 7 10 ~~
        int endPage = Math.min(startPage + blockLimit - 1, TilList.getTotalPages());

        return new ResponseEntity<>(TilList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postTil(@RequestBody @Valid TilDto.Post requestBody) {
        Til til = tilService.createTil(mapper.tilPostToTil(requestBody));
        URI location = UriCreator.createUri("/til", til.getTilId());

        return ResponseEntity.created(location).body(mapper.tilToTilResponse2(til));
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