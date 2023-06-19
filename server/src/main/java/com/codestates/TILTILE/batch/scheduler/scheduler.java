package com.codestates.TILTILE.batch.scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

@RequiredArgsConstructor
@Configuration
public class scheduler {
    private final JobLauncher jobLauncher;
    private final Job jpaItemWriterJob;

    @Scheduled(cron = "0 0 1 * * ?")
    public void launchJob() throws Exception {
        JobParameters params = new JobParametersBuilder()
                .addString("JobID", String.valueOf(System.currentTimeMillis()))
                .toJobParameters();
        jobLauncher.run(jpaItemWriterJob, params);
    }
}
