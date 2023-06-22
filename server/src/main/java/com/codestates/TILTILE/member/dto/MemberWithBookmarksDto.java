package com.codestates.TILTILE.member.dto;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.til.dto.TilDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class MemberWithBookmarksDto {
    private Long memberId;
    private String nickName;

    private long tilTier;

    private String aboutMe;

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
        @Schema(description = "페이지 번호", example = "1")
        private int pageNumber;

        @Schema(description = "전체 페이지 수", example = "10")
        private int totalPages;

        @Schema(description = "전체 요소 수", example = "100")
        private long totalElements;

        @Schema(description = "페이지 크기", example = "20")
        private int size;

        @Schema(description = "시작 페이지", example = "1")
        private int startPage;

        @Schema(description = "끝 페이지", example = "5")
        private int endPage;

    }
}
