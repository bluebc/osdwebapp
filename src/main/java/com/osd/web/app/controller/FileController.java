package com.osd.web.app.controller;

import java.io.File;
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
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RequestMapping("/file")
@Controller
public class FileController {

    private final String uploadDir = "D:/osd/upload/";
    private final String imgUploadDir = System.getProperty("user.dir") + "/src/main/resources/static/img/upload/";
    private final String fileUploadDir = System.getProperty("user.dir") + "/src/main/resources/static/file/upload/";
    

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
                    // Path filePath = Paths.get(uploadDir + fileName);
                    Path filePath = Paths.get(fileUploadDir + fileName);
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
        // String filePath = uploadDir + filename;
        String filePath = fileUploadDir + filename;
        System.out.println(filePath);
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

    @PostMapping("/uploadBoardImage")
    public ResponseEntity<?> uploadBoardImage(@RequestParam("file") MultipartFile file)
            throws IllegalStateException, IOException {
        try {
            // String uploadDirectory = System.getProperty("user.dir") + "/src/main/resources/static/img/upload";
            // System.out.println(uploadDirectory);

            // 업로드 된 파일의 이름
            String originalFileName = file.getOriginalFilename();

            // 업로드 된 파일의 확장자
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

            // 업로드 될 파일의 이름 재설정 (중복 방지를 위해 UUID 사용)
            String uuidFileName = UUID.randomUUID().toString() + fileExtension;

            // 위에서 설정한 서버 경로에 이미지 저장
            // file.transferTo(new File(uploadDirectory, uuidFileName));
            file.transferTo(new File(imgUploadDir, uuidFileName));

            return ResponseEntity.ok(uuidFileName);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("이미지 업로드 실패");
        }

    }

    @PostMapping("/uploadUserImage")
    public ResponseEntity<?> uploadUserImage(@RequestParam("file") MultipartFile file)
            throws IllegalStateException, IOException {
        try {
            String uploadDirectory = System.getProperty("user.dir") + "/src/main/resources/static/img/user";
            String originalFileName = file.getOriginalFilename();
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            String uuidFileName = UUID.randomUUID().toString() + fileExtension;
            file.transferTo(new File(uploadDirectory, uuidFileName));
            return ResponseEntity.ok(uuidFileName);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("이미지 업로드 실패");
        }

    }

}
