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

    public MemberWithBookmarksDto getMemberWithBookmarks(Long memberId, int page, int pageSize) {
        // 회원 ID로 회원 정보를 가져옴
        Member member = memberService.getMemberById(memberId);
        if (member == null) {
            // 회원이 존재하지 않을 경우 NotFoundException 예외를 던짐
            throw new NotFoundException(HttpStatus.NOT_FOUND.value(), "Member not found for ID: " + memberId);
        }

        // 회원의 북마크 목록을 가져옴
        List<Bookmark> bookmarks = getBookmarksByMember(member);
        // 북마크를 생성된 날짜를 기준으로 내림차순으로 정렬
        bookmarks.sort(Comparator.comparing(Bookmark::getCreatedAt).reversed());

        // 전체 북마크 수
        int totalBookmarks = bookmarks.size();
        // 페이지의 시작 인덱스
        int startIndex = (page - 1) * pageSize;
        // 페이지의 끝 인덱스 (실제 북마크 목록의 크기를 초과하지 않도록 함)
        int endIndex = Math.min(startIndex + pageSize, totalBookmarks);
        // 페이지에 해당하는 북마크 목록 추출
        List<Bookmark> pagedBookmarks = bookmarks.subList(startIndex, endIndex);

        // 페이지에 해당하는 북마크의 TIL 정보를 가져와서 리스트에 추가
        List<Til> tilList = new ArrayList<>();
        for (Bookmark bookmark : pagedBookmarks) {
            Long tilId = bookmark.getTil().getTilId();
            Til til = tilService.getTilById(tilId);
            tilList.add(til);
        }

        // 결과를 담을 MemberWithBookmarksDto 객체 생성 및 필드 설정
        MemberWithBookmarksDto dto = new MemberWithBookmarksDto();
        dto.setMemberId(member.getMemberId()); // 회원 ID 설정
        dto.setNickName(member.getNickName()); // 회원 닉네임 설정
        // 필요에 따라 다른 속성들을 설정 (주석에서는 생략되었음)
        dto.setBookmarks(pagedBookmarks); // 페이지네이션된 북마크 목록 설정

        return dto; // 완성된 DTO 반환
    }


    public void deleteBookmark(Long bookmarkId) {
        bookmarkRepository.deleteById(bookmarkId);
    }
}
