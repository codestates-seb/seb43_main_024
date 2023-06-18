package com.codestates.TILTILE.batch.streamreader;

import com.codestates.TILTILE.til.entity.Til;
import org.springframework.batch.item.*;
import org.springframework.batch.item.support.ListItemReader;

import java.util.List;

// HotTilJobConfiguration 구현중 read() 지연을 위한 ItemStreamReader 구현체.
public class ContextAwareListItemReader implements ItemStreamReader<Til> {
    private ListItemReader<Til> delegate;
    private List<Til> topTils;

    public ContextAwareListItemReader(List<Til> topTils) {
        this.topTils = topTils;
    }

    @Override
    public void open(ExecutionContext executionContext) {
        this.delegate = new ListItemReader<>(topTils);
    }

    @Override
    public Til read() {
        return delegate.read();
    }

    @Override
    public void update(ExecutionContext executionContext) {
    }

    @Override
    public void close() {
    }
}
