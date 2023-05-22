package com.codestates.TILTILE.member.repository;

import com.codestates.TILTILE.member.dto.MemberWithBookmarksDto;
import com.codestates.TILTILE.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    @Query("SELECT m FROM Member m LEFT JOIN FETCH m.bookmarks WHERE m.memberId = :memberId")
    MemberWithBookmarksDto findMemberWithBookmarksById(@Param("memberId") Long memberId);
}

