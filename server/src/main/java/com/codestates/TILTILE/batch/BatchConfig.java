//package com.codestates.TILTILE.batch;
//
//import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.DefaultResourceLoader;
//import org.springframework.core.io.Resource;
//import org.springframework.core.io.ResourceLoader;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
//
//import javax.annotation.PostConstruct;
//import javax.sql.DataSource;
//
//@Configuration
//@EnableBatchProcessing
//public class BatchConfig {
//
//    private final DataSource dataSource;
//
//    public BatchConfig(DataSource dataSource) {
//        this.dataSource = dataSource;
//    }
//
//    @Bean
//    public JdbcTemplate jdbcTemplate() {
//        return new JdbcTemplate(dataSource);
//    }
//
//    @PostConstruct
//    public void initialize() {
//        ResourceLoader resourceLoader = new DefaultResourceLoader();
//
//        // 스프링 배치 테이블 생성 스크립트 실행
//        Resource batchSchemaScript = resourceLoader.getResource("classpath:org/springframework/batch/core/schema-mysql.sql");
//        executeScript(batchSchemaScript);
//
//        // 기존 비즈니스 테이블 생성 스크립트 실행
//        Resource businessSchemaScript = resourceLoader.getResource("classpath:business-schema.sql");
//        executeScript(businessSchemaScript);
//    }
//
//    private void executeScript(Resource scriptResource) {
//        try {
//            ResourceDatabasePopulator populate = new ResourceDatabasePopulator(scriptResource);
//            populate.execute(dataSource);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    // 다른 설정과 메서드 생략
//}
