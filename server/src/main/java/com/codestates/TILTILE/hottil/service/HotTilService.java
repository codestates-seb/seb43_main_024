package com.codestates.TILTILE.hottil.service;

import com.codestates.TILTILE.hottil.repository.HotTilRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class HotTilService {

    private final HotTilRepository hotTilRepository;

    public HotTilService(HotTilRepository hotTilRepository) {
        this.hotTilRepository = hotTilRepository;
    }

    @Transactional
    public void deleteAllHotTils() {
        hotTilRepository.deleteAllInBatch();
    }
}
