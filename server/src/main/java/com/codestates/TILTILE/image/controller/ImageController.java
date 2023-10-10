package com.codestates.TILTILE.image.controller;

import com.codestates.TILTILE.amazon.s3.dto.S3FileDto;
import com.codestates.TILTILE.amazon.s3.service.Amazon3SService;
import com.codestates.TILTILE.member.entity.Member;
import com.codestates.TILTILE.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

@Tag(name = "Image", description = "이미지 관련 api 입니다.")
@RestController
public class ImageController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private Amazon3SService amazon3SService;

    @Operation(summary = "이미지업로드", description = "이미지를 업로드합니다.")
    @PostMapping("/uploadProfileImage")
    public ResponseEntity<String> uploadProfileImage(
            @Parameter(description = "업로드할 이미지 파일", required = true, schema = @Schema(type = "string", format = "binary"))
            @RequestParam("imageFile")MultipartFile imageFile, Principal principal) {
        // 사용자 정보 가져오기
        String email = principal.getName();
        Member member = memberService.findByEmail(email);

        // 이전에 업로드된 프로필 사진이 있는지 확인하고 삭제
        if (member.getProfileImage() != null) {
            amazon3SService.deleteFileByUrl(member.getProfileImage());
        }

        // 이미지 업로드 및 데이터베이스 저장
        try {
            List<S3FileDto> uploadedFiles = amazon3SService.uploadFiles("profile", Collections.singletonList(imageFile));
            if (!uploadedFiles.isEmpty()) {
                S3FileDto uploadedFile = uploadedFiles.get(0);
                // 업로드된 파일 정보를 회원의 프로필 이미지로 저장
                member.setProfileImage(uploadedFile.getUploadFileUrl());
                memberService.saveMember(member);
            }

            return ResponseEntity.ok("Profile image uploaded successfully.");
        } catch (FileUploadException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile image.");
        }
    }

    @Operation(summary = "이미지삭제", description = "이미지를 삭제합니다.")
    @DeleteMapping("/deleteProfileImage")
    public ResponseEntity<String> deleteProfileImage(Principal principal) {
        // 사용자 정보 가져오기
        String email = principal.getName();
        Member member = memberService.findByEmail(email);

        // 프로필 이미지 삭제
        String profileImage = member.getProfileImage();
        if (profileImage != null) {
            // S3에서 이미지 삭제
            amazon3SService.deleteFileByUrl(profileImage);
            // 회원의 프로필 이미지 정보 제거
            member.setProfileImage(null);
            memberService.saveMember(member);
            return ResponseEntity.ok("Profile image deleted successfully.");
        }

        return ResponseEntity.ok("No profile image found.");
    }
}

