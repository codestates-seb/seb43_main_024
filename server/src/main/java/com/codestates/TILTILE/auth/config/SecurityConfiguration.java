package com.codestates.TILTILE.auth.config;

import com.codestates.TILTILE.auth.filter.JwtAuthenticationFilter;
import com.codestates.TILTILE.auth.filter.JwtVerificationFilter;
import com.codestates.TILTILE.auth.handler.*;
import com.codestates.TILTILE.auth.jwt.JwtTokenizer;
import com.codestates.TILTILE.auth.utils.CustomAuthorityUtils;
import com.codestates.TILTILE.member.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;


    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin() //    동일 출처로부터 들어오는 request 만 페이지 렌더링을 허용
                .and()
                .csrf().disable() // CSRF 공격에 대한 Spring Security 에 대한 설정을 비활성화
                .cors(Customizer.withDefaults()) // CORS 설정을 추가
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .logout()
                    .logoutUrl("/logout")
                    .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
                    .deleteCookies("jwt-token")
                .and()
                .formLogin().disable() // 폼 로그인 방식을 비활성화
                .httpBasic().disable() // HTTP Basic 인증 방식을 비활성화
                .exceptionHandling()
                    .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                    .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/members").permitAll() // 회원가입(*)
                        .antMatchers(HttpMethod.GET, "/members/**/til/**").permitAll() // 마이페이지 틸 조회(*)
                        .antMatchers(HttpMethod.GET, "/members/**/bookmark/**").hasRole("USER") // 마이페이지 북마크 조회(USER)
                        .antMatchers(HttpMethod.GET, "/members/**").permitAll() // member 정보 조회(*)
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER") // 회원 탈퇴(USER)
                        .antMatchers(HttpMethod.POST, "/login/mailConfirm").permitAll()  // 이메일 인증(*)
                        .antMatchers(HttpMethod.POST, "/til").hasRole("USER") // Til 작성(USER)
                        .antMatchers(HttpMethod.PUT, "/til/**").hasRole("USER") // Til 수정(USER)
                        .antMatchers(HttpMethod.GET, "/til/**").permitAll() // Til 조회(*)
                        .antMatchers(HttpMethod.DELETE, "/til/**").hasRole("USER") // Til 삭제(USER)
                        .antMatchers(HttpMethod.POST, "/bookmark/**").hasRole("USER") // 북마크 추가(USER)
                        .antMatchers(HttpMethod.DELETE, "/bookmark/**").hasRole("USER") // 북마크 삭제(USER)
//                        .antMatchers(HttpMethod.POST,"/follow/**").hasRole("USER") // follow 추가(USER)
                        .antMatchers(HttpMethod.PATCH,"/mypage/**").hasRole("USER") // mypage 변경 추가(USER)
                        .anyRequest().permitAll() // 모든 HTTP request 요청에 대해서 접근을 허용
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberService)));
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(List.of("http://tiltil2-images.s3-website.ap-northeast-2.amazonaws.com", "http://localhost:3000"));
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept", "memberId"));
        corsConfiguration.setExposedHeaders(List.of("Authorization", "Refresh"));
        corsConfiguration.setAllowedMethods(List.of("POST", "GET", "PATCH", "PUT", "DELETE", "OPTIONS"));

        // Add CORS headers for preflight response
        corsConfiguration.addAllowedMethod(HttpMethod.OPTIONS);
        corsConfiguration.addAllowedHeader(HttpHeaders.ORIGIN);
        corsConfiguration.addAllowedHeader(HttpHeaders.CONTENT_TYPE);
        corsConfiguration.addAllowedHeader(HttpHeaders.ACCEPT);

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return urlBasedCorsConfigurationSource;
    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(jwtTokenizer));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            builder
                    .addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

}