package com.codestates.TILTILE.batch.jobs;

import com.codestates.TILTILE.batch.processor.MemberProcessor;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;

import java.util.Collections;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class TilTierJobConfiguration {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final MemberRepository memberRepository;

    @Bean
    public ItemReader<Member> memberItemReader() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        return new RepositoryItemReaderBuilder<Member>()
                .name("memberItemReader")
                .repository(memberRepository)
                .methodName("findAll")
                .sorts(Collections.singletonMap("someKey", Sort.Direction.ASC))
                .build();
    }

    @Bean
    public ItemProcessor<Member, Member> memberItemProcessor() {
        return new MemberProcessor();
    }

    @Bean
    public ItemWriter<Member> memberItemWriter() {
        return members -> {
            for (Member member : members) {
                memberRepository.save(member);
            }
        };
    }

    @Bean
    public Step memberStep(ItemReader<Member> memberItemReader, ItemProcessor<Member, Member> memberItemProcessor, ItemWriter<Member> memberItemWriter) {
        return stepBuilderFactory.get("memberStep")
                .<Member, Member>chunk(10)
                .reader(memberItemReader)
                .processor(memberItemProcessor)
                .writer(memberItemWriter)
                .build();
    }

    @Bean
    @Qualifier("memberJob")
    public Job memberJob(Step memberStep) {
        return jobBuilderFactory.get("memberJob")
                .incrementer(new RunIdIncrementer())
                .start(memberStep)
                .build();
    }
}
