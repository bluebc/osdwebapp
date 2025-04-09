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

}
