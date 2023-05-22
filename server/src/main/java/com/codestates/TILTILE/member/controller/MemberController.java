package com.codestates.TILTILE.member.controller;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.bookmark.service.BookmarkService;
import com.codestates.TILTILE.member.dto.MemberWithBookmarksDto;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.dto.MemberDto;
import com.codestates.TILTILE.member.mapper.MemberMapper;
import com.codestates.TILTILE.member.service.MemberService;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.service.TilService;
import com.codestates.TILTILE.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final BookmarkService bookmarkService;
    private final TilService tilService;

    public MemberController(MemberService memberService, MemberMapper mapper, BookmarkService bookmarkService, TilService tilService) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.bookmarkService = bookmarkService;
        this.tilService = tilService;
    }

    @PostMapping("/members")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);
        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        String message = "회원가입에 성공했습니다.";

        return ResponseEntity.created(location).body(message);
    }

    @GetMapping("/members/{member_id}/til")
    public ResponseEntity<TilDto.PageResponseDto> getMyPageWithTils(@PathVariable("member_id") Long memberId,
                                                                    @PageableDefault(page = 1)Pageable pageable) {
        Member member = memberService.getMemberById(memberId);
        List<Bookmark> bookmarks = bookmarkService.getBookmarksByMember(member);
        TilDto.PageResponseDto pageResponseDto = tilService.findCards(pageable, bookmarks, memberId, 12);

        return new ResponseEntity<>(pageResponseDto, HttpStatus.OK);
    }


    @GetMapping("/members/{member-id}/bookmark")
    public ResponseEntity<MemberWithBookmarksDto> getMyPageWithBookmarks(
            @PathVariable("member-id") Long memberId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "pageSize", defaultValue = "12") int pageSize) {
        MemberWithBookmarksDto memberWithBookmarksDto = bookmarkService.getMemberWithBookmarks(memberId, page, pageSize);
        return ResponseEntity.ok(memberWithBookmarksDto);
    }
}
