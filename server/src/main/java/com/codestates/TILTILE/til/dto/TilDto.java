package com.codestates.TILTILE.til.dto;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public class TilDto {

    @Getter
    public static class Post {

        @Positive
        private long memberId;

        @NotEmpty(message = "제목을 작성해 주세요.")
        @Length(max = 100, message = "제목은 100자 이상 작성할 수 없습니다.")
        private String tilTitle;

        @NotEmpty(message = "내용을 작성해 주세요.")
        private String tilContent;

        @NotNull(message = "공개 여부를 선택해 주세요")
        private Boolean tilStatus;


        public Post(long memberId, String tilTitle, String tilContent, Boolean tilStatus) {
            this.memberId = memberId;
            this.tilTitle = tilTitle;
            this.tilContent = tilContent;
            this.tilStatus = tilStatus;
        }
    }

    @Data
    public static class Put {

        @Positive
        private long tilId;

        @NotEmpty(message = "제목을 작성해 주세요.")
        @Length(max = 100, message = "제목은 100자 이상 작성할 수 없습니다.")
        private String tilTitle;

        @NotEmpty(message = "내용을 작성해 주세요.")
        private String tilContent;

        @NotNull(message = "공개 여부를 선택해 주세요")
        private Boolean tilStatus;

        public Put(long tilId, String tilTitle, String tilContent, Boolean tilStatus) {
            this.tilId = tilId;
            this.tilTitle = tilTitle;
            this.tilContent = tilContent;
            this.tilStatus = tilStatus;
        }
    }

    @Data
    @Builder
    public static class Response {
        private long tilId;
        private String tilTitle;
        private String tilContent;
        private long tilViewCount;
        private LocalDateTime createdAt;
        private Timestamp modifiedAt;
        private long memberId;
        private String memberNickname;
        private Boolean tilStatus;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class getResponse {
        private long tilId;
        private String tilTitle;
        private String tilContent;
        private long tilViewCount;
        private LocalDateTime createdAt;
        private Timestamp modifiedAt;
        private long memberId;
        private String memberNickname;
        private String memberProfileImage;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class bookmarkCard {
        private long bookmarkId;
        private long tilId;
        private String tilTitle;
        private String tilContent;
        private long tilViewCount;
        private LocalDateTime createdAt;
        private Timestamp modifiedAt;
        private long memberId;
        private String memberNickname;
        private String memberProfileImage;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Card { // 틸 리스트 조회시 화면에 카드처럼 나오는 틸을 'card'라고 표현
        // card -> getConten에 북마크여부추가, status 삭ㅅ
        private long tilId;
        private String tilTitle;
        private String tilContent;
        private long tilViewCount;
        private LocalDateTime createdAt;
        private Timestamp modifiedAt;
        private String memberNickname;
        private long memberId;
        private String memberProfileImage;

        private Boolean checkBookmark;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PageResponseDto { // 틸 리스트 조회시 나오는 카드 전체와, 부가적인 정보를 담음
        private List<TilDto.Card> cards;
        private int pageNumber;
        private int totalPages;
        private long totalElements;
        private int size;
        private int startPage;
        private int endPage;
    }
}
