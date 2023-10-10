package com.codestates.TILTILE.til.service;

import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.til.dto.TilDto;
import com.codestates.TILTILE.til.entity.HotTil;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.mapper.TilMapper;
import com.codestates.TILTILE.til.repository.HotTilRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class HotTilService {

    private final HotTilRepository hotTilRepository;
    private final TilMapper tilMapper;

    public HotTilService(HotTilRepository hotTilRepository,
                         TilMapper tilMapper) {
        this.hotTilRepository = hotTilRepository;
        this.tilMapper = tilMapper;
    }

    public List<TilDto.Card> findCards(List<Bookmark> bookmarkList ) {
        // 핫틸 리스트 -> 틸 리스트 -> TilDto.Card 리스트
        List<HotTil> EntityHotTils = hotTilRepository.findAll();

        List<Til> EntityTils = new ArrayList<>(8);
        for (HotTil hotTil: EntityHotTils) {
            EntityTils.add(hotTil.getTil());
        }

        List<TilDto.Card> cardList = new ArrayList<>(8);
        for (Til til : EntityTils) {
            cardList.add(tilMapper.toCard(til, bookmarkList));
        }

        return cardList;
    }

    @Transactional
    public void deleteAllHotTils() {
        hotTilRepository.deleteAllInBatch();
    }
}
