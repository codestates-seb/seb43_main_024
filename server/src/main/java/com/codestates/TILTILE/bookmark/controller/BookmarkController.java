package com.codestates.TILTILE.bookmark.controller;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.bookmark.service.BookmarkService;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.service.MemberService;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.service.TilService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "Bookmark", description = "북마크 관련 api 입니다.")
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

    @Operation(summary = "북마크추가", description = "북마크에 추가합니다.")
    @PostMapping("/member/{member-id}/til/{til-id}")
    public ResponseEntity<String> addBookmark(@PathVariable("member-id") Long memberId, @PathVariable("til-id") Long tilId) {
        try {
            // 멤버와 TIL 존재 여부 확인
            Member member = memberService.getMemberById(memberId);
            if (member == null) {
                String message = "멤버를 찾을 수 없습니다.";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }

            Til til = tilService.getTilById(tilId);
            if (til == null) {
                String message = "TIL을 찾을 수 없습니다.";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
            }

            // 북마크가 이미 존재하는지 확인
            boolean isBookmarkExists = bookmarkService.checkBookmarkExists(member, til);
            if (isBookmarkExists) {
                String message = "이미 북마크에 추가된 항목입니다.";
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
            }

            Bookmark bookmark = bookmarkService.addBookmark(member, til);

            String message = "북마크에 추가했습니다.";
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            String message = "북마크 추가 중에 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }

    @Operation(summary = "북마크삭제", description = "북마크에서 삭제합니다.")
    @DeleteMapping("/{bookmark-id}")
    public ResponseEntity<String> deleteBookmark(@PathVariable("bookmark-id") Long bookmarkId) {
        bookmarkService.deleteBookmark(bookmarkId);

        String message = "북마크에서 삭제되었습니다.";

        return ResponseEntity.ok(message);
    }
}
