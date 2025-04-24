package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Board_CommentDto;

@Repository
public class Board_CommentDao {

    @Autowired
    private SqlSession session;

    public List<Board_CommentDto> selectCunsultCmtByPost(int post_id) {
        return session.selectList("Board_Comment.selectCunsultCmtByPost", post_id);
    }

    public List<Board_CommentDto> selectCommunityCmtByPost(int post_id) {
        return session.selectList("Board_Comment.selectCommunityCmtByPost", post_id);
    }

}
