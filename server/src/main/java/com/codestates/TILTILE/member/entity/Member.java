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
    private Long tilTier;

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Til> tils = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Bookmark> bookmarks = new ArrayList<>();

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    public Member(String email) {
        this.email = email;
    } // OAUTH2

    // OAuth를 위해 구성한 추가 필드 2개
    private String provider;
    private String providerId;

    public Member(String email, String nickName, String password) {
        this.email = email;
        this.nickName = nickName;
        this.password = password;
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
}