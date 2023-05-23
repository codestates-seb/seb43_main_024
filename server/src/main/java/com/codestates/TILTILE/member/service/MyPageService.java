package com.codestates.TILTILE.member.service;

import com.codestates.TILTILE.exception.NotFoundException;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MyPageService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MyPageService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
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
        String encodedPassword = passwordEncoder.encode(newPassword);
        member.setPassword(encodedPassword);
        memberRepository.save(member);
    }

    private Member getMemberByEmail(String userEmail) {
        return memberRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundException(HttpStatus.NOT_FOUND.value(), "해당 이메일을 가진 사용자를 찾을 수 없습니다."));
    }
}
