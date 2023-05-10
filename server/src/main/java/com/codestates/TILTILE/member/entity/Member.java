package com.codestates.TILTILE.member.entity;

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

    @Column(length = 100, nullable = false)
    private String nickName;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    public Member(String email, String nickName, String password) {
        this.email = email;
        this.nickName = nickName;
        this.password = password;
    }
}
