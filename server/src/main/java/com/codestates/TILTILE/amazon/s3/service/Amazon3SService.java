package com.codestates.TILTILE.amazon.s3.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import com.amazonaws.services.s3.model.PutObjectResult;
import com.codestates.TILTILE.amazon.s3.dto.S3FileDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class Amazon3SService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final AmazonS3Client amazonS3Client;

    /**
     * S3로 파일 업로드
     */
    public List<S3FileDto> uploadFiles(String fileType, List<MultipartFile> multipartFiles) throws FileUploadException {
        List<S3FileDto> s3Files = new ArrayList<>();
        String uploadFilePath = fileType + "/" + getFolderName();

        for (MultipartFile multipartFile : multipartFiles) {
            String originalFileName = multipartFile.getOriginalFilename();
            String uploadFileName = getUuidFileName(originalFileName);
            String uploadFileUrl = "";

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(multipartFile.getSize());
            objectMetadata.setContentType(multipartFile.getContentType());

            try (InputStream inputStream = multipartFile.getInputStream()) {
                String keyName = uploadFilePath + "/" + uploadFileName;
                PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata);

                // S3에 폴더 및 파일 업로드
                PutObjectResult putObjectResult = amazonS3Client.putObject(putObjectRequest);

                // S3에 업로드한 폴더 및 파일 URL
                uploadFileUrl = amazonS3Client.getUrl(bucketName, keyName).toString();

                s3Files.add(S3FileDto.builder()
                        .originalFileName(originalFileName)
                        .uploadFileName(uploadFileName)
                        .uploadFilePath(uploadFilePath)
                        .uploadFileUrl(uploadFileUrl)
                        .build());
            } catch (IOException e) {
                e.printStackTrace();
                log.error("File upload failed", e);
                // 파일 업로드 실패에 대한 예외 처리
                throw new FileUploadException("File upload failed");
            }
        }

        return s3Files;
    }


    /**
     * UUID 파일명 반환
     */
    public String getUuidFileName(String fileName) {
        String ext = fileName.substring(fileName.indexOf(".") + 1);
        return UUID.randomUUID().toString() + "." + ext;
    }

    /**
     * 년/월/일 폴더명 반환
     */
    private String getFolderName() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        Date date = new Date();
        String str = sdf.format(date);
        return str.replace("-", "/");
    }

    public void deleteFileByUrl(String fileUrl) {
        // S3에서 파일 삭제
        String key = extractKeyFromUrl(fileUrl);
        amazonS3Client.deleteObject(bucketName, key);
    }

    private String extractKeyFromUrl(String fileUrl) {
        // 파일 URL에서 키 추출
        // 예: https://s3.amazonaws.com/bucket-name/file.jpg 에서 "bucket-name/file.jpg" 추출
        URL url;
        try {
            url = new URL(fileUrl);
        } catch (MalformedURLException e) {
            throw new IllegalArgumentException("Invalid file URL");
        }
        return url.getPath().substring(1);
    }
}
