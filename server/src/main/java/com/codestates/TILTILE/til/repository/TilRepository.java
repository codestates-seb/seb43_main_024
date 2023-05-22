package com.codestates.TILTILE.til.repository;

import com.codestates.TILTILE.til.entity.Til;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TilRepository extends JpaRepository<Til, Long> {

    @Query("SELECT t FROM Til t WHERE t.tilTitle LIKE %:keyword% OR t.tilContent LIKE %:keyword%")
    Page<Til> findByKeyword(@Param("keyword") String keyword, Pageable pageable);
    Page<Til> findByMember_MemberId(Long memberId, Pageable pageable);
}