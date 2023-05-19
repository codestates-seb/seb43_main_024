package com.codestates.TILTILE.member.service;

import com.codestates.TILTILE.exception.BusinessLogicException;
import com.codestates.TILTILE.exception.ExceptionCode;
import com.codestates.TILTILE.auth.utils.CustomAuthorityUtils;
import com.codestates.TILTILE.exception.NotFoundException;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Transactional
@Service
public class MemberService{
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final ApplicationEventPublisher publisher;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, ApplicationEventPublisher publisher) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.publisher = publisher;
    }

    public Member createMember(String email, String nickName, String password) {
        if (password == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }
        String encodedPassword = passwordEncoder.encode(password);
        Member member = new Member(email, nickName, encodedPassword);
        return memberRepository.save(member);
    }

    // OAUTH2
    public Member oauth2CreateMember(String email, String name, String provider, String providerId) {
        Optional<Member> existingMember = memberRepository.findByEmail(email);

        if (existingMember.isPresent()) {
            return existingMember.get();
        } else {
            String randomPassword = UUID.randomUUID().toString().substring(0, 10);
            String encodedPassword = passwordEncoder.encode(randomPassword);
            Member savedMember = new Member(email, name, encodedPassword, provider, providerId);
            return memberRepository.save(savedMember);
        }
    }

    public Member verifyExistsMemberId(long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        if (member.isEmpty())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);

        return member.get();
    }

    public Member getMemberById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(404, "Member not found"));
    }
}