package com.codestates.TILTILE.til.controller;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.service.MemberService;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.mapper.TilMapper;
import com.codestates.TILTILE.til.service.TilService;
import com.codestates.TILTILE.utils.UriCreator;
import com.codestates.TILTILE.bookmark.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@Validated
@RequestMapping("/til")
@RequiredArgsConstructor
@RestController
public class TilController {

    private final TilService tilService;
    private final TilMapper mapper;
    private final MemberService memberService;
    private final BookmarkService bookmarkService;


    @GetMapping("/list")
    public ResponseEntity<TilDto.PageResponseDto> getTils(@RequestParam("member_id") Optional<Long> memberId,
                                                          @PageableDefault(page = 1) Pageable pageable,
                                                          @RequestParam(value = "searchKeyword", required = false) String searchKeyword) {
        TilDto.PageResponseDto pageResponseDto;
        List<Bookmark> bookmarks;
        if (memberId.isPresent()) {
            Member member = memberService.getMemberById(memberId.get());
             bookmarks = bookmarkService.getBookmarksByMember(member);
        } else {
            bookmarks = null;
        }
        pageResponseDto = tilService.findCards(pageable, bookmarks, searchKeyword, 16);

        return new ResponseEntity<>(pageResponseDto, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity postTil(@RequestBody @Valid TilDto.Post requestBody) {
        Til til = tilService.createTil(mapper.tilPostToTil(requestBody));
        URI location = UriCreator.createUri("/til", til.getTilId());

        return ResponseEntity.created(location).body(mapper.tilToTilResponse2(til));
    }

    @GetMapping("/{til_id}")
    public ResponseEntity getTil(@PathVariable("til_id") long tilId) {

        TilDto.Response Response = tilService.getTil(tilId);

        return new ResponseEntity<>(Response, HttpStatus.OK);
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