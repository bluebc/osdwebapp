package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Qna_PostDao;
import com.osd.web.app.dto.Qna_PostDto;

@Service
public class QnaService {

    @Autowired
    private Qna_PostDao qna_PostDao;

    public Qna_PostDto insertQnaPost(Qna_PostDto qna_PostDto) {

        // LocalDateTime post_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.MILLIS);
        LocalDateTime post_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        Qna_PostDto qna_PostFromDb = new Qna_PostDto();

        qna_PostDto.setPost_created_at(post_created_at);
        qna_PostDto.setPost_updated_at(post_created_at);

        qna_PostDto.setPost_viewcnt(0); // 조회수
        qna_PostDto.setPost_childcnt(0); // 댓글수

        int inserted = qna_PostDao.insert(qna_PostDto);

        if (inserted == 1) {
            qna_PostFromDb = qna_PostDao.selectBySubjectAndContentAndUserIdAndCreated(qna_PostDto);
        }

        return qna_PostFromDb;
    }

    public Qna_PostDto getQnaPostById(int post_id) {
        return qna_PostDao.selectById(post_id);
    }

    public List<Qna_PostDto> getQnaPostByKeywordAndPage(String keyword, int page, int limit) {
        return qna_PostDao.selectByKeywordAndPage(keyword, page, limit);
    }

    public int getQnaPostCountByKeyword(String keyword){
        return qna_PostDao.selectCountByKeyword(keyword);
    }


}
