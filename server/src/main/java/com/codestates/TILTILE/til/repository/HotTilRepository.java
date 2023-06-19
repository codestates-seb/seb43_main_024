package com.codestates.TILTILE.til.repository;

import com.codestates.TILTILE.til.entity.HotTil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotTilRepository extends JpaRepository<HotTil, Long> {

}
