package com.codestates.TILTILE.member.controller;

import com.codestates.TILTILE.bookmark.service.BookmarkService;
import com.codestates.TILTILE.member.dto.MemberWithBookmarksDto;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.dto.MemberDto;
import com.codestates.TILTILE.member.mapper.MemberMapper;
import com.codestates.TILTILE.member.service.MemberService;
import com.codestates.TILTILE.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final BookmarkService bookmarkService;

    public MemberController(MemberService memberService, MemberMapper mapper, BookmarkService bookmarkService) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.bookmarkService = bookmarkService;
    }

    @PostMapping("/members")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);
        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        String message = "회원가입에 성공했습니다.";

        return ResponseEntity.created(location).body(message);
    }

    @GetMapping("/bookmark/{member-id}")
    public ResponseEntity<MemberWithBookmarksDto> getMyPageWithBookmarks(@PathVariable("member-id") Long memberId) {
        MemberWithBookmarksDto memberWithBookmarksDto = bookmarkService.getMemberWithBookmarks(memberId);
        return ResponseEntity.ok(memberWithBookmarksDto);
    }
}
