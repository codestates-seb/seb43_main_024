package com.codestates.TILTILE.member.dto;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.til.dto.TilDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class MemberWithBookmarksDto {
    private Long memberId;
    private String nickName;
//    private long tilTier;
//    private String aboutMe;
    private List<Bookmark> bookmarks;

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public List<Bookmark> getBookmarks() {
        return bookmarks;
    }

    public void setBookmarks(List<Bookmark> bookmarks) {
        this.bookmarks = bookmarks;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PageResponseDto { // 틸 리스트 조회시 나오는 카드 전체와, 부가적인 정보를 담음
        private List<TilDto.bookmarkCard> bookmarks;
        private int pageNumber;
        private int totalPages;
        private long totalElements;
        private int size;
        private int startPage;
        private int endPage;
    }
}
