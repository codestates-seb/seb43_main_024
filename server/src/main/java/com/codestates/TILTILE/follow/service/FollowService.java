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

    public void createFollow(Long followerId, Long followedMemberId) {
        Follow follow = new Follow();
        follow.setFollowerId(followerId);
        follow.setFollowedMemberId(followedMemberId);
        followRepository.save(follow);
    }

    public void deleteFollow(Long followId, Long followerId, Long followedMemberId) {
        Optional<Follow> optionalFollow = followRepository.findByFollowIdAndFollowerIdAndFollowedMemberId(followId, followerId, followedMemberId);
        optionalFollow.ifPresent(follow -> followRepository.delete(follow));
    }
}
