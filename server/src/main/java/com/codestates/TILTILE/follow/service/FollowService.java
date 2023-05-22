package com.codestates.TILTILE.follow.service;

import com.codestates.TILTILE.follow.entitiy.Follow;
import com.codestates.TILTILE.follow.repository.FollowRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FollowService {

    private final FollowRepository followRepository;

    public FollowService(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    public void createFollow(Long followerId, Long followingId) {
        Follow follow = new Follow();
        follow.setMemberId(followerId);
        follow.setFollowId(followingId);
        followRepository.save(follow);
    }

    public void deleteFollow(Long followerId, Long followingId) {
        Optional<Follow> optionalFollow = followRepository.findByFollowIdAndMemberId(followerId, followingId);
        optionalFollow.ifPresent(follow -> followRepository.delete(follow));
    }
}
