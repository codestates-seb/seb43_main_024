package com.codestates.TILTILE.member.entity;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.til.entity.Til;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 300, nullable = false)
    private String password;

    @Column(length = 100, unique = true, nullable = false)
    private String nickName;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column
    private String aboutMe;

    @Column
    private Integer tilTier;

    @OneToMany(mappedBy = "member")
    private List<Til> tils = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Bookmark> bookmarks = new ArrayList<>();

    @Column(name = "profile_image")
    private String profileImage;

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Member(String email) {
        this.email = email;
    } // OAUTH2

    public String getEmail() {
        return email;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    // OAuth를 위해 구성한 추가 필드 2개
    private String provider;
    private String providerId;

    public Member(String email, String nickName, String password, Integer tilTier) {
        this.email = email;
        this.nickName = nickName;
        this.password = password;
        this.tilTier = tilTier;
    }

    public Member(String email, String nickName, String password, String provider, String providerId) {
        this.email = email;
        this.nickName = nickName;
        this.password = password;
        this.provider = provider;
        this.providerId = providerId;
    }

    public enum MemberRole {
        ROLE_USER,
        ROLE_ADMIN
    }

    public boolean isOauthMember() {
        return provider != null;
    }
}