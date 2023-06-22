package com.codestates.TILTILE.batch.scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

@RequiredArgsConstructor
@Configuration
public class scheduler {
    private final JobLauncher jobLauncher;

    @Qualifier("hotTilJob")
    private final Job hotTilJob;

    @Qualifier("memberJob")
    private final Job memberJob;

    @Scheduled(cron = "0 0 1 * * ?")
    public void hotTilJob() throws Exception {
        JobParameters params = new JobParametersBuilder()
                .addString("JobID", String.valueOf(System.currentTimeMillis()))
                .toJobParameters();
        jobLauncher.run(hotTilJob, params);
    }

    @Scheduled(cron = "0 0 2 * * ?")
    public void memberJob() throws Exception {
        JobParameters params = new JobParametersBuilder()
                .addString("JobID", String.valueOf(System.currentTimeMillis()))
                .toJobParameters();
        jobLauncher.run(memberJob, params);
    }
}
