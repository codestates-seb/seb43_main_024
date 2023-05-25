package com.codestates.TILTILE.bookmark.service;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.bookmark.repository.BookmarkRepository;
import com.codestates.TILTILE.exception.NotFoundException;
import com.codestates.TILTILE.member.dto.MemberWithBookmarksDto;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.mapper.MemberMapper;
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
    private final MemberMapper memberMapper;

    @Autowired
    public BookmarkService(BookmarkRepository bookmarkRepository, MemberRepository memberRepository, MemberService memberService, TilService tilService, MemberMapper memberMapper) {
        this.bookmarkRepository = bookmarkRepository;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
        this.tilService = tilService;
        this.memberMapper = memberMapper;
    }

    public Bookmark addBookmark(Member member, Til til) {
        Bookmark bookmark = new Bookmark();
        bookmark.setMember(member);
        bookmark.setTil(til);
        return bookmarkRepository.save(bookmark);
    }

    public boolean checkBookmarkExists(Member member, Til til) {
        return bookmarkRepository.existsByMemberAndTil(member, til);
    }

    public List<Bookmark> getBookmarksByMember(Member member) {
        return bookmarkRepository.findByMember(member);
    }

    public MemberWithBookmarksDto.PageResponseDto getMemberWithBookmarks(Pageable pageable, Long memberId, int pageLimit) {
        Member member = memberService.getMemberById(memberId);
        if (member == null) {
            throw new NotFoundException(HttpStatus.NOT_FOUND.value(), "Member not found for ID: " + memberId);
        }
        int page = pageable.getPageNumber() - 1;

        Pageable pageRequest = PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "til"));

//        List<Bookmark> bookmarks = getBookmarksByMember(member);
        // Page<Bookmark> 로 인해서 페이지 정보를 얻을 수 있다
        Page<Bookmark> bookmarks = bookmarkRepository.findByMember(member, pageRequest);
//        bookmarks.sort(Comparator.comparing(Bookmark::getCreatedAt).reversed());

        List<Til> tilList = new ArrayList<>();
        for (Bookmark bookmark : bookmarks) {
            Long tilId = bookmark.getTil().getTilId();
            Til til = tilService.getTilById(tilId);
            tilList.add(til);
        }

        int blockLimit = 5;
        int startPage = (((int)(Math.ceil((double) pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
        int endPage = Math.min(startPage + blockLimit - 1, bookmarks.getTotalPages());

        return memberMapper.toMemberWithBookmarksDto(tilList, bookmarks, page, startPage, endPage);
    }

    public void deleteBookmark(Long bookmarkId) {
        bookmarkRepository.deleteById(bookmarkId);
    }
}
