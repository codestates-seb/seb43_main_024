package com.codestates.TILTILE.auth.handler;

import com.codestates.TILTILE.auth.jwt.JwtTokenizer;
import com.codestates.TILTILE.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;

    public MemberAuthenticationSuccessHandler(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        Member member = (Member) authentication.getPrincipal();

        // 로그인 성공 메시지를 응답으로 전송
        response.getWriter().println("로그인 컴플리트");
        response.setStatus(HttpServletResponse.SC_OK);

        // JWT 토큰 생성
        String username = authentication.getName();
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("role", "USER");
        Date accessTokenExpiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        Date refreshTokenExpiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, username, accessTokenExpiration, base64EncodedSecretKey);
        String refreshToken = jwtTokenizer.generateRefreshToken(username, refreshTokenExpiration, base64EncodedSecretKey);

        log.info("# Authenticated successfully!");
    }
}