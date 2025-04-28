package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Board_CommentDao;
import com.osd.web.app.dao.Board_PostDao;
import com.osd.web.app.dao.Community_CommentDao;
import com.osd.web.app.dao.Community_Comment_LikeDao;
import com.osd.web.app.dao.Community_PostDao;
import com.osd.web.app.dao.Community_Post_LikeDao;
import com.osd.web.app.dto.Board_CommentDto;
import com.osd.web.app.dto.Board_PostDto;
import com.osd.web.app.dto.Community_CommentDto;
import com.osd.web.app.dto.Community_Comment_LikeDto;
import com.osd.web.app.dto.Community_PostDto;
import com.osd.web.app.dto.Community_Post_LikeDto;


@Service
public class CommunityService {

    @Autowired
    private Community_PostDao community_PostDao;

    @Autowired
    private Board_PostDao board_PostDao;

    public Community_PostDto insertPost(Community_PostDto community_PostDto) {
        LocalDateTime post_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        community_PostDto.setPost_created_at(post_created_at);
        community_PostDto.setPost_updated_at(post_created_at);
        community_PostDao.insert(community_PostDto);
        community_PostDto = community_PostDao.selectBySubjectAndUserAndCreated(community_PostDto);
        return community_PostDto;
    }

    public Board_PostDto getBoardById(int post_id) {
        return board_PostDao.selectCommunityPostById(post_id);
    }

    public int updatePostViewcnt(int post_id) {
        return community_PostDao.updateViewcnt(post_id);
    }

    public int deletePostById(int post_id) {
        return community_PostDao.deleteById(post_id);
    }

    public Community_PostDto getPostById(int post_id) {
        return community_PostDao.selectById(post_id);
    }

    public int updatePost(Community_PostDto community_PostDto) {
        LocalDateTime post_updated_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        community_PostDto.setPost_updated_at(post_updated_at);
        return community_PostDao.updateContent(community_PostDto);
    }

// ==================== 좋아요 ====================
    @Autowired
    private Community_Post_LikeDao community_Post_LikeDao;

    public int insertLike(Community_Post_LikeDto community_Post_LikeDto) {
        int result = 0;

        int post_id = community_Post_LikeDto.getPost_id();
        LocalDateTime like_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        community_Post_LikeDto.setLike_created_at(like_created_at);

        int likeInserted = community_Post_LikeDao.insert(community_Post_LikeDto);
        int postUpdated = community_PostDao.plusLikecnt(post_id);

        result = likeInserted * 10 + postUpdated;
        return result;
    }

    public int deleteLike(Community_Post_LikeDto community_Post_LikeDto) {
        int result = 0;

        int post_id = community_Post_LikeDto.getPost_id();

        int likeDeleted = community_Post_LikeDao.delete(community_Post_LikeDto);
        int postUpdated = 0;
        if (likeDeleted == 1) {
            postUpdated = community_PostDao.minusLikecnt(post_id);
        }

        result = likeDeleted * 10 + postUpdated;
        return result;
    }

    public int checkPostLiked(Community_Post_LikeDto community_Post_LikeDto) {
        return community_Post_LikeDao.selectByPostAndUser(community_Post_LikeDto);
    }



    // 댓글 ==================================================

 @Autowired
    private Community_CommentDao community_CommentDao;

    public int insertComment(Community_CommentDto community_CommentDto) {

        int cmt_likecnt = 0;
        community_CommentDto.setCmt_likecnt(cmt_likecnt);


        LocalDateTime cmt_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        community_CommentDto.setCmt_created_at(cmt_created_at);
        community_CommentDto.setCmt_updated_at(cmt_created_at);

        return community_CommentDao.insert(community_CommentDto);
    }

    @Autowired
    private Board_CommentDao board_CommentDao;

    public List<Board_CommentDto> getCommentByPost(int post_id) {
        return board_CommentDao.selectCommunityCmtByPost(post_id);
    }

    // 댓글 수정
    public int updateCommentByIdAndUser(Community_CommentDto community_CommentDto) {
        LocalDateTime cmt_updated_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        community_CommentDto.setCmt_updated_at(cmt_updated_at);
        return community_CommentDao.updateContentByIdAndUser(community_CommentDto);
    }

    // 댓글 삭제
    public int deleteCommentByIdAndUser(Community_CommentDto community_CommentDto) {
        int result = 0;

        int exist = community_CommentDao.selectCountIdAndUser(community_CommentDto);
        if (exist != 1) {
            result = -1;
            return result;
        }

        int child = community_CommentDao.selectCountChild(community_CommentDto);
        if (child == 0) {
            return community_CommentDao.deleteByIdAndUser(community_CommentDto);
        }
        // 대댓글 존재, 댓글 삭제표시 처리

        String cmt_content = "삭제된 댓글입니다.";
        String user_id = "deleted";
        LocalDateTime cmt_updated_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);

        community_CommentDto.setCmt_content(cmt_content);
        community_CommentDto.setUser_id(user_id);
        community_CommentDto.setCmt_updated_at(cmt_updated_at);

        int updated = community_CommentDao.updateToDeleted(community_CommentDto);
        if (updated != 1) {
            result = -2;
            return result;
        }

        result = 2;

        return result;
    }


    // ==================== 댓글 좋아요 ====================
    @Autowired
    private Community_Comment_LikeDao community_Comment_LikeDao;

    public int insertCommentLike(Community_Comment_LikeDto community_Comment_LikeDto) {
        int result = 0;

        int cmt_id = community_Comment_LikeDto.getCmt_id();
        LocalDateTime like_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        community_Comment_LikeDto.setLike_created_at(like_created_at);

        int likeInserted = community_Comment_LikeDao.insert(community_Comment_LikeDto);
        int postUpdated = community_CommentDao.plusLikecnt(cmt_id);

        result = likeInserted * 10 + postUpdated;
        return result;
    }

    public int deleteCommentLike(Community_Comment_LikeDto community_Comment_LikeDto) {
        int result = 0;

        int cmt_id = community_Comment_LikeDto.getCmt_id();

        int likeDeleted = community_Comment_LikeDao.delete(community_Comment_LikeDto);
        int postUpdated = 0;
        if (likeDeleted == 1) {
            postUpdated = community_CommentDao.minusLikecnt(cmt_id);
        }

        result = likeDeleted * 10 + postUpdated;
        return result;
    }

    // 내가 좋아요 댓글 리스트
    public List<Community_Comment_LikeDto> getCommentMyLike(Map<String, Object> parameterMap) {
        return community_Comment_LikeDao.selectByUserAndIdByPost(parameterMap);
    }

    // 댓글 수 증감
    public int plusCmtcnt(int post_id) {
        return community_PostDao.plusCmtcnt(post_id);
    }

    public int minusCmtcnt(int post_id) {
        return community_PostDao.minusCmtcnt(post_id);
    }

    public int getCountCommentByPost(int post_id) {
        return community_CommentDao.selectCountByPost(post_id);
    }

    public int getPostCountByKeyword(String keyword){
        return 0;
    }

    public List<Board_PostDto> getPostListByKeywordAndPage(String keyword, int page, int limit){
        return null;
    }


}
