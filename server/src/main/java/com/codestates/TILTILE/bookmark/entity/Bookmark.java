package com.codestates.TILTILE.bookmark.entity;

import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.til.entity.Til;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "til_id")
    private Til til;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();
}
