package com.codestates.TILTILE.member.controller;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.bookmark.service.BookmarkService;
import com.codestates.TILTILE.member.dto.MemberWithBookmarksDto;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.dto.MemberDto;
import com.codestates.TILTILE.member.dto.MemberResponseDto;
import com.codestates.TILTILE.member.mapper.MemberMapper;
import com.codestates.TILTILE.member.service.MemberService;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.service.TilService;
import com.codestates.TILTILE.utils.UriCreator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
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

@Tag(name = "Member", description = "회원 관련 api 입니다.")
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

    @Operation(summary = "회원가입", description = "회원가입합니다.")
    @PostMapping("/members")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.MemberPost requestBody) {
        Member member = mapper.memberPostToMember(requestBody);
        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        String message = "회원가입에 성공했습니다.";

        return ResponseEntity.created(location).body(message);
    }

    @Operation(summary = "회원Til조회", description = "특정 회원의 Til리스트를 조회합니다.")
    @GetMapping("/members/{member_id}/til")
    public ResponseEntity<TilDto.PageResponseDto> getMyPageWithTils(@PathVariable("member_id") Long memberId,
                                                                    @PageableDefault(page = 1)Pageable pageable) {
        Member member = memberService.getMemberById(memberId);
        List<Bookmark> bookmarks = bookmarkService.getBookmarksByMember(member);
        TilDto.PageResponseDto pageResponseDto = tilService.findCards(pageable, bookmarks, memberId, 12);

        return new ResponseEntity<>(pageResponseDto, HttpStatus.OK);
    }

    @Operation(summary = "회원북마크조회", description = "특정 회원의 북마크리스트를 조회합니다.")
    @GetMapping("/members/{member-id}/bookmark")
    public ResponseEntity<MemberWithBookmarksDto.PageResponseDto> getMyPageWithBookmarks(@PathVariable("member-id") Long memberId,
                                                                                        @PageableDefault(page = 1) Pageable pageable) {

        Member member = memberService.getMemberById(memberId);
        MemberWithBookmarksDto.PageResponseDto memberWithBookmarksDto = bookmarkService.getMemberWithBookmarks(pageable,memberId, 12);
        return ResponseEntity.ok(memberWithBookmarksDto);
    }

    @Operation(summary = "회원조회", description = "특정 회원을 조회합니다.")
    @GetMapping("/members/{memberId}")
    public ResponseEntity<MemberResponseDto> getMemberInfo(@PathVariable("memberId") Long memberId) {
        Member member = memberService.getMemberInfo(memberId);
        if (member != null) {
            MemberResponseDto memberResponseDto = new MemberResponseDto();
            memberResponseDto.setMemberId(member.getMemberId());
            memberResponseDto.setNickName(member.getNickName());
            memberResponseDto.setAboutMe(member.getAboutMe());
            memberResponseDto.setImg(member.getProfileImage());

            // Oauth 유저인 경우에는 비밀번호 필드를 비워둘 수 있습니다.
            if (!member.isOauthMember()) {
                memberResponseDto.setPassWord(member.getPassword());
            }

            return ResponseEntity.ok(memberResponseDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "회원삭제", description = "특정 회원을 삭제합니다.")
    @DeleteMapping("/members/{memberId}")
    public ResponseEntity<String> deleteMember(@PathVariable("memberId") Long memberId,
                                               @RequestParam(value = "provider", required = false) String provider,
                                               @RequestParam(value = "providerId", required = false) String providerId) {
        boolean deleted;
        if (provider != null && providerId != null) {
            deleted = memberService.deleteOAuthMember(provider, providerId);
        } else {
            deleted = memberService.deleteMember(memberId);
        }

        if (deleted) {
            return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
