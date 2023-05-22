package com.codestates.TILTILE.follow.repository;

import com.codestates.TILTILE.follow.entitiy.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    Optional<Follow> findByFollowIdAndMemberId(Long followId, Long memberId);
    void deleteByMemberId(Long memberId);
}
