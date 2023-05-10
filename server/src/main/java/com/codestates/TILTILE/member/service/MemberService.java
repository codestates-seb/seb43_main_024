package com.codestates.TILTILE.member.service;

import com.codestates.TILTILE.exception.BusinessLogicException;
import com.codestates.TILTILE.exception.ExceptionCode;
import com.codestates.TILTILE.helper.MemberRegistrationApplicationEvent;
import com.codestates.TILTILE.auth.utils.CustomAuthorityUtils;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final ApplicationEventPublisher publisher;

    @Autowired
    public MemberService(MemberRepository repository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, ApplicationEventPublisher publisher) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.publisher = publisher;
    }

//    public Member createMember(Member member) {
//        verifyExistsEmail(member.getEmail());
//
//        if (member.getPassword() == null) {
//            throw new IllegalArgumentException("Password cannot be null");
//        }
//
//        String encryptedPassword = passwordEncoder.encode(member.getPassword());
//        member.setPassword(encryptedPassword);
//
//        // 추가: User Role DB에 저장
//        List<String> roles = authorityUtils.createRoles(member.getEmail());
//        member.setRoles(roles);
//
//        Member savedMember = repository.save(member);
//
//        publisher.publishEvent(new MemberRegistrationApplicationEvent(savedMember));
//        return savedMember;
//    }

    public Member createMember(String email, String nickName, String password) {
        if (password == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }
        String encodedPassword = passwordEncoder.encode(password);
        Member member = new Member(email, nickName, encodedPassword);
        return repository.save(member);
    }


    private void verifyExistsEmail(String email) {
        Optional<Member> member = repository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}
