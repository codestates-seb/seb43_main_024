package com.codestates.TILTILE.auth.handler;

import com.codestates.TILTILE.auth.jwt.JwtTokenizer;
import com.codestates.TILTILE.auth.utils.CustomAuthorityUtils;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {   // (1)
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;


    // (2)
    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer,
                                      CustomAuthorityUtils authorityUtils,
                                      MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("Oauth Success");
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = token.getPrincipal();
        String provider = token.getAuthorizedClientRegistrationId();  // provider 구분 값

        String providerId = "";
        String profileImageURL = null;

        if (provider.equals("google")) {
            providerId = String.valueOf(oAuth2User.getAttributes().get("sub")); // Google에서 제공하는 사용자 ID
            profileImageURL = String.valueOf(oAuth2User.getAttributes().get("picture"));
        } else if (provider.equals("github")) {
            providerId = String.valueOf(oAuth2User.getAttributes().get("id"));
            profileImageURL = String.valueOf(oAuth2User.getAttributes().get("avatar_url"));
            System.out.println("github@@@");
        }


        String email = String.valueOf(oAuth2User.getAttributes().get("email")); // (3)
        List<String> authorities = authorityUtils.createRoles(email);           // (4)

        String name = String.valueOf(oAuth2User.getAttributes().get("name"));

        Member member = saveMember(email, name, profileImageURL, provider, providerId);  // (5)
        redirect(request, response, email, authorities, member);  // (6)
    }

    private Member saveMember(String email, String name, String profileImageURL, String provider, String providerId) {
        return memberService.oauth2CreateMember(email, name, profileImageURL,provider, providerId);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, List<String> authorities, Member member) throws IOException {
        String accessToken = delegateAccessToken(username, authorities, member);  // (6-1)
        String refreshToken = delegateRefreshToken(username);     // (6-2)

//        response.setHeader("Authorization", "Bearer " + accessToken);  // (4-4)
//        response.setHeader("Refresh", refreshToken);

        String uri = createURI(accessToken, refreshToken).toString();   // (6-3)
        System.out.println("uri = " + uri);
        getRedirectStrategy().sendRedirect(request, response, uri);   // (6-4)
    }

    private String delegateAccessToken(String username, List<String> authorities, Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);
        claims.put("memberId", member.getMemberId());
        claims.put("nickName", member.getNickName());

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("tiltile.co.kr")
//                .port(80)
                .path("/oauthloading") //
//                .path(uriPath)
                .queryParams(queryParams)
                .build()
                .toUri();
    }

}