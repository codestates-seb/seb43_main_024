package com.codestates.TILTILE.til.entity;

import com.codestates.TILTILE.member.entity.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
public class Til {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tilId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        member.getTils().add(this);
    }

    @Column(nullable = false, length = 100)
    private String  tilTitle;

    @Column(nullable = false)
    @Lob
    private String tilContent;

    @Column
    private Long tilViewCount;

    @Column(nullable = false)
    private Boolean tilStatus;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private Timestamp modifiedAt;

    public void updateFrom(Til til) {
        if (til.getTilTitle() != null) {
            this.setTilTitle(til.getTilTitle());
        }
        if (til.getTilContent() != null) {
            this.setTilContent(til.getTilContent());
        }
        if (til.getTilStatus() != null) {
            this.setTilStatus(til.getTilStatus());
        }
        if (til.getModifiedAt() != null) {
            this.setModifiedAt(til.getModifiedAt());
        }
    }
}