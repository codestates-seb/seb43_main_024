package com.codestates.TILTILE.follow.entitiy;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "follow")
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long followId;

    @Column(name = "follower_id")
    private Long followerId;

    @Column(name = "followed_member_id")
    private Long followedMemberId;
}
