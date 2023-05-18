package com.codestates.TILTILE.bookmark.controller;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.bookmark.service.BookmarkService;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.service.MemberService;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.service.TilService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/bookmark")
@RestController
public class BookmarkController {

    private final BookmarkService bookmarkService;
    private final MemberService memberService;
    private final TilService tilService;

    public BookmarkController(BookmarkService bookmarkService, MemberService memberService, TilService tilService) {
        this.bookmarkService = bookmarkService;
        this.memberService = memberService;
        this.tilService = tilService;
    }

    @PostMapping("/member/{member-id}/til/{til-id}")
    public ResponseEntity<String> addBookmark(@PathVariable("member-id") Long memberId, @PathVariable("til-id") Long tilId) {
        Member member = memberService.getMemberById(memberId);
        Til til = tilService.getTilById(tilId);

        Bookmark bookmark = bookmarkService.addBookmark(member, til);

        String message = "북마크에 추가했습니다.";

        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/{bookmark-id}")
    public ResponseEntity<String> deleteBookmark(@PathVariable("bookmark-id") Long bookmarkId) {
        bookmarkService.deleteBookmark(bookmarkId);

        String message = "북마크에서 삭제되었습니다.";

        return ResponseEntity.ok(message);
    }
}
