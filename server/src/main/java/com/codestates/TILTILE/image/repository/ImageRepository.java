package com.codestates.TILTILE.image.repository;

import com.codestates.TILTILE.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
