package com.codestates.TILTILE.member.service;

import com.codestates.TILTILE.exception.BusinessLogicException;
import com.codestates.TILTILE.exception.ExceptionCode;
import com.codestates.TILTILE.auth.utils.CustomAuthorityUtils;
import com.codestates.TILTILE.exception.MemberNotFoundException;
import com.codestates.TILTILE.exception.NotFoundException;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Transactional
@Service
public class MemberService {
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

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // 추가: User Role DB에 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);


        return savedMember;
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

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Member getMemberById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(404, "Member not found"));
    }

    public void updateNickName(String userEmail, String newNickName) {
        Member member = getMemberByEmail(userEmail);
        member.setNickName(newNickName);
        memberRepository.save(member);
    }

    public void updateAboutMe(String userEmail, String newAboutMe) {
        Member member = getMemberByEmail(userEmail);
        member.setAboutMe(newAboutMe);
        memberRepository.save(member);
    }

    public void updatePassword(String userEmail, String newPassword) {
        Member member = getMemberByEmail(userEmail);
        // 비밀번호 암호화 등의 필요한 작업을 수행한 후에 비밀번호 업데이트
        member.setPassword(newPassword);
        memberRepository.save(member);
    }

    private Member getMemberByEmail(String userEmail) {
        return memberRepository.findByEmail(userEmail)
                .orElseThrow(() -> new MemberNotFoundException(HttpStatus.NOT_FOUND.value(), "User not found"));
    }
}