package com.codestates.TILTILE.member.dto;

import com.codestates.TILTILE.bookmark.entity.Bookmark;

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
}
