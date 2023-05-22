package com.codestates.TILTILE.til.repository;

import com.codestates.TILTILE.til.entity.Til;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TilRepository extends JpaRepository<Til, Long> {
    Page<Til> findByTilTitleContaining(String searchKeyword, Pageable pageable);
    Page<Til> findByMember_MemberId(Long memberId, Pageable pageable);
}