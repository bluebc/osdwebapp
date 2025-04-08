package com.osd.web.app.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Cunsult_CommentDto;

@Repository
public class Cunsult_CommentDao {
    
    @Autowired
    private SqlSession session;

    public int insert(Cunsult_CommentDto cunsult_CommentDto){
        return session.insert("Cunsult_Comment.insert", cunsult_CommentDto);
    }

}
