package com.codestates.TILTILE.til.repository;

import com.codestates.TILTILE.til.entity.Til;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TilRepository extends JpaRepository<Til, Long> {
    List<Til> findTop16ByOrderByTilIdDesc();
}