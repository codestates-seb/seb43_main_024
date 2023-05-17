package com.codestates.TILTILE.auth.filter;

import com.codestates.TILTILE.auth.jwt.JwtTokenizer;
import com.codestates.TILTILE.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // System.out.println("# JwtVerificationFilter");

        try {
            // JWT 검증을 수행하여 클레임을 가져옵니다.
            Map<String, Object> claims = verifyJws(request);
            // 클레임을 사용하여 인증 객체를 생성하고 SecurityContext에 설정합니다.
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            // 서명 오류가 발생한 경우 예외를 요청 속성에 설정합니다.
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            // 토큰의 만료가 발생한 경우 예외를 요청 속성에 설정합니다.
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            // 기타 예외가 발생한 경우 예외를 요청 속성에 설정합니다.
            request.setAttribute("exception", e);
        }

        // 다음 필터 또는 서블릿으로 요청을 전달합니다.
        filterChain.doFilter(request, response);
    }


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        // "Authorization" 헤더가 없거나, 값이 "Bearer"로 시작하지 않는 경우 필터를 적용하지 않습니다.
        return authorization == null || !authorization.startsWith("Bearer");
    }

    // JWS(JWT 서명)를 확인하고 해당 토큰의 클레임을 반환합니다.
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    // 클레임을 기반으로 인증 객체를 생성하고, SecurityContextHolder에 설정합니다.
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}