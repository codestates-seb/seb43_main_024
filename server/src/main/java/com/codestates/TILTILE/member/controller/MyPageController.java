package com.codestates.TILTILE.member.controller;

import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.repository.MemberRepository;
import com.codestates.TILTILE.member.service.MyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/mypage")
public class MyPageController {
    private final MyPageService myPageService;

    @Autowired
    private MemberRepository memberRepository;

    public MyPageController(MyPageService myPageService) {
        this.myPageService = myPageService;
    }

    @PatchMapping("/nickname")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<String> updateNickName(Authentication authentication, @RequestBody Map<String, String> requestBody) {
        String userEmail = authentication.getName();
        String newNickName = requestBody.get("newNickName");

        Optional<Member> memberOptional = memberRepository.findByEmail(userEmail);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setNickName(newNickName);
            memberRepository.save(member);
            return ResponseEntity.ok("닉네임이 성공적으로 변경되었습니다.");
        } else {
            // 사용자를 찾을 수 없는 경우 처리할 내용
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }
    }
    @PatchMapping("/about-me")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<String> updateAboutMe(Authentication authentication, @RequestBody Map<String, String> requestBody) {
        String userEmail = authentication.getName();
        String newAboutMe = requestBody.get("newAboutMe");
        myPageService.updateAboutMe(userEmail, newAboutMe);
        return ResponseEntity.ok("자기소개가 성공적으로 변경되었습니다.");
    }

    @PatchMapping("/password")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<String> updatePassword(Authentication authentication, @RequestBody Map<String, String> requestBody) {
        String userEmail = authentication.getName();
        String newPassword = requestBody.get("newPassword");
        myPageService.updatePassword(userEmail, newPassword);
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }
}
