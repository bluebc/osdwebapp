package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Cunsult_CommentDao;
import com.osd.web.app.dao.Cunsult_PostDao;
import com.osd.web.app.dao.Cunsult_Post_LikeDao;
import com.osd.web.app.dto.Cunsult_CommentDto;
import com.osd.web.app.dto.Cunsult_PostDto;
import com.osd.web.app.dto.Cunsult_Post_LikeDto;

@Service
public class CunsultService {

    @Autowired
    private Cunsult_PostDao cunsult_PostDao;

    public Cunsult_PostDto insertCunsultPost(Cunsult_PostDto cunsult_PostDto) {

        // DB DATETIME => DATETIME2(3) 으로 변경할 것 고려
        // LocalDateTime post_created_at =
        // LocalDateTime.now().truncatedTo(ChronoUnit.MILLIS);
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

    public int updateCunsultPost(Cunsult_PostDto cunsult_PostDto) {

        LocalDateTime post_updated_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        cunsult_PostDto.setPost_updated_at(post_updated_at);

        return cunsult_PostDao.update(cunsult_PostDto);
    }

    public int deleteCunsultPost(Cunsult_PostDto cunsult_PostDto) {
        return cunsult_PostDao.delete(cunsult_PostDto);
    }

    public int getRownumById(Cunsult_PostDto cunsult_PostDto) {
        return cunsult_PostDao.selectRownumById(cunsult_PostDto);
    }

    public int updateViewcnt(int post_id) {
        return cunsult_PostDao.updateViewcnt(post_id);
    }

    // ==================== 좋아요 ====================
    @Autowired
    private Cunsult_Post_LikeDao cunsult_Post_LikeDao;

    public int insertLike(Cunsult_Post_LikeDto cunsult_Post_LikeDto) {
        int result = 0;

        int post_id = cunsult_Post_LikeDto.getPost_id();
        LocalDateTime like_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        cunsult_Post_LikeDto.setLike_created_at(like_created_at);

        int likeInserted = cunsult_Post_LikeDao.insert(cunsult_Post_LikeDto);
        int postUpdated = cunsult_PostDao.plusLikecnt(post_id);

        result = likeInserted * 10 + postUpdated;
        return result;
    }

    public int deleteLike(Cunsult_Post_LikeDto cunsult_Post_LikeDto) {
        int result = 0;

        int post_id = cunsult_Post_LikeDto.getPost_id();

        int likeDeleted = cunsult_Post_LikeDao.delete(cunsult_Post_LikeDto);
        int postUpdated = 0;
        if (likeDeleted == 1) {
            cunsult_PostDao.minusLikecnt(post_id);
        }

        result = likeDeleted * 10 + postUpdated;
        return result;
    }

    public int checkPostLiked(Cunsult_Post_LikeDto cunsult_Post_LikeDto) {
        return cunsult_Post_LikeDao.selectByPostAndUser(cunsult_Post_LikeDto);
    }


    // ==================== 댓글 ====================
    @Autowired
    private Cunsult_CommentDao cunsult_CommentDao;

    public int insertComment(Cunsult_CommentDto cunsult_CommentDto) {
        return cunsult_CommentDao.insert(cunsult_CommentDto);
    }

}
