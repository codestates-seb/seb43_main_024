package com.codestates.TILTILE.member.service;

import com.codestates.TILTILE.amazon.s3.service.Amazon3SService;
import com.codestates.TILTILE.bookmark.entity.Bookmark;
import com.codestates.TILTILE.bookmark.repository.BookmarkRepository;
import com.codestates.TILTILE.exception.BusinessLogicException;
import com.codestates.TILTILE.exception.ExceptionCode;
import com.codestates.TILTILE.auth.utils.CustomAuthorityUtils;
import com.codestates.TILTILE.exception.MemberNotFoundException;
import com.codestates.TILTILE.exception.NotFoundException;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import com.codestates.TILTILE.til.entity.Til;
import com.codestates.TILTILE.til.repository.TilRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final TilRepository tilRepository;
    private final BookmarkRepository bookmarkRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final Amazon3SService amazon3SService;
    private final ApplicationEventPublisher publisher;

    public MemberService(MemberRepository memberRepository, TilRepository tilRepository,
                         BookmarkRepository bookmarkRepository, PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils, Amazon3SService amazon3SService,
                         ApplicationEventPublisher publisher) {
        this.memberRepository = memberRepository;
        this.tilRepository = tilRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.amazon3SService = amazon3SService;
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

    public Member findByEmail(String email) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        return memberOptional.orElse(null);
    }

    public void saveMember(Member member) {
        memberRepository.save(member);
    }

    public Member getMemberInfo(Long memberId) {
        return memberRepository.findById(memberId)
                .orElse(null);
    }

    @Transactional
    public boolean deleteMember(Long memberId) {
        Member member = memberRepository.findById(memberId).orElse(null);
        if (member == null) {
            return false; // 회원이 존재하지 않는 경우
        }

        // 연관된 정보 처리
        deleteTilAndBookmarksByMemberId(memberId);

        // 프로필 이미지 삭제
        deleteProfileImage(member.getProfileImage());

        memberRepository.delete(member);
        return true;
    }

    @Transactional
    public boolean deleteOAuthMember(String provider, String providerId) {
        // OAuth 유저 조회
        Member oauthMember = memberRepository.findByProviderAndProviderId(provider, providerId);
        if (oauthMember == null) {
            return false; // OAuth 유저가 존재하지 않는 경우
        }

        // 연관된 정보 처리
        deleteTilAndBookmarksByMemberId(oauthMember.getMemberId());

        // 프로필 이미지 삭제
        deleteProfileImage(oauthMember.getProfileImage());

        memberRepository.delete(oauthMember);
        return true;
    }

    private void deleteTilAndBookmarksByMemberId(Long memberId) {
        // 해당 회원의 TIL 목록 조회
        List<Til> tilList = tilRepository.findByMember_MemberId(memberId, Pageable.unpaged()).getContent();

        // TIL 목록 삭제
        tilRepository.deleteInBatch(tilList);

        // 회원의 북마크 목록을 가져옴
        Member member = memberRepository.findById(memberId).orElse(null);
        if (member != null) {
            List<Bookmark> bookmarks = bookmarkRepository.findByMember(member);

            // 북마크 삭제
            bookmarkRepository.deleteInBatch(bookmarks);
        }
    }

    private void deleteProfileImage(String profileImage) {
        if (profileImage != null) {
            // S3에서 이미지 삭제
            amazon3SService.deleteFileByUrl(profileImage);
        }
    }
}