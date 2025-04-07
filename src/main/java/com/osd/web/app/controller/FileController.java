package com.osd.web.app.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/file")
@Controller
public class FileController {

    private final String uploadDir = "D:/osd/upload/";

    @ResponseBody
    @PostMapping("/upload")
    public Map<String, Object> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        Map<String, Object> resultMap = new HashMap<>();

        List<String> fileOriginalNames = new ArrayList<>();
        List<String> fileList = new ArrayList<>();

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                try {
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path filePath = Paths.get(uploadDir + fileName);
                    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    fileList.add(fileName);
                    fileOriginalNames.add(file.getOriginalFilename());
                } catch (IOException e) {
                    return resultMap;
                }
            }
        }

        resultMap.put("fileOriginalNames", fileOriginalNames);
        resultMap.put("fileList", fileList);

        return resultMap;

    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam("filename") String filename) throws IOException {
        // 저장된 경로에서 파일을 불러옴
        String filePath = uploadDir + filename;
        Path path = Paths.get(filePath);

        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new UrlResource(path.toUri());
        String timestamp = filename.substring(0, 13); // 밀리초 시간은 13자리
        String originalFileName = filename.substring(14); // 13 + 1 (언더스코어)

        // 파일 이름 한글 인코딩 처리
        String encodedFileName = URLEncoder.encode(originalFileName, StandardCharsets.UTF_8)
                .replaceAll("\\+", "%20");

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedFileName)
                .body(resource);
    }

}
