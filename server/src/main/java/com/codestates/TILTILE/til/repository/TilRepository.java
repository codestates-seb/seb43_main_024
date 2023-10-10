package com.codestates.TILTILE.til.repository;

import com.codestates.TILTILE.til.entity.Til;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TilRepository extends JpaRepository<Til, Long> {

    @Query("SELECT t FROM Til t WHERE (t.tilTitle LIKE %:keyword% OR t.tilContent LIKE %:keyword%) AND t.tilStatus = false")
    Page<Til> findByKeyword(@Param("keyword") String keyword, Pageable pageable);
    Page<Til> findByTilStatusFalse(Pageable pageable);

    Page<Til> findByMember_MemberId(Long memberId, Pageable pageable);

    Page<Til> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);

}