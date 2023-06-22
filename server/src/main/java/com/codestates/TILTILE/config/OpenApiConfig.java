package com.codestates.TILTILE.config;

import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.info.Info;

import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.parameters.RequestBody;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI(@Value("${springdoc.version}") String springdocVersion) {
        Info info = new Info()
                .title("TilTile API")
                .version(springdocVersion)
                .description("TilTile API입니다.")
                .termsOfService("http://swagger.io/terms/") // 이용약관
                .license(new License()
                        .name("Apache License Version 2.0")
                        .url("http://www.apache.org/licenses/LICENSE-2.0")
                );
        // 이미지 업로드
        MediaType[] mediaTypes = {MediaType.MULTIPART_FORM_DATA};
        RequestBody requestBody = new RequestBody()
                .description("이미지 파일")
                .content(new Content()
                        .addMediaType("multipart/form-data", new io.swagger.v3.oas.models.media.MediaType().schema(new Schema().type("string").format("binary"))))
                .required(true);
        Operation operation = new Operation()
                .operationId("uploadImage") // 작업 ID 설정
                .summary("이미지 업로드")
                .requestBody(requestBody);


        // 서버설정
        Server localServer = new Server().url("http://localhost:8080");
        Server productionServer = new Server().url("http://tiltil2-images.s3-website.ap-northeast-2.amazonaws.com");

        // 로그인
        Operation loginOperation = new Operation()
                .operationId("login") // 작업 ID 설정
                .summary("사용자 로그인")
                .description("로그인 관련 API 입니다.")
                .tags(Collections.singletonList("Login")) // 태그 추가
                .requestBody(new RequestBody()
                        .required(true)
                        .content(new Content()
                                .addMediaType(MediaType.APPLICATION_JSON_VALUE, new io.swagger.v3.oas.models.media.MediaType()
                                        .schema(new Schema()
                                                .type("object")
                                                .addProperties("username", new StringSchema().description("사용자명").example("test@example.com"))
                                                .addProperties("password", new StringSchema().description("비밀번호").example("Test123!@#"))
                                        )
                                )
                        )
                ) // 로그인 요청 바디 스키마 지정
                .responses(new ApiResponses()
                        .addApiResponse("200", new ApiResponse()
                                .description("로그인 성공")
                                .content(new Content()
                                        .addMediaType(MediaType.APPLICATION_JSON_VALUE, new io.swagger.v3.oas.models.media.MediaType()
                                                .schema(new Schema()
                                                        .type("object")
                                                        .addProperties("token", new StringSchema().description("토큰"))
                                                )
                                        )
                                )
                        )
                        .addApiResponse("401", new ApiResponse().description("인증 실패"))
                );

        // 로그인 API에 대한 태그 생성
        Tag loginTag = new Tag()
                .name("Login")
                .description("로그인 관련 API");

        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("apiKey", new SecurityScheme()
                                .type(SecurityScheme.Type.APIKEY)
                                .name("Authorization")
                                .in(SecurityScheme.In.HEADER)
                                .scheme("bearer")))
                .addSecurityItem(new SecurityRequirement().addList("apiKey", Arrays.asList("USER")))
                .info(info)
                .tags(Collections.singletonList(loginTag)) // 로그인 태그 추가
                .paths(new Paths()
                        .addPathItem("/uploadProfileImage", new PathItem().post(operation))
                        .addPathItem("/login", new PathItem().post(loginOperation))
                );
    }
}
