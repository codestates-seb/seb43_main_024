package com.codestates.TILTILE;

//import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

//@EnableBatchProcessing
@EnableScheduling
@EnableBatchProcessing // 배치 기능 활성화
@SpringBootApplication
public class TiltilEApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(TiltilEApplication.class, args);
	}

}
