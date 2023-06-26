package com.codestates.TILTILE.batch.jobs;

import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.repository.TilRepository;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class TilTierJobConfiguration {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final MemberRepository memberRepository;
    private final TilRepository tilRepository;

    @Bean
    @Qualifier("memberJob")
    public Job memberJob(Step memberStep) {
        log.info("memberJob");
        return jobBuilderFactory.get("memberJob")
                .incrementer(new RunIdIncrementer())
                .start(memberStep)
                .build();
    }

    @Bean
    public Step memberStep() {
        log.info("memberStep");
        return stepBuilderFactory.get("memberStep")
                .<Til, Member>chunk(10)
                .reader(tilItemReader())
                .processor(memberItemProcessor())
                .writer(memberItemWriter(memberRepository))
                .build();
    }

    @Bean
    public ItemReader<Til> tilItemReader() {
        // 어제 날짜를 계산합니다.
        LocalDate yesterday = LocalDate.now().minusDays(1);

        LocalDateTime startOfYesterday = yesterday.atStartOfDay();
        LocalDateTime endOfYesterday = yesterday.atTime(23, 59, 59);

        // RepositoryItemReader를 생성하여 Til 엔티티를 조회하는 기능을 구현합니다.
        RepositoryItemReader<Til> reader = new RepositoryItemReaderBuilder<Til>()
                .name("tilItemReader") // Reader의 이름을 지정합니다.
                .repository(tilRepository) // 사용할 Repository를 설정합니다.
                .methodName("findByCreatedAtBetween") // Repository에서 실행할 메서드의 이름을 지정합니다.
                .arguments(startOfYesterday, endOfYesterday)
                .sorts(Collections.singletonMap("tilId", Sort.Direction.DESC)) // 조회 결과를 정렬합니다. (til ID를 내림차순으로 정렬)
                .build();

        try {
            Til item = reader.read();
            System.out.println("Read item: " + item); // 읽은 항목 출력
        } catch (Exception e) {
            System.out.println("Error reading item: " + e.getMessage()); // 에러 발생 시 에러 메시지 출력
        }

        return reader;
    }

    @Bean
    public ItemProcessor<Til, Member> memberItemProcessor() {
        return new ItemProcessor<Til, Member>() {
            private Set<Long> processedMemberIds = new HashSet<>();

            @Override
            public Member process(Til til) throws Exception {
                Member member = til.getMember();
                Long memberId = member.getMemberId();

                if (!processedMemberIds.contains(memberId)) {
                    if (member.getTilTier() == null) {
                        member.setTilTier(0);
                    }
                    member.setTilTier(member.getTilTier() + 1);

                    processedMemberIds.add(memberId);
                    return member;
                }

                return null; // 중복되는 경우 null을 반환하여 아이템을 필터링합니다.
            }
        };
    }


    @Bean
    public ItemWriter<Member> memberItemWriter(MemberRepository memberRepository) {
        return members -> {
            for (Member member: members) {
                if (member.getMemberId() != null && memberRepository.existsById(member.getMemberId())) {
                    memberRepository.save(member); // 기존 멤버 업데이트
                } else {
                    memberRepository.saveAndFlush(member); // 새로운 멤버 저장
                }
            }
        };
    }
}