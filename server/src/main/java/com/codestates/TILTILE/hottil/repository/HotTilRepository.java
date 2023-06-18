package com.codestates.TILTILE.hottil.repository;

import com.codestates.TILTILE.hottil.entity.HotTil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotTilRepository extends JpaRepository<HotTil, Long> {

}
