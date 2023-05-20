package com.codestates.TILTILE.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenizer {
    @Getter
    @Value("${jwt.key}")
    private String secretKey;
    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    // 비밀 키를 Base64로 인코딩합니다.
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // 주어진 클레임, 주제, 만료 시간, Base64로 인코딩된 비밀 키를 사용하여 액세스 토큰을 생성합니다.
    public String generateAccessToken(Map<String, Object> claims, String subject, Date expiration, String base64EncodedSecretKey) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, base64EncodedSecretKey.getBytes(StandardCharsets.UTF_8))
                .compact();
    }

    // 주어진 주제, 만료 시간, Base64로 인코딩된 비밀 키를 사용하여 리프레시 토큰을 생성합니다.
    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, base64EncodedSecretKey)
                .compact();
    }

    // JWS(JWT 서명)에서 클레임을 추출합니다. Base64로 인코딩된 비밀 키를 사용하여 서명을 검증합니다.
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    // JWS(JWT 서명)의 서명을 검증합니다. Base64로 인코딩된 비밀 키를 사용하여 서명을 검증합니다.
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    // 토큰의 만료 시간을 계산합니다. 주어진 만료 시간(분)을 기준으로 현재 시간에서 해당 시간을 더하여 계산합니다.
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    // Base64로 인코딩된 비밀 키에서 키를 추출합니다.
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }
}