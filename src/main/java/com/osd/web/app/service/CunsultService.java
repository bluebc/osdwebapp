package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Board_CommentDao;
import com.osd.web.app.dao.Board_PostDao;
import com.osd.web.app.dao.Cunsult_CommentDao;
import com.osd.web.app.dao.Cunsult_Comment_LikeDao;
import com.osd.web.app.dao.Cunsult_PostDao;
import com.osd.web.app.dao.Cunsult_Post_LikeDao;
import com.osd.web.app.dto.Board_CommentDto;
import com.osd.web.app.dto.Board_PostDto;
import com.osd.web.app.dto.Cunsult_CommentDto;
import com.osd.web.app.dto.Cunsult_Comment_LikeDto;
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
        cunsult_PostDto.setPost_cmtcnt(0); // 댓글수

        int inserted = cunsult_PostDao.insert(cunsult_PostDto);

        if (inserted == 1) {
            cunsult_PostFromDb = cunsult_PostDao.selectBySubjectAndContentAndUserIdAndCreated(cunsult_PostDto);
        }

        return cunsult_PostFromDb;
    }

    public Cunsult_PostDto getCunsultPostById(int post_id) {
        return cunsult_PostDao.selectById(post_id);
    }

    // 글, 작성자 정보 JOIN
    @Autowired
    private Board_PostDao board_PostDao;

    public List<Board_PostDto> getCunsultPostListByKeywordAndPage(String keyword, int page, int limit) {
        return board_PostDao.selectCunsultPostListByKeywordAndPage(keyword, page, limit);
    }

    public Board_PostDto getPostById(int post_id) {
        return board_PostDao.selectCunsultPostById(post_id);
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
            postUpdated = cunsult_PostDao.minusLikecnt(post_id);
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

        int cmt_likecnt = 0;
        cunsult_CommentDto.setCmt_likecnt(cmt_likecnt);

        int cmt_sort = 0;
        cunsult_CommentDto.setCmt_sort(cmt_sort);

        LocalDateTime cmt_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        cunsult_CommentDto.setCmt_created_at(cmt_created_at);
        cunsult_CommentDto.setCmt_updated_at(cmt_created_at);

        return cunsult_CommentDao.insert(cunsult_CommentDto);
    }

    @Autowired
    private Board_CommentDao board_CommentDao;

    public List<Board_CommentDto> getCommentByPost(int post_id) {
        return board_CommentDao.selectCunsultCmtByPost(post_id);
    }

    // 댓글 수정
    public int updateCommentByIdAndUser(Cunsult_CommentDto cunsult_CommentDto) {
        LocalDateTime cmt_updated_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        cunsult_CommentDto.setCmt_updated_at(cmt_updated_at);
        return cunsult_CommentDao.updateContentByIdAndUser(cunsult_CommentDto);
    }

    // 댓글 삭제
    public int deleteCommentByIdAndUser(Cunsult_CommentDto cunsult_CommentDto) {
        int result = 0;

        int exist = cunsult_CommentDao.selectCountIdAndUser(cunsult_CommentDto);
        if (exist != 1) {
            result = -1;
            return result;
        }

        int child = cunsult_CommentDao.selectCountChild(cunsult_CommentDto);
        if (child == 0) {
            return cunsult_CommentDao.deleteByIdAndUser(cunsult_CommentDto);
        }
        // 대댓글 존재, 댓글 삭제표시 처리

        String cmt_content = "삭제된 댓글입니다.";
        String user_id = "deleted";
        LocalDateTime cmt_updated_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);

        cunsult_CommentDto.setCmt_content(cmt_content);
        cunsult_CommentDto.setUser_id(user_id);
        cunsult_CommentDto.setCmt_updated_at(cmt_updated_at);

        int updated = cunsult_CommentDao.updateToDeleted(cunsult_CommentDto);
        if (updated != 1) {
            result = -2;
            return result;
        }

        result = 2;

        return result;
    }

    // ==================== 댓글 좋아요 ====================
    @Autowired
    private Cunsult_Comment_LikeDao cunsult_Comment_LikeDao;

    public int insertCommentLike(Cunsult_Comment_LikeDto cunsult_Comment_LikeDto) {
        int result = 0;

        int cmt_id = cunsult_Comment_LikeDto.getCmt_id();
        LocalDateTime like_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        cunsult_Comment_LikeDto.setLike_created_at(like_created_at);

        int likeInserted = cunsult_Comment_LikeDao.insert(cunsult_Comment_LikeDto);
        int postUpdated = cunsult_CommentDao.plusLikecnt(cmt_id);

        result = likeInserted * 10 + postUpdated;
        return result;
    }

    public int deleteCommentLike(Cunsult_Comment_LikeDto cunsult_Comment_LikeDto) {
        int result = 0;

        int cmt_id = cunsult_Comment_LikeDto.getCmt_id();

        int likeDeleted = cunsult_Comment_LikeDao.delete(cunsult_Comment_LikeDto);
        int postUpdated = 0;
        if (likeDeleted == 1) {
            postUpdated = cunsult_CommentDao.minusLikecnt(cmt_id);
        }

        result = likeDeleted * 10 + postUpdated;
        return result;
    }

    // 내가 좋아요 댓글 리스트
    public List<Cunsult_Comment_LikeDto> getCommentMyLike(Map<String, Object> parameterMap) {
        return cunsult_Comment_LikeDao.selectByUserAndIdByPost(parameterMap);
    }

    // 댓글 수 증감
    public int plusChildcnt(int post_id) {
        return cunsult_PostDao.plusChildcnt(post_id);
    }

    public int minusChildcnt(int post_id) {
        return cunsult_PostDao.minusChildcnt(post_id);
    }

    public int getCountCommentByPost(int post_id) {
        return cunsult_CommentDao.selectCountByPost(post_id);
    }

}
