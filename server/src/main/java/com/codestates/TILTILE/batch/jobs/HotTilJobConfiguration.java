package com.codestates.TILTILE.batch.jobs;

import com.codestates.TILTILE.batch.streamreader.ContextAwareListItemReader;
import com.codestates.TILTILE.til.entity.HotTil;
import com.codestates.TILTILE.til.service.HotTilService;
import com.codestates.TILTILE.til.entity.Til;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.*;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class HotTilJobConfiguration {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final EntityManagerFactory entityManagerFactory;
    private final HotTilService hotTilService;

    private static final int chunkSize = 5;

    private final List<Til> topTils = new ArrayList<>();

    @Bean
    public Job jpaItemWriterJob() {
        return jobBuilderFactory.get("jpaItemWriterJob2")
                .incrementer(new RunIdIncrementer())
                .start(clearHotTilStep(hotTilService))
                .next(find7DaysTopTilsStep())
                .next(topTilsConvertHotTilAndSave())
//                .start(find7DaysTopTilsStep())
//                .next(topTilsConvertHotTilAndSave())
                .build();
    }

    @Bean
    public Step clearHotTilStep(HotTilService hotTilService) {
        return stepBuilderFactory.get("clearHotTilStep")
                .tasklet((contribution, chunkContext) -> {
                    hotTilService.deleteAllHotTils();
                    return RepeatStatus.FINISHED;
                })
                .build();
    }


    // JpaPagingItemReader는 LIMIT 구절을 구현하지 못함.
    // JpaPagingItemReader는 tasklet으로 대체. 결과물은 topTils<Til> 리스트에 저장.
    @Bean
    public Step find7DaysTopTilsStep() {
        return stepBuilderFactory.get("find7DaysTopTilsStep")
                .tasklet((contribution, chunkContext) -> {
                    topTils.clear();
                    EntityManager entityManager = entityManagerFactory.createEntityManager();

                    LocalDateTime startDate = LocalDateTime.now().minusDays(6);
                    LocalDateTime endDate = LocalDateTime.now();

                    try {
                        topTils.addAll(
                                entityManager.createQuery(
                                                "SELECT t FROM Til t WHERE t.createdAt >= :startDate AND t.createdAt <= :endDate ORDER BY t.tilViewCount DESC", Til.class
                                        ).setParameter("startDate", startDate)
                                        .setParameter("endDate", endDate)
                                        .setMaxResults(8)
                                        .getResultList()
                        );

                        System.out.println("topTils.size");
                        System.out.println(topTils.size());
                    } finally {
                        entityManager.close();
                    }
                    return RepeatStatus.FINISHED;
                })
                .build();
    }


    @Bean
    public Step topTilsConvertHotTilAndSave() {
        return stepBuilderFactory.get("topTilsConvertHotTilAndSave")
                .<Til, HotTil>chunk(chunkSize)
                .reader(new ContextAwareListItemReader(topTils))
                .processor(tilToHotTilProcessor())
                .writer(jpaItemWriter())
                .build();
    }

    @Bean
    public ItemProcessor<Til, HotTil> tilToHotTilProcessor() {
        return til -> {
            HotTil hotTil = new HotTil();
            hotTil.setTil(til);

            return hotTil;
        };
    }

    @Bean
    public JpaItemWriter<HotTil> jpaItemWriter() {
        JpaItemWriter<HotTil> jpaItemWriter = new JpaItemWriter<>();
        jpaItemWriter.setEntityManagerFactory(entityManagerFactory);
        return jpaItemWriter;
    }
}