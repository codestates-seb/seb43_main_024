package com.codestates.TILTILE.til.controller;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.bookmark.service.BookmarkService;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.service.MemberService;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.service.HotTilService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RequestMapping("/hotTil")
@RequiredArgsConstructor
@RestController
public class HotTilController {

    private final HotTilService hotTilService;
    private final MemberService memberService;
    private final BookmarkService bookmarkService;

    @GetMapping("/list")
    public ResponseEntity<List<TilDto.Card>> getHotTils(@RequestParam("member_id") Optional<Long> memberId) {
        List<Bookmark> bookmarks; // 북마크 체크 여부 확인용도
        if (memberId.isPresent()) {
            Member member = memberService.getMemberById(memberId.get());
            bookmarks = bookmarkService.getBookmarksByMember(member);
        } else {
            bookmarks = null;
        }

        List<TilDto.Card> cardList = hotTilService.findCards(bookmarks);
        return new ResponseEntity<>(cardList, HttpStatus.OK);
    }
}
