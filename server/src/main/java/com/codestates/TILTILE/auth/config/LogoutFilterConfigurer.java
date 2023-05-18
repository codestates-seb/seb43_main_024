package com.codestates.TILTILE.auth.config;

import com.codestates.TILTILE.auth.filter.JwtVerificationFilter;
import com.codestates.TILTILE.auth.jwt.JwtLogoutHandler;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

public class LogoutFilterConfigurer extends AbstractHttpConfigurer<LogoutFilterConfigurer, HttpSecurity> {
    @Override
    public void configure(HttpSecurity http) {
        // LogoutFilter를 생성하여 필터 체인에 추가합니다.
        LogoutFilter logoutFilter = new LogoutFilter(new SimpleUrlLogoutSuccessHandler(), new JwtLogoutHandler(), new SecurityContextLogoutHandler());

        // "/logout" 경로로의 POST 요청을 로그아웃 요청으로 설정합니다.
        logoutFilter.setLogoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"));

        // JwtVerificationFilter 이전에 LogoutFilter를 추가합니다.
        http.addFilterBefore(logoutFilter, JwtVerificationFilter.class);
    }
}


