package com.codestates.TILTILE;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class TiltilEApplication {

	public static void main(String[] args) {
		SpringApplication.run(TiltilEApplication.class, args);
	}

}
