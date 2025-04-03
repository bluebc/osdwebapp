package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Cunsult_PostDao;
import com.osd.web.app.dto.Cunsult_PostDto;

@Service
public class CunsultService {

    @Autowired
    private Cunsult_PostDao cunsult_PostDao;

    public Cunsult_PostDto insertCunsultPost(Cunsult_PostDto cunsult_PostDto) {

        // DB DATETIME => DATETIME2(3) 으로 변경할 것 고려
        // LocalDateTime post_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.MILLIS);
        LocalDateTime post_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);

        Cunsult_PostDto cunsult_PostFromDb = new Cunsult_PostDto();

        cunsult_PostDto.setPost_created_at(post_created_at);
        cunsult_PostDto.setPost_updated_at(post_created_at);

        cunsult_PostDto.setPost_viewcnt(0); // 조회수
        cunsult_PostDto.setPost_childcnt(0); // 댓글수

        int inserted = cunsult_PostDao.insert(cunsult_PostDto);

        if (inserted == 1) {
            cunsult_PostFromDb = cunsult_PostDao.selectBySubjectAndContentAndUserIdAndCreated(cunsult_PostDto);
        }

        return cunsult_PostFromDb;
    }

    public Cunsult_PostDto getCunsultPostById(int post_id) {
        return cunsult_PostDao.selectById(post_id);
    }

    public List<Cunsult_PostDto> getCunsultPostByKeywordAndPage(String keyword, int page, int limit) {
        return cunsult_PostDao.selectByKeywordAndPage(keyword, page, limit);
    }

    public int getCunsultPostCountByKeyword(String keyword) {
        return cunsult_PostDao.selectCountByKeyword(keyword);
    }

}
