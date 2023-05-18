package com.codestates.TILTILE.bookmark.service;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.bookmark.repository.BookmarkRepository;
import com.codestates.TILTILE.exception.NotFoundException;
import com.codestates.TILTILE.member.dto.MemberWithBookmarksDto;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import com.codestates.TILTILE.member.service.MemberService;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.service.TilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final TilService tilService;

    @Autowired
    public BookmarkService(BookmarkRepository bookmarkRepository, MemberRepository memberRepository, MemberService memberService, TilService tilService) {
        this.bookmarkRepository = bookmarkRepository;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
        this.tilService = tilService;
    }

    public Bookmark addBookmark(Member member, Til til) {
        Bookmark bookmark = new Bookmark();
        bookmark.setMember(member);
        bookmark.setTil(til);
        return bookmarkRepository.save(bookmark);
    }

    public List<Bookmark> getBookmarksByMember(Member member) {
        return bookmarkRepository.findByMember(member);
    }

    public MemberWithBookmarksDto getMemberWithBookmarks(Long memberId) {
        Member member = memberService.getMemberById(memberId);
        if (member == null) {
            throw new NotFoundException(HttpStatus.NOT_FOUND.value(), "Member not found for ID: " + memberId);
        }
        List<Bookmark> bookmarks = getBookmarksByMember(member);
        bookmarks.sort(Comparator.comparing(Bookmark::getCreatedAt).reversed());

        List<Til> tilList = new ArrayList<>();
        for (Bookmark bookmark : bookmarks) {
            Long tilId = bookmark.getTil().getTilId();
            Til til = tilService.getTilById(tilId);
            tilList.add(til);
        }

        MemberWithBookmarksDto dto = new MemberWithBookmarksDto();
        dto.setMemberId(member.getMemberId());
        dto.setNickName(member.getNickName());
//        dto.setTilTier(member.getTilTier());
//        dto.setAboutMe(member.getAboutMe());
        dto.setBookmarks(bookmarks);

        return dto;
    }

    public void deleteBookmark(Long bookmarkId) {
        bookmarkRepository.deleteById(bookmarkId);
    }
}
