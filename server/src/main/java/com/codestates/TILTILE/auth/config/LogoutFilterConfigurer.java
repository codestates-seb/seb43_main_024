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
        LogoutFilter logoutFilter = new LogoutFilter(new SimpleUrlLogoutSuccessHandler(), new JwtLogoutHandler(), new SecurityContextLogoutHandler());
        logoutFilter.setLogoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"));
        http.addFilterBefore(logoutFilter, JwtVerificationFilter.class);
    }
}


