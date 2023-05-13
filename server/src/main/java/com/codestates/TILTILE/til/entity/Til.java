package com.codestates.TILTILE.til.entity;

import com.codestates.TILTILE.member.entity.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
public class Til {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tilId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        member.getTils().add(this);
    }

    @Column
    private String  tilTitle;

    @Column
    private String tilContent;

    @Column
    private Long tilViewCount;

    @Column
    private Boolean tilStatus;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();
}
