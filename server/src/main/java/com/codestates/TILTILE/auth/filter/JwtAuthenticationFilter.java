package com.codestates.TILTILE.auth.filter;

import com.codestates.TILTILE.auth.dto.LoginDto;
import com.codestates.TILTILE.auth.jwt.JwtTokenizer;
import com.codestates.TILTILE.member.entity.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        // ObjectMapper를 사용하여 JSON 데이터를 객체로 변환합니다.
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        // 사용자명과 비밀번호로 UsernamePasswordAuthenticationToken을 생성합니다.
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        // AuthenticationManager를 사용하여 인증을 시도합니다.
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {

        // 인증에 성공한 경우 Principal로부터 Member 객체를 가져옵니다.
        Member member = (Member) authResult.getPrincipal();

        // AccessToken을 생성합니다.
        String accessToken = delegateAccessToken(member);

        // RefreshToken을 생성합니다.
        String refreshToken = delegateRefreshToken(member);

        // 응답 헤더에 memberId를 설정합니다.
        response.setHeader("memberId", Long.toString(member.getMemberId()));

        // 응답 헤더에 AccessToken을 설정합니다.
        response.setHeader("Authorization", "Bearer " + accessToken);

        // 응답 헤더에 RefreshToken을 설정합니다.
        response.setHeader("Refresh", refreshToken);

        // 인증 성공 핸들러를 호출합니다.
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(Member member) {
        // AccessToken을 생성하기 위해 클레임과 만료 시간을 설정합니다.
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());
        claims.put("nickName", member.getNickName());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        // JwtTokenizer를 사용하여 AccessToken을 생성합니다.
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        // RefreshToken을 생성하기 위해 주제(subject)와 만료 시간을 설정합니다.
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        // JwtTokenizer를 사용하여 RefreshToken을 생성합니다.
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}