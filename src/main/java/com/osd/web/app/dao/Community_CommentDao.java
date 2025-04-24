package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Community_CommentDto;

@Repository
public class Community_CommentDao {

    @Autowired
    private SqlSession session;

    public int insert(Community_CommentDto community_CommentDto) {
        return session.insert("Community_Comment.insert", community_CommentDto);
    }

    public List<Community_CommentDto> selectParentByPost(int post_id) {
        return session.selectList("Community_Comment.selectParentByPost", post_id);
    }

    public List<Community_CommentDto> selectByPost(int post_id) {
        return session.selectList("Community_Comment.selectByPost", post_id);
    }

    // 좋아요
    public int plusLikecnt(int cmt_id) {
        return session.update("Community_Comment.plusLikecnt", cmt_id);
    }

    public int minusLikecnt(int cmt_id) {
        return session.update("Community_Comment.minusLikecnt", cmt_id);
    }

    // 댓글 수정 삭제
    public int updateContentByIdAndUser(Community_CommentDto community_CommentDto) {
        return session.update("Community_Comment.updateContentByIdAndUser", community_CommentDto);
    }

    public int deleteByIdAndUser(Community_CommentDto community_CommentDto) {
        return session.update("Community_Comment.deleteByIdAndUser", community_CommentDto);
    }

    // 대댓글 수
    public int selectCountChild(Community_CommentDto community_CommentDto) {
        return session.selectOne("Community_Comment.selectCountChild", community_CommentDto);
    }

    // 댓글 확인
    public int selectCountIdAndUser(Community_CommentDto community_CommentDto) {
        return session.selectOne("Community_Comment.selectCountIdAndUser", community_CommentDto);
    }

    // 댓글 삭제표시로 업데이트
    public int updateToDeleted(Community_CommentDto community_CommentDto) {
        return session.update("Community_Comment.updateToDeleted", community_CommentDto);
    }

    // 댓글 수
    public int selectCountByPost(int post_id) {
        return session.selectOne("Community_Comment.selectCountByPost", post_id);
    }

}
