package com.osd.web.app.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/file")
@Controller
public class FileController {

    private final String uploadDir = "D:/osd/upload";

    @ResponseBody
    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        List<String> fileNames = new ArrayList<>();

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                try {
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path filePath = Paths.get(uploadDir + fileName);
                    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    fileNames.add(fileName);
                } catch (IOException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
            }
        }
        return ResponseEntity.ok(fileNames);
    }
}
