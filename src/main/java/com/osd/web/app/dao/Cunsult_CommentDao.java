package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Cunsult_CommentDto;

@Repository
public class Cunsult_CommentDao {

    @Autowired
    private SqlSession session;

    public int insert(Cunsult_CommentDto cunsult_CommentDto) {
        return session.insert("Cunsult_Comment.insert", cunsult_CommentDto);
    }

    public List<Cunsult_CommentDto> selectParentByPost(int post_id) {
        return session.selectList("Cunsult_Comment.selectParentByPost", post_id);
    }

    public List<Cunsult_CommentDto> selectByPost(int post_id) {
        return session.selectList("Cunsult_Comment.selectByPost", post_id);
    }

    // 좋아요
    public int plusLikecnt(int cmt_id){
        return session.update("Cunsult_Comment.plusLikecnt", cmt_id);
    }
    public int minusLikecnt(int cmt_id){
        return session.update("Cunsult_Comment.minusLikecnt", cmt_id);
    }

    // 댓글 수정 삭제
    public int updateContentByIdAndUser(Cunsult_CommentDto cunsult_CommentDto){
        return session.update("Cunsult_Comment.updateContentByIdAndUser", cunsult_CommentDto);
    }
    public int deleteByIdAndUser(Cunsult_CommentDto cunsult_CommentDto){
        return session.update("Cunsult_Comment.deleteByIdAndUser", cunsult_CommentDto);
    }

    // 대댓글 수
    public int selectCountChild(Cunsult_CommentDto cunsult_CommentDto){
        return session.selectOne("Cunsult_Comment.selectCountChild", cunsult_CommentDto);
    }

    // 댓글 확인
    public int selectCountIdAndUser(Cunsult_CommentDto cunsult_CommentDto){
        return session.selectOne("Cunsult_Comment.selectCountIdAndUser", cunsult_CommentDto);
    }

    // 댓글 삭제표시로 업데이트
    public int updateToDeleted(Cunsult_CommentDto cunsult_CommentDto){
        return session.update("Cunsult_Comment.updateToDeleted", cunsult_CommentDto);
    }

    // 댓글 수
    public int selectCountByPost(int post_id){
        return session.selectOne("Cunsult_Comment.selectCountByPost", post_id);
    }

}
